#!/usr/bin/env bash

###################################################################
# Install packages

echo "=== Installing Node.js - Latest Stable from PPA"

echo "+++ Installing 4.x PPA"
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -

echo "+++ Installing Node.js and NPM"
sudo apt-get install -y nodejs

echo "=== Upgrading NPM"
sudo npm install -g npm

###################################################################
# Development Prerequisites

echo "=== Installing Node.js Modules"
sudo npm install -g gulp bower http-server pm2 mocha
