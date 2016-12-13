<div class="copyright" >
  {% set current = date(Date.now(), "YYYY") %}
  &copy; {% if theme.since and theme.since != current %} {{ theme.since }} - {% endif %}
  <span itemprop="copyrightYear">{{ current }}</span>
  <span class="with-love">
    <i class="fa fa-{{ theme.authoricon }}"></i>
  </span>
  <span class="author" itemprop="copyrightHolder">{{ config.author }}</span>
</div>

{% if theme.copyright %}
<div class="powered-by">
  {{ __('footer.powered', '<a class="theme-link" href="https://hexo.io">Hexo</a>') }}
</div>

<div class="theme-info">
  {{ __('footer.theme') }} -
  <a class="theme-link" href="https://github.com/iissnan/hexo-theme-next">
    NexT.{{ theme.scheme }}
  </a>
</div>
{% endif %}

<div class="eevee">
  <div class="body">
    <div class="head">
      <div class="ears">
        <div class="ear">
          <div class="lobe"></div>
        </div>
        <div class="ear">
          <div class="lobe"></div>
        </div>
      </div>
      <div class="face">
        <div class="eyes">
          <div class="eye">
            <div class="eyelid"></div>
          </div>
          <div class="eye">
            <div class="eyelid"></div>
          </div>
        </div>
        <div class="nose"></div>
        <div class="mouth"></div>
      </div>
    </div>
    <div class="chest">
      <div class="fur">
        <div class="patch"></div>
      </div>
      <div class="fur">
        <div class="patch"></div>
      </div>
      <div class="fur">
        <div class="patch"></div>
      </div>
    </div>
    <div class="legs">
      <div class="leg">
        <div class="inner-leg"></div>
      </div>
      <div class="leg">
        <div class="inner-leg"></div>
      </div>
      <div class="leg">
        <div class="inner-leg"></div>
      </div>
      <div class="leg">
        <div class="inner-leg"></div>
      </div>
    </div>
    <div class="tail">
      <div class="tail">
        <div class="tail">
          <div class="tail">
            <div class="tail">
              <div class="tail -end"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
