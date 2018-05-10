---
title: Canvas知识整理part2
date: 2016-11-14 19:42:44
tags:
  - Canvas
  - HTML5
  - 画布
categories: Canvas
---
Html5Canvas笔记整理，接part1篇！！

绘制图形不仅仅是利用线条来实现绘图, 还可以有快捷的绘制图形的办法!
1. 绘制矩形
2. 绘制圆弧
3. 绘制文本
4. 绘制图片
5. 绘制动画

<!-- more -->

## 绘制矩形

1. strokeRect();

```js
strokeRect(x, y, w, h)
```

`x`, `x`坐标
`y`, `y`坐标
`w`, 矩形宽
`h`, 矩形高
功能：绘制一个矩形路径，并描边
- 用来绘制一个矩形. 比起直接使用 `moveTo` 和 `lineTo` 方法要简单许多.
- 该方法的前两个参数表示绘制矩形的左上角的坐标. 后两个参数表示这个矩形的宽高.
- 使用该方法不需要使用 `moveTo` 方法设置起始点, 也不需要调用 `stroke` 等绘画方法.
- 绘制的矩形支持 `strokeStyle` 设置颜色样式.

```js
ctx.strokeStyle = 'red';
ctx.strokeRect( 100, 100, 200, 100 );
```

2. fillRect();

```js
fillRect(x, y, w, h)
```

`x`, `x`坐标
`y`, `y`坐标
`w`, 矩形宽
`h`, 矩形高
功能：绘制一个矩形路径，并填充
- 用来绘制一个矩形. 比起直接使用 `moveTo` 和 `lineTo` 方法要简单许多.
- 该方法的前两个参数表示绘制矩形的左上角的坐标. 后两个参数表示这个矩形的宽高.
- 使用该方法不需要使用 `moveTo` 方法设置起始点, 也不需要调用 `stroke` 等绘画方法.
- 绘制的矩形支持 `fillStyle` 设置颜色样式.

```js
ctx.fillStyle = 'green';
ctx.fillRect( 100, 100, 200, 100 );
```

3. rect();

```js
rect(x, y, w, h)
```

`x`, `x`坐标
`y`, y坐标
`w`, 矩形宽
`h`, 矩形高
功能：绘制一个矩形路径，不描边

4. clearRect();

```js
clearRect(x, y, w, h)
```

`x`, `x`坐标
`y`, `y`坐标
`w`, 矩形宽
`h`, 矩形高
功能：清除指定的矩形区域
- 用于清除画布中的矩形区域的内容.
- 参数 `x`, `y` 表示矩形区域左上角的坐标,`width` 与 `height` 表示矩形区域的宽高.

```js
ctx.fillRect( 100, 100, 200, 100 );
ctx.clearRect( 110, 110, 50, 50 );
```

* save restore
	save 保存当前的路径状态
	restore 恢复上一次保存的路径状态( `restore` 是与之对应的,先 `save` 的,后被 `restore` )

```js
var x = 10, y = 10, oldx = 10, oldy = 10;
var width = 100, height = 50;
var intervalId = setInterval(function () {
	ctx.clearRect( oldx - 1, oldy - 1, width + 2, height + 2 );

	ctx.strokeRect( x, y, width, height );

	oldx = x;
	oldy = y;

	x += 4;
	y += 2;

	if ( oldy >= 200 ) {
		// clearInterval( intervalId );
		x = 10, y = 10;
	}
}, 20);
```

## 绘制圆弧

```js
arc(x, y, r, startAngle, endAngle, anticlockwise)
```

* `x,y` 圆心坐标
* `r `  圆的半径
* `startAngle` 起始角度（弧度表示）
* `endAngle` 结束角度（弧度表示）
* `anticlockwise` 是否逆时针绘制，注意找角的时候还是顺时针找

注意事项，每次画完弧之后，都会保存点，下次绘图会从该点开始

```js
// 在 200, 200 的地方绘制一段半径为 100 的圆弧, 圆心角为 - PI / 2 到 PI / 4
...
ctx.arc( 200, 200, 100, -Math.PI/2, Math.PI/4 );
ctx.stroke();

// 为了方便看清楚结构, 绘制坐标轴
ctx.beginPath();
ctx.strokeStyle = 'red';
ctx.moveTo( 50, 200 );
ctx.lineTo( 350, 200 );

ctx.moveTo( 200, 50 );
ctx.lineTo( 200, 350 );

ctx.moveTo( 200, 200 );
ctx.lineTo( 300, 300 );

ctx.stroke();
```

## 绘制扇形

先 `moveTo` 圆心，然后画弧 ，然后 `closePath` 弧就有了

```js
ctx.strokeStyle = 'red';
ctx.fillStyle = 'pink';

ctx.moveTo( 100, 200 );
ctx.arc( 100, 200, 100, -Math.PI/3, Math.PI/3 );
ctx.closePath();
ctx.stroke();

ctx.beginPath();
ctx.moveTo( 300, 200 );
ctx.arc( 300, 200, 100, -Math.PI/3, Math.PI/3 );
ctx.closePath();
ctx.fill();
```

## 绘制扇形动画

绘制扇形动画, 就是每隔几毫秒( 20 毫秒)擦除以前绘制的内容, 然后在以前绘制的基础上比以前多绘制一点东西. 这里多绘制的内容就是由角度决定. 比如一开始角度从 `-Math.PI / 2` 开始绘制. 那么每次角度都 `+0.1` , 直到 绘制到 `Math.PI * 3 / 2 `为止.

```js
ctx.fillStyle = 'green';
var startAngle = -Math.PI / 2,
	angle = startAngle,
	x = 200, y = 200,
	r = 100;
var intervalId = setInterval(function () {
	// 清除之前绘制的内容
	ctx.clearRect( 0, 0, cas.width, cas.height );
	// 角度增量
	angle += 0.1;
	// 判断是否停止计时器
	if ( angle >= Math.PI * 3 / 2 ) {
		clearInterval( intervalId);
		angle = Math.PI * 3 / 2;
		console.log( '绘制完成' );
	}
	// 绘制
	ctx.moveTo( x, y );
	ctx.arc( x, y, r, startAngle, angle );
	ctx.fill();
}, 20);
```

## 绘制饼形图

	等分的饼图,饼图的起始位置在	`-90°` .
绘制饼形图最大的特点是角度是叠加的. 开始从 `-Math.PI/2` 开始绘制, 达到执行角 `x` 后, 下一个区域从 `x` 开始绘制, 然后有到一个角 `y` 停下来. 如此反复到 `Math.PI * 3 / 2` 结束.

```js
var x = 200, y = 200,
	r = 100,
	step = Math.PI * 2 / 3,     // 120 度一个区域
	start = -Math.PI / 2,       // 起始角度
	colors = [ 'red', 'green', 'blue' ];

for ( var i = 0; i < 3; i++ ) {
	ctx.beginPath();
	ctx.moveTo( x, y );
	ctx.fillStyle = colors[ i ];
	ctx.arc( x, y, r, start, start+=step );
	ctx.fill();
}
```
