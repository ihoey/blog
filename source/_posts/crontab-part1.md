---
title: crontab 踩坑之绝对路径
date: 2018-02-13 10:09:26
  - Ubuntu
  - Cron
  - Linux
  - shell
categories: Linux
---

由于放假后网络原因不方便使用电脑，需要创建一个 `crontab` 定时任务，用来在每天固定时间执行一个 `Shell` 脚本

<!--more-->

## 过程

### 添加计划任务

```bash
crontab -e

* 10,19 * * * sh /root/home/cron.sh >> /root/home/temp.txt #每天10点和19点执行一次,路径一定要是绝对路径
30 9 * * * curl "https://sc.ftqq.com/SCU10625Td571049c53dd2e36148f134*****44ef59855df9df77c.send?text=-~" # 每天九点半执行一次
```

### 重启计划任务

```bash
sudo service crond start
```

到了时间以后发现第一个没有反应,第二个是有效的,后来一步步排查问题发现问题

## 问题

在 `Shell` 脚本中，有对该脚本所在目录的相关文件进行操作的逻辑，在一开始实现时，对当前目录的文件操作时都是使用的相对目录，即 `./*` 。在终端直接 `sh` 执行时没有任何问题，正常结束，而一旦在 `crontab` 中定时执行时，就出现问题，如提示 `file not found` 或者没有任何输出等错误。


之前的脚本内容是

```bash
echo "test" >> temp.txt
git add .
git commit -m"更新"
git push origin master
```

## 解决问题

出现问题后，我在脚本中试着打印出 `crontab` 执行时的当前目录，如 `curPath=$(pwd)` ，执行后发现，打印出的结果为 `$HOME` 的目录，而非脚本所在的原始目录，这就造成了在脚本中使用相对路径时出现找不到的情况。

找到问题后，解决方法有两个：

- 将相对路径替换为绝对路径。（ps：如脚本中包含某些Shell命令，且命令的某些参数为默认当前目录的，都需要显式的给出绝对路径）
- 在操作相对路径之前，使用 `cd /....../` ，在执行脚本时强制进入到该目录。

```bash
cd /root/home/

echo "test" >> temp.txt
git add .
git commit -m"更新"
git push origin master
```

### 排查问题可以查看日志来看是否执行

```bash
#编辑rsyslog
sudo vim /etc/rsyslog.d/50-default.conf
#找到rsyslog中cron一行将前面的注释符#去掉
cron.*              /var/log/cron.log
#重启rsyslog
sudo  service rsyslog  restart
# 然后查看日志,到指定时间看是否执行
tail -f /var/log/cron.log
```

## 附录

系统在执行定时任务时，是不会加载任何环境变量的，所以当脚本需要环境变量时，可以通过在脚本中添加 `source /etc/profile` 命令来使配置生效。
