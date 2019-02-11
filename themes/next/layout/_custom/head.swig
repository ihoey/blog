{#
Custom head.
#}
{% if page.keywords %}
  <meta name="keywords" content="{{ page.keywords }}" />
{% elif page.tags and page.tags.length %}
  <meta name="keywords" content="{% for tag in page.tags %}{{ tag.name }},{% endfor %}" />
{% elif theme.keywords %}
  <meta name="keywords" content="{{ theme.keywords }}" />
{% endif %}
<link rel="dns-prefetch" href="https://app-router.leancloud.cn/">
<script defer async src="/js/src/set.js"></script>
