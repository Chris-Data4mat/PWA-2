const cacheName = "site_1-v2.0";
const VERSION = "v2.0";
var count = 0;
// v3 included self.skipWaiting() in install event.
/*  Do NOT cache the web manifest file using your service worker. 
    You may not be able to update the file without updating your service worker.
    They should remain decoupled.
*/
const filesToCache = [
    "/site_1/images/bmw-01.jpg",
    "/site_1/images/bmw-02.jpg",
    "/site_1/images/bmw-03.jpg",
    "/site_1/images/bmw-04.jpg",
    "/site_1/images/bmw-05.jpg",
    "/site_1/images/bmw-06.jpg",
    "/site_1/gallery.html",
    "/site_1/inc/navigation.html",
    "/site_1/src/js/main.js",
    "/site_1/src/js/bulma.js"

];

// Fundamental must exist in every application mandatory
// Installation 
self.addEventListener('install', function (event) {
    console.log(`site_1, install, count: ${count}`);
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
    console.log(`site_1, activate, count: ${count}`);
    count++;
});

// Live catches fetch events.
self.addEventListener('fetch', function (event) {
    console.log(`site_1, fetch, count: ${count}`);
    /* for (let key in event.request) {
         console.log(`key: ${key}`);
     }
     */
    event.respondWith(caches.match(event.request)
        .then(function (response) {
            return response || fetch(event.request);
        })
    );
    count++;
});