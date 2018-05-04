---
title: Node第一部分-初体验
date: 2016-12-10 10:31:09
tags:
  - Node
  - NodeJs
categories: Node
---

## NodeJs是什么？

> 简单的说 `NodeJs` 就是运行在服务端的 `JavaScript` 。`NodeJs` 是一个基于 `Chrome JavaScript` 运行时建立的一个平台。`NodeJs` 是一个事件驱动 `I/O` 服务端 `JavaScript` 环境，基于 `Google` 的 `V8` 引擎，`V8` 引擎执行 `Javascript` 的速度非常快，性能非常好。

- 官网 `https://nodejs.org`

<!--more-->

- `NodeJs` 自带运行时环境可在 `Javascript` 脚本的基础上可以解释和执行(这类似于 `JVM` 的 `Java` 字节码)。这个运行时允许在浏览器以外的任何机器上执行 `JavaScript` 代码。由于这种运行时在 `NodeJs` 上，所以 `JavaScript` 现在可以在服务器上并执行。
- `NodeJs` 还提供了各种丰富的 `JavaScript` 模块库，它极大简化了使用 `NodeJs` 来扩展 `Web` 应用程序的研究与开发。
- `NodeJs` = 运行环境 + `JavaScript` 库

### 浏览器和NodeJs中的Js

- 浏览器的 `Js`
  * 可以通过 `Js` 操作 `Html`
  * 有 `DOM` (和操作 `Html` 有关)，有 `BOM` (和浏览器有关)，有 `ECMA` (就是 `js` 语法规范)
- `Node` 中的 `Js`
  * 没有 `DOM`, 没有 `BOM`, 有 `ECMA`
  * `windows` (也就是说没有 `windows` 对象)

## Node安装

在 `windows` 上安装 `NodeJs` (本教程中使用)。使用 `MSI` 文件，并按照提示安装 `NodeJs` ，默认情况下，安装程序将 `NodeJs` 发行到 `C:\Program Files\nodejs`. 但这里我们可以根据需要修改安装路径到指定的文件夹，比如：`D:\Program Files\nodejs` ，并将 `D:\Program Files\nodejs` 目录添加到 `Window` 系统的 `PATH` 环境变量中（或者安装的时候选中添加环境变量，下面会有提到）。

- 第一步：双击下载的 `node-v7.2.1-x64.msi` 文件，出现提示安装界面
- 第二步：选择安装目录，比如安装在目录 `D:\Program Files\nodejs` 中
- 第三步：选择安装的模块和功能，这里全部安装，并添加到系统环境变量，最后一个选项
- 最后一步：安装完成！
- 验证安装：在 `CMD` 或者 `powershell` 中输入 `node -v` 注意中间有空格，显示版本号就说明安装成功了！

## Node版本介绍

- `0.10.x` , `Node` 就开源了
  + 开源（开放源代码）的话, 别人就可以贡献（提意见，修改等）源码!
  + 因为作者比较精益求精，所以后来第三方社区: 觉得Node更新太慢!
    * 于是第三方社区在原来Node的基础上继续开发并加入了很多新的东西
  + 后来因为反响太大，作者便直接合并: 从 `0.10.x` 直接升到 `4.x`
  + 版本历史 `4.x` `5.x` `6.x` `7.x`

## 创建 NodeJs 应用

### 步骤一、引入 required 模块

我们使用 `require` 指令来载入 `http` 模块，并将实例化的 `HTTP` 赋值给变量 http，实例如下:

```js
var http = require("http");
```
### 步骤一、创建服务器
- 我们电脑上只要安装了node,不需要其他的软件配置，就能够开启一个http服务

接下来我们使用 `http.createServer()` 方法创建服务器，并使用 `listen` 方法绑定 `8888` 端口。 函数通过 `request`, `response` 参数来接收和响应数据。
实例如下，在你项目的根目录下创建一个叫 `server.js` 的文件，并写入以下代码：

```js
var http = require('http');

http.createServer(function (request, response) {
  // 发送 http 头部
  // http 状态码：200 ：OK
  // 内容类型： text/piain
  response.writeHead(200,{'Contenr-Type': 'text/piain'})
  //发送响应数据 ‘hello world’
  response.end('hello-world');
  //监听8888端口
  }).listen(8888)

  console.log('Server running at http://127.0.0.1:8888/')
```

以上代码我们完成了一个可以工作的 HTTP 服务器。
使用 node 命令执行以上的代码：

```js
node server.js
Server running at http://127.0.0.1:8888/
```

接下来，打开浏览器访问 `http://127.0.0.1:8888/` ，你会看到一个写着 "Hello World"的网页。

> 服务器

- 服务器就是一台电脑, 只是性能一般比我们普通电脑高!

### 注意

*file协议，默认，是不能够发ajax请求的！*

- 服务器就是一台电脑(这个电脑是有独立 `ip` )
- 我们的笔记本也是电脑(也可以把最终的项目代码放到笔记本上! ,但是没有公司愿意这么干)
- 操作系统都可能是一样的
- 服务器能运行的软件，我们电脑也能运行

## 环境变量

- 我们在 `cmd` 窗口中敲一个命令, 本质上是执行了一个程序(软件)
- 默认按下回车时, 会到当前命令行所对应的目录寻找文件, 如果找到就立即执行
- 如果找不到就会到环境变量中的 `PATH` 中指定的目录中寻找!

例:我们把 `node` 的默认安装目录: `D:\Program Files\nodejs`, 配置 `PATH` 上，那么
我们在 `cmd` 中敲命令时，如果当前目录找不到，就会到 `D:\Program Files\nodejs`
目录寻找相应的文件执行!

## 命令行

- 系统底层还是命令
- windows系统刚开始的时候还没有界面
- 在 `cmd` 中敲命令,或默认到当前命令行对应的目录中找文件执行
