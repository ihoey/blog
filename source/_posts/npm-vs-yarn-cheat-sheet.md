---
title: (译)NPM vs Yarn 备忘手册
date: 2018-04-28 13:40:47
tags:
  - npm
  - Node
  - yarn
categories:
  - Node
---

原文链接： [NPM vs Yarn Cheat Sheet](https://shift.infinite.red/npm-vs-yarn-cheat-sheet-8755b092e5cc)

好，想必你对新的 `JavaScript` 包管理工具 `yarn` 已经有所耳闻，并已通过 `npm i -g yarn` 进行了安装，现在想知道怎么样使用吗？如果你了解 `npm`，你已经会很大一部分啦！

<!-- more -->

下面是我从 npm 切换到 yarn 的一些笔记。

**👍 请收藏本文，本文会随着 `yarn` 的升级而更新。**

## 备忘手册 - 你需要知道的

```bash
npm install === yarn
# 默认安装行为
npm install taco --save === yarn add taco
# 将 taco 安装并保存到 package.json 中
npm uninstall taco --save === yarn remove taco --save
# 在 npm 中，可以使用 npm config set save true 设置 —-save 为默认行为，但这对多数开发者而言并非显而易见的。在 yarn 中，在 package.json 中添加（add）和移除（remove）等行为是默认的。
npm install taco --save-dev === yarn add taco --dev
npm update --save === yarn upgrade
# update（更新） vs upgrade（升级）， 赞！upgrade 才是实际做的事！版本号提升时，发生的正是 upgrade ！
# 注意： npm update --save 在版本 3.11 中似乎有点问题。
npm install taco@latest --save === yarn add taco
npm install taco --global === yarn global add taco
# 一如既往，请谨慎使用 global 标记。
```
> 你可以使用 `yarn self-update` 来更新它自己

## 相同操作的命令

`registry` 的和 `NPM` 上是一样的。大致而言，`Yarn` 只是一个新的安装工具，`NPM` 结构和 `registry` 还是一样的。

```bash
npm init === yarn init
npm link === yarn link
npm outdated === yarn outdated
npm publish === yarn publish
npm run === yarn run
npm cache clean === yarn cache clean
npm login === yarn login
# 和 logout 是一样的
npm test === yarn test
npm install --production === yarn --production
```

## Yarn 独有的命令

我跳过了一些提醒我们不要使用的内容，如 `yarn clean`。

```bash
yarn licenses ls 
# 允许您检查您的依赖的许可证
yarn licenses generate-disclaimer 
# 自动创建您的许可证免责声明
yarn why taco 
# 确定为什么安装了 taco 检查为什么会安装 taco，详细列出依赖它的其他包(感谢 Olivier Combe).
Emojis ⬆️
速度 🏃⌁
通过 yarn lockfile 自动实现 shrinkwrap 功能
以安全为中心的设计
yarn upgrade-interactive
# 允许您自己选择升级指定的包
```

![selectively upgrade specific packages](https://cdn-images-1.medium.com/max/1600/1*f9lz2UdUk6rMf6Pdz8_Spw.png)

## NPM 独有的命令

```bash
npm xmas === NO EQUIVALENT
npm visnup === NO EQUIVALENT
```

## 更多！

这篇备忘手册的 `PDF` 版本特别感谢 [Justin Huskey](https://medium.com/@justinhuskey)

[PDF文件链接](https://infinite.red/files/yarn.pdf)

## 相关链接

https://yarn.bootcss.com/
https://github.com/yarnpkg/yarn
