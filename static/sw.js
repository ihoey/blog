/* Retire the Hexo worker at the same URL, so existing clients can upgrade. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => /^(?:bs|api)-\d+-\d+-\d+$/.test(name)).map(name => caches.delete(name)));
    await self.clients.claim();
    await self.registration.unregister();
  })());
});
// No fetch handler: all requests go to the network after activation.
