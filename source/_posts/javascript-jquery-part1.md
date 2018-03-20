---
title: JQuery分析及实现part1框架结构
date: 2016-11-18 18:40:35
tags: 
	- 原生Js
	- Js框架
	- JQuery
categories: javascript
---

JQuery模块分析及其实现第一部分!

<img src="https://cdn.dode.top/20161119.png" width="100%">

<!-- more -->

## 案例：获取指定DOM下所有子元素
	
1. 在框架内部，遍历子节点，应该使用 `firstChild` 和 `nextSibling` 两种方式实现,代码如下。
获取 `id` 为 `dv` 的元素下所有的子元素 `nodeType：1 - 12 (1 2 3 8 9 11 --documentFrament)` .

* 第一种方式: `childNodes`

```js
// 实现思路：
// 通过childNodes获取到所有的子节点；
// 将上述所有的子节点中，元素节点获取出来。
/**
 * [getChildren 获取子元素]
 * @param  {[type]} parent [父节点]
 * @return {[type]}        [返回parent的所有子元素]
 */
function getChildren(parent) {
	// 存储结果集
	var ret = [],
		nodes;
	// 获取parent所有子节点
	nodes = parent.childNodes;

	// 遍历nodes
	for(var i = 0,l = nodes.length; i < l;i++){
		// 如果遍历到当前子节点类型为元素，即为所要结果。存储在ret内。
		if(nodes[i].nodeType === 1) {
			ret.push(nodes[i]);
		}
	}
	// 返回结果
	return ret;
}
console.log(getChildren(document.getElementById('dv')));
```

* 第二种方式：`firstChild nextSibling（推荐）`

```js
//使用while方式
function getChildren(parent) {
	var ret = [],
		elem = parent.firstChild;
	// 遍历parent所有子节点
	// 如果有子节点
	while(elem){
		// 并且节点类型为元素。存储在ret内
		if(elem.nodeType === 1) ret.push(elem);
		// 更新循环标量
		// 赋值为下一个兄弟节点
		elem = elem.nextSibling;
	}
	// 返回结果
	return ret;
} 


//使用for循环
function getChildren(parent) {
	var ret = [],
		elem = parent.firstChild;
	for(; elem ; elem = elem.nextSibling){
		if(elem.nodeType === 1) ret.push(elem);
	}			
	return ret;
}

console.log(getChildren(document.getElementById('dv')));
```

## 框架结构

1. 在编写框架的时候，为了防止变量污染，尽量使用沙箱模式 封装框架
	+ 在沙箱内部，如果经常使用全局变量或全局对象的话，最好的做法就是将它们当做实参传入沙箱内。

2. 核心函数为 `itcast` ，相当于 `jQuery` 。最终要暴露给用户使用的

3. 实现 `itcast` 函数，使用的是 工厂模式 来 创建对象。好处：用户 `new` 或 不 `new` 都可以得到正确的对象

4.  `init` 构造函数 的 位置

	+ 如果放在沙箱内部，用户是无法修改或重写的。所以要容纳更改用户，尽量将构造函数暴露给用户
	+ 可以把构造函数放在 `itcast` 函数上，也可以放在 `itcast` 函数原型上。
	+ 处于 `jQuery` 之父，在写简单继承模式时，将构造函数放在其原型上。那么在编写框架时，即延续下来了

5.  `init` 创建出来的对象，最终继承自 `itcast.prototype` 。所以可以将 `init` 对象称为 `itcast` 对象。

6. 由于暴露给用户 的 是 `itcast` 和 其原型。所以在扩展成员时，只能在这两个对象上扩展。而在函数对象上扩展的成员 为 静态成员。可以直接通过函数名字来访问。但是，在原型上的成员，必须创建实例来访问。因此为了实现 `init` 对象可以访问 `itcast` 原型上的成员，就基于原型来实现继承。

```js
(function(global) {
	var init;
	// 核心函数（工厂函数）
	var itcast = function(selector) {
		return new itcast.fn.init(selector);
	};

	// 核心原型	
	itcast.fn = itcast.prototype = {
		constructor: itcast
	};

	// 构造函数
	init = itcast.fn.init = function(selector) {};
	// 实现init对象继承自itcast原型
	init.prototype = itcast.fn;

	// 可扩展方法
	// 如果target为undefined值，那么就是给this扩展成员
	// 否则就是给target对象扩展。
	itcast.extend = itcast.fn.extend = function(source, target) {
		var k;
		// 如果target为undefined值，就赋值为this
		// 给this扩展成员
		if (target == undefined) {
			target = this;
		}	

		// target = target || this;

		for(k in source){
			target[k] = source[k];
		}		
	};
	// 暴露给用户
	global.$ = global.itcast = itcast;
}(window));

itcast.fn.addClass = function(className) {};
itcast.fn.append = function(className) {};
```

7. 完善`init`构造函数

	+ `selector` 类型：
		- 无效值： `null` `undefined` `' '` `false`
		- 字符串
			* 选择器：	 `div` 根据选择器筛选dom元素，并以伪数组形式 存储在 `this` 上
			*  `html` 字符串 `<p>123</p><p>456</p>` `<p>` 将html字符串 转换成 `html` 元素
		- `DOM` 节点 
		- `DOM` 数组（伪数组） 
		- `function`：入口函数 `DOMContentLoaded`
			* 使用静态属性 `isReady` 存储 `dom` 树是否加载完毕
			* 判断 `isReady` 值， 如果为 `true` ，就直接执行传入的函数。
			* 否则，就给 `document` 的 `DOMContentLoaded` 事件绑定处理程序，在处理程序中，先将 `isReady` 赋值为 `true` ，在执行传入的函数。

8. 如何判断字符串为 `html` 字符串，必须满足一下条件：

	* 以 `<` 开头
	* 以 `>` 结尾
	* 最小长度为 `3`

9. 如何判断像数组（数组和伪数组）

	+ 用 `length` 属性去判断，若具有 `length` 属性 表示为 像数组类型
	+ 除了 `window` 对象以及函数对象
	+  `{length: 1} {4: "123", length: 5}` 稀疏数组

	+ 如果为真数组，返回 `true`
	+ 如果 `length` 属性值为 `0` （除了 `window` 对象以及函数对象），返回 `true`
	+ 如果 `length` 属性值 `>0`, 如果对象 具有 `length - 1` 索引，返回 `true`

10. 全局对象 `window` 特性：有一个 `window` 属性 引用 自身。

```js
(function(global) {
	var init,
		document = global.document;

	var itcast = function(selector) {
		return new itcast.fn.init(selector);
	};

	itcast.fn = itcast.prototype = {
		constructor: itcast,
		length: 0
	};
	init = itcast.fn.init = function(selector) {
		// handle: null undefined '' false
		if(!selector) return this;
		// handle: string
		else if(itcast.isString(selector)){
			// handle: html string '<p>123</p>'
			if(itcast.isHTML(selector)){						
				// 怎么存储 以伪数组对象形式存储 dom元素
				Array.prototype.push.apply(this, itcast.parseHTML(selector));
			}
			// handle: selector
			else {
				// 根据选择器获取dom元素
				var nodelist = document.querySelectorAll(selector);
				// 将结果伪数组对象 变成 真数组
				var ret = Array.prototype.slice.call(nodelist);
				// 借调数组对象的slice方法将数组中的所有元素 以伪数组形式存储在this上
				Array.prototype.push.apply(this, ret);
			}
		}
		// handle: dom node
		else if(itcast.isDOM(selector)){
			this[0] = selector;
			this.length = 1;
		}
		// handle: dom array(伪数组对象)
		else if(itcast.isArrayLike(selector)){
			// 获取selector类型
			var _type = Object.prototype.toString.call(selector).
					slice(8, -1).toLowerCase();
			// 如果不是数组类型,就 将其转换 为 真数组类型
			if(_type !== 'array') 
				selector = Array.prototype.slice.call(selector);
			Array.prototype.push.apply(this, selector);
		}	
		// handle: function
		else if(itcast.isFunction(selector)){
			if(itcast.isReady){
				selector();
			} else {
				doucment.addEventListener('DOMContentLoaded', function() {
					selector();
					itcast.isReady = true;
				});	
			}
		}
	};
	init.prototype = itcast.fn;

	itcast.extend = itcast.fn.extend = function(source, target) {
		var k;

		target = target || this;

		for(k in source){
			target[k] = source[k];
		}
	};

	// 添加工具类方法
	itcast.extend({
		isReady: false,
		paseHTML: function(html) {
			var div = document.createElement('div'),
				ret = [];
			div.innerHTML = html;

			for(var elem = div.firstChild; elem; elem = elem.nextSibling){
				if(elem.nodeType === 1) ret.push(elem);
			}

			return ret;
		}
	});
	// 类型判断方法
	itcast.extend({
		// 判断是否为字符串类型
		isString: function(obj) {
			// 如果为null或undefined，返回false
			// 如果typeof值为string，返回true否则返回false。
			return !!obj && typeof obj === 'string';
		},
		isHTML: function(obj) {
			return !!obj && obj.charAt(0) === '<' && 
				obj.charAt(obj.length - 1) === '>' &&
				obj.length >= 3;
		},
		isDOM: function(obj) {
			return !!obj && !!obj.nodeType;
		},
		isFunction: function(obj) {
			return !!obj && typeof obj === 'function';
		},
		isGlobal: function(obj) {
			return !!obj && obj.window === obj;
		},
		isArrayLike: function(obj) {
			var _type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase(),
				length = !!obj && 'length' in obj && obj.length;
			// 过滤 window对象和函数对象
			if(itcast.isFunction(obj) || itcast.isGlobal(obj)) return false;
			return _type === 'array' || length === 0 || 
				typeof length === 'number' && length > 0 && (length - 1) in obj;
		}
	});

	global.$ = global.itcast = itcast;
}(window));
```

到此,一个完整的 `init` 框架结构就好了!
