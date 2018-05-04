---
title: JavaScript高级篇之part4
date: 2016-11-09 21:19:05
tags: javascript
categories: javascript
---
javascript高级与面向对象笔记整理，接part3篇！！

<!-- more -->

## 绘制原型三角

## 原型链

## 原型链图

## 属性搜索原则

只有获取属性的时候会遵守这个原则

## `instanceof`

## `Object.prototype` 的成员

* `constructor` 属性
	指向原型相关的构造函数
* `hasOwnProperty` 方法
	对象 `.hasOwnProperty`（属性名）
* `isPrototypeOf` 方法
	对象`.isPrototypeOf`（对象1）判断对象是否是对象1的原型
* `propertyIsEnmerable` 方法
	对象`.propertyIsEnmerable`(属性)
* `toSting`  `toLocaleSting` 方法
	转换成字符串，`toLocaleSting`会将对象转换成
* `valueOf` 方法
	胡i去兑现的值，再回去运算的时候先调用`valueOf`方法
* `__proto__` 属性
	指向对象的原型
* 双下划线开头的属性都是属于非标准属性
* 单下划线开头 一般框架中的私有属性

## `.Function`

## `eval`

## 静态成员和实例成员

### 静态成员

* 通过构造函数访问成员的就是静态成员
* 构造函数 `.prototype`
* 构造函数 `.name`
* 构造函数 `.length` （形参的个数）

### 实例成员

通过对象访问的成员就是实例成员

* 只要是通过对象访问到的都是实例成员
* 比如 `p.name`	`p.age`	`p.__proto__`……

## `arguments` 对象

只能在函数内部使用

* 当函数调用的时候会将所有的输惨存入 `arguments` 对象
*  `arguments.length` （实参的个数）
*  `arguments.callee` 指向函数本身。用在匿名函数递归
* 构造函数 `.arguments` 和函数里面的 `arguments` 不是一回事儿
* 构造函数 `.arguments` 已被弃用
