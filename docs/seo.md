# 工程 SEO（2026-10-30）

## 范围

用户只授权本轮工程优化，明确不批量修改历史文章。source/ 下的文章与独立页、历史日期 / URL / 分类标签、迁移基线保持原样；不重写文章、不根据部署时间制造新鲜度、不自动挑选正文图片充当封面。

## 实现

- src/data/site.ts 单独维护站点 SEO 描述；保留首页寄语和友链交换描述。
- src/lib/seo.mjs 生成关联的 WebSite / Person / WebPage / BlogPosting 图谱。作者页使用 AboutPage，作者及发布者指向真实个人；文章配图只有显式配置 image 才输出，不将头像伪装为正文配图。
- Base.astro 统一 canonical、OG、Twitter、结构化数据。错误页显式 noindex，不输出内容图谱。列表页的 SEO 标题单独带页码，界面标题和伊布文案不受影响；列表元描述包含主题、总篇数及分页位置。
- 新增可选 seoDescription、updated、image。seoDescription 不参与首页预览或 Atom summary；历史文章没有新增这些字段，沿用既有摘要。updated → 历史映射 → 发布日期按顺序回退；显式时间必须有效且不早于发表时间。同日有实际更新也显示更新日期，所有输出共用同一个时间。
- Vercel 为 /atom.xml 显式设置 application/atom+xml; charset=utf-8；保留现有全文 HTML Atom、20 篇条目、自链接和旧文章 ID，不改订阅协议。
- scripts/verify-seo.mjs 纳入 pnpm verify，验证全站元数据和图谱、文章可见日期 / JSON-LD / Atom / 两份 sitemap 一致性、错误页 noindex 及 Atom 响应头配置。单元测试覆盖日期回退 / 拒绝倒退、分页隔离、图谱引用和按需配图。

写作字段格式见 [开发说明](migration/development.md)。没有增加网页端依赖，也没有添加 llms.txt / FAQ 堆叠标记。

## 验证与后续

本地结果以 docs/astro-migration.md 本轮记录为准；本地只能核对托管响应头配置，不能宣称线上响应已变更或排名提高。遵照用户约定，推送后不等待 / 轮询 Actions 或 Vercel。

工程优化之后，下一步是只读检查 Search Console 的站点地图、索引覆盖和抓取问题；Cloudflare robots / WAF / bot 规则需结合账户真实设置检查。本轮未操作这些后台，未改变爬虫访问策略。用户已排除本轮历史文章内容改写，不将文章改写列作强制待办。

参考依据：

- [Google：元描述与搜索摘要](https://developers.google.com/search/docs/appearance/snippet)：搜索引擎可自行选择摘要，元描述不是固定展示承诺。
- [Google：文章结构化数据](https://developers.google.com/search/docs/appearance/structured-data/article)：提供真实作者、日期、相关图片。
- [Google：发表 / 更新日期](https://developers.google.com/search/docs/appearance/publication-dates)：可见日期与结构化数据一致，不为非实质更新刷新时间。
