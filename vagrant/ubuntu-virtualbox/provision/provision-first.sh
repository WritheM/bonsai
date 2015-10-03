#!/usr/bin/env bash

###################################################################
# Let's get the tools so we can use PPA's

# sudo apt-get update
# sudo apt-get install -y python-software-properties

###################################################################
# Add all our PPA's

# echo "=== Adding PPA's"

# Update the package source now that the ppa's are added
# sudo apt-get update

###################################################################
# Add TrustyUpdates
# -- These are required for updates to function properly on ubuntu 14.04

echo "=== Adding Hosts"

if [ -e /vagrant/vagrant/ubuntu-virtualbox/hosts.local ]
then

    sudo cat /vagrant/vagrant/ubuntu-virtualbox/hosts.local >> /etc/hosts

fi

echo "=== Adding Proxy"

if [ -e /vagrant/vagrant/ubuntu-virtualbox/proxy.local ]
then

    sudo cp /vagrant/vagrant/ubuntu-virtualbox/proxy.local /etc/apt/apt.conf.d/01proxy

fi

echo "=== Selecting the best Mirror"

sudo mv /etc/apt/sources.list /etc/apt/sources.list.bakup

if [ -e /vagrant/vagrant/ubuntu-virtualbox/package-mirrors.local ]
then
    echo "+++ Found Mirrors Override, Adding Custom Mirrors"
    sudo cp /vagrant/vagrant/ubuntu-virtualbox/package-mirrors.local /etc/apt/sources.list
else
    echo "+++ Loading Default Mirrors"
    sudo cp /vagrant/vagrant/ubuntu-virtualbox/package-mirrors /etc/apt/sources.list
fi

sudo apt-get update

###################################################################
# Install packages

echo "=== Installing Software"

# Common
sudo apt-get install -y git curl
