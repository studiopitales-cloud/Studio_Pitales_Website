import { useEffect } from 'react'

const PHONE_NUMBER = '972508290919'
const MESSAGE = 'היי, אשמח לקבל פרטים על הסטודיו 🙂'

export default function WhatsAppRedirect() {
  useEffect(() => {
    // Fire GA4 event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'whatsapp_bio', {
        'event_category': 'engagement',
        'event_label': 'instagram_bio',
      })
    }

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(MESSAGE)
    const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`

    // Redirect immediately
    window.location.href = whatsappUrl
  }, [])

  // Fallback UI in case JS doesn't work (should not be visible)
  return (
    <div className="min-h-screen bg-[#f0ece4] flex items-center justify-center" dir="rtl">
      <p className="text-[#1a1a1a]">מעביר לוואטסאפ...</p>
    </div>
  )
}
