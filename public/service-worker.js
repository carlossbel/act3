// public/service-worker.js
// Service Worker para Coffeel PWA

const CACHE_NAME = 'coffeel-v1.0.0';
const RUNTIME_CACHE = 'coffeel-runtime';

// App Shell - recursos estáticos esenciales
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando Service Worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Cacheando App Shell');
        return cache.addAll(APP_SHELL);
      })
      .then(() => {
        console.log('[SW] App Shell cacheado correctamente');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Error al cachear App Shell:', error);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activando Service Worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
              console.log('[SW] Eliminando caché antigua:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service Worker activado');
        return self.clients.claim();
      })
  );
});

// Estrategia de caché: Cache First con Network Fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo cachear requests del mismo origen
  if (url.origin !== location.origin) {
    return;
  }

  // Estrategia Cache First para navegación y recursos estáticos
  if (request.mode === 'navigate' || request.destination === 'script' || 
      request.destination === 'style' || request.destination === 'image') {
    
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            console.log('[SW] Sirviendo desde caché:', request.url);
            return cachedResponse;
          }

          console.log('[SW] Fetching desde red:', request.url);
          return fetch(request)
            .then((response) => {
              // No cachear respuestas incorrectas
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // Clonar la respuesta
              const responseToCache = response.clone();

              caches.open(RUNTIME_CACHE)
                .then((cache) => {
                  cache.put(request, responseToCache);
                });

              return response;
            })
            .catch((error) => {
              console.error('[SW] Error al fetch:', error);
              
              // Si es una navegación, devolver index.html del caché
              if (request.mode === 'navigate') {
                return caches.match('/index.html');
              }
            });
        })
    );
  }
});

// Mensajes desde la aplicación
self.addEventListener('message', (event) => {
  console.log('[SW] Mensaje recibido:', event.data);

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(RUNTIME_CACHE)
        .then((cache) => {
          return cache.addAll(event.data.urls);
        })
    );
  }
});

// Sincronización en segundo plano (opcional)
self.addEventListener('sync', (event) => {
  console.log('[SW] Evento de sincronización:', event.tag);
  
  if (event.tag === 'sync-data') {
    event.waitUntil(
      syncData()
    );
  }
});

async function syncData() {
  console.log('[SW] Sincronizando datos...');
  // Aquí puedes implementar lógica de sincronización
}

// Notificaciones Push (opcional)
self.addEventListener('push', (event) => {
  console.log('[SW] Push recibido');
  
  const options = {
    body: event.data ? event.data.text() : 'Nueva actualización disponible',
    icon: '/icon-192.png',
    badge: '/icon-96.png',
    vibrate: [200, 100, 200],
    tag: 'coffeel-notification',
  };

  event.waitUntil(
    self.registration.showNotification('Coffeel', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notificación clickeada');
  event.notification.close();

  event.waitUntil(
    clients.openWindow('/')
  );
});