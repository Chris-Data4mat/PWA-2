const cacheName = "pwa-first-v2.1.02";
/*  Do NOT cache the web manifest file using your service worker. 
    You may not be able to update the file without updating your service worker.
    They should remain decoupled.
*/
const filesToCache = [
    "/index.html",
    "/about.html",
    "/gallery.html",
    "/inc/navigation.html",
    "/js/main.js",
    "/js/bulma.js",
    "/images/d4m_name.png",
    "/images/bmw-01.jpg",
    "/images/bmw-02.jpg",
    "/images/bmw-03.jpg",
    "/images/bmw-04.jpg",
    "/images/bmw-05.jpg",
    "/images/bmw-06.jpg",
    "https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css",
    "/css/styles.css"
];

// Fundamental must exist in every application mandatory
// Installation 
self.addEventListener('install', function (event) {
    console.log('install');
    event.waitUntil(caches.open(cacheName)
        .then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

// Activation
self.addEventListener('activate', (event) => {
    //activate event handler
});

// Live catches fetch events.
self.addEventListener('fetch', function (event) {
    console.log('fetch');
    /* for (let key in event.request) {
         console.log(`key: ${key}`);
     }
     */
    event.respondWith(caches.match(event.request)
        .then(function (response) {
            return response || fetch(event.request);
        })
    );
});