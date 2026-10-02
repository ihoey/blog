import { copyAttribution } from './copy-attribution';

const viewer = document.querySelector<HTMLDialogElement>('.image-viewer');
if (viewer && typeof viewer.showModal === 'function') {
  const dialog = viewer;
  const image = dialog.querySelector<HTMLImageElement>('.image-viewer-image')!;
  const caption = dialog.querySelector('figcaption')!;
  const count = dialog.querySelector('.image-viewer-count')!;
  const original = dialog.querySelector<HTMLAnchorElement>('.image-viewer-original')!;
  const previous = dialog.querySelector<HTMLButtonElement>('.image-viewer-prev')!;
  const next = dialog.querySelector<HTMLButtonElement>('.image-viewer-next')!;
  const images = [...document.querySelectorAll<HTMLImageElement>('.prose img,.post-excerpt img')].filter(img => {
    const anchor = img.closest('a');
    // Preserve badge and other navigation links; only linked image files are previews.
    return !img.hidden && (!anchor || /\.(?:png|jpe?g|gif|webp|avif|svg)(?:[?#]|$)/i.test(anchor.href));
  });
  let active = 0;
  let trigger: HTMLElement | undefined;
  function show(index: number) {
    active = index;
    const source = images[index];
    const anchor = source.closest('a');
    image.src = anchor?.href || source.currentSrc || source.src;
    image.alt = source.alt;
    caption.textContent = source.title || source.alt;
    count.textContent = `${index + 1} / ${images.length}`;
    original.href = image.src;
    previous.disabled = index === 0; next.disabled = index === images.length - 1;
    if (!dialog.open) dialog.showModal();
  }
  images.forEach((img, index) => {
    const control = img.closest('a') || img;
    if (control === img) { img.tabIndex = 0; img.setAttribute('role', 'button'); }
    control.classList.add('image-zoom');
    control.setAttribute('aria-label', `放大图片：${img.alt || img.title || '文章配图'}`);
    control.setAttribute('aria-haspopup', 'dialog');
    control.addEventListener('click', event => {
      if (event instanceof MouseEvent && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0)) return;
      event.preventDefault(); trigger = control; show(index);
    });
    if (control === img) control.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); trigger = control; show(index); }
    });
  });
  previous.addEventListener('click', () => { if (active > 0) show(active - 1); });
  next.addEventListener('click', () => { if (active < images.length - 1) show(active + 1); });
  dialog.querySelector('[data-image-close]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' && active > 0) { event.preventDefault(); show(active - 1); }
    if (event.key === 'ArrowRight' && active < images.length - 1) { event.preventDefault(); show(active + 1); }
  });
  dialog.addEventListener('close', () => trigger?.focus({ preventScroll: true }));
}

document.addEventListener('copy', event => {
  if (!event.clipboardData || event.defaultPrevented) return;
  const selection = getSelection();
  if (!selection?.rangeCount) return;
  const range = selection.getRangeAt(0);
  const element = (node: Node) => node instanceof Element ? node : node.parentElement;
  const start = element(range.startContainer), end = element(range.endContainer);
  const prose = start?.closest('.prose');
  if (!prose || end?.closest('.prose') !== prose || start?.closest('pre,input,textarea,[contenteditable]') || end?.closest('pre,input,textarea,[contenteditable]')) return;
  const fragment = range.cloneContents();
  if (fragment.querySelector('pre,input,textarea,[contenteditable]')) return;
  const text = selection.toString();
  const attribution = copyAttribution(text, document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href || location.href);
  if (!attribution) return;
  const container = document.createElement('div'); container.append(fragment);
  const footer = document.createElement('p'); footer.textContent = attribution;
  footer.style.whiteSpace = 'pre-line'; container.append(footer);
  event.clipboardData.setData('text/plain', `${text}\n\n${attribution}`);
  event.clipboardData.setData('text/html', container.innerHTML);
  event.preventDefault();
});
