# 图片 WebP 优化

日期：2026-10-02。状态：已发布至 master `8fed6f94`，Vercel Production success，线上验收与移动性能复测已完成。字体未改动。

## 体积对比

文件大小为实际编码后的字节数（不是网络传输估计）。

| 图片 | 原文件 | WebP | 减少 |
| --- | ---: | ---: | ---: |
| 树叶背景 | 682,387 B | 176,316 B | 74.2% |
| 头像 | 399,775 B | 7,782 B | 98.1% |
| PWA 大图 | 2,600,138 B | 76,896 B | 97.0% |

12 张文章图片合计：4,138,507 B → 1,002,974 B，减少 75.8%。另有 item2.png 转换后更大，保留原 PNG。

## 实现

- 树叶背景保留 2048×542 原尺寸，WebP q84；在 HTML 中 preload / fetchpriority=high，提前发现首屏背景。
- 头像按侧栏最大显示宽度 88px 生成 176px 版本（q88），保留原比例；侧栏 lazy / async，关于与友链页复用。对外头像地址、OG 图片及旧 PNG 地址仍保留。
- 9 张 PNG 截图采用无损 WebP；2 张 JPEG 采用 q88；PWA 手机拼图从 4320px 缩至 1600px、q88，适配 760px 正文及约 2 倍像素密度。正文提供固有宽高，减少图片到达后的布局跳动。
- CDN 原 imageView2 查询参数已无转换效果：即使 format/webp，实测响应仍是 image/png。生成的 WebP 随静态站托管，普通构建不依赖远端图片可用性。
- 使用 src/data/optimized-images.json 精确映射已转换图片；Markdown 和旧原始 HTML 渲染时替换 src，文章源文件保持原样。未知图片、GIF、二维码、已有 srcset 不替换。
- data-original-src 保留原文 URL，图集放大与“查看原图”继续读取原分辨率，RSS 正文输出绝对 WebP URL。
- 重生成命令：`python3 scripts/optimize-images.py`，需安装 cwebp；脚本检查源图 SHA-256，下载缓存写入 work/image-originals/，转换结果提交到 static/。升级编码器可能改变输出字节，需再次核对。

## 验证

- build 183 页面；verify 57 文章 / 182 旧地址 / 576 锚点通过；test 25 项通过；check 45 文件零诊断。
- 在独立构建预览 4336 验证：首页背景、PWA 五张图片的新地址和尺寸正确；点击首图加载 4320px 原图，查看原图链接保持原 URL。
- 侧栏打开前头像 naturalWidth=0，打开后为 176，验证按需加载；截图检查树叶图案与页面视觉。
- 已清理独立 dev 内容缓存并重启 4321，HTTP 确认开发预览也输出新的 WebP 地址。
- 已在正式域名按原 Lighthouse 13.5.0 移动端配置复测，结果如下。

## 发布与正式站复测

- 发布源码 `18d1d41c`，master `8fed6f94`；Vercel Production `6805612187` 于 2026-10-02 17:39:26（Asia/Shanghai）成功。本次回退点 `8bbde7c4`。
- 239 个页面 / 资源 URL 返回 200 且响应字节与 dist 一致（包括全部 14 个新 WebP）；两次 TLS 连接错误重试后正常。未知地址返回 404，SW 退役响应头保持正确。
- 正式浏览器确认：正文 WebP 地址、原图放大加载 4320px 图片、侧栏 176px WebP 头像、34 条历史评论均正常。
- 以下是同机、同 Lighthouse 13.5.0、同 Chrome 155、同模拟移动端节流配置的正式域名测试；每组单次有效结果，无运行警告，不是多轮中位数。网络与第三方服务变化也会影响分数，不能把全部分差都归因于图片转换。此轮未重测桌面端。

| 页面 | 指标 | 优化前 | 上线后 |
| --- | --- | ---: | ---: |
| 首页 | Performance | 58 | 75 |
| 首页 | FCP | 4.7 s | 3.2 s |
| 首页 | LCP | 10.0 s | 4.1 s |
| 首页 | TBT | 0 ms | 0 ms |
| 首页 | CLS | 0.005 | 0.001 |
| 首页 | 整轮传输量 | Total size was 2,728 KiB | Total size was 1,843 KiB |
| PWA 文章 | Performance | 58 | 81 |
| PWA 文章 | FCP | 4.3 s | 2.6 s |
| PWA 文章 | LCP | 11.1 s | 3.3 s |
| PWA 文章 | TBT | 0 ms | 0 ms |
| PWA 文章 | CLS | 0.092 | 0.053 |
| PWA 文章 | 整轮传输量 | Total size was 5,258 KiB | Total size was 1,906 KiB |

原始 HTML / JSON 在 `work/lighthouse-webp-2026-10-02/`；线上 HTTP 校验记录在 `work/webp-production-verification.json`。以上是冷加载模拟测试，未测真实用户 INP；字体优化仍可作为下一项独立工作。
