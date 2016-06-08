# Instructions

To generate awesome images applying the style of an image to another image
Read the README.md at [neural-style](https://github.com/jcjohnson/neural-style)
for learning how to use the tool.

+ Install torch

```
git clone https://github.com/torch/distro.git ~/torch --recursive
cd ~/torch; bash install-deps;
./install.sh
source ~/.bashrc # or .zshrc or .profile
```

+ Install caffe

```
sudo apt-get install libprotobuf-dev protobuf-compiler # for mac "brew install protobuf"
luarocks install loadcaffe
```

+ Install neural_style and presets

```
git clone https://github.com/jcjohnson/neural-style.git ~/neural-style
cd ~/neural-style && sh models/download_models.sh
```

+ Usage

```
th neural_style.lua -style_image <path-to-style-img> -content_image <path-to-image-to-process> -gpu -1 -output_image <path-to-output-image>.png
# "-gpu -1" to use just CPU
```

## Examples

<img src="../res/jiji1.jpg" width="200">
<img src="../res/jiji2.jpg" width="200">
<img src="../res/jiji3.jpg" width="200">

