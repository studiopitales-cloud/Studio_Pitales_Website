import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const HERO_SRC  = '/DSC08455-480.jpg' // smallest hero variant — fastest to load
const SAFETY_MS = 1200               // max wait before force-closing
const MIN_MS    = 350                // minimum visible time (brand moment)
const EXIT_HOLD = 100                // ms at 100% before fade starts
const EXIT_MS   = 300                // fade-out duration

// Non-linear progress curve: maps normalized time (0→1) to progress (0→0.92)
// Phase 1 (0–20% time): fast  → 0–30%
// Phase 2 (20–55% time): medium → 30–70%
// Phase 3 (55–100% time): decelerating → 70–92%
function progressCurve(t) {
  if (t < 0.20) return (t / 0.20) * 0.30
  if (t < 0.55) return 0.30 + ((t - 0.20) / 0.35) * 0.40
  const s = (t - 0.55) / 0.45
  return 0.70 + s * s * 0.22
}

export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting]   = useState(false)

  useEffect(() => {
    let rafId
    let startTime = null
    let done      = false
    let ready     = false

    function complete() {
      if (done) return
      done = true
      cancelAnimationFrame(rafId)
      setProgress(100)
      setTimeout(() => {
        setExiting(true)
        setTimeout(onDone, EXIT_MS)
      }, EXIT_HOLD)
    }

    // Real readiness signal: Hero image loaded (uses browser preload cache)
    const img = new Image()
    img.onload  = () => { ready = true }
    img.onerror = () => { ready = true }  // fail gracefully — don't block
    img.src = HERO_SRC

    // Safety fallback: force-close if hero never loads
    const safety = setTimeout(() => { ready = true }, SAFETY_MS)

    function tick(now) {
      if (done) return
      if (!startTime) startTime = now

      const elapsed = now - startTime
      const t       = Math.min(elapsed / SAFETY_MS, 1)
      const prog    = progressCurve(t) * 100

      setProgress(prog)

      // Complete when: image ready + minimum time passed + bar past midpoint
      if (ready && elapsed >= MIN_MS && prog >= 50) {
        complete()
        return
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      done = true
      cancelAnimationFrame(rafId)
      clearTimeout(safety)
    }
  }, [])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: '#f0ece4', height: '100dvh' }}
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_MS / 1000, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="inline-flex flex-col items-center"
            style={{ transform: 'translateY(-5vh)' }}
          >
            <img
              src="/brand_assets/tal_logo_slogan_4.svg"
              alt="Pitales Studio"
              className="w-[65vw] h-auto md:w-auto md:h-[150px]"
              style={{ filter: 'brightness(0)' }}
            />
            <div
              className="mt-3 w-full overflow-hidden"
              style={{ height: 4, background: 'rgba(26,26,26,0.12)', borderRadius: 99 }}
            >
              <motion.div
                style={{ height: '100%', background: '#1a1a1a', borderRadius: 99, transformOrigin: 'left' }}
                animate={{ scaleX: progress / 100 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
