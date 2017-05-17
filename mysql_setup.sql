-- create the basic plants_db database and switch to it
CREATE DATABASE IF NOT EXISTS plants_db;
USE plants_db;

-- create our user
GRANT ALL ON *.* TO 'plant_boye'@'localhost' IDENTIFIED BY 'ppp';

-- create the plants table, meant to hold plant ids and their nicknames
CREATE TABLE IF NOT EXISTS plants(
plant_id INT,
plant_nickname VARCHAR(50),
PRIMARY KEY('plant_id')
) DEFAULT CHARSET=ut8;


-- create the sensor readings table, meant to hold all the readings from our arduino
-- we declare things like reading value and type ambiguously so that we can
-- make them flexible for later: hold different readings for moisture, temperature, etc
CREATE TABLE IF NOT EXISTS sensor_readings(
plant_id INT NOT NULL FOREIGN KEY REFERENCES plants('plant_id'),
date_time TIMESTAMP,
_date DATE,
_time TIME,
reading_type VARCHAR(50),
reading_value INT,
reading_id INT NOT NULL AUTO_INCREMENT,
PRIMARY KEY('reading_id'),
) DEFAULT CHARSET=utf8;
