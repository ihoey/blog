/*
 * @Author: ihoey
 * @Date: 2019-02-12 15:20:49
 * @Last Modified by: ihoey
 * @Last Modified time: 2019-02-13 15:53:28
 */

var cacheName = 'bs-0-0-1'
var apiCacheName = 'api-0-1-1'

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

// 监听install事件，安装完成后，进行文件缓存
self.addEventListener('install', (e) => {
  console.log('sw: install')

  e.waitUntil(caches.open(cacheName)
    .then((cache) => {
      console.log('Opened cache')
      return cache.addAll(cacheFiles)
    })
    .then(() => self.skipWaiting()))
})

// 监听activate事件，激活后通过cache的key来判断是否更新cache中的静态资源
self.addEventListener('activate', (e) => {
  console.log('sw: activate')

  e.waitUntil(
    caches.keys()
    .then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== cacheName && key !== apiCacheName) {
            return caches.delete(key)
          }
        })
      )
    })
    // 注意不能忽略这行代码，否则第一次加载会导致fetch事件不触发
    .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (e) => {
  var currentUrl = e.request.url

  // 只处理同源
  if (new URL(currentUrl).hostname != location.hostname) {
    return
  }

  // 需要缓存的xhr请求
  var cacheRequestUrls = [
    '/message.json',
    '/manifest.json'
  ]

  // 判断当前请求是否需要缓存
  var needCache = cacheRequestUrls.includes(new URL(currentUrl).pathname)

  if (needCache) {
    // 需要缓存
    // 使用fetch请求数据，并将请求结果clone一份缓存到cache
    // 此部分缓存后在browser中使用全局变量caches获取
    caches.open(apiCacheName).then((cache) => {
      return fetch(e.request).then((response) => {
        cache.put(e.request.url, response.clone())
        return response
      })
    })
  } else {
    // 不需要缓存，直接查询cache
    // 如果有cache则直接返回，否则通过fetch请求
    e.respondWith(
      caches.match(e.request)
      .then((cache) => {
        return cache || fetch(e.request)
      })
      .catch((err) => {
        console.log('respondWithErr:', err)
        return fetch(e.request)
      })
    )
  }
})

self.addEventListener('error', event => {
  // 上报错误信息
  // 常用的属性：
  // event.message
  // event.filename
  // event.lineno
  // event.colno
  // event.error.stack
})
self.addEventListener('unhandledrejection', event => {
  // 上报错误信息
  // 常用的属性：
  // event.reason
})

// 监听推送事件 然后显示通知
self.addEventListener('push', (e) => {
  console.log('sw: push', e.data.text())

  var title = '梦魇小栈通知'
  var options = {
    body: e.data.text(),
    icon: '/images/icons/icon_72.png',
    badge: '/images/icons/icon_72.png'
  }

  e.waitUntil(self.registration.showNotification(title, options))
})

// 监听通知的点击事件
self.addEventListener('notificationclick', (e) => {
  e.notification.close()
  event.waitUntil(
    clients.openWindow('https://blog.ihoey.com')
  )
})
