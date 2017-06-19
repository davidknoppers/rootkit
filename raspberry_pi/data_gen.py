#!/usr/bin/python3

import random
import requests
import json
import time

day_number = 1
hour = 0
readingValue = 750
data_array = []
readingid = 45

for i in range(1,20):
    for h in range(0,4):
        if hour == 18:
            hour = 0
            day_number += 1
        else:
            hour += 6
        if readingValue > 300:
            readingValue -= random.randrange(1, 9)
        else:
            readingValue += 500
        payload = {}
        payload['reading_date'] = '2017-06-{:02d}'.format(day_number)
        payload['reading_time'] = '{:02d}:00:03'.format(hour)
        payload['reading_dt'] = '2017-06-{:02d} {:02d}:00:03'.format(day_number, hour)
        payload['reading_value'] = readingValue
        payload['plant_id'] = 1
        payload['user_id'] = 1
        payload['plantgroup_id'] = 1
        payload['reading_type'] = "soil_moisture"
        payload['reading_id'] = readingid
        readingid += 1
        data_array.append(payload)

print(data_array[0])

testload = {'user_id': 1, 'reading_type': 'soil_moisture', 'plant_id': 1, 'reading_date': '2017-06-21', 'reading_dt': '2017-06-21 00:00:03', 'reading_time': '00:00:03', 'reading_id': 125, 'reading_value': 741, 'plantgroup_id': 1}

#        payload =
#INSERT INTO readings
# (`reading_dt`, `reading_date`, `reading_time`, `plant_id`, `user_id`,
# `reading_type`, `plantgroup_id`, `reading_value`)
# VALUES ('2017-06-{:02d} {:02d}:00:03', '2017-06-{:02d}', '{:02d}:00:03', 1, 1,
# 'soil_moisture', 1, {});""".format(day_number, hour, day_number, hour,
# readingValue)

url = "http://52.90.202.94:8000/express/api/v1"
# for d in data_array:
try:
    headers = {'Content-Type': 'application/json'}
    r = requests.post(url, json.dumps(testload), headers=headers)
except ConnectionError:
    print("Connection Error")
print(r.status_code)
time.sleep(.1)
# print(payload)
