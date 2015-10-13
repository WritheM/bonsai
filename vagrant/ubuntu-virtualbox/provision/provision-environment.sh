#!/usr/bin/env bash

###################################################################
# Setup Bin

if [ ! -d "/home/vagrant/bin" ]
then
  sudo mkdir "/home/vagrant/bin"
fi

pushd "/home/vagrant/bin"

echo "=== Creating Provision Tool Link"
if [ -f "/home/vagrant/bin/provision" ]
then
  sudo rm provision
fi

echo "=== Creating Bonsai Tool Link"
if [ -f "/home/vagrant/bin/provision" ]
then
  sudo rm bonsai
fi

sudo ln -s /vagrant/vagrant/ubuntu-virtualbox/bin/bonsai bonsai

sudo chown -R vagrant:vagrant .

popd
