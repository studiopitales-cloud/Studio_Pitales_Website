import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const HOLD       = 200  // ms between each progress tick
const EXIT_DELAY = 400  // ms to hold after reaching 100% before exit

export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting]   = useState(false)

  useEffect(() => {
    let prog = 0

    const iv = setInterval(() => {
      prog = Math.min(100, prog + Math.random() * 30)
      setProgress(prog)

      if (prog >= 100) {
        clearInterval(iv)
        setTimeout(() => {
          setExiting(true)
          setTimeout(onDone, 400)
        }, EXIT_DELAY)
      }
    }, HOLD)

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
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
