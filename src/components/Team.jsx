import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const members = [
  {
    name: 'טל בריגה',
    role: 'מדריכת פילאטיס',
    bio: 'בעלים ומנהלת הסטודיו, בעלת תואר ראשון בחינוך גופני עם התמחות בגיל השלישי ומעל עשר שנות ניסיון בהדרכת ספורט.',
    specialties: ['פילאטיס מכשירים', 'שיקום', 'כל הרמות'],
    years: 8,
    quote: '״את התשוקה שלי מצאתי בפילאטיס, והיום אני זוכה להעביר אותה הלאה לנשים שרוצות להתמיד בספורט וגם ליהנות מהדרך.״',
    img: '/DSC06999.jpg',
  },
  {
    name: 'יובל גבאי',
    role: 'מדריכת פילאטיס',
    bio: 'מתמחה בעבודה אישית ומקצועית, מביאה אנרגיה וחיוניות לכל שיעור.',
    specialties: ['אימון אישי', 'ריפורמר', 'גמישות'],
    years: 6,
    quote: '"כל גוף הוא עולם ומלואו"',
    img: '/DSC06963.jpg',
  },
  {
    name: 'נועם אלבז',
    role: 'מדריכת פילאטיס',
    bio: 'מדריכה מוסמכת עם גישה ייחודית המשלבת מודעות גוף ונשימה נכונה.',
    specialties: ['מודעות גוף', 'נשימה', 'מזרן'],
    years: 5,
    quote: '"חוזק אמיתי מתחיל מבפנים"',
    img: '/DSC06906.jpg',
  },
  {
    name: 'קטרין גכטמן',
    role: 'מדריכת פילאטיס',
    bio: 'בוגרת תכניות הכשרה מקצועיות, מתמחה ביציבה ובשיפור איכות החיים.',
    specialties: ['יציבה', 'כאבי גב', 'שיקום'],
    years: 7,
    quote: '"הגוף זוכר כל תנועה"',
    img: '/DSC07585.jpg',
  },
]

const FLIP_DURATION = 900 // ms

function PlusIcon({ open }) {
  return (
    <motion.div
      animate={{ rotate: open ? 45 : 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 flex items-center justify-center flex-shrink-0"
      style={{ borderColor: open ? '#92a6b4' : '#ffffff', opacity: 1 }}
    >
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ opacity: 1 }}
        stroke={open ? '#92a6b4' : '#ffffff'} strokeWidth="2" strokeLinecap="round">
        <line x1="6.5" y1="1" x2="6.5" y2="12"/>
        <line x1="1" y1="6.5" x2="12" y2="6.5"/>
      </svg>
    </motion.div>
  )
}

function TeamCard({ member, flipped }) {
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3 / 4' }}>
      <div className="absolute inset-0" style={{ perspective: '1200px' }}>

        <motion.div
          className="relative w-full h-full select-none"
          style={{ transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d' }}
          animate={{ rotateY: flipped ? 0 : -180 }}
          transition={{ duration: FLIP_DURATION / 1000, ease: [0.4, 0, 0.2, 1] }}
          onMouseEnter={() => !isMobile && flipped && setOpen(true)}
          onMouseLeave={() => !isMobile && setOpen(false)}
          onClick={() => isMobile && flipped && setOpen(o => !o)}
        >

          {/* ── BACK FACE ── */}
          <div
            className="absolute inset-0 rounded-xl md:rounded-2xl flex flex-col items-center justify-center"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(-180deg)',
              backgroundColor: '#92a6b4',
            }}
          >
            <img
              src="/brand_assets/tal_Icon_.svg"
              alt="Pitales"
              style={{ width: '46%', filter: 'brightness(0) invert(1)', opacity: 0.88 }}
            />
          </div>

          {/* ── FRONT FACE ── */}
          <div
            className="absolute inset-0 rounded-xl md:rounded-2xl overflow-hidden"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            <motion.img
              src={member.img}
              alt={member.name}
              className="absolute inset-0 w-full h-full object-cover object-top"
              animate={{ scale: open ? 1.06 : 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />

            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ opacity: open ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.72) 50%, rgba(0,0,0,0.60) 100%)' }}
            />

            {/* Plus icon — top left */}
            <div className="absolute top-3 left-3 md:top-4 md:left-4">
              <PlusIcon open={open} />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-4 md:p-5" dir="rtl">
              <motion.div
                animate={{ opacity: open ? 1 : 0, y: open ? 0 : 16 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                style={{ pointerEvents: open ? 'auto' : 'none', marginBottom: 0 }}
                className="md:mb-4"
              >
                <p className="text-[11px] md:text-[14px] font-bold italic leading-[1.85] mb-3" style={{ color: '#92a6b4' }}>
                  {member.quote}
                </p>
              </motion.div>

              <div className="min-w-0">
                <h3
                  className="font-medium text-white uppercase tracking-[0.05em] leading-tight truncate text-[16px] md:text-[27px]"
                >
                  {member.name}
                </h3>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  )
}

export default function Team() {
  const [visible, setVisible] = useState(false)
  const [flippedCards, setFlippedCards] = useState([false, false, false, false])
  const ref = useRef(null)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.6 }
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    members.forEach((_, i) => {
      setTimeout(() => {
        setFlippedCards(prev => {
          const next = [...prev]
          next[i] = true
          return next
        })
      }, i * FLIP_DURATION)
    })
  }, [visible])

  return (
    <section id="team" ref={ref} className="bg-[#111] min-h-[calc(100svh-92px)] md:min-h-0 pt-6 md:pt-9 pb-10 md:pb-14 px-8 md:px-10">
      <div className="max-w-[1320px] mx-auto">

        <header className="text-center mb-4 md:mb-[21px]">
          <div className="inline-block">
            <h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] text-cream leading-none">
              הצוות שלנו
            </h2>
            <div className="h-[3px] bg-[#92a6b4] mt-3 mb-4 w-full" />
          </div>
          <p
            className="text-[#92a6b4] mb-0 font-normal"
            style={{ fontSize: 'clamp(16px, 1.45vw, 18px)' }}
          >
            הכירי את נבחרת המדריכות שלנו!<br className="md:hidden" /> מקצועיות, מסורות ומלאות אהבה לתנועה.
          </p>
        </header>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 md:gap-3">
          {members.map((m, i) => (
            <TeamCard key={m.name} member={m} flipped={flippedCards[i]} />
          ))}
        </div>

      </div>
    </section>
  )
}
