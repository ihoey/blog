# 梦魇小栈

基于 Astro 的个人博客，沿用原站 57 篇文章、永久链接和 Hitalk 历史评论标识，保留 NexT 风格与伊布等个性元素。

正式站为 https://blog.ihoey.com/，已使用 Astro。

| 分支 | 用途 |
| --- | --- |
| `main` | 当前 Astro 源码，日常开发与内容维护 |
| `master` | 构建后的静态产物，Vercel 正式部署来源 |
| `hexo` | 旧 Hexo / NexT 源码归档 |

日常工作目录为 `/Users/ihoey/personal/project/blog`，开发从 `main` 开始。旧迁移和手动发布 worktree 已收拢。推送代码到 `main` 后，GitHub Actions 自动安装锁定依赖、检查、测试、构建并验证，再将静态产物普通快进提交到 `master`，由 Vercel 发布。仅修改 docs、README、AGENTS 或 PRODUCT 不触发部署；检查失败不会更新 `master`。分支清理状态见 [分支约定](docs/branches.md)，发布与回退见 [部署记录](docs/release/astro-rollout.md)。

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
- `src/`：Astro 页面、组件、样式及交互；`src/data/site.ts` 保存友链交换资料。
- `static/`：直接发布的字体、图片、评论 SDK、二维码等资源。
- `docs/migration/`：历史 URL / 锚点基线、内容修订记录及迁移说明。
- `static/sw.js`：旧缓存退役脚本，发布时继续保留原地址。

旧 Hexo 主题、配置和发布脚本已从本分支移除，可从 Git 历史恢复。原作者介绍、联系方式及打赏记录继续保存在关于页正文中。

## 文档

- [开发、写作与预览](docs/migration/development.md)
- [迁移与维护进度](docs/astro-migration.md)
- [分支约定与清理记录](docs/branches.md)
- [旧项目清理记录](docs/migration/cleanup.md)
- [当前 Hitalk 接入](docs/hitalk.md)
- [正文排版标记](docs/migration/reading-marks.md)
- [产品与视觉约定](PRODUCT.md)

## 工程维护

- `pnpm format` / `pnpm format:check` 仅格式化工程代码，不修改 source 正文、静态 SDK 或迁移基线。
- `pnpm validate` 执行格式、类型、测试、构建和历史兼容验证。
- Pull Request 执行只读检查；main 验证通过后传递已验证的静态 artifact 给发布作业，写权限只授予发布作业。
- `src/styles/site.css` 按既有顺序组织站点样式，`src/components/SiteHeader.astro` / `SiteFooter.astro` 管理全站头尾。
- `src/data/legacy-posts.json` 是运行需要的历史映射；docs/migration/legacy-baseline.json 是独立验证依据，二者有一致性测试。
- 依赖通过官方 npm registry 安装 / 审计，Dependabot 定期提交更新 PR；不自动合并。
- 工作区归档与工程整理记录见 [工程维护](docs/engineering.md)。
