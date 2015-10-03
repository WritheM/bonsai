#!/usr/bin/env bash

echo "=== Installing MySQL"

sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password bonsai'
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password bonsai'
sudo apt-get -y install mysql-server

echo "=== Configuring MySQL"

mysql -u root -pbonsai < /vagrant/vagrant/ubuntu-virtualbox/initialize-mysql.sql