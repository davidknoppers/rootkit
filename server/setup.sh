#!/bin/bash
## Setting up environment
sudo apt-get update
## firewall
sudo apt-get install ufw -y -q
## editor
sudo apt-get install emacs -y -q
## git
sudo apt-get install git -y -q
## webserver
sudo apt-get install nginx -y -q
## mysql
sudo apt-get install mysql=5.7 -y -q
## nodejs
sudo apt-get install nodejs
sudo apt-get install npm
## python dependencies
sudo apt-get install python3-dev -y -q
sudo apt-get install python3-pip -y -q
sudo apt-get install libmysqlclient-dev -y -q
sudo pip3 install --upgrade pip
sudo pip3 install -q flask
sudo pip3 install -q Jinja2
sudo pip3 install -q mysqlclient
sudo pip3 install -q SQLAlchemy
sudo pip3 install -q requests
