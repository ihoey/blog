# 部署与回退

## 分支与发布

| 分支 | 职责 |
| --- | --- |
| main | 默认分支，Astro 源码与日常维护 |
| master | 自动生成的静态产物，Vercel 正式部署来源 |
| hexo | 旧 Hexo / NexT 源码归档 |

复用 `/Users/ihoey/personal/project/blog`，不主动新建 worktree。迁移工作区已经移除；需要旧源码时查看 hexo，归档标签为 archive/hexo-2026-09-18、archive/local-master-2017。

1. 在 main 完成本地必要检查；完整检查为 `pnpm validate`。
2. 提交推送 main。`.github/workflows/deploy.yml` 使用锁文件、.nvmrc 和 packageManager 验证、构建及校验。
3. PR 只读检查；main 验证成功才将同一份 artifact 交给发布作业。写权限仅授予发布作业，普通快进更新 master，不强推、不把 Astro 源码直接合并进 master。
4. Vercel 从 master 发布。相同产物不重复提交；纯文档（含 CHANGELOG）不触发部署。main 有较新源码时，由后续排队工作流发布，较新的纯文档不阻断已验证产物。

按用户约定，推送后不等待 / 查询 Actions 或 Vercel，除非另有要求。源码推送、Actions 成功和正式域名更新是三个事实，不相互替代。旧 Hexo / SCP / 手动发布脚本不再使用。

## 需要排查上线时

- 对齐源码 SHA、Actions 摘要中的 master SHA 和 Vercel Production 部署，区分构建失败与托管失败。
- 检查首页、一篇多级分类 .html 旧文章、关于 / 留言等入口，未知路径应返回真实 404。
- 核对 Atom、两份 sitemap、robots 和站长验证；/sw.js 应返回 JavaScript 与 no-cache / no-store。
- 评论只读核对历史身份和数量；图片放大、复制、打赏仅验证展示，不发真实写入。统计脚本存在不等于后台已入账。
- 历史记录中的 GitHub Pages master:/docs 与 Vercel 是独立托管；排障时核对实际账户设置，不把旧 Jekyll 失败当作当前正式站的状态。

## 回退

1. 先从已观察的部署记录选定目标，审查差异，不把历史日志里的 SHA 当作当前回退点。紧急时可在 Vercel 将确实存在的已验证部署提升为 Production。
2. 同时在 main 撤销对应变更，或暂停自动发布，避免下一次推送覆盖回退。保留 Git 历史，用 revert / 普通提交；不直接 reset / force-push master。
3. 若直接撤销静态发布提交，先确认其后是否还有其他发布；不可把后续产物一起丢弃。
4. 回退后检查首页、旧文章、评论读取、订阅及 SW。旧 HTML 可能重新注册旧 worker，恢复离线缓存行为需单独核对。

日常变化记 [CHANGELOG](../CHANGELOG.md)，早期部署 ID、测量和回退记录的恢复方式见[历史资料](archive/README.md)。
