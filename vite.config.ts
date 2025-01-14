import { defineConfig } from 'vite'
import sitemap from 'vite-plugin-sitemap'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap()
  ],
  base: './'
})
