type Mood = 'idle' | 'curious' | 'happy' | 'sleepy' | 'asleep' | 'waking';

/** The illustration stays CSS; this controller only schedules brief reactions. */
export function mountEevee(companion: HTMLElement, onWake: () => void) {
  const sceneElement = companion.querySelector<HTMLElement>('.eevee-scene');
  const buttonElement = companion.querySelector<HTMLButtonElement>('.pet-button');
  if (!sceneElement || !buttonElement) return;
  const scene = sceneElement;
  const button = buttonElement;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  let mood: Mood = 'idle';
  let nearby = false;
  let focused = false;
  let lastActivity = performance.now();
  let bounds = button.getBoundingClientRect();
  let sleepTimer: ReturnType<typeof setTimeout> | undefined;
  let gestureTimer: ReturnType<typeof setTimeout> | undefined;
  let gestureEnd: ReturnType<typeof setTimeout> | undefined;
  let reactionTimer: ReturnType<typeof setTimeout> | undefined;
  const allowed = () => !motion.matches && document.documentElement.dataset.effects !== 'off';
  const running = () => allowed() && !document.hidden;
  const attentive = () => nearby || focused;
  const reacting = () => mood === 'happy' || mood === 'waking';
  const setMood = (next: Mood) => { mood = next; scene.dataset.mood = next; };
  function clearGesture() {
    clearTimeout(gestureTimer); clearTimeout(gestureEnd);
    gestureTimer = gestureEnd = undefined;
    delete scene.dataset.gesture;
  }
  function clearTimers() {
    clearTimeout(sleepTimer); clearTimeout(reactionTimer); clearGesture();
    sleepTimer = reactionTimer = undefined;
  }
  function scheduleGesture() {
    clearGesture();
    if (!running() || mood !== 'curious') return;
    gestureTimer = setTimeout(() => {
      if (!running() || mood !== 'curious') return;
      const gesture = Math.random() < .8 ? 'blink' : 'ear';
      scene.dataset.gesture = gesture;
      gestureEnd = setTimeout(scheduleGesture, gesture === 'blink' ? 340 : 720);
    }, 3500 + Math.random() * 4000);
  }
  function rest() {
    if (!running()) return;
    setMood(attentive() ? 'curious' : 'idle');
    scheduleGesture();
  }
  function wake() {
    clearGesture(); clearTimeout(reactionTimer);
    setMood('waking');
    onWake();
    reactionTimer = setTimeout(rest, 850);
  }
  function checkSleep() {
    clearTimeout(sleepTimer);
    sleepTimer = undefined;
    if (!running()) return;
    const idleFor = performance.now() - lastActivity;
    if (attentive() || reacting()) {
      sleepTimer = setTimeout(checkSleep, 5000);
    } else if (idleFor >= 150000) {
      clearGesture(); setMood('asleep');
    } else if (idleFor >= 120000) {
      clearGesture(); setMood('sleepy');
      sleepTimer = setTimeout(checkSleep, 150000 - idleFor);
    } else {
      sleepTimer = setTimeout(checkSleep, 120000 - idleFor);
    }
  }
  function activity() {
    if (!running()) return;
    lastActivity = performance.now();
    if (mood === 'asleep') wake();
    else if (mood === 'sleepy') rest();
    // Reuse the existing deadline rather than creating a timer on every pointer move.
    if (sleepTimer === undefined || mood === 'waking') checkSleep();
  }
  function attention(next: boolean) {
    if (nearby === next) return;
    nearby = next;
    if (!running() || reacting()) return;
    if (mood === 'asleep') wake();
    else rest();
  }
  function pointer(event: PointerEvent) {
    if (!running() || !finePointer.matches || event.pointerType === 'touch') return;
    const dx = event.clientX - (bounds.left + bounds.width / 2);
    const dy = event.clientY - (bounds.top + bounds.height / 2);
    attention(Math.abs(dx) < bounds.width / 2 + 70 && Math.abs(dy) < bounds.height / 2 + 60);
    if (nearby) {
      scene.style.setProperty('--eevee-look-x', `${Math.max(-5, Math.min(5, dx / 16))}px`);
      scene.style.setProperty('--eevee-look-angle', `${Math.max(-5, Math.min(5, dx / 22))}deg`);
    }
    activity();
  }
  function pet() {
    if (!running()) return;
    activity(); clearGesture(); clearTimeout(reactionTimer);
    // Repeated clicks extend the reaction; they do not restart it or stack animations.
    setMood('happy');
    reactionTimer = setTimeout(rest, 1500);
  }
  function refresh() {
    clearTimers();
    scene.dataset.paused = String(document.hidden);
    scene.dataset.motion = allowed() ? 'on' : 'off';
    if (!running()) {
      if (!allowed()) setMood('idle');
      return;
    }
    lastActivity = performance.now();
    bounds = button.getBoundingClientRect();
    rest(); checkSleep();
  }
  document.addEventListener('pointermove', pointer, { passive: true });
  document.addEventListener('pointerdown', activity, { passive: true });
  document.addEventListener('keydown', activity);
  document.addEventListener('scroll', activity, { passive: true });
  document.addEventListener('visibilitychange', refresh);
  document.documentElement.addEventListener('pointerleave', () => attention(false));
  button.addEventListener('pointerdown', () => { focused = false; });
  button.addEventListener('focus', () => { focused = button.matches(':focus-visible'); activity(); if (!reacting()) rest(); });
  button.addEventListener('blur', () => { focused = false; if (!reacting()) rest(); });
  button.addEventListener('click', pet);
  window.addEventListener('resize', () => { bounds = button.getBoundingClientRect(); });
  window.addEventListener('blog:effectschange', refresh);
  window.addEventListener('pagehide', () => { clearTimers(); scene.dataset.paused = 'true'; });
  window.addEventListener('pageshow', refresh);
  motion.addEventListener('change', refresh);
  refresh();
}
