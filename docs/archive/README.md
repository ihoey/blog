# 历史资料

当前仓库不再保留一次性迁移工具、旧依赖快照和过程报告；本目录仅保留历史 PR 的 LICENSE / CODE_OF_CONDUCT 原文件。日常说明从 [README](../../README.MD) 开始，重要变化见 [CHANGELOG](../../CHANGELOG.md)。

完整迁移过程、旧设计讨论、评论接入和导出工具可从 Git 提交 [26b3d1a6](https://github.com/ihoey/blog/tree/26b3d1a6/docs/archive) 查询。原始部署 / 性能记录在更早提交 [2f34bb80](https://github.com/ihoey/blog/tree/2f34bb80/docs)，例如：

```sh
git show 26b3d1a6:docs/archive/astro-migration-2026-10-30.md
git show 2f34bb80:docs/release/astro-rollout.md
git show 2f34bb80:docs/release/webp-optimization.md
```

历史数值不代表当前性能或部署状态，旧命令不用于日常操作。原源码保留在 hexo 分支，本地大报告在忽略目录 work/archives/。持续使用的兼容基线和修订清单位于 tests/fixtures/，不属于待删除的迁移产物。
