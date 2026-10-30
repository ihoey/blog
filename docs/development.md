# 开发与写作

日常目录为 `/Users/ihoey/personal/project/blog`，使用 main。Node 版本见 `.nvmrc`，pnpm 版本见 package.json 的 packageManager；不要求本机必须使用 nvm。

## 命令

```sh
pnpm install --frozen-lockfile
pnpm dev --port 4321
```

访问 http://127.0.0.1:4321/。开发服务可能后台运行，用 `pnpm exec astro dev status` / `pnpm exec astro dev stop` 管理。

```sh
pnpm validate
pnpm preview --port 4336
```

validate 依次做格式、类型、测试、构建和产物验证；preview 读取刚生成的 dist。开发与预览不要占用同一端口，也不要同时运行内容同步 / 构建与开发服务。本地命令不发布，发布见[部署说明](deployment.md)。

构建必须使用 `pnpm build`：其中包含强制内容同步及字体子集优化，不以 astro build 替代。首次字体压缩可能需数分钟，后续使用 `.astro/reading-font-cache/`；完整字体 fallback 支持评论等动态文字。verify 核对字体覆盖、轮廓和字宽。

修改高亮或渲染插件后若 dev 仍显示旧结果，先停服务再重启。仍未刷新时，将 `.astro/data-store.json` 移到 work 备份后重启；不改源文章来清缓存。普通格式检查用 `pnpm format:check`，需要格式化时用 `pnpm format`；均排除 source 正文、静态 SDK 和基线数据。

## 写文章

在 source/_posts/ 新建 Markdown，文件名成为 slug。示例：

```yaml
---
title: 新文章的标题
date: "2026-10-30T20:00:00+08:00"
tags: [javascript]
categories: [javascript]
description: 可选的简短摘要。
draft: true
---
```

- 日期加引号并带时区，也支持上海本地时间字符串；不要使用文件 mtime。draft 改为 false 或删除后才公开。
- description 供首页纯文本摘要、搜索 / 分享、结构化数据和 Atom summary 共用；不填则取开头摘要，为空回退到标题。未填写时首页保留现有富文本预览，无需补写旧文。
- 实质更新时可填 `updated: "2026-11-01T20:00:00+08:00"`，不得早于发表时间；未填则沿用历史映射，新文章等于发布日期。可见日期、JSON-LD、Atom 和 sitemap 共用该值，不随部署刷新。
- 可选 `image: /images/your-cover.webp` 应指向真实相关配图。无图时分享卡片沿用头像，文章 JSON-LD 不把头像当配图。
- categories 数组表示分类层级；保留旧文章的大小写、多级路径及 .html 地址，不因整理目录改链接。
- 正文标记见[写作样式](reading-marks.md)。有意修改旧文章时，在 tests/fixtures/source-edits.json 记录理由和 SHA-256，不覆盖独立迁移基线。

## 工程入口

| 位置 | 用途 |
| --- | --- |
| source/_posts/；source/about、links、guestbook/ | 原文章、独立页和友链数据 |
| src/content.config.ts；src/lib/posts.ts、listings.ts | 字段约束、文章、分类标签、分页 |
| src/data/site.ts | 共用站点资料，description 为简介，motto 为寄语 |
| src/data/legacy-posts.json；tests/fixtures/ | 运行时旧地址映射；独立校验基线和修订清单 |
| src/layouts/Base.astro；src/components/ | 页面框架、头尾与组件 |
| src/styles/global.css、site.css 及 site/ 模块 | 基础规则与按既有级联顺序加载的样式，导航规则集中在 navigation.css |
| src/pages/；src/lib/seo.mjs | 页面、Atom / sitemap；标题与结构化数据 |
| static/ | 随站发布的图片、SDK、授权文件及 SW 退役脚本 |
| dist/；work/ | 生成产物；本地报告与缓存，均不手工当源码维护 |

metadata 沿用文章标题 / 描述，分页标题带页码，400 / 404 noindex；结构化数据按首页 / 文章 / 关于页输出。Atom 保留 20 篇全文，HTML 转义是协议内容；Vercel 的 /atom.xml MIME 配置在 static/vercel.json。verify 检查 canonical、描述、日期与订阅 / sitemap 一致性；正式响应和搜索收录另行核实。

SVG 图标用 `src/components/Icon.astro`，例如 `<Icon name="calendar" />`；扩展时同步 src/assets/ui-icons.svg 的 symbol 和组件类型，保留 static/icons/ 授权。不重新引入整套图标字体。

图片显示版本由 src/data/optimized-images.json 映射，原图链接保留。重生成用 `python3 scripts/optimize-images.py`（需 cwebp），源图缓存写入 work/image-originals，结果进入 static；未知图片、二维码和已有 srcset 不自动替换。

正式域名才加载统计及可写评论，本地不发真实评论、点赞、邮件或支付；SDK 升级见[评论说明](hitalk.md)。旧 Service Worker 的退役文件必须保留在 /sw.js，不能因不再使用离线功能就删除。
