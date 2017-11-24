---
title: 笔记：NPM版本号自增，自动化发布NPM包
date: 2017-11-24 19:08:43
tags:
  - Node
  - NodeJs
  - npm
categories: Node
---

# 提升一个包的版本号

```shell
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]
```

`Description` 在一个包的目录下执行此命令，会提升版本号，并把这个新的版本号写进`package.json`文件，如果存在`npm-shrinkwrap.json`，也会写进去。

<!-- more -->

参数 `newversion` 应该是一个有效的semver字符串, 或者是`pathch`, `minor`, `major`等,`semver.inc`中定义的任意一个有效的。
`major`： 版本号中第一段数字自增1 `minor`: 版本号中第一段数字自增1 `patch`: 版本号中第三段数字自增1
如果`package.json`中的`scripts`包含`version`,`preversion`,`postversion`，他们将作为`npm version`的一部分被执行。

可以将此放入到npm script流中，自动化构建！

## npm 不常用的命令

`npm view` 包名 `version` 相看某个包的最新版本号
`npm ls` 列出当前安装的所有包
`npm root` 查看当前包的安装路径
`npm root -g` 查看全局包的安装路径
`npm config ls` 查看 `npm` 当前配置
