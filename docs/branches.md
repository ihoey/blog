# 分支约定与清理记录

更新日期：2026-10-03（Asia/Shanghai）。

用户要求当前源码使用 `main`、`master` 用于部署，旧版源码保留 `hexo` 名称。

| 分支 | 职责 | 当前状态 |
| --- | --- | --- |
| `main` | Astro 源码、文章、静态源资源与开发文档 | 已从 `feat/astro-migration` 的 `d412f606` 创建，完整继承提交历史 |
| `master` | `dist/` 构建结果，Vercel 正式发布通道 | 保留；普通快进发布，不强推 |
| `hexo` | 旧 Hexo 4.2.1 / NexT 源码 | 保留在 `57828763b8ef90ba74ad837cc42cbfa0c88e1530`，不再日常开发 |

建议仓库默认分支为 `main`。当前默认仍为 `master`，待通过有仓库管理权限的入口切换；Vercel 正式发布分支仍保持 `master`。

## 已清理的重复和历史分支

| 分支 | 核对结果 | 处理 |
| --- | --- | --- |
| `feat/astro-migration` | `main` 已继承其全部源码与历史；没有打开的 PR | 已删除旧分支名 |
| `next` | 上轮根据旧版名称误记创建，与 `hexo` 同为 `57828763` | 已删除重复分支，旧版继续叫 `hexo` |
| `add-license-1` | [PR #8](https://github.com/ihoey/blog/pull/8) 已关闭且 merged=true | 已删除旧 PR 分支 |
| `add-code-of-conduct-1` | [PR #9](https://github.com/ihoey/blog/pull/9) 已关闭且 merged=true | 已删除旧 PR 分支 |

两个 2018 年分支与当前 Astro 源码没有共同祖先，不能仅靠当前源码的祖先比较判定 PR 是否合并；已分别核对 GitHub PR 的合并状态。保留原文件快照在 `docs/archive/`，原提交为：

- LICENSE：`2d93dd8e01af7e9692d5e0c082770d0763375dc7`，PR #8。
- CODE_OF_CONDUCT.md：`1b165aef54d57f32b55d6696db42af87532121fb`，PR #9。

当前 GitHub 插件未提供删除分支、修改默认分支的管理接口。首次部署后通过 Actions 单次步骤清理已核对的四个分支，仅当分支 SHA 仍与记录一致时删除；步骤已完成并从当前工作流移除，日常发布不再包含分支删除操作。默认分支切换仍需仓库管理入口。首次 Actions 运行 `37056641053` 已完成清理，重新枚举远端确认仅保留 `main`、`master`、`hexo`。

## 开发与发布

1. 从 `main` 开发；旧迁移文档的分支名和工作目录是历史记录。
2. 推送代码后，`.github/workflows/deploy.yml` 在 GitHub Actions 使用 `.nvmrc` 和 `packageManager` 锁定的版本执行 install、check、test、build 和 verify，并缓存依赖与字体子集。
3. 所有检查通过后，工作流在独立 `master` checkout 同步静态产物，保留 Git 元数据、清理过期文件、排除 `.prerender` 构建内部文件，再普通快进推送；不强推、不复制 Astro 源码。
4. 仅 `main` 的代码修改触发自动部署。文档修改跳过，`master` 和 `hexo` 不触发构建循环；发现更新的 main 提交时，由其排队中的工作流发布。
5. GitHub Actions 成功表示产物已更新，不等于 Vercel 已上线；仍需核对 Vercel success 与正式域名。
6. 最新源码 / 产物 SHA、验证结果及回退点记录在 `docs/release/astro-rollout.md`。默认分支切到 main 后，也可以从 Actions 页面手动运行工作流。
