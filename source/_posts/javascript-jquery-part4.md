---
title: JQuery分析及实现part4之DOM操作模块功能及实现
date: 2016-11-21 19:08:10
tags:
  - 原生Js
  - Js框架
  - JQuery
categories: javascript
---

JQuery模块分析及其实现第四部分属性部分功能及实现,接第三部分!

<!-- more -->

## appendTo 方法

1. 功能:将结果集中的元素 追加到指定的 `dom` 元素上.
2. 语法:`<target对象>.appendTo(target)`
3. 实现思路
	* 定义 `appendTo` 方法,声明一个形参 `target` .追加到目标 `dom` 元素
		* 选择器
		* `dom` 元素
		* `dom` 数组
	* 为了操作方便,将 `target` 类型统一为 `itcast` 对象,去 `itcast` 函数走一圈,出来就是 `itcast` 对象.
	* 遍历 `this` 上的每一个 `dom` 元素,再遍历 `target` 上的每一个 `dom` 元素
	* 将 `this` 上的 `dom` 元素追加到 `target` 上
	* 注意:
		在追加节点时,如果遍历的是第一个目标 `dom` 元素,不需要拷贝节点;否则要深拷贝节点,并将上述得到的节点储存到 `ret` 内
	* 将 `ret` 数组转换成 `itcast` 对象,作为 `appendTo` 方法的返回值
		* 如果不这样做的话,就会在添加样式时,只有没拷贝的节点有样式

```js
appendTo: function(target) {
	var node,
		ret = [];
	// 统一target类型 为itcast对象（为了方便操作）
	target = itcast(target);
	// 遍历this上的每一个dom元素
	this.each(function(v) {
		// 在遍历目标dom元素
		target.each(function(t, i) {
			// 如果当前dom元素为 目标上的第一个.不拷贝节点
			// 否则拷贝节点
			node = i === 0 ? v : v.cloneNode(true);
			// 将被追加的节点,添加到ret内
			ret.push(node);
			// 将节点追加到指定的目标dom元素上.
			t.appendChild(node);
		});
	});
	// 将每一个添加的dom元素,转换成itcast对象返回,实现链式编程
	// 原因:在添加样式时,如果不这样做的话,只会给没克隆的节点添加样式.
	return itcast(ret);
}
```

## append 方法

1. 语法: `<itcast对象>.append(source)` ;
2. 功能: 将 `source` 上的所有 `dom` 元素,追加到 `itcast` 对象上
2. 实现思路
	* 统一 `source` 类型,为 `itcast` 对象.
	* `source.appendTo(this)`
	* `return this;`

```js
append: function(source) {
	//统一source类型,为itcast对象
	source = itcast(source);
	source.appendTo(this);
	return this;
},
```

## prependTo 方法

1. 语法: `<itcast对象>.prependTo(target);`
2. 功能:将 `itcast` 对象上的每一个 `dom` 元素,追加到 `target` 最前边 `insertBefore`
3. 实现思路
	* 统一 `target` 类型,为 `itcast` 对象
	* 定义 `node` 变量,临时存储被追加的结点.定义 `ret` 数组,存储所有被追加的节点
	* 先遍历 `target` 上的每一个 `dom` 元素
	* 定义变量 `firstChild` ,临时存储当前目标 `dom` 元素的第一个子节点,再遍历 `this` 上的每一个 `dom` 元素
	* 判断当前遍历的 `dom` 是否为 `target` 上的第一个 `dom` 元素
	* 如果为真,此时不需要克隆节点
	* 否则,要深克隆节点
	* 将上述的到的节点, `push` 到 `ret` 内
	* 调用 `insertBefore` 方法追加节点,此时第一个参数为追加新的节点,第二个参数为 `firstChild` ,在 `firstChild` 之前追加新节点.
	* 两层循环结束,操作完成
	* 将 `ret` 转换成 `itcast` 对象,作为 `prependTo` 方法的返回值,实现链式编程.

```js
prependTo: function(target) {
	//定义变量node,临时存储被追加的节点
	var node,
	//定义变量firstChild,临时存储当前dom元素的第一个子节点
		firstChild,
		self = this,
		//定义ret数组,存储所有被追加的节点
		ret = [];
   //统一类型为itcast对象
	target = itcast(target);
	//遍历target上的每一个dom元素
	target.each(function(elem, i) {
		// 缓存当前目标dom元素的第一个子节点
		firstChild = elem.firstChild;
		//遍历this上的每一个dom元素
		self.each(function(dom) {
			//判断当前遍历的dom是否为target上的每一个dom元素
			//若为真,则不需要克隆节点,否则,要深克隆节点
			// 将得到的节点赋值给node
			node = i === 0 ? dom : dom.cloneNode(true);
			//将节点push到ret内
			ret.push(node);
			//调用insertBefore方法,追加节点(追加的新节点,firstChild)
			elem.insertBefore(node, firstChild);
		});
	});
    //将ret作为itcast对象,并且返回
	return itcast(ret);
}
```

## prepend 方法

1. 语法: `<itcast对象>.prepend(source);`
2. 功能:把 `source` 上的所有的 `dom` 元素,添加到 `this` 上的最前边
3. 实现思路:
	* 统一 `source` 类型,为 `itcast` 对象
	* 通过 `source` 调用 `prependTo` 方法,将 `source` 上的所有 `dom` 添加到 `this` 上的最前边
	*  `return this` 实现链式编程

```js
prepend: function(source) {
	source = itcast(source);
	source.prependTo(this);
	return this;
}
```

## next 方法

1. 功能:获取 `itcast` 对象上所有 `dom` 元素的下一个兄弟元素 `(nextSiling)`
2. 语法: `<itcast对象>.next();` 返回值类型, `itcast` 对象
3. 实现思路
	* 定义 `ret` 数组，存储所有 `dom` 的下一个兄弟元素
	* 遍历 `this` 上的所有 `dom` 元素
	* 遍历当前 `dom` 元素下面的所有兄弟，如果类型为 元素，将此元素存储 `ret` 内，结束循环。
	* 两层循环结束，将 `ret` 转换成 `itcast` 对象，作为 `next` 方法的返回值。

```js
next: function() {
	// 存储所用dom的下一个兄弟元素
	var ret = [];
	// 遍历this上的所有dom元素
	this.each(function() {
		// 在遍历当前dom元素下面所有的兄弟元素
		for(var node = this.nextSibling; node ; node = node.nextSibling){
			// 如果当前兄弟节点,为元素节点
			// 即为结果,将其添加ret内,并结束循环
			if(node.nodeType === 1){
				ret.push(node);
				break;
			}
		}
	});
	// 将ret转换成itcast对象,返回
	return itcast(ret);
},
```

## nextAll

1. 功能:获取 `itcast` 对象上所有 `dom` 元素下面的所有兄弟元素 `(nextSiling)`
2. 语法: `<itcast对象>.nextAll();` 返回值类型, `itcast` 对象
3. 实现思路
	* 定义 `ret` 数组，存储所有 `dom` 的下一个兄弟元素
	* 遍历 `this` 上的所有 `dom` 元素
	* 遍历当前 `dom` 元素下面的所有兄弟，如果类型为 元素，将此元素存储 `ret` 内，结束循环。
	* 两层循环结束，将 `ret` 转换成 `itcast` 对象，作为 `nextAll` 方法的返回值。

```js
nextAll: function() {
	var ret = [],
		node;
	this.each(function() {
		for(node = this.nextSibling; node ; node = node.nextSibling){
			if(node.nodeType === 1) ret.push(node);
		}
	});
	return itcast(itcast.unique(ret));
}
```

## before 方法

1. 功能:
2. 语法: `<itcast对象>.before(source)`
3. 实现思路
	* 统一 `source` 类型为 `itcast` 对象
	* 遍历 `this` 上的每一个 `dom` 元素
	* 再遍历 `source` 上的每一个 `dom` 元素
	* 判断当前遍历 `this`的 `dom` 元素的索引是否为0
	* 如果是 `0` ,不需要拷贝节点
	* 否则要深拷贝节点
	* 先拿到当前遍历 `this` 的 `dom` 元素的父节点,调用 `insertBefore` 方法在其前面添加上面的到的新节点
	* 两层循环完毕,操作完成
	*  `return this` 实现链式编程

```js
before: function(source) {
	var node;
	source = itcast(source);
	this.each(function(dom, i) {
		source.each(function(elem) {
			node = i === 0 ? elem : elem.cloneNode(true);
			// 获取dom的父节点，调用insertBefore方法在dom前添加新的子节点node
			dom.parentNode.insertBefore(node, dom);
		});
	});
	return this;
},
```

## after 方法

1. 功能:
2. 语法: `<itcast对象>.after(source)`
3. 实现思路
	* 定义 `nextSiling` 变量,存储 `dom` 元素的下一个兄弟节点
	* 统一 `source` 类型为 `itcast` 对象
	* 遍历 `this` 上的每一个 `dom` 元素
	* 再遍历`source` 上的每一个 `dom` 元素
	* 判断当前遍历 `this` 的 `dom` 元素的索引是否为 `0`
	* 如果是 `0` ,不需要拷贝节点
	* 否则要深拷贝节点
	* 先拿到当前遍历 `this` 的 `dom` 元素的父节点,调用 `insertBefore` 方法在其前面添加上面的到的新节点
	* 两层循环完毕,操作完成
	*  `return this` 实现链式编程

```js
after: function(source) {
	var node,
		nextSibling;
	source = itcast(source);
	this.each(function(dom, i) {
		nextSibling = dom.nextSibling;
		source.each(function(elem) {
			node = i === 0 ? elem : elem.cloneNode(true);
			// 获取dom的父节点，调用insertBefore方法在dom前添加新的子节点node
			dom.parentNode.insertBefore(node, nextSibling);
		});
	});
	return this;
}
```

## unique 方法

1. 功能:实现数组元素去重
2. 语法: `var newRet = itcast.unique(arr);`
3. 实现思路
	* 定义空数组对象 `ret` .存储去重后的元素
	* 遍历原数组,如果当前遍历到的元素在 `ret` 中不存在,就添加 `ret` 内
	* 循环结束, `ret` 存储的就是去重后的元素
	* 返回 `ret`
4. <a href="#code">兼容IE8 indexof 方法</a>
	* 首先判断当前浏览器是否支持 `indexof` 方法
	* 如果不支持就给数组对象的原型添加 `indexof` 方法
	* 遍历 `this` 上的所有元素
	* 如果遍历到的当前元素和指定参数值相同就直接返回其索引值.结束循环
	* 如果在整个上述循环都没有返回值,那么表示不存在指定参数值就返回 `-1` .

```js
unique: function(arr) {
	// 存储去重后的结果
	var ret = [];
	// 遍历原数组arr
	itcast.each(arr, function() {
		// 判断ret是否存在当前遍历到的元素
		// 如果不存在将其添加到ret中
		if(ret.indexOf(this) === -1) ret.push(this);
	});
	// 将ret返回
	return ret;
}
```

<p id="code">兼容 `IE8` `indexof` 方法</p>

```js
// 兼容数组对象的indexOf方法
(function() {
	// 如果浏览器不支持indexOf方法
	// 那么就给数组对象的原型添加indexOf方法
	if(!Array.prototype.indexOf){
		Array.prototype.indexOf = function(val) {
			// 遍历this
			for(var i = 0,l = this.length; i < l; i++){
				// 如果遍历到的当前元素和val相同，返回其索引值
				if(this[i] == val) return i;
			}
			// 那么表示不存在指定参数值就返回 -1
			return -1;
		};
	}
}());
```

## prev 方法

1. 功能: 获取 `itcast` 对象上所有 `dom` 元素的前一个兄弟元素 `(previousSibling)`
2. 语法: `<itcast对象>.prev();` 返回值类型: `itcast对象`
3. 实现思路
	* 定义 `ret` 数组,存储所有 `dom` 的前一个兄弟元素
	* 遍历 `this` 上的所有 `dom` 元素
	* 遍历当前 `dom` 元素之前的所有兄弟,如果类型为元素,将此元素存储 `ret` 内,结束循环
	* 两层循环结束,将 `ret` 转换成 `itcast` 对象,作为 `next` 方法的返回值

```js
prev:function(){
	//存储所有dom的前一个兄弟元素
	var ret=[];
	//遍历this上的所有dom元素
	this.each(function(){
		//在遍历当前dom元素之前所有的兄弟元素
		for(var node=this.previousSibling;node;node=node.previousSibling){
			//如果当前兄弟节点为元素节点
			//即为结果,将其添加到ret内,并结束循环
			if(node.nodeType===1){
				ret.push(node);
				break;
			}
		}
	});
	//将ret转换成itcast对象,返回
	return itcast(ret);
},
```

## prevAll 方法

1. 功能: 获取 `itcast` 对象上所有 `dom` 元素的之前的所有兄弟元素 `(nextSibling)`
2. 语法: `<itcast对象>.nextAll();` 返回值类型: `itcast对象`
3. 实现思路
	* 定义 `ret数组` ,存储所有 `dom` 之前的所有兄弟元素
	* 遍历 `this` 上的所有 `dom元素`
	* 遍历当前 `dom` 元素之前的所有兄弟,如果类型为元素,将此元素存储 `ret` 内,结束循环
	* 两层循环结束,将 `ret` 转换成 `itcast对象` ,作为 `nextAll` 方法的返回值

```js
prevAll:function(){
	var ret=[];
	this.each(function() {
		for(var node=this.previousSibling;node;node=node.previousSibling){
			if(node.nodeType===1) ret.push(node);
		}

	});
	return itcast(itcast.unique(ret));
}
```
