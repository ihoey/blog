---
title: 解决 ubuntu 服务器中文乱码
tags:
  - Linux
  - shell
  - Ubuntu
categories:
  - Linux
date: 2018-03-15 19:02:18
---

之前买了阿里云的服务器，后来在上面编辑中文字符的时候发现乱码，在网上找了下解决方案，发现比较乱，有的也不太好用，特此整理了一下可用的一个方案。

<!-- more -->

## 检查

检查是否已经安装了中文包支持。终端输入： `sudo dpkg -l` 查看是否安装了中文支持（ `language-pack-zh`）的软件包。

## 安装

没有安装，那就终端执行命令 ： `apt-get install language-pack-zh`

## 配置语言环境变量

```bash
vim /etc/environment
```

在下面添加如下两行:

```bash
LANG="zh_CN.UTF-8"
LANGUAGE="zh_CN:zh:en_US:en"
```

打开文件:

```bash
sudo vim /var/lib/locales/supported.d/local
```

添加zh_CN.GB2312字符集，如下:

```bash
en_US.UTF-8 UTF-8
zh_CN.UTF-8 UTF-8
zh_CN.GBK GBK
zh_CN GB2312
```

保存后，执行命令:

```bash
sudo locale-gen
```

## 设置系统默认语言

`vim` 编辑器编辑文档:

```bash
sudo vim /etc/default/locale
```

修改为:

```bash
LANG="zh_CN.UTF-8"
LANGUAGE="zh_CN:zh:en_US:en"

sudo reboot
```

重启 `Ubuntu` 下次登录就是中文界面的了。而且也解决了系统中文的乱码现象。
