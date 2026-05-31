import { useRef } from 'react'
import { smoothScrollTo } from '../utils/scroll'

export default function Hero() {
  const videoRef   = useRef(null)
  const sectionRef = useRef(null)

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#070707]"
      style={{ height: '100lvh' }}
    >

      <h1 className="sr-only">Studio Pitales — סטודיו פילאטיס מכשירים באשקלון</h1>

      {/* ── IMAGE ── */}
      <img
        ref={videoRef}
        src="/DSC08455-1920.jpg"
        srcSet="/DSC08455-480.jpg 480w, /DSC08455-1280.jpg 1280w, /DSC08455-1920.jpg 1920w"
        sizes="100vw"
        alt="סטודיו PITALES"
        fetchpriority="high"
        className="absolute inset-0 w-full h-full object-cover"
      />

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


      {/* ── ICON — centered ── */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pb-[15%] md:pb-0">
        <img
          src="/brand_assets/tal_Icon_.svg"
          alt="Pitales Studio"
          className="animate-fade-up"
          style={{ height: 'clamp(156px, 22vw, 229px)', width: 'clamp(156px, 22vw, 229px)', animationDelay: '0.08s', filter: 'drop-shadow(0 2px 14px rgba(0,0,0,0.75))' }}
        />
      </div>

      {/* ── CTA BUTTON — bottom 20%, mobile only ── */}
      <div className="md:hidden absolute z-10 left-0 right-0 flex justify-center" style={{ bottom: '27.5%' }}>
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
      <button
        onClick={() => smoothScrollTo('#about')}
        aria-label="גלול למטה"
        className="absolute left-1/2 -translate-x-1/2 z-20 cursor-pointer animate-chevron-float bottom-[calc(2.25rem+5%)] md:bottom-9"
      >
        <div className="w-[1px] h-[42px] md:h-[33px] bg-white/60 mx-auto mb-2" />
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
