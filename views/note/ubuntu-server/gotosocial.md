---
title: GoToSocial installation
eleventyNavigation:
    key: GoToSocial installation
    parent: Ubuntu Server
---
### Sources
- [GoToSocial Bare metal installation](https://docs.gotosocial.org/en/latest/getting_started/installation/metal/)
- [nginx reverse proxy for GoToSocial](https://docs.gotosocial.org/en/latest/getting_started/reverse_proxy/nginx/)
### Prerequisites
- nginx installed
### Create directory structure
```bash
mkdir -p /gotosocial/storage/certs
# creates directory structure for GTS
```
### Download the latest release
```bash
cd /gotosocial
GTS_VERSION=0.18.1
GTS_TARGET=linux_amd64
wget https://github.com/superseriousbusiness/gotosocial/releases/download/v${GTS_VERSION}/gotosocial_${GTS_VERSION}_${GTS_TARGET}.tar.gz
```
__Note:__ You can find the list of releases right [here](https://github.com/superseriousbusiness/gotosocial/releases). You need to select right `GTS_VERSION` and `GTS_TARGET` depending on your OS. 
### Extract the latest release
```bash
tar -xzf gotosocial_${GTS_VERSION}_${GTS_TARGET}.tar.gz
```
### Remove archive
```bash
rm gotosocial_${GTS_VERSION}_${GTS_TARGET}.tar.gz
```
### Create DNS records
- create A record for `subdomain.my-site.org` pointing to VPS IP
- create AAAA record for `subdomain.my-site.org` pointing to IPv6
### Create and edit GoToSocial configuration
```bash
cp /gotosocial/example/config.yaml /gotosocial/
cd /gotosocial/
nano config.yaml
```
`config.yaml`
```bash
application-name: "gotosocial"
landing-page-user: "frantisek"
host: "subdomain.my-site.org"
bind-address: "127.0.0.1"
port: 8080
letsencrypt-enabled: false
db-type: "sqlite"
db-address: "sqlite.db"
storage-local-base-path: "/gotosocial/storage"
instance-languages: ["en","cs"]
accounts-registration-open: false
accounts-allow-custom-css: true
accounts-custom-css-length: 10000
media-local-max-size: 40MiB
media-image-size-hint: 5MiB
media-video-size-hint: 40MiB
media-remote-max-size: 40MiB
advanced-rate-limit-requests: 300
instance-inject-mastodon-version: true
```
### Create and edit nginx configuration for GoToSocial
```bash
cd /etc/nginx/sites-available
nano gts.conf
```
`gts.conf`
```txt
server {
  listen 80;
  listen [::]:80;
  server_name subdomain.my-site.org;
  location / {
    # set to 127.0.0.1 instead of localhost to work around https://stackoverflow.com/a/52550758
    proxy_pass http://127.0.0.1:8080;
    proxy_set_header Host $host;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
  client_max_body_size 40M;
}
```
### Create symlink for GoToSocial nginx configuration
```bash
sudo ln -s /etc/nginx/sites-available/gts.conf /etc/nginx/sites-enabled/
```
### Test nginx configuration
```bash
sudo nginx -t
```
### Restart nginx
```bash
sudo systemctl restart nginx
```
### SSL and HTTPS
- Follow the instructions in [SSL and HTTPS](/note/ssl-https).
### Start the GoToSocial Server
```bash
cd /gotosocial
./gotosocial --config-path ./config.yaml server start
```
You should be now able to access your GoToSocial instance at your domain. You can stop the server again.
### Create user
```bash
./gotosocial --config-path /path/to/config.yaml \
    admin account create \
    --username some_username \
    --email some_email@whatever.org \
    --password 'SOME_PASSWORD'
```
### Assign admin rights to an user
```bash
./gotosocial --config-path /path/to/config.yaml \
    admin account promote --username some_username
```
### Enable the systemd dervice
```bash
sudo useradd -r gotosocial
sudo groupadd gotosocial
sudo usermod -a -G gotosocial gotosocial
# creates a new user and group for your GoToSocial installation
```
```bash
sudo chown -R gotosocial:gotosocial /gotosocial
# make them the owner of your GoToSocial installation since they will need to read and write in it
```
```bash
sudo cp /gotosocial/example/gotosocial.service /etc/systemd/system/
# copies gotosocial.service example file
```
```bash
sudoedit /etc/systemd/system/gotosocial.service
# edit gotosocial.service and uncomment AmbientCapabilities=CAP_NET_BIND_SERVICE
```
```bash
sudo systemctl enable --now gotosocial.service
# enable the service
# GoToSocial should be up and running
```

