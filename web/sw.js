self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('video-store').then(function(cache) {
      return cache.addAll(['/']);
    })
  );
});
   
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.action.includes('join_')) {
    clients.openWindow("/?" + event.action.split('_')[1]);
  }
});