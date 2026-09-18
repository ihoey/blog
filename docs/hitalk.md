# Hitalk 评论接入

当前主题 `themes/next` 使用 Hitalk SDK 3.0.0，API 为 `https://hitalk-next-api.ihoey.com/api`。配置集中在主题 `_config.yml` 的 `hitalk` 段，不再使用 LeanCloud 评论凭据和旧版 Hitalk CDN。

## 页面与历史数据

- 页面沿用 Hexo 的 `page.comments` 开关；没有评论容器的首页、归档等页面只加载文章评论数。
- 评论路径来自 Hexo 的页面路径，不包含域名、查询参数或片段。SDK 将末尾 `/index.html` 统一为 `/`，例如 `/guestbook/index.html` 对应历史 `/guestbook/`。
- 文章仍使用原有 `posts/:category/:year-:month-:day-:title.html` 路径，不改变永久链接。
- 新评论的标题来自当前页面标题；邮件链接指向博客。通知偏好由用户在评论框中选择。
- 匿名身份保存在当前浏览器的博客域名下。历史评论不能凭昵称或邮箱认领；示例站与博客也不共享浏览器存储。

## 加载与样式

SDK 的 CSS 在 `<head>` 中直接加载，两个脚本通过 `defer` 按顺序执行。SDK 文件随博客发布，文件名带内容摘要，避免旧缓存。`hitalk-host.css` 仅处理 NexT 全局链接和头像样式的冲突；原主题为浅色，沿用浅色。没有添加系统暗色切换。

SDK 来源、提交号和文件校验值记录在 `themes/next/source/lib/hitalk/3.0.0/manifest.json`。这些文件已允许提交到 Git。升级时在 `hitalk-next` 仓库运行 `pnpm run build:sdk`，复制新的 IIFE JS 和 CSS，以新内容摘要命名，同时更新 manifest 和主题 `hitalk.js` / `hitalk.css` 配置。无需发布 npm 包；不要复制环境配置或服务端凭据。

## 验证和发布

```sh
pnpm exec hexo generate
pnpm exec hexo server
```

本地预览也连接生产 API，手动发表评论会写入真实数据。自动接入检查只读生产数据或使用模拟响应，不发送评论或邮件。

博客现有 `start` / `deploy` 命令包含发布操作，`deployAfter` 还会执行服务器上传、源文件提交和推送。单纯构建使用上面的 `hexo generate`。
