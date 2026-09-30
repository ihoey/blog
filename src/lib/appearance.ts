import { launchRocket } from './rocket-launch';
import { initNavHover } from './nav-hover';

initNavHover();

const root = document.documentElement;
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const save = (key: string, value: string) => { try { localStorage.setItem(key, value); } catch {} };
const themeButton = document.querySelector<HTMLButtonElement>('.theme-toggle');
const effectsButton = document.querySelector<HTMLButtonElement>('.effects-toggle');
const updateControls = () => {
  const dark = root.dataset.theme === 'dark';
  themeButton?.setAttribute('aria-label', dark ? '切换到日间主题' : '切换到夜间主题');
  themeButton?.setAttribute('title', dark ? '切换到日间主题' : '切换到夜间主题');
  const effectsEnabled = root.dataset.effects !== 'off';
  effectsButton?.setAttribute('aria-pressed', String(effectsEnabled));
  effectsButton?.setAttribute('title', effectsEnabled ? '关闭个性效果' : '开启个性效果');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? 'hsl(210deg 15% 6%)' : 'hsl(0deg 0% 100%)');
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
if (uptime) {
  const updateUptime = () => {
    const seconds = Math.max(0, Math.floor((Date.now() - Date.parse('2015-12-21T00:00:00+08:00')) / 1000));
    const days = Math.floor(seconds / 86400).toLocaleString('zh-CN');
    const hours = Math.floor(seconds % 86400 / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    uptime.textContent = `${days} 天 ${hours} 小时 ${minutes} 分钟 ${seconds % 60} 秒`;
  };
  updateUptime();
  setInterval(() => { if (!document.hidden) updateUptime(); }, 1000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) updateUptime(); });
}
// Restore the existing site's counter only on its production origin.
if (location.hostname === 'blog.ihoey.com') {
  const counter = document.createElement('script');
  counter.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
  counter.async = true;
  document.head.append(counter);
}
const topButton = document.querySelector<HTMLButtonElement>('.back-top');
const progress = document.querySelector<HTMLElement>('#reading-progress');
const topbar = document.querySelector<HTMLElement>('.site-topbar');
const scenicHeader = document.querySelector<HTMLElement>('.scenic-header');
let dockAt = Infinity;
let navDocked = false;
let scheduled = false;
function updateScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const fraction = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
  if (progress) progress.style.transform = `scaleX(${fraction})`;
  if (topButton) topButton.hidden = scrollY < 250;
  // A small return threshold prevents jitter around the end of the canopy.
  const shouldDock = scrollY >= dockAt - (navDocked ? 24 : 0);
  if (shouldDock !== navDocked) {
    navDocked = shouldDock;
    topbar?.classList.toggle('is-docked', navDocked);
  }
  scheduled = false;
}
addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); } }, { passive: true });
function measureDockThreshold() {
  if (scenicHeader) {
    const clearance = Number.parseFloat(getComputedStyle(root).scrollPaddingTop) || 88;
    dockAt = Math.max(0, scenicHeader.offsetTop + scenicHeader.offsetHeight - clearance);
  }
  updateScroll();
}
addEventListener('resize', measureDockThreshold);
if (scenicHeader) new ResizeObserver(measureDockThreshold).observe(scenicHeader);
measureDockThreshold();
let finishLaunch: (() => void) | undefined;
topButton?.addEventListener('click', () => {
  if (finishLaunch) return;
  const animate = !motion.matches && root.dataset.effects !== 'off';
  if (animate) {
    const cleanup = launchRocket(topButton);
    const timer = window.setTimeout(() => finishLaunch?.(), 1500);
    finishLaunch = () => {
      clearTimeout(timer);
      cleanup();
      finishLaunch = undefined;
      updateScroll();
    };
  }
  scrollTo({ top: 0, behavior: animate ? 'smooth' : 'instant' });
});
const cancelLaunch = () => finishLaunch?.();
window.addEventListener('blog:effectschange', cancelLaunch);
motion.addEventListener('change', cancelLaunch);
window.addEventListener('pagehide', cancelLaunch);
document.addEventListener('visibilitychange', () => { if (document.hidden) cancelLaunch(); });
let hearts = 0;
document.addEventListener('click', event => {
  if (root.dataset.effects === 'off' || motion.matches || event.detail === 0 || hearts >= 8) return;
  if (!(event.target instanceof Element) || event.target.closest('a,button,input,textarea,select,pre,code,[contenteditable]') || getSelection()?.toString()) return;
  const heart = document.createElement('span'); heart.textContent = '♥'; heart.className = 'click-heart'; heart.setAttribute('aria-hidden','true'); heart.style.left = `${event.clientX - 8}px`; heart.style.top = `${event.clientY - 8}px`; document.body.append(heart); hearts++;
  setTimeout(() => { heart.remove(); hearts--; }, 900);
});
const originalTitle = document.title;
document.addEventListener('visibilitychange', () => { document.title = document.hidden && root.dataset.effects !== 'off' ? '歇一会儿，小栈等你回来 · 梦魇小栈' : originalTitle; });
