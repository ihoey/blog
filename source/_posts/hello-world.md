---
title: Hexo 最常用的几个命令
date: 2015-08-28 18:29:33
tags:
  - hexo
  - 梦魇小栈
  - 梦魇
  - houyi1121
categories: Hexo
---
Hexo 约有二十个命令，但普通用户经常使用的大概只有下列几个:

<!-- more -->

## hexo s

```bash
$ hexo s
```

### 启动本地服务器 ###
用于预览主题。默认地址： http://localhost:4000/

* hexo s 是 hexo server 的缩写，命令效果一致；
* 预览的同时可以修改文章内容或主题代码，保存后刷新页面即可；
* 对 Hexo 根目录 _config.yml 的修改，需要重启本地服务器后才能预览效果。

## hexo new


``` bash
$ hexo new "学习笔记  六"
```

### 新建一篇标题为 学习笔记 六 的文章，因为标题里有空格，所以加上了引号。

* 文章标题可以在对应 md 文件里改，新建时标题可以写的简单些，纯字母一般不加引号。

## hexo d

```bash
$ hexo d
```

### 自动生成网站静态文件，并部署到设定的仓库。

* hexo d 是 hexo deploy 的缩写，命令效果一致。

## hexo clean

``` bash
$ hexo clean
```

### 清除缓存文件 db.json 和已生成的静态文件 public 。

* 网站显示异常时可以执行这条命令试试。

## hexo g

``` bash
$ hexo g
```

### 生成网站静态文件到默认设置的 public 文件夹。

* 便于查看网站生成的静态文件或者手动部署网站；
* 如果使用自动部署，不需要先执行该命令；
* hexo g 是 hexo generate 的缩写，命令效果一致。

## hexo new page

``` bash
$ hexo new page aboutme
```

### 新建一个标题为 aboutme 的页面，默认链接地址为 主页地址/aboutme/

* 标题可以为中文，但一般习惯用英文；
* 页面标题和文章一样可以随意修改；
* 页面不会出现在首页文章列表和归档中，也不支持设置分类和标签。
