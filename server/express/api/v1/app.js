#!/usr/bin/node

let express = require("express");
let myParser = require("body-parser");
let parseJson = require('parse-json');
let app = express();


app.use(myParser.json());
app.post("/express/api/v1", function(request, response) {
let obj = request.body;
response.send(obj);
console.log(JSON.stringify(obj))
console.log(typeof(JSON.stringify(obj)))
let json_thing = JSON.parse(JSON.stringify(obj))
console.log('json thing: ' + json_thing.reading_value)
console.log('type of json thing: ' + typeof(json_thing.reading_value))
});

let qry = "INSERT INTO readings (`reading_dt`, `reading_date`, `reading_time`, `plant_id`, `user_id`, `reading_type`, `plantgroup_id`, `reading_value`) VALUES ('2017-06-05 13:39:43', '2017-06-05', '13:39:43', 1, 1, 'soil_moisture', 1, 760.625);"


let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "poo",
    database: "nodejs_test"
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
app.listen(8000);
console.log("server is listening")
