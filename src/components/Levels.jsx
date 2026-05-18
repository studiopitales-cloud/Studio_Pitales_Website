import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const EASE = [0.25, 0.1, 0.25, 1]
const SLOW = { duration: 0.62, ease: EASE }

const LEVELS = [
  {
    title: 'רמה 1',
    preview: 'היכרות עם יסודות התנועה והפילאטיס',
    body: [
      'מתאים למי שמתחילה את הדרך בפילאטיס מכשירים, וגם למי שחוזרת לאחר הפסקה.',
      'בשיעורים נלמד את עקרונות השיטה ונתמקד בתרגילי הבסיס מהרפרטואר הקלאסי — תוך חיזוק הגוף, שיפור הגמישות ופיתוח קואורדינציה ושליטה בתנועה.',
    ],
  },
  {
    title: 'רמה 2',
    preview: 'עבודה דינמית ומדויקת למתאמנות ממשיכות',
    body: [
      'מיועד למתאמנות שכבר מכירות את השיטה ושולטות בתרגילי הבסיס.',
      'השיעורים משלבים עבודה דינמית, עם דגש על חיזוק ושיפור הגמישות. במהלך האימון אנחנו מעמיקות את היציבות והקואורדינציה, תוך שמירה על תנועה נכונה ומודעות לגוף.',
    ],
  },
  {
    title: 'גיל שלישי',
    subtitle: 'תנועה בטוחה ומותאמת אישית',
    body: [
      'אימונים מותאמים לגיל השלישי, עם דגש על תנועה בטוחה ושיפור איכות החיים.',
      'השיעורים משלבים עבודה עדינה ומדויקת לחיזוק השרירים, שיפור היציבה, שיווי המשקל והגמישות — תוך התאמה אישית לקצב וליכולת של כל מתאמנת.',
    ],
  },
]

/* Minimal plus → minus indicator */
function PlusIndicator({ open }) {
  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: 20, height: 20 }}
    >
      {/* Horizontal arm — always visible */}
      <span
        className="absolute top-1/2 left-0 block w-full"
        style={{
          height: 1.8,
          background: 'rgba(26,26,26,0.82)',
          transform: 'translateY(-50%)',
        }}
      />
      {/* Vertical arm — fades when open */}
      <motion.span
        className="absolute left-1/2 top-0 block h-full"
        style={{
          width: 1.8,
          background: 'rgba(26,26,26,0.82)',
          transform: 'translateX(-50%)',
          originY: 0.5,
        }}
        animate={{ scaleY: open ? 0 : 1, opacity: open ? 0 : 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      />
    </div>
  )
}

function LevelCard({ level, index, isOpen, onToggle, visible }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.12, ease: EASE }}
      onClick={onToggle}
      className="cursor-pointer"
      style={{ borderRadius: 10, overflow: 'hidden' }}
    >
      <motion.div
        layout
        style={{
          borderRadius: 10,
          border: '1px solid rgba(160,148,134,0.22)',
          background: isOpen
            ? 'rgba(253,251,248,0.92)'
            : 'rgba(252,249,245,0.56)',
          transition: 'background 0.5s ease',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between gap-5 text-right"
          style={{ padding: 'clamp(16px, 2vw, 22px) clamp(20px, 3vw, 40px)' }}
        >
          {/* Text */}
          <div className="flex-1 min-w-0">
            <h3
              className="font-bold text-[#1a1a1a]"
              style={{
                fontSize: 'clamp(17px, 2vw, 24px)',
                letterSpacing: '-0.018em',
                lineHeight: 1.2,
              }}
            >
              {level.title}
            </h3>
            {level.subtitle && (
              <p
                className="font-bold mt-1"
                style={{ fontSize: 'clamp(12px, 1.2vw, 14px)', color: '#92a6b4', letterSpacing: '0.01em' }}
              >
                {level.subtitle}
              </p>
            )}
            {level.preview && (
              <p
                className="font-bold mt-1.5"
                style={{ fontSize: 'clamp(12px, 1.2vw, 14px)', color: '#92a6b4', letterSpacing: '0.01em' }}
              >
                {level.preview}
              </p>
            )}
          </div>

          <PlusIndicator open={isOpen} />
        </div>

        {/* Expanded body */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="body"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-right"
              style={{ padding: '0 clamp(20px, 3vw, 40px) clamp(20px, 2.5vw, 32px)' }}
            >
              <div
                style={{
                  borderTop: '1px solid rgba(160,148,134,0.18)',
                  paddingTop: 'clamp(16px, 2vw, 24px)',
                }}
              >
                <p
                  className="font-normal leading-[2.0]"
                  style={{ fontSize: 'clamp(16px, 1.45vw, 18px)', color: '#000000' }}
                >
                  {level.body.map((line, i) => (
                    <span key={i}>
                      {line}{i < level.body.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default function Levels() {
  const [openIndex, setOpenIndex] = useState(null)
  const headerRef = useRef(null)
  const cardsRef  = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-8%' })
  const cardsInView  = useInView(cardsRef,  { once: true, margin: '0px' })

  const toggle = (i) => setOpenIndex(prev => prev === i ? null : i)

  return (
    <section
      id="levels"
      className="relative overflow-hidden min-h-[calc(100svh-92px)] md:min-h-0 pt-6 md:pt-9 pb-10 md:pb-14 px-8 md:px-10"
      style={{ background: 'linear-gradient(170deg, #f0ece4 0%, #e6e2da 100%)' }}
    >
      {/* Ambient depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 45% at 50% 0%, rgba(146,166,180,0.06) 0%, transparent 65%)',
        }}
      />

      <div className="relative max-w-[820px] mx-auto">

        {/* ── Intro ── */}
        <div ref={headerRef} className="text-right md:text-center mb-7 md:mb-10">
          <div className="inline-block">
            <motion.h2
              className="text-[28px] md:text-[32px] font-bold text-[#1a1a1a] tracking-[-0.02em] leading-none"
              initial={{ opacity: 0, y: 18 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            >
              רמות אימון
            </motion.h2>

            <motion.div
              className="h-[3px] mt-3 mb-5 origin-right"
              style={{ background: '#92a6b4', width: '100%' }}
              initial={{ scaleX: 0 }}
              animate={headerInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.22 }}
            />
          </div>

          <motion.div
            className="flex flex-col gap-4 text-right"
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          >
            <p className="font-normal md:font-normal leading-[1.95]" style={{ fontSize: 'clamp(16px, 1.45vw, 18px)', color: '#1a1a1a' }}>
              השיעורים בסטודיו מוגדרים לפי רמות שונות.<br className="md:hidden" /> החל משיעורים למי שפוגשת לראשונה את עולם הפילאטיס, ועד למתאמנות שכבר מכירות את השיטה ובקיאות ברפרטואר התרגילים.
            </p>
            <p className="font-normal md:font-normal leading-[1.95]" style={{ fontSize: 'clamp(16px, 1.45vw, 18px)', color: '#1a1a1a' }}>
              באמצעות הרמות השונות, אנחנו יכולות להתאים עבורך את הדרך באימונים, כך שהבסיס החזק יאפשר לך להתפתח בהתאם לקצב וליכולות האישיות שלך.
            </p>
          </motion.div>
        </div>

        {/* ── Cards ── */}
        <div ref={cardsRef} className="flex flex-col gap-2 md:gap-2.5">
          {LEVELS.map((level, i) => (
            <LevelCard
              key={i}
              level={level}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
              visible={cardsInView}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
