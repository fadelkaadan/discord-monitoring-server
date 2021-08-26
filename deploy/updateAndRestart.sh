#!/bin/bash

set -e

# Delete the old repo
rm -rf /home/ubuntu/discord-monitoring-server/

# clone the repo again
git clone https://gitlab.com/fadelkaadan/discord-monitoring-server.git

export PATH=/home/ubuntu/node/bin:$PATH

# stop the previous pm2
pm2 kill
npm remove pm2 -g


#pm2 needs to be installed globally as we would be deleting the repo folder.
# this needs to be done only once as a setup script.
npm install pm2 -g
# starting pm2 daemon
pm2 status

cd /home/ubuntu/discord-monitoring-server

#install npm packages
echo "Running npm install"
npm install

#Restart the node server
npm start