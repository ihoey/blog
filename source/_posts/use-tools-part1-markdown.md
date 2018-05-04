---
title: 工具使用篇之Markdown
date: 2016-11-27 10:35:12
tags:
  - Markdown语法规范
  - tools
categories: Markdown
---

## Markdown 介绍

- *Markdown* 是一个 **轻量级  高效率** 的标记语言
- 轻量级标记语言，`2004` 年被 `John Gruber` 创造， 它允许人们“使用易读易写的纯文本格式编写文档”， Markdown 最重要的设计就是可读性， Markdown 可以选择性的转换为 `HTML` 文档格式， 很多网站目前都使用了 `Markdown` 或者其变种，例如 `Github` 、简书等大型社区。

<!--more-->

## Markdown 使用场景

- 学习笔记
- 演讲稿
- 写书（侧重于技术相关的 内容非常适合）
- 个人笔记
- 文章博客
- 教学讲义
- 说明文档
- 电子邮件


## Markdown 实时预览编辑器

- dillinger
- 马克飞象
- 简书
- MarkdownPad
- Sublime Text
    * 配合 Markdown Preview 插件
- Webstorm
    * 配合插件
- gitbook

实时预览工具只是为了达到所见即所得的效果而已， 适合初学者学习 `Markdown` ， 我们真正在进行写作的时候，其实是不需要实时预览的， 因为 Markdown 标记语言本身已经足够清晰了。

## Markdown 安装和配置编写预览环境(sublime)

- 按下键 `Ctrl+Shift+p` 调出命令面板，找到 `Package Control: install Pakage` 这一项。搜索 `markdown preview` ，点击安装。
- `Markdown Preview` 较常用的功能是 `preview in browser` 和 `Export HTML in Sublime Text` ，前者可以在浏览器看到预览效果，后者可将 `markdown` 保存为 `html` 文件。
- `preview in browser` 据称是实时的，但是实践上还是需要在 `st` 保存，然后浏览器刷新才能看到新的效果，好在 `markdown` 写得多的话也不需要每敲一行看一次效果。

### Webstorm

- 打开` webstorm` ，`File-->Setting-->输入plugin-->Install JetBrains plugin...-->输入markdown-->`点击右边的 `Install` ,安装完，重启 `webstorm`。

### Visual Studio Code

- `Visual Studio Code` 自带 `markdown` 预览,所以不需要安装插件,不过可以安装语法高亮主题

### Sublime

- MarkdownEditing 主题、自动补齐等功能
- MarkdownPreview 在浏览器预览
- MarkdownTOC 自动生成导航
- Table Editor 自动表格编辑
- [packagecontrol](https://packagecontrol.io/) Sublime 的插件生态系统网站

只要有写作的地方，都可以使用 `Markdown` 来书写。

## Markdown 标题书写

```Markdown
# 一级标题
## 二级标题
### 三级标题
...
###### 六级标签
一共六级标题
```

## Markdown 列表书写语法

### 无序列表

- 一级列表建议使用 `-`
    + 二级列表建议使用 `+`
        * 三级列表建议使用 `*`

```Markdown
- 一级标题
    + 二级标题
        * 三级列表
```

### 有序列表

1. 有序列表直接使用序列加一个点开头, 然后加一个
2. 有序列表嵌套无序列表
  - 有序列表中嵌套无需列表
        + 有序列表中嵌套无需列表

```Markdown
2. 有序列表嵌套无序列表
  - 有序列表嵌套无序列表
        + 有序列表嵌套无序列表
```

3. 有序列表嵌套有序列表
    1. 有序列表嵌套有序列表
        1. 有序列表嵌套有序列表

```Markdown
3. 有序列表嵌套有序列表
    1. 有序列表嵌套有序列表
        1. 有序列表嵌套有序列表
```

#### 使用建议

无论是有序列表还是无序列表,如果就写一级列表不嵌套就可以紧凑写到一起即可,如果嵌套多级列表最好在列表项之间只用空行隔开

## Markdown 图片链接书写语法

### Markdown 图片书写语法

- `![图片](http://blog.ihoey.com/img/img.jpg)`

### Markdown 链接书写语法

- `[链接](http://blog.ihoey.com)`

## 引用

- `> 例如这样`

> 例如这样

## 粗体与斜体

- `Markdown` 的粗体和斜体也非常简单，用两个 `*` 包含一段文本就是粗体的语法，用一个 `*` 包含一段文本就是斜体的语法

```Markdown
**这里是粗体**
*这里是斜体*
```

## 表格

```Markdown
| 表头           | 表头            | 表头   |
| :------------- | :-------------: | -----: |
| 左对齐         | 居中对齐        | 右对齐 |
| 左对齐         | 居中对齐        | 右对齐 |
| 左对齐         | 居中对齐        | 右对齐 |
```

| 表头           | 表头            | 表头   |
| :------------- | :-------------: | -----: |
| 左对齐         | 居中对齐        | 右对齐 |
| 左对齐         | 居中对齐        | 右对齐 |
| 左对齐         | 居中对齐        | 右对齐 |

## 代码框

由三个 \` 反引号包裹, 行内代码在代码前后加一个 \` 反引号

## 锚点

```Markdown
## 0. 目录{#index}
跳转到[目录](#index)
```

## 分隔线

```Markdown
* * *
***
*****
- - -
---------------------------------------
```

显示效果都一样：

***
