import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'fs'
import { join, extname } from 'path'
import { createServer } from 'http'
import puppeteer from 'puppeteer'

const PORT = 4173

const ROUTES = [
  '/',
  '/blog',
  '/blog/what-is-reformer-pilates',
  '/blog/what-pilates-does-to-body',
  '/blog/pilates-body-toning',
  '/blog/mat-vs-reformer-pilates',
  '/blog/pilates-core-strengthening',
  '/blog/personal-attention-in-pilates',
  '/blog/pilates-injury-rehabilitation',
  '/blog/pilates-for-seniors',
  '/blog/pilates-for-athletes',
  '/blog/pilates-during-pregnancy',
  '/blog/pilates-after-birth',
  '/blog/pilates-for-fibromyalgia',
  '/privacy',
  '/terms',
  '/accessibility',
]

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.mjs':  'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
  '.ico':  'image/x-icon',
}

function startServer() {
  return new Promise(resolve => {
    const server = createServer((req, res) => {
      const urlPath = req.url.split('?')[0]
      const filePath = join('dist', urlPath)
      const ext = extname(filePath).toLowerCase()

      if (ext && existsSync(filePath)) {
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
        res.end(readFileSync(filePath))
        return
      }

      // SPA fallback
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      res.end(readFileSync(join('dist', 'index.html')))
    })
    server.listen(PORT, () => resolve(server))
  })
}

async function prerender() {
  console.log('🚀 Pre-rendering started...\n')
  const server = await startServer()

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })

  for (const route of ROUTES) {
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 900 })

    try {
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      })

      // Wait for React to mount content
      await page.waitForSelector('#root > *', { timeout: 15000 })

      // Allow animations and useEffect to settle
      await new Promise(r => setTimeout(r, 1200))

      let html = await page.content()

      // Normalize any absolute localhost URLs back to root-relative
      html = html.replace(/http:\/\/localhost:\d+\//g, '/')

      if (route === '/') {
        writeFileSync(join('dist', 'index.html'), html)
      } else {
        const dir = join('dist', route)
        mkdirSync(dir, { recursive: true })
        writeFileSync(join(dir, 'index.html'), html)
      }

      console.log(`  ✓ ${route}`)
    } catch (err) {
      console.warn(`  ✗ ${route} — ${err.message}`)
    } finally {
      await page.close()
    }
  }

  await browser.close()
  server.close()
  console.log('\n✅ Pre-render complete')
}

prerender().catch(err => {
  console.error('\n❌ Pre-render failed:', err)
  process.exit(1)
})
