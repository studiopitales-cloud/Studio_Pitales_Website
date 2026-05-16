import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

const WazeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 122.71 122.88" xmlns="http://www.w3.org/2000/svg">
    <path fill="#ffffff" d="M55.14,104.21c4.22,0,8.44,0.19,12.66-0.09c3.84-0.19,7.88-0.56,11.63-1.5c29.82-7.31,45.76-40.23,32.72-68.07 C104.27,17.76,90.77,8.19,72.3,6.22c-14.16-1.5-26.82,2.72-37.51,12.28c-10.5,9.47-15.94,21.28-16.31,35.44 c-0.09,3.28,0,6.66,0,9.94C18.38,71.02,14.35,76.55,7.5,78.7c-0.09,0-0.28,0.19-0.38,0.19c2.63,6.94,13.31,17.16,19.97,19.69 C35.45,87.14,52.32,91.18,55.14,104.21z"/>
    <path fill="currentColor" d="M54.95,110.49c-1.03,4.69-3.56,8.16-7.69,10.31c-5.25,2.72-10.6,2.63-15.57-0.56c-5.16-3.28-7.41-8.25-7.03-14.35 c0.09-1.03-0.19-1.41-1.03-1.88c-9.1-4.78-16.31-11.44-21.28-20.44c-0.94-1.78-1.69-3.66-2.16-5.63c-0.66-2.72,0.38-4.03,3.19-4.31 c3.38-0.38,6.38-1.69,7.88-4.88c0.66-1.41,1.03-3.09,1.03-4.69c0.19-4.03,0-8.06,0.19-12.1c1.03-15.57,7.5-28.5,19.32-38.63 C42.67,3.97,55.42-0.43,69.76,0.03c25.04,0.94,46.51,18.57,51.57,43.23c4.59,22.32-2.34,40.98-20.07,55.51 c-1.03,0.84-2.16,1.69-3.38,2.44c-0.66,0.47-0.84,0.84-0.56,1.59c2.34,7.13-0.94,15-7.5,18.38c-8.91,4.41-19.22-0.09-21.94-9.66 c-0.09-0.38-0.56-0.84-0.84-0.84C63.11,110.4,59.07,110.49,54.95,110.49z M55.14,104.21c4.22,0,8.44,0.19,12.66-0.09 c3.84-0.19,7.88-0.56,11.63-1.5c29.82-7.31,45.76-40.23,32.72-68.07C104.27,17.76,90.77,8.19,72.3,6.22 c-14.16-1.5-26.82,2.72-37.51,12.28c-10.5,9.47-15.94,21.28-16.31,35.44c-0.09,3.28,0,6.66,0,9.94 C18.38,71.02,14.35,76.55,7.5,78.7c-0.09,0-0.28,0.19-0.38,0.19c2.63,6.94,13.31,17.16,19.97,19.69 C35.45,87.14,52.32,91.18,55.14,104.21z"/>
    <path fill="currentColor" d="M74.92,79.74c-11.07-0.56-18.38-4.97-23.07-13.78c-1.13-2.16-0.09-4.31,2.06-4.78c1.31-0.28,2.53,0.66,3.47,2.16 c1.22,1.88,2.44,3.75,4.03,5.25c8.81,8.34,23.25,5.72,28.79-5.06c0.66-1.31,1.5-2.34,3.09-2.34c2.34,0.09,3.66,2.44,2.63,4.59 c-2.91,5.91-7.5,10.22-13.69,12.28C79.51,78.99,76.7,79.36,74.92,79.74z"/>
    <path fill="currentColor" d="M55.32,48.98c-3.38,0-6.09-2.72-6.09-6.09s2.72-6.09,6.09-6.09s6.09,2.72,6.09,6.09C61.42,46.17,58.7,48.98,55.32,48.98z"/>
    <path fill="currentColor" d="M98.27,42.79c0,3.38-2.72,6.09-6,6.19c-3.38,0-6.09-2.63-6.09-6.09c0-3.38,2.63-6.09,6-6.19 C95.46,36.7,98.17,39.42,98.27,42.79z"/>
  </svg>
)

const FacebookIcon = () => (
  <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)
const InstagramIcon = () => (
  <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
)
const WhatsAppIcon = () => (
  <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
)

const SOCIAL = [
  { label: 'WhatsApp',  Icon: WhatsAppIcon,  href: 'https://wa.me/972508290919?text=%D7%94%D7%99%D7%99%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20%D7%94%D7%90%D7%AA%D7%A8%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A2%D7%9C%20%D7%94%D7%A1%D7%98%D7%95%D7%93%D7%99%D7%95%20%3A%29' },
  { label: 'Instagram', Icon: InstagramIcon, href: 'https://www.instagram.com/tal_pitales/' },
  { label: 'Facebook',  Icon: FacebookIcon,  href: 'https://www.facebook.com/profile.php?id=61563384290444' },
]

const PhoneIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
  </svg>
)

const EmailIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
)

const MAP_SRC = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3395.0!2d34.57304452609119!3d31.687571338865308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15029d001d425f1b%3A0xb8bdc3bb7140a4a!2z16HXmNeV15PXmdeVIFBJVEFMRVMgLSDXpNeZ15zXkNeY15nXoSDXnteb16nXmdeo15nXnSDXkdeQ16nXp9ec15XXnw!5e0!3m2!1siw!2sil!4v1778848616349!5m2!1siw!2sil"

function ColHeader({ title }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <div className="mb-6 text-center">
      <div ref={ref} className="inline-block">
        <h3 className="font-light tracking-[-0.02em] text-[#1a1a1a] text-[28px] md:text-[32px]">
          {title}
        </h3>
        <motion.div
          className="h-[3px] bg-[#92a6b4] mt-3 origin-right"
          style={{ width: '100%' }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        />
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <section id="contact" className="bg-[#f0ece4] overflow-hidden">


<div className="max-w-[1100px] mx-auto px-8 pb-10">

        {/* ══ DESKTOP: 3 columns ══ */}
        <div className="hidden md:grid grid-cols-3 gap-0 mb-10 pt-10" dir="rtl">

          {/* Col 1 — צור קשר (physical right) */}
          <div className="pl-8 text-center">
            <ColHeader title="צור קשר" />
            <div className="space-y-3">
              <p className="text-[15px] font-normal leading-[2.0] text-[#1a1a1a] flex items-center justify-center gap-2" dir="ltr">
                <PhoneIcon />
                <a href="tel:+972508290919" className="md:pointer-events-none md:cursor-default hover:text-[#92a6b4] md:hover:text-[#1a1a1a] transition-colors duration-200">
                  050-8290919
                </a>
              </p>
              <p className="text-[15px] font-normal leading-[2.0] text-[#1a1a1a] flex items-center justify-center gap-2" dir="ltr">
                <EmailIcon />
                <a href="mailto:studiopitales@gmail.com" className="hover:text-[#92a6b4] transition-colors duration-200">
                  studiopitales@gmail.com
                </a>
              </p>
            </div>
            <p className="text-[15px] font-normal leading-[2.0] text-[#1a1a1a] mt-4">מענה טלפוני:</p>
            <p className="text-[14px] font-normal leading-[2.0] text-[#1a1a1a]">
              א׳–ה׳ • 08:00–18:00<br />
              ו׳ וערבי חג • 08:00–12:00
            </p>
            <div className="flex justify-center gap-[25px] mt-6 [&_svg]:w-[30px] [&_svg]:h-[30px]">
              {SOCIAL.map(({ label, Icon, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="text-[#1a1a1a] hover:text-[#92a6b4] transition-colors duration-300">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — כתובת (physical center) */}
          <div className="px-8 text-center">
            <ColHeader title="כתובת" />
            <a href="https://waze.com/ul/hsv8s68t3z" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 mb-5 text-[#1a1a1a] hover:text-[#92a6b4] transition-colors duration-200">
              <span className="text-[15px] font-normal leading-[2.0]">ברנע, גדעון בן יואש 22, אשקלון</span>
              <WazeIcon />
            </a>
            <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px rgba(146,166,180,0.18)' }}>
              <iframe
                src={MAP_SRC}
                className="w-full aspect-[4/3]"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Studio Pitales מפה"
              />
            </div>
          </div>

          {/* Col 3 — מידע נוסף (physical left) */}
          <div className="pr-8 text-center">
            <ColHeader title="מידע נוסף" />
            <ul className="space-y-3">
              <li>
                <Link to="/terms" className="text-[15px] font-normal text-[#1a1a1a] hover:text-[#92a6b4] transition-colors duration-200">
                  תקנון האתר
                </Link>
              </li>
              <li>
                <Link to="/accessibility"                  className="text-[15px] font-normal text-[#1a1a1a] hover:text-[#92a6b4] transition-colors duration-200">
                  הצהרת נגישות
                </Link>
              </li>
              <li>
                <Link to="/privacy"                  className="text-[15px] font-normal text-[#1a1a1a] hover:text-[#92a6b4] transition-colors duration-200">
                  מדיניות פרטיות
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* ══ MOBILE: stacked ══ */}
        <div className="md:hidden mb-10">
          <header className="text-center pt-6 pb-3">
            <div className="inline-block">
              <h2 className="text-[28px] font-light tracking-[-0.02em] text-[#1a1a1a]">צור קשר</h2>
              <div className="h-[3px] bg-[#92a6b4] mt-3 w-full" />
            </div>
          </header>
          <div className="text-center">
            <div className="space-y-1" style={{ fontSize: 'clamp(16px, 1.45vw, 18px)' }}>
              <div className="flex items-center justify-center gap-2 font-normal text-[#1a1a1a]" dir="ltr">
                <EmailIcon />
                <a href="mailto:studiopitales@gmail.com" className="hover:text-[#92a6b4] transition-colors duration-200">studiopitales@gmail.com</a>
              </div>
              <div className="flex items-center justify-center gap-2 font-normal text-[#1a1a1a]" dir="ltr">
                <PhoneIcon />
                <a href="tel:+972508290919" className="hover:text-[#92a6b4] transition-colors duration-200">050-8290919</a>
              </div>
            </div>
            <p className="font-normal leading-[2.0] text-[#1a1a1a] mt-2" style={{ fontSize: 'clamp(16px, 1.45vw, 18px)' }}>מענה טלפוני:</p>
            <p className="font-normal leading-[2.0] text-[#1a1a1a]" style={{ fontSize: 'clamp(15px, 1.35vw, 17px)' }}>
              א׳–ה׳ • 08:00–18:00<br />
              ו׳ וערבי חג • 08:00–12:00
            </p>
          </div>
          <header className="text-center pt-6 pb-3">
            <div className="inline-block">
              <h2 className="text-[28px] font-light tracking-[-0.02em] text-[#1a1a1a]">כתובת</h2>
              <div className="h-[3px] bg-[#92a6b4] mt-3 w-full" />
            </div>
          </header>
          <a href="https://waze.com/ul/hsv8s68t3z" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 mb-4 text-[#1a1a1a]" dir="rtl">
            <span className="font-normal leading-[2.2]" style={{ fontSize: 'clamp(16px, 1.45vw, 18px)' }}>
              ברנע, גדעון בן יואש 22, אשקלון
            </span>
            <span className="text-[#1a1a1a] shrink-0"><WazeIcon /></span>
          </a>
          <div className="w-full" style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px rgba(146,166,180,0.18)' }}>
            <iframe
              src={MAP_SRC}
              className="w-full aspect-[4/3]"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Studio Pitales מפה"
            />
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t-[3px] border-[#92a6b4] pt-5 text-center" style={{ fontSize: 'clamp(16px, 1.45vw, 18px)' }}>
          <div className="md:hidden flex justify-between items-center mb-2 whitespace-nowrap font-medium w-full" style={{ fontSize: 'clamp(11px, 3.8vw, 15px)' }} dir="rtl">
            <Link to="/terms" className="text-[#1a1a1a] hover:text-[#92a6b4] transition-colors duration-200">תקנון האתר</Link>
            <span className="text-[#1a1a1a]">·</span>
            <Link to="/accessibility" className="text-[#1a1a1a] hover:text-[#92a6b4] transition-colors duration-200">הצהרת נגישות</Link>
            <span className="text-[#1a1a1a]">·</span>
            <Link to="/privacy" className="text-[#1a1a1a] hover:text-[#92a6b4] transition-colors duration-200">מדיניות פרטיות</Link>
          </div>
          <p className="text-[#1a1a1a]">כל הזכויות שמורות · Studio Pitales 2026 ©</p>
        </div>

      </div>
    </section>
  )
}
