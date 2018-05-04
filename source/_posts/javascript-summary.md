---
title: JavaScript高级篇总结
date: 2016-11-12 19:04:31
tags: javascript
categories: javascript
---
javascript高级与面向对象笔记总结！！

<!-- more -->

## 递归

递归就是函数自己直接或者间接的调用自己

### 递归的两个要素

* 自己调用自己
* 递归结束条件

### 化归思想

由难化易，由繁化简，的思想就是化归思想

### 前n项和

```js
fn(n) = fn(n-1) + n
```

```js
function sum(n){
    if(n==1){
        return 1;
    }
    return sum(n - 1) + n;
}
```

### 阶乘

```js
fn(n) = fn(n-1) * n
```

```js
function sum(n){
    if(n==1){
        return 1;
    }
    return sum(n - 1) * n;
}
```

### 斐波那契数列

```js
fn(n) = fn(n-1) + fn(n-2)
```
```js
function fib(n){
    if( n <= 2){
        return 1;
    }
    return fib(n-1) + fib(n-2);
}
```

### 递归获取指定元素的后代元素

```js
function getChildren(ele){
    var result = [];
    var children = ele.children;
    for(var i = 0; i < children.length; i++){
        result.push(children[i]);
        var temp = getChildren(children[i]);
        result = result.concat(temp);
    }
    return result;
}
```

## 闭包

一个封闭的包裹结构

一个可以访问独立数据的函数

```js
function outer(){
    var data = "";
    return function(){
        //可以操作data数据
    }
}
```

获取和设置数据

```js
function outer(){
    var data = "";
    return {
        getData:function(){
            return data;
        },
        setDate:function(value){
            data = value;
        }
    }
}
```

### for循环注册点击事件的问题

```js

var divs = document.getElementsByTagName("div");
for(var i = 0; i < divs.length; i++){
    var div = divs[i];
    function outer(){
        var j = i;
        return function(){
            console.log(j);
        }
    }
    div.onclick = outer();
}

```

### for循环中使用setTimeout

```js
for( var i = 0; i < 10; i++){
    setTimeout((function(){
        var j = i;
        return function(){
            console.log(j);
        }
    }()),0)
}
```

## 缓存

* 硬件缓存
* 浏览器缓存
* `CDN`---`Content Delivery Network`  内容分发网络

### 使用缓存解决递归实现的斐波那契数列的性能问题

```js
function createFib(){
    var arr = [];
    return function(n){
        var num = arr[n];
        if(!num){
            if(n <= 2){
                num = 1;
            }else{
                num = arguments.callee(n - 1) + arguments.callee(n - 2);
            }
            arr[n] = num;
        }
        return num;
    }
}
```

### jQuery缓存实现分析

```js
function createCache(){
    var cache = {};
    var arr = [];
    return function(key, value){
        if(value){
            cache[key] = value;
            arr.push(key);
            if(arr.length > 50){
                delete cache[arr.shift()];
            }
        }else{
            return cache[key];
        }
    }
}
```

## 函数的四种调用模式

### 函数调用模式

形式: 函数名();
`this: window`

### 方法调用模式

形式: 对象名.方法名();
this: 调用该方法的对象

### 构造函数调用模式

形式: `new` .构造函数名()
`this: new`创建出来的对象

#### 工厂模式

```js
function createObject(){
    var o = new Object();
    o.xxx = "xxx";
    o.yyy = "yy";
    return o;
}

var p  = createObject();
```

#### 寄生模式

```js
function CObject(){
    var o = new Object();
    o.xxx = "xxx";
    o.yyy = "yy";
    return o;
}

var p = new CObject();
```

### 上下文调用模式

#### call

```js
函数名.call(对象,参数1,参数2,参数3...)
```
1. 调用该函数
2. 将函数内部的`this`赋值为`call`的第一个参数
3. 将第一个参数之后的所有参数，当做实参传递给函数

#### apply

```js
函数名.apply(对象,数组)
```
1. 调用该函数
2. 将函数内部的`this`赋值为`apply`的第一个参数
3. 将第二个参数的数组，依次拆解开，将每一个元素挨个传递给函数做为实参

##### 伪数组转换成数组

```js
var arrFake = {
    0:1,
    1:2,
    2:3,
    length:3
}

var arrReal = [];

arrReal.push.apply(arrReal, arrFake);
//arrReal.push(arrFake[0] , arrFake[1], arrFake[2])   相当于这句代码

```

##### 求数组最大值

```js
var arr = [1,23,4,4,3,3,34,3,2];
var maxNum = Math.max.apply(null, arr);
```

#### 借用构造函数继承

```js
function Father(){
    this.name = "";
    this.money = 99999999999999;
}

function Son(){
    Father.call(this);
}

var s = new Son();
```

## 沙箱模式

一个隔离的安全的环境

```js
(function(w){
    //需要隔离的代码
    //最顶上写 变量函数之类的申明
    //逻辑代码
    //如果需要，使用window对象向外界暴露接口
})(window)
```

为什么要将 `window` 作为参数传递
1. 外面无法访问里面，里面也不要去访问外面的东西
2. 在代码压缩的时候，内置的对象名称无法被压缩，如果使用自己的变量，是可以压缩的

## forEach 和　map

```js
var arr = [1, 2, 3, 4, 5 ,6];
//currentEle 当前正在遍历的元素,
//currentIndex 当前遍历的元素的索引,
//currentArray 当前正在被遍历的数组
arr.forEach(function(currentEle, currentIndex, currentArray){
    currentArray[currentIndex] = currentEle * 2;
})

//currentEle 当前正在遍历的元素,
//currentIndex 当前遍历的元素的索引,
//currentArray 当前正在被遍历的数组
//map如果回调函数内有返回值，会将所有调用的返回值重新组合成一个数组，作为map方法的返回值
arr.map(function(currentEle, currentIndex, currentArray){
    return currentEle * 2;
})
```

## 严格模式

```js
"use strict"
```
* 变量不使用`var`声明会报错
* 不能删除不允许删除的属性
* 对象的属性不可以重名
* 函数的形参不可以重名
* 不允许使用八进制数据

## 事件兼容性处理

```js
function createRegister(){
    if(window.addEventListener){
        return function(target, type, handler){
            target.addEventListener(type, handler);
        }
    }else if(window.attachEvent){
        return function(target, type, handler){
            target.attachEvent("on" + type, function(){
                handler.call(target, window.event);
            })
        }
    }else{
        return function(target, type, handler){
            target["on"+type] = handler;
        }
    }
}
```
