---
title: Hexo 博客美化代码块
tags:
  - hexo
categories:
  - Hexo
date: 2018-05-27 14:24:29
---

最近有人问我博客的代码块是怎么做的，如下面的代码块，然后好久没有写文章了，趁着周末有时间就水一篇吧~

```JavaScript
var arr = 'abcdaabc';

var info = arr
    .split('')
    .reduce((p, k) => (p[k]++ || (p[k] = 1), p), {});

console.log(info); //{ a: 3, b: 2, c: 2, d: 1 }

```

<!-- more -->

`hexo` 会有各种生命周期和事件，平时可能不会用到，但是能很好的利用的话，可以提高不少效率。比如文章多到一定程度之后，每次创建新文章都会被淹没在文件夹里面，在博客根目录下创建一个 `scripts` 文件夹，放一个 `events.js` 文件。这样每次通过` hexo new post` 创建新文章就会自动用 `code` 打开了~

```JavaScript
var exec = require('child_process').exec;

// new 后自动打开编辑器
hexo.on('new', function (data) {
  console.log('code ' + data.path);
  exec('code ' + data.path);
});
```

又或者是在 `hexo deploy` 之后想做一些事情的时候也可以用到

```JavaScript
try {
  hexo.on('deployAfter', function () { //当deploy完成后执行备份
    doSomething();
  });
} catch (e) {
  console.log("产生了一个错误<(￣3￣)> !，错误详情为：" + e.toString());
}
```

代码块也是利用了 `hexo` 的 `api`，是在主题目录下面的 `scripts` 文件夹，我创建了一个 `codeblock.js` 文件。监听 `after_post_render` 事件，(这个事件并不是每次都触发，`hexo` 会做缓存，在没有缓存的情况下才会执行。)通过事件回调替换文章渲染出来的内容。

```JavaScript
var attributes = [
  'autocomplete="off"',
  'autocorrect="off"',
  'autocapitalize="off"',
  'spellcheck="false"',
  'contenteditable="true"'
]

var attributesStr = attributes.join(' ')

hexo.extend.filter.register('after_post_render', function (data) {
  while (/<figure class="highlight ([a-zA-Z]+)">.*?<\/figure>/.test(data.content)) {
    data.content = data.content.replace(/<figure class="highlight ([a-zA-Z]+)">.*?<\/figure>/, function () {
      var language = RegExp.$1 || 'plain'
      var lastMatch = RegExp.lastMatch
      lastMatch = lastMatch.replace(/<figure class="highlight /, '<figure class="iseeu highlight /')
      return '<div class="highlight-wrap"' + attributesStr + 'data-rel="' + language.toUpperCase() + '">' + lastMatch + '</div>'
    })
  }
  return data
})
```

然后在 `highlight.js` 的基础上调整下样式，包裹上一层类 `mac Panel` 的效果。

在 `blog/themes/next/source/css/_custom` 目录下新建一个 `.styl` 的样式文件 ，文件内容如下

```css
.highlight-wrap[data-rel] {
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 10px 30px 0px rgba(0,0,0,0.4);
  margin: 35px 0;
  ::-webkit-scrollbar {
    height: 10px;
  }

  ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
  }
  &::before {
    color: white;
    content: attr(data-rel);
    height: 38px;
    line-height: 38px;
    background: #21252b;
    color: #fff;
    font-size: 16px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: bold;
    padding: 0px 80px;
    text-indent: 15px;
    float: left;
  }
  &::after {
    content: " ";
    position: absolute;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    background: #fc625d;
    width: 12px;
    height: 12px;
    top: 0;
    left: 20px;
    margin-top: 13px;
    -webkit-box-shadow: 20px 0px #fdbc40, 40px 0px #35cd4b;
    box-shadow: 20px 0px #fdbc40, 40px 0px #35cd4b;
    z-index: 3;
  }
}
```

然后在同目录 `custom.styl` 文件中引入新建的样式文件即可

最后修改主题的代码样式配置文件

```yml
highlight_theme: night eighties
```

OK，大功告成~
