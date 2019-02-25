---
title: 什么? 微信没有年度账单? 前端 nodejs 撸起来~ [接口实现]
tags:
  - Node
  - NodeJs
categories:
  - Node
date: 2019-01-18 14:24:29
---

最近逛掘金看见一片文章 [非官方统计 2018 微信年度账单实现](https://juejin.im/post/5c383aa66fb9a049e412e9f3),作者利用调试微信获取到了 `2018` 年的所有消费明细，并根据类型进行分类统计，作文一个前端，便萌生了用 `nodejs` 实现一遍的想法，于是乎呢，就有了这篇文章了。

<!--more-->

由于 `@hibear` 大佬是用 `Java` 实现的，并且自己又不会 `Java`，所以呢里面很多东西确实看不太懂，然后就根据核心代码撸吧。

好了，废话不多说，我们直接开始吧~

首先初始化一个项目吧，按自己的习惯，配置下需要的东西

大概配置完是这些文件

```yml
.editorconfig
.gitignore
config.js
init/
package.json
README.md
src/
util/
yarn.lock
```

然后我们来写个接口；

我们这里选 `koa` 框架吧，毕竟自己还是蛮喜欢的~

```JavaScript
// Koa 框架
const Koa = require('koa')
// 实例化
const app = new Koa()
// 监听端口
app.listen(config.port)
console.log(`the server is start at port ${config.port}`)
```

然后我们来添加路由

```JavaScript
// index.js
const Koa = require('koa')
const KoaRouter = require('koa-router')

const app = new Koa()
// 创建 router 实例对象
const router = new KoaRouter()

//注册路由
router.get('/', async ctx => {
  ctx.body = 'welcome~'
})

// 添加路由中间件
app.use(router.routes())

// 对请求进行一些限制处理
app.use(router.allowedMethods())

// 监听启动端口
app.listen(config.port)
console.log(`the server is start at port ${config.port}`)

```

完整入口文件

```JavaScript
// index.js
const Koa = require('koa')
const KoaRouter = require('koa-router')
const bodyParser = require('koa-bodyparser')
const config = require('../config')

const app = new Koa()
// 创建 router 实例对象
const router = new KoaRouter()
// 账单获取核心逻辑
const wechatBill = require('./controllers/wechatBill')

// 配置ctx.body解析中间件
app.use(bodyParser())

//注册路由
router.get('/', async ctx => {
  ctx.body = 'welcome~'
})

router.post('/wechatBill', wechatBill)

// 添加路由中间件
app.use(router.routes())

// 对请求进行一些限制处理
app.use(router.allowedMethods())

// 监听启动端口
app.listen(config.port)
console.log(`the server is start at port ${config.port}`)

```

好了，路由写完了，我们来看核心逻辑怎么写，根据大佬的思路是模拟微信的请求，带上必要的参数就好了，这里我们使用最熟悉的 `axios` 吧。

由于代码太多这里就贴出核心的部分吧，完整版可以看下 `github` 的文件，请点击传送门-> [传送门](https://github.com/ihoey/node-wechat-bill/blob/master/src/controllers/wechatBill.js)

```JavaScript
while (Loop) {

    if (lastResp.last_create_time < 1514736000) {
      wechatList.splice(wechatList.indexOf(wechat_id) >>> 0, 1)
      Loop = false
      console.log('任务处理完毕，2018全部数据已存入');
    }

    axios.request({
      url: `https://wx.tenpay.com/userroll/userrolllist`,
      method: 'get',
      headers: {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "zh-CN,en-US;q=0.8",
        "Connection": "keep-alive",
        "Cookie": `userroll_encryption=${userroll_encryption}; userroll_pass_ticket=${userroll_pass_ticket}`,
        "Host": "wx.tenpay.com",
        "Q-Auth": AUTH,
        "Q-GUID": GUID,
        "Q-UA2": UA2,
        "Referer": "https://wx.tenpay.com/?classify_type=0",
        "User-Agent": "Mozilla/5.0 (Linux; Android 8.0; MIX 2 Build/OPR1.170623.027; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044408 Mobile Safari/537.36 MMWEBID/4508 MicroMessenger/7.0.1380(0x27000038) Process/tools NetType/WIFI Language/zh_CN",
        "X-DevTools-Emulate-Network-Conditions-Client-Id": ClientId,
        "X-Requested-With": "com.tencent.mm",
      },
      params: {
        classify_type: 0,
        count: PAGE_SIZE,
        exportkey,
        last_bill_id: lastResp.last_bill_id,
        last_bill_type: lastResp.last_bill_type,
        last_create_time: lastResp.last_create_time,
        last_trans_id: lastResp.last_trans_id,
        sort_type: 1,
        start_time: lastResp.start_time,
      }

    }).then((res) => {

      lastResp = res.data

      if (!lastResp || lastResp.ret_code != 0 || !lastResp.record) {
        console.log(lastResp);
        Loop = false
        ctx.body = {
          code: 2,
          res: lastResp.ret_msg || '任务请求失败'
        }
        throw new Error(`任务请求失败`)
      }

      ctx.body = {
        code: 0,
        res: '创建任务成功，正在获取账单中...'
      }

      const dataList = res.data.record.map(e => ({ wechat_id, ...e }))
      dataList.map(async e => {
        delete e.coupon
        const sql = `INSERT INTO orders(${Object.keys(e)}) VALUES (${JSON.stringify(Object.values(e))})`
        const data = await query(sql.replace(/\[|\]/g, ""))
        console.log(`存入成功`, data.insertId)
      })

    }).catch((err) => {
      console.log(err)
    });
    await sleep(1000)
  }
```

好了，具体的代码可以看下 `github` 的参考~
-> [传送门](https://github.com/ihoey/node-wechat-bill)
