# Astro 维护工作约定

「梦魇小栈」已迁移到 Astro，当前源码分支为 `main`。

- 开始工作前先读 `docs/status.md`，确认当前状态与待办；评论相关工作另读 `docs/hitalk.md`。
- Astro 开发命令和文件结构见 `docs/development.md`，已确认的产品与视觉意图见 `PRODUCT.md`。
- 维护状态只记录当前事实、进行中的工作与未解决事项；有读者或维护价值的变化汇总到 CHANGELOG.md，不逐条复述提交。关于页保留早期历程并链接更新日志，不重复维护流水账。验证结果区分本地与正式上线。
- 日常复用原主目录 `/Users/ihoey/personal/project/blog` 和 `main` 分支开发；不主动创建 worktree，需要分支时先在当前目录切换。`master` 仅保存正式静态产物，`hexo` 保留旧版 Hexo / NexT 源码。分支与发布见 `docs/deployment.md`；旧实现仅从 Git 历史查询。
- 保留文章正文、发布日期、分类层级、标签、原有 URL 和 Hitalk 页面标识。不要把教程代码块中的模板语法当作待转换指令。
- 使用 package.json 中的 Astro 命令开发、构建与校验；hexo 分支和旧提交仅供查询历史，不运行旧主题钩子或部署脚本。
- 本地评论检查使用只读请求或模拟数据，不发送真实评论、邮件或点赞；继续保留旧 Service Worker 的退役脚本和原地址。
- `main` 的代码推送通过 `.github/workflows/deploy.yml` 自动检查、构建、验证并快进更新 `master`。日常发布不再要求本地构建或逐文件上传；失败的检查不能跳过。文档修改不触发部署。
- 用户于 2026-10-03 明确要求：完成本地必要检查和提交后，不再等待或检查 Actions / Vercel 的自动流程；除非用户另行要求调查部署问题。发布事实只按已经实际观察到的结果记录，不把提交等同于上线成功。
- 当前为日常维护阶段，部署与回退见 docs/deployment.md；后续修改与发布范围以用户最新指令为准。
- 不把凭据、令牌或完整环境配置复制到进度文档、日志或前端产物中。

## CodeGraph

如果仓库根目录存在 `.codegraph/`，理解或定位代码前优先使用 `codegraph_explore` MCP 工具或 `codegraph explore "问题或符号"`。没有该目录时跳过，不自行索引。
