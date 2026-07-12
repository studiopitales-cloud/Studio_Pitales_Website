export function initializeGA4() {
  if (typeof window === 'undefined') return

  const GA_MEASUREMENT_ID = 'G-9G2SBH2MJ0'

  // Prevent duplicate initialization
  if (window.gtag) return

  // Create global gtag function
  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag

  // Initialize gtag
  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // We'll handle page views manually for SPA
  })

  // Load GA4 script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)
}

export function trackPageView(path, title) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
    })
  }
}

export function trackGenerateLead() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead')
  }
}
