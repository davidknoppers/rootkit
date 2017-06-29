# Alertbot

This is the twitter bot for our rootkit. It is designed to check our database for
anomalous plant readings and alert the owner of the plant in question. Right now
our rootkit is mostly checking soil moisture readings, so the twitter bot is only
checking those; however, the bot is written so it will be easy for us to monitor
other things later on. The bot also tracks what readings it has seen in order to avoid
duplicate alerts.

**Dependencies**

Python 3
Pip3
Tweepy
MySQLdb
json

**Notes**

- This bot is scheduled by a cron job. Right now we have it running every 6 hours
using a line like this in our crontab:
0 0,6,12,18 * * * /path/to/alertbot.py [dbusername] [dbpassword] [name of readings table]

- This bot also depends on a set of twitter API keys which we will certainly not be sharing on github!

- Other than the dependencies and credentials, this bot simply needs to go into the crontab to run!