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

db = MySQLdb.connect(host='localhost', user=sys.argv[1],
                     passwd=sys.argv[2], db=sys.argv[3])
cursor = db.cursor()

query = ("SELECT * FROM readings WHERE reading_dt = (SELECT MAX(reading_dt) FROM readings)")

cursor.execute(query)

for row in cursor.fetchall():
    for item in row:
        print(item)

db.close()
