var CACHE_NAME = 'degree-english-cache-v1';
var FILES_TO_CACHE = [
  './',
  './index.html',
  './css/style.css',
  './js/utils.js',
  './js/store.js',
  './js/coach.js',
  './js/app.js',
  './js/pages/practice.js',
  './js/pages/reading.js',
  './js/pages/cloze.js',
  './js/pages/translation.js',
  './js/pages/wrong-book.js',
  './js/pages/flashcard.js',
  './js/pages/dashboard.js',
  './js/pages/exam.js',
  './js/pages/knowledge.js',
  './js/pages/settings.js',
  './data/conversation.js',
  './data/vocab-grammar.js',
  './data/reading.js',
  './data/cloze.js',
  './data/translation.js',
  './data/flashcards.js',
  './data/knowledge.js',
  './manifest.webmanifest',
  './assets/app-icon.svg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(key) {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
