---
title: js高级与面向对象之函数
date: 2016-07-22 19:40:39
tags:
  - Function
categories: javascript
---

## 函数声明

```js
function func(){
    //函数体
}
//2.函数表达式
var func1 = function(){

}
//3.通过Function构造函数来创建
var func2 = new Function();
```
<!-- more -->

### 函数的name属性

```js
function Person(){

}
var p = new Person();
//p.constructor
console.log(typeof p);  //object
console.log(p.constructor.toString());
console.log(Person.name);
console.log(p.constructor.name);
```

函数都会有一个 `name` 属性，所以我们可以通过对象先找到构造函数，然后直接访问构造函数的 `name` ，就拿到了具体类型

## Function的使用

### 语法:

```js
//Function函数所有的参数全都是字符串
//Function函数的作用就是将所有的参数组合起来，变成一个函数
//1、如果只传一个参数，那么这个函数必然是函数体
//2、如果传多个参数，那么最后一个参数表示函数体，前面的参数代表将要创建的函数的参数
//3、如果不传参数，表示创建一个空函数
new Function(arg1, arg2, arg3, ..., argN, body);
```

### 创建一个打印一句话的函数

```js
//传统的方式
function foo(){
    console.log("你好");
}

//使用Function
var func = new Function("console.log('你好');");
```

### 创建一个空函数

```js
//传统的方式
function foo(){}

//Function
var func = new Function();
```

### 创建一个有参数的函数

```js
//传统的方式
function foo(num){
    console.log(num);
}

//Function

var func = new Function(){"num", "console.log(num);"};
```

## 静态成员与实例成员的概念

静态成员和实例成员这两个概念其实也是从面相对象的编程语言中引入的，对应到 `JavaScript` 中的理解为：

### 静态成员

* 静态成员是指静态属性和静态方法，所谓静态，就是有构造函数提供的。

### 实例成员

* 实例成员是值实例属性和实例方法，所谓实例，就是由构造函数创建出来的对象。

### 举例说明

```js
function Person(){
    this.name = "zs",
    this.sayHello = function(){
        console.log("Hello World");
    }
}

//下面这个sayHi方法就是构造函数自己的方法，也就是静态方法
Person.sayHi = function(){
    console.log("I'm a Person");
}

//原型属性属于构造函数，所以原型属性是静态属性
Person.prototype = {};
var p = new Person();

//这里的name是构造函数创建出来的实例对象的属性，所以是实例属性
p.name = "李四";


//这里的sayHello也是构造函数创建出来的实例对象的方法，所以是实例方法
p.sayHello();
```
提示：

一般工具型方法都有静态成员提供, 一般与实例对象有关的方法由实例成员表示.

工具方法：比如 `jQuery.Ajax()` 、 `jQuery.trim()` 、 `jQuery.Each()`
