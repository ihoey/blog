{% if theme.hitalk.enable and theme.hitalk.server %}
  <script defer src="{{ url_for(theme.hitalk.secret_js) }}"></script>
  <script defer src="{{ url_for(theme.hitalk.js) }}"></script>
  <script defer src="{{ url_for('/js/src/hitalk.js') }}?v=3.0.0"
          data-hitalk-server="{{ theme.hitalk.server | escape }}"
          data-hitalk-placeholder="{{ theme.hitalk.placeholder | escape }}"
          data-hitalk-avatar="{{ theme.hitalk.avatar | escape }}"
          data-hitalk-page-size="{{ theme.hitalk.pageSize | escape }}"></script>
{% endif %}
