# 🚀 Guía de Instalación Rápida - Coffeel PWA

## 📋 Checklist de Archivos

Asegúrate de tener esta estructura:

```
coffeel-pwa/
├── public/
│   ├── service-worker.js ✅
│   └── manifest.json ✅
├── src/
│   ├── App.jsx ✅
│   ├── ServiceWorker.js ✅
│   ├── main.jsx ✅
│   └── index.css ✅
├── index.html ✅
├── package.json ✅
├── vite.config.js ✅
├── netlify.toml ✅
└── README.md ✅
```

**IMPORTANTE**: Con Tailwind CSS v4 + Vite Plugin:
- ❌ NO necesitas `tailwind.config.js`
- ❌ NO necesitas `postcss.config.js`
- ✅ Todo se configura en `index.css` con `@theme`

---

## 🛠️ Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Ejecutar en desarrollo

```bash
npm run dev
```

La app se abrirá en: `http://localhost:5173`

### 3. Probar el build

```bash
npm run build
npm run preview
```

---

## 🎨 Generar Íconos

Necesitas crear los íconos para la PWA. Usa una de estas herramientas:

### Opción 1: PWA Asset Generator (Recomendado)
```bash
npm install -g pwa-asset-generator

# Crea un logo.svg o logo.png de 512x512px
pwa-asset-generator logo.png ./public --icon-only
```

### Opción 2: Online
1. Ve a https://realfavicongenerator.net/
2. Sube un logo cuadrado (mínimo 512x512px)
3. Descarga todos los tamaños
4. Coloca los archivos en `/public/`

### Tamaños necesarios:
- icon-72.png
- icon-96.png
- icon-128.png
- icon-144.png
- icon-152.png
- icon-192.png
- icon-384.png
- icon-512.png

---

## 🧪 Probar Modo Offline

### Método 1: Chrome DevTools
1. Abre la app: `http://localhost:5173`
2. Presiona `F12`
3. Ve a Network tab
4. Marca "Offline"
5. Recarga (`Ctrl+R`)
6. ✅ Debe funcionar sin internet

### Método 2: Application Tab
1. `F12` → Application
2. Service Workers
3. Verifica que esté "activated"
4. Marca "Offline"

---

## 🌐 Deploy en Netlify

### Método 1: Git (Recomendado)

1. **Sube tu proyecto a GitHub**
```bash
git init
git add .
git commit -m "Initial commit - Coffeel PWA"
git branch -M main
git remote add origin <tu-repo-url>
git push -u origin main
```

2. **Conecta en Netlify**
- Ve a https://app.netlify.com
- Click en "Add new site" → "Import an existing project"
- Conecta con GitHub
- Selecciona tu repositorio
- Netlify detectará automáticamente la configuración del `netlify.toml`
- Click en "Deploy"

### Método 2: Drag & Drop

1. **Build local**
```bash
npm run build
```

2. **Deploy manual**
- Ve a https://app.netlify.com
- Arrastra la carpeta `/dist` al área de deploy
- ✅ Listo!

---

## 🔧 Solución de Problemas

### Pantalla en blanco
```bash
# 1. Verifica la consola del navegador (F12)
# 2. Verifica que todos los archivos estén en su lugar
# 3. Limpia caché y reinstala
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Service Worker no funciona en desarrollo
```javascript
// En src/main.jsx, descomenta esta línea:
if (import.meta.env.DEV) {
  registerServiceWorker();
}
```

### Cambios no se reflejan
```bash
# Hard reload
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)

# O limpia caché del Service Worker
# DevTools → Application → Clear storage → Clear site data
```

### Error de Tailwind
```bash
# Verifica que tienes la versión correcta
npm list tailwindcss @tailwindcss/vite

# Debe ser v4.0.0-alpha.25 o superior
```

---

## 📝 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Preview del build
npm run preview

# Linter
npm run lint

# Actualizar dependencias
npm update

# Verificar versiones
npm list
```

---

## ✅ Verificación Final

Antes de deployar, verifica:

- [ ] `npm run build` funciona sin errores
- [ ] Service Worker se registra correctamente
- [ ] App funciona offline
- [ ] Todos los íconos están en `/public/`
- [ ] `manifest.json` tiene los paths correctos
- [ ] `netlify.toml` está en la raíz
- [ ] No hay errores en la consola
- [ ] La app es responsive (mobile/tablet/desktop)

---

## 🎉 Listo!

Tu PWA Coffeel está lista para producción. 

**URL de ejemplo después del deploy:**
`https://coffeel.netlify.app`

---

## 📞 Soporte

Si tienes problemas:
1. Revisa la consola del navegador (F12)
2. Verifica los logs de build en Netlify
3. Consulta el README.md principal para más detalles