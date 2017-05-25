#!/bin/bash

# setup SSH server
sudo apt-get update;
sudo apt-get install openssh-server -y;
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.default;
sudo chmod a-w /etc/ssh/sshd_config.default;
# change sshd_config to disallow password authentication
sudo apt-get install mysql-server-5.7 -y;
sudo apt-get install;
sudo apt-get install python3-dev -y -q;
sudo apt-get install python3-pip -y -q;
sudo apt-get install libmysqlclient-dev -y -q;
sudo pip3 install --upgrade pip;
sudo pip3 install -q flask;
sudo pip3 install -q Jinja2;
sudo pip3 install -q mysqlclient;
sudo pip3 install -q SQLAlchemy;
sudo pip3 install -q requests;
