(function () {
  'use strict';

  // Deferred scripts run in document order, after the comment container exists.
  var settings = document.currentScript.dataset;
  var container = document.querySelector('#comments[data-hitalk-path]');
  var counters = document.querySelectorAll('.hitalk-comment-count[data-xid]');
  var sdk = window.Hitalk;

  function showUnavailable() {
    if (!container) return;
    var message = document.createElement('p');
    message.setAttribute('role', 'status');
    message.textContent = '评论暂时无法加载，请刷新页面重试。';
    container.replaceChildren(message);
  }

  if (!sdk || typeof sdk.mount !== 'function') {
    showUnavailable();
    return;
  }

  if (container) {
    try {
      sdk.mount(container, {
        server: settings.hitalkServer,
        path: sdk.normalizePagePath(container.dataset.hitalkPath),
        title: container.dataset.hitalkTitle,
        placeholder: settings.hitalkPlaceholder,
        avatar: settings.hitalkAvatar,
        pageSize: Number(settings.hitalkPageSize)
      });
    } catch (error) {
      showUnavailable();
      console.error('Hitalk initialization failed:', error);
    }
  }

  // Index/archive pages need counts even when they have no comment editor.
  if (counters.length) {
    sdk.fillCommentCounts({ server: settings.hitalkServer }).catch(function () {
      counters.forEach(function (counter) {
        counter.textContent = '—';
        counter.title = '评论数暂时无法加载';
      });
    });
  }
})();
