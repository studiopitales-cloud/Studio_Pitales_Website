import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { createReadStream, existsSync } from 'fs'
import { join, extname } from 'path'

const mime = {
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    {
      name: 'serve-brand-assets',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url.split('?')[0]
          if (!url.startsWith('/brand_assets/') && !url.startsWith('/images/') && !/^\/(DSC|IMG|img)\w*\.(jpg|jpeg|png)$/i.test(url) && !/^\/[^/]+\.(mp4|webm)$/i.test(url)) return next()
          const filePath = join(process.cwd(), url)
          if (!existsSync(filePath)) return next()
          const ct = mime[extname(filePath).toLowerCase()] || 'application/octet-stream'
          res.setHeader('Content-Type', ct)
          res.setHeader('Cache-Control', 'public, max-age=3600')
          createReadStream(filePath).pipe(res)
        })
      },
    },
  ],
  server: { port: 3000, host: true },
})
