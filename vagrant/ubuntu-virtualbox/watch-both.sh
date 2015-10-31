#!/usr/bin/env bash

pushd /vagrant/client

gulp watch &
echo $! > /tmp/bonsai-client-watch.pid

popd

pushd /vagrant/server

gulp watch &
echo $! > /tmp/bonsai-server-watch.pid

popd