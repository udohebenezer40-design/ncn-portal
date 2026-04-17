import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ncn-portal/',   // must match your GitHub repo name
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})
