# Hitalk 评论接入

当前 Astro 分支沿用 Hitalk SDK 3.0.0 与 `https://hitalk-next-api.ihoey.com/api`，不迁移评论数据库，不改变历史评论关联。

## 当前实现

- `src/lib/comments.ts`：按需加载 SDK、挂载评论和读取文章评论数。API 地址和 SDK 脚本路径在这里维护。
- `src/components/Comments.astro`：评论容器与页面标识。
- `src/layouts/Base.astro`：SDK CSS、页脚小猫的资源引用。
- `src/styles/global.css`、`src/styles/v2.css`：站点内的评论布局。
- `static/lib/hitalk/3.0.0/manifest.json`：SDK 与小猫资源的来源、版本及 SHA-256；资源随站发布。

仅正式域名 `blog.ihoey.com` 挂载评论和读取评论数。本地开发 / 预览显示说明，不加载可写入生产的评论组件，没有查询参数绕过方式。自动验证只读数据或使用模拟响应，不发真实评论、邮件或点赞。

2026-10-02 性能优化：正式站评论容器进入视口周边 300px 时才挂载 SDK；不支持 IntersectionObserver 的浏览器立即挂载。文章评论数仍按原规则读取，页面标识与 API 不变。评论及页脚小猫的外置 CSS 异步加载，避免阻塞正文；历史评论里的额外文字通过完整文楷 fallback 补字。

## 页面标识

评论标识使用页面路径，不包含域名、查询参数或片段；末尾 `/index.html` 归一为 `/`。留言板保持 `/guestbook/`，文章继续保留分类大小写、多级分类和 `.html` 后缀。

匿名身份仍属于原浏览器和博客域名。SDK 的通知偏好由访客自己选择，不自动替用户变更。

## 升级与验证

升级 SDK 时，在 `hitalk-next` 仓库构建 SDK，将产物放入 `static/lib/hitalk/`，使用带摘要的文件名，同步更新 manifest、`comments.ts` 和 `Base.astro` 中实际使用的资源路径。保留来源与授权记录，不复制服务端配置或凭据。

本地验证：

```sh
pnpm build && pnpm verify && pnpm test && pnpm check
```

`pnpm verify` 对发布目录里的 SDK 和小猫资源执行摘要校验，并核对文章评论路径。2026-10-02 已上线并核对正式读取：留言板 114 条、PWA 文章 34 条历史评论正常显示，未写入测试评论。

旧 Hexo 上线版本、验收结果与小动画说明见 [历史接入记录](archive/hitalk-hexo-history.md)。其中的主题路径和 Hexo 命令只描述当时的实现，不适用于当前分支。
