/*
 * @Author: ihoey
 * @Date: 2019-02-12 15:20:49
 * @Last Modified by: ihoey
 * @Last Modified time: 2019-02-12 19:00:43
 */

var cacheName = 'bs-0-1-0'
var apiCacheName = 'api-0-1-1'

var cacheFiles = [
  '/',
  '/css/main.css',
  '/js/src/set.js',
  '/js/src/utils.js',
  '/js/src/motion.js',
  '/js/src/bootstrap.js',
  '/images/cursor.ico',
  '/message.json',
  '/images/icons/icon_32.png',
  '/images/icons/icon_72.png',
  '/images/icons/icon_128.png',
  '/images/icons/icon_192.png',
  '/images/icons/icon_256.png',
  '/images/icons/icon_512.png'
]

// 监听install事件，安装完成后，进行文件缓存
self.addEventListener('install', (e) => {
  console.log('Service Worker 状态： install')
  var cacheOpenPromise = caches.open(cacheName).then((cache) => {
    return cache.addAll(cacheFiles)
  })
  e.waitUntil(cacheOpenPromise)
})

// 监听activate事件，激活后通过cache的key来判断是否更新cache中的静态资源
self.addEventListener('activate', (e) => {
  console.log('Service Worker 状态： activate')
  var cachePromise = caches.keys().then((keys) => {
    return Promise.all(keys.map((key) => {
      if (key !== cacheName && key !== apiCacheName) {
        return caches.delete(key)
      }
    }))
  })
  e.waitUntil(cachePromise)
  // 注意不能忽略这行代码，否则第一次加载会导致fetch事件不触发
  return self.clients.claim()
})

self.addEventListener('fetch', (e) => {
  // 需要缓存的xhr请求
  var cacheRequestUrls = [
    '/message.json'
  ]

  var fetchInitParam = {
    mode: 'cors'
  }

  var currentUrl = e.request.url
  console.log('现在正在请求：' + currentUrl)

  // 判断当前请求是否需要缓存
  var needCache = cacheRequestUrls.includes(currentUrl)

  if (needCache) {
    // 需要缓存
    // 使用fetch请求数据，并将请求结果clone一份缓存到cache
    // 此部分缓存后在browser中使用全局变量caches获取
    caches.open(apiCacheName).then((cache) => {
      return fetch(e.request, fetchInitParam).then((response) => {
        cache.put(e.request.url, response.clone())
        return response
      })
    })
  } else {
    // 不需要缓存，直接查询cache
    // 如果有cache则直接返回，否则通过fetch请求
    e.respondWith(
      caches.match(e.request).then((cache) => {
        return cache || fetch(e.request, fetchInitParam)
      }).catch((err) => {
        console.log(err)
        return fetch(e.request, fetchInitParam)
      })
    )
  }
})

/* ============== */
/* push处理相关部分 */
/* ============== */
// 添加service worker对push的监听

self.addEventListener('push', (e) => {
  var data = e.data
  if (e.data) {
    data = data.json()
    console.log('push的数据为：', data)
    self.registration.showNotification(data.text)
  } else {
    console.log('push没有任何数据')
  }
})

/* ============== */
