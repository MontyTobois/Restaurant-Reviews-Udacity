console.log('Service Worker: Registered');

self.addEventListener('install', function(e) {
  e.waitUnitl(
    caches.open('v1').then(function(cache) {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {

    if (response) {
      console.log('Found', e.request, ' in cache');
      return response;

    } else {
      console.log('Could not find', e.request, 'in cache, FETCHING!');
        return fetch(e.request);
        .then(function (response) {
          const cloneResponse = response.clone();
          caches.open('v1').then(function(cache) {
            cache.put(e.request, cloneResponse);
          })
          return response;
        })
        .catch(function (err) {
          console.log(err);
        });
  }

const cacheFiles = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/restaurant_info.js',
  '/js/main.js',
  '/data/restaurant.json',
  '/img/1.png',
  '/img/2.png',
  '/img/3.png',
  '/img/4.png',
  '/img/5.png',
  '/img/6.png',
  '/img/7.png',
  '/img/8.png',
  '/img/9.png',
  '/img/10.png'
];
