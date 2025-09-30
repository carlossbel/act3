import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 👈 Esto asegura que los assets carguen correctamente en Netlify
  
  // Configuración del servidor de desarrollo
  server: {
    port: 5173,
    open: true
  },
  
  // Configuración de build
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'icons': ['lucide-react']
        }
      }
    }
  },
  
  // Asegurar que el Service Worker se copie al build
  publicDir: 'public'
})
