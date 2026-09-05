/* Red primero: siempre trae la version nueva; la copia guardada solo si no hay internet */
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || e.request.url.includes('supabase')) return;
  e.respondWith(
    fetch(e.request).then(r => {
      const c = r.clone();
      caches.open('tcf').then(k => k.put(e.request, c)).catch(() => {});
      return r;
    }).catch(() => caches.match(e.request))
  );
});
