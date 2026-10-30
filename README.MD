# 梦魇小栈

基于 Astro 的个人博客，沿用原站 57 篇文章、永久链接和 Hitalk 历史评论标识，保留 NexT 风格与伊布等个性元素。

正式站为 https://blog.ihoey.com/，已使用 Astro。

| 分支 | 用途 |
| --- | --- |
| `main` | 当前 Astro 源码，日常开发与内容维护 |
| `master` | 构建后的静态产物，Vercel 正式部署来源 |
| `hexo` | 旧 Hexo / NexT 源码归档 |

日常工作目录为 `/Users/ihoey/personal/project/blog`，开发从 `main` 开始。推送代码后自动验证并构建，成功后更新 `master` 供 Vercel 发布；纯文档（含 CHANGELOG）不触发部署，检查失败不更新产物。详见[部署与回退](docs/deployment.md)。

## 开发

使用 Node 22.23.4（`.nvmrc`）和 pnpm 10.28.2：

```sh
pnpm install --frozen-lockfile
pnpm dev --port 4321
```

打开 `http://127.0.0.1:4321/`。生产产物可用 `pnpm build`、`pnpm preview --port 4321` 预览；开发服务和产物预览不要占用同一端口。

## 检查

```sh
pnpm validate
```

以上命令均不发布网站。本地不挂载可写入生产数据的评论组件。

## 内容与资源

- `source/_posts/`：文章 Markdown。
- `source/about/`、`source/guestbook/`、`source/links/`：独立页正文与友链数据。
- `src/`：Astro 页面、组件、样式及交互；`src/data/site.ts` 统一保存站点与友链资料。
- `static/`：直接发布的字体、图片、评论 SDK、二维码等资源。
- `docs/migration/`：历史 URL / 锚点基线、内容修订与固定验证数据，保留给兼容校验使用。
- `static/sw.js`：旧缓存退役脚本，发布时继续保留原地址。

旧 Hexo 主题、配置和发布脚本已从本分支移除，可从 Git 历史恢复。原作者介绍、联系方式及打赏记录继续保存在关于页正文中。

## 文档

- [更新日志](CHANGELOG.md)：迁移以来的重要变化
- [当前维护状态](docs/astro-migration.md)：进行中的工作与待确认项
- [开发与写作](docs/development.md)：命令、文章字段、SEO、字体和资源
- [部署与回退](docs/deployment.md)：分支职责、自动发布与排障
- [评论接入](docs/hitalk.md)
- [正文排版标记](docs/reading-marks.md)
- [产品与视觉约定](PRODUCT.md)
- [历史资料](docs/archive/README.md)：旧方案、原始报告的恢复入口
