const cacheName = "nimus-cards-3";
const toCache = [
    "./index.html",
    "./main.css",
    "./main.js",
    "./vendor.js",
    "./assets/ring-alt.svg"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll(toCache))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(self.clients.claim());
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys.map(key => {
                if (key.startsWith("nimus-cards") && key !== cacheName) {
                    return caches.delete(key);
                }
                return key;
            }));
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
            .catch(() => caches.match("index.html"))
    );
});
