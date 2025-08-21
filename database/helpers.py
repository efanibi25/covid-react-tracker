#! /usr/bin/env python3

import os
import json
import pymongo
import requests
from subprocess import run, PIPE
from datetime import datetime, timedelta

# --- Helper Functions ---
def run_command(command):
    """Runs a shell command, checks for errors, and returns True/False."""
    print(f"[{datetime.now()}] Running command: {' '.join(command)}")
    try:
        result = run(command, capture_output=True, text=True, check=False)
        if result.returncode != 0:
            print(f"[{datetime.now()}] !!! ERROR running command.")
            print(f"[{datetime.now()}] --- STDOUT ---\n{result.stdout}")
            print(f"[{datetime.now()}] --- STDERR ---\n{result.stderr}")
            return False
        return True
    except FileNotFoundError:
        print(f"[{datetime.now()}] !!! ERROR: Command not found: '{command[0]}'. Is it installed and in your PATH?")
        return False
    except Exception as e:
        print(f"[{datetime.now()}] !!! An unexpected error occurred: {e}")
        return False

def should_download_file(filepath, days=1):
    """Returns True if a file should be downloaded (doesn't exist or is too old)."""
    if not os.path.exists(filepath):
        return True
    
    file_mod_time = datetime.fromtimestamp(os.path.getmtime(filepath))
    age_limit = datetime.now() - timedelta(days=days)
    print(age_limit,file_mod_time)
    print(file_mod_time < age_limit)
    # quit()
    
    if file_mod_time < age_limit:
        return True
    
    return False

def ensure_dir_exists(path):
    """Ensures a directory exists, creating it if necessary."""
    if not os.path.exists(path):
        print(f"[{datetime.now()}] Creating directory: {path}")
        os.makedirs(path)

def safe_to_int(value):
    """Tries to convert a value to an integer, returning 0 on failure or for None."""
    if value is None:
        return 0
    try:
        # Use float first to handle strings like "39.0" before converting to int
        return int(float(value))
    except (ValueError, TypeError):
        return 0