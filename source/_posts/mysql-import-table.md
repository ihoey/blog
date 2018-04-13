---
title: 用 MySQL 导入 SQL 文件
date: 2018-04-13 13:07:19
tags:
  - MySQL
  - Ubuntu
  - NoSQL
  - shell
categories:
  - MySQL
---

记录一下数据库导入文件方法~

<!-- more -->

>方案一

## 登录数据库

```bash
mysql -u root -p123
```

## 检查已经存在的数据库

```bash
show databases;
```

## 创建新的数据库

```bash
create database test;
# 查看已经存在的是为了避免重复创建
```

## 选择你所创建的数据库

```bash
use test;
```

## 导入sql文件

```bash
source db-test.sql;
#注意sql文件的路径
```

## 查看导入结果

```bash
show tables;
```

## 退出数据库

```bash
exit;
```

>方案二

```bash
mysql -u root -p123 test < test.sql
# mysql -u 用户名 -p 密码 数据库名 < 数据库名.sql
```
