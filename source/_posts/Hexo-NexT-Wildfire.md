---
title: 在Hexo博客 NexT主题中部署Wildfire评论系统
date: 2018-01-30 12:14:00
tags:
  - comment
categories: Linux
---

前一段时间，发现了一个评论系统很好用，果断把这个评论系统换到自己的博客里了。

所以本文主要讲在 `Hexo` 的 `NexT` 主题中如何使用 `Wildfire` ，至于其他的博客以及其他的主题中如何使用的问题，我就不多说了。有需求的朋友可以去项目主页提问，或者在这里提问也可以。如果我懂得话一定会回答的。

<!--more-->

## 修改 NexT 评论模板

在你的博客项目中，打开./themes/next/layout/_partials/comments.swig 这个文件。
将文件尾部的内容：

```html
{% if page.comments %}
  <div class="comments" id="comments">
    ...
    ...
    {% elseif theme.livere_uid %}
      <div id="lv-container" data-id="city" data-uid="{{ theme.livere_uid }}"></div>
      <!-- 添加内容的位置在这里 -->
    {% endif %}
  </div>
{% endif %}
```

修改为成下面的内容：

```html
{% if page.comments %}
  <div class="comments" id="comments">
    ...
    ...
    {% elseif theme.livere_uid %}
      <div id="lv-container" data-id="city" data-uid="{{ theme.livere_uid }}"></div>
    {% elseif theme.wildfire.enable %}
      <style type="text/css">
        .wildfire_thread a {border-bottom: none}
      </style>
      <div class="wildfire_thread"></div>
      <script type="text/javascript">
        var wildfireConfig = () => ({
          databaseProvider: '{{ theme.wildfire.database_provider }}',
          databaseConfig: {
          {% if (theme.wildfire.database_provider) === 'wilddog' %}
            siteId: '{{ theme.wildfire.site_id }}'
          {% elseif (theme.wildfire.database_provider) === 'firebase' %}
            apiKey: '{{ theme.wildfire.api_key }}',
            authDomain: '{{ theme.wildfire.auth_domain }}',
            databaseURL: '{{ theme.wildfire.database_url }}',
            projectId: '{{ theme.wildfire.project_id }}',
            storageBucket: '{{theme.wildfire.storage_bucket}}',
            messagingSenderId: '{{theme.wildfire.messaging_sender_id}}'
          {% endif %}
          },
          theme: '{{theme.wildfire.theme}}',
          locale: '{{theme.wildfire.locale}}'
        })
      </script>
      <script src='https://unpkg.com/wildfire/dist/wildfire.auto.js'></script>
    {% endif %}
  </div>
{% endif %}
```

然后保存。

## 增加设置内容

打开主题设置文件 `./themes/next/_config.yml`，注意：不是站点设置文件。
将下面的代码复制到合适的位置（包含全部注释）：

```yaml
# Wildfire Support
wildfire:
  ## 开启Wildfire支持
  enable: true
  ## 主题颜色，目前可选值为light/dark两种，默认为light
  theme: light
  ## 系统语言，目前可选值为en/zh-CN两种，默认为en
  locale: zh-CN
  ## Wilddog配置
  database_provider: wilddog
  site_id: site_id
  avatarURL: https://image.flaticon.com/icons/svg/621/621863.svg
  ## Firebase配置
  # database_provider: firebase
  # api_key: apiKey
  # auth_domain: authDomain
  # database_url: databaseURL
  # project_id: projectId
  # storage_bucket: storageBucket
  # messaging_sender_id: messagingSenderId
```

需要注意的是，复制的时候不要修改这个配置的缩进关系。另外 `Wilddog` 和 `Firebase` 两者的配置只能选择其一。比如要使用 `Wilddog` 的话，配置内容就如下：

```yaml
wildfire:
  enable: true
  theme: light
  locale: zh-CN
  database_provider: wilddog
  site_id: wdg_my_site_id
```

如果要使用 `Firebase` 则配置选择为如下：

```yaml
wildfire:
  enable: true
  theme: light
  locale: zh-CN
  database_provider: firebase
  api_key: your_apiKey
  auth_domain: your_authDomain
  database_url: your_databaseURL
  project_id: your_projectId
  storage_bucket: your_storageBucket
  messaging_sender_id: your_messagingSenderId
```

上面的值呢，就需要大家从自己建好的 `APP` 应用中拷贝过来了。

## 完成部署

下面就可以直接 `hexo generate` 生成就可以了。很简单吧~
当然如果还有什么问题，欢迎在这里提问哦。
