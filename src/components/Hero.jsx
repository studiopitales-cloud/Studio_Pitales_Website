import { useRef, useEffect, useState } from 'react'

export default function Hero() {
  const videoRef   = useRef(null)
  const sectionRef = useRef(null)
  const [arrowVisible, setArrowVisible] = useState(true)

  /* Hide arrow once user starts scrolling */
  useEffect(() => {
    const onScroll = () => setArrowVisible(window.scrollY < 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Subtle parallax */
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        if (videoRef.current && sectionRef.current) {
          if (sectionRef.current.getBoundingClientRect().bottom > 0) {
            videoRef.current.style.transform =
              `scale(1.08) translateY(${window.scrollY * 0.28}px)`
          }
        }
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])


  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#070707]"
      style={{ height: '100lvh' }}
    >

      {/* ── VIDEO ── */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover scale-[1.08] will-change-transform"
        autoPlay muted loop playsInline preload="metadata"
      >
        <source src="/Pitales_httpss.mj.runPNzlwg3ofXg_Create_a_cinematic_luxury_HE_d2c13371-f233-4fd6-8add-2811ec58f714_2.mp4" type="video/mp4" />
      </video>

      {/* ── AMBIENT BG ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 60% 70% at 15% 90%, rgba(146,166,180,0.09) 0%, transparent 55%)',
            'radial-gradient(ellipse 65% 55% at 88% 12%, rgba(12,10,8,0.55) 0%, transparent 60%)',
          ].join(', '),
        }}
      />

      {/* ── OVERLAYS ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.08) 38%, rgba(0,0,0,0.08) 62%, rgba(0,0,0,0.75) 100%)',
        }}
      />
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />


      {/* ── HERO CONTENT — logo centered at exact 50vh (mid of full page incl. navbar) ── */}
      {/* ── ICON — centered ── */}
      <div className="absolute inset-0 z-10 flex items-center justify-center -translate-y-[20%] md:translate-y-0">
        <img
          src="/brand_assets/tal_Icon_.svg"
          alt="Pitales Studio"
          className="animate-fade-up"
          style={{ height: 'clamp(156px, 22vw, 229px)', width: 'clamp(156px, 22vw, 229px)', animationDelay: '0.08s', filter: 'drop-shadow(0 2px 14px rgba(0,0,0,0.75))' }}
        />
      </div>

      {/* ── CTA BUTTON — bottom 20%, mobile only ── */}
      <div className="md:hidden absolute z-10 left-0 right-0 flex justify-center" style={{ bottom: '40%' }}>
        <a
          href="#contact"
          onClick={e => { e.preventDefault(); document.dispatchEvent(new CustomEvent('openContactSheet')) }}
          className="animate-fade-up font-bold rounded-full px-9 py-4 text-[#1a1a1a] hover:opacity-85 transition-opacity"
          style={{ backgroundColor: '#92a6b4', fontSize: '23px', letterSpacing: '0.01em', animationDelay: '0.2s' }}
        >
          לתיאום שיעור היכרות
        </a>
      </div>


      {/* ── SCROLL ARROW ── */}
      {/*
        Scroll arrow — single thin chevron, cinematic float
        Animation: translateY 0→8px, opacity 0.42→0.82, 2s ease-in-out infinite
        Click: ease-out cubic scroll to exactly 100vh, ~920ms
        Fades out once user scrolls past 40px
      */}
      <button
        onClick={() => {
          const target = document.getElementById('about')
          if (!target) return
          window.__progScroll = true
          window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 92, behavior: 'smooth' })
          setTimeout(() => { window.__progScroll = false }, 1400)
        }}
        aria-label="גלול למטה"
        style={{
          opacity:       arrowVisible ? 1 : 0,
          transition:    'opacity 700ms ease',
          pointerEvents: arrowVisible ? 'auto' : 'none',
        }}
        className="absolute bottom-[calc(2.25rem+20%)] md:bottom-9 left-1/2 -translate-x-1/2 z-20 cursor-pointer animate-chevron-float"
      >
        <svg
          className="w-[26px] h-[26px] md:w-[20px] md:h-[20px]"
          viewBox="0 0 20 20"
          fill="none" stroke="white" strokeWidth="1.2"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M1 1l9 8 9-8"/>
          <path d="M1 10l9 8 9-8"/>
        </svg>
      </button>

    </section>
  )
}
