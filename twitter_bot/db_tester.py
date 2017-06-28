#!/usr/bin/python3

#get the keys for oauth
from keys import *
#MYSQLdb simply lets us access the MYSQL db
import MySQLdb
#we use json to keep track of what reading ids we've seen
import json
#we use sys to access the db in a slightly safer manner
import sys
#tweepy is our main bot engine
import tweepy


#set up oauth
auth = tweepy.OAuthHandler(ckey,csecret)
auth.set_access_token(akey, asecret)

#launch basic api
api = tweepy.API(auth)

#connect to the MySQL db using credentials passed from sys.argv
db = MySQLdb.connect(host='localhost', user=sys.argv[1],
                     passwd=sys.argv[2], db=sys.argv[3])

#set up a db cursor that will be used to query the database
cursor = db.cursor()

#query = ("SELECT * FROM readings WHERE reading_dt = (SELECT MAX(reading_dt) FROM readings)")
#query = ("SELECT reading_id, reading_value, plant_id, user_id, reading_type FROM readings ORDER BY reading_id DESC LIMIT 10")
#The table has an auto-increment integer that tells us the order of the readings in the db. We simply keep track of what readings
#we've already seen by saving and tracking the largest id read by the program
#this prevents us pinging a user multiple times for the same reading
try:
    with open('max_id_seen.json') as f:
        max_id_seen = json.load(f)
except:
    max_id_seen = 1
query = ("SELECT reading_id, reading_value, plant_id, user_id, reading_type FROM readings WHERE reading_id > {}").format(max_id_seen)

cursor.execute(query)

#list of reading ids that have now been "read" by the bot
for row in cursor.fetchall():
    print(row)
    best = row[0]

db.close()

#save the largest id seen
with open('data.json', 'w') as f:
    json.dump(max_id_seen, f)
