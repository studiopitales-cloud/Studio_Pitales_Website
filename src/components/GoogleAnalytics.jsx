import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initializeGA4, trackPageView } from '../utils/googleAnalytics'

export default function GoogleAnalytics() {
  const location = useLocation()

  // Initialize GA4 once on mount
  useEffect(() => {
    initializeGA4()
  }, [])

  // Track page view on route change
  useEffect(() => {
    trackPageView(location.pathname, document.title)
  }, [location.pathname])

  return null
}
