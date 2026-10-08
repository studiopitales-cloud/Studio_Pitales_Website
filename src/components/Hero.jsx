import { useRef } from 'react'
import { motion } from 'framer-motion'
import { smoothScrollTo } from '../utils/scroll'
import { trackOpenLeadForm } from '../utils/googleAnalytics'

const INTRO_LINES = [
  { text: 'קצב מותאם.', color: '#e6e2da' },
  { text: 'דיוק בתנועה.', color: '#e6e2da' },
  { text: 'שינוי בגוף.', color: '#92a6b4' },
]

function TypewriterHeading() {
  const sharedStyle = {
    fontSize: 'clamp(29px, 4.68vw, 126px)',
    letterSpacing: '-0.022em',
    fontWeight: 700,
  }

  return (
    <div className="relative text-white leading-[1.25] inline-block hero-heading" style={sharedStyle}>
      {INTRO_LINES.map((line, i) => (
        <span key={i} className="block" style={{ color: line.color }}>
          {line.text}
        </span>
      ))}
    </div>
  )
}

export default function Hero() {
  const videoRef   = useRef(null)
  const sectionRef = useRef(null)

  return (
    <>
      <style>{`
        :root {
          --hero-top: calc(var(--navbar-h) + 20px);
          --hero-right: 20px;
          --btn-right: 20px;
        }
        @media (min-width: 1024px) {
          :root {
            --hero-top: calc(var(--navbar-h) + 30px);
            --hero-right: 55px;
            --btn-right: 55px;
          }
        }
        #hero {
          height: 85vh;
        }
        @media (min-width: 1024px) {
          #hero {
            height: 100lvh;
          }
        }
        .hero-heading {
          font-size: 32px !important;
        }
        @media (min-width: 1024px) {
          .hero-heading {
            font-size: clamp(29px, 4.68vw, 126px) !important;
          }
        }
        #buttons-container > a {
          font-weight: 600 !important;
        }
        @media (min-width: 1024px) {
          #buttons-container > a {
            font-weight: 500 !important;
          }
        }
        #buttons-container > a:last-child {
          margin-bottom: -15px;
        }
        @media (min-width: 1024px) {
          #buttons-container > a:last-child {
            margin-bottom: 0;
          }
        }
      `}</style>
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#070707]"
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


      {/* ── HERO TEXT ── */}
      <div className="absolute z-10 hero-text" style={{ top: 'var(--hero-top)', right: 'var(--hero-right)' }}>
        <TypewriterHeading />
      </div>

      {/* ── CTA BUTTONS — 45px above hero bottom ── */}
      <div className="absolute z-10 flex flex-col md:flex-row gap-3 md:gap-4" style={{ bottom: '45px', right: 'var(--btn-right)' }} id="buttons-container">
        {/* Primary CTA Button */}
        <a
          href="#contact"
          onClick={e => { e.preventDefault(); trackOpenLeadForm(); document.dispatchEvent(new CustomEvent('openContactSheet')) }}
          className="animate-fade-up transition-opacity inline-flex items-center justify-center"
          style={{
            backgroundColor: '#92a6b4',
            color: '#e6e2da',
            width: '222px',
            height: '47px',
            padding: '8px 14px',
            fontSize: 'clamp(18px, 1.406vw, 27px)',
            fontWeight: 500,
            lineHeight: '27px',
            letterSpacing: '0.01em',
            border: '2px solid transparent',
            borderRadius: '900px',
            animationDelay: '0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#c8c8c8'
            e.target.style.color = '#1a1a1a'
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#92a6b4'
            e.target.style.color = '#e6e2da'
          }}
        >
          תיאום שיעור היכרות
        </a>

        {/* Classes Button */}
        <a
          href="#levels"
          onClick={e => { e.preventDefault(); smoothScrollTo('#levels') }}
          className="animate-fade-up transition-opacity inline-flex items-center justify-center"
          style={{
            backgroundColor: 'transparent',
            color: '#e6e2da',
            width: '222px',
            height: '47px',
            padding: '8px 14px',
            fontSize: 'clamp(18px, 1.406vw, 27px)',
            fontWeight: 500,
            lineHeight: '27px',
            letterSpacing: '0.01em',
            border: '2px solid #e6e2da',
            borderRadius: '900px',
            animationDelay: '0.25s'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#c8c8c8'
            e.target.style.color = '#1a1a1a'
            e.target.style.borderColor = '#c8c8c8'
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent'
            e.target.style.color = '#e6e2da'
            e.target.style.borderColor = '#e6e2da'
          }}
        >
          השיעורים בסטודיו
        </a>
      </div>

      {/* ── SCROLL ARROW ── */}
      <button
        onClick={() => smoothScrollTo('#about')}
        aria-label="גלול למטה"
        className="hidden md:absolute left-1/2 -translate-x-1/2 z-20 cursor-pointer animate-chevron-float bottom-[calc(2.25rem+5%)] md:bottom-9 md:block"
      >
        <div className="w-[1px] h-[42px] md:h-[33px] mx-auto mb-2" style={{ backgroundColor: '#e6e2da' }} />
        <svg
          className="w-[26px] h-[26px] md:w-[20px] md:h-[20px]"
          viewBox="0 0 20 20"
          fill="none" stroke="#e6e2da" strokeWidth="1.2"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M1 1l9 8 9-8"/>
          <path d="M1 10l9 8 9-8"/>
        </svg>
      </button>

    </section>
    </>
  )
}
