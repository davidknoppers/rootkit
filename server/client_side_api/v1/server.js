#!/usr/bin/env nodejs
/**
This module contains the client api route

route: /
HTTP method: GET
description: success of connection
return: 200

route: /:user_id/:plant_id/:plantgroup_id
HTTP method: GET
description: access MySQL to and query with the
             parameters user_id, plant_id, and plant_group_id
return: 200 and list of JSON object
*/
const mysql = require('mysql');
// creates an express application
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use('/api', require('cors')());

// the api route
app.get('/:user_id/:plant_id/:plantgroup_id', function (req, res) {
  // creates the connection to mysql
  const con = mysql.createConnection({
    host     : 'localhost',
    user     : process.argv[2],
    password : process.argv[3],
    database : process.argv[4]
  });
  const user_id = parseInt(req.params.user_id);
  const plant_id = parseInt(req.params.plant_id);
  const plantgroup_id = parseInt(req.params.plantgroup_id);
  if (isNaN(user_id) || isNaN(plant_id) || isNaN(plantgroup_id)) {
    getResp = "incorrect format of user_id, plant_id, or plantgroup_id";
      statusCode = 400;
      res.status(statusCode).send(JSON.stringify(getResp));
      return;

  }
  const queryStr = `SELECT reading_date, reading_time, reading_value ` +
                   `FROM readings WHERE user_id=${user_id} AND ` +
                   `plant_id=${plant_id} AND ` +
                   `plantgroup_id=${plantgroup_id} ` +
                   `ORDER BY reading_dt DESC LIMIT 100`;
  var getResp = null;
  var statusCode = null;

  // connect to mysql
  con.connect(function(err) {
    if (err) {
      // need to remove the err when moving to production
      getResp = "Internal Server issue: " + err;
      statusCode = 500;
      res.status(statusCode).send(JSON.stringify(getResp));
      return;
    }
    console.log("Connected!");
    // query mysql
    con.query(queryStr, function(err, rows) {
      if (err) {
	// need to remove the err when moving to production
	getResp = "Internal Server issue: " + err;
	statusCode = 500;
      } else if (rows.length === 0) {
	getResp = "combination of user_id, plant_id, and plate_id does not exist";
	statusCode = 400;
      } else if (rows.length > 0) {
	getResp = rows.slice(0,10);
	statusCode = 200;
      } else {
	getResp = "something internal went wrong";
	statusCode = 500;
      }
      res.status(statusCode).send(JSON.stringify(getResp));
      con.end();
    });
  });
})

app.get('/', function (req, res) {
  res.status(200).send('connected!');
})

// binds and listen to a specific port
var server  = app.listen(7000, function() {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})
