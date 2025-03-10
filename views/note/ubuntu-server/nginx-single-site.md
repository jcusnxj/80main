---
title: nginx single site configuration
eleventyNavigation:
    key: nginx single site configuration
    parent: Ubuntu Server
---
### Sources
- [Ubuntu Server Configuration](https://documentation.ubuntu.com/server/how-to/web-services/configure-nginx/)
### Prerequisites
- nginx is installed
### Create website's nginx configuration
- Create config file (see example below) at `/etc/nginx/sites-available/`. You can name it for instance `mysite.conf`
- `root` - replace `/srv/my-site/html` with the directory your website will be served from
- `server_name` - replace `my-site.org www.my-site.org` with actual domains for your website
```txt
server {
       listen          80;
       root            /srv/my-site/html;
       index           index.html;
       server_name     my-site.org www.my-site.org; 

       location / { 
           try_files $uri $uri/ =404; 
       }
}
```
### Create website's files
```bash
echo '<h1>Hey there!</h1>' > /srv/my-site/html/index.html
# creates index.html in your root directory
# replace /srv/my-site/html/ with your actual directory path
```
### Update your DNS settings
- create `A` record with name `@` and value `your_server_ip`
- create `CNAME` record with name `www` and value `my-site.org` 
### Create symlink for nginx configuration
```bash
sudo ln -s /etc/nginx/sites-available/mysite.conf /etc/nginx/sites-enabled/
# your website's configuration would be disabled without symlink
```
### Remove symlink for nginx default configuration (optional)
```bash
sudo rm /etc/nginx/sites-enabled/default
```
### Test nginx configuration
```bash
sudo nginx -t
# you should be returned with "test is successful" message
# if not do not continue until you resolve reported issues
```
### Reload nginx
```bash
sudo systemctl reload nginx
# reloads nginx with your new configuration
```
### Visit your website
- Navigate to your website in browser: `http://my-site.org` or `http://www.my-site.org`. You should see your website with _"Hey there!"_ message.
- Make sure you use http in the address (not https) as your configuration supports unsecured connection only.
### Next steps
- SSL and HTTPS
- [Build and deploy 11ty](/note/build-deploy-11ty/) 

