import { useEffect } from 'react'

const REDIRECT_URL = '/?utm_source=instagram&utm_medium=organic_social&utm_campaign=instagram_bio&utm_content=website'

export default function InstagramBioRedirect() {
  useEffect(() => {
    // Fire GA4 event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'website_bio', {
        'event_category': 'engagement',
        'event_label': 'instagram_bio',
      })
    }

    // Redirect to homepage with UTM parameters
    window.location.href = REDIRECT_URL
  }, [])

  // Fallback UI in case JS doesn't work (should not be visible)
  return (
    <div className="min-h-screen bg-[#f0ece4] flex items-center justify-center" dir="rtl">
      <p className="text-[#1a1a1a]">מעביר לעמוד הבית...</p>
    </div>
  )
}
