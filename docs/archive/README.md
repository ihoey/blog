# 历史资料

本目录保存旧方案的来源记录，不参与当前 Astro 构建或发布。

- `hexo-package.json`：旧 Hexo 依赖与脚本快照；当前依赖以根 package.json / pnpm-lock.yaml 为准。
- `hitalk-hexo-history.md`：旧主题评论接入及手动发布记录；当前接入见 ../hitalk.md。
- `export-legacy.py`：迁移时一次性读取外部 Hexo db.json / public 的工具，不运行 Hexo 钩子。它会重写 docs/migration/legacy-baseline.json；现有基线已核实，不用于日常写作或构建，也不要为了更新文章重新生成。
- `product-decisions-2026-10-03.md`：完整视觉方案讨论，含已被取代的配色、宽度、导航和侧栏方案；当前决定以根 PRODUCT.md 为准。
- `LICENSE-2018.txt`、`CODE_OF_CONDUCT-2018.md`：两个已合并历史 PR 的原文件快照。

运行中的旧地址 / 标题锚点 / 正文校验继续使用 docs/migration 下的基线与修订清单。旧主题与完整旧源码保留在 hexo 分支；当前发布流程见 ../release/astro-rollout.md。
