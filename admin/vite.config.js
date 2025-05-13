import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { host: true, port: 3001, strictPort: true },
  preview: {
    port: process.env.VITE_PREVIEW_PORT_2 ? parseInt(process.env.VITE_PREVIEW_PORT_2) : 3001,
    strictPort: true,
    allowedHosts: [
      process.env.VITE_ADMINPANEL_URL ? process.env.VITE_ADMINPANEL_URL.replace(/https?:\/\//, '') : 'localhost',
    ],
  },
})
