---
title: Linux常用命令笔记
date: 2017-05-26 21:49:04
tags:
  - Linux
  - shell
categories: Linux
---

记录使用到的 `Linux` 命令!

<!-- more -->

## 安装 Git

- 安装: `sudo apt-get install git` , `git` 配置请查看[]()。

## 安装 Nginx

- 安装: `sudo apt-get install nginx`
- 启动: `sudo /etc/init.d/nginx start`
- 停止: `sudo /etc/init.d/nginx stop`
- 重启: `sudo /etc/init.d/nginx restart`
- 检查配置文件: `sudo service nginx configtest`
- 重载配置文件: `sudo service nginx reload`
- 查询nginx进程: `ps -ef | grep nginx`

## Nginx 配置

`sudo vim /etc/nginx/sites-available/default`

```bash
server {
    listen 80 default_server;
    listen [::]:80 default_server ipv6only=on;

    # 如果要支持HTTPS，修改这里
    # 可以使用 https://letsencrypt.org 的免费SSL证书
    #listen 443 ssl;
    #ssl_certificate     www.example.com.crt;
    #ssl_certificate_key www.example.com.key;
    #ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
    #ssl_ciphers         HIGH:!aNULL:!MD5;

    # 重定向所有HTTP到HTTPS
    # rewrite ^(.*)$ https://$host$1 permanent;

    # 网站根目录，根据需要修改
    root /usr/share/nginx/html;
    # 增加index.php
    index index.php index.html index.htm;

    # 假设域名是 ssl.mcxiaoke.com
    server_name ssl.mcxiaoke.com; #绑定域名

    location / {
        try_files $uri $uri/ =404;
    }

    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }

    #支持php-fpm的配置
    location ~ \.php$ {
        try_files $uri =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/var/run/php5-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

## 安装 MySQL

- 安装: `sudo apt-get install mysql-server`

## 安装 php-fpm

- 安装: `sudo apt-get install php5-fpm`
- 重启: `sudo service php5-fpm restart`
- 安装PHP常用扩展: `sudo apt-get install php5-mysql php5-curl php5-gd php5-intl php-pear php5-imagick php5-imap php5-mcrypt php5-memcache php5-ming php5-ps php5-pspell php5-recode php5-snmp php5-sqlite php5-tidy php5-xmlrpc php5-xsl php5-xcache`

## 常用linux命令说明

- 查看端口占用: `lsof -i:80`
- 杀死进程: `kill -9 3274`
- `tar`
    + z- 用`gzip`对存档压缩或解压
    + x-从存档展开文件
    + v-详细显示处理的文件
    + f-指定存档或设备
- `chmod`
    +

- 更新源: `sudo apt-get update`
- 更新已安装的包`sudo apt-get upgrade`

## 账号和密码文件

```bash
ls -al /etc/passwd /etc/shadow
-rw-r–r– 1 root root 1611 2011-12-16 05:30 /etc/passwd # 保存的是账号
-rw-r—– 1 root shadow 947 2011-12-16 05:30 /etc/shadow # 账号的密码等信息
```

### /etc/passwd

```bash
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/bin/sh
bin:x:2:2:bin:/bin:/bin/sh
sys:x:3:3:sys:/dev:/bin/sh
```

1. 账号名称
2. 原先用来保存密码的，现在密码都放在/etc/shadow中，所以这里显示x
3. UID，也就是使用者ID。默认的系统管理员的UID为0，我们添加用户的时候最好使用1000以上的UID，1-1000范围的UID最好保留给系统用。
4. GID，也就是群组ID
5. 关于账号的一些说明信息（暂时可以忽略）
6. 账号的家目录，家目录就是你登陆系统后默认的那个目录
7. 账号使用的shell

### /etc/shadow

```bash
root:!:15324:0:99999:7:::
daemon:*:15259:0:99999:7:::
bin:*:15259:0:99999:7:::
letuknowit:$1$cPf/cIvr$sCws95uSip2ljTK052DDB.:15400:5:60:7:2:15490:
```

1. 账户名称（密码需要与账户对应的嘛）
2. 加密后的密码（总不能学CSDN放明文密码，是吧），如果这一栏的第一个字符为!或者*的话，说明这是一个不能登录的账户，从上面可以看出，ubuntu默认的就不启用root账户。
3. 最近改动密码的日期（不是日期吗，咋是一堆数字，别急，这个是从1970年1月1日算起的总的天数）。那怎么才能知道今天距1970年1月1日有多少天呢？很简单，你改下密码，然后看下这个栏目中的数字是多少就可以了！
4. 密码不可被变更的天数：设置了这个值，则表示从变更密码的日期算起，多少天内无法再次修改密码，如果是0的话，则没有限制
5. 密码需要重新变更的天数：密码经常更换才能保证安全，为了提醒某些经常不更换密码的用户，可以设置一个天数，强制让用户更换密码，也就是说该用户的密码会在多少天后过期，如果为99999则没有限制
6. 密码过期预警天数：如果在5中设置了密码需要重新变更的天数，则会在密码过期的前多少天进行提醒，提示用户其密码将在多少天后过期
7. 密码过期的宽恕时间：如果在5中设置的日期过后，用户仍然没有修改密码，则该用户还可以继续使用的天数
8. 账号失效日期，过了这个日期账号就不能用了
9. 保留的

以上面最后用户letuknowit为例（15400对应的日期为2012年3月1日），其保护如下信息：
3. 用户letuknowit最近一次修改密码的日期是2012年3月1日，
4. 在2012年3月6日之前不能再改动密码了，
5. 在2012-3-1到2012-4-29期间letuknowit需要更改密码，
6. 在2012-4-29之前的7天，letuknowit登陆系统的时候，系统会提示letuknowit其密码即将过期，
7. 如果letuknowit一直到2012-4-29都没有修改密码，则其仍然可以继续使用该账户2天，2天后该账户将不可用
8. 无论如何，到了2012年5月29日，该账号都将失效

## 主机名

- 查看主机名: `hostname` 或`uname –n`，均可以查看到当前主机的主机名。
- 临时修改主机名: `hostname 新主机名`
- 永久修改主机名: `/etc/hostname`文件中修改
- `host` 文件: `/etc/hosts` 存放的是域名与ip的对应关系, 添加一个新主机名到`127.0.0.1`.


待续中...
