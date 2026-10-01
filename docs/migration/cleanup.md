# 旧项目清理（2026-10-01）

范围为 `/Users/ihoey/personal/project/blog-astro` 的 `feat/astro-migration` 分支。原 `/Users/ihoey/personal/project/blog` 工作目录和 `hexo` 分支均不修改。清理前版本为 `76048657`，移除的文件可从该提交或旧分支查看、恢复，不另复制一套旧运行代码。

## 已清理

- `themes/next`、`themes/next5`：两套旧主题及其重复脚本、图片、第三方库，约 9 MB。
- `_config.yml`：友链页仍使用的四项公开资料先迁入 `src/data/site.ts`，再移除旧配置；资料值保持不变。
- `scripts/events.js`、`scripts/codeblock.js`、`scripts/uglify.js`：旧 Hexo 部署钩子、代码块处理和压缩脚本。
- `.travis.yml`、`th.py`：旧自动发布和百度推送脚本。
- `scaffolds/`、`.npmignore`：旧文章脚手架和无效的 npm 发布忽略规则，写新文章改用开发文档中的 Astro frontmatter 示例。
- `source/favicon.ico`、`source/robots.txt`、`source/manifest.json`：已由 `static/` 提供的重复资源。
- `source/sw.js`：旧缓存 Worker，保留实际发布用的 `static/sw.js` 退役脚本。
- `source/tags/index.md`、`source/categories/index.md`：无正文的 Hexo 占位页，Astro 已从文章集合生成这些路由。
- README 改为当前 Astro 项目入口；关于页原文不变。Hexo Hitalk 运维记录移入 `hitalk-hexo-history.md`，当前接入说明更新为实际 Astro 文件路径。

## 继续保留

- 原始文章、关于 / 留言 / 友链正文与友链名单；本轮不改内容、日期、URL、分类和评论标识。
- `static/` 中实际使用的原头像、伊布相关资源、二维码、小猫 / Hitalk SDK、图标、字体及授权说明；不因其来源于旧主题就删除。
- 旧 `/manifest.json` 与图标地址，供历史入口兼容；不在清理时顺带重做 PWA。
- `static/sw.js` 旧缓存退役文件；真实浏览器升级场景仍需在发布前验收。
- `legacy-baseline.json`、`source-edits.json`、迁移校验 / 测试与只读导出脚本：现在仍用于保护 57 篇文章、182 个页面、576 个历史锚点。
- `hexo-package.json` 和历史文档仅作为版本来源记录，不是运行入口。
- `source/` 目录名继续沿用，避免无必要的内容移动和基线路径变更。

## 验证

清理前将 `dist/` 的文件列表与 SHA-256 保存到被忽略的 `work/pre-cleanup-build.json`。清理后重新构建，429 个文件的路径和 SHA-256 全部一致，新增 / 删除 / 内容变化均为 0；结果保存在 `work/cleanup-build-comparison.json`。迁移验证覆盖 57 篇文章、182 个页面 / 旧路由和 576 个历史锚点，0 错误 / 链接警告；11 项测试通过，Astro check 检查 35 个文件，0 错误 / 警告 / 提示。

本轮不发布、不推送、不重写 Git 历史。后续进入上线准备时确认托管配置、缓存升级和回退步骤。
