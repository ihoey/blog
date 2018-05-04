---
title: JavaScript高级篇之part6
date: 2016-11-11 19:35:55
tags: javascript
categories: javascript
---
javascript高级与面向对象笔记整理，接part5篇！！

<!-- more -->

## 闭包的练习

### for循环中注册点击事件

### for循环中是用setTimeout

## 缓存

缓存就是将一些数据，剧院，进行临时的存储，以提高访问效率

* 浏览器缓存
* CDN
* JS中的缓存

## 使用缓存解决斐波那契数列的性能问题

### 有什么性能问题

使用递归去计算斐波那契数列存在大量的重复的计算，导致计算效率十分底下

### 如何解决性能问题

使用缓存

1. 创建一个数组充当缓存容器
2. 每次需要计算斐波那契数列的时候，先去缓存中进行查找
3. 如果有就直接返回
4. 如果没有，就去计算，算出来结果之后
5. 将结果存入缓存中
6. 将结果返回

```js
//1.创建一个数组充当缓存容器
var arr = [];
function fibnacci(n){
//2.每次需要计算斐波那契数列的时候，先去缓存中进行查找
	var num = arr[n];
	if(num){
		//3.如果有就直接返回
		return num;
	}else{
		//4.如果没有，就去计算，算出来结果之后
		if(n <= 2){
			num=1;
		}else{
		num = fibnacci(n-1)+fibnacci(n-2);
		}
		//5.将结果存入缓存中
		arr[n] = num;
		//6.将结果返回
		return num;
	}
}
```

优化后的代码

```js
function createFib(){
    //1.创建一个数组充当缓存容器
    var arr = [];
    function fibnacci(n){
    //2.每次需要计算斐波那契数字的时候，先去缓存中进行查找
        var num = arr[n];
        if(!num){
            //4.如果没有，就去就算，算出来结果之后，
            if(n <= 2){
                num = 1;
            }else{
                num = fibnacci(n-1)+fibnacci(n-2);
            }
            //5.将结果存入缓存中
            arr[n] = num;
        }
        //6.将结果返回
        return num;
    }
    return fibnacci;
}

```

## jQuery缓存实现分析

```js
function createCache(){
	//需要一个能够存储数据的容器
	var cache = {};
	//用来存储 键，并且记录键存入的顺序
	var keys = [];
	return function(key,value){
		if(value){
			cache[key] = value;
			keys.push(key);
			if(keys.length > 50){
				delete cache[keys.shift()];
			}
		}else{
			return cache[key];
		}
	}
}
```

## Jquery缓存源码分析

```js
function createCache(){
	var keys = [];
	function cache(key,value){
		if(keys.push(key + " ") > 10){
		 	delete cache[keys.shift()];
		}
		return (cache[key + " "] = value);
	}
	return cache;
}
var cache = createCache();
cache("name","mengyan");
cache["name" + " "];

```

## 函数的四种调用形式

### 函数调用模式

形式：函数名（）；
`this：window`

### 方法调用模式

形式：对项目.方法名（）；
this：调用该方法的对象

### 构造函数调用模式

形式 `new` 函数名（）
this：new创建出来的对象

#### 工厂模式

```js
function createPerson(){
    var o = new Object();
    o.name = "zs";
    o.age = 18;
    return o;
}

var p = createPerson();
```

#### 寄生模式

```js
function Person(){
    var o = new Object();
    o.name = "zs";
    o.age = 18;
    return o;
}

var p = new Person();
```

### 上下文调用模式

在其他的调用模式中， `this` 不可以赋值，也就不可以改变
在上下文调用模式中，可以进行手动的设置 `this` 。

#### call

```js
//函数名.call(对象, 参数1, 参数2, 参数3...)
```

1. 调用函数
2. 将函数内的 `this` 指向第一个参数中的对象
3. 将除第一个参数外的所有参数依次传给函数，做为实参

#### apply

```js
//函数名.apply(对象, 数组)
```

1. 调用函数
2. 将函数内的 `this` 指向第一个参数中的对象
3. 将第二个参数中的数组拆解开，将数组中的元素依次的传给函数当做实参

#### 借用构造函数继承

```js
function Parent(){
    this.money = 100000000000000;
}

function Son(){
    Parent.call(this);
    this.wife = "凤姐";
}

var s = new Son();
```

1. 使用 `new` 关键字创建了一个对象
2. 调用构造函数 `Son` ，将 `Son` 中的 `this` 指向刚才创建的对象
3. 在 `Son` 构造函数中，是用上下文调用模式去调用 `Parent` 函数，
4. 调用 `Person` 函数，将 `Parent` 中的 `this` 指向 `song` 中的 `this` ，也就是用 `new` 创建出来的那个对象
5.  `Parent` 中会使用 `this` 给对象添加成员
6.  `Parent` 调用结束， `Son` 中的 `this` 也就有了 `Parent` 中添加的那些个成员

将伪数组转换成数组

```js
var fakeArr = {
    0:"a",
    1:"b",
    2:"c",
    length:3
}

var arr = [];

Array.prototype.push.apply(arr, fakeArr);
Array.prototype.concat.apply(arr, fakeArr);


arr.concat.apply(arr, fakeArr);

```

求数组的最大值

```js
var arr = [1 ,2,3,3,4,4,34,3,43,43,43,4,34,3];

var max = Math.max.apply(null, arr);
//Math.max(1,2,3,43,4,3,43,43,43)
```
