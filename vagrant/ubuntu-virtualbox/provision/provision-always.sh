#!/usr/bin/env bash

###################################################################
# Run every time we start the vm

pushd /vagrant/client

echo "=== Building Client Project"

npm update
bower update --allow-root

grunt

popd

pushd /vagrant/server

echo "=== Building Server Project"

grunt

popd
