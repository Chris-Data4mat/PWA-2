# Using multiple Service Workers

## Initial idea

To let each of 3 service workers be responsible for a particular area or scope.

I created 3 service workers one in the site root and one each in subfolders or subdomains to the root called 'site_1' and 'site_2'.

As demonstrated (during lecture Monday Dec 21st) they all registered and they all created their own cache named pwa-first-vx.x, site_1-vx.x and site_2vx.x where x.x is varying version numbers.
Site_1 and site_2 only contained an images folder with the relevant images and a services worker sw.js.

On closer examination I discovered that the fetch event never reached the service workers in site_1 or site_2 but only used the service worker in the root. In theory the way I understood it they should have taken over control in their respective scopes but did not. I later found out that the reason for this is that the service worker in the root has access to all caches created within its scope and naturally site_1 and site_2 falls under the scope of the root. Consequently, service worker in the root can retrieve data stored in the cache site_1-vx.x and site_2-vx.x without invoking either of the other service workers even though they are active.

I therefore made changes to site_1 and left site_2 unchanged.

## Changes to site_1

I made the following changes to site_1
* moved gallery.html into root of site_1
* copied main.js and bulma.js into /src/js folder of site_1
* copied inc folder including navigation.html into site_1
* added favicon.ico, D4M-Logo PNG-8.png and d4m_namepng in images folder
* added gallery.html, navigation.html, main.js and bulma.js to the filesToCache constant in sw.js
* changed href for a tag in navigation to point to "/site_1/gallery.html"

Changes made to root and root service worker.
* removed gallery.html from root
* changed href for a tag in navigation to point to "/site_1/gallery.html"
* removed gallery.html from filesToCache constant in root service worker (sw.js)

## Result

The app won't cache anything in site_1 before the page is actually loaded. After gallery.html has been loaded it is cached and available in offline mode too. What happens now when you trace the execution path when gallery.html is requested is that it is served from site_1's service worker and not by the root service worker. Items stored in the cache for site_2 is still retrieved by the root service worker.

We can conclude that it is of great importance from where the request for resources is coming. Any request originating in the root will be served by the root service worker rather than the local service worker that cached the resource. The root service worker has a scope that includes all child objects and directories of the root directory. The root service worker can read data in caches that are created by service workers in subfolders of the root and will do so to serve requests. Bu if the request comes from a subfolder that has its own service worker then that service worker will be engaged within its scope. Requests for other resources outside of the scope for the local service worker will be served by the root service worker.
