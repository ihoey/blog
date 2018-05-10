---
title: JQuery分析及实现part3之属性模块功能及实现
date: 2016-11-20 11:51:28
tags:
  - 原生Js
  - Js框架
  - JQuery
categories: javascript
---

JQuery模块分析及其实现第三部分属性模块功能及实现,接第二部分!

<!-- more -->

## 知识点复习

1.  `css` 方法
	* 如果只传入一个参数
		* 如果参数类型为对象,表示同时设置多个样式
		* 如果参数类型为字符串,表示获取指定的样式值
	* 如果传入的两个参数,表示设置单个样式值

2.  `itcast.each` 方法: 遍历数组或伪数组
	* 第一个参数,指定遍历的对象
	* 第二个参数,指定的回调函数,对遍历到的每一个元素,进行相关处理

## attr方法( setAttribute 和 getAttribute )

1. 功能: 获取(设置)属性节点值
2. 实现思路
	* 给原型添加 `attr` 方法,定义两个参数:属性节点名字 `name` 以及属性节点值
	* 如果只传入一个参数
		* 如果参数类型为对象,表示设置多个节点值
		* 否则获取指定的属性节点值(默认获取第一个 `dom` 元素的属性节点值)
	* 如果传入两个参数,表示设置单个属性节点值.

```js
attr: function(name,value){
	//只传入一个参数
	if(value == undefined){
		//如果类型为对象,表示设置多个属性
		if(typeof name ==='object'){
			//遍历itcast上的每一个dom元素,并设置属性节点值
			this.each(function(v){
				//枚举name对象上的每一个属性
				for(var k in name){
					v.setAttribute(k, name[k]);
				}
			});
		} else { //如果类型为字符串,获取属性节点值
			if(!this[0]) return null;
			return this[0].getAttribute(name);
		}
	}else { //传入两个参数,表示设置单个属性节点值
		this.each(function(v) {
			v.setAttribute(name, value)
		});
	}
	return this
},
```

## html方法

1. 功能:
	* 不传参数,表示获取指定 `dom` 元素的 `innerHTML` 属性值
	* 否则,表示设置指定 `dom` 元素的 `innerHTML` 属性
2. 实行思路
	* 判断是否传入参数
	* 如果没穿,获取 `itcast` 对象上的第一个 `dom` 元素的 `innerHTML` 属性值
	* 否则,给 `itcast` 对象上的每一个 `dom` 元素设置 `innerHTML` 属性

```js
html: function(html) {
	//如果没有给html传值,表示获取
	if(html==undefined){
		//如果icast没有任何dom元素,就返回一个期望值,即空字符串
		//如果有的话,就返回一个dom元素的innerHTML属性值
		return this[0] ? this[0].innerHTML : '';
	}else{//如果给html船只,给itcast对象上的每一个dom元素设置innerHTML属性
		return this.each(function(v){
			v.innerHTML = html;
		});
	}
},
```

## text方法

1. 功能
	* 不传值,表示获取文本节点(返回的是后代中所有文本节点值)
	* 传值,设置指定 `dom` 元素文本值
2. 实现思路
	* 如果不传值,优先考虑浏览器是否支持 `textContent` 属性
		* 如果支持,就使用 `textContent` 返回结果集中每一个 `dom` 元素的文本节点值
		* 否则,就是用 `innerText` 返回结果集中每一个 `dom` 元素的文本节点值
	* 如果传值,给 `itcast` 对象上的每一个 `dom` 元素设置文本节点值.
		* 如果支持 `textContent` 属性,就是用该属性设置文本
		* 否则,就是用 `innerText` 来设置文本.

```js
text: function(text) {
	// 如果没有传值，表示获取文本值
	if(text == undefined){
		// 定义结果变量，存储每个dom元素的文本
		var ret = '';
		// 遍历每一个dom元素
		this.each(function(v) {
			// 如果支持textContent，使用其获取文本，累加到ret上
			ret += 'textContent' in document ?
				v.textContent :
				v.innerText.replace(/\r\n/g, '');
		});
		// 返回所有文本
		return ret;
	} else { // 如果传值了，表示为每个dom设置文本
		return this.each(function(v) {
			// 如果支持textContent，就使用该属性为当前dom元素设置文本节点值
			// 否则，使用innerText设置文本节点值。
			if('textContent' in document){
				v.textContent = text;
			} else {
				v.innerText = text;
			}
		});
	}
},
```

## val方法

1. 功能( `value` 属性)
	* 如果不传值,表示获取输入框的文本值
	* 如果传值, 表示给输入框 设置文本
2. 实现思路
	* 如果不传值，表示获取输入框的文本值（获取第一个文本框值）
	* 如果传值，表示给输入框 设置文本
		* 遍历每一个输入框，同时给其设置文本
```js
val: function(value) {
	// 如果没有传值，表示获取第一个dom元素的value属性值
	// 如果itcast对象上没有任何dom元素，返回空字符串
	if(value == undefined){
		return this[0] ? this[0].value : '';
	} else {// 否则，为每一个dom元素设置value属性值
		return this.each(function() {
			this.value = value;
		});
	}
}
```

## prop方法

1. 功能:和 `attr` 相似
	* 注意: 有些属性名称,比如 `for` , `class` 是保留字或关键字不能作为对象属性名称,所以要创建一个对象,需要转换这类的属性
	* 定义 `propFix` 对象,存储上述属性到这属性名称的映射关系
	* 如果只传入一个参数
		* 类型为对象,同时给  `dom` 对象添加属性
		* 类型为字符串,获取 `itcast` 对象上的第一个 `dom` 对象的指定属性值
	* 如果传入的参数,给所有的 `dom` 对象添加单个属性
	* 细节: 无论是设置还是获取属性,在操作之前,先要从 `propFix` 对象拿到映射后的属性名称
		* 如果拿到的心的属性名称不为 `undefined` ,就用映射后的属性名来操作 `dom` 对象
		* 否则,那么久使用旧的属性名称来操作 `dom` 对象.

```js
// 属性模块
itcast.propFix = {
	'for': 'htmlFor',
	'class': 'className'
};
itcast.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	itcast.propFix[this.toLowerCase()] = this;
});
prop: function(name, value) {
	// 如果没有给value传值
	var prop;
	if (value == undefined) {
		// 并且name的类型为 对象，表示给每一个dom对象添加多个属性
		if (typeof name === 'object') {
			this.each(function() {
				for (var k in name) {
					// 首先从propFix对象上获取属性名字
					// 如果有，就使用新的属性名字
					// 如果没有，就使用原来的属性名字
					prop = itcast.propFix[k] ? itcast.propFix[k] : k;
					this[prop] = name[k];
				}
			});
		} else { // 如果name的类型 为字符串，表示获取第一个dom对象的指定属性值
			prop = itcast.propFix[name] ? itcast.propFix[name]: name;
			return this.length > 0 ? this[0][prop] : null;
		}
	} else { // 如果传入两个参数，表示给每一个dom对象添加单个属性
		// 遍历itcast上的每一个dom对象，添加属性
		prop = itcast.propFix[name] ? itcast.propFix[name]: name;
		this.each(function() {
			this[prop] = value;
		});
	}
	// 实现链式编程
	return this;
}
```
