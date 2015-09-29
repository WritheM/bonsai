#!/usr/bin/env bash

###################################################################
# Run every time we start the vm

pushd /vagrant/client

echo "=== Building Client Project"

grunt

pm2 start pm2.json

popd

pushd /vagrant/server

echo "=== Building Server Project"

grunt

pm2 start pm2.json

popd
