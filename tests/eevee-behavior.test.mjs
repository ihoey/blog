import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const compiled = ts.transpileModule(readFileSync(new URL('../src/lib/eevee-behavior.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function target(props = {}) {
  const listeners = new Map();
  return Object.assign({
    addEventListener(name, callback) { const list = listeners.get(name) ?? []; list.push(callback); listeners.set(name, list); },
    emit(name, event = {}) { for (const callback of listeners.get(name) ?? []) callback(event); },
  }, props);
}
function fixture(reduced = false) {
  let now = 0, id = 0, wakes = 0;
  const timers = new Map();
  const scene = { dataset: {}, style: { setProperty() {} } };
  const button = target({ matches: () => true, getBoundingClientRect: () => ({ left: 0, top: 100, width: 140, height: 140 }) });
  const document = target({ hidden: false, documentElement: target({ dataset: { effects: 'on' } }) });
  const window = target();
  const motion = target({ matches: reduced });
  const exports = {};
  vm.runInNewContext(compiled, {
    exports, document, window, performance: { now: () => now },
    matchMedia: query => query.includes('reduced') ? motion : { matches: true },
    setTimeout(fn, delay) { const key = ++id; timers.set(key, { fn, at: now + delay }); return key; },
    clearTimeout(key) { timers.delete(key); },
  });
  exports.mountEevee({ querySelector: selector => selector === '.eevee-scene' ? scene : button }, () => wakes++);
  return { scene, button, document, window, motion, timers, wakes: () => wakes,
    advance(ms) {
      const end = now + ms;
      while (true) {
        const next = [...timers].sort((a, b) => a[1].at - b[1].at)[0];
        if (!next || next[1].at > end) break;
        now = next[1].at; timers.delete(next[0]); next[1].fn();
      }
      now = end;
    },
  };
}

test('idle mascot becomes sleepy, sleeps, then wakes once on activity', () => {
  const f = fixture();
  f.advance(120000); assert.equal(f.scene.dataset.mood, 'sleepy');
  f.advance(30000); assert.equal(f.scene.dataset.mood, 'asleep');
  assert.equal(f.timers.size, 0);
  f.document.emit('scroll'); assert.equal(f.scene.dataset.mood, 'waking');
  f.document.emit('scroll'); assert.equal(f.wakes(), 1);
  f.advance(850); assert.equal(f.scene.dataset.mood, 'idle');
  f.advance(150000); assert.equal(f.scene.dataset.mood, 'asleep');
});

test('reading activity postpones sleep and interrupts drowsiness', () => {
  const f = fixture();
  f.advance(115000); f.document.emit('scroll');
  f.advance(10000); assert.equal(f.scene.dataset.mood, 'idle');
  f.advance(110000); assert.equal(f.scene.dataset.mood, 'sleepy');
  f.document.emit('keydown'); assert.equal(f.scene.dataset.mood, 'idle');
  f.advance(15000); assert.equal(f.scene.dataset.mood, 'idle');
});

test('pointer proximity and keyboard focus hold attention; rapid clicks do not stack timers', () => {
  const f = fixture();
  f.document.emit('pointermove', { pointerType: 'mouse', clientX: 80, clientY: 160 });
  assert.equal(f.scene.dataset.mood, 'curious');
  f.document.emit('pointermove', { pointerType: 'mouse', clientX: 500, clientY: 100 });
  assert.equal(f.scene.dataset.mood, 'idle');
  f.document.emit('pointermove', { pointerType: 'mouse', clientX: 80, clientY: 160 });
  f.advance(70000); assert.equal(f.scene.dataset.mood, 'curious');
  f.document.documentElement.emit('pointerleave');
  f.button.emit('focus'); assert.equal(f.scene.dataset.mood, 'curious');
  f.button.emit('click'); f.advance(1000);
  for (let i = 0; i < 20; i++) f.button.emit('click');
  assert.equal(f.scene.dataset.mood, 'happy'); assert.equal(f.timers.size, 2);
  f.advance(1499); assert.equal(f.scene.dataset.mood, 'happy');
  f.advance(1); assert.equal(f.scene.dataset.mood, 'curious');
  f.button.emit('blur'); assert.equal(f.scene.dataset.mood, 'idle');
  f.button.matches = () => false;
  f.button.emit('pointerdown'); f.button.emit('focus'); f.button.emit('click');
  f.advance(1500); assert.equal(f.scene.dataset.mood, 'idle');
});

test('hidden tab and reduced-motion changes cancel pending work and resume cleanly', () => {
  const f = fixture();
  f.button.emit('click');
  f.document.hidden = true; f.document.emit('visibilitychange');
  assert.equal(f.scene.dataset.paused, 'true'); assert.equal(f.timers.size, 0);
  f.advance(120000);
  f.document.hidden = false; f.document.emit('visibilitychange');
  assert.equal(f.scene.dataset.mood, 'idle'); assert.equal(f.scene.dataset.paused, 'false');
  f.motion.matches = true; f.motion.emit('change');
  assert.equal(f.scene.dataset.motion, 'off'); assert.equal(f.timers.size, 0);
  f.button.emit('click'); assert.equal(f.scene.dataset.mood, 'idle');
  f.motion.matches = false; f.motion.emit('change');
  assert.equal(f.timers.size, 1);
  f.window.emit('pagehide'); assert.equal(f.timers.size, 0);
  f.window.emit('pageshow'); assert.equal(f.timers.size, 1);
  const reduced = fixture(true); assert.equal(reduced.timers.size, 0);
});
