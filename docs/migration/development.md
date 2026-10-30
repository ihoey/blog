# Astro 开发与预览

工作目录：`/Users/ihoey/personal/project/blog`（main）

分支：`main`（原 `feat/astro-migration`）。`master` 保存部署产物，`hexo` 保留旧版源码，详见 [分支约定](../branches.md)。

## 常用命令

使用 Node 22.23.4（见 `.nvmrc`）和 pnpm 10.28.2：

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
pnpm validate
```

所有这些命令都不会发布网站。`pnpm start` 现在等价于本地开发；根 package.json 不再提供旧 `deploy` 命令。原 Hexo package.json 已归档至 `docs/archive/hexo-package.json`。

`pnpm build` 先执行 `astro sync --force` 清理内容渲染缓存，再构建，并运行 `scripts/optimize-fonts.mjs`，按生成后的页面文字制作常规 / 粗体文楷子集。首次字体压缩需要数分钟；后续使用 `.astro/reading-font-cache/` 缓存，字体源或处理脚本变化时自动失效。不要直接以 `astro build` 代替发布构建，否则会跳过字体优化。开发模式仍使用完整字体。

页面优先使用子集字体，异步加载原有 unicode-range 字体声明，为任意评论和动态文字补字。`pnpm verify` 同时检查页面文字覆盖与子集字形轮廓 / 宽度；原文楷字体和授权文件保留。连续构建会排除并清理旧的派生字体资源，避免重复声明和发布目录堆积。

## 当前工作目录

2026-10-29 已回到 `/Users/ihoey/personal/project/blog` 的 main；旧 blog-astro / blog-release-20261002 工作区已移除。历史文档中的目录仅描述当时状态。旧性能报告与生成文件保存在该主目录的 work/archives/，不会发布。

## 文件布局

- `source/_posts/`：原始文章，不另建副本。
- `source/about/`、`source/guestbook/`、`source/links/`：原附加页与友链数据。
- `src/content.config.ts`：内容集合和字段约束。
- `src/lib/posts.ts`、`listings.ts`：日期、旧 URL、分类标签与分页。
- `src/lib/legacy-headings.mjs`：旧小节锚点及已核实的历史坏链接/嵌入降级。
- `src/pages/`：Astro 页面、Atom 和 sitemap。
- `src/layouts/Base.astro`：页面框架与 SEO；`src/components/SiteHeader.astro` / `SiteFooter.astro`：导航、封面与页脚；`src/styles/global.css` / `site.css`：基础规则与按顺序组织的站点样式。
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
seoDescription: 可选，仅用于搜索和分享卡片，不影响首页摘要。
# 只有实质内容更新时才填写；日期必须加引号，不随构建刷新。
updated: "2026-10-30T20:00:00+08:00"
# 可选：真实文章配图，用于分享卡片和文章结构化数据。
image: /images/example-cover.webp
draft: true
---
```

日期使用带引号、显式时区的字符串。新文章也支持带引号的上海本地日期，例如 `"2026-9-22 20:00:00"`。`draft: true` 不生成公开页面，准备发表时移除或改成 `false`。

上面的 updated / image 为填写格式示例，不要给新文章照抄不存在的图片或无关日期；无需更新或没有配图时删除对应字段。`updated` 优先于旧映射，不能早于发布日期；未填写时仍沿用历史更新时间，新文章则等于发布日期。页面可见日期、JSON-LD、Atom 和两份站点地图共用这个值，不读取文件 mtime，也不把部署当作更新。

`description` 仍决定列表的纯文本摘要和 Atom summary；`seoDescription` 独立覆盖搜索 / 分享描述，缺省时沿用已有摘要，不批量重写历史文章。`image` 必须是与正文相关、可访问的图片，可使用站内绝对路径或 HTTPS 地址；未指定时分享卡片继续使用头像，但文章 JSON-LD 不再将头像当作每篇文章的配图。

SEO 产物检查已纳入 `pnpm verify`：检查 canonical、描述与分享卡片、JSON-LD、可见日期 / 订阅 / sitemap 一致性及错误页 noindex。静态托管的 Atom MIME 由 `static/vercel.json` 设置；本地构建只能验证配置，正式响应头需发布后另行观察。

历史文章保持原来的 frontmatter 写法，由已核实的 Hexo 基线提供准确日期与固定地址。不要用文件修改时间替代发布日期。类别数组代表层级，例如 `javascript` → `PWA`，不是两个平行分类。

旧源文件 SHA-256 是本次迁移的完整性检查；有意编辑历史正文属于后续内容维护，应单独记录，不要未经检查覆盖旧基线。

## 评论和旧缓存

本地预览展示说明，不挂载能写入生产的 Hitalk SDK。正式域名 `blog.ihoey.com` 才挂载评论及读取评论数。路径沿用旧规则，留言板为 `/guestbook/`，文章保留 `.html`。

`static/sw.js` 是旧 Hexo Service Worker 的退役脚本。上线时必须放在原来的 `/sw.js`，不能删除它并假设用户缓存自动消失。首次命中旧缓存的页面仍可能需要再次导航或刷新才显示新版，真实升级流程须在发布前验证。

## 发布状态

Astro 已于 2026-10-02 发布。当前源码维护使用 `main`，生产部署继续监听 `master` 的静态产物；最新发布 SHA、验证结果和回退点以 [发布记录与回退](../release/astro-rollout.md) 为准。日常发布由 `.github/workflows/deploy.yml` 自动构建并更新静态产物；不要将 Astro 源码直接合并到静态产物分支。

发布代码到 `main` 后，在 Actions 页面确认检查、构建、字体与旧链接校验通过；工作流自动同步产物并普通快进更新 `master`。产物没有变化时不产生发布提交。随后确认对应 master 提交的 Vercel 检查和正式域名；不再需要本地创建发布 worktree 或手动上传 dist。详细流程与回退见发布记录。

## 参考

- [Astro 安装与运行要求](https://docs.astro.build/en/install-and-setup/)
- [Astro 内容集合](https://docs.astro.build/en/guides/content-collections/)
- [构建输出格式](https://docs.astro.build/en/reference/configuration-reference/#buildformat)
- [修复旧文章 Dash 链接的官方来源](https://kapeli.com/dash)

## SVG 界面图标

- 公共组件：`src/components/Icon.astro`，用法 `<Icon name="calendar" />`。图标均为装饰，aria-hidden / focusable=false；入口名称由旁边文字或按钮 aria-label 提供。
- 图形：`src/assets/ui-icons.svg`，只含本站使用的 20 个 Font Awesome 4.6.3 图形，构建时生成哈希 URL，可跨页面缓存。不要重新引入整套字体或浏览器端图标库。
- 尺寸与颜色：保留 `.icon` 及 `.icon-*`，统一 currentColor，既有父级 hover / 日夜样式继续生效。组件传递额外属性以保留 Astro 局部样式作用域。
- 扩展图标时同步 SVG symbol 与组件 IconName 类型；来源与许可证见 `static/icons/NOTICE.txt`、`static/icons/OFL.txt`。
