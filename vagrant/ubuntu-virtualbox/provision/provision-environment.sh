#!/usr/bin/env bash

###################################################################
# Setup Bin

if [ ! -d "/home/vagrant/bin" ]
then
  mkdir "/home/vagrant/bin"
fi

pushd "/home/vagrant/bin"

echo "=== Creating Provision Tool Link"
if [ -f "/home/vagrant/bin/provision" ]
then
  rm provision
fi

ln -s /vagrant/vagrant/ubuntu-virtualbox/bin/provision provision

popd
