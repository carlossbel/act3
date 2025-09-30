# ☕ Coffeel - Progressive Web App

Coffeel es una Progressive Web App (PWA) para amantes del café con funcionalidad offline completa.

**Demo:** [https://coffelpwa.netlify.app/]  
**Repositorio:** https://github.com/carlossbel/act3

---

## 📋 Características

- **App Shell**: Header, sidebar, footer y 4 vistas dinámicas
- **Offline First**: Funciona sin conexión mediante Service Workers
- **Instalable**: Se puede instalar como app nativa
- **Responsive**: Diseño adaptable a todos los dispositivos
- **Contenido dinámico**:
  - Catálogo de productos (granos, equipos, accesorios)
  - Métodos de preparación (V60, Prensa Francesa, Espresso, Aeropress)
  - Diario cafetero (lista de deseos, recetas, registro de catas)

---

## 🏗️ Arquitectura

### Estructura del proyecto

```
coffeel-pwa/
├── public/
│   ├── service-worker.js      # Caché offline
│   ├── manifest.json           # Configuración PWA
│   └── icon-*.png             # Íconos múltiples tamaños
├── src/
│   ├── App.jsx                # Componente principal
│   ├── ServiceWorker.js       # Registro del SW
│   ├── main.jsx               # Entry point
│   └── index.css              # Estilos con Tailwind
├── index.html                 # HTML con splash screen
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── netlify.toml
```

### App Shell Pattern

1. **Shell estático** (cacheado): Estructura básica de la UI
2. **Contenido dinámico**: Vistas que se cargan según navegación
3. **Service Worker**: Cache-first strategy con network fallback

### Estrategia de caché

- **Cache First**: Recursos estáticos se sirven desde caché
- **Network Fallback**: Si falla la red, usa contenido cacheado
- **Runtime Cache**: Recursos nuevos se almacenan automáticamente

---

## 🚀 Instalación y Ejecución

### Requisitos
- Node.js 18+
- npm

### Comandos

```bash
# Clonar repositorio
git clone https://github.com/carlossbel/act3.git
cd act3

# Instalar dependencias
npm install

# Desarrollo
npm run dev
# http://localhost:5173

# Build producción
npm run build

# Preview del build
npm run preview
```

---

## 🧪 Probar Funcionamiento Offline

### Método 1: Chrome DevTools (Recomendado)

1. Abre la app en Chrome
2. Presiona `F12` (DevTools)
3. Ve a **Network** tab
4. Marca **Offline**
5. Recarga la página (`Ctrl+R` o `Cmd+R`)
6. ✅ La app debe funcionar completamente

### Método 2: Application Tab

1. `F12` → **Application**
2. **Service Workers** en el menú lateral
3. Verifica estado: **activated and running**
4. Marca **Offline**
5. Navega por las diferentes vistas

### Método 3: Modo Avión

1. Visita la app online al menos una vez
2. Activa modo avión / desconecta WiFi
3. Abre/recarga la aplicación
4. ✅ Debe funcionar sin conexión

### Verificar el Service Worker

**En DevTools > Application:**

- **Service Workers**: Estado "activated"
- **Cache Storage**: 
  - `coffeel-v1.0.0` (App Shell)
  - `coffeel-runtime` (recursos adicionales)
- **Manifest**: Datos correctos de la PWA

**Consola de JavaScript:**
```javascript
// Verificar registro del Service Worker
navigator.serviceWorker.controller
// Debe retornar un objeto ServiceWorker

// Ver estado de conexión
navigator.onLine
// true = online, false = offline
```

---

## 📱 Instalar como App

### Escritorio (Chrome/Edge)
1. Icono ⊕ en la barra de direcciones
2. Click "Instalar Coffeel"
3. Se abre en ventana independiente

### Android
1. Menú (⋮) → "Agregar a pantalla de inicio"
2. Confirmar instalación

### iOS/Safari
1. Botón compartir → "Agregar a pantalla de inicio"
2. Confirmar

---

## 🌐 Deploy en Netlify

### Automático (Recomendado)

1. Conecta repositorio en https://app.netlify.com
2. Netlify detecta `netlify.toml` automáticamente
3. Build: `npm run build`
4. Publish: `dist`
5. Deploy

### Manual

```bash
npm run build
# Arrastra carpeta /dist a Netlify
```

### Forzar rebuild

```bash
git commit --allow-empty -m "Trigger rebuild"
git push origin main
```

O en Netlify: **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

---

## 🛠️ Tecnologías

- **React 18** - Framework UI
- **Vite 5** - Build tool
- **Tailwind CSS 3** - Estilos utility-first
- **Lucide React** - Iconos
- **Service Workers API** - Funcionalidad offline
- **Web App Manifest** - Instalabilidad PWA

---

## 🐛 Solución de Problemas

### Service Worker no se registra
- Usa HTTPS o localhost
- Verifica que `/service-worker.js` exista en `public/`
- Revisa consola del navegador

### Cambios no se reflejan
- Incrementa versión en `service-worker.js` (`CACHE_NAME`)
- DevTools > Application > Clear storage
- Hard reload: `Ctrl+Shift+R`

### No funciona offline
- Visita la página online primero
- Verifica SW activado en DevTools
- Comprueba caché en Application > Cache Storage

### Sin estilos en Netlify
- Verifica que existan: `tailwind.config.js`, `postcss.config.js`
- Clear cache en Netlify y redeploy
- Revisa logs de build en Netlify

---

## 📄 Configuración

### Service Worker (`public/service-worker.js`)
```javascript
const CACHE_NAME = 'coffeel-v1.0.0'; // Incrementar para actualizar
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
];
```

### Manifest (`public/manifest.json`)
```json
{
  "name": "Coffeel",
  "theme_color": "#78350f",
  "background_color": "#92400e"
}
```

---

## 👤 Autor

Carlos - [GitHub](https://github.com/carlossbel)

Proyecto académico - Actividad 3

---

## 📚 Referencias

- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
```
