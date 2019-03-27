---
title: 将你的博客升级为 PWA 渐进式Web离线应用
date: 2019-2-18 19:30:21
tags:
  - javascript
  - PWA
categories:
  - javascript
  - PWA
---

## 什么是 PWA

`PWA` 全称 `Progressive Web Apps`(渐进式 `Web` 应用程序)，旨在使用现有的 `Web` 技术提供用户更优的使用体验。
基本要求

- `可靠（Reliable）` 一方面是指 `PWA` 的安全性，`PWA` 只能运行在 `HTTPS` 上；另一方面是指在网络不稳定或者没网情况下，`PWA` 依然可以访问。
- `快速响应（Fast）` 快速响应用户的交互行为，并且具有平滑流畅的动画、加载速度、渲染速度和渲染性能等。
- `粘性(Engaging)` 通过添加到桌面以及离线消息推送，能带来用户的第二次访问，并且依靠良好的用户体验吸引用户再次访问。

官网链接：[Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/)

<!-- more -->

## PWA 的核心技术

`PWA` 不是一项单独的技术，技术包括 `Manifest`、`Service Worker`、`Push API` & `Notification API` 、`App Shell` & `App Skeleton` 等等技术，接下来我们重点介绍几项技术以及相关问题的解决方法。

### manifest

`manifest` 是支持站点在主屏上创建图标的技术方案，并且定制 PWA 的启动画面的图标和颜色等，如下图：

> ![](https://cdn.dode.top/blog/PWA.png?imageView2/0/format/png/q/32|imageslim)
> chrome > 桌面图标 > 启动样式 > 打开效果

#### `manifest` 内容

```json
{
  "name": "梦魇小栈-专注于分享",
  "short_name": "梦魇小栈",
  "description": "心，若没有栖息的地方，到哪里都是流浪......",
  "start_url": "/",
  "display": "standalone",
  "orientation": "any",
  "background_color": "#ffffff",
  "theme_color": "#8a00f9",
  "icons": [
    {
      "src": "images/icons/icon_32.png",
      "sizes": "32x32",
      "type": "image/png"
    },
    {
      "src": "images/icons/icon_72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "images/icons/icon_128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "images/icons/icon_144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "images/icons/icon_192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "images/icons/icon_256.png",
      "sizes": "256x256",
      "type": "image/png"
    },
    {
      "src": "images/icons/icon_512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

#### `manifest` 属性

- `name` — 网页显示给用户的完整名称;
- `short_name` — 这是为了在没有足够空间显示 `Web` 应用程序的全名时使用;
- `description` — 关于网站的详细描述;
- `start_url` — 网页的初始相对 `URL` 比如 `/`）
- `display` — 应用程序的首选显示模式;
  - `fullscreen` - 全屏显示;
  - `standalone` - 应用程序将看起来像一个独立的应用程序;
  - `minimal-ui` - 应用程序将看起来像一个独立的应用程序，但会有浏览器地址栏;
  - `browser` - 该应用程序在传统的浏览器标签或新窗口中打开.
- `orientation` — 应用程序的首选显示方向;
  - `any`
  - `natural`
  - `landscape`
  - `landscape-primary`
  - `landscape-secondary`
  - `portrait`
  - `portrait-primary`
  - `portrait-secondary`
- `background_color` — 启动屏的背景颜色;
- `theme_color` — 网站的主题颜色;
- `icons` — 定义了 `src`、`sizes` 和 `type` 的图片对象数组,各种环境中用作应用程序图标的图像对象数组.

> `MDN` 提供了完整的 `manifest` 属性列表: [Web App Manifest properties](https://developer.mozilla.org/zh-CN/docs/Web/Manifest)

#### manifest 使用

> `manifest` 功能虽然强大，但是技术上并不难，就是一个外链的 `json` 文件，通过 `link` 来引入：

```html
<!-- 在 html 页面中添加以下 link 标签 -->
<link rel="manifest" href="/manifest.json" />
```

#### manifest 验证

> 在开发者工具中的 Application Tab 左边有 Manifest 选项，你可以验证你的 manifest JSON 文件，并提供了 "Add to homescreen" .

![](https://cdn.dode.top/blog/Ihoey_2019-02-19_14-39-39.png?imageView2/0/format/png/q/75|imageslim)

### Service Worker

`Service Worker` 是 `PWA` 中最重要的概念之一，它是一个特殊的 `Web Worker`，独立于浏览器的主线程运行，特殊在它可以拦截用户的网络请求，并且操作缓存，还支持 `Push` 和后台同步等功能。

#### 注册服务

在 `install Service Worker` 之前，要在主进程 `JavaScript` 代码里面注册它，注册是为了告诉浏览器我们的 `Service Worker` 文件是哪个，然后在后台，`Service Worker` 就开始安装激活。

```javascript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(() => {
      console.log('注册成功!')
    })
  })
}
```

> 注册时，还可以指定可选参数 scope，scope 是 Service Worker 可以以访问到的作用域，或者说是目录。

```javascript
navigator.serviceWorker.register('/sw.js', {
  scope: '/app/'
})
```

注册成功后，您可以通过转至 `chrome://inspect/#service-workers` 并寻找您的网站来检查 `Service Worker` 是否已启用。

![](https://cdn.dode.top/blog/Ihoey_2019-02-19_15-28-33.png?imageView2/0/format/png/q/90|imageslim)

#### 安装 Service Worker 服务

`install` 事件绑定在 `Service Worker` 文件中，当安装成功后，`install` 事件就会被触发。
一般我们会在 `install` 事件里面进行缓存的处理，用到之前提到的 `Cahce API`，它是一个 `Service Worker` 上的全局对象，可以缓存网络相应的资源，并根据他们的请求生成 `key`，这个 `API` 和浏览器标准的缓存工作原理相似，但是只是针对自己的 `scope` 域的，缓存会一直存在，知道手动清楚或者刷新。

```javascript
const cacheName = 'bs-0-0-1' // 缓存名称
const cacheFiles = ['/', '/favicon.ico', '/images/icons/icon_32.png', '...'] // 需缓存的文件

// 监听 install 事件，安装完成后，进行文件缓存
self.addEventListener('install', e => {
  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('Opened cache')
        return cache.addAll(cacheFiles)
      })
      .then(() => self.skipWaiting())
  )
})

// e.waitUntil 确保 Service Worker 不会在 e.waitUntil() 执行完成之前安装完成。
// caches.open(cacheName) 创建一个 cacheName 的新缓存，返回一个缓存的 promise 对象，当它 resolved 时候，我们在 then 方法里面用 caches.addAll 来添加想要缓存的列表，列表是一个数组，里面的 URL 是相对于 origin 的。
// self.skipWaiting() 跳过 waiting 状态，下面更新第3条~
```

#### 更新 Service Worker 服务

当你的 `Service Worker` 需要更新时， 需要经过以下步骤

1. 更新您的服务工作线程 `JavaScript` 文件。 用户导航至您的站点时，浏览器会尝试在后台重新下载定义 `Service Worker` 的脚本文件。 如果 `Service Worker` 文件与其当前所用文件存在字节差异，则将其视为*新 Service Worker*。
2. 新 `Service Worker` 将会启动，且将会触发 `install` 事件。
3. 此时，旧 `Service Worker` 仍控制着当前页面，因此新 `Service Worker` 将进入 `waiting` 状态。
4. 当网站上打开的页面关闭时，旧 `Service Worker` 将会被终止，新 `Service Worker` 将会取得控制权。
5. 新 `Service Worker` 取得控制权后，将会触发其 `activate` 事件。

> 如果希望在有了新版本时，所有的页面都得到及时自动更新怎么办呢？可以在 install 事件中执行 self.skipWaiting() 方法跳过 waiting 状态，然后会直接进入 activate 阶段。接着在 activate 事件发生时，通过执行 self.clients.claim() 方法，更新所有客户端上的 Service Worker。

当 `Service Worker` 安装完成后并进入激活状态，会触发 `activate` 事件。通过监听 `activate` 事件你可以做一些预处理，如对旧版本的更新、对无用缓存的清理等。

```javascript
// 监听 activate 事件，激活后通过cache的key来判断是否更新、删除 cache 中的静态资源
self.addEventListener('activate', e => {
  console.log('sw: activate')

  e.waitUntil(
    caches
      .keys()
      .then(keys => {
        return Promise.all(
          keys.map(key => {
            if (key !== cacheName && key !== apiCacheName) {
              return caches.delete(key)
            }
          })
        )
      })
      .then(() => self.clients.claim()) // 更新客户端
  )
})
```

#### 处理动态请求缓存

在 `Service Worker` 的作用域中，当有网络请求时发生时，`fetch` 事件将被触发。它调用 `respondWith()` 方法来劫持网络请求缓存并返回：

```javascript
var apiCacheName = 'api-0-1-1'
self.addEventListener('fetch', e => {
  var currentUrl = e.request.url

  // 只处理同源
  if (new URL(currentUrl).hostname != location.hostname) {
    return
  }

  // 需要缓存的 xhr 请求
  var cacheRequestUrls = ['/message.json', '/manifest.json']

  // 判断当前请求是否需要缓存
  var needCache = cacheRequestUrls.includes(new URL(currentUrl).pathname)

  if (needCache) {
    // 需要缓存
    // 使用 fetch 请求数据，并将请求结果 clone 一份缓存到 cache
    // 此部分缓存后在 browser 中使用全局变量 caches 获取
    caches.open(apiCacheName).then(cache => {
      return fetch(e.request).then(response => {
        cache.put(e.request.url, response.clone())
        return response
      })
    })
  } else {
    // 不需要缓存，直接查询 cache
    // 如果有 cache 则直接返回，否则通过 fetch 请求
    e.respondWith(
      caches
        .match(e.request)
        .then(cache => {
          return cache || fetch(e.request)
        })
        .catch(err => {
          console.log('respondWithErr:', err)
          return fetch(e.request)
        })
    )
  }
})
```

到这里，离线缓存动静态资源就完成了。

![](https://cdn.dode.top/blog/Ihoey_2019-02-19_19-06-44.png?imageView2/0/format/png/q/90|imageslim)

## 使用 Lighthouse 测试我们的应用

至此，我们完成了 `PWA` 的两大基本功能：`Web App Manifest` 和 `Service Worker` 的离线缓存。这两大功能可以很好地提升用户体验与应用性能。我们用 `Chrome` 中的 `Lighthouse` 来检测一下目前的应用：
![](https://cdn.dode.top/blog/Ihoey_2019-02-18_19-47-05.png?imageView2/0/format/png/q/90|imageslim)

可以看到，在 `PWA` 评分上，我们的这个 `WebApp` 已经非常不错了。

完整代码 -> [梦魇小栈 PWA 完整代码](https://blog.ihoey.com/sw.js)

```javascript
var cacheName = 'bs-0-0-2'
var apiCacheName = 'api-0-0-2'

var cacheFiles = [
  '/',
  '/favicon.ico?v=6.2.0',
  '/css/main.css?v=6.2.0',
  '/js/src/set.js',
  '/js/src/utils.js',
  '/js/src/motion.js',
  '/js/src/bootstrap.js',
  '/images/cursor.ico',
  '/images/icons/icon_32.png',
  '/images/icons/icon_72.png',
  '/images/icons/icon_128.png',
  '/images/icons/icon_192.png',
  '/images/icons/icon_256.png',
  '/images/icons/icon_512.png'
]

// 监听 install 事件，安装完成后，进行文件缓存
self.addEventListener('install', e => {
  console.log('sw: install')

  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('Opened cache')
        return cache.addAll(cacheFiles)
      })
      .then(() => self.skipWaiting())
  )
})

// 监听 activate 事件，激活后通过 cache 的 key 来判断是否更新 cache 中的静态资源
self.addEventListener('activate', e => {
  console.log('sw: activate')

  e.waitUntil(
    caches
      .keys()
      .then(keys => {
        return Promise.all(
          keys.map(key => {
            if (key !== cacheName && key !== apiCacheName) {
              return caches.delete(key)
            }
          })
        )
      })
      // 更新客户端
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', e => {
  var currentUrl = e.request.url

  // 只处理同源
  if (new URL(currentUrl).hostname != location.hostname) {
    return
  }

  // 需要缓存的 xhr 请求
  var cacheRequestUrls = ['/message.json', '/manifest.json']

  // 判断当前请求是否需要缓存
  var needCache = cacheRequestUrls.includes(new URL(currentUrl).pathname)

  if (needCache) {
    // 需要缓存
    // 使用 fetch 请求数据，并将请求结果 clone 一份缓存到 cache
    // 此部分缓存后在 browser 中使用全局变量 caches 获取
    caches.open(apiCacheName).then(cache => {
      return fetch(e.request).then(response => {
        cache.put(e.request.url, response.clone())
        return response
      })
    })
  } else {
    // 不需要缓存，直接查询 cache
    // 如果有 cache 则直接返回，否则通过 fetch 请求
    e.respondWith(
      caches
        .match(new URL(currentUrl).pathname)
        .then(cache => {
          return cache || fetch(e.request)
        })
        .catch(err => {
          console.log('respondWithErr:', err)
          return fetch(e.request)
        })
    )
  }
})
```

由于现在博客仅需 `Manifest`、`Service Worker` 后面的技术、`Push API` & `Notification API` 、`App Shell` & `App Skeleton` 等打算以后有时间在考虑场景加上~
