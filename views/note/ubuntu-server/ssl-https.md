---
title: SSL and HTTPS
eleventyNavigation:
    key: SSL and HTTPS
    parent: Ubuntu Server
---
### Sources
- None.
### Prerequisites
- nginx installed
- nginx configuration(s) exists
### Install Certbot and nginx plugin
```bash
sudo apt install certbot python3-certbot-nginx
```
### Obtain and Install SSL Certificate
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d subdomain.yourdomain.com
```
### Test nginx configuration
```bash
sudo nginx -t
```
### Restart nginx
```bash
sudo systemctl restart nginx
```
