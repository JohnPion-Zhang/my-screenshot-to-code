/*
* Mock Service Worker.
* This is a placeholder file since the `msw init` command is failing.
* This minimal implementation should be sufficient for development mocking.
*/
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', () => {
  // This is intentionally left empty.
  // The msw library intercepts requests on the client side before they reach here.
});
