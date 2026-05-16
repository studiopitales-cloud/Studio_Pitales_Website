import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DURATION = 1800 // ms for bar to fill
const HOLD     = 400  // ms to hold after bar fills before exit

export default function Preloader({ onDone }) {
  const [exiting, setExiting] = useState(false)
  const [barWidth, setBarWidth] = useState(null)
  const logoRef = useRef(null)

  useEffect(() => {
    if (logoRef.current) {
      const w = logoRef.current.getBoundingClientRect().width
      setBarWidth(w * 1.4)
    }
  }, [])

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
          <div className="inline-flex flex-col items-center">
            <img
              ref={logoRef}
              src="/brand_assets/tal_slogan_.svg"
              alt="Pitales Studio"
              style={{ height: 'clamp(90px, 14vw, 140px)', width: 'auto', filter: 'brightness(0)' }}
            />

            {/* Loading bar — 140% of logo width (20% extra each side) */}
            <div
              className="mt-3 overflow-hidden"
              style={{ height: 4, background: 'rgba(26,26,26,0.12)', borderRadius: 99, width: barWidth ?? 'auto' }}
            >
              <motion.div
                style={{ height: '100%', background: '#1a1a1a', borderRadius: 99, transformOrigin: 'left' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: DURATION / 1000, ease: [0.4, 0, 0.6, 1] }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
