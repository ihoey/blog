# 更新日志

记录 Astro 迁移及之后对阅读、写作和维护有影响的变化，不逐条复述 Git 提交。日期为源码变更日期；已核实的正式上线另行注明。更早的故事见[小栈历程](https://blog.ihoey.com/about/index.html#site-history-title)。

## 2026-10-30

- 恢复正式站 GA4，本地和预览环境不加载统计或可写入生产的评论组件。
- 完善页面标题、分享卡片、文章结构化数据及错误页收录规则；页面、订阅和站点地图共用真实更新时间。
- 文章统一使用可选的 description，未填写时自动提取开头摘要；不新增重复的 SEO 摘要字段，不批量改写旧文章。
- 清理失效样式，集中导航规则；保留已经确认的阅读布局、玻璃导航和个性动效。
- 合并开发与发布说明，用本日志记录后续变化；关于页保留早期历程并提供日志入口。
- 清理一次性迁移工具和过程快照，构建检查转为日常脚本；保留旧链接、原文、评论身份和缓存退役兼容。

源码依据：[统计恢复](https://github.com/ihoey/blog/commit/3e4ff001)、[SEO](https://github.com/ihoey/blog/commit/8bfc40eb)、[复用摘要](https://github.com/ihoey/blog/commit/910010e4)、[简化实现](https://github.com/ihoey/blog/commit/2f34bb80)。未在这些提交后等待或查询自动部署。

## 2026-10-29

- 收拢迁移工作区，回到原 blog 目录维护；旧 Hexo 源码和归档标签继续保留。
- 更新 Astro、Markdown 及相关依赖，刷新锁文件；当次依赖审计未报告已知漏洞。
- 拆分站点头尾组件和样式模块，增加统一格式化与验证命令。
- Pull Request 只读检查，main 验证通过后自动发布；写权限只授予发布作业，依赖更新不自动合并。

源码依据：[工程整理](https://github.com/ihoey/blog/commit/614e7b70)。

## 2026-10-03

- 自动构建流程正式启用：main 保存 Astro 源码，验证后的静态产物提交到 master，由 Vercel 发布。
- 文楷按页面生成常规 / 粗体子集，保留原字形及动态文字的完整字体 fallback；评论接近视口时再加载。
- 清理旧分支、Hexo 工具和过时设计入口。

正式部署已在当日核实：[首次 Actions 发布](https://github.com/ihoey/blog/actions/runs/37056641053)，静态产物 [ac8d3a26](https://github.com/ihoey/blog/commit/ac8d3a26)。字体下载体积下降已验证，未复测字体优化后的性能评分。

## 2026-10-02

- 小栈正式从 Hexo 迁至 Astro，保留 57 篇原文章、旧链接、标题锚点和历史评论身份。
- 保留 NexT 气质、伊布、小猫及原打赏组件；重新整理导航、目录、归档、标签云、友链、关于和留言页面。
- 加入日夜切换、霞鹜文楷、Dracula 代码高亮、复制、图片放大与正文强调样式。
- 树叶背景、头像和部分文章图片改用 WebP；图标字体替换为实际使用的 SVG。
- 补齐全文 Atom、站点地图、站点验证、随机一言和旧缓存退役；新版离线功能暂缓。
- 关于页补入经 Git 核对的旧历程，保留原感想和打赏记录。

当日分批部署并完成验收，最终静态版本 [ba7a5f2b](https://github.com/ihoey/blog/commit/ba7a5f2b)。WebP 同环境单次移动模拟测试：首页 Performance 58 → 75，PWA 文章 58 → 81；这是当时的测试记录，不代表当前分数或全部真实访客体验。原始部署和测量记录可从[历史资料](docs/archive/README.md)恢复。

## 2026-09-18

- 接入 Hitalk v3，恢复文章评论数和页脚小猫互动，保留历史评论与留言。
- 评论迁出 LeanCloud；关于页说明其公告的未来停服日期，没有把计划停服写成已经关闭。

源码依据：[Hitalk v3](https://github.com/ihoey/blog/commit/e73dfac8)、[评论数](https://github.com/ihoey/blog/commit/b91313cd)、[迁移前版本](https://github.com/ihoey/blog/commit/57828763)。
