self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("app-cache").then(cache => {
      return cache.addAll([
        "index.html",
        "DSIRProcessor_v6_3_UI_layout.html",
        "InvoiceGenerator.html",
        "icon-192.png",
        "icon-512.png",
        "manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});