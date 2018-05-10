---
title: js高级与面向对象之原型
date: 2016-06-04 13:41:47
tags:
  - javascript
  - 原型
  - 原型的基本概念
categories: javascript
---

## 原型的基本概念

在构造函数创建出来的时候，系统会默认的帮构造函数创建并且关联一个空对象，这个对象就成为原型

<!-- more -->

##原型的作用

原型中的所有成员都可以被和其关联的构造函数创建出来的对象访问

```js
function Person(name, age){
    this.name = name;
    this.age = age;
}
```

如何利用原型解决构造函数存在的问题？
* 利用原型的特性，将方法放到原型中去，供所有的对象访问

## 如何访问原型？

* 构造函数`.prototype`

```js
console.log(typeof Person.prototype);
console.log(Person.prototype);
```

## 如何使用原型？

* 使用对象的动态特性，为原型对象新增成员

```js
Person.prototype.eat = function () {
    console.log("吃个大鸡腿儿");
}

var p  = new Person();
p.eat();
var p1 = new Person();
p1.eat();

console.log(p.eat == p1.eat);
```

* 直接替换原型对象

```js
Person.prototype = {
    run:function(){
        console.log("李二狗正在以时速1cm每小时的速度奔向餐厅");
    }
};

console.log(Person.prototype);
var p2 = new Person();
p2.run();
```

## 原型使用的注意事项

对象访问属性的时候，会现在自身查找，如果找到了就直接使用如果没有找到，就去构造函数的原型对象中去查找

1. 一般情况下，只会将方法放入原型对象中，属性单独的放在对象中
2. 在获取对象的属性的时候，会现在对象中进行查找，然后去原型中查找
3. 在对象进行设置属性的时候，不会去原型中查找属性，而是直接在对象内进行查找，如果找到该属性，就修改，如果没有找到，就新增
4. 在替换原型对象的时候，要注意：替换之前创建出来的对象的原型和替换之后创建出来的对象的原型会不一致

```js
function Person(){

}

//Person.prototype.name = "张三";
Person.prototype.sing = function () {
    console.log("Take me to your heart!");
}
var p = new Person();
//console.log(p.name);  //张三
p.sing();  //可以

//p.name = "李四";
//console.log(p.name);  //李四

Person.prototype = {

};

var p1 = new Person();
//console.log(p1.name); //张三
p1.sing();//不可以

p.sing();//不可以  or  可以
```

## 原型的访问方式

1. 通过 `构造函数.prototype` 去访问
2. 通过 `对象.__proto__` 去访问
	注：__proto__这个属性 是非标准的！！！ 不推荐在开发过程中使用，只用于调试代码

* __.proto__用法

```js
function Person(){
}
Person.prototype = {
    name : "迈克学摇滚",
    song : "Take me to your heart"
}
var p = new Person();
p.__proto__.count = 100;
console.log(p.__proto__);
```
