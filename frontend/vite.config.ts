import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const frontendDir = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react()],
  // Product previews live in Django's static directory and must not be copied or cleaned by Vite.
  publicDir: false,
  base: '/static/frontend/build/',
  build: {
    outDir: resolve(frontendDir, '../backend/static/frontend/build'),
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/app.js',
        assetFileNames: 'assets/app[extname]',
      },
    },
  },
})
