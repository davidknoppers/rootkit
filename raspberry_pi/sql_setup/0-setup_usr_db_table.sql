-- creates the MySQL server user local_rpi
CREATE USER IF NOT EXISTS 'local_rpi'@'localhost'
IDENTIFIED BY 'p99';
-- grant privileges to user
GRANT ALL PRIVILEGES ON * . * TO 'local_rpi'@'localhost';
-- creates database FOREST to house plant tables
CREATE DATABASE IF NOT EXISTS forest;
USE forest;
-- create plant groups table
CREATE TABLE IF NOT EXISTS
plant_groups (plantgroup_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	      plantgroup_nickname VARCHAR(64) NOT NULL);

-- create users table
CREATE TABLE IF NOT EXISTS
users (user_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
       username VARCHAR(64) NOT NULL);

-- create plants table
CREATE TABLE IF NOT EXISTS
plants (plant_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        plantgroup_id INT, FOREIGN KEY(plantgroup_id) REFERENCES plant_groups(plantgroup_id),
        plant_nickname VARCHAR(64) NOT NULL);

-- creates readings table
CREATE TABLE IF NOT EXISTS
readings (reading_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        reading_dt TIMESTAMP,
        reading_date DATE,
	reading_time TIME,
        plant_id INT, FOREIGN KEY(plant_id) REFERENCES plants(plant_id),
	user_id INT, FOREIGN KEY(user_id) REFERENCES users(user_id),
	reading_type VARCHAR(64) NOT NULL,
	plantgroup_id INT, FOREIGN KEY(plantgroup_id) REFERENCES plant_groups(plantgroup_id));

