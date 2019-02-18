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

### Manifest

`Manifest` 是支持站点在主屏上创建图标的技术方案，并且定制 PWA 的启动画面的图标和颜色等，如下图：
