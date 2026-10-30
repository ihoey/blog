# 历史资料

本目录保存历史来源，不参与构建或发布；其中的旧目录、计划与命令不用于日常操作。当前维护从 [README](../../README.MD) 开始，站点变化统一记 [CHANGELOG](../../CHANGELOG.md)。

- `astro-migration-2026-10-30.md`：迁移过程的完整进度快照。
- `product-decisions-2026-10-03.md`：已被取代的视觉讨论；当前决定见 PRODUCT.md。
- `hitalk-hexo-history.md`：旧主题评论接入记录；当前接入见 ../hitalk.md。
- `hexo-package.json`、`export-legacy.py`：旧依赖与一次性导出工具，不用于日常开发；导出工具会重写已核实的基线，不要重新运行。
- `LICENSE-2018.txt`、`CODE_OF_CONDUCT-2018.md`：历史 PR 原文件，保留来源。

重复的分支、工程、SEO、迁移验收和发布说明已合并到当前开发 / 部署文档；过期设计建议与一次性性能报告不再单独维护。原始文件完整保留在 Git 提交 [2f34bb80](https://github.com/ihoey/blog/tree/2f34bb80/docs)，例如：

```sh
git show 2f34bb80:docs/release/astro-rollout.md
git show 2f34bb80:docs/release/webp-optimization.md
git show 2f34bb80:docs/release/performance-baseline-2026-10-02.md
git show 2f34bb80:docs/migration/site-history.md
```

这些分别保存当时的部署 ID / SHA、WebP 测量方法与结果、性能基线、关于页旧历程的 Git 核对依据，不把历史数据当作当前性能或部署状态。更大的原始报告在本地忽略目录 work/archives/，旧源码在 hexo 分支。

兼容检查仍使用 docs/migration/ 中的 JSON 基线、修订清单和验证数据，本轮未移动或删除它们。
