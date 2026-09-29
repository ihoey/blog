const root = document.documentElement;
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const save = (key: string, value: string) => { try { localStorage.setItem(key, value); } catch {} };
const themeButton = document.querySelector<HTMLButtonElement>('.theme-toggle');
const effectsButton = document.querySelector<HTMLButtonElement>('.effects-toggle');
const updateControls = () => {
  const dark = root.dataset.theme === 'dark';
  themeButton?.setAttribute('aria-label', dark ? '切换到日间主题' : '切换到夜间主题');
  themeButton?.querySelector('.icon')?.classList.toggle('icon-sun', dark);
  themeButton?.setAttribute('title', dark ? '切换到日间主题' : '切换到夜间主题');
  const effectsEnabled = root.dataset.effects !== 'off';
  effectsButton?.setAttribute('aria-pressed', String(effectsEnabled));
  effectsButton?.setAttribute('title', effectsEnabled ? '关闭个性效果' : '开启个性效果');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#191816' : '#fbfaf8');
};
updateControls();
themeButton?.addEventListener('click', () => {
  const apply = () => { root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'; save('blog-theme', root.dataset.theme); updateControls(); };
  if (document.startViewTransition && !motion.matches && root.dataset.effects !== 'off') {
    themeButton.disabled = true;
    const transition = document.startViewTransition(apply);
    void transition.finished.catch(() => {}).finally(() => { themeButton.disabled = false; });
  } else apply();
});
effectsButton?.addEventListener('click', () => { root.dataset.effects = root.dataset.effects === 'off' ? 'on' : 'off'; save('blog-effects', root.dataset.effects); updateControls(); window.dispatchEvent(new Event('blog:effectschange')); });
const uptime = document.querySelector<HTMLElement>('[data-uptime]');
if (uptime) { const days = Math.max(0, Math.floor((Date.now() - Date.parse('2015-12-21T00:00:00+08:00')) / 86400000)); uptime.textContent = `${days.toLocaleString('zh-CN')} 天`; }
const topButton = document.querySelector<HTMLButtonElement>('.back-top');
const progress = document.querySelector<HTMLElement>('#reading-progress');
let scheduled = false;
function updateScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const fraction = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
  if (progress) progress.style.transform = `scaleX(${fraction})`;
  if (topButton) topButton.hidden = scrollY < 250;
  scheduled = false;
}
addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); } }, { passive: true });
addEventListener('resize', updateScroll); updateScroll();
topButton?.addEventListener('click', () => scrollTo({ top: 0, behavior: motion.matches ? 'instant' : 'smooth' }));
let hearts = 0;
document.addEventListener('click', event => {
  if (root.dataset.effects === 'off' || motion.matches || event.detail === 0 || hearts >= 8) return;
  if (!(event.target instanceof Element) || event.target.closest('a,button,input,textarea,select,pre,code,[contenteditable]') || getSelection()?.toString()) return;
  const heart = document.createElement('span'); heart.textContent = '♥'; heart.className = 'click-heart'; heart.setAttribute('aria-hidden','true'); heart.style.left = `${event.clientX - 8}px`; heart.style.top = `${event.clientY - 8}px`; document.body.append(heart); hearts++;
  setTimeout(() => { heart.remove(); hearts--; }, 900);
});
const originalTitle = document.title;
document.addEventListener('visibilitychange', () => { document.title = document.hidden && root.dataset.effects !== 'off' ? '歇一会儿，小栈等你回来 · 梦魇小栈' : originalTitle; });
