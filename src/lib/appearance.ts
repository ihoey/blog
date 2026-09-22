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
  effectsButton?.setAttribute('aria-pressed', String(root.dataset.effects !== 'off'));
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#151c29' : '#fcfafb');
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
effectsButton?.addEventListener('click', () => { root.dataset.effects = root.dataset.effects === 'off' ? 'on' : 'off'; save('blog-effects', root.dataset.effects); updateControls(); });
const bubble = document.querySelector<HTMLElement>('.companion-message');
let greeting = 0;
let bubbleTimer: ReturnType<typeof setTimeout>;
const say = (text: string) => {
  if (!bubble || root.dataset.effects === 'off') return;
  clearTimeout(bubbleTimer); bubble.textContent = text;
  bubbleTimer = setTimeout(() => { bubble.textContent = '有伊布作伴，慢慢看。'; }, 4500);
};
document.querySelector('.pet-button')?.addEventListener('click', () => { const lines = ['嗨，你好啊～', '今天也要保持好奇呀。', '看累了，就起来走走吧。']; say(lines[greeting++ % lines.length]); });
document.querySelectorAll('.home-articles .post-summary h2 a').forEach(link => link.addEventListener('mouseenter', () => say('发现一篇想读的文章了吗？')));
const uptime = document.querySelector<HTMLElement>('[data-uptime]');
if (uptime) { const days = Math.max(0, Math.floor((Date.now() - Date.parse('2015-12-21T00:00:00+08:00')) / 86400000)); uptime.textContent = `${days.toLocaleString('zh-CN')} 天`; }
const topButton = document.querySelector<HTMLButtonElement>('.back-top');
const progress = document.querySelector<HTMLElement>('#reading-progress');
const progressLabel = document.querySelector<HTMLElement>('[data-scroll-label]');
let scheduled = false;
function updateScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const fraction = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
  if (progress) progress.style.transform = `scaleX(${fraction})`;
  if (progressLabel) progressLabel.textContent = `${Math.round(fraction * 100)}%`;
  if (topButton) topButton.hidden = scrollY < 250;
  scheduled = false;
}
addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); } }, { passive: true });
addEventListener('resize', updateScroll); updateScroll();
topButton?.addEventListener('click', () => scrollTo({ top: 0, behavior: motion.matches ? 'instant' : 'smooth' }));
const toc = document.querySelector<HTMLDetailsElement>('.article-toc details');
if (toc && matchMedia('(max-width:700px)').matches) toc.open = false;
const tocLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.article-toc a'));
const targets = tocLinks.map(a => document.getElementById(decodeURIComponent(a.hash.slice(1)))).filter((el): el is HTMLElement => !!el);
if (targets.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    const visible = entries.find(entry => entry.isIntersecting);
    if (!visible) return;
    for (const link of tocLinks) { const active = decodeURIComponent(link.hash.slice(1)) === visible.target.id; link.classList.toggle('active', active); if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }
  }, { rootMargin: '-5% 0px -70% 0px' });
  targets.forEach(el => observer.observe(el));
}
let hearts = 0;
document.addEventListener('click', event => {
  if (root.dataset.effects === 'off' || motion.matches || event.detail === 0 || hearts >= 8) return;
  if (!(event.target instanceof Element) || event.target.closest('a,button,input,textarea,select,pre,code,[contenteditable]') || getSelection()?.toString()) return;
  const heart = document.createElement('span'); heart.textContent = '♥'; heart.className = 'click-heart'; heart.setAttribute('aria-hidden','true'); heart.style.left = `${event.clientX - 8}px`; heart.style.top = `${event.clientY - 8}px`; document.body.append(heart); hearts++;
  setTimeout(() => { heart.remove(); hearts--; }, 900);
});
const originalTitle = document.title;
document.addEventListener('visibilitychange', () => { document.title = document.hidden && root.dataset.effects !== 'off' ? '歇一会儿，小栈等你回来 · 梦魇小栈' : originalTitle; });
