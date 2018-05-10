---
title: js高级与面向对象之构造函数
date: 2016-05-20 13:39:33
tags:
  - javascript
  - js构造函数
categories: javascript
---

首先，什么是_声明_、_初始化_、_赋值_、_定义_?
* 声明：告诉解析器有这个东西存在
* 初始化：就理解为第一次赋值
* 定义：不需要去理解
* 赋值：改变变量的值，就是赋值

<!-- more -->

## 什么是构造函数？

* 构造函数其实就是一个函数，只是用途跟普通函数不太一样
* 构造函数一般用于初始化对象

## 构造函数的特点

* 首字母大写
* 构造函数一般情况下和 `new` 关键字结合使用
* 构造函数不需要写返回值

构造函数的返回值默认为创建出来的对象，如果手动的去设置返回值

* 设置返回值为基本类型，不会对默认返回值有任何的影响
* 设置返回值为对象类型，就会替换掉默认的返回值

## 构造函数的执行顺序

* 使用 `new` 关键字创建对象
* 调用构造函数，并且将构造函数内的 `this` 赋值为新创建的对象
* 在构造函数内部，使用 `this` 为新创建出来的对象新增成员
* 默认的返回新创建的这个对象

返回值代码

```js
function Person(){
    this.name = "范冰冰";
    //初始化对象的代码
	//return "范冰冰";
	//return 123;
	//return true;
	//return null;
    return {};
}
var p = new Person();
console.log(p);
```
自定义构造函数代码

```js
//自定义构造函数，就是自己创建的构造函数s
function Person(name, age){
    this.name = name;
    this.age = age;
    this.kanren = function(){
        console.log("上课再闲聊，我就砍死你");
    }
}

var p = new Person("大飞", 50);
console.log(p);
p.kanren();

var p1 = new Person("陈浩南", 30);
console.log(p1);
p1.kanren();
```
构造函数补充

```js
//因为构造函数也是函数
//所以构造函数可以使用函数的使用方式
//但是如果把构造函数当做普通函数来使用的话
//该构造函数内的this就指向了window对象
//返回值为undefined
function Person(name, age){
    this.name = name;
    this.age = age;
    this.kanren = function(){
        console.log("上课再闲聊，我就砍死你");
    }
}

var p = Person("谢文东", 30);
console.log(p);
window.kanren();
```

## 传统构造函数存在的问题

如果在构造函数内部声明函数，并为新创建的对象方法赋值的话每次创建对象，调用构造函数，都会新创建一个函数出来，每个对象独占一份函数 但是，所有的对象中的方法的代码是一模一样的，没有必要每人一份所以就造成了资源的浪费

### 解决方案一

将构造函数内部给对象的方法赋值的时候的函数声明提出来放到构造函外面，这样，在每次创建对象的时候，就不会再重新声明函数而是直接拿外面的函数地址进行赋值，所以，这样子创建出来的所有的对象都会共享构造函数外面的声明的这个函数

### 解决方案一存在的问题

1. 如果方法过多，会造成全局变量污染
2. 代码结构会变得混乱不堪，不利于维护

```js
//解决方案一存在的问题
function eat(){
    console.log("吃个红烧鸡屁股");
}

function Person(name, age){
    this.name = name;
    this.age = age;
    this.eat = eat;
//		this.eat = function (){
//		console.log("吃个红烧鸡屁股");
//     }
}

var p = new Person("唐伯虎",500);
p.eat();
var p1 = new Person("李二狗",81);
p1.eat();

console.log(p.eat == p1.eat);
```

这个问题我们可以通过原型来处理
