#!/usr/bin/nodejs
/*
This script listens for POST requests from our raspberry pi
The POST requests will be readings from the moisture sensor
It parses the POST request and converts its data into a mysql query
It then opens a connection to the mysql database and writes in the sensor data via that query
Below are all dependencies that may need to be installed with npm
*/
var express = require('express');
var myParser = require('body-parser');
var mysql = require('mysql');
var app = express();

// we are expecting JSON data in the POST request
app.use(myParser.json());

var readingsParser = function (postData) {
    // data is the JSON data turned into a usable JS object
  var data = JSON.parse(JSON.stringify(postData));
    // qry is a string painstakingly constructed by multiple references to the JS object above
  var qry = `INSERT INTO readings (\`reading_dt\`, \`reading_date\`, \`reading_time\`, \`plant_id\`, \`user_id\`, \`reading_type\`, \`plantgroup_id\`, \`reading_value\`) VALUES ('${data.reading_dt}', '${data.reading_date}', '${data.reading_time}', ${data.plant_id}, ${data.user_id}, '${data.reading_type}', ${data.plantgroup_id}, ${data.reading_value});`;
  return qry;
};

var dbWriter = function (qry) {
    // configure a connection to the sql server, with authorizations passed as arguments when app.js is called
  var con = mysql.createConnection({
    host: 'localhost',
    user: process.argv[2],
    password: process.argv[3],
    database: process.argv[4]
  });
    // open the connection
  con.connect(function (err) {
    if (err) {
	console.log('Error connecting to Db: ' + err.stack);
    }
      else {
	  console.log('Connected to Db');
      }
  });
    // execute the query from dbWriter
  con.query(qry, function (err, rows) {
    if (err) throw err;
  });
    // close the connection
  con.end(function (err) {
    if (err) throw err;
  });
    // return 200 for success
  return 200;
};
// main control function that calls the parser and db writer when it receives a POST request
app.post('/express/api/v1', function (request, response) {
  //console.log('listening triggered');
  var obj = request.body;
  var qry = readingsParser(obj);
  response.sendStatus(dbWriter(qry));
});

// we will need to change the port to listen on when this is run from the server
app.listen(8000);
