---
title: JQuery分析及实现part5之事件模块功能及实现
date: 2016-11-23 10:27:16
tags:
  - 原生Js
  - Js框架
  - JQuery
categories: javascript
---

JQuery模块分析及其实现第五部分事件部分功能及实现,接第四部分!

<!-- more -->

## remove 方法

1. 功能:将筛选出来的所有 `dom` 元素删除掉
2. 实现思路
    * 遍历 `this` 上的所有 `dom` 元素;
    * 获取当前 `dom` 元素的父节点,调用 `removeChild` 方法删除自己;
    * 循环结束,返回 `this` .

```js
remove: function() {
    return this.each(function() {
        this.parentNode.removeChild(this);
    });
},
```

## empty 方法

1. 功能:将筛选出来的所有 `dom` 元素,清空后代节点
2. 实现思路
    * 遍历 `this` 上的所有 `dom` 元素;
    * 直接给当前 `dom` 元素的 `innerHTML` 属性赋值为空字符串;
    * 循环结束,返回 `this` ,实现链式编程.

```js
empty: function() {
    return this.each(function() {
        this.innerHTML = '';
    });
}
```

<b>以上接第四部分 `dom` 操作模块</b>

***

<b>事件部分begin</b>

## 事件绑定

1. DOM 0方式
    * 通过 `dom` 元素的 `on + 事件名` 属性来绑定事件,并且赋值为 一个字符串;
    * 上述字符串为 执行该事件的代码块(逻辑);
    * 缺点:可读性以及可维护性不好.

2. DOM 0方式的加强版
    * 通过 `dom` 元素的 `on + 事件名` 属性来绑定事件,并且赋值为 一个事件处理函数;
    * 缺点:定义很多的全局函数,容易造成内存过大的损耗,依然没有解决 `js` 代码和 `html` 的耦合度关系;

3. IE标准
    * 通过 `attachEvent` 来绑定事件;
    * 语法: `dom.attachEvent(type, callback)`;
    * 移除事件: `detachEvent(type, callback)`;
        * 注意:如果想要删除某个事件的处理函数,不能将该处理函数定义为匿名的

4. W3C标准
    * 通过 `addEventListener` 方法来给dom元素绑定事件;
    * 语法: `dom.addEventListener(type, callback, useCapture默认值为false)`;
    * 移除事件: `removEventListener(type, callback)`;
        * 注意:如果想要删除某个事件的处理函数,不能将该处理函数定义为匿名的

5. 事件流
    * 概念: 用户在触发某一动作时,页面所做相关反映的过程
    * 三个阶段:
        * 事件捕获阶段
        * 处于事件源阶段
        * 冒泡阶段
    * 事件流种类
        * 捕获型事件流: 事件处理函数是在事件的捕获阶段执行
        * 冒泡型事件流: 事件处理函数是在事件的冒泡阶段执行

6. attachEvent 和 addEventListener 区别
    * 参数个数不同
    * 事件类型传值不同
        * `IE` 标准需要加 `on` 前缀
        * `W3C` 标准不加 `on` 前缀
    * 在绑定多个事件处理函数时，`IE` 在执行事件处理函数时,顺序不定(根据版本),而 `W3C`按照对垒结构来一次执行事件的处理函数
    * 在事件处理函数内 `this` 指向不同
        * IE: `window`
        * W3C: 返回正在执行事件的处理函数的 `dom` 元素

## addEvent 方法

1. 根据浏览器能力,提前返回事件绑定方法
2. 如果浏览器符合 `W3C` 标准,使用 `addEventListener` 来绑定事件
3. 否则就使用 `attachEvent` 来绑定事件

```js
//提前返回
var addEvent = function() {
    // 如果符合W3C标准，使用addEvnetListener绑定事件
    if (global.addEventListener) {
        return function(elem, type, callback, useCapture) {
            elem.addEventListener(type, callback, useCapture || false);
        };
    } else { // 否则就使用IE标准的 attachEvent绑定事件
        return function(elem, type, callback) {
            elem.attachEvent('on' + type, callback);
        };
    }
}();
```

## removeEvent 方法

1. 根据浏览器能力,提前返回事件移除方法
2. 如果浏览器符合 `W3C` 标准,使用 `removeEventListener` 来移除事件处理函数
3. 否则就使用 `detachEvent` 来移除事件处理函数

```js
//提前返回
var removeEvent = function() {
    if (global.removeEventListener) {
        return function(elem, type, callback) {
            elem.removeEventListener(type, callback);
        };
    } else {
        return function(elem, type, callback) {
            elem.detachEvent('on' + type, callback);
        };
    }
}();
```

## on 方法

1. 功能:给 `itcast` 对象上的所有的 `dom` 元素绑定事件
2. 实现思路
    * 遍历 `this` 上所有 `dom` 元素
    * 调用 `addEvent` 给当前遍历到的 `dom` 元素绑定事件
    * 返回 `this` ，实现链式编程

```js
on: function(type, callback, capture) {
    return this.each(function() {
        addEvent(this, type, callback, capture);
    });
},
```

## off 方法

1.  功能：移除 `itcast` 对象上所有 `dom` 元素的事件处理函数
2. 实现思路
    * 遍历 `this` 上所有 `dom` 元素
    * 调用 `removeEvent` 给当前遍历到的 `dom` 元素移除相应事件的处理函数
    * 返回 `this` ，实现链式编程

```js
off: function(type, callback) {
    return this.each(function() {
        removeEvent(this, type, callback);
    });
}
```

## click 方法

1. 功能: 给 `itcast` 对象上的所有的 `dom` 元素绑定单击事件处理函数的
2. 语法: `itcast对象.click(callback)`;
3. 实现思路
    * 遍历 `this` 上的所有 `dom` 元素
    * 调用 `addEventListener` 分别传值即可
    * `return this` 实现链式编程

```js
click: function(callback, capture) {
    return this.each(function() {
        addEvent(this, 'click', callback, capture);
    });
}
```

## 快捷绑定事件方法

```js
itcast.each(['click', 'dblclick', 'keypress', 'keyup', 'keydown', 'mouseover', 'mouseout',
'mouseenter', 'mouseleave', 'mousemove', 'mouseup', 'mousedown'], function(type) {
    itcast.fn[type] = function(callback, capture) {
        return this.on(type, callback, capture);
    };
});
```

