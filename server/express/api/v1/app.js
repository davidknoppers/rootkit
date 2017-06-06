#!/usr/bin/node
/*
This script listens for POST requests from our raspberry pi
The POST requests will be readings from the moisture sensor
It parses the POST request and converts its data into a mysql query
It then opens a connection to the mysql database and writes in the sensor data via that query
*/
let express = require("express");
let myParser = require("body-parser");
let parseJson = require('parse-json');
var mysql = require('mysql');
let app = express();


app.use(myParser.json());
//we are expected JSON data in the POST request
app.post("/express/api/v1", function(request, response) {
let obj = request.body;
response.send(obj);
//data is the JSON data turned into a usable JS object
let data = JSON.parse(JSON.stringify(obj))
// qry is a string painstakingly constructed by multiple references to the JS object above
let qry = `INSERT INTO readings (\`reading_dt\`, \`reading_date\`, \`reading_time\`, \`plant_id\`, \`user_id\`, \`reading_type\`, \`plantgroup_id\`, \`reading_value\`) VALUES ('${data.reading_dt}', '${data.reading_date}', '${data.reading_time}', ${data.plant_id}, ${data.user_id}, '${data.reading_type}', ${data.plantgroup_id}, ${data.reading_value});`
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "poo",
    database: "forest"
});
con.connect(function(err){
  if(err){
    console.log('Error connecting to Db: ' + err.stack);
    return;
  }
  console.log('Connection established as ' + con.threadId);
});

con.query(qry, function (err, rows) {
    if (err) throw err;
    for (let i = 0; i < rows.length; i++) {
	console.log(rows[i]);
	};
});
con.end(function(err) {
});


});


app.listen(8000);
console.log("server is listening")
