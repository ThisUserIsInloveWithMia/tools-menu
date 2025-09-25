self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("app-cache").then(cache => {
      return cache.addAll([
        "index.html",
        "DSIRProcessor_v6_3_UI_layout.html",
        "InvoiceGenerator.html",
        "AutoPMIX.html",        // added third tool
        "icon-192.png",
        "icon-512.png",
        "manifest.json"
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== "app-cache").map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(response => {
      return response || fetch(e.request);
    })
  );
});
