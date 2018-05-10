---
title: JQuery分析及实现part6之动画模块功能及实现
date: 2016-11-24 09:38:13
tags:
  - 原生Js
  - Js框架
  - JQuery
categories: javascript
---

JQuery模块分析及其实现第六部分动画部分功能及实现,接第五部分!

<!-- more -->

## 动画原理

* 根据人眼具有 `0.1` 秒的视觉残留,只有在一秒切换至少 `24` 个画面就会产生动画

## 动画的基本结构

```js
function animate() {
	function render() {
		//动画
	}
	window.setInterval(render, time);
}
```

## 小动画案例

* 奔跑的小矩形

```html
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>奔跑吧矩形</title>
	<script src="itcast.js"></script>
	<style>
		div {
			width: 100px;
			height: 100px;
			border: 5px solid yellowgreen;
			position: relative;
		}
	</style>
	<script>
	var animate = function(elem, step, target) {
		var left,//起始位置
			timer;//定时器id
		function render() {//用来计算动画当前位移，并制定动画元素的位置
			left = elem.offsetLeft;
			if( left + step >= target ){
				elem.style.left = target + 'px';
				window.clearInterval(timer);
			} else {
				elem.style.left = left + step + 'px';
			}
		}
		// 启动定时器 开始动画
		timer = window.setInterval(render, 1000 / 60);
	};
	$(function() {
		$('#start').click(function() {
			animate(document.getElementById('dv'), 3, 1000);
		});
	});
	</script>
</head>
<body>
	<div id="dv"></div>
	<button id="start">开始动画</button>
</body>
</html>
```

## 匀速直线动画

1. 固定时间
2. 固定距离
3. 如何判断动画结束的时机?
	* 使用时间来判断是否结束动画
	* 如果动画时间到达指定时间,那么就结束动画,并让动画元素到达终点
4. 实现思路
	* 定义动画函数, `animate` 函数. 当调用 `animate` 函数时, 即动画开始的时间
	* 定义 `render` 函数. 用来给动画元素设置属性值
		* 计算当前动画元素所在的位置, 然后累计到其对应属性值上.
		* 首先计算动画的时间间隔
		* 如果时间间隔大于或等于指定的总时间, 那么就停止动画并设置动画元素到达终点
		* 否则, 根据速度, 动画时间间隔计算出位移. 再将其于起始位置累加后赋值给 `elem`
	* 定义定时器, 开始动画.

```js
var animate = function(elem, target, duration) {
	var timer, // 定时器id
		speed, // 速度
		location, // 起始位置
		distance, // 动画总距离
		startTime,// 动画开始时间
		currentTime,// 动画当前时间
		time; // 当前动画经过总时间间隔

	location = elem.offsetLeft;
	distance = target - location;
	speed = distance / duration;
	startTime = +new Date;  // 转换毫秒值
	// 用来计算动画当前位移，并制定动画元素的位置
	var render = function() {
		currentTime = +new Date;
		time = currentTime - startTime;
		// 如果当前动画经过总时间间隔大于或等于 指定总时间
		// 停止动画,并设置动画元素到达终点
		if(time >= duration){
			// console.log(time);
			// 1 设置动画元素到达终点
			elem.style.left = target + 'px';
			// 2 停止动画，即清楚定时器
			window.clearInterval(timer);
		} else { // 否则，根据速度 和 时间间隔求出动画位移
			// 指定动画元素的位置
			// 注意： 要加上 起始位置
			elem.style.left = speed * time + location + 'px';
		}
	};
	// 启动定时器 开始动画
	timer = window.setInterval(render, 1000 / 60);
};
$(function() {
	$('#start').click(function() {
		animate(document.getElementById('dv'), 1000, 2000);
	});
});
```

## 匀减速直线动画

1. 物理公式
	* a：	加速度
	* t：	时间间隔
	* v0：	初始速度
	* vt：	末速度
	* S：	位移
	* 正方向：	S = v0 * t + a + t * t / 2;
2. S ==> target - location <br> t ==> duration <br> v0 = 0
3. 正方向 <br> a = 2 * ( S - v0 * t) / ( t * t) <br> ==> = 2 * S / ( t * t) <br> ==> = 2 * ( target - location ) / ( duration * duration ) <br> vt = 2 * ( target - location ) / duration
4. time 时间间隔内的 匀减速位移 <br> tween = v0 * t - a * t * t / 2 <br> ==> tween = 2 * ( target - location ) * time / duration <br> - (target - location ) * time * time / ( duration * duration )

```js
var animate = function(elem, target, duration) {
	var timer, // 定时器id
		tween, // 单位时间间隔的位移
		location, // 起始位置
		distance, // 动画总距离
		startTime, // 动画开始时间
		currentTime, // 动画当前时间
		time; // 当前动画经过总时间间隔

	location = elem.offsetLeft;
	distance = target - location;
	startTime = +new Date; // 转换毫秒值
	// 用来计算动画当前位移，并制定动画元素的位置
	var render = function() {
		currentTime = +new Date;
		time = currentTime - startTime;
		// 如果当前动画经过总时间间隔大于或等于 指定总时间
		// 停止动画,并设置动画元素到达终点
		if (time >= duration) {
			// console.log(time);
			// 1 设置动画元素到达终点
			tween = distance;
			// 2 停止动画，即清楚定时器
			window.clearInterval(timer);
		} else { // 否则，根据速度 和 时间间隔求出动画位移
			// 指定动画元素的位置
			// 注意： 要加上 起始位置
			tween = 2 * distance * time / duration - distance * time * time / (duration * duration);
		}

		elem.style.left = tween + location + 'px';
	};
	// 启动定时器 开始动画
	timer = window.setInterval(render, 1000 / 60);
};
$(function() {
	$('#start').click(function() {
		animate(document.getElementById('dv'), 1000, 1500);
	});
});
```

## 使用对象封装缓动函数

```js
/*
	x: null,
	t: 时间间隔
	b: 起始位置
	c: 终止位置
	d: 总时间
*/

var easing = {
	linear: function(x, t, b, c, d) {
		return (c - b) * t / d;
	},
	minusspeed: function(x, t, b, c, d) {
		return 2 * (c - b) * t / d - (c - b) * t * t / (d * d);
	},
	easeInQuad: function(x, t, b, c, d) {
		return c * (t /= d) * t + b;
	},
	easeOutQuad: function(x, t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b;
	},
	easeInOutQuad: function(x, t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t + b;
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	},
	easeInCubic: function(x, t, b, c, d) {
		return c * (t /= d) * t * t + b;
	},
	easeOutCubic: function(x, t, b, c, d) {
		return c * ((t = t / d - 1) * t * t + 1) + b;
	},
	easeInOutCubic: function(x, t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t + 2) + b;
	},
	easeInQuart: function(x, t, b, c, d) {
		return c * (t /= d) * t * t * t + b;
	},
	easeOutQuart: function(x, t, b, c, d) {
		return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	},
	easeInOutQuart: function(x, t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	},
	easeInQuint: function(x, t, b, c, d) {
		return c * (t /= d) * t * t * t * t + b;
	},
	easeOutQuint: function(x, t, b, c, d) {
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	},
	easeInOutQuint: function(x, t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	},
	easeInSine: function(x, t, b, c, d) {
		return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	},
	easeOutSine: function(x, t, b, c, d) {
		return c * Math.sin(t / d * (Math.PI / 2)) + b;
	},
	easeInOutSine: function(x, t, b, c, d) {
		return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	},
	easeInExpo: function(x, t, b, c, d) {
		return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	},
	easeOutExpo: function(x, t, b, c, d) {
		return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	},
	easeInOutExpo: function(x, t, b, c, d) {
		if (t == 0) return b;
		if (t == d) return b + c;
		if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
		return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function(x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	},
	easeOutCirc: function(x, t, b, c, d) {
		return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	},
	easeInOutCirc: function(x, t, b, c, d) {
		if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
		return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	},
	easeInElastic: function(x, t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if (t == 0) return b;
		if ((t /= d) == 1) return b + c;
		if (!p) p = d * .3;
		if (a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else var s = p / (2 * Math.PI) * Math.asin(c / a);
		return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	},
	easeOutElastic: function(x, t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if (t == 0) return b;
		if ((t /= d) == 1) return b + c;
		if (!p) p = d * .3;
		if (a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else var s = p / (2 * Math.PI) * Math.asin(c / a);
		return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	},
	easeInOutElastic: function(x, t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if (t == 0) return b;
		if ((t /= d / 2) == 2) return b + c;
		if (!p) p = d * (.3 * 1.5);
		if (a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else var s = p / (2 * Math.PI) * Math.asin(c / a);
		if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
	},
	easeInBack: function(x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	},
	easeOutBack: function(x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	},
	easeInOutBack: function(x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
		return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	},
	easeOutBounce: function(x, t, b, c, d) {
		if ((t /= d) < (1 / 2.75)) {
			return c * (7.5625 * t * t) + b;
		} else if (t < (2 / 2.75)) {
			return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
		} else if (t < (2.5 / 2.75)) {
			return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
		} else {
			return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
		}
	}
};
```

## 抽取缓动函数

将缓动函数的可变变量抽取出来,以便于封装

```js
var animate = function(elem, target, duration, easingName) {
		var timer, // 定时器id
			tween, // 单位时间间隔的位移
			location, // 起始位置
			distance, // 动画总距离
			startTime,// 动画开始时间
			currentTime,// 动画当前时间
			time; // 当前动画经过总时间间隔

		location = elem.offsetLeft;
		distance = target - location;
		startTime = +new Date;  // 转换毫秒值
		// 用来计算动画当前位移，并制定动画元素的位置
		var render = function() {
			currentTime = +new Date;
			time = currentTime - startTime;
			// 如果当前动画经过总时间间隔大于或等于 指定总时间
			// 停止动画,并设置动画元素到达终点
			if(time >= duration){
				// console.log(time);
				// 1 设置动画元素到达终点
				tween = distance;
				// 2 停止动画，即清楚定时器
				window.clearInterval(timer);
			} else { // 否则, 根据匀减速运动公式来求time时间间隔内的位移
				// 指定动画元素的位置
				// 注意： 要加上 起始位置
				tween = easing[easingName](null, time, location, target, duration);
			}

			elem.style.left = tween + location + 'px';
		};
		// 启动定时器 开始动画
		timer = window.setInterval(render, 1000 / 60);
	};
$(function() {
	$('#start').click(function() {
		animate(document.getElementById('dv'), 1000, 1500, 'easeInOutElastic');
	});
});

```

## 多属性动画的实现

到此我们就可以继续进行框架的封装了

```js
// 获取所有动画属性的起始值
var kv = {
	'left': 'offsetLeft',
	'top': 'offsetTop',
	'width': 'offsetWidth',
	'height': 'offsetHeight'
};

function getLocation(elem, target) {
	var obj = {};
	for (var k in target) {
		obj[k] = elem[kv[k]];
	}
	return obj;
}

function getDistance(location, target) {
	var obj = {};
	for (var k in target) {
		obj[k] = parseFloat(target[k]) - location[k];
	}
	return obj;
}

function getTween(time, location, target, duration, easingName) {
	var obj = {};
	for (var k in target) {
		obj[k] = easing[easingName](null, time, location[k], target[k], duration);
	}

	return obj;
}

function setStyles(elem, location, tween) {
	var k;
	for (k in location) {
		elem.style[k] = location[k] + tween[k] + 'px';
	}
}
var animate = function(elem, target, duration, easingName) {
	var timer, // 定时器id
		tween, // 单位时间间隔的位移{left: 800, top:400}
		location, // 起始位置{left: 8,top: 8}
		distance, // 动画总距离{left: 992, top: 792}
		startTime, // 动画开始时间
		currentTime, // 动画当前时间
		time; // 当前动画经过总时间间隔

	location = getLocation(elem, target);
	distance = getDistance(location, target);
	startTime = +new Date; // 转换毫秒值
	// 用来计算动画当前位移，并制定动画元素的位置
	var render = function() {
		currentTime = +new Date;
		time = currentTime - startTime;
		// 如果当前动画经过总时间间隔大于或等于 指定总时间
		// 停止动画,并设置动画元素到达终点
		if (time >= duration) {
			// console.log(time);
			// 1 设置动画元素到达终点
			tween = distance;
			// 2 停止动画，即清楚定时器
			global.clearInterval(timer);
			// 3 删除动画元素的timerId属性
			delete elem.timerId;
		} else { // 否则, 根据匀减速运动公式来求time时间间隔内的位移
			// 指定动画元素的位置
			// 注意： 要加上 起始位置
			tween = getTween(time, location, target, duration, easingName);
		}
		// 设置动画属性值
		setStyles(elem, location, tween);
	};
	// 启动定时器 开始动画
	timer = global.setInterval(render, 1000 / 60);
	// 把定时器id存储在动画元素上（以自定义属性）
	elem.timerId = timer;
};

```

## 实现animate和stop方法

```js
itcast.fn.extend({
	animate: function(target, duration, easingName) {
		easingName = easingName || 'linear';
		return this.each(function() {
			if(!('timerId' in this)){
				animate(this, target, duration, easingName);
			}
		});
	},
	stop: function() {
		return this.each(function() {
			if('timerId' in this){
				global.clearInterval(this.timerId);
				delete this.timerId;
			}
		});
	}
});
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>动画模块的实现</title>
	<script src="itcast.js"></script>
	<style>
		div {
			width: 100px;
			height: 100px;
			border: 5px solid yellowgreen;
			position: relative;
		}
	</style>
	<script>
		$(function() {
			$('#start').click(function() {
				$('#dv').animate({left : 1000}, 1500);
			});
			$('#stop').click(function() {
				$('#dv').stop();
			});
		});
	</script>
</head>
<body>
	<div id="dv"></div>
	<button id="start">开始	动画</button>
	<button id="stop">停止	动画</button>
</body>
</html>
```
