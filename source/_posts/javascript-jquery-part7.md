---
title: JQuery分析及实现part7之 Ajax 模块功能及实现
date: 2016-11-25 21:31:12
tags:
  - 原生Js
  - Js框架
  - JQuery
categories: javascript
---

JQuery模块分析及其实现第七部分 Ajax 部分功能及实现,接第六部分!

<!-- more -->

## Ajax 请求流程

1. 创建一个请求对象

```js
function createRequest() {
	return window.XMLHttpRequest ? new window.XMLHttpRequest() :
		new ActiveXObject('Microsoft.XMLHTTP');
}

var xhr = createRequest();
console.log(xhr);
```

2. 格式化数据
	* 将格式化后的数据,参数与值都要重新编码

```js
function formatData(data){
    var ret = [];
    for(var k in data){
        ret.push(window.encodeURIComponent(k) + '=' + window.encodeURIComponent(data[k]));
    }
		// 如果不想从服务器缓存中读取数据
	ret.push(('_=' + Math.random()).replace('.', ''));
    return ret.join('&');
}
var data = {name: '梦魇小栈',age: 2,url:'http://blog.ihoey.com'};
console.log(formatData(data));//name=%E6%A2%A6%E9%AD%87%E5%B0%8F%E6%A0%88&age=2&url=http%3A%2F%2Fblog.ihoey.com
```

3. 与服务器建立连接
4. 监听请求状态
5. 发送请求
6. 封装

```js
<script>
	// 默认配置信息
	ajaxSetting = {
		url: '',
		type: 'GET',
		dataType: 'text',
		contentType: 'application/x-www-form-urlencoded',
		data: null,
		async: true,
		success: null,
		fail: null
	};

	function createRequest() {
		return window.XMLHttpRequest ? new window.XMLHttpRequest() :
			new ActiveXObject('Microsoft.XMLHTTP');
	}

	function formatData(data) {
		var ret = [];
		for(var k in data){
			ret.push(window.encodeURIComponent(k) + '=' + window.encodeURIComponent(data[k]));
		}
		// 如果不想从服务器缓存中读取数据
		ret.push(('_=' + Math.random()).replace('.', ''));
		return ret.join('&');
	}

	function ajax(config) {
		var context = {},
			xhr,
			postData = '';
		// 过滤无效参数
		if(!config || !config.url) {
			console.warn("参数异常");
			return;
		}
		// debugger;
		// 获取默认配置信息
		itcast.extend(ajaxSetting, context);
		// 用户的配置覆盖默认配置
		itcast.extend(config, context);
		// 1: 创建请求对象
		xhr = createRequest();
		// 2：格式化数据
		if(context.data){
			postData = formatData(context.data);
		}
		// 3：与服务器建立连接
		if(context.type.toUpperCase() === 'GET'){
			xhr.open('GET', context.url + '?' + postData, context.async);
			postData = null;
		} else {
			// 模拟表单提交，设置请求头信息
			xhr.setRequestHeader('Content-Type', context.contentType);
			xhr.open('POST', context.url, context.async);
		}
		// 4：监听请求状态
		xhr.onreadystatechange = function() {
			if(xhr.readyState === 4){
				if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304){
					// 获取到请求回来的数据
					var text = xhr.responseText;
					// 如果指定的数据格式为 json，那就将其转换为json对象
					text = context.dataType.toLowerCase() === 'json' ?
						JSON.parse(text) : text;

					context.success && context.success(text);
				} else {
					context.fail && context.fail({"errorCode": xhr.status, "message": "请求超时."});
				}
			}
		};
		// 5: 发送请求
		xhr.send(postData);
		// context.success && context.success(JSON.parse(xhr.responseText));
	}
</script>
<script>
	ajax({
		url: 'data.json',
		dataType: 'json',
		async: false,
		success: function(data) {
			document.getElementById('content').innerHTML= '<p>' + data.username + '</p>' +
					'<p>' + data.age + '</p>';
		},
		fail: function(er) {
			console.log(er.errorCode);
		}
	});
</script>
```
## Jsonp 请求

1. 跨域 只能发送 `GET` 请求 . 一种不安全的请求方式
2. 原理:由于 `dom` 元素的 `src` 属性,具有跨域功能. 在实现跨域请求时,为了方便就使用 `script` 标签来做.
3. 流程
	* 创建请求对象,就是创建一个 `script` 标签
	* 将上述创建的 `script` 标签添加到页面的 `head` 标签下
	* 格式化数据
	* 创建全局回调函数
	* 设置超时时间,如果超过此时间,也没有得到数据,表示请求失败.否则,请求成功
	* 发送请求: 指定 `script` 标签的 `src` 属性值


