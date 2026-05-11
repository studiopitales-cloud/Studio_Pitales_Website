import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const members = [
  {
    name: 'טל בריגה',
    role: 'מדריכת פילאטיס',
    bio: 'מדריכת פילאטיס מוסמכת עם ניסיון רב בעבודה עם כל הרמות ובשיקום תנועתי.',
    specialties: ['פילאטיס מכשירים', 'שיקום', 'כל הרמות'],
    years: 8,
    quote: 'תנועה היא השפה של הגוף',
    img: '/DSC06999.jpg',
  },
  {
    name: 'יובל גבאי',
    role: 'מדריכת פילאטיס',
    bio: 'מתמחה בעבודה אישית ומקצועית, מביאה אנרגיה וחיוניות לכל שיעור.',
    specialties: ['אימון אישי', 'ריפורמר', 'גמישות'],
    years: 6,
    quote: 'כל גוף הוא עולם ומלואו',
    img: '/DSC06963.jpg',
  },
  {
    name: 'נועם אלבז',
    role: 'מדריכת פילאטיס',
    bio: 'מדריכה מוסמכת עם גישה ייחודית המשלבת מודעות גוף ונשימה נכונה.',
    specialties: ['מודעות גוף', 'נשימה', 'מזרן'],
    years: 5,
    quote: 'חוזק אמיתי מתחיל מבפנים',
    img: '/DSC06906.jpg',
  },
  {
    name: 'קטרין גכטמן',
    role: 'מדריכת פילאטיס',
    bio: 'בוגרת תכניות הכשרה מקצועיות, מתמחה ביציבה ובשיפור איכות החיים.',
    specialties: ['יציבה', 'כאבי גב', 'שיקום'],
    years: 7,
    quote: 'הגוף זוכר כל תנועה',
    img: '/DSC07585.jpg',
  },
]

function PlusIcon({ open }) {
  return (
    <motion.div
      animate={{ rotate: open ? 45 : 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-8 h-8 md:w-9 md:h-9 rounded-full border flex items-center justify-center flex-shrink-0"
      style={{ borderColor: open ? 'rgba(146,166,180,0.7)' : 'rgba(255,255,255,0.3)' }}
    >
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
        stroke={open ? '#92a6b4' : 'white'} strokeWidth="1.5" strokeLinecap="round">
        <line x1="6.5" y1="1" x2="6.5" y2="12"/>
        <line x1="1" y1="6.5" x2="12" y2="6.5"/>
      </svg>
    </motion.div>
  )
}

function TeamCard({ member, index, sectionVisible }) {
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div
      className="relative overflow-hidden rounded-xl md:rounded-2xl cursor-pointer select-none"
      style={{
        aspectRatio: '3 / 4',
        opacity:    sectionVisible ? 1 : 0,
        transform:  sectionVisible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${index * 0.12}s, transform 0.7s ease ${index * 0.12}s`,
      }}
      onMouseEnter={() => !isMobile && setOpen(true)}
      onMouseLeave={() => !isMobile && setOpen(false)}
      onClick={() => isMobile && setOpen(o => !o)}
    >
      {/* Photo */}
      <motion.img
        src={member.img}
        alt={member.name}
        className="absolute inset-0 w-full h-full object-cover object-top"
        animate={{ scale: open ? 1.06 : 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Hover/open overlay only — no base fade */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.72) 50%, rgba(0,0,0,0.60) 100%)' }}
      />

      {/* Bottom content — RTL for Hebrew text */}
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5" dir="rtl">

        {/* Bio — slides up when open */}
        <motion.div
          animate={{ opacity: open ? 1 : 0, y: open ? 0 : 16 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 overflow-hidden"
          style={{ pointerEvents: open ? 'auto' : 'none' }}
        >
          <p className="text-[13px] md:text-[14px] font-light leading-[1.85] text-white mb-3">
            {member.bio}
          </p>
          <p className="text-[10px] font-light italic text-white mt-3 leading-[1.6]">
            "{member.quote}"
          </p>
        </motion.div>

        {/* Name row */}
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h3
              className="font-medium text-white uppercase tracking-[0.05em] leading-tight truncate"
              style={{ fontSize: 'clamp(16px, 1.45vw, 18px)' }}
            >
              {member.name}
            </h3>
          </div>
          <PlusIcon open={open} />
        </div>

      </div>
    </div>
  )
}

export default function Team() {
  const [visible, setVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.01 }
    )
    if (ref.current) io.observe(ref.current)
    const t = setTimeout(() => setVisible(true), 800)
    return () => { io.disconnect(); clearTimeout(t) }
  }, [])

  return (
    <section id="team" ref={ref} className="bg-[#111] min-h-[calc(100svh-92px)] md:min-h-0 pt-9 md:pt-12 pb-16 md:pb-24 px-4 md:px-10 overflow-hidden">
      <div className="max-w-[1320px] mx-auto">

        <motion.header
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block">
            <h2
              className="font-light tracking-[-0.02em] text-cream mb-4"
              style={{ fontSize: 'clamp(24px, 4vw, 40px)' }}
            >
              הצוות שלנו
            </h2>
            <motion.div
              className="h-[3px] bg-[#92a6b4] mb-5 origin-right"
              style={{ width: '100%' }}
              initial={{ scaleX: 0 }}
              animate={visible ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
          <motion.p
            className="text-[#92a6b4] mb-5 font-normal"
            style={{ fontSize: 'clamp(16px, 1.45vw, 18px)' }}
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            תכירו את המדריכות המקצועיות והמסורות שלנו, שיודעות להעניק יחס אישי לכל מתאמנת וללוות אותה בדרך האישית שלה באימוני הפילאטיס.
          </motion.p>
        </motion.header>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 md:gap-3">
          {members.map((m, i) => (
            <TeamCard key={m.name} member={m} index={i} sectionVisible={visible} />
          ))}
        </div>

      </div>
    </section>
  )
}
