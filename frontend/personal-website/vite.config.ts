import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as dotenv from 'dotenv'

// Dotenv config
dotenv.config()

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: true,

    // For testing
    // proxy: {
    //   "/api": "http://localhost:3000"
    // }
  },
  plugins: [react()],
  define: {
    "process.env.VERCEL_SERVER_ENDPOINT": JSON.stringify(process.env.VERCEL_SERVER_ENDPOINT),
    "process.env.WORK_EXPERIENCE_COLLECTION": JSON.stringify(process.env.WORK_EXPERIENCE_COLLECTION),
  }
})
