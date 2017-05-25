#!/usr/bin/python3
"""
Module contains flask that serves the API
"""
from flask import (Flask, jsonify, request)
import os
app = Flask(__name__)

@app.route('/')
def default():
    return ("200")

@app.errorhandler(404)
def error404():
    # need to create custom 404 page
    return (jsonify({"error":"404 error catch"}))

@app.route('/plant_data/update/', methods=['POST'], strict_slashes=False)
def plant_data():
    """
    post request that take post request:
    example of expected post request package
        {"plantgroup_id": "0", "user_id": "0", "reading_value": 0,
         "reading_id": "0", "plant_id": "0", "reading_time": "13:53:45.29201",
         "reading_date": "2017-05-24 ", "reading_type": "soil_moisture",
         "reading_dt": "2017-05-24 13:53:45.292018"}
    """
    try:
        r = request.get_json()
    except:
        return("401")
    contents = []
    with open("/home/vagrant/plants_as_a_service/server/web_static/test.html", mode="r") as f:
        for line in f:
            contents.append(line)
    with open("/home/vagrant/plants_as_a_service/server/web_static/test_2.html", mode="w") as f:
        for content in contents:
            if "PST" in content:
                content = '\t<p>PST: {} </p>\n'.format(r["reading_time"].rsplit(":", 1)[0])
            elif "Moisture:" in content:
                content = '\t<p>Moisture: {}</p>\n'.format(r["reading_value"])
            f.write(content)
    return("200")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
