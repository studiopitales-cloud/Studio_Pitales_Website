import { useRef, useState, useEffect, useCallback } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   1. INTRO — declub-inspired split layout
   ═══════════════════════════════════════════════════════════════ */
const INTRO_LINES = [
  { text: 'מקום של דיוק.', color: '#000000' },
  { text: 'אווירה מקצועית.', color: '#000000' },
  { text: 'תנועה מודעת.', color: '#92a6b4', bold: true },
]
const CHAR_DELAY = 75
const LINE_PAUSE = 420

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
        const t = setTimeout(() => { setCurLine(l => l + 1); setCurChar(0) }, LINE_PAUSE)
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
        className="relative w-full max-w-[1360px] mx-auto px-8 md:px-16 py-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-28"
      >

        {/* ── RIGHT column: typewriter headline ── */}
        <div className="relative">

          <TypewriterHeading triggered={typing} onComplete={() => setLeftVisible(true)} />
        </div>

        {/* ── LEFT column: appears after typing done ── */}
        <motion.div
          className="text-right flex flex-col gap-7"
          initial={{ opacity: 0, y: 18 }}
          animate={leftVisible ? { opacity: 1, y: 0 } : {}}
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

/* ═══════════════════════════════════════════════════════════════
   2. STUDIO STORY — sticky split (desktop) / stacked (mobile)
   ═══════════════════════════════════════════════════════════════ */
const CHAPTERS = [
  {
    num: '01',
    heading: 'מקום של דיוק',
    body: 'בסטודיו PITALES, כל שיעור הוא מפגש אישי. אנחנו מאמינות שפילאטיס אמיתי הוא לא רק אימון — זו שפה שלמה של תנועה מדויקת, נשימה מכוונת ומודעות גופנית עמוקה.',
    img: '/DSC07363.jpg',
  },
  {
    num: '02',
    heading: 'אווירה מקצועית',
    body: 'נכנסים ומשאירים בחוץ את כל הרעש. הסטודיו תוכנן כמרחב של ריכוז ונוכחות. קבוצות קטנות, קשב מלא, ותשומת לב אישית לכל מתאמנת בכל שיעור.',
    img: '/DSC08246.jpg',
  },
  {
    num: '03',
    heading: 'תנועה מודעת',
    body: 'אנחנו לא סופרות חזרות — אנחנו מלמדות איך לנוע נכון. כל תנועה היא כוונה. כל שיעור הוא צעד קדימה בהבנה עמוקה של הגוף שלך.',
    img: '/DSC07803.jpg',
  },
]

function ChapterText({ chapter, index, onVisible }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-40% 0px -10% 0px' })

  useEffect(() => {
    if (isInView) onVisible(index)
  }, [isInView, index, onVisible])

  return (
    <motion.div
      ref={ref}
      className={`h-full md:h-auto md:min-h-[75vh] flex items-center px-6 md:px-16 py-6 md:py-16 text-right${index === CHAPTERS.length - 1 ? ' md:pb-[45vh]' : ''}`}
    >
      <div className="max-w-[480px] mr-0 ml-auto">
        <div className="inline-block">
          <motion.h2
            className="font-normal md:font-normal text-[#1a1a1a] mb-6"
            style={{ fontSize: 'clamp(26px, 3vw, 44px)', letterSpacing: '-0.022em' }}
            initial={{ opacity: 0, y: 22 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {chapter.heading}
          </motion.h2>

          <motion.div
            className="h-[3px] bg-[#92a6b4] mb-7 origin-right"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ width: '100%' }}
          />
        </div>

        <motion.p
          className="font-normal md:font-normal leading-[2.0] text-[#1a1a1a]"
          style={{ fontSize: 'clamp(16px, 1.45vw, 18px)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.38 }}
        >
          {chapter.body}
        </motion.p>
      </div>
    </motion.div>
  )
}

function StickyImagePanel({ chapters, activeIndex }) {
  return (
    <div className="w-full h-full relative overflow-hidden bg-[#111]">
      {chapters.map((ch, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{ opacity: activeIndex === i ? 1 : 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <img
            src={ch.img}
            alt={ch.heading}
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 55%)' }}
          />
        </motion.div>
      ))}
      <p
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[9px] md:text-[18px] tracking-[0.55em] uppercase z-10"
        style={{ color: 'rgba(240,236,228,0.32)' }}
      >
        STUDIO PITALES
      </p>
    </div>
  )
}

function StudioStory() {
  const [activeIndex, setActiveIndex] = useState(0)
  const handleVisible = useCallback((i) => setActiveIndex(i), [])

  return (
    <div className="relative bg-cream">
      {/* ── Desktop: sticky split ── */}
      <div className="hidden md:grid grid-cols-2">
        <div className="sticky" style={{ top: 92, height: 'calc(100vh - 92px)', alignSelf: 'start' }}>
          <StickyImagePanel chapters={CHAPTERS} activeIndex={activeIndex} />
        </div>
        <div>
          {CHAPTERS.map((ch, i) => (
            <ChapterText key={i} chapter={ch} index={i} onVisible={handleVisible} />
          ))}
        </div>
      </div>

      {/* ── Mobile: sticky split — image top half, text bottom half ── */}
      <div className="md:hidden">
        {/* Sticky image — sticks to top half below navbar */}
        <div
          className="sticky z-10"
          style={{ top: 92, height: 'calc((100svh - 92px) / 2)' }}
        >
          <StickyImagePanel chapters={CHAPTERS} activeIndex={activeIndex} />
        </div>

        {/* Scrolling text — each chapter equal height */}
        <div>
          {CHAPTERS.map((ch, i) => (
            <div key={i} style={{ height: 'calc((100svh - 92px) / 2.8)' }}>
              <ChapterText chapter={ch} index={i} onVisible={handleVisible} />
            </div>
          ))}
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
    <section id="schedule">
      <IntroHero />
      <StudioStory />
    </section>
  )
}
