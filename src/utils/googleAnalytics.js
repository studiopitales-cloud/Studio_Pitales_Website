export function initializeGA4() {
  if (typeof window === 'undefined') return

  const GA_MEASUREMENT_ID = 'G-9G2SBH2MJ0'

  // Check if gtag is already initialized (from HTML script)
  if (!window.gtag) {
    // Fallback: if gtag not found, create it (shouldn't happen if index.html is loaded)
    window.dataLayer = window.dataLayer || []
    window.gtag = function() {
      window.dataLayer.push(arguments)
    }
  }

  // Initialize GA4 config
  if (window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false, // We'll handle page views manually for SPA
    })
  }
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

export function trackClickWhatsApp() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click_whatsapp')
  }
}

export function trackClickPhone() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click_phone')
  }
}

export function trackClickInstagram() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click_instagram')
  }
}

export function trackClickFacebook() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click_facebook')
  }
}

export function trackOpenLeadForm() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'open_lead_form')
  }
}
