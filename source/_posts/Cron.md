---
title: Ubuntu 使用 Cron 实现计划任务
date: 2017-04-22 00:21:21
tags:
  - Ubuntu
  - Cron
  - Linux
  - shell
categories: Cron
---

Windows 自带定时执行任务的工具叫做“计划任务”，Linux 下我们使用 Cron 实现这一功能。

<!--more-->


## 安装 cron 服务

- 通常 ubuntu 下自带 cron，如果没有也可以通过以下命令进行安装：`apt-get install cron`
- 若已经安装，输入以下命令判断 cron 服务是否启动：`pgrep cron`
- 如果有 pid （一串数字）输出则说明 cron 服务已经启动，没有任何输出说明需要手动启动 cron 服务。

## 启动 cron 服务

- 启动服务 `service cron start`

## 编辑计划文件

`crontab -e`

来打开你的用户所属的crontab文件。第一次用这个命令，会让你选择文本编辑器，我选的是vim。选定的编辑器也可以使用

你也可以每次自己更改 `select-editor`

## 重启 cron 服务

每次保存了crontab之后，我们还需要重启cron来应用这个计划任务。使用命令：`sudo service cron restart`

## 管理任务计划文件

cron 的所有任务计划都记录在 crontab 任务计划文件中，通过 crontab 命令对该任务文件进行管理。

```sh
$ crontab -u root -e     #编辑用户 root 的计划任务文件

$ crontab -e            #编辑当前用户的计划任务文件

$ crontab -u root -l     #显示用户 root 的计划任务文件

$ crontab -l            #显示当前用户的计划任务文件

$ crontab -r            #删除当前用户的计划任务文件
```

## cron 语法格式

```sh
m h dom mon dow   command
0-59 0-23 1-31 1-12 0-7  command
```

- m: 表示分钟
- h: 表示小时
- dom: 表示日期
- mon: 表示月份
- dow: 表示星期
- command: 预执行的命令

另外需要使用一些特殊符号实现灵活的配置：

- `* 代表所有值`
- `/ 代表“每”`
- `- 代表范围`
- `, 分割数字`

## 任务示例

```sh
## 指定具体执行时间
2   *  *  *  * ls    #每个小时的第2分钟执行一次 ls 命令
30  7  *  *  * ls    #每天7：30执行一次 ls 命令
30 20  *  *  2 ls    #每周二，20：30执行一次 ls 命令（0和7表示星期天）

## 指定间隔时间
*/2 *  *  *  * ls    #每隔2分钟执行一次 ls 命令

## 指定时间段
30  7 3-6 *  * ls    #每个月的3，4，5，6号的7：30分各执行一次 ls 命令

## 指定多个时间
30  7 3,6 *  * ls    #每月的3号和6号的7：30分各执行一次 ls 命令
```

另外，使用 run-parts 可以运行指定目录下所有的脚本（注意脚本必须加上 “#!/bin/bash"，否则 run-parts 会调用失败）

```sh
30 7 * * * run-parts /home   #每天7：30运行 /home 目录下的所有脚本
```
