import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as dotenv from 'dotenv'

// Dotenv config
dotenv.config()

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: true
  },
  plugins: [react()],
  define: {
    "process.env.BACKEND_URL": JSON.stringify(process.env.BACKEND_URL),
    "process.env.WORK_EXPERIENCE_COLLECTION": JSON.stringify(process.env.WORK_EXPERIENCE_COLLECTION),
  }
})
