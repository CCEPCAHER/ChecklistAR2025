// Definimos un nombre y versión para nuestra caché
const CACHE_NAME = 'checklist-programa-v1';

// Listamos los archivos que componen el "app shell" (la estructura básica de la app)
// Estos son los archivos necesarios para que la app se muestre y funcione sin conexión.
const URLS_TO_CACHE = [
  '/',
  'index.html',
  'styles.css',
  'script.js',
  'manifest.json',
  // Iconos (asegúrate de que las rutas coincidan con las de tu manifest.json)
  'images/icons/icon-192x192.png',
  'images/icons/icon-512x512.png',
  // Fuentes y estilos externos (esenciales para la apariencia offline)
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  // Scripts de Firebase (para que la lógica de la app no falle al cargar)
  'https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js',
  'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js'
];

// Evento 'install': se dispara cuando el service worker se instala.
// Aquí es donde guardamos en caché los archivos del app shell.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierta. Guardando archivos del App Shell...');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Evento 'activate': se dispara cuando el service worker se activa.
// Aquí limpiamos las cachés antiguas que ya no se usan.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Borrando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Evento 'fetch': se dispara cada vez que la app hace una petición de red (ej. pedir una imagen, un CSS, etc.).
// Estrategia: "Cache first, falling back to network".
self.addEventListener('fetch', event => {
  // Solo interceptamos peticiones GET
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Si la respuesta está en la caché, la devolvemos inmediatamente.
        if (cachedResponse) {
          return cachedResponse;
        }
        // Si no está en la caché, vamos a la red a buscarla.
        return fetch(event.request);
      })
  );
});
