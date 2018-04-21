{% if page.comments %}

  {% if theme.facebook_sdk.enable and theme.facebook_comments_plugin.enable %}
    <div class="comments" id="comments">
      <div class="fb-comments"
           data-href="{{ page.permalink }}"
           data-numposts="{{ theme.facebook_comments_plugin.num_of_posts }}"
           data-width="{{ theme.facebook_comments_plugin.width }}"
           data-colorscheme="{{ theme.facebook_comments_plugin.scheme }}">
      </div>
    </div>

  {% elseif theme.vkontakte_api.enable and theme.vkontakte_api.comments %}
    <div class="comments" id="comments">
      <div id="vk_comments"></div>
    </div>

  {% elseif theme.disqus.enable %}
    <div class="comments" id="comments">
      <div id="disqus_thread">
        <noscript>
          Please enable JavaScript to view the
          <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
        </noscript>
      </div>
    </div>

  {% elseif theme.hypercomments_id %}
    <div class="comments" id="comments">
      <div id="hypercomments_widget"></div>
    </div>

  {% elseif theme.youyan_uid %}
    <div class="comments" id="comments">
      <div id="uyan_frame"></div>
    </div>

  {% elseif theme.livere_uid %}
    <div class="comments" id="comments">
      <div id="lv-container" data-id="city" data-uid="{{ theme.livere_uid }}"></div>
    </div>

  {% elseif theme.changyan.enable and theme.changyan.appid and theme.changyan.appkey %}
    <div class="comments" id="comments">
      <div id="SOHUCS"></div>
    </div>

  {% elseif theme.gitment.enable %}
    <div class="comments" id="comments">
      {% if theme.gitment.lazy %}
        <div onclick="showGitment()" id="gitment-display-button">{{ __('gitmentbutton') }}</div>
        <div id="gitment-container" style="display:none"></div>
      {% else %}
        <div id="gitment-container"></div>
      {% endif %}
    </div>

  {% elseif theme.hitalk.enable and theme.hitalk.appid and theme.hitalk.appkey %}
    <div class="comments" id="comments">
    </div>
  {% elseif theme.wildfire.enable %}
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
          pageURL: '{{ page.permalink }}',
          pageTitle: '{{ page.title }}',
          theme: '{{theme.wildfire.theme}}',
          locale: '{{theme.wildfire.locale}}',
          defaultAvatarURL: '{{theme.wildfire.avatarURL}}'
        })
      </script>
      <script src='https://unpkg.com/wildfire@0.3.8/dist/wildfire.auto.js'></script>
    {% endif %}

{% endif %}
