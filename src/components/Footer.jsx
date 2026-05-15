import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

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

const MAP_SRC = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d848.0!2d34.57304452609119!3d31.687571338865308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15029d001d425f1b%3A0xb8bdc3bb7140a4a!2z16HXmNeV15PXmdeVIFBJVEFMRVMgLSDXpNeZ15zXkNeY15nXoSDXnteb16nXmdeo15nXnSDXkdeQ16nXp9ec15XXnw!5e0!3m2!1siw!2sil!4v1778848616349!5m2!1siw!2sil"

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

          {/* Col 1 — כתובת (physical right) */}
          <div className="pl-8 text-center">
            <ColHeader title="כתובת" />
            <p className="text-[15px] font-normal leading-[2.0] text-[#1a1a1a] mb-5">
              גדעון בן יואש 22, אשקלון
            </p>
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

          {/* Col 2 — צור קשר (physical center) */}
          <div className="px-8 text-center">
            <ColHeader title="צור קשר" />
            <div className="space-y-3">
              <p className="text-[15px] font-normal leading-[2.0] text-[#1a1a1a]">
                <a href="tel:+972508290919" className="md:pointer-events-none md:cursor-default hover:text-[#92a6b4] md:hover:text-[#1a1a1a] transition-colors duration-200">
                  050-8290919
                </a>
              </p>
              <p className="text-[15px] font-normal leading-[2.0] text-[#1a1a1a]">
                <a href="mailto:studiopitales@gmail.com" className="hover:text-[#92a6b4] transition-colors duration-200">
                  studiopitales@gmail.com
                </a>
              </p>
            </div>
            <p className="text-[15px] font-normal leading-[2.0] text-[#1a1a1a] mt-4">
              מענה טלפוני:<br />
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

          {/* Col 3 — מידע נוסף (physical left) */}
          <div className="pr-8 text-center">
            <ColHeader title="מידע נוסף" />
            <ul className="space-y-3">
              {[
                { label: 'תקנון האתר',       href: '#' },
                { label: 'הצהרת נגישות',     href: '#' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href}
                    className="text-[15px] font-normal text-[#1a1a1a] hover:text-[#92a6b4] transition-colors duration-200">
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/privacy"
                  className="text-[15px] font-normal text-[#1a1a1a] hover:text-[#92a6b4] transition-colors duration-200">
                  מדיניות פרטיות
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* ══ MOBILE: stacked ══ */}
        <div className="md:hidden mb-10">
          <div className="text-center">
            <p className="font-normal leading-[2.2] text-[#1a1a1a]" style={{ fontSize: 'clamp(16px, 1.45vw, 18px)' }} dir="rtl">
              <a href="tel:+972508290919" className="hover:text-[#92a6b4] transition-colors duration-200">050-8290919</a><br />
              <a href="mailto:studiopitales@gmail.com" className="hover:text-[#92a6b4] transition-colors duration-200">studiopitales@gmail.com</a>
            </p>
            <div className="flex justify-center gap-5 mt-4 [&_svg]:w-[30px] [&_svg]:h-[30px]">
              {SOCIAL.map(({ label, Icon, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="text-[#1a1a1a] hover:text-[#92a6b4] transition-colors duration-300">
                  <Icon />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-8 w-full" style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px rgba(146,166,180,0.18)' }}>
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
        <div className="border-t-[3px] border-[#92a6b4] pt-5 flex flex-wrap items-center justify-center gap-3">
          <p className="text-[#1a1a1a]" style={{ fontSize: 'clamp(12px, 1.45vw, 18px)' }}>
            כל הזכויות שמורות · Studio Pitales 2026 ©
            <span className="md:hidden"> · <Link to="/privacy" className="hover:text-[#92a6b4] transition-colors duration-200">מדיניות פרטיות</Link></span>
          </p>
        </div>

      </div>
    </section>
  )
}
