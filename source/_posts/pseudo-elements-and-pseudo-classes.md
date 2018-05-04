---
title: 重新认识伪类和伪元素
date: 2017-04-28 16:35:10
tags:
  - 伪类
  - 伪元素
categories: CSS3
---

熟悉前端的人都会听过`css`的伪类与伪元素，然而大多数的人都会将这两者混淆(包括我)。那今天就让我们来看看伪类和伪元素的区别吧!

<!-- more -->

## 伪类与伪元素

先说一说为什么`css`要引入伪元素和伪类，以下是`css2.1 Selectors`章节中对伪类与伪元素的描述：

`CSS introduces the concepts of pseudo-elements and pseudo-classes  to permit formatting based on information that lies outside the document tree.`

- 直译过来就是：`css`引入伪类和伪元素概念是为了格式化文档树以外的信息。也就是说，伪类和伪元素是用来修饰不在文档树中的部分，比如，一句话中的第一个字母，或者是列表中的第一个元素。下面分别对伪类和伪元素进行解释：
    + 伪类用于当已有元素处于的某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，当用户悬停在指定的元素时，我们可以通过`:hover`来描述这个元素的状态。虽然它和普通的`css`类相似，可以为已有的元素添加样式，但是它只有处于`dom`树无法描述的状态下才能为元素添加样式，所以将其称为伪类。
    + 伪元素用于创建一些不在文档树中的元素，并为其添加样式。比如说，我们可以通过`:before`来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。

## 伪类

- 伪类前面是一个冒号，`E:first-child` 伪类，会对现有的元素进行筛选
    + `:link`
    + `:visited`
    + `:hover`
    + `:active`
    + `:focus`
    + `:not()`
    + `:first-child`
    + `:last-child`
    + `:nth-child`
    + `:nth-last-child` 从后面计数
    + `:only-child` 只满足一个子元素
    + `:target` 当URL带有锚名称，指向文档内某个具体的元素时，`:target`匹配该元素。
    + `:checked` 被选中的input元素
    + `:empty` 匹配没有子元素的元素
    + `:valid` 匹配条件验证正确的表单元素。


## 伪元素

- 伪元素前面是两个冒号，`E::first-line` 伪元素。会创造出不存在的新元素，由于 `css` 对单冒号的伪元素也支持，所以这样很容易让新学者混淆。但实际上现在 `css3` 已经明确规定了伪类单冒号，伪元素双冒号的规则。
    + `::before/:before` 在被选元素前插入内容
    + `::after/:after` 在被元素后插入内容，其用法和特性与`:before`相似。
    + `::first-letter/:first-letter` 匹配元素中文本的首字母。被修饰的首字母不在文档树中
    + `::first-line/:first-line` 匹配元素中第一行的文本。这个伪元素只能用在块元素中，不能用在内联元素中。
    + `::selection` 匹配用户被用户选中或者处于高亮状态的部分。在火狐浏览器使用时需要添加`-moz`前缀。该伪元素只支持双冒号的形式。
    + `::placeholder` 匹配占位符的文本，只有元素设置了`placeholder`属性时，该伪元素才能生效。
- 该伪元素不是`CSS`的标准，它的实现可能在将来会有所改变，所以要决定使用时必须谨慎。
在一些浏览器中（`IE10`和`Firefox18`及其以下版本）会使用单冒号的形式。
- 对于伪元素 `:before` 和 `:after` 而言，属性 `content` 是必须设置的，我们知道属性的值可以为字符串，也可以有其它形式，比如指向一张图片的 `URL:`

```
content: url('img/icon.png')
```

- 配合伪类使用
    + 伪元素 `:before` 还可以配合伪类使用，这里举经常与 `:before` 配合使用的伪类 `:hover` 为例：

```
.before:hover:before{content:'you before'; color:red;}
<div class="before"> me</div>
```

- 配合取值函数 `attr()` 使用

```
a::before{content: attr(title)}
<a href="https://blog.ihoey.com" title="梦魇小栈"></a>

效果
<a href="https://blog.ihoey.com" title="梦魇小栈">梦魇小栈</a>
```

## 总结

- 伪元素和伪类之所以这么容易混淆，是因为他们的效果类似而且写法相仿，但实际上 `css3` 为了区分两者，已经明确规定了伪类用一个冒号来表示，而伪元素则用两个冒号来表示。
- 伪类的效果可以通过添加一个实际的类来达到，而伪元素的效果则需要通过添加一个实际的元素才能达到，这也是为什么他们一个称为伪类，一个称为伪元素的原因。
