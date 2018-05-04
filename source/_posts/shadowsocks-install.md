---
title: 科学上网之shadowsocks 服务端安装
date: 2017-03-16 18:38:46
tags:
  - 科学上网
  - shadowsocks
categories: shadowsocks
---

轻松搭建`shadowsocks`,及相关配置说明

<!-- more -->

## 安装shadowsocks依赖(我的服务器系统是ubuntu)

- `sudo -s` // 获取超级管理员权限
- `apt-get update` // 更新apt-get
- `apt-get install python-pip` // 安装python包管理工具pip
- `pip install shadowsocks` // 安装shadowsocks

## 配置shadowsocks

- `vi /etc/shadowsocks.json`

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
   "server":"my_server_ip",  //填入你的IP地址
   "local_address": "127.0.0.1",
   "local_port":1080,
    "port_password": {
        "8381": "foobar1",    //端口号，密码
        "8382": "foobar2",
        "8383": "foobar3",
        "8384": "foobar4"
   },
   "timeout":300,
   "method":"aes-256-cfb",
   "fast_open": false
  }
```

## 优化shadowsocks服务

- 在终端输入 `vi /etc/sysctl.d/local.conf`

```json
  # max open files
  fs.file-max = 1024000
  # max read buffer
  net.core.rmem_max = 67108864
  # max write buffer
  net.core.wmem_max = 67108864
  # default read buffer
  net.core.rmem_default = 65536
  # default write buffer
  net.core.wmem_default = 65536
  # max processor input queue
  net.core.netdev_max_backlog = 4096
  # max backlog
  net.core.somaxconn = 4096

  # resist SYN flood attacks
  net.ipv4.tcp_syncookies = 1
  # reuse timewait sockets when safe
  net.ipv4.tcp_tw_reuse = 1
  # turn off fast timewait sockets recycling
  net.ipv4.tcp_tw_recycle = 0
  # short FIN timeout
  net.ipv4.tcp_fin_timeout = 30
  # short keepalive time
  net.ipv4.tcp_keepalive_time = 1200
  # outbound port range
  net.ipv4.ip_local_port_range = 10000 65000
  # max SYN backlog
  net.ipv4.tcp_max_syn_backlog = 4096
  # max timewait sockets held by system simultaneously
  net.ipv4.tcp_max_tw_buckets = 5000
  # TCP receive buffer
  net.ipv4.tcp_rmem = 4096 87380 67108864
  # TCP write buffer
  net.ipv4.tcp_wmem = 4096 65536 67108864
  # turn on path MTU discovery
  net.ipv4.tcp_mtu_probing = 1

  # for high-latency network
  net.ipv4.tcp_congestion_control = hybla
  # forward ivp4
  net.ipv4.ip_forward = 1
```

- 配置生效：`sysctl --system`

## 开启shadowsocks服务

- `ssserver -c /etc/shadowsocks.json -d start`

## 关闭

- `ssserver -c /etc/shadowsocks.json -d stop`

## 重启

- 重启(修改配置要重启才生效)：`ssserver -c /etc/shadowsocks.json -d restart`

## 日志

- `/var/log/shadowsocks.log`

## 帮助

- `ssserver -h`

    如果出现故障，试试把`/etc/shadowsocks.json`里改为`"server"="0.0.0.0".` 小心不要掉`,`

## 开机启动

- 在终端输入 `vi /etc/rc.local`
- 把 `sudo ssserver -c /etc/shadowsocks.json -d start`加进去
