# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  config.vm.box = "ubuntu/trusty64"

  config.vm.network "forwarded_port", guest: 1337, host: 1337
  config.vm.network "forwarded_port", guest: 8080, host: 8080
  config.vm.network "forwarded_port", guest: 8081, host: 8081
  config.vm.network "forwarded_port", guest: 15672, host: 15672

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
    vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/vagrant", "1"]
  end

  # Installation Provisioner
  config.vm.provision "shell", path: "./vagrant/ubuntu-virtualbox/provision/provision-setup.sh"

  # Every Time Provisioner
  config.vm.provision "shell", path: "./vagrant/ubuntu-virtualbox/provision/provision-always.sh", run: "always"

end
