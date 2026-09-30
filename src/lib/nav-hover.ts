/** One glass highlight travels between links; it never intercepts navigation. */
export function initNavHover() {
  const nav = document.querySelector<HTMLElement>('.main-nav');
  if (!nav) return;
  const highlight = document.createElement('span');
  highlight.className = 'nav-hover';
  highlight.setAttribute('aria-hidden', 'true');
  nav.prepend(highlight);
  nav.dataset.glassHover = '';
  let hovered: HTMLAnchorElement | null = null;
  let active: HTMLAnchorElement | null = null;
  let lightFrame = 0;
  let pointerX = 0;

  const linkAt = (target: EventTarget | null) => {
    const link = target instanceof Element ? target.closest<HTMLAnchorElement>('a') : null;
    return link && nav.contains(link) ? link : null;
  };
  const focused = () => {
    const link = linkAt(document.activeElement);
    return link?.matches(':focus-visible') ? link : null;
  };
  const place = () => {
    if (!active) return;
    highlight.style.width = `${active.offsetWidth}px`;
    highlight.style.height = `${active.offsetHeight}px`;
    highlight.style.transform = `translate(${active.offsetLeft}px, ${active.offsetTop}px)`;
  };
  const show = (link: HTMLAnchorElement | null) => {
    if (link === active) return;
    active = link;
    place();
    nav.classList.toggle('has-hover', Boolean(link));
  };
  nav.addEventListener('pointerover', event => {
    if (event.pointerType === 'touch') return;
    hovered = linkAt(event.target);
    if (hovered) show(hovered);
  });
  nav.addEventListener('pointermove', event => {
    if (!hovered || event.pointerType === 'touch') return;
    pointerX = event.clientX;
    if (lightFrame) return;
    lightFrame = requestAnimationFrame(() => {
      lightFrame = 0;
      if (!hovered) return;
      const rect = hovered.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, (pointerX - rect.left) / rect.width * 100));
      highlight.style.setProperty('--glint-x', `${x}%`);
    });
  });
  nav.addEventListener('pointerleave', () => { hovered = null; show(focused()); });
  nav.addEventListener('focusin', event => {
    const link = linkAt(event.target);
    if (link?.matches(':focus-visible')) {
      highlight.style.setProperty('--glint-x', '50%');
      show(link);
    }
  });
  nav.addEventListener('focusout', () => queueMicrotask(() => show(hovered || focused())));
  const observer = new ResizeObserver(place);
  observer.observe(nav);
  nav.querySelectorAll('a').forEach(link => observer.observe(link));
  window.addEventListener('blur', () => { hovered = null; show(null); });
}
