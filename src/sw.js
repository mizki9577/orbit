/* @flow */
self.oninstall = ev => {
  ev.waitUntil(
    caches.open('orbit').then(cache => cache.addAll([
      '/',
      '/index.html',
      '/main.bundle.js',
      '/bodyUpdater.worker.bundle.js',
    ]))
  )
}

self.onfetch = ev => {
  ev.respondWith(
    caches.match(ev.request).then(response => response || fetch(ev.request))
  )
}

// vim: set ts=2 sw=2 et:
