// src/ServiceWorker.js
// Función para registrar el Service Worker

export async function registerServiceWorker() {
  // Verificar si el navegador soporta Service Workers
  if (!('serviceWorker' in navigator)) {
    console.log('Service Workers no son soportados en este navegador');
    return null;
  }

  try {
    // Esperar a que la página esté completamente cargada
    await new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', resolve);
      }
    });

    console.log('🔄 Registrando Service Worker...');

    // Registrar el Service Worker
    const registration = await navigator.serviceWorker.register('/service-worker.js', {
      scope: '/'
    });

    console.log('✅ Service Worker registrado correctamente:', registration.scope);

    // Manejar actualizaciones del Service Worker
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      console.log('🆕 Nueva versión del Service Worker encontrada');

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          console.log('📦 Nueva versión instalada, esperando activación...');
          
          // Mostrar notificación al usuario sobre la actualización
          showUpdateNotification(newWorker);
        }
      });
    });

    // Verificar si hay una actualización disponible
    registration.update();

    // Verificar actualizaciones cada hora
    setInterval(() => {
      registration.update();
    }, 60 * 60 * 1000);

    return registration;

  } catch (error) {
    console.error('❌ Error al registrar Service Worker:', error);
    return null;
  }
}

// Mostrar notificación de actualización al usuario
function showUpdateNotification(newWorker) {
  // Crear elemento de notificación
  const notification = document.createElement('div');
  notification.id = 'sw-update-notification';
  notification.style.cssText = `
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    background: #404040;
    color: #fafafa;
    padding: 18px 28px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    z-index: 10000;
    display: flex;
    gap: 16px;
    align-items: center;
    animation: slideUp 0.4s ease;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  `;

  notification.innerHTML = `
    <span style="font-weight: 300; font-size: 14px;">Nueva versión disponible</span>
    <button id="sw-update-btn" style="
      background: #78350f;
      color: #fafafa;
      border: none;
      padding: 8px 18px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 400;
      font-size: 13px;
      transition: all 0.2s;
    ">Actualizar</button>
    <button id="sw-dismiss-btn" style="
      background: transparent;
      color: #d4d4d4;
      border: 1px solid #525252;
      padding: 8px 18px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 300;
      font-size: 13px;
      transition: all 0.2s;
    ">Después</button>
  `;

  // Agregar estilos de animación
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideUp {
      from {
        transform: translateX(-50%) translateY(100px);
        opacity: 0;
      }
      to {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
      }
    }
    #sw-update-btn:hover {
      background: #92400e !important;
      transform: translateY(-1px);
    }
    #sw-dismiss-btn:hover {
      background: #525252 !important;
      border-color: #737373 !important;
    }
  `;
  document.head.appendChild(style);

  document.body.appendChild(notification);

  // Botón para actualizar
  document.getElementById('sw-update-btn').addEventListener('click', () => {
    newWorker.postMessage({ type: 'SKIP_WAITING' });
    window.location.reload();
  });

  // Botón para descartar
  document.getElementById('sw-dismiss-btn').addEventListener('click', () => {
    notification.remove();
  });

  // Auto-remover después de 10 segundos
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 10000);
}

// Función para verificar el estado del Service Worker
export function checkServiceWorkerStatus() {
  if (!('serviceWorker' in navigator)) {
    return {
      supported: false,
      registered: false,
      active: false
    };
  }

  return {
    supported: true,
    registered: !!navigator.serviceWorker.controller,
    active: navigator.serviceWorker.controller?.state === 'activated'
  };
}

// Función para desregistrar el Service Worker (útil para desarrollo)
export async function unregisterServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      const result = await registration.unregister();
      console.log('Service Worker desregistrado:', result);
      return result;
    }
    return false;
  } catch (error) {
    console.error('Error al desregistrar Service Worker:', error);
    return false;
  }
}

// Función para cachear URLs adicionales bajo demanda
export async function cacheUrls(urls) {
  if (!('serviceWorker' in navigator) || !navigator.serviceWorker.controller) {
    console.log('Service Worker no disponible para cachear URLs');
    return;
  }

  navigator.serviceWorker.controller.postMessage({
    type: 'CACHE_URLS',
    urls: urls
  });
}

// Escuchar mensajes del Service Worker
navigator.serviceWorker?.addEventListener('message', (event) => {
  console.log('Mensaje del Service Worker:', event.data);
  
  if (event.data.type === 'SW_UPDATED') {
    console.log('Service Worker actualizado');
  }
});

// Detectar cuando el Service Worker toma control
navigator.serviceWorker?.addEventListener('controllerchange', () => {
  console.log('🔄 Service Worker ha tomado control');
  // La página será recargada automáticamente
});