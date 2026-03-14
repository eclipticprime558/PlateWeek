const CACHE_NAME = 'plateweek-v1';
const CORE_ASSETS = [
  './',
  './index.html',
  './icon.svg',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap'
];

// Install: cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CORE_ASSETS.map(url => new Request(url, { cache: 'reload' })))
        .catch(() => cache.addAll(['./', './index.html'])); // fallback if fonts fail
    })
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first for app shell, network-first for external
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Always go network for non-GET requests
  if (event.request.method !== 'GET') return;

  // YouTube thumbnails & search — network only (don't cache)
  if (url.hostname.includes('youtube') || url.hostname.includes('ytimg')) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      const networkFetch = fetch(event.request).then(response => {
        if (response && response.status === 200 && response.type !== 'opaque') {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
        }
        return response;
      }).catch(() => cached); // if network fails, fall back to cached

      // Return cached immediately, update in background
      return cached || networkFetch;
    })
  );
});

// Handle push notifications (future use)
self.addEventListener('push', event => {
  const data = event.data?.json() || { title: 'PlateWeek', body: 'Time to log your meal!' };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: './icon.svg',
      badge: './icon.svg',
      tag: 'plateweek-reminder'
    })
  );
});
