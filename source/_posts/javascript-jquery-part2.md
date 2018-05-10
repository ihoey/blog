---
title: JQuery分析及实现part2之css部分功能及实现
date: 2016-11-19 19:02:01
tags:
  - 原生Js
  - Js框架
  - JQuery
categories: javascript
---

JQuery模块分析及其实现第二部分css部分功能及实现,接第一部分!

<!-- more -->

## hasClass方法

1. 功能:如果结果集里只要有一个 `dom` 元素,具有指定的样式类,就返回 `true`
2. 实现思路
	* 定义结果变量 `ret` ,默认值为 `false`
	* 遍历结果集的每一个 `dom` 元素,如果当前 `dom` 元素具有指定的样式类,将 `ret=true` 结束循环
	* 返回 `ret` .

	* 如何判断 `dom` 元素具有指定的样式类?
	在 `dom` 元素所有的样式类的 `首位 + 空格` ;在用户指定的样式类 `首位 + 空格` 调用indexOf方法,如果返回值 = -1,表示没有;否则就具有指定样式类

```js
hasClass: function(className) {
	// 默认结果false
	var ret = false;
	// 遍历this上的每一个dom元素
	// for(var i = 0, l = this.length;i < l;i++){
	// 	// 如果当前dom元素具有指定的样式类
	// 	// 返回值为true，结束循环
	// if((' ' + this[i].className + ' ')
	// 	.indexOf(' ' + className + ' ') !== -1) {
	// 	ret = true;
	// 	break;
	// }
	// }
	this.each(function(v) {
		if ((' ' + v.className + ' ')
			.indexOf(' ' + className + ' ') !== -1) {
			ret = true;
			return false;
		}
	});

	return ret;
},
```

## $.each方法

1. 功能:实现遍历数组或者伪数组,通过第二个参数(回调函数)来处理遍历到的每一个元素
	在回调函数中, `this` 是指向当前遍历的元素.
2. 语法: `$.each([数组/伪数组], callback)` ;
3. 实现思路
	* 声明 `each` 函数,定义两个形参,第一个 遍历的(伪)数组;第二: 回调函数
	* 使用 `for` 循环,遍历(伪)数组,再循环体内部执行回调函数. 在执行时,给回调函数传实参
	* 实现回调函数内部 `this` 指向,当前遍历到的元素
	* 通过回调函数的返回值,判断是否结束循环. 规定:当返回值为 `false` ,结束循环
```js
each: function(obj, callback) {
	var i = 0,
		l = obj.length;
	// 遍历数组元素
	for (; i < l; i++) {
		// 执行用户指定回调函数
		// 将当前遍历到的元素以及索引传入回调函数
		if (callback.call(obj[i], obj[i], i) === false) break;
	}
}
```

## itcast中链式编程的实现

1. 返回当前方法的调用者: `return this;`

## get方法

1. 功能:根据参数 `index` ,获取相应 `dom` 元素
2. 实现思路
	* 将字符串类型转换成数字
	*  `index < 0 ==> index +length`
	*  `return this[index]`

```js
get: function(index) {
	index = index - 0;
	index = index < 0 ? index + this.length : index;
	return this[index];
},
```

## eq方法

1. 功能:根据参数 `index` ,获取相应 `dom` 元素,转换成 `itcast` 对象,并且返回

```js
eq: function(index) {
	return itcast(this.get(index));
},
```

## first方法

```js
first: function() {
	return this.eq(0);
},
```

## last方法

```js
last: function() {
	return this.eq(-1);
}
```

## css方法

1. 功能:
	* 获取:如果只传一个参数并且类型不为对象,获取相应的样式属性值
	* 设置:a,如果只传一个参数并且类型为对象,设置多个样式值; b,传入两个参数,设置单个样式.
2. 实现思路
	* 给 `itcast` 原型添加 `css` 方法,定义两个参数.
	* 如果只传入一个参数
		* 类型为对象的话,同时设置多个样式属性
		* 类型不为对象,获取指定的样式值
	* 如果只传入两个参数,设置单个样式值
```js
css: function(name, value) {
	// 只传入一个参数
	if (value == undefined) {
		// 如果name类型为对象，同时设置多个样式
		if (typeof name === 'object') {
			// 遍历this上的每一个dom元素
			this.each(function(v) {
				// 枚举name上的每个属性值
				for (var k in name) {
					// 给当前遍历到的dom元素设置样式
					v.style[k] = name[k];
				}
			});
		} else { // 如果name不为对象
			// 默认获取this上的第一个dom元素的指定样式值
			// 如果浏览器支持getComputedStyle，使用该方法获取指定样式值
			// if(window.getComputedStyle){
			// 	return window.getComputedStyle(this[0])[name];
			// } else { //否则使用currentStyle获取
			// 	return this[0].currentStyle[name];
			// }
			// 如果this上没有任何dom元素， 就返回null
			if (!this[0]) return null;
			return window.getComputedStyle ?
				window.getComputedStyle(this[0])[name] :
				this[0].currentStyle[name];

		}
	} else { // 如果传入两个参数
		this.each(function(v) {
			v.style[name] = value;
		});
	}
	// 实现链式编程
	return this;
},
```

## addClass方法

1. 功能:给结果集中的每一个 `dom` 元素添加指定样式类.
2. 实现思路
	* 遍历 `this` 上的每一个 `dom` 元素
	* 首先判断当前遍历到的 `dom` 元素是否含有样式类.

```js
addClass: function(className) {
	// 遍历this上的每一个dom元素，并实现链式编程
	return this.each(function(v) {
		// 判断当前dom元素v是否具有className
		// 如果不具有，给其添加指定的样式类
		if(!itcast(v).hasClass(className)){
			v.className += ' ' + className;
		}
	});
},
```

## removeClass方法

1. 功能:删除结果集中的每一个 `dom` 元素的指定样式类.
2. 实现思路
	* 遍历 `this` 上的每一个 `dom` 元素
	* `(' ' + v.className + ' ').replace(' ' + className + ' ',' ');`
```js
removeClass:function(className) {
	// 遍历this上的每一个dom元素，并实现链式编程
	return this.each(function(v) {
		// 删除当前dom元素的样式类className
		v.className = (' ' + v.className + ' ').
			replace(' ' + className + ' ', ' ');
	});
}
```

## toggleClass方法

1. 功能: 切换指定的样式类,如果有,就删除,没有就添加
2. 实现思路
	* 遍历 `this` 上的每一个 `dom` 元素
	* 判断当前遍历到的 `dom` 元素是否含有指定的样式类
	* 如果有,就删除
	* 如果没有,就添加
```js
toggleClass: function(className) {
	// 遍历this上的每一个dom元素，并实现链式编程
	return this.each(function(v) {
		// 将当前遍历到的元素转换成itcast对象
		var $v = itcast(v);
		// 如果具有指定的样式类，就删除该样式类
		if($v.hasClass(className)){
			$v.removeClass(className);
		} else { // 如果没有指定的样式类，就添加该样式类
			$v.addClass(className);
		}
	});
}
```
