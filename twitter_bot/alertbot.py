#!/usr/bin/python3

#MYSQLdb simply lets us access the MYSQL db
import MySQLdb
#we use json to keep track of what reading ids we've seen
import json
#we use sys to access the db in a slightly safer manner
import sys

#tweepy is our main bot engine
import tweepy
#get the keys for oauth
from keys import ckey, csecret, akey, asecret
#set up oauth with consumer and access keys/secrets
auth = tweepy.OAuthHandler(ckey,csecret)
auth.set_access_token(akey, asecret)
#launch basic api
twitter_api = tweepy.API(auth)

def alert_user(reading, api=twitter_api):
    #load dictionary that holds mapping of user_ids to twitter handles
    try:
        with open('ids_and_handles.json') as f:
            ids_and_handes = json.load(f)
    except:
        ids_and_handles = {"1": "@p0516357"}
    reading_date = reading[2]
    moisture_level = reading[4]
    plant_id = reading[5]
    user_id = reading[6]
    message = "{} Alert! Your plant's moisture is getting low.\nPlant id: {}\nDate of reading: {}\nMoisture level: {}".format(
        ids_and_handles[str(user_id)], plant_id, reading_date, moisture_level)
    api.update_status(message)
    return 1

def check_db():
    #connect to the MySQL db using credentials passed from sys.argv
    db = MySQLdb.connect(host='localhost', user=sys.argv[1],
                         passwd=sys.argv[2], db=sys.argv[3])
    #set up a db cursor that will be used to query the database
    cursor = db.cursor()

    #The table has an auto-increment integer that tells us the order of the readings in the db. We simply keep track of what readings
    #we've already seen by saving and tracking the largest id read by the program
    #this prevents us pinging a user multiple times for the same reading
    try:
        with open('max_id_seen.json') as f:
            max_id_seen = json.load(f)
    except:
        max_id_seen = 1
    query = ("SELECT * FROM readings WHERE reading_id > {}").format(max_id_seen)
    cursor.execute(query)
    #list of reading ids that have now been "read" by the bot
    for reading in cursor.fetchall():
        moisture_level = reading[4]
        if moisture_level < 396:
            plant_id = reading[5]
            user_id = reading[6]
            alert_user(reading)
        max_id_seen = reading[0]
    db.close()
    #save the max id seen
    with open('max_id_seen.json', 'w+') as f:
        json.dump(max_id_seen, f)

check_db()
