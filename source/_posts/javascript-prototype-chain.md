---
title: js高级与面向对象之原型链
date: 2016-7-09 19:41:47
tags:
  - 原型链
categories: javascript
---

## 原型链是什么？

只要是对象就会有原型，那么所有的原型就会形成一个链式的结构，这个结构就称为原型链

<!-- more -->

```js
function Person(){}
//p--->Person.prototype----->Object.Prototype----->null
var p = new Person();

console.log(Person.prototype);
//原型也是一个对象，是对象，就有构造函数，有构造函数，就有原型
```

## 修改原型链

* 原型链结构可以进行修改
* 替换原型对象就可以修改原型链结构

* 原型继承的概念重定义
* 通过修改原型链的结构实现的继承就是原型继承

* 属性的搜索原则
* 在对象访问属性的时候，会遵守一个原则
1. 现在对象本身中进行查找，如果本身中有，就直接使用，
2. 如果没有，就去原型中查找，如果原型中有，就直接使用
3. 如果没有，重复步骤2，直到找到 `null`

* 设置属性没有搜索原则，只会在本身中进行搜索

* 由于属性搜索原则的存在，所以对象可以直接访问 `.constructor` 属性找到其构造函数

```js
function Human(){

}

function Person(){

}
Person.prototype = new Human();

//p---->Person.prototype----->Human.prototype----->Object.prototype----->null
var p = new Person();
```

## 复杂的原型链

```js
function Animal(){
    this.name = "123";
}

function Human(

){}

var animal = new Animal();
Human.prototype = animal;

var h = new Human();
//通过h去访问constructor属性的顺序
//1.现在h自身查找 h中没有
//2.去Human.prototype 也就是 h.__proto___  也就是animal中去找
//3.再去anmail这个对象的原型中 也就是 Animal.prototype 也即是 animal.__proto__ 中去找
//4.找到的就是Animal
console.log(h.constructor);


function Man(){}
var h1 = new Human();
Man.prototype = h1;

var m = new Man();
//1.第一步在m自己中找 没有
//2.m.__proto__  也就是Man.prototype 也就是 h1中去查找 没有
//3.h1的原型 也就是 h1.__proto__ 也就是 Human.prototype
//4.去上面看吧
console.log(m.constructor);

```

## instanceof关键字

* 对象 `instanceof` 构造函数
* 检测一个对象是不是通过某个构造函数创建出来的(不准确的说法)
* 检测一个构造函数的原型 `（构造函数.prototype）` 是否在某个对象的原型链上

```js
function Person(){

        }
//p---->Person.prototype---->Object.prototype---->null
var p = new Person();

console.log(p instanceof Person);

console.log(p instanceof Object);
```

## Object.prototype成员

1.  `constructor`  指向原型相关的构造函数
2.  `hasOwnProperty` 判断对象本身是否拥有指定的属性  不包含原型中的成员
	`对象.hasOwnProperty(属性名)`
3.  `isPrototypeOf` 判断一个对象是否某个对象的原型
	`对象.isPrototypeOf(另外一个对象)`
4.  `propertyIsEnumerable`  判断对象自己的属性是不是可以被遍历 `（for-in）` 如果不是自己的或者不能被遍历都会返回 `false`
	`对象.propertyIsEnumerable(属性名)`
	`Object.defineProperty(对象，属性名，对象（描述信息）)`

5.  `toLocaleString`  `toString`   都是将对象转换为字符串的方法
	`tolocalString` 打印本地格式的字符串  本地格式是获取的系统设置
	`toString` 直接转换成字符串
6.  `valueOf` 方法
	当对象参与运算的时候，会首先调用对象的 `valuOf` 方法获取对象的值
	如果获取到的这个值可以参与运算，就直接拿来使用
	如果不能参与运算，就会去调用该对象的 `toString` 方法

```js
var obj = {
    valueOf :function () {
        return 1;
    },

    toString:function(){
        return "我叫李二狗";
    }
};
//console.log(obj.valueOf());
console.log(obj.toString());
console.log( obj + 1);
```

7. __proto__  指向对象的原型  非标准属性

```js
var now = new Date();
console.log(now.toString());
console.log(now.toLocaleString());

var obj = {
      name:"",
    age:18
}

console.log(obj.toString());
console.log(obj.toLocaleString());

obj.__proto__.name =  "张三";

for(var k in obj){
    console.log(k);
}

console.log(obj.propertyIsEnumerable("name"));

var obj = {

}

obj.__proto__ = {
   beautifulLevel : "High"
}

console.log(obj.hasOwnProperty("beautifulLevel"));
var obj = {};

var obj1 = {};

obj.__proto__ = obj1;
console.log(obj1.isPrototypeOf(obj));
```
