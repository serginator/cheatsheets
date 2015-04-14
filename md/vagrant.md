# vagrant command

## up and running

```
vagrant init ubuntu/trusty64
vagrant up
```

## interesting machines in HashiCorp

[full list here](https://atlas.hashicorp.com/boxes/search)
* `ubuntu/trusty32` or `ubuntu/trusty64`
* `hashicorp/precise32` or `hashicorp/precise64`
* `puphet/debian75-x64`

## commands

* `vagrant` or `vagrant ssh` opens a shell
* `vagrant suspend` pauses the vm
* `vagrant resume` resumes the vm
* `vagrant halt` halts the vm (poweroff)
* `vagrant up` starts halted vm
* `vagrant destroy` removes the vm
* `vagrant provision` re-provision the vm
* `vagrant status` shows the status of a vm
* `vagrant global-status` shows status of all VMs with their ids so you can manage them everywhere
* `vagrant init` inits a Vagrantfile in a folder
* `vagrant box add hashicorp/precise32` store a box to be used with init or vagrantfiles


