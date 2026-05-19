import { useRef, useState, useEffect } from 'react'
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
    fontSize: 'clamp(38px, 5.2vw, 84px)',
    letterSpacing: '-0.022em',
  }

  return (
    <div className="relative text-right">
      {/* Ghost — reserves full height from the start, invisible */}
      <h1
        className="font-extralight leading-[1.25] invisible select-none"
        style={sharedStyle}
        aria-hidden="true"
      >
        {INTRO_LINES.map((line, i) => (
          <span key={i} className={`block${line.bold ? ' font-bold' : ''}`}>{line.text}</span>
        ))}
      </h1>

      {/* Typed text — sits on top, doesn't affect layout */}
      <h1
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
      </h1>
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
  const [leftVisible, setLeftVisible] = useState(false)

  useEffect(() => {
    if (!isInView) return

    // Manual scroll — start immediately
    if (!window.__progScroll) {
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
      className="relative flex items-center overflow-hidden bg-cream"
      style={{ height: 'calc(100svh - 92px)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 50% at 25% 55%, rgba(146,166,180,0.12) 0%, transparent 62%)' }}
      />

      <motion.div
        ref={sectionRef}
        style={{ opacity }}
        className="relative w-full max-w-[1360px] mx-auto px-8 md:px-16 pt-12 pb-16 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-28"
      >

        {/* ── RIGHT column: typewriter headline ── */}
        <div className="relative w-1/2 ml-auto md:w-full md:ml-0">

          <TypewriterHeading triggered={typing} onComplete={() => {}} />
        </div>

        {/* ── LEFT column: appears after typing done ── */}
        <motion.div
          className="text-right flex flex-col gap-7"
          initial={{ opacity: 0, y: 18 }}
          animate={typing ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="font-normal leading-[2.0] text-black mt-8"
            style={{ fontSize: 'clamp(16px, 1.45vw, 18px)' }}
          >
            סטודיו PITALES הינו סטודיו לפילאטיס מכשירים, בשכונת ברנע באשקלון. הסטודיו שלנו מציע שיעורים בכל הרמות. השיעורים מתקיימים באווירה אינטימית ונעימה, בקבוצות של עד 7 מתאמנות, מה שמעניק לכל מתאמנת את תשומת הלב הראויה לה.
          </p>

          <div className="border-r-[3px] border-[#92a6b4] pr-4 text-right">
            <p
              className="font-medium italic"
              style={{ fontSize: 'clamp(16px, 1.45vw, 18px)', color: '#92a6b4' }}
            >
              התמדה היא המפתח לתהליך משמעותי.<br />
              המטרה שלנו היא לעזור לך לשלב את האימונים כחלק טבעי מהשגרה שלך.
            </p>
          </div>
        </motion.div>

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
  img: '/DSC07363.jpg',
}

function StudioStory() {
  const textRef = useRef(null)
  const textInView = useInView(textRef, { once: true, amount: 0.6 })
  const mobileTextRef = useRef(null)
  const mobileTextInView = useInView(mobileTextRef, { once: true, amount: 0.5 })

  return (
    <div id="studio-story" className="relative bg-[#f0ece4]">

      {/* ── Desktop: static split ── */}
      <div className="hidden md:grid grid-cols-2" style={{ height: '110vh' }}>

        {/* Left col: Image */}
        <div className="relative overflow-hidden bg-[#111] h-full">
          <img src={CHAPTER.img} alt={CHAPTER.heading} className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 55%)' }} />
          <motion.img
            src="/brand_assets/tal_slogan_.svg"
            alt="Studio Pitales slogan"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
            style={{ width: 'clamp(180px, 22vw, 280px)', filter: 'brightness(0) invert(1)', opacity: 0.38 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Right col: Text */}
        <div className="relative h-full flex items-center px-16 text-right">
          <div ref={textRef} className="max-w-[480px] mr-0 ml-auto">
            <div className="inline-block">
              <motion.h2
                className="text-[28px] md:text-[32px] font-bold text-[#1a1a1a] tracking-[-0.02em] leading-none"
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
              style={{ fontSize: 'clamp(16px, 1.45vw, 18px)' }}
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
      <div className="md:hidden relative overflow-hidden" style={{ height: 'calc(var(--vh, 1vh) * 100 - 92px)' }}>
        <img src={CHAPTER.img} alt={CHAPTER.heading} className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.28) 100%)' }} />

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
                className="text-[28px] font-bold text-white tracking-[-0.02em] leading-none"
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
export default function AboutUs() {
  return (
    <section id="about">
      <IntroHero />
      <StudioStory />
    </section>
  )
}
