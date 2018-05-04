---
title: Node第二部分-模块及工具
date: 2016-12-12 09:12:32
tags:
  - Node
  - NodeJs
categories: Node
---
为了让 `NodeJs` 的文件可以相互调用，`NodeJs` 提供了一个简单的模块系统。
模块是 `NodeJs` 应用程序的基本组成部分，文件和模块是一一对应的。换言之，一个 `NodeJs` 文件就是一个模块，这个文件可能是 `JavaScript` 代码、`JSON` 或者编译过的 `C/C++` 扩展。

<!--more-->

## NodeJs的模块

- 核心模块(只要安装了node就会有的模块,已经被打包到了node.exe文件)
- 自定义模块(我们自己写的js模块)
- 第三方的模块(包)

## 核心模块

- http
- url
- fs
- ……等

### http 模块

在我们的代码中请求它并把返回值赋给一个本地变量

### url 模块

- 用来操作url的
- url.parse(request.url,true)

## fs文件操作模块

```javascript
var fs = require('fs')
// 读取文件:
// 参数1：文件路径
// 参数2： 文件编码
// 返回值： 文件内容
var data = fs.readFileSync('./index.html','utf8')

// 写入文件
// 第一个参数：是要写入的文件目录,
// 第二个参数:是要写入的内容!
// 这个方法执行时会【覆盖】之前的文件内容!
fs.writeFileSync('./tmp.txt','我是中国人，我爱自己的祖国!')

// 追加文件
fs.appendFileSync('./xx.js','我是小明，我在哪里?\r\n')

 // 创建目录
    // 判断目录是否存在，如果不存在，则创建
    var result = fs.existsSync('data') // 判断当前目录是否存在data目录
    if(!result){
    console.log(result)
    // 创建目录
    fs.mkdirSync('data')// 在当前目录创建data目录
    }
```

## __dirname和__firename
1, __dirname 可在任意文件中直接使用,值表示当前文件所在路径字符串
2, __firname 也可以在任意文件中使用,值表示当前文件的包含文件名的完整路径!

## 按顺序执行就是同步
## form表单，提交get请求，会把请求参数添加到url中

## 重定向!
- 在响应头里加上 Location:'新地址',并设置状态为302
- `res.setHeader('key','value')`// 设置响应头
- `res.writeHead(状态码)`// 设置状态码!
- 浏览器接收到数据后会重新向新地址跳转!

## npm
- node package manager
- node的包管理工具，管理的是第三方包
- [官网](https://www.npmjs.com/)
- 也能管理前端的包

### 安装包
- 初始化: `npm init`
- `npm install <包名>`

## 扩展
## 离线文档阅读器
- [windows版本](https://zealdocs.org/)
- [mac版本](dash)

## es6/es2015 每天一点点
- const
//  const申明的数据，在栈中不可变，但是如果是对象，则对应的属性值可以变,也就是堆中的值可变,栈中的地址不可以变！
- let
// let申明的变量，作用由大括号决定!

### 提交效率
- 组合键: `win+E`, 打开资源管理器
- 组合键: `wind+D`, 快速切换到桌面
- 组合键: `ctrl+shift+esc` 快速打开任务管理器
