import { createServer } from 'vite'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const server = await createServer({
  root: __dirname,
  configFile: `${__dirname}/vite.config.js`,
  server: { port: 3000 },
})

await server.listen()
server.printUrls()
console.log('\nPress Ctrl+C to stop the server.')
