#!/usr/bin/env bash

###################################################################
# Prepare project
pushd /vagrant/client

echo "=== Installing Client Node.JS Dependencies with npm"
npm install --no-bin-links

echo "=== Installing Client Web Dependencies with bower"
bower install --allow-root

popd

pushd /vagrant/server

echo "=== Installing Server Node.JS Dependencies with npm"
npm install --no-bin-links

popd
