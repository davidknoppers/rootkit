#!/bin/bash
# copies the current directory version of index.html to /var/www/html
sudo cp /var/www/html/index.html /var/www/html/index.html.backup;
sudo mv ./index.html /var/www/html/index.html;
