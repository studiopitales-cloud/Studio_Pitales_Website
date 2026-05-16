import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DURATION = 1800 // ms for bar to fill
const HOLD     = 400  // ms to hold after bar fills before exit

export default function Preloader({ onDone }) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setExiting(true)
      setTimeout(onDone, 700)
    }, DURATION + HOLD)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: '#f0ece4' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="/brand_assets/tal_logo_2.svg"
            alt="Pitales Studio"
            style={{ height: 'clamp(90px, 14vw, 140px)', filter: 'brightness(0)' }}
          />

          {/* Loading bar track */}
          <div
            className="mt-8 overflow-hidden"
            style={{ width: 'clamp(140px, 22vw, 220px)', height: 2, background: 'rgba(26,26,26,0.12)', borderRadius: 99 }}
          >
            <motion.div
              style={{ height: '100%', background: '#1a1a1a', borderRadius: 99 }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: DURATION / 1000, ease: [0.4, 0, 0.6, 1] }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
