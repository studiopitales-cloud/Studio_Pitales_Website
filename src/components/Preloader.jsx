import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STEP_INTERVAL = 120  // ms between progress ticks
const MAX_STEP      = 45   // max % added per tick (random 0–45)
const MAX_DURATION  = 800  // safety cap (fires <0.1% of runs)
const EXIT_DELAY    = 200  // ms to hold at 100% before fading

export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting]   = useState(false)

  useEffect(() => {
    let prog  = 0
    const t0  = Date.now()

    const iv = setInterval(() => {
      const forced = Date.now() - t0 >= MAX_DURATION
      prog = forced ? 100 : Math.min(100, prog + Math.random() * MAX_STEP)
      setProgress(prog)

      if (prog >= 100) {
        clearInterval(iv)
        setTimeout(() => {
          setExiting(true)
          setTimeout(onDone, 400)
        }, EXIT_DELAY)
      }
    }, STEP_INTERVAL)

    return () => clearInterval(iv)
  }, [])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: '#f0ece4', height: '100dvh' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
                transition={{ duration: 0.12, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
