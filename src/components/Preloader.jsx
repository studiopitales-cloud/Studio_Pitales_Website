import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DURATION = 900  // ms for bar to fill
const HOLD     = 200  // ms to hold after bar fills before exit

export default function Preloader({ onDone }) {
  const [exiting, setExiting] = useState(false)
  const [barWidth, setBarWidth] = useState(null)
  const logoRef = useRef(null)

  const measureLogo = () => {
    if (logoRef.current) {
      const w = logoRef.current.getBoundingClientRect().width
      if (w > 0) setBarWidth(w)
    }
  }

  useEffect(() => {
    const t = setTimeout(() => {
      setExiting(true)
      setTimeout(onDone, 400)
    }, DURATION + HOLD)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: '#f0ece4', height: '100dvh', top: 0, bottom: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex flex-col items-center" style={{ transform: 'translateY(-5vh)' }}>
            <img
              ref={logoRef}
              src="/brand_assets/tal_logo_slogan_4.svg"
              alt="Pitales Studio"
              className="w-[65vw] h-auto md:w-auto md:h-[150px]"
              style={{ filter: 'brightness(0)' }}
              onLoad={measureLogo}
            />

            <div
              className="mt-3 overflow-hidden"
              style={{
                height: 4,
                background: 'rgba(26,26,26,0.12)',
                borderRadius: 99,
                width: barWidth || '50vw',
                visibility: barWidth ? 'visible' : 'hidden',
              }}
            >
              {barWidth && (
                <motion.div
                  style={{ height: '100%', background: '#1a1a1a', borderRadius: 99, transformOrigin: 'left' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: DURATION / 1000, ease: [0.4, 0, 0.6, 1] }}
                />
              )}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
