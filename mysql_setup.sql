CREATE DATABASE IF NOT EXISTS plants_db;
USE plants_db;

CREATE TABLE IF NOT EXISTS plants(
plant_id INT,
plant_nickname VARCHAR(50),
PRIMARY KEY('plant_id')
) DEFAULT CHARSET=ut8;

CREATE TABLE IF NOT EXISTS sensor_readings(
plant_id INT FOREIGN KEY REFERENCES plants('plant_id'),
date_time TIMESTAMP,
_date DATE,
_time TIME,
reading_type VARCHAR(50),
reading_value INT,
reading_id INT NOT NULL AUTO_INCREMENT,
PRIMARY KEY('reading_id'),
) DEFAULT CHARSET=utf8;
