import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // proxy API requests to backend running on localhost:5000
      '/users': 'http://localhost:5000',
      '/stores': 'http://localhost:5000',
      '/products': 'http://localhost:5000',
      '/reservations': 'http://localhost:5000'
    }
  }
})
