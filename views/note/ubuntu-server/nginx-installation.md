---
title: nginx installation
eleventyNavigation:
    key: nginx installation
    parent: Ubuntu Server
---
### Sources
- [Ubuntu Server Documentation](https://documentation.ubuntu.com/server/how-to/web-services/install-nginx/#install-nginx)
### Installation
```bash
sudo apt install nginx
# that's it, no further steps needed. 
```
### Check nginx status
```bash
sudo systemctl status nginx
```
### nginx default configuration
- After installation, nginx home page can be loaded at `http://your_server_ip`
- nginx default configuration is stored at `/etc/nginx/sites-available/`
- defaul nginx homepage is served from the following directory: `/var/www/html`
### Symlinks - enable/disable sites
- symlink is a shortcut to a configuration file located in `/etc/nginx/sites-available/`. It allows Nginx to recognize and load a website’s configuration.
- symlinks are stored at `/etc/nginx/sites-enabled/`. If symlink does not exist, nginx will ignore a website's configuration.
- You can disable/enable any website by deleting/creating symlink to its configuration file:
```bash
sudo rm /etc/nginx/sites-enabled/default
# disables nginx default homepage by deleting symlink to its configuration

sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/
# enables nginx default homepage by creating symlink to its configuration
``` 
### Test new nginx configuration
```bash
sudo nginx -t
# always test a new configuration before running reload/restart
```
### Reload nginx
```bash
sudo systemctl reload nginx
# reloads configuration without stopping the nginx process
# useful when only configuration files are updated
```
### Restart nginx
```bash
sudo systemctl restart nginx
# completely stops and starts nginx process
# needed when installing new modules 
```
### Disable/enable nginx automatic start
```bash
sudo systemctl disable nginx
# prevents nginx from automatic start at boot time

sudo systemctl disable nginx
# enables nginx from automatic start at boot time
```
### Reinstall nginx
```bash
sudo apt-get install --reinstall nginx
# restores the default configuration files without affecting other configurations.
```
