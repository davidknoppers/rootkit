#!/bin/bash

# setup SSH server
sudo apt-get update;
sudo apt-get install openssh-server -y;
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.default;
sudo chmod a-w /etc/ssh/sshd_config.default;
# change sshd_config to disallow password authentication





