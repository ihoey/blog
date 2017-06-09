#!/bin/bash
scp -r public/ ihoey:scp/
ssh ihoey "cd scp/ && sudo mv public/ /var/www/ && sudo rm -rf /var/www/hexo && sudo mv /var/www/public/ /var/www/hexo && exit"
