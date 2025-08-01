import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isDebug = process.env.VITE_DEBUG?.toLowerCase() !== 'false';

export default defineConfig({
  server: {
    host: isDebug ? 'localhost' : '0.0.0.0',
    port: 3000,
    hmr: {
      port: 3000,
    }
  },
  plugins: [react()],
});