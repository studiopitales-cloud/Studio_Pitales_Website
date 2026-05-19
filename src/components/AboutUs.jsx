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

function PLetterIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 567.58 575.8" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <mask id="pLetterMask">
          <rect x="0" y="0" width="567.58" height="575.8" fill="white"/>
          <path fill="black" d="m441.03,103.14c-73.17-63.45-183.81-81.22-271.58-38.21-74.72,35.23-127.36,112.23-133.03,194.62-6.64,80.39,29.18,161.86,90.65,213.39,60.86,52.15,146.99,74.02,225.12,54.32,80.14-19.05,147.34-83.31,170.03-162.51,28.27-93.42-6.9-199.62-81.18-261.6ZM55.24,261.7c15.11-98.67,87.39-171.8,173.02-197.07,4.89,34.44,8.02,68.97,10.71,103.61,2.56,34.96,4.39,69.94,5.58,104.93-12.16.89-24.38,4.03-36.6,10.32-28.8,15.13-57.6,45.37-61.53,79.11-2.66,24.07,12.98,42.43,34.03,51.58l11.6-34.82c-2.84-.37-5.44-1.03-7.72-1.81-4.22-1.65-7.36-3.53-9.46-7.46-3.68-7.63-2.2-16.34.59-25.22,6.87-20.04,21.59-37.81,39.22-49.49,9.39-6.17,19.63-9.7,30.24-11.28,1.24,41.27,1.54,82.57.86,123.88-.77,37.01-2.07,73.97-5.51,110.86-40.17-6.27-78.64-23.15-109.69-50.05-59.49-49.67-87.9-131.1-75.34-207.08Zm208.24-103.33c2.06-3.2,6.47-6.74,11.95-9.38,18.53-8.65,40.23-9.74,61.08-7.68,36.19,3.7,72.36,19.18,99.01,44.73,10.51,10.28,20.09,21.89,26.75,35.08,11.46,25.15,13.22,62.13-8.83,82.09-55.55,44.85-124.75-27.04-196.58-30.2,1.37-38.33,3.27-76.68,6.29-114.94l.32.3Zm83.81,351.68c-27.62,9.3-56.95,12.92-85.92,11.09-7.05-77.48-6.91-155.32-5.02-233.03.05-1.67.11-3.33.17-5,14.72-.35,29.79,2.47,43.97,6.75,14.81,4.29,29.24,9.95,43.67,15.5,25.39,9.38,52.44,21.25,80.27,16.98,20.43-3.36,39.6-14.12,48.17-33.81,6.84-15.03,7.98-31.84,6.05-48.03-1.28-10.1-3.99-20.29-8.47-29.61-2.7-5.46-5.99-10.69-9.36-15.75-27.58-40.85-72.54-67.64-120.32-78.15-22.42-4.59-49.72-7.03-73.57-.39,2.09-20.29,4.58-40.54,7.55-60.74,55.62-4.83,113.44,10.58,162.78,51.73,140.57,121.02,81.61,346.92-89.96,402.46Z"/>
        </mask>
      </defs>
      <rect x="0" y="0" width="567.58" height="575.8" fill="currentColor" mask="url(#pLetterMask)"/>
    </svg>
  )
}

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
        <div className="flex items-center md:block">

          {/* Mobile: left half typewriter */}
          <div className="relative w-1/2 md:w-full">
            <TypewriterHeading triggered={typing} onComplete={() => {}} />
          </div>

          {/* Mobile: right half — P icon, black, transparent bg, no padding */}
          <div className="md:hidden w-1/2 flex items-center justify-end self-stretch">
            <PLetterIcon className="h-full w-auto text-black" />
          </div>
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
