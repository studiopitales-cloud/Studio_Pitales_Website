import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
    const raf = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
    })
    return () => cancelAnimationFrame(raf)
  }, [pathname])

  return null
}
