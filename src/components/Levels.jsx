import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.25, 0.1, 0.25, 1]

const PILATES_LEVELS = [
  {
    level: 'רמה 1',
    description: 'היכרות עם יסודות התנועה והפילאטיס.'
  },
  {
    level: 'רמה 2',
    description: 'עבודה דינמית ומדויקת למתאמנות עם ניסיון.'
  },
  {
    level: 'גיל שלישי',
    description: 'תנועה בטוחה ומותאמת לשיפור איכות החיים.'
  }
]

const CONCEPT_CLASSES = [
  {
    title: 'SCULPT',
    badge: 'חדש',
    description: 'פילאטיס, כוח ועבודה פונקציונלית לאימון מלא ומאתגר.',
  },
  {
    title: 'BARRE',
    badge: 'חדש',
    description: 'פילאטיס וריקוד בקצב מוזיקה לחיטוב, יציבה וגמישות.',
  }
]

export default function Levels() {
  const headerRef = useRef(null)
  const cardsRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-8%' })
  const cardsInView = useInView(cardsRef, { once: true, margin: '0px' })

  return (
    <section
      id="levels"
      className="relative overflow-hidden py-12 md:py-16 px-6 md:px-10"
      style={{ backgroundColor: '#f0ece4' }}
      dir="rtl"
    >
      <div className="relative max-w-[1200px] mx-auto">

        {/* ── HEADER ── */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <motion.h2
            className="font-bold text-[#1a1a1a] tracking-[-0.02em] leading-none mb-3"
            style={{ fontSize: 'clamp(32px, 4vw, 44px)' }}
            initial={{ opacity: 0, y: 18 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
          >
            השיעורים בסטודיו
          </motion.h2>

          <motion.div
            className="h-[2px] w-12 mx-auto mb-6"
            style={{ background: '#92a6b4' }}
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          />

          <motion.p
            className="font-normal leading-[1.7] max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(15px, 1.2vw, 17px)', color: '#1a1a1a' }}
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            בסטודיו תמצאי מגוון שיעורים שמאפשרים לך להתאמן, להתחזק ולגוון בהתאם לרמה, למטרות ולסגנון שלך.
          </motion.p>
        </div>

        {/* ── CARDS CONTAINER ── */}
        <div ref={cardsRef} className="flex flex-col gap-8 md:gap-10">

          {/* ── MAIN PILATES CARD ── */}
          {headerInView && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0, ease: EASE }}
              className="hidden md:block"
              style={{
                borderRadius: '32px',
                background: '#ffffff',
                border: '1px solid rgba(160, 148, 134, 0.18)',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
                overflow: 'hidden'
              }}
            >
              <div className="flex items-stretch min-h-[480px]">

                {/* LEFT: IMAGE */}
                <div className="flex-1 relative overflow-hidden" style={{ flexBasis: '50%' }}>
                  <img
                    src="/DSC07363-1280.jpg"
                    alt="פילאטיס מכשירים"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.02) 100%)'
                    }}
                  />
                </div>

                {/* RIGHT: CONTENT */}
                <div className="flex-1 p-10 flex flex-col justify-between text-right" style={{ flexBasis: '50%' }}>

                  {/* EYEBROW */}
                  <div>
                    <p
                      className="font-bold uppercase tracking-widest mb-2"
                      style={{ fontSize: '11px', letterSpacing: '0.08em', color: '#92a6b4' }}
                    >
                      PILATES
                    </p>

                    {/* TITLE */}
                    <h3
                      className="font-bold text-[#1a1a1a] mb-3 leading-tight"
                      style={{ fontSize: 'clamp(28px, 3vw, 36px)', letterSpacing: '-0.02em' }}
                    >
                      פילאטיס מכשירים
                    </h3>

                    {/* SUBTITLE */}
                    <p
                      className="font-normal mb-8"
                      style={{ fontSize: '16px', color: '#1a1a1a', opacity: 0.72 }}
                    >
                      דיוק, שליטה והתקדמות בהתאם לרמה שלך.
                    </p>
                  </div>

                  {/* LEVELS GRID */}
                  <div className="grid grid-cols-1 gap-4 mb-8">
                    {PILATES_LEVELS.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-lg"
                        style={{
                          background: 'rgba(146, 166, 180, 0.08)',
                          border: '1px solid rgba(146, 166, 180, 0.15)'
                        }}
                      >
                        <h4
                          className="font-bold text-[#1a1a1a] mb-1"
                          style={{ fontSize: '14px' }}
                        >
                          {item.level}
                        </h4>
                        <p
                          className="font-normal"
                          style={{ fontSize: '13px', color: '#1a1a1a', opacity: 0.65, lineHeight: '1.5' }}
                        >
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href="#contact"
                    onClick={e => {
                      e.preventDefault()
                      document.dispatchEvent(new CustomEvent('openContactSheet'))
                    }}
                    className="inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap tracking-normal group w-full"
                    style={{
                      borderRadius: '900px',
                      color: '#ffffff',
                      backgroundColor: '#92a6b4',
                      fontSize: 'var(--t-nav)',
                      boxShadow: '0 2px 12px rgba(146, 166, 180, 0.2)',
                      transition: 'all 420ms',
                      padding: '12px 20px',
                      textDecoration: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#7a95a5'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#92a6b4'
                    }}
                  >
                    <span>לכל שיעורי הפילאטיס</span>
                    <span>←</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── CONCEPT CLASSES (SCULPT & BARRE) ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {CONCEPT_CLASSES.map((concept, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15 + idx * 0.1, ease: EASE }}
                className="hidden md:flex flex-col"
                style={{
                  borderRadius: '32px',
                  background: '#ffffff',
                  border: '1px solid rgba(160, 148, 134, 0.18)',
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
                  overflow: 'hidden'
                }}
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden h-64 w-full">
                  <img
                    src={idx === 0 ? '/DSC07194.jpg' : '/DSC07363-1280.jpg'}
                    alt={concept.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.02) 100%)'
                    }}
                  />
                  {concept.badge && (
                    <div
                      className="absolute top-4 right-4 font-bold text-white"
                      style={{
                        fontSize: '11px',
                        backgroundColor: '#92a6b4',
                        padding: '4px 10px',
                        borderRadius: '4px',
                      }}
                    >
                      {concept.badge}
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-8 flex flex-col justify-between flex-1 text-right">
                  {/* TITLE */}
                  <div className="mb-6">
                    <h3
                      className="font-bold text-[#1a1a1a] leading-tight mb-3"
                      style={{ fontSize: 'clamp(24px, 2.5vw, 32px)', letterSpacing: '-0.02em' }}
                    >
                      {concept.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p
                      className="font-normal"
                      style={{ fontSize: '15px', color: '#1a1a1a', opacity: 0.72, lineHeight: '1.6' }}
                    >
                      {concept.description}
                    </p>
                  </div>

                  {/* CTA */}
                  <a
                    href="#contact"
                    onClick={e => {
                      e.preventDefault()
                      document.dispatchEvent(new CustomEvent('openContactSheet'))
                    }}
                    className="inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap tracking-normal group self-start"
                    style={{
                      borderRadius: '900px',
                      color: '#ffffff',
                      backgroundColor: '#92a6b4',
                      fontSize: 'var(--t-nav)',
                      boxShadow: '0 2px 12px rgba(146, 166, 180, 0.2)',
                      transition: 'all 420ms',
                      padding: '10px 16px',
                      textDecoration: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#7a95a5'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#92a6b4'
                    }}
                  >
                    <span>לפרטים על השיעור</span>
                    <span>←</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── MOBILE: SIMPLIFIED LAYOUT ── */}
          <div className="md:hidden flex flex-col gap-6">
            {/* PILATES CARD */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE }}
              style={{
                borderRadius: '24px',
                background: '#ffffff',
                border: '1px solid rgba(160, 148, 134, 0.18)',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
                overflow: 'hidden'
              }}
            >
              <img
                src="/DSC07363-1280.jpg"
                alt="פילאטיס"
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-6 text-right">
                <p style={{ fontSize: '11px', letterSpacing: '0.08em', color: '#92a6b4', fontWeight: 'bold', marginBottom: '8px', textTransform: 'uppercase' }}>
                  PILATES
                </p>
                <h3 className="font-bold text-[#1a1a1a] mb-2" style={{ fontSize: '24px' }}>
                  פילאטיס מכשירים
                </h3>
                <p className="font-normal mb-4" style={{ fontSize: '14px', color: '#1a1a1a', opacity: 0.72, marginBottom: '12px' }}>
                  דיוק, שליטה והתקדמות בהתאם לרמה שלך.
                </p>
                <div className="flex flex-col gap-3 mb-6">
                  {PILATES_LEVELS.map((item, idx) => (
                    <div key={idx} className="text-right">
                      <p className="font-bold text-[#1a1a1a]" style={{ fontSize: '13px' }}>
                        {item.level}
                      </p>
                      <p style={{ fontSize: '12px', color: '#1a1a1a', opacity: 0.65 }}>
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CONCEPT CLASSES */}
            {CONCEPT_CLASSES.map((concept, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 + idx * 0.08, ease: EASE }}
                style={{
                  borderRadius: '24px',
                  background: '#ffffff',
                  border: '1px solid rgba(160, 148, 134, 0.18)',
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
                  overflow: 'hidden'
                }}
              >
                <div className="relative">
                  <img
                    src={idx === 0 ? '/DSC07194.jpg' : '/DSC07363-1280.jpg'}
                    alt={concept.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  {concept.badge && (
                    <div
                      className="absolute top-3 right-3 font-bold text-white"
                      style={{
                        fontSize: '11px',
                        backgroundColor: '#92a6b4',
                        padding: '3px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      {concept.badge}
                    </div>
                  )}
                </div>
                <div className="p-6 text-right">
                  <h3 className="font-bold text-[#1a1a1a] mb-2" style={{ fontSize: '22px' }}>
                    {concept.title}
                  </h3>
                  <p className="font-normal" style={{ fontSize: '14px', color: '#1a1a1a', opacity: 0.72, lineHeight: '1.6' }}>
                    {concept.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
