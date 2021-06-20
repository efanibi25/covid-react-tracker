#! /usr/bin/env python3
import csv
from subprocess import run
import os
import pymongo



t=run(["wget","https://static.usafacts.org/public/data/covid-19/covid_confirmed_usafacts.csv", "-O", "covid_confirmed_usafacts.csv"
])
#
t2=run(["wget","https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv", "-O", "covid_deaths_usafacts.csv"
])
t3=run(["wget","https://static.usafacts.org/public/data/covid-19/covid_county_population_usafacts.csv", "-O", "covid_county_population_usafacts.csv"
])
if(t.returncode!=0 or t2.returncode!=0  or t3.returncode!=0 ):
    print("Error Retriving Data")
    quit()

#Delete Old Data

client = pymongo.MongoClient("localhost", 27017)
db=client["covid"]
db.covid_deaths_usafacts.drop()
db.covid_county_population_usafacts.drop()
db.covid_county_population_usafacts.drop()





os.chdir("/srv/Covid/database/")
run(["mongoimport" ,"--type", "csv", "-d" ,"covid" ,"--headerline", "covid_deaths_usafacts.csv"])
run(["mongoimport" ,"--type", "csv", "-d" ,"covid" ,"--headerline", "covid_confirmed_usafacts.csv"])
run(["mongoimport" ,"--type", "csv", "-d" ,"covid" ,"--headerline", "covid_county_population_usafacts.csv"])
