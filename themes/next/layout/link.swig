<blockquote class="blockquote-center">{{ page.quotes }}</blockquote>
<h2>Blog friends</h2>
<ul class="ihoey-links">
  {% for e,i in site.data.links %}
    <li class="ihoey-links-item">
        <a href="{{ i.link }}" class="group-picture" title="{{ i.name }}" target="_blank">
            {% if i.avatar %}
              <img src="{{ i.avatar }}" alt="{{ i.name }}" title="{{ i.name }}" height="72px" width="72px" />
              {% else %}
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-{{e+1}}" id="link"></use>
              </svg>
            {% endif %}
            <h3 class="ihoey-links-title" title="{{ i.name }}">{{ i.name }}</h3>
            <p class="ihoey-links-des" title="{{ i.description }}">{{ i.description }}</p>
        </a>
    </li>
  {% endfor %}
</ul>
<hr>
{% for i in page.declare %}
    <span>{{ i }}</span><br />
{% endfor %}
<hr>
<h3>友情链接添加须知</h3>
<ul style="padding: 0">
  {% for i in page.addNotes %}
      <li>{{ i }}</li>
  {% endfor %}
</ul>
<hr>
<h3>本站链接信息</h3>
<ul style="padding: 0">
    <li>名称：{{ config.title }}</li>
    <li>地址：
        <a href="{{ config.url }}">{{ config.url }}</a>
    </li>
    <li>描述：{{ config.description }}</li>
    <li>图片：
        <a href="{{ config.avatar }}" rel="noopener" target="_blank">{{ config.avatar }}</a>
    </li>
</ul>
<hr>
