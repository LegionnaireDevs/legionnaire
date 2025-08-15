import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // any request starting with /api goes to Flask
      '/api': 'http://127.0.0.1:5000'
    }
  }
})
