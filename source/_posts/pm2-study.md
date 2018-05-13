---
title: 记一下 pm2 常用配置及命令
tags:
  - pm2
categories:
  - Node
date: 2018-05-13 16:45:46
---

`PM2` 是 `node` 进程管理工具，可以利用它来简化很多 `node` 应用管理的繁琐任务，如性能监控、自动重启、负载均衡等，而且使用非常简单。本文就 `PM2` 进行入门性的介绍，基本涵盖了 `PM2` 的常用的功能和配置。

## 安装

```bash
npm install -g pm2
```

## 常用命令

```bash
pm2 start [server.js]
# 启动服务
pm2 list
# 查看当前所跑服务的详情
pm2 show [name]
# 查看更加详细的信息这个命令可查看pm2配置 包括日志文件存放的位置等
pm2 stop [id/name]
# 关闭某个服务
pm2 delete [id/name]
# 删除某个服务
pm2 stop all
# 关闭所有服务
pm2 logs
# 查看实时日志
pm2 restart [name]
# 重新启动服务
```

## 启动

参数说明：
- `--watch`：监听应用目录的变化，一旦发生变化，自动重启。如果要精确监听、不见听的目录，最好通过配置文件。
- `-i --instances`：启用多少个实例，可用于负载均衡。如果 `-i 0` 或者 `-i max`，则根据当前机器核数确定实例数目。
- `--ignore-watch`：排除监听的目录/文件，可以是特定的文件名，也可以是正则。比如 `--ignore-watch="test node_modules "some scripts""`
- `-n --name`：应用的名称。查看应用信息的时候可以用到。
- `-o --output <path>`：标准输出日志文件的路径。
- `-e --error <path>`：错误输出日志文件的路径。

## 监听

```bash
pm2 start ./bin/www --watch
#注意，这里用了--watch参数，意味着当你的应用代码发生变化时，pm2会帮你自动重启服务
```


## 配置及部署

部署的配置文件示例

```json
{
  // 数组中放的是需要发布的项目一些变量的定义
  "apps": [{
    "name": "xxx", //项目名称
    "script": "server.js", //用来启动的脚本
    // "instances":2,
    // 启动项目所需要的环境变量
    "env": {
      "COMMON_VARIABLE": "true", //设置为true 可以在启动的时传入外部的变量进去
    },
    "env_production": {
      "NODE_ENV": "production"
    }
  }],
  // 部署
  "deploy": {
    "production": {
      "user": "root",
      "host": "0.0.0.0", //可以是数组 部署到多台主机
      "ref": "origin/master", //选择拿哪个个分支的代码
      "repo": "git@github.com:ihoey/hitalk.git", //仓库地址
      "path": "/root/www/hitalk/production", //要发布到服务器上哪个目录下面
      "ssh_options": "StrictHostKeyChecking=no", //避免key验证导致代码更新到远程仓库失败
      "post-deploy": "source ~/.nvm/nvm.sh && pm2 startOrRestart ecosystem.json --env production", //发布之后执行的动作 执行开启或更新pm2运行的服务
      "pre-deploy-local": "echo 'Deploy Done!'", //本地发布之前的动作
      "env": { //指定部署到远程的仓库的环境 是production生产环境
        "NODE_ENV": "production"
      }
    }
  }
}
```

### 初始化配置

第一次部署

```bash
pm2 deploy ecosystem.json production setup
```

### 部署

```bash
pm2 deploy ecosystem.json production
```

好了，先记录这么多~
