# Astro 维护工作约定

「梦魇小栈」已迁移到 Astro，当前源码分支为 `main`。

- 开始工作前先读 `docs/astro-migration.md`，确认当前阶段、已完成内容和下一步；评论相关工作另读 `docs/hitalk.md`。
- Astro 开发命令和文件结构见 `docs/migration/development.md`，已确认的产品与视觉意图见 `PRODUCT.md`。
- 每完成一个阶段、做出关键决定或遇到阻塞，更新迁移文档；记录实际验证结果，区分计划、已实现和已验证。结束一轮工作前留下可直接执行的下一步。
- 在当前独立 worktree 和 `main` 分支中开发。`master` 仅保存正式静态产物，`hexo` 保留旧版 Hexo / NexT 源码。分支管理与清理状态见 `docs/branches.md`；旧文档中的 `feat/astro-migration` 是迁移阶段的历史名称。
- 保留文章正文、发布日期、分类层级、标签、原有 URL 和 Hitalk 页面标识。不要把教程代码块中的模板语法当作待转换指令。
- 根 `package.json` 已改为纯 Astro 命令：`pnpm dev`、`pnpm build`、`pnpm preview`。旧主题、Hexo 配置和发布脚本已清理；历史代码可在 `hexo` 分支查看，归档命令不可用于本分支开发或部署。
- 本地评论检查使用只读请求或模拟数据，不发送真实评论、邮件或点赞。发布前核对旧 Service Worker 的更新/退役方案。
- `main` 的代码推送通过 `.github/workflows/deploy.yml` 自动检查、构建、验证并快进更新 `master`。日常发布不再要求本地构建或逐文件上传；失败的检查不能跳过。文档修改不触发部署。
- Astro 已于 2026-10-02 上线，当前进入维护阶段。部署记录与回退方案见 docs/release/astro-rollout.md；后续修改与发布范围以用户最新指令为准。
- 不把凭据、令牌或完整环境配置复制到进度文档、日志或前端产物中。

## CodeGraph

如果仓库根目录存在 `.codegraph/`，理解或定位代码前优先使用 `codegraph_explore` MCP 工具或 `codegraph explore "问题或符号"`。没有该目录时跳过，不自行索引。
