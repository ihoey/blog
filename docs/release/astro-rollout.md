# Astro 上线准备与回退

日期：2026-10-02。状态：**已上线，Vercel Production success；正式域名验收通过**。

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

## 发布前执行

1. 保持迁移工作区干净，记录迁移源码提交。运行 `pnpm build && pnpm verify && pnpm test && pnpm check`。
2. 复查用户最新预览反馈；随机一言恢复，离线功能明确暂缓。百度 / 不蒜子沿用，Google 旧 UA 不加载；若本次需要 GA4，先取得有效公开 G- ID 再验证。
3. 再查询远端 master SHA；如果已经变化，先检查新变更，不能覆盖其他发布。
4. 从最新 master 创建临时发布 worktree / 分支，把 **dist 内容**同步到发布 worktree 根目录。保留 `.git`，清除不再使用的旧主题产物；包含 `sw.js`、`vercel.json`、站长验证文件、所有图标、字体、SDK 与二维码。不运行旧 Hexo deploy、SCP 或自动推送脚本。
5. 复核发布 diff、关键文件数量和摘要，产出可审阅的发布提交及回退基线。源码和产物分支分别记录，不强推历史。
6. 若需要 Vercel Preview，先在发布窗口明确预览分支安排；本地评论依然禁止生产写入。未创建 Preview 部署不能写成已验证。
7. 最后执行 master 的普通快进推送，等待 Production deployment success。2026-10-02 已完成。

## 切换后的验证

- 首页、一个多级分类 `.html` 旧链接、一级标题文章、关于 / 留言 / 友链 / 归档 / 标签 / 分类均正确加载；未知路径返回真实 404。
- `/atom.xml` 20 篇全文、两份 sitemap、robots、站长验证、图标与 manifest 均可访问。
- `/sw.js` 内容为退役 worker，`Content-Type: application/javascript`，不长时间缓存；用已有旧站缓存的浏览器验证一次自动接管，以及新访客不注册 worker。
- 正式评论与历史计数可读、三个页面身份与旧站一致；小猫、图片放大、代码复制、打赏展示可用。不以真实提交评论 / 支付来做无授权测试。
- 确认百度统计 / 不蒜子脚本实际加载；面板是否计入访客需要其后台验证，脚本加载成功不等于后台统计已验收。
- 检查控制台与资源错误、生产首页和产物版本一致。记录实际部署 ID、SHA、时间与最终结果。

## 回退

1. 最快办法是在 Vercel 将已验证的旧生产部署重新提升为 Production；执行前重新确认上述部署仍存在。
2. Git 回退保留历史：若线上提交就是本次发布，撤销该发布提交后普通推送；若有后续提交，先审查差异，不直接 reset / force-push。
3. 回退到旧 HTML 后，其原脚本会重新注册旧 `/sw.js`；提前删除的旧缓存不会使文章丢失，只会重新从网络加载。
4. 回退后重复检查首页、旧文章、评论读取和 RSS，并记录生产提交。旧 `hexo` 工作目录一直保留，本轮没有改动。

## 已完成的本地缓存专项

独立 `127.0.0.1:4335` origin 使用原版 SW 安装并缓存旧首页。更新至当前退役 SW 后：自动刷新一次、新首页可读、注册数 0、旧缓存清除、无关测试缓存保留。测试服务器及临时页随后关闭。此项证明浏览器升级逻辑，不替代 Vercel 正式响应头与真实域名切换后的检查。
