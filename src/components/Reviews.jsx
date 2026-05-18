import { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react'
import { motion, useAnimation } from 'framer-motion'

const PLACE_ID = 'ChIJG19CHQCdAhURSgoUtzvciws'
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY

const MANUAL_REVIEWS = [
  // ── מיקום התחלתי (1–4) ──────────────────────────────────
  {
    author: 'ליטל מנור',
    text: 'טל והצוות שלה סופר מקצועיות, מעבירות שיעורים ברמה גבוהה מאוד, באופן שמותאם למתאמנות באופן אישי, תוך התאמה לכל אחת ודרגת הקושי שלה. מרגישה שהן מאתגרות אותי ועוזרות לי להשתפר.\nאישית התאמנתי עד לחודש ה-8 להריון שלי, וכמובן שלאחר הלידה חזרתי ברגע שהיה ניתן. התרגילים הותאמו לי לאורך הדרך. צוות מנצח!',
    rating: 5,
    url: 'https://share.google/IxdHDY6kCikSTEiW1',
  },
  {
    author: 'לינור ברששת',
    text: 'סטודיו מקצועי עם אווירה מושלמת, יחס אישי ומאמנות תותחיות אחת אחת.\nבמיוחד טל האהובה שליי, כל אימון מלא באנרגיות טובות, מקצועיות ומוטיבציה שלא נותנת לוותר לעצמך.\nממליצה מכל הלב ❤️',
    rating: 5,
    url: 'https://share.google/b2jowyF3xTcp0AbnF',
  },
  {
    author: 'שירז מוזס',
    text: 'הסטודיו שגרם לי להתאהב בפילאטיס ולהתמיד באימונים, כמו שאף פעם לא הצלחתי.\nאווירה מדהימה עם אנרגיות טובות, הדבר הכי טוב שעשיתי לעצמי.',
    rating: 5,
    url: 'https://share.google/kj2zacIc3MpKL1LOg',
  },
  {
    author: 'יעל קנר',
    text: 'הסטודיו הכי הכי טוב שיש!\nמדריכות מקצועיות, יחס אישי, אימונים מאתגרים ומותאמים ברמה לכל אחת באופן אישי.\nהתחשבות אמיתית במתאמנים, מתן עזרה כשצריך והתחשבות מקסימלית.\nהתאמנתי בהמון מקומות, ואף מקום לא השתווה לזה ❤️',
    rating: 5,
    url: 'https://share.google/uLslRmqpwU2rE4yU9',
  },
  // ── גלילה ימינה: 8–10 ────────────────────────────────────
  {
    author: 'נויה וג׳ימה',
    text: 'האווירה פשוט נעימה ומרגיעה, המקום תמיד נקי ומסודר, והאימונים עצמם ברמה ממש גבוהה.\nהמדריכות מקצועיות, קשובות וסבלניות, ותמיד נותנות יחס אישי.\nמרגישים שבאמת אכפת להן מכל אחת ❤️',
    rating: 5,
    url: 'https://share.google/6iYudG1jRIxNhcaSM',
  },
  {
    author: 'ויקי גינדין',
    text: 'סטודיו לפילאטיס ברמה הכי גבוהה, מקום יפה, חדש, מכשירים ואביזרים חדישים.\nמנהלת הסטודיו מתחשבת באילוצים, כל המדריכות מאוד מקצועיות ומקסימות.\nיש תחנת אוטובוס ממש צמודה למקום ( קו 3 וקו 5 ).',
    rating: 5,
    url: 'https://share.google/8bRwwfNGSQ3nk0n6U',
  },
  // ── שאר הביקורות ─────────────────────────────────────────
  {
    author: 'אילנה שמלה-ללום',
    text: 'אחלה מקום! אווירה מצוינת, מדריכות מקצועיות.\nכל אימון, חוויה מאתגרת וטובה.\nהמקום נקי, מואר ונגיש.',
    rating: 5,
    url: 'https://share.google/1jk6XPoMaQ7zrDRAV',
  },
  {
    author: 'גל פרצ׳יק',
    text: 'סטודיו מקצועי, אסתטי, נעים ומושקע.\nהמדריכות מקצועיות וקשובות, היחס אישי והשיעורים אפקטיביים ומאתגרים.\nממליצה מאוד!',
    rating: 5,
    url: 'https://share.google/4YIpy2xNtkmBWwtl4',
  },
  {
    author: 'ליאל רמניק',
    text: 'מקום סופר מקצועי ונעים, הצוות הכי טוב שיש!\nשמות לב לכל מתרגלת ומתאימות לה את התרגול ❤️',
    rating: 5,
    url: 'https://share.google/3BMwjWWf2TifrBLvD',
  },
  {
    author: 'אודליה טוסון',
    text: 'סטודיו שהוא בית, תמיד כיף להגיע ולהרגיש הצלחות קטנות!\nואתגרים חדשים כל אימון. תענוג.',
    rating: 5,
    url: 'https://share.google/SRxNli9CNsOtAuTH3',
  },
  {
    author: 'דנה משעלי',
    text: 'סטודיו משפחתי, מקצועי ונעים! אנרגיה טובה ומדריכות מקצועיות מאוד, כייף לבוא להתאמן!',
    rating: 5,
    url: 'https://share.google/wnfNpV4xmejIvyLiy',
  },
  {
    author: 'מרים מנור',
    text: 'רציתי להגיד תודה לסטודיו פילאטיס על חוויית אימון כל כך טובה!\nמרגישים את המקצועיות, הסבלנות והאכפתיות בכל שיעור.\nזה מקום שבאמת כיף להגיע אליו ולהתמיד בו 💙',
    rating: 5,
    url: 'https://share.google/XdtuFKTO20rUpnwC9',
  },
  // ── גלילה שמאלה: 5–7 (מיקומים N-3, N-2, N-1) ────────────
  {
    author: 'ספיר ממן',
    text: 'עברתי בשנים האחרונות מספר מקומות, ואני פשוט מאוהבת בסטודיו הזה!\nהמדריכות המטורפות האלה יודעות להביא אותך לקצה, לשפר את היכולות שלך ולשים לב לקצב ההתקדמות.\nזה לא רק לבוא לעשות אימון, זה הרבה מעבר לזה. זה כבר משפחה, ומקום שפשוט מביא לי כוח בגוף ובנפש.',
    rating: 5,
    url: 'https://share.google/HmtrENExmIBj3lc1T',
  },
  {
    author: 'קריסטינה סמודד',
    text: 'האימונים מקצועיים, מדויקים ומלאים תשומת לב לגוף ולנשימה.\nהרגשתי כבר אחרי כמה שיעורים שינוי ביציבה, יותר כוח ותחושה טובה בגוף.\nהאווירה בסטודיו נעימה ומרגיעה, ומרגישים שממש אכפת לכן מכל אחת.\nממליצה מאוד לכל מי שרוצה להתחזק ולהתחבר לגוף שלה בדרך עדינה ונכונה ❤️',
    rating: 5,
    url: 'https://share.google/GUbSYKkT1baGTvQBa',
  },
  {
    author: 'ליהי סלב',
    text: 'סטודיו מדהים בנראות ועוד יותר במקצועיות!\nהייתי בכמה מקומות במהלך השנים, וזה חד משמעית המקום המושלם.\nאנרגיות טובות ושיעורים כיפים ברמות ❤️❤️',
    rating: 5,
    url: 'https://share.google/I9S81e0N11pEPhffU',
  },
]

const N = MANUAL_REVIEWS.length
const DESKTOP_VISIBLE = 4

function StarRating({ rating = 5, size = 'sm' }) {
  const sz = size === 'lg' ? 'w-5 h-5' : 'w-3.5 h-3.5'
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} className={`${sz} ${i <= Math.round(rating) ? 'text-[#f0b429]' : 'text-[#d0ccbf]'}`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function AnimatedStarRating({ rating = 5 }) {
  const [started, setStarted] = useState(false)
  const wrapRef = useRef(null)
  const stampControls = useAnimation()
  const N = Math.round(rating)
  const STAR_MS = 500

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started) return
        setStarted(true)
        for (let i = 0; i < N; i++) {
          setTimeout(() => { try { navigator.vibrate(12) } catch {} }, i * STAR_MS)
        }
        const stampAt = (N - 1) * STAR_MS + 440
        setTimeout(async () => {
          await stampControls.start({
            scale: [1, 1.1, 0.95, 1],
            rotate: [0, -2, 0.8, 0],
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
          })
        }, stampAt)
      },
      { threshold: 0.5 }
    )
    if (wrapRef.current) io.observe(wrapRef.current)
    return () => io.disconnect()
  }, [started])

  return (
    <div ref={wrapRef} className="relative inline-flex">
      <motion.div className="flex gap-0.5" animate={stampControls}>
        {[1, 2, 3, 4, 5].map(i => (
          <motion.svg
            key={i}
            className={`w-5 h-5 md:w-[22px] md:h-[22px] ${i <= N ? 'text-[#f0b429]' : 'text-[#d0ccbf]'}`}
            viewBox="0 0 24 24"
            fill="currentColor"
            initial={{ scale: 0, opacity: 0 }}
            animate={started ? {
              scale: [0, 1.3, 0.9, 1],
              opacity: [0, 1, 1, 1],
              filter: [
                'drop-shadow(0 0 0px rgba(240,180,41,0))',
                'drop-shadow(0 0 9px rgba(240,180,41,1))',
                'drop-shadow(0 0 3px rgba(240,180,41,0.4))',
                'drop-shadow(0 0 0px rgba(240,180,41,0))',
              ]
            } : {}}
            transition={{
              delay: (i - 1) * (STAR_MS / 1000),
              duration: 0.44,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </motion.svg>
        ))}
      </motion.div>
    </div>
  )
}

const GoogleIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
)

function ReviewCard({ review }) {
  return (
    <div className="bg-white rounded-2xl border border-[#e8e3d9] p-6 flex flex-col h-full select-none" dir="rtl">
      <div
        className="text-[40px] leading-none text-[#c8c8c8] font-serif"
        style={{ fontFamily: 'Georgia, serif', marginBottom: '-10px' }}
      >"</div>

      <p
        className="text-black text-[15px] leading-[1.75] flex-1 font-normal"
        style={{ whiteSpace: 'pre-line' }}
      >
        {review.text}
      </p>

      <div className="border-t border-[#ede9e1] my-4" />

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#e8e3d9] flex items-center justify-center text-[#92a6b4] text-sm font-medium flex-shrink-0">
          {review.author[0]}
        </div>
        <div className="text-right">
          <div className="text-[13px] font-medium text-[#1a1a1a] leading-tight">{review.author}</div>
          <div className="mt-0.5">
            <StarRating rating={review.rating} />
          </div>
        </div>
      </div>

      <a
        href={review.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center gap-2 text-[13px] text-[#92a6b4] hover:text-[#1a1a1a] transition-colors duration-200 group"
      >
        <GoogleIcon className="w-4 h-4 flex-shrink-0" />
        <span className="underline underline-offset-2 decoration-[#c8c8c8] group-hover:decoration-[#1a1a1a] transition-colors">לצפייה בביקורת בגוגל</span>
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
      </a>
    </div>
  )
}

function NavButton({ onClick, children, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 rounded-full border border-[#c8c8c8] bg-white flex items-center justify-center text-[#1a1a1a]
        hover:border-[#1a1a1a] hover:shadow-sm cursor-pointer
        transition-all duration-200 flex-shrink-0 ${className}`}
    >
      {children}
    </button>
  )
}

export default function Reviews() {
  const [rating, setRating] = useState(null)
  const [totalCount, setTotalCount] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [pos, setPos] = useState(N)
  const [animated, setAnimated] = useState(true)
  const [cardWidth, setCardWidth] = useState(0)
  const trackRef = useRef(null)
  const touchStartX = useRef(null)
  const [dragOffset, setDragOffset] = useState(0)
  const isDragging = useRef(false)

  const EXTENDED = useMemo(() => [...MANUAL_REVIEWS, ...MANUAL_REVIEWS, ...MANUAL_REVIEWS], [])
  const VISIBLE = isMobile ? 1 : DESKTOP_VISIBLE

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}?fields=rating,userRatingCount&key=${API_KEY}`)
      .then(r => r.json())
      .then(data => {
        if (!data.error) {
          setRating(data.rating ?? null)
          setTotalCount(data.userRatingCount ?? null)
        }
      })
      .catch(() => {})
  }, [])

  useLayoutEffect(() => {
    if (!trackRef.current) return
    const measure = () => {
      const card = trackRef.current?.firstElementChild
      if (card) setCardWidth(card.offsetWidth)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(trackRef.current)
    return () => ro.disconnect()
  }, [isMobile])

  // Re-enable transition after silent position reset
  useEffect(() => {
    if (!animated) {
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)))
    }
  }, [animated])

  const goNext = () => setPos(p => p + 1)
  const goPrev = () => setPos(p => p - 1)

  const handleTransitionEnd = () => {
    if (pos >= 2 * N) { setAnimated(false); setPos(p => p - N) }
    else if (pos < 0)  { setAnimated(false); setPos(p => p + N) }
  }

  const activeIdx = ((pos % N) + N) % N
  const offset = pos * (cardWidth + 16)

  return (
    <section id="reviews" className="bg-[#f0ece4] pt-6 md:pt-9 pb-0 overflow-hidden" dir="rtl">

      {/* ── Header ── */}
      <div className="text-center mb-3.5 md:mb-5 px-8 md:px-10">
        <div className="inline-block">
          <motion.h2
            className="text-[28px] md:text-[32px] font-light text-[#1a1a1a] tracking-[-0.02em] leading-none"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            תקראי מה כתבו עלינו
          </motion.h2>

          <motion.div
            className="h-[3px] mt-3 mb-5 origin-right"
            style={{ background: '#92a6b4', width: '100%' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.9, delay: 0.22 }}
          />
        </div>

        <motion.p
          className="font-normal text-[#1a1a1a]"
          style={{ fontSize: 'clamp(16px, 1.45vw, 18px)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="md:hidden">הביקורות של המתאמנות שלנו אומרות הכל.<br />וזו רק טעימה קטנה ממה שמחכה לך אצלנו.</span>
          <span className="hidden md:inline">הביקורות של המתאמנות שלנו אומרות הכל, וזו רק טעימה קטנה ממה שמחכה לך אצלנו.</span>
        </motion.p>
      </div>

      {/* ── Carousel ── */}
      <div className="flex items-center gap-4 px-4">

        {/* Prev — right side in RTL */}
        <NavButton onClick={goNext} className="hidden md:flex flex-shrink-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </NavButton>

        {/* Track */}
        <div
          className="flex-1 overflow-hidden"
          dir="ltr"
          onTouchStart={e => {
            touchStartX.current = e.touches[0].clientX
            isDragging.current = true
          }}
          onTouchMove={e => {
            if (!isDragging.current || touchStartX.current === null) return
            setDragOffset(e.touches[0].clientX - touchStartX.current)
          }}
          onTouchEnd={e => {
            if (touchStartX.current === null) return
            isDragging.current = false
            const dx = e.changedTouches[0].clientX - touchStartX.current
            touchStartX.current = null
            setDragOffset(0)
            const THRESHOLD = window.innerWidth * 0.15
            if (dx < -THRESHOLD) goNext()
            else if (dx > THRESHOLD) goPrev()
          }}
          onTouchCancel={() => {
            isDragging.current = false
            touchStartX.current = null
            setDragOffset(0)
          }}
        >
          <div
            ref={trackRef}
            className="flex gap-4"
            style={{
              transform: `translateX(${-offset + dragOffset}px)`,
              transition: animated && !isDragging.current ? 'transform 0.38s cubic-bezier(0.25,0.1,0.25,1)' : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {EXTENDED.map((review, i) => (
              <div key={i} className="flex-shrink-0 w-full md:w-[calc(25%-12px)]" dir="rtl">
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>

        {/* Next — left side in RTL */}
        <NavButton onClick={goPrev} className="hidden md:flex flex-shrink-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </NavButton>

      </div>

      {/* ── Mobile: חץ | נקודות | חץ ── */}
      <div className="flex md:hidden items-center justify-center gap-3 mt-[30px] px-4">
        <NavButton onClick={goNext}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </NavButton>
        <div className="flex gap-2 flex-wrap justify-center flex-1" dir="ltr">
          {Array.from({ length: N }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setAnimated(true); setPos(N + i) }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIdx ? 'w-5 bg-[#1a1a1a]' : 'w-2 bg-[#c8c8c8]'
              }`}
              aria-label={`ביקורת ${i + 1}`}
            />
          ))}
        </div>
        <NavButton onClick={goPrev}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </NavButton>
      </div>

      {/* ── Desktop: נקודות בלבד ── */}
      <div className="hidden md:flex justify-center gap-2 mt-8 flex-wrap" dir="ltr">
        {Array.from({ length: N }).map((_, i) => (
          <button
            key={i}
            onClick={() => { setAnimated(true); setPos(N + i) }}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIdx ? 'w-5 bg-[#1a1a1a]' : 'w-2 bg-[#c8c8c8] hover:bg-[#92a6b4]'
            }`}
            aria-label={`ביקורת ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Summary bar ── */}
      <div className="mx-4 md:mx-20 mt-[30px] md:mt-8 border border-[#ddd9d0] rounded-2xl overflow-hidden bg-white/40">
        <div className="grid grid-cols-2 md:grid-cols-3" dir="ltr">

          {/* Rating */}
          <div className="flex flex-col items-center justify-center py-5 md:py-7 px-4 md:px-6 border-r border-b md:border-b-0 md:border-r border-[#ddd9d0]" dir="rtl">
            <p className="text-[11px] tracking-[0.1em] uppercase text-[#92a6b4] mb-2">דירוג ממוצע בגוגל</p>
            <p className="text-[42px] font-light text-[#1a1a1a] leading-none mb-2">
              {rating?.toFixed(1) ?? '5.0'}
            </p>
            <AnimatedStarRating rating={rating ?? 5} />
          </div>

          {/* Google count */}
          <div className="flex flex-col items-center justify-center py-5 md:py-7 px-4 md:px-6 border-b md:border-b-0 md:border-r border-[#ddd9d0]" dir="rtl">
            <GoogleIcon className="w-12 h-12 mb-3" />
            <p className="text-[15px] font-medium text-[#1a1a1a]">
              {totalCount ? `+${totalCount}` : ''} ביקורות בגוגל
            </p>
            <p className="hidden md:flex text-[12px] text-[#92a6b4] mt-1 items-center gap-1.5">
              תודה לכל המתאמנות שלנו
              <svg className="w-3.5 h-3.5 text-[#f9a08c] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </p>
          </div>

          {/* CTA */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-center justify-center py-7 px-6" dir="rtl">
            <p className="font-bold text-[#1a1a1a] mb-4 whitespace-nowrap text-[17px] md:text-[20px]">רוצה להרגיש את ההבדל בעצמך?</p>
            <a
              href="#contact"
              onClick={e => {
                e.preventDefault()
                document.dispatchEvent(new CustomEvent('openContactSheet'))
              }}
              className="text-[18px] tracking-normal font-medium text-[#1a1a1a] whitespace-nowrap px-5 py-[7px] rounded-full transition-[background-color,opacity] duration-[420ms]"
              style={{ backgroundColor: '#92a6b4' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#7a95a5'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#92a6b4'}
            >
              לתיאום שיעור היכרות
            </a>
          </div>

        </div>
      </div>

    </section>
  )
}
