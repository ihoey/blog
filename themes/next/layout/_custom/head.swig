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

<script src="/js/src/set.js"></script>
<script src="//at.alicdn.com/t/font_578712_g26jo2kbzd5qm2t9.js"></script>
