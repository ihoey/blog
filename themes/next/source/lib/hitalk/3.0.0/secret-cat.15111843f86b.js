// Optional host-page easter egg. Independent of comment data and the SDK.
;(function () {
  document.querySelectorAll('[data-hitalk-secret]').forEach(root => {
    if (root.dataset.ready) return
    root.dataset.ready = 'true'
    const button = root.querySelector('button')
    if (!button) return
    root.insertAdjacentHTML(
      'beforeend',
      `<span class="hitalk-secret-visitor" aria-hidden="true">
        <span class="hitalk-secret-caption">喵，被你发现啦。</span>
        <svg width="80" height="64" viewBox="0 0 80 64" fill="none">
          <path class="hitalk-secret-fur" d="M15 38 12 9c0-3 2-4 4-2l16 13a38 38 0 0 1 16 0L64 7c2-2 4-1 4 2l-3 29c5 22-55 22-50 0Z" />
          <path d="m19 17 2 14 7-7m33-7-2 14-7-7" stroke="#c18b7e" stroke-width="3" stroke-linecap="round" />
          <path d="M25 37q4-5 8 0m14 0q4-5 8 0M37 42l3 2 3-2m-3 2v3m0 0q-4 4-7 0m7 0q4 4 7 0M15 41l-8-2m8 7-8 1m58-6 8-2m-8 7 8 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path class="hitalk-secret-fur" d="M20 58v-5a6 6 0 0 1 12 0v5m16 0v-5a6 6 0 0 1 12 0v5" />
          <path d="M13 59h54" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </span><span class="hitalk-secret-message" role="status" aria-live="polite"></span>`
    )
    const message = root.querySelector('.hitalk-secret-message')
    let taps = 0
    let resetTimer
    let hideTimer
    function close() {
      clearTimeout(resetTimer)
      clearTimeout(hideTimer)
      taps = 0
      root.dataset.open = 'false'
      button.textContent = '☆'
      message.textContent = ''
    }
    button.addEventListener('click', () => {
      clearTimeout(resetTimer)
      if (root.dataset.open === 'true') {
        close()
        return
      }
      taps++
      button.textContent = taps === 1 ? '✧' : '✦'
      if (taps < 3) {
        resetTimer = setTimeout(close, 1800)
        return
      }
      root.dataset.open = 'true'
      message.textContent = '喵，被你发现啦。'
      hideTimer = setTimeout(close, 3200)
    })
    button.addEventListener('keydown', event => {
      if (event.key === 'Escape') close()
    })
    window.addEventListener('pagehide', close)
  })
})()
