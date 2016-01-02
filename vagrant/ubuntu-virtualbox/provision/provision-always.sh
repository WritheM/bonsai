#!/usr/bin/env bash

###################################################################
# Run every time we start the vm


echo "=== Mounting Local Performance Tweaks"

# Temp Root
if [ ! -d /opt/bonsai ]
then
    mkdir /opt/bonsai
fi

if [ ! -d /opt/bonsai/client ]
then
    mkdir /opt/bonsai/client
fi

# Local Stores
if [ ! -d /opt/bonsai/client/node_modules ]
then
    mkdir /opt/bonsai/client/node_modules
fi

if [ ! -d /opt/bonsai/client/bower_components ]
then
    mkdir /opt/bonsai/client/bower_components
fi

# Mount Points
if [ ! -d /vagrant/client/node_modules ]
then
    mkdir /vagrant/client/node_modules
fi

if [ ! -d /vagrant/client/bower_components ]
then
    mkdir /vagrant/client/bower_components
fi

if [ ! -d /vagrant/client/public/tmp ]
then
    mkdir /vagrant/client/public/tmp
fi

sudo chown -R vagrant:vagrant /opt/bonsai

# Bind out the node_modules folder locally to avoid vagrantfs slowdowns
sudo mount --bind /opt/bonsai/client/node_modules /vagrant/client/node_modules

# Bind out the bower_components folder locally to avoid vagrantfs slowdowns
sudo mount --bind /opt/bonsai/client/bower_components /vagrant/client/bower_components

# Mount the tmp folder as a memory filesystem for FAST intermediate file storage (Note: May not be needed anymore?)
sudo mount -t tmpfs -o size=128m tmpfs /vagrant/client/public/tmp

pushd /vagrant/client

# Nothing Here

popd

pushd /vagrant/server

# Nothing Here

popd
