---
title: 科学上网之shadowsocks 服务端安装
date: 2017-03-16 18:38:46
tags:
    - 科学上网
    - shadowsocks
categories: shadowsocks
---

简单几步就可安装好shadowsocks,哈哈

<!-- more -->

## 安装shadowsocks依赖

- sudo -s // 获取超级管理员权限
- apt-get update // 更新apt-get
- apt-get install python-pip // 安装python包管理工具pip
- pip install shadowsocks // 安装shadowsocks

## 配置shadowsocks

- vi /etc/shadowsocks.json

```json
//单一端口
{
    "server":"0.0.0.0",//服务器 ip地址 (IPv4/IPv6)
    "server_port":1121,//服务器监听的端口,注意不要设为使用中的端口
    "local_address":"127.0.0.1",//默认即可
    "local_port":1080,
    "password":"password",//密码
    "timeout":300,//超时时间（秒）
    "method":"aes-256-cfb",//加密方式
    "fast_open":false
}

//多端口
{
    "server":"0.0.0.0",
    "port_password": {
        "1121": "password",
        "1122" : "password"
    },
    "timeout":300,
    "method":"aes-256-cfb",
    "fast_open": false
}
```

## 开启shadowsocks服务

- ssserver -c /etc/shadowsocks.json -d start

## 关闭

- ssserver -d stop

## 日志

- /var/log/shadowsocks.log

## 帮助

- ssserver -h

    如果出现故障，试试把/etc/shadowsocks.json里改为"server"="0.0.0.0". 小心不要掉`,`
