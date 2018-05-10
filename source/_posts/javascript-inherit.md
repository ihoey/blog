---
title: js高级与面向对象之继承
date: 2016-06-15 13:43:28
tags:
  - javascript
  - js面向对象
  - 继承
  - 继承的实现方式
categories: javascript
---

一个对象没有某些属性和方法，另一个对象有，拿过来使用，就是继承

<!-- more -->

## 继承的实现方式

### 混入式继承

```js
var obj = {};
var obj1 = {
    money : 10000000,
    car : 100,
    brand: "布加迪威航",
    huaqian: function(){
        console.log("不差钱，随便花");
    }
};
console.log(obj);

for(var k in obj1){
    //money
    //car
    //brand
    //huaqian
    obj[k] = obj1[k];
}

console.log(obj);
```

### 原型继承

* 通过修改原型实现的继承 就是原型继承
	通过构造函数创建出来的对象继承自构造函数的原型对象

```js
var human = {
    gender:"female",
    height: 170,
    weight: 50
}
function Person(){

}
//Person.prototype.name = "王莉莉";
```

#### 原型继承的方式

1. 通过混入的方式给原型添加属性和方法

```js
//Person.prototype
var human = {
    gender:"female",
    height: 170,
    weight: 50
}
function Person(){

}
Person.prototype.name = "王莉莉";

for(var k in human){
    Person.prototype[k] = human[k];
}
var p = new Person();
console.log(p.name,p.gender,p.height,p.weight);
```

2. 修改原型对象

```js
Person.prototype.maimeng = function (){
    console.log("感觉自己萌萌哒");
}

p.maimeng();
```

3. 替换原型对象

```js
Person.prototype = human;
var p = new Person();
console.log(p.gender);
```

### 经典继承

《JavaScript语言精粹》
* 调用一个方法，就能实现继承
`var obj1 = Object.create(obj)`
* 创建出来一个新的继承自参数 `obj` 的对象 `obj1`
* 其实内部使用的就是原型继承
* ES5才支持的这个方法 需要考虑兼容性问题

```js
var human = {
    name: "王莉莉",
    gender: "female",
    dance :function(){
        console.log("二人转，转转转")
    }
}

var obj = Object.create(human);

console.log(obj);
```

## 处理经典继承的兼容性问题

```js
if(Object.create){
    var obj = Object.create({name:"李狗二",age:18});
}else{
    Object.create = function(obj){

		//在这个函数中要实现的功能
		//就是，创建一个对象，将obj设置为该对象的原型

		//要设置原型，只能通过两种方式，
		// 一种是 对象.__proto__  另外一种是 构造函数.prototype
		//由于__proto__这个属性有兼容性问题，所以不使用
		//就只能使用 构造函数.prototype 去替换原型对象了

        function F(){}
        F.prototype = obj;
        var result = new F();
        return result;
    }
}

//不推荐直接修改内置对象，因为在多人开发的时候，会产生冲突

Object.creat = function () {
    console.log("我是李二狗，我的create方法就是用来输出这句话的，哈哈哈");
}

function hanyingxinCreate(obj){
    if(Object.create){
        return Object.creat(obj);
    }else{
        function F(){}
        F.prototype = obj;
        var result = new F();
        return result;
    }
}

```

## 继承的实际应用

* 扩展内置对象

* 扩展 `string` 的方法  `trim()`

```js
//$.trim()

Array.prototype.sayHello = function () {
   console.log("Hello, i'm a Array")
}

var arr = new Array();
arr.sayHello();

var arr1 = [];
arr1.sayHello();

//需求分析
//1.创建出来的对象得有数组的所有的方法和属性
//2.创建输出来的对象得有sayHello方法
//3.不能修改原生的内置对象


function MyArray(){

}

MyArray.prototype = [];
MyArray.prototype.sayHello = function () {
    console.log("相加就加，随心所欲，为所欲为");
}

var myArr = new MyArray();
myArr.push(1,2,3,4,4,5);
console.log(myArr);
myArr.sayHello();
```
