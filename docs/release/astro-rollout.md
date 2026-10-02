# Astro 上线准备与回退

日期：2026-10-03。状态：**已上线，Vercel Production success；正式域名验收通过**。

## 2026-10-03 Actions 自动发布与字体优化

- 用户授权上线并要求改用 GitHub Actions。源码 `804ddf65acc53274e5a5dcc7363b478fabf928ef` 在 main，首次 [Actions 运行](https://github.com/ihoey/blog/actions/runs/37056641053) success；master 普通快进至 `ac8d3a26f827aecb2203ad455ef68640e22084ac`，保留发布历史。
- Vercel [生产部署检查](https://vercel.com/ihoeys-projects/blog/98WK7cvc4YkXboXRPp99Z8wk4aMR) success；正式首页 https://blog.ihoey.com/ 返回 200，Server=Vercel。此次包含文楷按页字体子集、评论接近视口挂载、评论 / 小猫 CSS 非阻塞与内容哈希资源缓存优化。
- 发布前远端 check 46 文件零诊断、32 项测试通过；183 页构建、182 旧地址 / 576 锚点、298 字体子集与 142,899 字形轮廓 / 宽度校验通过。首页字体 198,704 B，首次生成未命中缓存；已写入缓存供后续运行使用。
- 第二轮 [Actions 运行](https://github.com/ihoey/blog/actions/runs/37057328767) success，全部 298 个字体子集命中缓存；构建与字体处理约 16 秒，作业约 80 秒。产物与 master 一致，未产生重复发布提交。后续纯文档提交也未触发新的构建。
- 正式域名抽查 22 个页面 / 资源，包括首页、Rust 旧文章地址、独立入口、RSS / sitemap、首页 JS / CSS / 两个字体和 SW，全部返回 200 且 Git blob 摘要与 master 相同；未知地址返回真实 404。抽查记录为 work/actions-production-smoke.json（2026-10-03 04:40:07 Asia/Shanghai），本轮未完成全部 747 个可访问文件的全量线上核对。
- master 只包含静态产物，共 748 文件；内部 `.prerender` 文件排除，不复制 Astro 源码。构建或检查失败不会推送产物，过期静态文件会清理，不强推。
- 首次运行已删除四个审阅通过且头 SHA 未改变的旧分支，远端仅保留 main / master / hexo。默认分支仍是 master，切换默认分支需要仓库管理入口；不影响 main 推送自动发布。
- 本轮直接回退点 `ba7a5f2b15abe8e46bbcd780700b21464ddd74b6`。回退要先暂停自动发布或同时撤销 main 中的对应修改，再用普通回退提交或 Vercel 提升已验证部署，避免下次 main 推送重新覆盖回退。
- 本轮未复测线上 PageSpeed 分数或浏览器动态评论 / 小猫交互，不将体积或缓存变化视作已测得的性能分数。

## 2026-10-02 SVG 图标、友链与历程发布

- 用户明确授权上线。源码 `2a376c12888e08e1f5102150653fe163876c1638` 已推送 feat/astro-migration；静态 master 普通快进到 `ba7a5f2b15abe8e46bbcd780700b21464ddd74b6`，449 个文件与 dist 完全一致。
- Vercel Production `6806159473`，北京时间 18:12:56 success；部署地址 https://blog-lepfkz226-ihoeys-projects.vercel.app。
- 范围：20 种 SVG 替换图标字体、21 张友链卡片两行简介等高、关于页 18 条历程（含 2021–2025 年维护）、恢复打赏记录下方 2017 年感想并补充 LeanCloud 宣布停服与 Hitalk 迁移记录。
- LeanCloud 官方公告时间已核实：2026-01-12 公告，2027-01-12 正式停服；未把未来停服写成已关闭。页面包含官方公告链接。
- 发布前 build 183 页、verify 182 旧地址 / 576 锚点、25 项测试、check 46 文件零诊断通过。最终补充的历史文案重新构建并验证旧链接通过。
- 正式域名 240 个页面 / 资源全部 200 且字节一致（一次临时 TLS 错误重试通过），未知路径 404，SW 退役脚本及 no-cache 响应头正确。浏览器确认关于页全部新增文案和历程显示；友链 21 卡片均 146.89px，SVG 哈希资源生效，无横向溢出。未发送真实评论、邮件或支付。
- 本轮回退基线：`8fed6f947ba4304c5c8a48e773ef8f1142a8a2ae`。本地校验记录：work/about-history/release-manifest.json 与 production-verification.json。
- 用户提到的 Actions 失败已定位：GitHub 自动生成的 `pages-build-deployment`（run 36994214269）仍使用 legacy Pages 配置 `master:/docs`，Jekyll 因目录不存在失败。Pages 无自定义域名，地址 https://ihoey.github.io/blog/；Vercel 正式检查成功，二者独立。当前仅调查，未变更 Pages 设置或停用工作流；建议后续停用遗留 Pages 自动部署。

## 2026-10-02 WebP 优化发布

- 本次用户明确授权发布 WebP 改动；源码 `18d1d41cdf04c9200e82482f7bce80316e425bf9` 已推送 feat/astro-migration。
- master 从 `8bbde7c4` 普通快进至 `8fed6f947ba4304c5c8a48e773ef8f1142a8a2ae`；448 个文件与 dist 逐字节一致。
- Vercel Production deployment `6805612187` 于北京时间 17:39:26 success；部署地址 `https://blog-kt1v7flo3-ihoeys-projects.vercel.app`。
- 本次直接回退点为 `8bbde7c4b9d7b4c38760147f71af24c0dcd9db7a`（首版 Astro），旧 Hexo 基线仍保留。
- 发布前：183 页构建、182 旧地址 / 576 锚点、25 项测试通过，check 45 文件零诊断。
- 正式浏览器：PWA 五张图使用本地 WebP，放大首图加载 CDN 4320px 原图，历史评论 34 条正常；展开侧栏后头像以 WebP 加载，宽 176px。
- 正式域名 239 个页面 / 资源 URL 全部校验通过，未知地址 404；移动 Lighthouse 复测首页 75、PWA 文章 81，报告无运行警告。
- 详细图片变化与上线后性能复测见 [WebP 优化记录](webp-optimization.md)。

## 2026-10-02 实际发布记录

- 用户明确授权执行上线；北京时间 17:10:04 Vercel 报告 Production success。
- 构建源码：`25c62b4ea4ea5a7a1304e1bcdcaa8b5d1874d704`，已推送 `feat/astro-migration`；后续文档提交不改变此次线上产物。
- 发布提交：`8bbde7c4b9d7b4c38760147f71af24c0dcd9db7a`，从旧 master 普通快进推送，无强推。
- 发布工作区：`/Users/ihoey/personal/project/blog-release-20261002`，本地分支 `release/astro-2026-10-02`。434 个文件与 dist 逐字节一致。
- Production deployment：`6805117372`，地址 `https://blog-2zk62g19w-ihoeys-projects.vercel.app`。正式域名保持 `https://blog.ihoey.com/`。
- 回退基线仍为 `88b1c01b7eb6e2b4fb0b85a9e0ccd963bab6653a`，对应旧部署 `6521818058`；旧 hexo 工作区未修改。

### 正式验收结果

- 发布前 build 183 页；verify 182 个历史地址 / 576 个锚点；22 项测试通过；check 44 文件零诊断。
- 正式域名检查 225 个页面 / 资源 URL，包括历史地址、目录形式入口、RSS / sitemap / robots / manifest、全部 JS / CSS / SVG，均 200 且响应字节与本地 dist 一致。两个临时 TLS 连接错误重试后通过；未知地址为真实 404。
- `/sw.js` 与退役脚本一致，Content-Type 为 `application/javascript; charset=utf-8`，Cache-Control 为 `no-cache, no-store, must-revalidate`。
- 上线前打开的旧正式站标签页在刷新后短暂显示旧 HTML，随后自动切为 Astro；本轮浏览器接口无法读取 SW 注册数，注册 / 缓存清除细节仍以此前独立 origin 专项结果为依据。
- 留言板 `/guestbook/index.html` 正确选中导航，使用 `/guestbook/` 身份并显示 114 条历史留言；PWA 多级旧文章显示 34 条历史评论。
- 浏览器验证图片放大 / 关闭、打赏二维码展开与图片加载、代码复制（剪贴板与原代码逐字一致）、页脚小猫展开；文章页未捕获 JavaScript error。
- 随机一言显示成功；百度 / 不蒜子脚本已插入正式页。统计后台计数未验收，不将脚本接入等同于后台入账。
- 未提交测试评论、点赞、邮件或支付。详细 HTTP 检查记录保存在本地忽略目录 `work/production-verification.json`。

## 已确认的发布来源（上线前基线）

- GitHub `ihoey/blog`：`hexo` 保存旧源码，`master` 保存静态产物。迁移源码在 `feat/astro-migration`，产物为 `dist/`。
- 正式域名 `https://blog.ihoey.com/` 当前 Server=Vercel；首页原始字节与 master 完全一致。
- 远端生产基线：`88b1c01b7eb6e2b4fb0b85a9e0ccd963bab6653a`。
- GitHub Production deployment `6521818058` 记录该 SHA，success；环境地址 `https://blog-bv382txj1-ihoeys-projects.vercel.app`。
- 旧源码远端基线：`57828763b8ef90ba74ad837cc42cbfa0c88e1530`。
- 本轮没有登录 Vercel 控制台核对内部项目设置。为减少切换面，继续使用已存在的 master 静态发布通道，不同时切换托管平台、构建预设或仓库来源。

## 当前发布流程（GitHub Actions）

1. 在 `main` 维护源码，按需使用 `pnpm dev` 或 `pnpm build && pnpm preview` 本地预览；日常发布不要求本地生成产物。
2. 提交并推送代码到 `main`。`.github/workflows/deploy.yml` 使用锁定依赖执行 check、test、build、verify；文档修改不触发发布，失败时不更新 master。
3. Actions 在独立 master checkout 同步 `dist/`，清理过期产物并排除 `.prerender`，普通快进推送；相同产物不产生重复提交。不要把 main 源码直接合并进 master，也不要手动逐文件上传产物。
4. 从 Actions 运行摘要记录源码 / master SHA；确认相应 master 提交的 Vercel 检查成功，再检查正式域名。Actions success 与 Vercel 上线分别确认。
5. 默认分支切到 main 后，也可以在 Actions 页面手动运行该工作流。本地构建只用于预览与排障，历史 Hexo / SCP 钩子和手动 worktree 发布均不作为当前维护流程。

## 切换后的验证

- 首页、一个多级分类 `.html` 旧链接、一级标题文章、关于 / 留言 / 友链 / 归档 / 标签 / 分类均正确加载；未知路径返回真实 404。
- `/atom.xml` 20 篇全文、两份 sitemap、robots、站长验证、图标与 manifest 均可访问。
- `/sw.js` 内容为退役 worker，`Content-Type: application/javascript`，不长时间缓存；用已有旧站缓存的浏览器验证一次自动接管，以及新访客不注册 worker。
- 正式评论与历史计数可读、三个页面身份与旧站一致；小猫、图片放大、代码复制、打赏展示可用。不以真实提交评论 / 支付来做无授权测试。
- 确认百度统计 / 不蒜子脚本实际加载；面板是否计入访客需要其后台验证，脚本加载成功不等于后台统计已验收。
- 检查控制台与资源错误、生产首页和产物版本一致。记录实际部署 ID、SHA、时间与最终结果。

## 回退

1. 最快办法是在 Vercel 将已验证的旧生产部署重新提升为 Production；执行前重新确认上述部署仍存在。
2. 先暂停自动发布或同时撤销 main 中对应的源码变更，避免下一次推送覆盖回退。Git 回退保留历史：若线上提交就是本次发布，撤销该发布提交后普通推送；若有后续提交，先审查差异，不直接 reset / force-push。
3. 回退到旧 HTML 后，其原脚本会重新注册旧 `/sw.js`；提前删除的旧缓存不会使文章丢失，只会重新从网络加载。
4. 回退后重复检查首页、旧文章、评论读取和 RSS，并记录生产提交。旧 `hexo` 工作目录一直保留，本轮没有改动。

## 已完成的本地缓存专项

独立 `127.0.0.1:4335` origin 使用原版 SW 安装并缓存旧首页。更新至当前退役 SW 后：自动刷新一次、新首页可读、注册数 0、旧缓存清除、无关测试缓存保留。测试服务器及临时页随后关闭。此项证明浏览器升级逻辑，不替代 Vercel 正式响应头与真实域名切换后的检查。
