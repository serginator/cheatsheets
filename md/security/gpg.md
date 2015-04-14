# GnuPG

Some useful commands

## Create and manage keys

* `gpg --gen-key` generates a new key
* `gpg --edit-key <ID>` edits that key
  * `trust` handle trustness of that key
  * `<number>` selects an uid
    * `deluid` removes it
    * `primary` sets it as primary uid
  * `key <number>` selects a key
    * `delkey` removes it
  * `addkey` adds a new key
  * `sign` signs that key
  * `fpr` prints its fingerprint to check by phone for example
  * `addphoto` allows you to add a photo to your key
  * `setpref SHA512 SHA384 SHA256 SHA224 AES256 AES192 AES CAST5 ZLIB BZIP2 ZIP Uncompressed` strength hash prefs
* `gpg --gen-revoke <ID>` generates a revocation certificate

## Sharing keys

### List
* `gpg --list-keys` lists all keys
* `gpg -k` lists all keys too
* `gpg --list-secret-keys` list all secret keys
* `gpg -K` list your private keys

### Export
* `gpg --export -a <ID> > public.key` exports that user's public key
* `gpg --export-secret-key -a <ID> > private.key` exports the private key

### Import
* `gpg --import public.key` adds the public key to your public key ring

### Delete
* `gpg --delete-key <ID>` deletes that public key
* `gpg --delete-secret-key <ID>` deletes that secret key
* `gpg --delete-secret-and-public-keys <ID>` deletes both

## Encrypt data
* `gpg -e -u <sender ID> -r <receiver ID> file` creates file.gpg encrypted

## Decrypt data
* `gpg -o file -d file.gpg` decripts file.gpg into file

## Sign data
* `gpg -s textfile` signs a file with your key, without encrypt it

## Subkeys

Subkeys are bound to a master key pair, so you can export a stub of your
keys, use them to sign or encrypt documents, and if they are compromised, your
master key will not be there, so you can revoke them easily and create new 
keys. Really useful with security smart cards.

**(data from wiki.debian.org/Subkeys)**
### Create a new subkey for signing

First of all you should consider to make a backup of your ~/.gnupg folder.

  ```
  $gpg --edit-key YOURID
  gpg> addkey
  # Type your passphrase
  # Choose RSA (sign only)
  # Choose 4096 (or 2048) bit key size
  # Choose (or not) expiry date
  gpg> save
  # Repeat it for generate a RSA (encrypt only) if you want
  # Now we need to export subkeys, remove private key and import subkeys back.
  $gpg --export-secret-subkeys ID > secret-subkeys.txt
  $gpg --delete-secret-key ID
  $gpg import secret-subkeys.txt
  $gpg -K
  # You will see your master key as "sec#"
  # Optionally change the passphrase protecting the subkeys
  $gpg --edit-key ID paswd
  ```

## Yubikey

Now I'm going to show how to install a `Yubikey` smart card  and generate keys
for the `yubikey` smartcard. I'm using the Yubikey NEO.

**(data from https://www.2realities.com)**
### Installation in Ubuntu
```
sudo add-apt-repository ppa:yubico/stable
sudo apt-get update && sudo apt-get install yubikey-personalization-guide
  yubikey-neo-manager yubikey-personalization pcscd scdaemon gnupg2 pcsc-tools
# I want to use gpg2 so to keep things easier
sudo ln -s /usr/bin/gpg2 /usr/local/bin/gpg
# Enable gnupg agents
echo "use-agent" >> ~/.gnupg/gpg.conf
echo "enable-ssh-support" >> ~/.gnupg/gpg-agent.conf
```
You should enable CCID mode of Yubikey with neo manager.

### Creation of keys
```
# Lets work on a new .gnupg folder in our encrypted USB for example
mkdir /media/user/usb/gpghome /media/user/usb/armor-baks
chmod 700 /media/user/usb/gpghome /media/user/usb/armor-baks
export GNUPGHOME=/media/user/usb/gpghome
cat <<EOF > $GNUPGHOME/gpg.conf
default-preference-list SHA512 SHA384 SHA256
cert-digest-algo SHA512
use-agent
EOF

# generate new master key
gpg --gen-key # generate a key of 4096 bits

# generate revocation cert
gpg --output $GNUPGHOME/../armor-backs/revocation-cert --gen-revoke <ID>

# backup of master key
gpg -a --export-secret-keys > $GNUPGHOME/../armor-baks/masterkeys.txt

# Create subkeys for yubikey
gpg --expert --edit-key <ID>

gpg> addkey
# RSA sign only, 2048 bits
gpg> addkey
# RSA encrypt only, 2048 bits
gpg> addkey
# RSA set your own capabilities (8)
# Select Sign first, then Encrypt, then Authenticate, to keep
# only Authenticate as current allowed actions
# now "q", 2048
gpg> save

#backup subkeys
gpg -a --export-secret-subkeys > $GNUPGHOME/../armor-baks/subkeys.txt

#configure yubikey
gpg --card-edit
gpg/card> admin
# select 3, and change admin pin, by default it is 12345678 I think,
# and user pin is 123456, after that "q"
gpg/card> name # sets a name
gpg/card> lang
gpg/card> url # of your public.key shared in a keystore like pgp.mit.edu
gpg/card> sex
gpg/card> login
gpg/card> quit

#move subkeys to smartcard
gpg --edit-key <ID>
gpg> toggle
gpg> key 1
gpg> keytocard #select 1, signature
gpg> key 1 #to deselect it
gpg> key 2
gpg> keytocard #select 2, encryption
gpg> key 2
gpg> key 3
gpg> keytocard #select 3, authentication
gpg> save

#last backup
gpg -a --export-secret-keys > $GNUPGHOME/../armor-baks/masterkeys-stubs.txt
gpg -a --export-secret-subkeys > $GNUPGHOME/../armor-baks/subkeys-stubs.txt
gpg -a --export > $GNUPGHOME/../armor-baks/publickey.txt

#import the subkeys-stubs in other computers to be able to use them
gpg --import < subkeys-stubs.txt
```

Remember we made everything in an encrypted USB (or it is a good practice) so
you should go back to your environment with `export $GNUPGHOME=~/.gnupg` and
maybe import your subkeys-stubs.txt

Also, if using gpg 2.1 the authentication key that we've created before can
be used for ssh, so theoretically with `ssh-add -L` you could see it imported.
You can add your old keys to gpg key store just with `ssh-add $folder/id_rsa`

