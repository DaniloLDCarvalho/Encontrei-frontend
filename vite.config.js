import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    postcss: {},
  },
  server: {
    port: 5173,
    proxy: {
      // proxy API requests to backend running on localhost:5001 (5000 is used by macOS services on some machines)
      '/users': 'http://localhost:5001',
      '/stores': 'http://localhost:5001',
      '/products': 'http://localhost:5001',
      '/reservations': 'http://localhost:5001'
    }
  }
})
