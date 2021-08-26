#!/bin/bash

set -e

# Delete the old repo
rm -rf /home/ubuntu/discord-monitoring-server/

# clone the repo again
git clone https://gitlab.com/fadelkaadan/discord-monitoring-server.git

export PATH=/home/ubuntu/node/bin:$PATH

# starting pm2 daemon
pm2 status

cd /home/ubuntu/discord-monitoring-server

#install npm packages
echo "Running npm install"
npm install

#Restart the node server
npm start