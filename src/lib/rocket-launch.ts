/** Decorative flight lives outside the button so scrolling can hide the control normally. */
export function launchRocket(button: HTMLButtonElement): () => void {
  const icon = button.querySelector('svg');
  if (!icon) return () => {};
  const rect = button.getBoundingClientRect();
  const scene = document.createElement('div');
  scene.className = 'rocket-launch';
  scene.setAttribute('aria-hidden', 'true');
  scene.style.setProperty('--launch-x', `${rect.left + rect.width / 2}px`);
  scene.style.setProperty('--launch-y', `${rect.top + rect.height / 2}px`);

  const ship = document.createElement('div');
  ship.className = 'launch-ship';
  const exhaust = document.createElement('span');
  exhaust.className = 'launch-exhaust';
  ship.append(exhaust, icon.cloneNode(true));
  const shockwave = document.createElement('span');
  shockwave.className = 'launch-ring';
  scene.append(shockwave, ship);
  for (let index = 0; index < 12; index++) {
    const puff = document.createElement('span');
    puff.className = 'launch-smoke';
    const side = index % 2 ? 1 : -1;
    puff.style.setProperty('--smoke-x', `${side * (30 + index * 9)}px`);
    puff.style.setProperty('--smoke-y', `${12 + (index % 4) * 12}px`);
    puff.style.setProperty('--smoke-delay', `${120 + index * 22}ms`);
    scene.append(puff);
  }
  document.body.append(scene);
  button.classList.add('is-launching');
  return () => {
    scene.remove();
    button.classList.remove('is-launching');
  };
}
