import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FacebookIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)
const InstagramIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
)
const WhatsAppIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
)

const SCHEDULE_URL = 'https://app.boostapp.co.il/lessons.php?GetUrl=66a2418e6f689'

const NAV_ITEMS = [
  { href: SCHEDULE_URL,  label: 'מערכת שעות', external: true },
  { href: '#team',       label: 'הצוות שלנו' },
  { href: '#about',      label: 'חוויית הפילאטיס אצלנו' },
]

const MOBILE_NAV_ITEMS = [
  { href: '#about',      label: 'חוויית הפילאטיס אצלנו' },
  { href: '#team',       label: 'הצוות שלנו' },
  { href: SCHEDULE_URL,  label: 'מערכת שעות', external: true },
  { href: '#contact', label: 'לתיאום שיעור היכרות', cta: true },
]

function smoothScroll(id) {
  const el = document.querySelector(id)
  if (!el) return
  window.__progScroll = true
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 92, behavior: 'smooth' })
  setTimeout(() => { window.__progScroll = false }, 1400)
}

export default function Navbar({ forceScrolled = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [hoveredNav, setHoveredNav] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Lock body scroll when menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* When menu is open, treat navbar as transparent (overlay is dark behind it) */
  const isLight = (scrolled || forceScrolled) && !menuOpen

  const T     = 'transition-colors duration-[420ms]'
  const link  = isLight ? `text-[#1a1a1a] hover:text-[#1a1a1a] ${T}` : `text-white/80 hover:text-white ${T}`
  const divBg = isLight ? 'bg-[#1a1a1a]/14' : 'bg-white/18'
  const icon  = isLight ? `text-[#1a1a1a] ${T}` : `text-white ${T}`
  const barBg = (!scrolled && !forceScrolled && !menuOpen) ? '#ffffff' : '#000000'

  return (
    <>
      <header
        className={[
          'fixed inset-x-0 top-0 z-50',
          'transition-[background-color,box-shadow] duration-[420ms] ease-in-out',
          menuOpen
            ? 'bg-transparent border-b border-[#1a1a1a]'
            : isLight
              ? 'bg-[#e6e2da] shadow-[0_2px_24px_rgba(0,0,0,0.07)]'
              : 'bg-transparent border-b border-white/[0.12]',
        ].join(' ')}
      >
        <div
          dir="ltr"
          className="h-[92px] w-full grid grid-cols-[1fr_auto_1fr] items-center"
        >

          {/* ══ COL 1 — LOGO ═══════════════════════════════════════ */}
          <a href="/" aria-label="Pitales Studio" className="justify-self-start flex items-center -ml-1 pl-0 md:ml-0 md:pl-5">
            <img
              src="/brand_assets/tal_logo_2.svg"
              alt="Pitales Studio"
              className={[
                'h-[78px] md:h-[88px] w-auto transition-[filter,opacity] duration-[420ms]',
                (isLight || menuOpen) ? 'brightness-0' : 'brightness-0 invert',
              ].join(' ')}
            />
          </a>

          {/* ══ COL 2 — NAV TEXT ════════════════════════════════════ */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); document.dispatchEvent(new CustomEvent('openContactSheet')) }}
              className="text-[18px] tracking-normal font-medium text-[#1a1a1a] whitespace-nowrap px-5 py-[7px] rounded-full transition-[background-color,opacity] duration-[420ms]"
              style={{ backgroundColor: '#92a6b4' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#7a95a5'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#92a6b4'}
            >
              לתיאום שיעור היכרות
            </a>

            {NAV_ITEMS.map(({ href, label, external }) => (
              <a
                key={href}
                href={href}
                onClick={external ? undefined : (e => { e.preventDefault(); smoothScroll(href) })}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                onMouseEnter={() => setHoveredNav(href)}
                onMouseLeave={() => setHoveredNav(null)}
                className={`relative text-[18px] tracking-normal font-medium pb-[3px] ${link}`}
              >
                {label}
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    height: '1px',
                    width: '100%',
                    backgroundColor: '#92a6b4',
                    transformOrigin: 'right',
                    transform: hoveredNav === href ? 'scaleX(1)' : 'scaleX(0)',
                    transition: hoveredNav === href
                      ? 'transform 0.26s ease-out'
                      : 'transform 0.15s ease-in',
                  }}
                />
              </a>
            ))}
          </nav>

          {/* ══ COL 3 — DIVIDER + SOCIAL ICONS ═════════════════════ */}
          <div className="justify-self-end hidden md:flex items-stretch self-stretch pr-[55px]">
            <div className={`w-px self-stretch mr-[55px] ${divBg}`} />
            <div className="flex items-center gap-[25px]">
              {[
                { label: 'Facebook',  Icon: FacebookIcon,  href: 'https://www.facebook.com/profile.php?id=61563384290444' },
                { label: 'Instagram', Icon: InstagramIcon, href: 'https://www.instagram.com/tal_pitales/' },
                { label: 'WhatsApp',  Icon: WhatsAppIcon,  href: 'https://wa.me/972508290919?text=%D7%94%D7%99%D7%99%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20%D7%94%D7%90%D7%AA%D7%A8%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A2%D7%9C%20%D7%94%D7%A1%D7%98%D7%95%D7%93%D7%99%D7%95%20%3A%29' },
              ].map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href !== '#' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`hover:opacity-65 ${icon}`}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* ══ MOBILE HAMBURGER ════════════════════════════════════ */}
          <button
            aria-label={menuOpen ? 'סגור תפריט' : 'פתח תפריט'}
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden col-start-3 justify-self-end flex flex-col justify-center gap-[8px] py-1 pr-5 z-[60]"
          >
            <motion.span
              className="block w-[29px] origin-center"
              style={{ height: '2px', backgroundColor: barBg }}
              animate={menuOpen ? { y: 10, rotate: 45 } : { y: 0, rotate: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="block w-[29px] origin-center"
              style={{ height: '2px', backgroundColor: menuOpen ? '#000000' : '#92a6b4' }}
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="block w-[29px] origin-center"
              style={{ height: '2px', backgroundColor: barBg }}
              animate={menuOpen ? { y: -10, rotate: -45 } : { y: 0, rotate: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            />
          </button>

        </div>
      </header>

      {/* ══ MOBILE MENU OVERLAY ═════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#f0ece4] flex flex-col justify-center px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            dir="rtl"
          >
            <nav className="flex flex-col gap-7 items-center text-center">
              {MOBILE_NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  onClick={item.external ? (() => setMenuOpen(false)) : (e => { e.preventDefault(); if (item.cta) { setMenuOpen(false); setTimeout(() => document.dispatchEvent(new CustomEvent('openContactSheet')), 300) } else { smoothScroll(item.href); setMenuOpen(false) } })}
                  className={item.cta
                    ? 'font-bold rounded-full hover:opacity-80 transition-opacity duration-200 leading-none px-8 py-4 flex items-center justify-center text-center'
                    : 'font-bold hover:opacity-70 transition-opacity duration-200 leading-none'
                  }
                  style={item.cta
                    ? { fontSize: 'clamp(16px, 5.4vw, 26px)', backgroundColor: '#92a6b4', color: '#1a1a1a', letterSpacing: '-0.02em' }
                    : { fontSize: 'clamp(16px, 5.4vw, 26px)', letterSpacing: '-0.02em', color: '#1a1a1a' }
                  }
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.35, delay: i * 0.06 + 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            {/* Social icons at bottom */}
            <motion.div
              className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="flex justify-center gap-[40px] text-[#1a1a1a] [&_svg]:w-[39px] [&_svg]:h-[39px]">
              {[
                { label: 'WhatsApp',  Icon: WhatsAppIcon,  href: 'https://wa.me/972508290919?text=%D7%94%D7%99%D7%99%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20%D7%94%D7%90%D7%AA%D7%A8%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A2%D7%9C%20%D7%94%D7%A1%D7%98%D7%95%D7%93%D7%99%D7%95%20%3A%29' },
                { label: 'Instagram', Icon: InstagramIcon, href: 'https://www.instagram.com/tal_pitales/' },
                { label: 'Facebook',  Icon: FacebookIcon,  href: 'https://www.facebook.com/profile.php?id=61563384290444' },
              ].map(({ label, Icon, href }) => (
                <a key={label} href={href} target={href !== '#' ? '_blank' : undefined} rel="noopener noreferrer" aria-label={label} className="hover:opacity-65 transition-opacity">
                  <Icon />
                </a>
              ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
