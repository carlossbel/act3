# 🛍️ PWA Shop - Progressive Web App

> Aplicación web progresiva con funcionalidad offline completa, construida con React + Vite.

## ✨ Características

- ⚡ Carga instantánea con App Shell Architecture
- 📱 Instalable en móviles y desktop
- 🔌 Funciona sin conexión (Service Workers)
- 🎨 Interfaz responsive con Tailwind CSS
- 🔄 Actualizaciones automáticas

## 🚀 Instalación y Uso

```bash
#clonar repositorio de github
git clone https://github.com/XXSOMBERJAMXX/pwa_app_shell.git
# abrir carpeta
cd pwa-app-shell

# Instalar dependencias
npm install

# Desarrollo (funcionalidad PWA limitada)
npm run dev

# Producción (testing completo de PWA)
npm run build
npm run preview
```

**Importante:** Para probar la funcionalidad PWA completa, siempre usa `npm run build && npm run preview`.

## 🏗️ Arquitectura

### Estructura del Proyecto

```
pwa-app-shell/
├── public/
│   ├── service-worker.js       # Service Worker personalizado
│   ├── manifest.json           # Configuración PWA
│   └── pwa-*.png              # Íconos (64, 192, 512)
├── src/
│   ├── components/
│   │   └── InstallPWA.jsx     # Botón de instalación
│   ├── registerServiceWorker.js
│   ├── App.jsx                # Componente principal
│   └── main.jsx               # Entry point + registro SW
├── index.html                 # HTML con meta tags PWA
├── vite.config.js             # Configuración build
├── netlify.toml               # Configuración deployment
└── package.json
```

### App Shell Pattern

La aplicación usa el patrón App Shell:

```
┌───────────────────────────┐
│  Header (siempre visible) │
├───────────────────────────┤
│ Sidebar │  Contenido      │
│         │  Dinámico       │
│ - Home  │  (cambia según  │
│ - Prods │   la vista)     │
│ - News  │                 │
│ - Tasks │                 │
├───────────────────────────┤
│  Footer (siempre visible) │
└───────────────────────────┘
```

**Componentes:**
- **Shell fijo:** Header, Sidebar, Footer → Cacheado inmediatamente
- **Contenido dinámico:** Vistas que cambian → Cacheado bajo demanda

### Service Worker - Estrategias de Caché

El Service Worker (`public/service-worker.js`) implementa 3 estrategias:

| Estrategia | Uso | Prioridad |
|------------|-----|-----------|
| **Cache First** | App Shell (HTML, CSS, JS) | Caché → Red |
| **Network First** | Contenido dinámico | Red → Caché |
| **Stale While Revalidate** | Imágenes, assets | Caché + actualización background |

**Cachés creadas:**
- `pwa-app-shell-v1` - Shell de la aplicación
- `pwa-runtime-v1` - Contenido dinámico

## 🔌 Probar Funcionalidad Offline

### Método 1: Chrome DevTools (Recomendado)

```bash
# 1. Construir y ejecutar
npm run build
npm run preview

# 2. Abrir http://localhost:4173 en Chrome

# 3. Abrir DevTools (F12)

# 4. Application → Service Workers
#    - Verificar estado: "activated and is running"

# 5. Marcar checkbox "Offline"

# 6. Recargar página (F5)

# ✅ La app debe funcionar completamente
```

### Método 2: Modo Avión (Móvil)

```bash
# 1. Instalar la PWA en tu móvil
# 2. Activar modo avión
# 3. Abrir la app
# ✅ Debe funcionar normalmente
```

### Verificar Caché en Consola

```javascript
// Ver cachés disponibles
caches.keys().then(console.log)
// Resultado: ["pwa-app-shell-v1", "pwa-runtime-v1"]

// Ver archivos en caché
caches.open('pwa-app-shell-v1')
  .then(cache => cache.keys())
  .then(keys => console.log(keys.map(k => k.url)))
```

## 📱 Instalar la PWA

### Desktop (Chrome/Edge)
1. Click en el ícono **⊕** en la barra de direcciones
2. O espera el banner automático (10 segundos)

### Android (Chrome)
1. Menú **(⋮)** → **"Instalar app"**
2. O banner automático "Agregar a pantalla"

### iOS (Safari)
1. Botón **Compartir** (□↑)
2. **"Agregar a pantalla de inicio"**

### Opción general
Dentro de la url https://appshell-act3.netlify.app/, aparecerá un borón para descargar la pwa y esté en tu menú de aplicaciones (para móbil). Esto fue testeado desde un Android y en Chrome.

## ⚙️ Configuración Importante

### 1. Manifest (`public/manifest.json`)

Personalización de PWA:

```json
{
  "name": "Tu App",
  "short_name": "App",
  "theme_color": "#2563eb",
  "background_color": "#ffffff",
  "display": "standalone"
}
```

### 2. Service Worker (`public/service-worker.js`)

Actualiza la versión del caché al hacer cambios:

```javascript
const CACHE_NAME = 'pwa-app-shell-v2'; // Cambiar versión
```



## 🚀 Despliegue en Netlify

### Opción Elegida: Drag & Drop (Más rápido)

```bash
npm run build
# Arrastra carpeta dist/ a https://app.netlify.com/drop
```



## 🐛 Troubleshooting

### Service Worker no funciona

```bash
# Limpia caché y reconstruye
rm -rf dist
npm run build
npm run preview

# En DevTools:
# Application → Clear storage → Clear site data
```

### No funciona offline

**Causa común:** Estás usando `npm run dev` en lugar de `npm run preview`

**Solución:**
```bash
npm run build  # IMPORTANTE
npm run preview
```

### Error "Failed to execute 'clone'"

**Solución:** Actualiza `public/service-worker.js` con la versión corregida que verifica la respuesta antes de clonar:

```javascript
if (networkResponse && networkResponse.ok) {
  cache.put(request, networkResponse.clone());
}
```

## 📊 Stack Tecnológico

- **Frontend:** React 18 + Vite 5
- **Styling:** Tailwind CSS 3
- **Icons:** Lucide React
- **PWA:** Service Workers + Web App Manifest
- **Deploy:** Netlify

