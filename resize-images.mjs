import sharp from 'sharp'
import { statSync, existsSync } from 'fs'
import { join } from 'path'

const PUBLIC = './public'
const QUALITY = 80

const IMAGES = [
  // ── Hero (full viewport)
  { src: 'DSC08455.jpg', sizes: [480, 1280, 1920] },

  // ── AboutUs (50vw desktop / full mobile)
  { src: 'DSC07363.jpg', sizes: [480, 800, 1280] },

  // ── Gallery tall (desktop only, 33vw)
  { src: 'DSC07910.jpg', sizes: [1280] },

  // ── Gallery normal (50vw mobile / 33vw desktop)
  { src: 'DSC07873.jpg', sizes: [400, 800] },
  { src: 'DSC07980.jpg', sizes: [400, 800] },
  { src: 'DSC08053.jpg', sizes: [400, 800] },
  { src: 'DSC08236.jpg', sizes: [400, 800] },

  // ── Team cards (always small: 195–330px)
  { src: 'DSC06999.jpg', sizes: [700] },
  { src: 'DSC06963.jpg', sizes: [700] },
  { src: 'DSC06906.jpg', sizes: [700] },
  { src: 'DSC07585.jpg', sizes: [700] },

  // ── Blog images (thumbnail + full header)
  { src: 'DSC07194.jpg', sizes: [480, 1280] },
  { src: 'DSC08037.jpg', sizes: [480, 1280] },
  { src: 'DSC07902.jpg', sizes: [480, 1280] },
  { src: 'DSC08209.jpg', sizes: [480, 1280] },
  { src: 'DSC07286.jpg', sizes: [480, 1280] },
  { src: 'DSC07520.jpg', sizes: [480, 1280] },
  { src: 'DSC07564.jpg', sizes: [480, 1280] },
  { src: 'DSC07803.jpg', sizes: [480, 1280] },
  { src: 'DSC08094.jpg', sizes: [480, 1280] },
  { src: 'DSC07474.jpg', sizes: [480, 1280] },
  // Special names → sanitized output names
  { src: 'DSC07873 (1).jpg', out: 'DSC07873-1.jpg', sizes: [480, 1280] },
  { src: 'DSC08236 (1).jpg', out: 'DSC08236-1.jpg', sizes: [480, 1280] },
]

let totalSaved = 0
let fileCount  = 0

for (const img of IMAGES) {
  const srcPath = join(PUBLIC, img.src)
  if (!existsSync(srcPath)) { console.warn(`  ⚠ not found: ${img.src}`); continue }

  const baseName = (img.out ?? img.src).replace('.jpg', '')

  for (const w of img.sizes) {
    const outName = `${baseName}-${w}.jpg`
    const outPath = join(PUBLIC, outName)

    const before = statSync(srcPath).size
    await sharp(srcPath).resize(w).jpeg({ quality: QUALITY }).toFile(outPath)
    const after = statSync(outPath).size

    totalSaved += before - after
    fileCount++
    console.log(`  ✓ ${outName.padEnd(28)} ${Math.round(before/1024).toString().padStart(5)} kB → ${Math.round(after/1024).toString().padStart(4)} kB`)
  }
}

console.log(`\n${fileCount} files created  |  Original avg: ${Math.round(totalSaved/fileCount/1024)} kB saved per file`)
