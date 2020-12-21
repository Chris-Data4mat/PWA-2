const cacheName = "site_2-v1.2";
const VERSION = "v1.2";
var count = 0;
// v3 included self.skipWaiting() in install event.
/*  Do NOT cache the web manifest file using your service worker. 
    You may not be able to update the file without updating your service worker.
    They should remain decoupled.
*/
const filesToCache = [
    "/site_2/images/bild1.jpg",
    "/site_2/images/bild2.jpg",
    "/site_2/images/bild3.jpg",
    "/site_2/images/bild4.jpg",
    "/site_2/images/bild5.jpg",
    "/site_2/images/bild6.jpg",
    "/site_2/images/bild7.jpg",
    "/site_2/images/bild8.jpg"
];

// Fundamental must exist in every application mandatory
// Installation 
self.addEventListener('install', function (event) {
    console.log(`site_2, install, count ${count}`);
    self.skipWaiting(); // Causes this version to become active if we have an older already installed in the client.
    event.waitUntil(caches.open(cacheName)
        .then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
    count++;
});

// Activation
self.addEventListener('activate', (event) => {
    console.log(`site_2, activate, count: ${count}`);
    count++;
});

// Live catches fetch events.
self.addEventListener('fetch', function (event) {
    console.log(`site_2, fetch, count: ${count}`);
    event.respondWith(caches.match(event.request)
        .then(function (response) {
            return response || fetch(event.request);
        })
    );
    count++;
});