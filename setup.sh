#!/bin/bash
## Setting up environment
sudo apt-get update
## firewall
sudo apt-get install ufw -y -q
## editor
sudo apt-get install emacs -y -q
## webserver
sudo apt-get install nginx -y -q
## mysql
sudo apt-get install mysql=5.7 -y -q
## python dependencies
sudo apt-get install python3-dev -y -q
sudo apt-get install python3-pip -y -q
sudo apt-get install libmysqlclient-dev -y -q
sudo pip3 install -q flask
sudo pip3 install -q Jinga2
sudo pip3 install -q mysqlclient
sudo pip3 install -q SQLAlchmeny
sudo pip3 install -q requests
