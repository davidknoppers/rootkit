#!/bin/bash
## Setting up environment
sudo apt-get update
## firewall
sudo apt-get install ufw -y
## editor
sudo apt-get install emacs -y
## webserver
sudo apt-get install nginx -y
## mysql
sudo apt-get install mysql=5.7 -y
## python dependencies
sudo apt-get install python3-dev -y
sudo apt-get install python3-pip -y
sudo apt-get install libmysqlclient-dev -y
sudo pip3 install flask
sudo pip3 install Jinga2
sudo pip3 install mysqlclient
