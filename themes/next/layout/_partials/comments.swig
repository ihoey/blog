{% if page.comments %}
  <div class="comments" id="comments">
    {% if (theme.duoshuo and theme.duoshuo.shortname) or theme.duoshuo_shortname %}
      <div class="ds-thread" data-thread-key="{{ page.path }}"
           data-title="{{ page.title }}" data-url="{{ page.permalink }}">
      </div>
    {% elseif theme.facebook_sdk.enable and theme.facebook_comments_plugin.enable %}
      <div class="fb-comments"
           data-href="{{ page.permalink }}"
           data-numposts="{{ theme.facebook_comments_plugin.num_of_posts }}"
           data-width="{{ theme.facebook_comments_plugin.width }}"
           data-colorscheme="{{ theme.facebook_comments_plugin.scheme }}">
      </div>
    {% elseif theme.disqus_shortname %}
      <div id="disqus_thread">
        <noscript>
          Please enable JavaScript to view the
          <a href="//disqus.com/?ref_noscript">comments powered by Disqus.</a>
        </noscript>
      </div>
    {% elseif theme.hypercomments_id %}
      <div id="hypercomments_widget"></div>
    {% endif %}
    <!-- 在需要展示评论框处插入 -->
    {# <div class="cm-article" data-key=""></div> #}
    <!-- </body> 标签结束前插入 -->
    {# <link rel="stylesheet" href="//comment.moe/dest/static/css/plus.css"> #}
    {# <script src="//comment.moe/dest/static/js/build.js" charset="UTF-8"></script> #}
    {# <script>
      window.onload = function () {
        $('#comments .cm-article').attr('data-key', window.document.location.pathname);
        window.萌评.运转();
      }
    </script> #}
    <div class="wildfire_thread"></div>
    <script>
      // Random body background dark color
      // document.body.style.background = `hsl(${Math.random()*360}, 80%, 10%)`
      var wildfireConfig = () => ({
        databaseProvider: 'wilddog',
        databaseConfig: {
          siteId: 'ihoey'
        },
        pageURL: document.URL,
        pageTitle: document.title,
        theme: 'light',
        // theme: 'dark',
        // locale: 'en'
        locale: 'zh-CN'
      })
    </script>
    <script src="https://unpkg.com/@chengkang/wildfire/dist/wildfire.auto.js"></script>
  </div>
{% endif %}
