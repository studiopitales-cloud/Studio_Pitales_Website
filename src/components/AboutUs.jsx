import { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════════════════════════════
   1. INTRO — declub-inspired split layout
   ═══════════════════════════════════════════════════════════════ */
const INTRO_LINES = [
  { text: 'מקום של דיוק.', color: '#000000' },
  { text: 'אווירה מקצועית.', color: '#000000' },
  { text: 'תנועה מודעת.', color: '#92a6b4', bold: true },
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
        <div className="relative">

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

/* ═══════════════════════════════════════════════════════════════
   2. STUDIO STORY — sticky split (desktop) / stacked (mobile)
   ═══════════════════════════════════════════════════════════════ */
const CHAPTERS = [
  {
    num: '01',
    heading: 'מקום של דיוק',
    body: 'אנחנו מאמינות שפילאטיס אמיתי הוא לא רק אימון, זו שפה שלמה של תנועה מדויקת, נשימה מכוונת ומודעות גופנית עמוקה.',
    img: '/DSC07363.jpg',
  },
  {
    num: '02',
    heading: 'אווירה מקצועית',
    body: 'נכנסים ומשאירים בחוץ את כל הרעש. הסטודיו תוכנן כמרחב של ריכוז ונוכחות. קבוצות קטנות, קשב מלא, ויחס אישי לכל מתאמנת בכל שיעור.',
    img: '/DSC08246.jpg',
  },
  {
    num: '03',
    heading: 'תנועה מודעת',
    body: 'אנחנו לא סופרות חזרות, אנחנו מלמדות איך לנוע נכון. כל תנועה היא כוונה. כל שיעור הוא צעד קדימה בהבנה עמוקה של הגוף שלך.',
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
  const desktopRef = useRef(null)
  const mobileRef  = useRef(null)
  const idxRef     = useRef(0)
  const busyRef    = useRef(false)

  useLayoutEffect(() => {
    const getVH = () => window.visualViewport?.height ?? window.innerHeight
    const N     = CHAPTERS.length
    const mm    = gsap.matchMedia()

    /*
     * buildContext — shared logic for both breakpoints.
     *
     * Behavior contract:
     *   entering from top      → chapter 0
     *   entering from bottom   → chapter N-1
     *   scrolling down, last   → release pin (exit section)
     *   scrolling up, first    → release pin (exit section)
     *   any other scroll       → advance/retreat one chapter, pin stays locked
     */
    const buildContext = (el) => {
      idxRef.current = 0
      busyRef.current = false

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 92px',
        end: () => `+=${getVH() * (N - 1)}`,
        pin: true,
        pinSpacing: true,
        onEnter:     () => { idxRef.current = 0;     setActiveIndex(0) },
        onEnterBack: () => { idxRef.current = N - 1; setActiveIndex(N - 1) },
      })

      /*
       * goChapter — advances chapter by `dir` (+1 / -1).
       *
       * Boundaries:
       *   first + up   → scroll out of section upward (release pin naturally)
       *   last  + down → scroll out of section downward (release pin naturally)
       */
      const goChapter = (dir) => {
        const cur     = idxRef.current
        const isFirst = cur === 0
        const isLast  = cur === N - 1

        /* Boundary exits: native scroll + GSAP release — no intervention needed */
        if ((isFirst && dir < 0) || (isLast && dir > 0)) return

        if (busyRef.current) return

        busyRef.current = true
        const next = cur + dir
        idxRef.current = next
        setActiveIndex(next)
        window.scrollTo({ top: trigger.start + next * getVH(), behavior: 'instant' })
        setTimeout(() => { busyRef.current = false }, 700)
      }

      /*
       * Snap-to-entry guard — prevents fast scroll from skipping past the section.
       * Any time the scroll crosses trigger.start going DOWN, we snap back to it
       * and briefly lock overflow to kill momentum (trackpad / kinetic scroll).
       */
      let prevY      = window.scrollY
      let snapping   = false
      let lockTimer  = null

      const releaseLock = () => {
        document.documentElement.style.overflow = 'auto'
        prevY    = window.scrollY
        snapping = false
      }

      const extendLock = () => {
        clearTimeout(lockTimer)
        lockTimer = setTimeout(releaseLock, 220)
      }

      const snap = (target, chapter) => {
        snapping = true
        idxRef.current = chapter
        setActiveIndex(chapter)
        window.scrollTo({ top: target, behavior: 'instant' })
        document.documentElement.style.overflow = 'hidden'
        extendLock()
      }

      const onSnapScroll = () => {
        if (snapping) return
        const y = window.scrollY

        /* ── Scrolling DOWN into section ── */
        if (prevY < trigger.start - 5 && y >= trigger.start) {
          if (!window.__progScroll) snap(trigger.start, 0)
          else prevY = y
          return
        }

        /* ── Scrolling UP into section from below ── */
        if (prevY > trigger.end + 5 && y <= trigger.end) {
          if (!window.__progScroll) snap(trigger.end, N - 1)
          else prevY = y
          return
        }

        prevY = y
      }
      window.addEventListener('scroll', onSnapScroll, { passive: true })

      return { trigger, goChapter, onSnapScroll, isSnapping: () => snapping, extendLock, releaseLock }
    }

    /* ── Desktop: wheel events ── */
    mm.add('(min-width: 768px)', () => {
      const { trigger, goChapter, onSnapScroll, isSnapping, extendLock, releaseLock } = buildContext(desktopRef.current)

      const onWheel = (e) => {
        if (isSnapping()) { e.preventDefault(); extendLock(); return }
        if (!trigger.isActive) return
        const dir        = e.deltaY > 0 ? 1 : -1
        const isExitUp   = idxRef.current === 0     && dir < 0
        const isExitDown = idxRef.current === N - 1 && dir > 0
        if (isExitUp || isExitDown) return
        e.preventDefault()
        goChapter(dir)
      }
      const onResize = () => ScrollTrigger.refresh()

      window.addEventListener('wheel', onWheel, { passive: false })
      window.addEventListener('resize', onResize)
      return () => {
        trigger.kill()
        releaseLock()
        window.removeEventListener('wheel', onWheel)
        window.removeEventListener('resize', onResize)
        window.removeEventListener('scroll', onSnapScroll)
      }
    })

    /* ── Mobile: touch swipe ── */
    mm.add('(max-width: 767px)', () => {
      const { trigger, goChapter, onSnapScroll } = buildContext(mobileRef.current)

      let touchY    = 0
      let touchLive = false

      const onTouchStart = (e) => {
        if (!trigger.isActive) return
        touchY    = e.touches[0].clientY
        touchLive = true
      }
      const onTouchMove = (e) => {
        if (!touchLive || !trigger.isActive) return
        const diff = touchY - e.touches[0].clientY
        const dir  = diff > 0 ? 1 : -1
        const isExitUp   = idxRef.current === 0     && dir < 0
        const isExitDown = idxRef.current === N - 1 && dir > 0
        if (!isExitUp && !isExitDown) e.preventDefault()
      }
      const onTouchEnd = (e) => {
        if (!touchLive) return
        touchLive = false
        if (!trigger.isActive) return
        const diff = touchY - e.changedTouches[0].clientY
        if (Math.abs(diff) < 10) return
        goChapter(diff > 0 ? 1 : -1)
      }

      const onResize      = () => setTimeout(() => ScrollTrigger.refresh(), 50)
      const onOrientation = () => setTimeout(() => ScrollTrigger.refresh(), 220)
      let vvHandler = null
      if (window.visualViewport) {
        vvHandler = () => setTimeout(() => ScrollTrigger.refresh(), 50)
        window.visualViewport.addEventListener('resize', vvHandler)
      }

      const el = mobileRef.current
      el.addEventListener('touchstart', onTouchStart, { passive: false })
      el.addEventListener('touchmove',  onTouchMove,  { passive: false })
      el.addEventListener('touchend',   onTouchEnd,   { passive: true  })
      window.addEventListener('resize',            onResize)
      window.addEventListener('orientationchange', onOrientation)

      return () => {
        trigger.kill()
        el.removeEventListener('touchstart', onTouchStart)
        el.removeEventListener('touchmove',  onTouchMove)
        el.removeEventListener('touchend',   onTouchEnd)
        window.removeEventListener('resize',            onResize)
        window.removeEventListener('orientationchange', onOrientation)
        window.removeEventListener('scroll', onSnapScroll)
        if (window.visualViewport && vvHandler) {
          window.visualViewport.removeEventListener('resize', vvHandler)
        }
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <div className="relative bg-[#f0ece4]" style={{ overflowX: 'hidden' }}>

      {/* ── Desktop: GSAP pinned storytelling ── */}
      <div
        ref={desktopRef}
        className="hidden md:grid grid-cols-2"
        style={{ height: 'calc(100lvh - 92px)', overflowX: 'hidden' }}
      >
        {/* Left col: Image */}
        <div className="relative overflow-hidden bg-[#111] h-full" style={{ willChange: 'transform', transform: 'translateZ(0)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
          {CHAPTERS.map((ch, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              animate={{ opacity: activeIndex === i ? 1 : 0 }}
              transition={{ duration: 0.65, ease: 'easeInOut' }}
            >
              <img src={ch.img} alt={ch.heading} className="w-full h-full object-cover object-center" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 55%)' }} />
            </motion.div>
          ))}
          <motion.img
            src="/brand_assets/tal_slogan_.svg"
            alt="Studio Pitales slogan"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
            style={{ width: 'clamp(180px, 22vw, 280px)', filter: 'brightness(0) invert(1)', opacity: 0.38 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Right col: Text pinned at ~25vh */}
        <div className="relative h-full" style={{ paddingTop: 'calc(25vh - 92px)' }}>
          <div className="relative px-16 text-right" style={{ minHeight: 320 }}>
            {CHAPTERS.map((ch, i) => (
              <motion.div
                key={i}
                className="absolute inset-x-0 px-16 text-right"
                animate={
                  activeIndex === i
                    ? { opacity: 1, y: 0 }
                    : activeIndex > i
                    ? { opacity: 0, y: -28 }
                    : { opacity: 0, y: 28 }
                }
                transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="inline-block">
                  <h2
                    className="font-normal text-[#1a1a1a] mb-6"
                    style={{ fontSize: 'clamp(26px, 3vw, 44px)', letterSpacing: '-0.022em' }}
                  >
                    {ch.heading}
                  </h2>
                  <motion.div
                  key={activeIndex === i ? `active-${i}` : 'inactive'}
                  className="h-[3px] bg-[#92a6b4] mb-7 origin-right"
                  style={{ width: '100%' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                />
                </div>
                <p
                  className="font-normal leading-[2.0] text-[#1a1a1a]"
                  style={{ fontSize: 'clamp(16px, 1.45vw, 18px)' }}
                >
                  {ch.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile: GSAP pinned, text centered ── */}
      <div
        ref={mobileRef}
        className="md:hidden relative overflow-hidden"
        style={{ height: 'calc(100lvh - 92px)', overflowX: 'hidden' }}
      >
        {/* Background images */}
        <div className="absolute inset-0" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
          {CHAPTERS.map((ch, i) => (
            <motion.div key={i} className="absolute inset-0"
              animate={{ opacity: activeIndex === i ? 1 : 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <img src={ch.img} alt={ch.heading} className="w-full h-full object-cover object-center" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.28) 100%)' }} />
            </motion.div>
          ))}
        </div>

        {/* Slogan */}
        <motion.img
          src="/brand_assets/tal_slogan_.svg"
          alt="Studio Pitales slogan"
          className="absolute left-1/2 -translate-x-1/2 z-10 pointer-events-none"
          style={{ width: 120, filter: 'brightness(0) invert(1)', opacity: 0.38, bottom: 'calc(100lvh - 100svh + 2rem)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />

        {/* Chapters — each fills section + centers content */}
        {CHAPTERS.map((ch, i) => (
          <motion.div
            key={i}
            className="absolute inset-x-0 top-0 flex items-center justify-center px-7"
            style={{ height: 'calc(100svh - 92px)' }}
            dir="rtl"
            animate={
              activeIndex === i
                ? { opacity: 1, y: 0 }
                : activeIndex > i
                ? { opacity: 0, y: -28 }
                : { opacity: 0, y: 28 }
            }
            transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-full text-center max-w-[340px]">
              <div className="inline-block mb-5">
                <h2 className="font-normal text-white mb-4"
                  style={{ fontSize: 'clamp(26px, 8vw, 36px)', letterSpacing: '-0.022em' }}
                >
                  {ch.heading}
                </h2>
                <motion.div
                  key={activeIndex === i ? `active-${i}` : 'inactive'}
                  className="h-[3px] bg-[#92a6b4] origin-right"
                  style={{ width: '100%' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                />
              </div>
              <p className="font-normal text-white/90 leading-[1.9]"
                style={{ fontSize: 'clamp(15px, 4vw, 17px)' }}
              >
                {ch.body}
              </p>
            </div>
          </motion.div>
        ))}
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
