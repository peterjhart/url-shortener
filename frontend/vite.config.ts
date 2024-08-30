import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        'assets/main': resolve(__dirname, 'index.html'),
        'admin/assets/admin': resolve(__dirname, 'admin/index.html'),
      },
      output: {
        entryFileNames: '[name]-[hash].js',
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
})
