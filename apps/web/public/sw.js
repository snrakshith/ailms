const STATIC_CACHE = 'aiquest-shell-v1';
self.addEventListener('install', (event) =>
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(['/offline.html', '/icon.svg'])),
  ),
);
self.addEventListener('activate', (event) =>
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== STATIC_CACHE).map((k) => caches.delete(k))),
      ),
  ),
);
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  if (
    new URL(req.url).pathname.startsWith('/api/') ||
    new URL(req.url).pathname.startsWith('/health/')
  )
    return;
  if (req.mode === 'navigate')
    event.respondWith(fetch(req).catch(() => caches.match('/offline.html')));
});
