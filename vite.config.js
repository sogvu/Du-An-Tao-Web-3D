import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves from /Du-An-Tao-Web-3D/ — must match repo name exactly
  base: '/Du-An-Tao-Web-3D/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
