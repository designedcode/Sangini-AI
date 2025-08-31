
// Minimal placeholder service worker (no offline caching for simplicity).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));
