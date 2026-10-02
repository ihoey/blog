/* Retire the Hexo worker at the same URL, so existing clients can upgrade. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => /^(?:bs|api)-\d+-\d+-\d+$/.test(name)).map(name => caches.delete(name)));
    await self.clients.claim();
    const windows = await self.clients.matchAll({ type: 'window' });
    await self.registration.unregister();
    // A cached Hexo document otherwise keeps requesting assets removed by the
    // migration until the visitor manually refreshes. Navigate once after
    // retirement; the new document has no registration code, so this cannot loop.
    await Promise.allSettled(windows.map(client => client.navigate(client.url)));
  })());
});
// No fetch handler: all requests go to the network after activation.
