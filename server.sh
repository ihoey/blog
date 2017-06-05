scp -r public/ ihoey:scp/
ssh ihoey
cd scp/
sudo mv public/ /var/www/
sudo rm -rf hexo
sudo mv public/ hexo
