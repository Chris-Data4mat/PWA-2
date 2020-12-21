const cacheName = "pwa-first-v4.8";
const VERSION = "v4.8";
var count = 0;
// v3 included self.skipWaiting() in install event.
/*  Do NOT cache the web manifest file using your service worker. 
    You may not be able to update the file without updating your service worker.
    They should remain decoupled.
*/
const filesToCache = [
    "/index.html",
    "/about.html",

    "/gallery2.html",
    "/inc/navigation.html",
    "/src/js/main.js",
    "/src/js/bulma.js",
    "/src/js/notification.js",
    "/images/d4m_name.png",
    "/images/D4M-Logo PNG-8.png",
    "/images/favicon.ico",
    "https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css",
    "/css/styles.css"
];

// Fundamental must exist in every application mandatory
// Installation 
self.addEventListener('install', function (event) {
    console.log(`install: ${cacheName}, count: ${count}`);
    count++;
    self.skipWaiting(); // Causes this version to become active if we have an older already installed in the client.
    event.waitUntil(caches.open(cacheName)
        .then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

// Activation
self.addEventListener('activate', (event) => {
    console.log(`activate: ${cacheName}, count: ${count}`);
    count++;
});

// Live catches fetch events.
self.addEventListener('fetch', function (event) {
    console.log(`fetch: ${cacheName}, count: ${count}`);
    /*console.log(`cont: url: ${event.request.url}, destination: ${event.request.destination}, cache: ${event.request.cache}}, 
    redirect: ${event.request.redirect}, referrer: ${event.request.referrer}`);
    console.log(`event: clientId: ${event.clientId}, resultingClientId: ${event.resultingClientID}, respondWith: ${event.respondWith},
    target: ${event.target}, currentTarget: ${event.currentTarget}, composed: ${event.composed}, srcElement: ${event.srcElement},
    returnValue: ${event.returnValue}, path: ${event.path}, composedPath: ${event.composedPath}, initEvent: ${event.initEvent}`);
    */
    //for (let key in caches.keys) {
    caches.keys(event.request).then(function (keys) {
        for (let i = 0; i < keys.length; i++) {
            console.log(`i: ${i}, key: ${keys[i]}`);
        }
    });
    //console.log(`caches, key: ${caches.keys}`);
    // }

    count++;
    /* for (let key in event.request) {
         console.log(`key: ${key}`);
     }
     */
    event.respondWith(caches.match(event.request)
        .then(function (response) {
            //showNotification();
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('push', function (event) {
    console.log(`push: ${cacheName}, count: ${count}`);
    count++;
    const payload = event.data ? event.data.text() : 'no payload';
    event.waitUntil(
        // Show a notification with title 'ServiceWorker Cookbook' and use the payload
        // as the body.
        self.registration.showNotification('My push up message!', {
            body: payload,
            requireInteraction: true
        })
    );
});