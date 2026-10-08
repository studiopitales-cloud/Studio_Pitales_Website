import { useRef, useState, useEffect } from 'react'
import { isProgScroll } from '../utils/scroll'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

/* ═══════════════════════════════════════════════════════════════
   1. INTRO — declub-inspired split layout
   ═══════════════════════════════════════════════════════════════ */
const INTRO_LINES = [
  { text: 'קצב מותאם.', color: '#000000' },
  { text: 'דיוק בתנועה.', color: '#000000' },
  { text: 'שינוי בגוף.', color: '#92a6b4', bold: true },
]
const CHAR_DELAY = 45
const LINE_PAUSE = 400
const LINE_GAP = 300

function TypewriterHeading({ triggered, onComplete }) {
  const [lines, setLines] = useState(['', '', ''])
  const [curLine, setCurLine] = useState(0)
  const [curChar, setCurChar] = useState(0)

  useEffect(() => {
    if (!triggered) return
    if (curLine >= INTRO_LINES.length) { onComplete?.(); return }

    const lineText = INTRO_LINES[curLine].text

    if (curChar >= lineText.length) {
      if (curLine < INTRO_LINES.length - 1) {
        const t = setTimeout(() => { setCurLine(l => l + 1); setCurChar(0) }, LINE_GAP)
        return () => clearTimeout(t)
      } else {
        onComplete?.()
      }
      return
    }

    const t = setTimeout(() => {
      setLines(prev => {
        const next = [...prev]
        next[curLine] = lineText.slice(0, curChar + 1)
        return next
      })
      setCurChar(c => c + 1)
    }, CHAR_DELAY)
    return () => clearTimeout(t)
  }, [triggered, curLine, curChar])

  const sharedStyle = {
    fontSize: 'clamp(38px, 5.2vw, 140px)',
    letterSpacing: '-0.022em',
  }

  return (
    <div className="relative text-right about-heading-shift">
      {/* Ghost — reserves full height from the start, invisible */}
      <div
        className="font-extralight leading-[1.25] invisible select-none"
        style={sharedStyle}
        aria-hidden="true"
      >
        {INTRO_LINES.map((line, i) => (
          <span key={i} className={`block${line.bold ? ' font-bold' : ''}`}>{line.text}</span>
        ))}
      </div>

      {/* Typed text — sits on top, doesn't affect layout */}
      <h2
        className="font-extralight leading-[1.25] absolute inset-0"
        style={sharedStyle}
      >
        {INTRO_LINES.map((line, i) => (
          <span key={i} className={`block${line.bold ? ' font-bold' : ''}`}>
            <span style={{ color: line.color }}>{lines[i]}</span>
            {curLine === i && curChar < line.text.length && curChar > 0 && (
              <motion.span
                className="inline-block w-[2px] h-[0.85em] align-middle mr-1"
                style={{ background: '#92a6b4', display: 'inline-block' }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.7, repeat: Infinity }}
              />
            )}
          </span>
        ))}
      </h2>
    </div>
  )
}

function IntroHero() {
  const ref = useRef(null)
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const isInView = useInView(sectionRef, { once: true, margin: '-15%' })
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    if (!isInView) return

    // Manual scroll — start immediately
    if (!isProgScroll()) {
      setTyping(true)
      return
    }

    // Programmatic scroll (nav/arrow) — wait for scroll to stop + LINE_PAUSE
    let timer = null
    let started = false
    const start = () => {
      if (started) return
      started = true
      setTyping(true)
      window.removeEventListener('scroll', onScroll)
    }
    const onScroll = () => {
      clearTimeout(timer)
      timer = setTimeout(start, LINE_PAUSE)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    timer = setTimeout(start, LINE_PAUSE)

    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
    }
  }, [isInView])

  return (
    <div
      ref={ref}
      className="relative w-full flex items-center overflow-hidden hidden md:flex"
      style={{ height: '100svh', backgroundColor: '#f0ece4', marginTop: '48px' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 50% at 25% 55%, rgba(146,166,180,0.12) 0%, transparent 62%)' }}
      />

      <motion.div
        ref={sectionRef}
        style={{ opacity, gridTemplateColumns: '9fr 11fr' }}
        className="relative w-full h-full grid grid-cols-1 md:grid-cols-2"
      >

        {/* ── LEFT column: text content ── */}
        <motion.div
          className="relative flex flex-col justify-center text-right md:ml-[55px] md:mr-[55px]"
          style={{ marginLeft: 'clamp(24px, 5.625vw, 55px)', marginRight: 'clamp(24px, 5.625vw, 55px)' }}
          initial={{ opacity: 0, y: 18 }}
          animate={typing ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ display: 'flex', alignItems: 'stretch', gap: '16px', marginBottom: '16px' }}>
            <div style={{ width: '5px', backgroundColor: '#92a6b4', flexShrink: 0 }} />
            <h2 className="md:hidden" style={{ fontSize: 'clamp(28px, 2.5vw, 48px)', fontWeight: 'bold', color: '#000000', lineHeight: '1.3', margin: 0, flex: 1 }}>
              שגרת אימונים בונה<br />תהליך משמעותי
            </h2>
            <h2 className="hidden md:block" style={{ fontSize: 'clamp(28px, 2.5vw, 48px)', fontWeight: 'bold', color: '#000000', lineHeight: '1.3', margin: 0, flex: 1 }}>
              שגרת אימונים בונה<br />תהליך משמעותי.
            </h2>
          </div>
          <p style={{ fontSize: '18px', fontWeight: 'normal', color: '#000000', lineHeight: '1.6', marginBottom: '16px' }}>
            הסטודיו שלנו לפילאטיס מכשירים ממוקם בשכונת ברנע באשקלון ומציע שיעורים במגוון רמות, כך שכל אחת יכולה למצוא את השיעור שמתאים לה ולשלב אותו באופן טבעי בשגרת האימונים שלה.
          </p>
          <p style={{ fontSize: '18px', fontWeight: 'normal', color: '#000000', lineHeight: '1.6', marginBottom: '24px' }}>
            השיעורים מתקיימים בקבוצות קטנות של עד 7 מתאמנות, כדי לאפשר למדריכה לראות כל אחת באמת, לדייק את הביצוע ולהתאים את האימון לרמה, לצרכים ולגוף שלך. היחס האישי הוא חלק בלתי נפרד מהתהליך — והוא מה שמאפשר להתאמן בצורה מדויקת, בטוחה ולהתמיד לאורך זמן.
          </p>
          <a
            href="/about"
            className="inline-flex items-center justify-center transition-opacity"
            style={{
              backgroundColor: '#92a6b4',
              color: '#f0ece4',
              width: '222px',
              height: '47px',
              padding: '8px 14px',
              fontSize: 'clamp(18px, 1.406vw, 27px)',
              fontWeight: 500,
              lineHeight: '27px',
              letterSpacing: '0.01em',
              border: '2px solid transparent',
              borderRadius: '900px',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#c8c8c8'
              e.target.style.color = '#1a1a1a'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#92a6b4'
              e.target.style.color = '#f0ece4'
            }}
          >
            הסיפור של PITALES
          </a>
        </motion.div>

        {/* ── RIGHT column (DESKTOP) ── */}
        <div className="relative hidden md:flex md:items-center md:justify-center" style={{ marginLeft: '55px' }}>
          <img
            src="/DSC07902.jpg"
            alt="האם פילאטיס מכשירים מחטב"
            className="w-full h-full object-cover"
            style={{ maxHeight: '100%', maxWidth: '100%', borderRadius: '32px' }}
          />
        </div>

      </motion.div>
    </div>
  )
}

function IntroHeroMobile() {
  const [typing, setTyping] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTyping(true) },
      { threshold: 0.3 }
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="md:hidden relative w-full overflow-hidden"
      style={{ height: 'auto', backgroundColor: '#f0ece4', marginTop: '0', padding: '24px' }}
    >
      <motion.div
        className="relative w-full flex flex-col text-right"
        initial={{ opacity: 0, y: 18 }}
        animate={typing ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
          <div style={{ width: '5px', backgroundColor: '#92a6b4', flexShrink: 0, height: '100%' }} />
          <h2 style={{ fontSize: 'clamp(28px, 2.5vw, 48px)', fontWeight: 'bold', color: '#000000', lineHeight: '1.3', margin: 0, flex: 1 }}>
            שגרת אימונים בונה<br />תהליך משמעותי.
          </h2>
        </div>
        <p style={{ fontSize: '18px', fontWeight: 'normal', color: '#000000', lineHeight: '1.6', marginBottom: '16px' }}>
          הסטודיו שלנו לפילאטיס מכשירים ממוקם בשכונת ברנע באשקלון ומציע שיעורים במגוון רמות, כך שכל אחת יכולה למצוא את השיעור שמתאים לה ולשלב אותו באופן טבעי בשגרת האימונים שלה.
        </p>
        <p style={{ fontSize: '18px', fontWeight: 'normal', color: '#000000', lineHeight: '1.6', marginBottom: '24px' }}>
          השיעורים מתקיימים בקבוצות קטנות של עד 7 מתאמנות, כדי לאפשר למדריכה לראות כל אחת באמת, לדייק את הביצוע ולהתאים את האימון לרמה, לצרכים ולגוף שלך. היחס האישי הוא חלק בלתי נפרד מהתהליך — והוא מה שמאפשר להתאמן בצורה מדויקת, בטוחה ולהתמיד לאורך זמן.
        </p>
        <a
          href="/about"
          className="inline-flex items-center justify-center transition-opacity"
          style={{
            backgroundColor: '#92a6b4',
            color: '#f0ece4',
            width: '222px',
            height: '47px',
            padding: '8px 14px',
            fontSize: 'clamp(18px, 1.406vw, 27px)',
            fontWeight: 500,
            lineHeight: '27px',
            letterSpacing: '0.01em',
            border: '2px solid transparent',
            borderRadius: '900px',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#c8c8c8'
            e.target.style.color = '#1a1a1a'
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#92a6b4'
            e.target.style.color = '#f0ece4'
          }}
        >
          הסיפור של PITALES
        </a>
      </motion.div>
    </div>
  )
}

const CHAPTER = {
  heading: 'הפילאטיס של טל',
  body: [
    'מאז ומתמיד תנועה הייתה חלק בלתי נפרד ממני.\nזה התחיל בריקוד והמשיך לעולם הכושר, שבו אני מדריכה כבר מעל עשור.',
    'בדרך הבנתי כמה סיפוק יש בלעזור לאנשים להתחבר לעצמם דרך תנועה, להתחזק ולהרגיש טוב יותר בגוף שלהם. ואז הגעתי לפילאטיס, ושם מצאתי את התשוקה האמיתית שלי.',
    'למדתי שהתמדה בספורט מתחילה במקום שרואה אותך באמת, מקום שכיף להגיע אליו, שמרגישים בו בנוח, ושבאמת אכפת לו מההתקדמות שלך.',
    'אז החלטתי לפתוח את הסטודיו שלי, PITALES. מקום שבו כל שיעור בנוי בקפידה, כל מדריכה נבחרת בפינצטה, וכל מתאמנת מקבלת יחס אישי אמיתי, כי ההתמדה שלך היא גם ההצלחה שלי.',
  ],
  img:    '/DSC07363-1280.jpg',
  srcSet: '/DSC07363-480.jpg 480w, /DSC07363-800.jpg 800w, /DSC07363-1280.jpg 1280w',
}

function StudioStory() {
  const textRef = useRef(null)
  const textInView = useInView(textRef, { once: true, amount: 0.6 })
  const mobileTextRef = useRef(null)
  const mobileTextInView = useInView(mobileTextRef, { once: true, amount: 0.5 })

  return (
    <div id="studio-story" className="relative section_margin" style={{ backgroundColor: '#f0ece4' }}>

      {/* ── Desktop: static split ── */}
      <div className="hidden md:grid grid-cols-2" style={{ height: '110vh' }}>

        {/* Left col: Image */}
        <div className="relative overflow-hidden bg-[#111] h-full">
          <img src={CHAPTER.img} srcSet={CHAPTER.srcSet} sizes="50vw" alt={CHAPTER.heading} loading="lazy" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 55%)' }} />
          <motion.img
            src="/brand_assets/tal_slogan_.svg"
            alt="Studio Pitales slogan"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
            style={{ width: '50%', filter: 'brightness(0) invert(1)', opacity: 0.38 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Right col: Text */}
        <div className="relative h-full flex items-center px-16 text-right">
          <div ref={textRef} className="max-w-[480px] 2xl:max-w-[600px] 3xl:max-w-none mr-0 ml-auto 3xl:ml-0">
            <div className="inline-block">
              <motion.h2
                className="font-bold text-[#1a1a1a] tracking-[-0.02em] leading-none"
                style={{ fontSize: 'var(--t-3xl)' }}
                initial={{ opacity: 0, y: 18 }}
                animate={textInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
              >
                {CHAPTER.heading}
              </motion.h2>
              <motion.div
                className="h-[3px] bg-[#92a6b4] mt-3 mb-5 origin-right"
                initial={{ scaleX: 0 }}
                animate={textInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.25 }}
              />
            </div>
            <motion.div
              className="font-normal leading-[2.0] text-[#1a1a1a] flex flex-col gap-4"
              style={{ fontSize: 'var(--fs-body)' }}
              initial={{ opacity: 0, y: 12 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.38, ease: EASE }}
            >
              {CHAPTER.body.map((para, i) => <p key={i}>{para}</p>)}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Mobile: static full-screen image + centered text ── */}
      <div className="md:hidden relative overflow-hidden" style={{ height: 'calc(100svh - var(--navbar-h))' }}>
        <img src={CHAPTER.img} srcSet={CHAPTER.srcSet} sizes="100vw" alt={CHAPTER.heading} loading="lazy" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 85% 70% at 50% 50%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.08) 80%), linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.22) 100%)' }} />

        <motion.img
          src="/brand_assets/tal_slogan_.svg"
          alt="Studio Pitales slogan"
          className="hidden absolute left-1/2 bottom-8 -translate-x-1/2 z-10 pointer-events-none"
          style={{ width: 120, filter: 'brightness(0) invert(1)', opacity: 0.38 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />

        <div className="absolute inset-0 flex items-center justify-center px-7" dir="rtl">
          <div ref={mobileTextRef} className="w-full text-center max-w-[340px]">
            <div className="inline-block text-right">
              <motion.h2
                className="font-bold text-white tracking-[-0.02em] leading-none"
                style={{ fontSize: 'var(--t-3xl)' }}
                initial={{ opacity: 0, y: 18 }}
                animate={mobileTextInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
              >
                {CHAPTER.heading}
              </motion.h2>
              <motion.div
                className="h-[3px] bg-[#92a6b4] mt-3 mb-5 origin-right w-full"
                initial={{ scaleX: 0 }}
                animate={mobileTextInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.25 }}
              />
            </div>
            <motion.div
              className="font-normal text-white/90 leading-[1.9] flex flex-col gap-3"
              style={{ fontSize: 'clamp(15px, 4vw, 17px)', whiteSpace: 'pre-line' }}
              initial={{ opacity: 0, y: 12 }}
              animate={mobileTextInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.38, ease: EASE }}
            >
              {CHAPTER.body.map((para, i) => <p key={i}>{para}</p>)}
            </motion.div>
          </div>
        </div>
      </div>

    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   EXPORT
   ═══════════════════════════════════════════════════════════════ */
function MobileSection() {
  return (
    <div
      className="md:hidden relative w-full flex items-center justify-center"
      style={{ height: '100svh', backgroundColor: '#f0ece4', padding: '48px 20px 0 20px' }}
    >
      <img
        src="/DSC07902.jpg"
        alt="האם פילאטיס מכשירים מחטב"
        className="w-full h-full object-cover"
        style={{ display: 'block', borderRadius: '32px', objectPosition: '65% 50%' }}
      />
    </div>
  )
}

export default function AboutUs() {
  return (
    <section id="about">
      <IntroHero />
      <IntroHeroMobile />
      <MobileSection />
    </section>
  )
}
