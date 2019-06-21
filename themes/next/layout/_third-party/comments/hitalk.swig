{% if theme.hitalk.enable and theme.hitalk.appid and theme.hitalk.appkey %}
  <script src="//avoscloud.com/static/js/3.0.4/av-min.js"></script>
  {% set hitalk_uri = '//unpkg.com/hitalk/dist/Hitalk.min.js' %}
  {% if theme.vendors.hitalk %}
    {% set hitalk_uri = theme.vendors.hitalk %}
  {% endif %}
  <script src="{{ hitalk_uri }}"></script>

  <script type="text/javascript">
    var GUEST = ['nick','mail','link'];
    var guest = '{{ theme.hitalk.guest_info }}';
    guest = guest.split(',').filter(function (item) {
      return GUEST.indexOf(item)>-1;
    });
    new Hitalk({
        el: '#comments' ,
        appId: '{{ theme.hitalk.appid }}',
        appKey: '{{ theme.hitalk.appkey }}',
        placeholder: '{{ theme.hitalk.placeholder }}',
        avatar: '{{ theme.hitalk.avatar }}',
        guest_info: guest,
        pageSize: {{ theme.hitalk.pageSize }} || 10,
    });
  </script>
{% endif %}
