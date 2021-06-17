#! /usr/bin/env python3
import csv
import subprocess
import os
from mongoengine import connect


t=subprocess.run(["wget","https://static.usafacts.org/public/data/covid-19/covid_confirmed_usafacts.csv", "-O", "covid_confirmed_usafacts.csv"
])
#
t2=subprocess.run(["wget","https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv", "-O", "covid_deaths_usafacts.csv"
])
t3=subprocess.run(["wget","https://static.usafacts.org/public/data/covid-19/covid_county_population_usafacts.csv", "-O", "covid_county_population_usafacts.csv"
])
if(t.returncode!=0 or t2.returncode!=0  or t3.returncode!=0 ):
    print("Error Retriving Data")
    quit()

#Delete Old Data
connection=connect('covid')
connection.drop_database('covid')


os.chdir("/srv/Covid/database/")
subprocess.run(["mongoimport" ,"--type", "csv", "-d" ,"covid" ,"--headerline", "covid_deaths_usafacts.csv"])
subprocess.run(["mongoimport" ,"--type", "csv", "-d" ,"covid" ,"--headerline", "covid_confirmed_usafacts.csv"])
subprocess.run(["mongoimport" ,"--type", "csv", "-d" ,"covid" ,"--headerline", "covid_county_population_usafacts.csv"])
