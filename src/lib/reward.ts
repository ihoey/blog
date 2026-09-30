// Adapt Playing-reward main (5d92abc): preserve its timing and add decode / keyboard support.
export function initRewards() {
  document.querySelectorAll<HTMLElement>('[data-reward]').forEach(container => {
    const links = container.querySelector<HTMLElement>('.reward-links')!;
    const overlay = container.querySelector<HTMLElement>('#QRBox')!;
    const card = container.querySelector<HTMLButtonElement>('#MainBox')!;
    const image = card.querySelector<HTMLImageElement>('img')!;
    const status = container.querySelector<HTMLElement>('.reward-status')!;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let origin: HTMLAnchorElement | null = null;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let loading = false;
    const finish = () => {
      clearTimeout(timer);
      overlay.hidden = true;
      overlay.classList.remove('fadeIn', 'is-closing');
      card.classList.remove('showQR', 'hideQR');
      container.classList.remove('blur');
      links.inert = false;
      if (origin) {
        origin.setAttribute('aria-expanded', 'false');
        origin.focus({ preventScroll: true });
      }
    };
    const close = () => {
      if (overlay.hidden || overlay.classList.contains('is-closing')) return;
      if (motion.matches) { finish(); return; }
      card.classList.replace('showQR', 'hideQR');
      overlay.classList.add('is-closing');
      timer = setTimeout(finish, 600);
    };
    container.querySelectorAll<HTMLAnchorElement>('[data-reward-code]').forEach(link => {
      link.setAttribute('aria-controls', 'QRBox');
      link.setAttribute('aria-expanded', 'false');
      link.addEventListener('click', async event => {
        event.preventDefault();
        if (!overlay.hidden || loading) return;
        loading = true;
        link.setAttribute('aria-busy', 'true');
        status.hidden = true;
        origin = link;
        image.src = link.href;
        image.alt = `${link.dataset.rewardCode}打赏收款二维码`;
        // Decode while hidden so the first visible frame already contains the QR.
        try {
          await image.decode();
        } catch {
          status.textContent = '收款码暂时没加载成功，请再试一次。';
          status.hidden = false;
          return;
        } finally {
          loading = false;
          link.removeAttribute('aria-busy');
        }
        card.setAttribute('aria-label', `${link.dataset.rewardCode}收款码，点击关闭`);
        link.setAttribute('aria-expanded', 'true');
        overlay.hidden = false;
        overlay.classList.add('fadeIn');
        container.classList.add('blur');
        links.inert = true;
        card.classList.add('showQR');
        card.focus({ preventScroll: true });
      });
    });
    card.addEventListener('click', close);
    overlay.addEventListener('click', event => { if (event.target === overlay) close(); });
    container.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !overlay.hidden) { event.preventDefault(); close(); }
    });
    motion.addEventListener('change', () => { if (overlay.classList.contains('is-closing')) finish(); });
  });
}
