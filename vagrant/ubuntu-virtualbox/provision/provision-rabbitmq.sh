#!/usr/bin/env bash

echo "=== Installing RabbitMQ"

sudo apt-get install -y rabbitmq-server

sudo rabbitmq-plugins enable rabbitmq_management
sudo rabbitmq-plugins enable rabbitmq_management_visualiser
sudo rabbitmq-plugins enable rabbitmq_management_agent

echo "=== Configuring RabbitMQ For Server"

#cp /vagrant/vagrant/ubuntu-virtualbox/rabbitmq.json /vagrant/server/config/default.json
