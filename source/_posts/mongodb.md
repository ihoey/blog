---
title: MongoDB安装笔记
date: 2017-03-23 16:25:11
tags:
  - MongoDB
  - NoSQL
categories: MongoDB
---

## mongodb概述

- `MongoDB` 是一个跨平台的，面向文档的数据库，提供高性能，高可用性和可扩展性方便. `MongoDB` 将数据存储为一个文档，数据结构由键值 `(key=>value)` 对组成。`MongoDB` 文档类似于 `JSON` 对象。字段值可以包含其他文档，数组及文档数组。

<!--more-->

## mongodb安装

    mongodb下载地址 `https://www.mongodb.com/download-center#community` ,在此选择对应的系统版本进行安装

- `Windows` 系统的安装, 直接下一步即可
    + 对不知道系统版本和位数的同学这里提供两个命令可查看当前`Windows`系统的版本和位数.
```sh
    wmic os get caption
    wmic os get osarchitecture
```

- `Linux` 系统的安装:
    + 导入包管理系统使用的公钥 `sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6`
    + 为MongoDB创建一个列表文件:
        * `Ubuntu 12.04` 版本: `echo "deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu precise/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list`
        * `Ubuntu 14.04` 版本: `echo "deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list`
        * `Ubuntu 16.04` 版本: `echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list`
    + 重新加载本地包数据库 `sudo apt-get update`
    + 安装`MongoDB`包 `sudo apt-get install -y mongodb-org`

- `OS X` 系统的安装
    + 下载 `curl -O https://fastdl.mongodb.org/osx/mongodb-osx-x86_64-3.4.2.tgz`
    + 解压 `tar -zxvf mongodb-osx-x86_64-3.4.2.tgz`
    + 指定存放文件夹 `mkdir -p mongodb && cp -R -n mongodb-osx-x86_64-3.4.2 / mongodb`
    + 设置变量添加到`shell`的 `rc`文件中（例如`~/.bashrc`）： `export  PATH = <mongodb-install-directory> / bin：$ PATH`

## 运行

 - 创建数据目录(我这里是在`D`盘下) `mkdir -p /Server-related/DB`
 - 设置数据文件路径(在`mongodb`安装目录下运行) `mongod --dbpath=D:\Server-related\DB`

## 连接mongodb

- 打开`mongodb`安装目录下的 `mongo.exe`
