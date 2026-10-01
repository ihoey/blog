# 梦魇小栈

基于 Astro 的个人博客，沿用原站 57 篇文章、永久链接和 Hitalk 历史评论标识，保留 NexT 风格与伊布等个性元素。

当前为 `feat/astro-migration` 本地迁移分支，尚未上线。旧站源码在 `hexo` 分支，正式静态产物在 `master` 分支。

## 开发

使用 Node 22.23.2（`.nvmrc`）和 pnpm 10.28.2：

```sh
pnpm install --frozen-lockfile
pnpm dev --port 4321
```

打开 `http://127.0.0.1:4321/`。生产产物可用 `pnpm build`、`pnpm preview --port 4321` 预览；开发服务和产物预览不要占用同一端口。

## 检查

```sh
pnpm build && pnpm verify && pnpm test && pnpm check
```

以上命令均不发布网站。本地不挂载可写入生产数据的评论组件。

## 内容与资源

- `source/_posts/`：文章 Markdown。
- `source/about/`、`source/guestbook/`、`source/links/`：独立页正文与友链数据。
- `src/`：Astro 页面、组件、样式及交互；`src/data/site.ts` 保存友链交换资料。
- `static/`：直接发布的字体、图片、评论 SDK、二维码等资源。
- `docs/migration/`：历史 URL / 锚点基线、内容修订记录及迁移说明。
- `static/sw.js`：旧缓存退役脚本，发布时继续保留原地址。

旧 Hexo 主题、配置和发布脚本已从本分支移除，可从 Git 历史恢复。原作者介绍、联系方式及打赏记录继续保存在关于页正文中。

## 文档

- [开发、写作与预览](docs/migration/development.md)
- [迁移进度和上线待办](docs/astro-migration.md)
- [旧项目清理记录](docs/migration/cleanup.md)
- [当前 Hitalk 接入](docs/hitalk.md)
- [正文排版标记](docs/migration/reading-marks.md)
- [产品与视觉约定](PRODUCT.md)
