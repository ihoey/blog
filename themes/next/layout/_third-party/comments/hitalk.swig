{% if theme.hitalk.enable and theme.hitalk.appid and theme.hitalk.appkey %}
  <script src="//cdn1.lncld.net/static/js/3.0.4/av-min.js"></script>
  <script src="//cdn.dode.top/Hitalk.min.js"></script>

  <script type="text/javascript">
    var GUEST = ['nick','mail','link'];
    var guest = '{{ theme.hitalk.guest_info }}';
    guest = guest.split(',').filter(item=>{
      return GUEST.indexOf(item)>-1;
    });
    new Hitalk({
        el: '#comments' ,
        verify: {{ theme.hitalk.verify }},
        notify: {{ theme.hitalk.notify }},
        appId: '{{ theme.hitalk.appid }}',
        appKey: '{{ theme.hitalk.appkey }}',
        placeholder: '{{ theme.hitalk.placeholder }}',
        avatar:'{{ theme.hitalk.avatar }}',
        guest_info:guest,
        pageSize:'{{ theme.hitalk.pageSize }}' || 10,
    });
  </script>
{% endif %}
