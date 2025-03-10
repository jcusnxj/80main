---
title: Build & deploy 11ty
eleventyNavigation:
    key: Build & deploy 11ty
    parent: Ubuntu Server
---
### Sources
- None
### Prerequisites
- nginx package is installed ([nginx installation](/note/nginx-installation))
- nginx configuration for single site exists ([nginx single site configuration](/note/nginx-single-site))
- your website's repository exists on GitHub
- git package is installed
### Adjust eleventy configuration
- Make sure your 11ty output directory matches the one defined as `root` in your nginx configuration.
- Output directory defined in 11ty configuration (see example below) is relative to the root of your repository. If you place your 11ty repository in `/var/www/my-site/` on your VPS then your 11ty output will be stored in `/var/www/my-site/my-directory`. This output directory should then be used in your nginx configuration (see example below).

_Eleventy configuration example_
```js
export default function (eleventyConfig) {
    // 11ty configuration
  };

export const config = {

    dir: {
        output: "my-directory" // custom output directory 
    }
};
```
_nginx configuration example_
```txt
server {
       listen          80;
       root            var/www/my-site/my-directory;
       index           index.html;
       server_name     my-site.org www.my-site.org; 

       location / { 
           try_files $uri $uri/ =404; 
       }
}
``` 
### Clone GitHub repository to VPS
```bash
git clone https://github.com/yourusername/your-repo.git var/www/my-site/
# clones your public repository to VPS directory
```
### Install Node.js and npm
```bash
sudo apt install nodejs
# installs Node.js from Ubuntu's default repository
```
```bash
sudo apt install npm
# installs Node.js from Ubuntu's default repository
```
### Install dependencies (including 11ty)
```bash
cd /var/www/my-site/
# navigate to your 11ty repository folder
```
```bash
npm install
# install dependencies
```
### Build your 11ty website
```bash
npx eleventy
# run it from your 11ty repository folder
```
### Check your website
- navigate to your website from the browser
### Single command update of your website
```bash
cd /var/www/my-site/ && git pull origin main && npm install && npx eleventy
```





