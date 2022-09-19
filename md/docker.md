# Docker

## Installing

### Mac

```bash
brew install docker
```

### Linux

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

## Usage

* Start docker: `sudo service docker start`
* Get docker version: `docker version`
* Get docker info: `docker info`
* Get all containers: `docker ps -a` (-a gets even stopped ones)
* Get all images: `docker images`
* Get all volumes: `docker volume ls`
* Get all networks: `docker network ls`
* See all containers stats in real time (CPU, memory usage...): `docker stats`

## Download images

* Download an image: `docker pull nginx`
* Download an image with a specific tag: `docker pull nginx:1.15.8`
* Download an image with a specific tag and save it with a different name: `docker pull nginx:1.15.8 --tag myNginx:1.15.8`

## Running a container

* Run a container with nginx image and expose port 80: `docker run -t -d -p 80:80 --name myNginx myNginx:1.15.8`
* Run a container and remove it when it stops: `docker run --rm -t -d -p 80:80 --name myNginx myNginx:1.15.8` (look at the --rm)
* Launch shell in a container: `docker exec -it myNginx /bin/bash`
* Stop a container: `docker stop myNginx`

## Docker networking

* List networks: `docker network ls`
* Create a network: `docker network create myNetwork`
* Create a bridge network: `docker network create --driver bridge myNetwork`. This will create a bridge interface and keep the containers isolated from the host.
* Create a MAVCLAN network: `docker network create --driver macvlan --subnet=10.7.1.0/24 --gateway=10.7.1.3 -o parent=eth0 myNetwork`. This will create a macvlan interface which will give each container a different IP address. The containers will be able to communicate with the host and other containers on the same network.
* Create a IPVLAN network: `docker network create --driver ipvlan --subnet=10.7.1.0/24 --gateway=10.7.1.3 -o parent=eth0 myNetwork`. This will create an ipvlan interface which will make the host to act as a router and give each container a different IP address.
* Create a none network: `docker network create --driver none myNetwork`. This will not create any interface and the containers will not be able to communicate with the host or other containers.
* Run a container with a specific network: `docker run -t -d -p 80:80 --name myNginx --network myNetwork myNginx:1.15.8`

## Docker volumes

* Create a volume: `docker volume create myVolume`
* Create a volume with a specific driver: `docker volume create --driver local --name myVolume`
