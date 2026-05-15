import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Disable browser scroll restoration globally, once at module load
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

export default function ScrollToTop() {
  const { key } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    const raf = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
    })
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, 50)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
  }, [key])

  return null
}
