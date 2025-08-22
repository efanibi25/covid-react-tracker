#! /usr/bin/env python3

import os
import json
import csv
import re
import pymongo
import requests
from subprocess import run, PIPE
from datetime import datetime, timedelta

# --- Imports from your new files ---
from helpers import run_command, should_download_file, ensure_dir_exists, safe_to_int
from statemap import STATE_MAP, REVERSE_STATE_MAP

# --- Configuration ---
MONGO_URL = os.getenv('MONGO_URI', 'mongodb://localhost:27017')
DB_NAME = "covid"

# Define a configurable root directory for all data files.
# It will use the DATA_DIR from the environment, or default to the script's location.
DATA_ROOT = os.getenv('DATA_DIR', os.path.dirname(os.path.abspath(__file__)))

CENSUS_POP_URL = "https://www2.census.gov/programs-surveys/popest/datasets/2020-2024/counties/totals/co-est2024-alldata.csv"
CDC_WEEKLY_URL = "https://data.cdc.gov/resource/pwn4-m3yp.json"
CDC_VACCINE_URL = "https://data.cdc.gov/resource/8xkx-amqh.json"

USAFacts_FILES = {
    "covid_confirmed_usafacts.csv": "covid_confirmed_usafacts",
    "covid_deaths_usafacts.csv": "covid_deaths_usafacts"
}

# --- Core Functions ---
def pull_usafacts_data(mongo_client):
    """Downloads and transforms USAFacts CSVs into a nested time-series format."""
    print(f"[{datetime.now()}] Starting USAFacts data pull...")
    data_dir = os.path.join(DATA_ROOT, "data", "usafacts")
    ensure_dir_exists(data_dir)
    db = mongo_client[DB_NAME]

    for filename, collection_name in USAFacts_FILES.items():
        filepath = os.path.join(data_dir, filename)
        
        if should_download_file(filepath, days=1):
            url = f"https://static.usafacts.org/public/data/covid-19/{filename}"
            print(f"[{datetime.now()}] File '{filename}' is missing or old. Downloading...")
            if not run_command(["wget", "--no-use-server-timestamps", url, "-O", filepath]):
                print(f"[{datetime.now()}] Download failed for '{filename}'.")
                continue
        else:
            print(f"[{datetime.now()}] File '{filename}' is up-to-date. Skipping download.")

        if os.path.exists(filepath):
            print(f"[{datetime.now()}] Processing and importing '{collection_name}'...")
            db.drop_collection(collection_name)
            collection = db[collection_name]
            
            documents_to_insert = []
            data_key = 'cases' if 'confirmed' in collection_name else 'deaths'

            with open(filepath, mode='r', encoding='utf-8-sig') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    base_doc = {}
                    daily_data = []
                    
                    for key, value in row.items():
                        cleaned_value = value.strip() if isinstance(value, str) else value
                        cleaned_key = key.strip()

                        if re.match(r'^\d{4}-\d{2}-\d{2}$', cleaned_key):
                            daily_data.append({
                                'date': cleaned_key,
                                data_key: safe_to_int(cleaned_value)
                            })
                        else:
                            new_key = cleaned_key.lower().replace(' ', '_')
                            base_doc[new_key] = cleaned_value
                    
                    base_doc['daily_data'] = daily_data
                    
                    short_state = base_doc.get("state")
                    if short_state:
                        base_doc['state_long'] = STATE_MAP.get(short_state, short_state)
                    
                    documents_to_insert.append(base_doc)
            
            if documents_to_insert:
                print(f"[{datetime.now()}] Inserting {len(documents_to_insert)} documents into {collection_name}...")
                collection.insert_many(documents_to_insert)
        else:
            print(f"[{datetime.now()}] Cannot import '{filename}' because file does not exist.")

    print(f"[{datetime.now()}] USAFacts data pull complete.")
    return True

def pull_census_population_data(mongo_client):
    """Downloads and imports census population data, cleaning all string values."""
    print(f"[{datetime.now()}] Starting Census population data pull...")
    data_dir = os.path.join(DATA_ROOT, "data", "census")
    ensure_dir_exists(data_dir)
    
    filename = "co-est2024-alldata.csv"
    filepath = os.path.join(data_dir, filename)
    collection_name = "population"

    if should_download_file(filepath, days=30):
        print(f"[{datetime.now()}] Downloading new census population data...")
        if not run_command(["wget", "--no-use-server-timestamps", CENSUS_POP_URL, "-O", filepath]):
            return False
    else:
        print(f"[{datetime.now()}] Census data file is up-to-date. Skipping download.")

    if os.path.exists(filepath):
        db = mongo_client[DB_NAME]
        print(f"[{datetime.now()}] Processing and importing '{collection_name}'...")
        db.drop_collection(collection_name)
        collection = db[collection_name]
        documents = []
        
        try:
            with open(filepath, mode='r', encoding='latin-1') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    if row['COUNTY'] == '000':
                        continue
                    
                    state_long_name = row['STNAME'].strip()
                    doc = {
                        'state_fips': row['STATE'].strip(),
                        'county_fips': row['COUNTY'].strip(),
                        'state': REVERSE_STATE_MAP.get(state_long_name),
                        'state_long': state_long_name,
                        'county_name': row['CTYNAME'].strip(),
                        'population': safe_to_int(row['POPESTIMATE2023'])
                    }
                    documents.append(doc)
            
            if documents:
                collection.insert_many(documents)
            print(f"[{datetime.now()}] Census population data pull complete.")
        except Exception as e:
            print(f"[{datetime.now()}] !!! Error processing census file: {e}")
            return False
    return True

def pull_cdc_weekly_data(mongo_client):
    """Fetches, cleans, and imports CDC weekly data, cleaning all string values."""
    print(f"[{datetime.now()}] Starting CDC weekly cases/deaths data pull...")
    data_dir = os.path.join(DATA_ROOT, "data", "cdc_weekly")
    ensure_dir_exists(data_dir)
    
    try:
        offset = 0
        limit = 50000
        while True:
            chunk_filepath = os.path.join(data_dir, f"chunk_{offset}.json")
            if not os.path.exists(chunk_filepath) or should_download_file(chunk_filepath):
                print(f"[{datetime.now()}] Fetching weekly data chunk with offset: {offset}")
                params = {'$limit': limit, '$offset': offset}
                response = requests.get(CDC_WEEKLY_URL, params=params, timeout=120)
                response.raise_for_status()
                chunk = response.json()
                if not chunk:
                    print(f"[{datetime.now()}] Download phase complete.")
                    break
                with open(chunk_filepath, 'w') as f:
                    json.dump(chunk, f)
                print(f"[{datetime.now()}] Saved {len(chunk)} records to {chunk_filepath}")
            else:
                print(f"[{datetime.now()}] Weekly chunk file {chunk_filepath} is up-to-date. Skipping download.")
                with open(chunk_filepath, 'r') as f:
                    chunk = json.load(f)
                if len(chunk) < limit:
                    break
            offset += limit
    except requests.exceptions.RequestException as e:
        print(f"[{datetime.now()}] !!! Network error during download phase: {e}")
        return False

    try:
        db = mongo_client[DB_NAME]
        collection_name = "weekly_cases_deaths"
        db.drop_collection(collection_name)
        collection = db[collection_name]
        total_inserted = 0
        
        for filename in sorted(os.listdir(data_dir)):
            if filename.endswith(".json"):
                filepath = os.path.join(data_dir, filename)
                with open(filepath, 'r') as f:
                    data_chunk = json.load(f)
                
                cleaned_chunk = []
                strip_if_str = lambda v: v.strip() if isinstance(v, str) else v
                
                for record in data_chunk:
                    short_state = strip_if_str(record.get("state"))
                    cleaned_record = {
                        "date_updated": strip_if_str(record.get("date_updated")),
                        "state": short_state,
                        "state_long": STATE_MAP.get(short_state, short_state),
                        "start_date": strip_if_str(record.get("start_date")),
                        "end_date": strip_if_str(record.get("end_date")),
                        "tot_cases": safe_to_int(record.get("tot_cases")),
                        "new_cases": safe_to_int(record.get("new_cases")),
                        "tot_death": safe_to_int(record.get("tot_deaths")),
                        "new_deaths": safe_to_int(record.get("new_deaths")),
                        "new_historic_cases": safe_to_int(record.get("new_historic_cases")),
                        "new_historic_deaths": safe_to_int(record.get("new_historic_deaths"))
                    }
                    cleaned_chunk.append(cleaned_record)

                if cleaned_chunk:
                    collection.insert_many(cleaned_chunk)
                    total_inserted += len(cleaned_chunk)
        
        print(f"[{datetime.now()}] Import complete. Total records inserted: {total_inserted}")
        return True
    except Exception as e:
        print(f"[{datetime.now()}] !!! An error occurred during the database import phase: {e}")
        return False

def pull_cdc_vaccine_data(mongo_client):
    """Fetches CDC vaccine data and inserts new records, cleaning all string values."""
    print(f"[{datetime.now()}] Starting CDC vaccine data pull...")
    data_dir = os.path.join(DATA_ROOT, "data", "cdc_vaccine")
    ensure_dir_exists(data_dir)
    
    try:
        offset = 0
        limit = 50000
        while True:
            chunk_filepath = os.path.join(data_dir, f"chunk_{offset}.json")
            if os.path.exists(chunk_filepath):
                print(f"[{datetime.now()}] File {chunk_filepath} already exists. Skipping download.")
            else:
                params = {'$limit': limit, '$offset': offset}
                print(f"[{datetime.now()}] Downloading new vaccine chunk with offset: {offset}")
                response = requests.get(CDC_VACCINE_URL, params=params, timeout=60)
                response.raise_for_status()
                with open(chunk_filepath, 'w') as f:
                    json.dump(response.json(), f)
                print(f"[{datetime.now()}] Data written to {chunk_filepath}.")

            with open(chunk_filepath, 'r') as f:
                chunk_len = len(json.load(f))

            if chunk_len < limit:
                break
            offset += limit
            
    except requests.exceptions.RequestException as e:
        print(f"[{datetime.now()}] Network error: {e}")
        return False

    try:
        db = mongo_client[DB_NAME]
        collection = db.vaccine
        total_new_records = 0
        
        file_list = sorted(os.listdir(data_dir))
        print(f"[{datetime.now()}] Found {len(file_list)} chunk files to process for import.")

        for filename in file_list:
            if filename.endswith(".json"):
                filepath = os.path.join(data_dir, filename)
                with open(filepath, 'r') as f:
                    data_chunk = json.load(f)
                
                records_to_insert = []
                strip_if_str = lambda v: v.strip() if isinstance(v, str) else v
                
                for record in data_chunk:
                    short_state = strip_if_str(record.get("recip_state"))
                    records_to_insert.append({
                        "count": safe_to_int(record.get('series_complete_yes')),
                        "county": strip_if_str(record.get("recip_county")),
                        "state": short_state,
                        "state_long": STATE_MAP.get(short_state, short_state),
                        "date": strip_if_str(record.get("date"))
                    })
                
                if records_to_insert:
                    print(f"[{datetime.now()}] Attempting to insert {len(records_to_insert)} records from {filename}...")
                    try:
                        result = collection.insert_many(records_to_insert, ordered=False)
                        total_new_records += len(result.inserted_ids)
                    except pymongo.errors.BulkWriteError as bwe:
                        total_new_records += bwe.details['nInserted']
                        print(f"[{datetime.now()}] Bulk write for {filename} completed with some duplicates (which is normal).")
                else:
                    print(f"[{datetime.now()}] No records to insert from {filename}.")

        print(f"[{datetime.now()}] --- Vaccine Import Summary ---")
        print(f"[{datetime.now()}] Total new vaccine records inserted: {total_new_records}")
        print(f"[{datetime.now()}] ----------------------------")
        
        return True
    except Exception as e:
        print(f"[{datetime.now()}] An unexpected error occurred while processing the file: {e}")
        return False
    finally:
        print(f"[{datetime.now()}] CDC vaccine data pull complete.")

def main():
    """Main orchestrator for all data pulls."""
    try:
        with pymongo.MongoClient(MONGO_URL) as client:
            client.admin.command('ping')
            print(f"[{datetime.now()}] MongoDB connection successful.")
            
            if pull_usafacts_data(client):
                if pull_census_population_data(client):
                    if pull_cdc_weekly_data(client):
                        pull_cdc_vaccine_data(client)
                
    except pymongo.errors.ConnectionFailure as e:
        print(f"[{datetime.now()}] !!! MongoDB connection failed: {e}")
    except Exception as e:
        print(f"[{datetime.now()}] !!! An unexpected error occurred in main: {e}")

if __name__ == "__main__":
    main()