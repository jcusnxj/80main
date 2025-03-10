---
title: Package management
eleventyNavigation:
    key: Package management
    parent: Ubuntu Server
---
### Sources
- [Ubuntu Server Documentation](https://documentation.ubuntu.com/server/tutorial/managing-software/)

### Notes
- `apt` - Advanced Packaging Tool
- `dpkg` - Debian Package Manager
- `sudo` - grants regular users temporary (per command) admin privileges to make system changes

### Update (database)
```bash
sudo apt update
# updates the APT database with the newest packages' metadata
```
### Upgrade (packages)
```bash
apt list --upgradable 
# packages that can be upgraded to newer versions

sudo apt upgrade 
# upgrades only packages without dependency issues

sudo apt dist-upgrade 
# able to resolve conflicts between package versions
```
### Search, show and list packages
```bash
apt search webserver 
# list of all “webserver” packages that can be found

apt show nginx 
# inspect the description and summary details of any package

apt list ssl-cert 
# check the packgae is installed in the system
```
### Install packages
```bash
sudo apt install nginx apache2 
# installs multiple packages including recommended packages

sudo apt install nginx --no-install-recommends 
# installs package without recommended packages

sudo apt install apache2 --install-suggests 
# installs also the suggested packages

sudo apt install --reinstall apache2 
# reinstalls the package (overwrite any package files except for conffiles)
```
### Search and list packages
```bash
dpkg --listfiles ssl-cert 
# list of files and their directory structure for the package

dpkg --search /usr/share/ssl-cert/ssleay.cnf 
# provides the package name for the given file
```
### Conffiles
```bash
dpkg-query --show -f='${Conffiles}\n' apache2 
# returns conffiles for the package, also returs MD5 checksum or MD5 hash

md5sum /etc/apache2/apache2.conf 
# returns MD5 checksum for the given file

dpkg --verify apache2 
# verifies the checksums of the files on our system against those 
# held in the package index for the given package and finds any mismatch
```
### Remove package
```bash
sudo apt remove nginx
# removes the package but not other dependencies the package needed
# does not remove conffiles
```
### Remove package including conffiles
```bash
sudo apt remove --purge nginx
# removes the package and conffiles
```
### Autoremove dependencies
```bash
sudo apt autoremove
# removes packages flagged for automatic removal
# the original reason for the package to be installed no longer exists
# you can unflag package from automatic removal by running manual install
```




