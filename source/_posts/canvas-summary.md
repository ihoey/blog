---
title: Canvas部分知识总结
date: 2016-11-15 20:38:26
tags:
  - Canvas
  - HTML5
  - 画布
categories: Canvas
---

Canvas笔记总结！！
接前部分~

<!-- more -->

## canvas是什么?

是一个 `HTML5` 标签,该标签用来绘图

## canvas怎么用

`canvas` 是一个画布,不能自己画图,画图需要绘图上下文

```js
var cas = document.querySelector("#c");
//获取绘图上下文
car ctx = cas.getContext("2d");
```

## 画直线

```js
//设置直线的起点
ctx.moveTo(x,y);
//画路径到直线的终点
ctx.lineTo(x,y);
```

## 开启新路径

```js
ctx.befinPath();
```

## 画曲线

```js
//使用for循环,用函数来帮一个y确定一个x
//然后讲x,y的每一个点用lingTo连起来就变成了一条曲线
```

## 画矩形

```js
//1. 手动,纯人工
//2. ctx.rect(x,y,w,h);
//3. ctx.strokeRect(x,y,w,h);
//4. ctx.fillRect(x,y,w,h);
```

## 画弧

```js
ctx.arc(x,y,r,startAngle.endAngle[,Boolean optional anticlockwise])
```

## 扇形

```js
//先moveTo到原心
moveTo(x,y);
ctx.arc(x,y,r,startAngle.endAngle[,Boolean optional anticlockwise])
ctx.closePath();
ctx.fill();
```

## 饼图

`3` 等分的饼
1. 开始的角度一般是 `-90`
2. 每画一个扇形,就让角度 `+120`
3. 再从加了 `120` 的角度画下一个扇形

## 动画饼图

定时器
每一段时间画一个小扇形,就和画饼一样

## 文字

```js
fillText(str, x, y)
strokText(str, x, y)
```

### 对其方式

#### 水平

* left
* center
* right
* start
* end

#### 垂直

* top
* middle
* bottom
* hanging
* alphabetic
* ideographic

## 完整饼图

1. 先算所有数据的总和
2. 算每个数据的比例,用比例算出角度
3. 更具每个角度去画扇形
4. 在去画扇形的中线
5. 画文字下面的线
6. 写文字

## 图片

```js
//3参
ctx.drawImage(img, x, y)
//直接画不管宽高
//5参
ctx.drawImage(img, x, y, w, h)
//要确定宽高
//9参
ctx.drawImage(img, x, y, w, h, x1, y1, w1, h1)

//拿出图片中 x, y, w, h 这个矩形所在的位置的图像
//放到canvas中x1, y1, w1, h1这个矩形所在的位置
```

## 帧动画


## 变换

* 平移变换   把画布的原点移动到指定的位置
    `ctx.translate(x, y)`
* 缩放变换   对画布进行缩放

```js
    ctx.scale(x, y)  //x表示的是对画布x轴的缩放，如果大于1 是放大 如果小于1 是缩小
    ctx.scale(x, y)  //y表示的是对画布y轴的缩放，如果大于1 是放大 如果小于1 是缩小
```

* 旋转变换
    `ctx.rotate(弧度)  //将画布，围绕原点旋转指定的弧度`
