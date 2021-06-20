#! /usr/bin/env python3
import pymongo
import requests
from datetime import date
today = date.today()
date=today.strftime("%Y-%m-%d")

url="https://data.cdc.gov/resource/8xkx-amqh.json"
data=requests.get(url)
client = pymongo.MongoClient("localhost", 27017)
db=client["covid"]
collection = db.vaccine

vaccine=[]
for dict in data.json():
    curr_state=dict.get('recip_state')
    curr_county=dict.get('recip_county')
    count=dict.get('series_complete_yes')
    vaccine.append({"count":int(count),"County":curr_county,"State":curr_state,"date":date})

for dict in vaccine:
    if collection.find_one(dict)!=None:
        print("dupe")
        continue
    collection.insert_one(dict)

    