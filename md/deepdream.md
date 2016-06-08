# Instructions

To generate awesome images applying deepdream's google algorythm.

## Installation

There are several ways to achieve this, but probably the easiest is to use 
[docker](https://www.docker.com/) and some dockerfile that someone has
already prepared. Some of this informations has been read at [medium](https://medium.com/google-cloud/deep-dream-with-containers-d28a26e4c8a3#.506kqcbfj) or [github](https://github.com/VISIONAI/clouddream).

```
git clone https://github.com/saturnism/deepdream-cli-docker.git
cd deepdream-cli-docker
docker build -t deepdream-cli .
```

## Usage

```
# view arguments
docker run deepdream-cli -h

# quick use
cat jiji.jpg | docker run -i deepdream-cli > output.jpg

# more options
cat jiji.jpg | docker run -i deepdream-cli -l conv2/norm2 -o 6 > output.jpg
```

## Multi-core

The process is single threaded, but you can process several images at a time
to use all cores, for example

```
for f in *.jpg; \
  do { cat $f | docker run -i deepdream-cli > out_$f; } & \
done;
```

## Examples

<img src="../res/jiji-dream.jpg" width="200">
<img src="../res/pepa-dream.jpg" width="200">
<img src="../res/dc-dream.jpg" width="200">

