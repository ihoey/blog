export {};

// Native article navigation; the arc-shaped marker interaction is inspired by
// Rare UI Bounce Sidebar: https://www.rareui.com/components/bouncesidebar
// This implementation uses the existing Astro links and the Web Animations API.
const details = document.querySelector<HTMLDetailsElement>('.article-toc details');
const nav = details?.querySelector<HTMLElement>('nav');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
if (details && nav) {
  if (matchMedia('(max-width:700px)').matches) details.open = false;
  const items = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a')).flatMap(link => {
    const heading = document.getElementById(decodeURIComponent(link.hash.slice(1)));
    return heading ? [{ link, heading }] : [];
  });
  if (items.length) {
    const marker = document.createElement('span');
    marker.className = 'toc-marker';
    marker.setAttribute('aria-hidden', 'true');
    nav.prepend(marker);
    nav.classList.add('has-marker');
    let active = -1;
    let positioned = false;
    let animation: Animation | undefined;
    let pendingClick = false;
    let releaseTimer: ReturnType<typeof setTimeout>;
    let frame = 0;
    const animated = () => !motion.matches && document.documentElement.dataset.effects !== 'off';

    function place(animate = true, clicked = false) {
      marker.hidden = !details!.open;
      if (!details!.open || active < 0) return;
      const rect = items[active].link.getBoundingClientRect();
      const y = rect.top - nav!.getBoundingClientRect().top + rect.height / 2 - 3;
      const current = new DOMMatrixReadOnly(getComputedStyle(marker).transform);
      animation?.cancel();
      marker.style.transform = `translate(0px, ${y}px)`;
      if (positioned && animate && animated() && Math.abs(y - current.m42) > .5) {
        const distance = y - current.m42;
        const arc = Math.min(clicked ? 8 : 4, Math.abs(distance) * .15);
        animation = marker.animate([
          { transform: `translate(${current.m41}px, ${current.m42}px)` },
          { transform: `translate(${-arc}px, ${current.m42 + distance * .5}px)`, offset: .45 },
          { transform: `translate(${-arc * .25}px, ${current.m42 + distance * .92}px)`, offset: .8 },
          { transform: `translate(0px, ${y}px)` },
        ], { duration: clicked ? 300 : 220, easing: 'cubic-bezier(.2,.65,.3,1)' });
      }
      positioned = true;
    }

    function select(index: number, animate = true, clicked = false) {
      if (index === active) return;
      active = index;
      items.forEach(({ link }, i) => {
        link.classList.toggle('active', i === index);
        if (i === index) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
      place(animate, clicked);
    }

    function followScroll(animate = true) {
      if (pendingClick) return;
      const readingLine = Math.min(innerHeight * .22, 160);
      let index = 0;
      items.forEach(({ heading }, i) => {
        if (heading.getBoundingClientRect().top <= readingLine) index = i;
      });
      select(index, animate);
    }
    function schedule() {
      if (frame) return;
      frame = requestAnimationFrame(() => { frame = 0; followScroll(); });
    }
    function releaseClick() {
      clearTimeout(releaseTimer);
      pendingClick = false;
      schedule();
    }
    items.forEach(({ link }, index) => {
      link.addEventListener('click', event => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        // Let the browser keep native anchor navigation and history. Hold the
        // selected destination while smooth scrolling passes other headings.
        pendingClick = true;
        clearTimeout(releaseTimer);
        select(index, true, true);
        releaseTimer = setTimeout(releaseClick, 1200);
      });
    });
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('scrollend', releaseClick);
    addEventListener('wheel', releaseClick, { passive: true });
    addEventListener('touchmove', releaseClick, { passive: true });
    addEventListener('keydown', event => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) releaseClick();
    });
    addEventListener('hashchange', schedule);
    addEventListener('resize', () => { followScroll(false); place(false); });
    details.addEventListener('toggle', () => place(false));
    const settle = () => place(false);
    addEventListener('blog:effectschange', settle);
    motion.addEventListener('change', settle);
    new ResizeObserver(settle).observe(nav);
    document.fonts.ready.then(settle);
    followScroll(false);
  }
}
