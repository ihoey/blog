// Finish upgrading visitors who still have the Hexo worker controlling this origin.
if (location.hostname === 'blog.ihoey.com' && 'serviceWorker' in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then((registrations) => {
      for (const registration of registrations) {
        const worker =
          registration.active ||
          registration.waiting ||
          registration.installing;
        if (worker && new URL(worker.scriptURL).pathname === '/sw.js')
          void registration.update().catch(() => {});
      }
    })
    .catch(() => {});
}
document.querySelectorAll<HTMLElement>('.prose pre').forEach((pre) => {
  const code = pre.querySelector('code');
  if (!code) return;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'copy-code';
  button.textContent = '复制';
  button.setAttribute('aria-label', '复制代码');
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code.textContent || '');
      button.textContent = '已复制';
      window.dispatchEvent(new Event('blog:copied'));
    } catch {
      button.textContent = '请手动复制';
    }
    window.setTimeout(() => {
      button.textContent = '复制';
    }, 1800);
  });
  const wrapper = document.createElement('div');
  wrapper.className = 'code-block';
  const label = document.createElement('span');
  label.className = 'code-language';
  label.textContent =
    pre.dataset.language || code.className.replace('language-', '') || 'CODE';
  pre.replaceWith(wrapper);
  wrapper.append(label, button, pre);
});
