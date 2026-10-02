# Astro 开发与预览

工作目录：`/Users/ihoey/personal/project/blog-astro`

分支：`feat/astro-migration`

## 常用命令

使用 Node 22.23.2（见 `.nvmrc`）和 pnpm 10.28.2：

```sh
pnpm install --frozen-lockfile
pnpm dev --port 4321
```

Astro 7 的开发服务可能以后台进程运行。使用 `pnpm exec astro dev status` 查看，`pnpm exec astro dev stop` 停止。

`pnpm dev` / `pnpm start` 带 `--force`，启动时刷新内容缓存，避免文章沿用旧的 Markdown 高亮结果。修改高亮主题或渲染插件后若页面未更新，先停止开发服务，再用原端口重新启动，例如 `pnpm dev --port 4322`；单独刷新浏览器无法清除服务端内容缓存。

2026-10-02 补充：本机 Astro 7 的开发缓存位于 `.astro/data-store.json`，而 sync / build 使用 `node_modules/.astro/data-store.json`。如果 `sync --force` 后 dev 仍输出旧 Markdown，先停止 dev，将 `.astro/data-store.json` 移到 `work/` 备份，再启动 dev 重建缓存；只处理该生成文件，不改正文。

生产产物预览：

```sh
pnpm build
pnpm preview --port 4321
```

浏览器打开 `http://127.0.0.1:4321/`。开发服务和产物预览不要同时占用同一端口。产物预览读取 `dist/`，修改代码后需要重新构建。

验证：

```sh
pnpm build && pnpm verify && pnpm test && pnpm check
```

所有这些命令都不会发布网站。`pnpm start` 现在等价于本地开发；根 package.json 不再提供旧 `deploy` 命令。原 Hexo package.json 已归档至 `docs/migration/hexo-package.json`。

`pnpm build` 先执行 `astro sync --force` 清理内容渲染缓存，再构建。57 篇文章规模下耗时很小，可确保迁移插件的变更不会被旧 Markdown 缓存遮蔽。

## 文件布局

- `source/_posts/`：原始文章，不另建副本。
- `source/about/`、`source/guestbook/`、`source/links/`：原附加页与友链数据。
- `src/content.config.ts`：内容集合和字段约束。
- `src/lib/posts.ts`、`listings.ts`：日期、旧 URL、分类标签与分页。
- `src/lib/legacy-headings.mjs`：旧小节锚点及已核实的历史坏链接/嵌入降级。
- `src/pages/`：Astro 页面、Atom 和 sitemap。
- `src/layouts/Base.astro`、`src/styles/global.css`：页面框架与样式。
- `src/components/Eevee.astro`：作用域隔离的原伊布。
- `static/`：随站发布的图标、Hitalk、小猫及旧 SW 退役文件。
- `dist/`：构建产物，已忽略，不手工编辑。
- `src/data/site.ts`：友链交换所用的公开站点资料。
- 旧主题、Hexo 配置、脚手架与部署钩子已移除；需要对照时查看 `hexo` 分支或清理前提交 `76048657`，不再将旧运行代码保留在当前目录。
- 清理范围与保留项见 [清理记录](cleanup.md)。

## 写新文章

在 `source/_posts/` 新建 `.md`，文件名会成为地址中的 slug。建议使用英文和连字符，保留 `.md` 扩展名：

```yaml
---
title: 新文章的标题
date: "2026-09-22T20:00:00+08:00"
tags:
  - javascript
categories:
  - javascript
description: 可选的简短摘要。
draft: true
---
```

日期使用带引号、显式时区的字符串。新文章也支持带引号的上海本地日期，例如 `"2026-9-22 20:00:00"`。`draft: true` 不生成公开页面，准备发表时移除或改成 `false`。

历史文章保持原来的 frontmatter 写法，由已核实的 Hexo 基线提供准确日期与固定地址。不要用文件修改时间替代发布日期。类别数组代表层级，例如 `javascript` → `PWA`，不是两个平行分类。

旧源文件 SHA-256 是本次迁移的完整性检查；有意编辑历史正文属于后续内容维护，应单独记录，不要未经检查覆盖旧基线。

## 评论和旧缓存

本地预览展示说明，不挂载能写入生产的 Hitalk SDK。正式域名 `blog.ihoey.com` 才挂载评论及读取评论数。路径沿用旧规则，留言板为 `/guestbook/`，文章保留 `.html`。

`static/sw.js` 是旧 Hexo Service Worker 的退役脚本。上线时必须放在原来的 `/sw.js`，不能删除它并假设用户缓存自动消失。首次命中旧缓存的页面仍可能需要再次导航或刷新才显示新版，真实升级流程须在发布前验证。

## 发布状态

Astro 已于 2026-10-02 发布，当前正式站由 `master` 的 `8fed6f94` 静态产物提供（含 WebP 优化），源码来自 `feat/astro-migration` 的 `18d1d41c`。后续仍使用独立发布工作区同步 dist，详见 [发布记录与回退](../release/astro-rollout.md)。

发布前先确认用户预览结果、Vercel 的实际项目与分支配置、旧 Worker 升级结果和可回退的正式版本。若沿用静态分支发布，应使用独立部署工作区同步 `dist/`，普通提交和推送；不使用历史 SCP 钩子，不强制推送。不在本地预览阶段直接执行发布。

## 参考

- [Astro 安装与运行要求](https://docs.astro.build/en/install-and-setup/)
- [Astro 内容集合](https://docs.astro.build/en/guides/content-collections/)
- [构建输出格式](https://docs.astro.build/en/reference/configuration-reference/#buildformat)
- [修复旧文章 Dash 链接的官方来源](https://kapeli.com/dash)
