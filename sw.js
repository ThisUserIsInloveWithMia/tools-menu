const CACHE_NAME = "app-cache-v2"; // bump version when updating

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        "index.html",
        "DSIRProcessor_v6_3_UI_layout.html",
        "InvoiceGenerator.html",
        "AutoPMIX.html",
        "icon-192.png",
        "icon-512.png",
        "manifest.json"
      ]);
    })
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clientsClaim();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
