# 工程整理（2026-10-29）

用户授权回到原 blog 目录，复用现有工作区，按顺序完成本地分支同步、依赖安全更新、旧 worktree 清理、样式 / 组件整理和 PR 检查。

## 执行计划

1. 原 `/Users/ihoey/personal/project/blog` 切换至跟踪 origin/main 的本地 main（已完成，起点 f241eee6）；hexo 57828763 保留。
2. 审计并修复 Astro / Vite 依赖约束，保留锁定版本与可复现安装。
3. 备份旧工作区的 work 记录、保留历史分支 / 标签，再移除两个过渡 worktree。
4. 分拆 Base 站点组件、按模块整理层叠样式，保持外观和动效；运行需要的历史路由映射移入 src/data。
5. 增加工程格式化、统一 validate 与 PR 只读校验，main 验证通过后自动发布。
6. 本地必要检查通过后提交推送；按既有约定不等待 / 巡查自动部署，不把提交写成已上线。

## 验证与当前状态

已完成本地整理和验证，准备提交推送；不等待远端自动部署。

- 唯一工作区：`/Users/ihoey/personal/project/blog`，main 跟踪 origin/main；两个迁移 / 发布 worktree 已移除。Hexo 保留分支和 archive/hexo-2026-09-18 标签；分叉的旧本地 master 先保留 archive/local-master-2017，再跟踪 origin/master。
- 旧性能报告备份到 work/archives/astro-migration-2026-10-29，旧 Hexo 生成物移至 work/archives/hexo-generated；这些目录在 Git 中忽略，不发布。
- Astro 7.3.3 → 7.4.4，Markdown 7.3.1 → 7.3.5，Vite 8.3.0 → 8.3.5；在允许的版本范围刷新间接依赖，包括 sharp 0.35.5、undici 8.12.3、source-map-js 1.2.2、fast-uri 3.1.9。Node 要求及 .nvmrc 同步为 22.23.4，pnpm 仍为 10.28.2。
- npm mirror 的审计端点返回不存在，项目 registry 明确为官方 npm；最终 pnpm audit 返回 info / low / moderate / high / critical 均为 0（2026-10-29 当次结果），不将其解释为没有任何潜在风险。冻结锁文件安装通过。
- Base 提取 SiteHeader / SiteFooter，页面增强移至 page-enhancements.ts；站名 / 格言 / 导航集中到 site.ts。v2.css 拆成 8 个按原级联顺序加载的模块，由 site.css 统一入口管理。旧规则顺序经规范化比较完全一致，本轮不盲目重排跨模块覆盖。
- 新增 src/data/legacy-posts.json，运行处理不再读取迁移文档；增加它与独立基线的字段一致性测试。文章 source 与 static 无改动。
- 加入 Prettier 及 Astro 插件，统一工程代码格式；排除正文、SVG 原始路径、静态 SDK、Python 和基线 JSON。pnpm validate 串联格式 / 类型 / 测试 / 构建 / 验证。
- CI 分为只读 validate 与 main 专用 publish，发布仅接收通过验证的 artifact；发布作业独享 contents:write，PR 不上传或发布产物。Actions 按 SHA 固定，YAML、作业依赖、PR 发布条件和 shell 语法本地检查通过。Dependabot 定期创建 npm / Actions 更新 PR，不自动合并。
- 本地 pnpm validate 完成：Astro check 49 文件零错误 / 警告 / 提示，33 项测试，183 页构建、182 个旧地址 / 576 个锚点、298 字体子集的 143,366 个字形轮廓及宽度通过。
- 以升级依赖后的重构前产物为基线，184 个 HTML 文件（含站长验证文件）的正文文本、标题 / ID、代码原文、链接目标均一致；CSS 规范化后规则与顺序一致。记录在 work/engineering/。
- 浏览器确认开发预览和正式构建首页有文章，日夜切换 / 侧栏正常；WebRTC 页 6 个代码复制入口及 11 个目录入口，无横向溢出。构建和开发并行时曾出现开发进程读到暂时空内容，构建完成后重启开发服务恢复，正式构建未受影响。未重复手机检查，未发送评论或支付。

## 后续维护

日常在原 blog 目录运行 pnpm dev --port 4321；提交前 pnpm validate。样式修改定位对应 site 模块，保持顺序；添加文章继续使用 source。发布通过 main 的 CI，文档-only 提交不触发发布。历史报告可按需从 work/archives 取回。

旧 GitHub Pages 的 master:/docs 配置仍是遗留独立托管设置，本轮未改它；本轮不等待 / 检查远端流水线，也不宣称新工作流已经在线运行成功。

源码已提交为 614e7b70 并推送 main；两个归档标签已推送。仅确认源码写入成功，未等待或查询自动发布状态。
