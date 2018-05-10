---
title: Canvas知识整理part1
date: 2016-11-13 19:39:33
tags:
  - Canvas
  - HTML5
  - 画布
categories: Canvas
---

canvas 是 HTML5 提供的一个用于展示绘图效果的标签. canvas 原意画布, 帆布. 在 HTML 页面中用于展示绘图效果. 最早 canvas 是苹果提出的一个方案, 今天已经在大多数浏览器中实现.

<!-- more -->

    canvas 英 ['kænvəs]  美 ['kænvəs]   帆布 画布

默认的宽高为：`300 * 150`

## Canvas 使用注意：

* 设置 `canvas` 宽高 `canvas` 只是一个画布，不能直接自己绘图，绘图需要使用工具
* 设置 `canvas` 宽和高的时候不推荐使用 `css` 样式去设置，因为会有拉伸的效果
* 在不支持的浏览器中，`canvas` 中的内容会正常的现实出来
* 再 `canvas` 标签内部书写内容，在支持的浏览器中，该内容会被忽略
* 在不支持的浏览器中会将 `canvas` 标签会当作 `div` 标签来处理

## canvas 的使用领域

`canvas` 的使用领域很多:

1. 游戏
2. 可视化数据(重点)
3. `banner` 广告
4. 多媒体
5. 未来
    * 模拟仿真
    * 远程操作
    * 图形编辑

## Canvas 怎么用？

1. 创建一个 `Canvas` 标签
2. 获取到该 `DOM` 对象
3.  `Canvas` 只是一个画布，不能自己画画，需要画图工具
4. 每个 `Canvas` 对应一个画图工具，通过 `canvas` 对象 `.getContext("2d")` 参数有 `2d` 和 `webgl` 两种 `2d` 获取到一个 ` CanvasRenderingContext2D` 类型的对象,使用 `webgl` 返回 `WebGLRenderingContext` 类型的对象.

## 如何画直线

1. 先确定在何处下笔，画图工具 `.moveTo(x, y)`
2. 确定从开始的点画到哪里去，  画图工具 `.lineTo(x, y)`
3. 上面两步之后，线并没有画出来，而是描点，需要最后一步进行画线  画图工具 `.stroke();`

```js
var canvas = document.createElement( 'canvas' );
canvas.width = 500;
canvas.height = 400;
canvas.style.border = '1px dashed red';
document.body.appendChild( canvas );
// 获得 CanvasRenderingContext2D 对象
var context = canvas.getContext( '2d' );
// 设置 起点
context.moveTo( 0, 0 );
// 绘制直线
context.lineTo( 500, 400 );
// 设置 起点
context.moveTo( 0, 400 );
// 绘制直线
context.lineTo( 500, 0 );
// 描边显示效果
context.stroke();
```

## lineTo的特性

每次 `lineTo` 之后都会记录最后的 `lineTo` 的点，下次 `lineTo` 的时候就接着这个 `canvas` 只是一个画布，不能直接自己绘图，绘图需要使用工具sssss点继续画


## closePath

将最后一次 `lineTo` 的点 和最后一次 `moveTo` 的点连起来的
两条线的交界处，如果使用的是 `closePath` 会补全缺口

```js
ctx.moveTo( 100, 100 );
ctx.lineTo( 300, 100 );
ctx.lineTo( 300, 200 );
ctx.closePath();
ctx.stroke();
```

## fill

可以将闭合的图形进行填充

## 非零填充原则

从一个闭合空间引出一条直线，如果该直线两边的箭头数量不相等，则要填充，如果相等则不填充

一边有一个箭头就+1
另一边有一个箭头就-1

## 如何绘制曲线？

使用 `for` 循环给每一个 `x` 对应一个 `y` 值，`x` 和 `y` 的关系需要是个多次幂的方程

## 路径概念

路径就是一次绘图，包含该次绘图中的所有的状态，线宽  颜色  是否虚线

如果想要改变状态，就需要开启新的路径

## beginPath

可以用来开启新的路径

## 线型相关属性

|名称|描述|
|:--:|:--:|
|lineWidth|画线的时候的线的宽度|
|setLineDash()|设置虚线各个线段的长度,参数是一个数组，会将数组中的数字循环使用|
|getLineDash()|获取虚线各个线段的长度，如果是实线，获取到的是空数组|
|lineDashOffset|设置虚线的偏移量，正值往左，负值往右|
|strokeStyle|设置描边的，画线的颜色，颜色值可以为css中任意一种|
|fillStyle|设置填充颜色，颜色值可以为css中任意一种|

## 渐变色

将线划分为 `256` 份，每一份为一个颜色，新画一条线，依次递增，就形成了一个颜色渐变的线段
