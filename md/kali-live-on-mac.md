# Making a Kali Live USB on Mac for Mac

First of all download the iso [from here](https://www.kali.org/downloads/)
I've downloaded the 64 bit version.

## Preparing the usb
```bash
# show your devices and detect which one is the USB you want to use, in my case /dev/disk2
$ diskutil list

# clean it
$ diskutil eraseDisk FAT32 kali /dev/disk2

# unmount it
$ diskutil unmoundDisk /dev/disk2

# write the image on it
$ dd if=<your-image.iso> of=/dev/disk2 bs=1M

# unmount it, and you are ready
· diskutil unmountDisk /dev/disk2
```

