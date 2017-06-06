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
// the above are all dependencies that may need to be installed with npm

app.use(myParser.json());
//we are expecting JSON data in the POST request

let readings_parser = function(post_data) {
    //data is the JSON data turned into a usable JS object
    let data = JSON.parse(JSON.stringify(post_data))
    // qry is a string painstakingly constructed by multiple references to the JS object above
    let qry = `INSERT INTO readings (\`reading_dt\`, \`reading_date\`, \`reading_time\`, \`plant_id\`, \`user_id\`, \`reading_type\`, \`plantgroup_id\`, \`reading_value\`) VALUES ('${data.reading_dt}', '${data.reading_date}', '${data.reading_time}', ${data.plant_id}, ${data.user_id}, '${data.reading_type}', ${data.plantgroup_id}, ${data.reading_value});`
    return qry;
};


let db_writer = function(qry) {
    //configure a connection to the sql server, with authorizations passed as arguments when app.js is called
    let con = mysql.createConnection({
	host: "localhost",
	user: process.argv[1],
	password: process.argv[2],
	database: process.argv[3]
    });
    //open the connection
    con.connect(function(err){
	if(err){
	    console.log('Error connecting to Db: ' + err.stack);
	    return;
	}
    });
    //execute the query from db_writer
    con.query(qry, function (err, rows) {
	if (err) throw err;
    });
    //close the connection
    con.end(function(err) {
    });
    //return 200 for success
    return 200;
};
//main control function that calls the parser and db writer when it receives a POST request
app.post("/express/api/v1", function(request, response) {
    let obj = request.body;
    let qry = readings_parser(obj);
    response.sendStatus(db_writer(qry));
});


app.listen(8000);
console.log("server is listening")
