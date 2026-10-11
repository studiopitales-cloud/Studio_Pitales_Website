import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

const EASE = [0.25, 0.1, 0.25, 1]

const PILATES_LEVELS = [
  {
    title: 'רמה 1',
    icon: '🌱',
    description: 'מיועד למתאמנות בתחילת הדרך בפילאטיס מכשירים, או למי שחוזרת לאחר הפסקה.',
    details: 'בשיעורים נלמד את עקרונות השיטה ונתמקד בתרגילי הבסיס מתוך הרפרטואר הקלאסי, תוך חיזוק הגוף, שיפור הגמישות, הקואורדינציה והשליטה בתנועה.',
    image: '/DSC06906-700.jpg',
  },
  {
    title: 'רמה 2',
    icon: '⚡',
    description: 'מיועד למתאמנות ממשיכות, שכבר מכירות את השיטה ושולטות בתרגילי הבסיס.',
    details: 'השיעורים דינמיים ומאתגרים יותר, ומשלבים תרגילים מתקדמים מתוך רפרטואר הפילאטיס, עם דגש על דיוק בתנועה, שליטה, קואורדינציה ומודעות תנועתית גבוהה.',
    image: '/DSC06963-700.jpg',
  },
  {
    title: 'גיל שלישי',
    icon: '🌿',
    description: 'מיועד למתאמנות בגיל השלישי, עם דגש על תנועה בטוחה ומותאמת ליכולת האישית.',
    details: 'באימונים נעבוד על חיזוק הגוף, שיפור היציבה, שיווי המשקל והגמישות, תוך התאמה לקצב ולצרכים של כל מתאמנת — במטרה לשמור על תפקוד, עצמאות ואיכות חיים.',
    image: '/DSC06999-700.jpg',
  },
]

const CONCEPT_CLASSES = [
  {
    title: 'SCULPT',
    badge: 'חדש',
    image: '/SCULPT-hires.jpg',
    body: [
      'אימון דינמי המשלב את עקרונות הפילאטיס עם תרגילי כוח ועבודה פונקציונלית.',
      'בשיעור נעבוד על חיזוק כל הגוף, שיפור הסיבולת, ועבודה על יציבות ושליטה בתנועה.',
      'מתאים למי שאוהבת אימון קצבי, מאתגר ומגוון, עם דגש על חיטוב ועיצוב הגוף.',
    ],
  },
  {
    title: 'BARRE',
    badge: 'חדש',
    image: '/BARRE-hires.jpg',
    body: [
      'אימון קצבי המשלב אלמנטים מעולמות הפילאטיס והריקוד, בהשראת הבלט.',
      'בשיעור נתמקד בחיזוק הרגליים, הישבן והליבה בתנועות מדויקות ורצפים דינמיים.',
      'מתאים למי שאוהבת תנועה וקצב, רוצה להעלות דופק וליהנות מאימון אנרגטי וסוחף.',
    ],
  },
]

function PilatesLevelCard({ level }) {
  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          [data-level-card="${level.title}"] {
            background-image: url('${level.image}');
            background-size: cover;
            background-position: center;
            background-color: transparent !important;
            border: none !important;
            padding: 20px 24px !important;
            gap: 12px;
            border-radius: 32px;
            position: relative;
            min-height: 250px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
          }
          [data-level-card="${level.title}"]::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.55);
            z-index: 1;
            border-radius: 32px;
          }
          [data-level-card="${level.title}"] h4,
          [data-level-card="${level.title}"] p {
            position: relative;
            z-index: 2;
          }
          [data-level-card="${level.title}"] h4 {
            margin-bottom: 0;
            color: #f0ece4 !important;
            font-size: clamp(22px, 2.5vw, 32px) !important;
          }
          [data-level-card="${level.title}"] p {
            font-size: 15px !important;
            line-height: 1.75 !important;
            opacity: 1 !important;
            color: #f0ece4 !important;
          }
          @media (min-width: 1536px) {
            [data-level-card="${level.title}"] p {
              font-size: 18px !important;
            }
          }
          @media (min-width: 1920px) {
            [data-level-card="${level.title}"] p {
              font-size: 22px !important;
            }
          }
        }
      `}</style>
      <div
        className="p-6 text-right flex flex-col items-start gap-3"
        data-level-card={level.title}
        style={{
          border: '1px solid rgba(160,148,134,0.18)',
          backgroundColor: 'rgba(252,249,245,0.7)',
          borderRadius: '32px',
        }}
      >
      <h4
        className="font-bold text-[#1a1a1a]"
        style={{ fontSize: 'var(--t-nav)' }}
      >
        <span className="hidden md:inline">{level.title}</span>
        <span className="inline md:hidden">פילאטיס מכשירים - {level.title}</span>
      </h4>
      <p
        className="font-normal leading-6"
        style={{
          fontSize: 'clamp(12px, 1.2vw, 14px)',
          color: '#1a1a1a',
          opacity: 0.65,
        }}
      >
        {level.description}
      </p>
      <p
        className="font-normal leading-6"
        style={{
          fontSize: 'clamp(12px, 1.2vw, 14px)',
          color: '#1a1a1a',
          opacity: 0.65,
        }}
      >
        {level.details}
      </p>
      </div>
    </>
  )
}

function ConceptCard({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          [data-concept-card="${item.title}"] {
            background-color: #92a6b4 !important;
          }
          ${item.title === 'BARRE' ? `
            @media (max-width: 767px) {
              [data-concept-card="BARRE"] {
                background-image: url('/BARRE-hires.jpg');
                background-size: cover;
                background-position: center;
                background-color: transparent !important;
                position: relative;
              }
              [data-concept-card="BARRE"]::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.55);
                z-index: 1;
              }
              [data-concept-card="BARRE"] > div {
                position: relative;
                z-index: 2;
              }
            }
          ` : ''}
          ${item.title === 'SCULPT' ? `
            @media (max-width: 767px) {
              [data-concept-card="SCULPT"] {
                background-image: url('/SCULPT-hires.jpg');
                background-size: cover;
                background-position: calc(50% + 10%) center;
                background-color: transparent !important;
                position: relative;
              }
              [data-concept-card="SCULPT"]::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.55);
                z-index: 1;
              }
              [data-concept-card="SCULPT"] > div {
                position: relative;
                z-index: 2;
              }
            }
          ` : ''}
          [data-concept-card="${item.title}"] h3 {
            color: #f0ece4;
          }
          ${item.title === 'SCULPT' || item.title === 'BARRE' ? `
            [data-concept-card="${item.title}"] [data-badge] {
              background-color: #92a6b4 !important;
              color: #f0ece4 !important;
            }
          ` : `
            [data-concept-card="${item.title}"] [data-badge] {
              background-color: #f0ece4 !important;
              color: #92a6b4 !important;
            }
          `}
          [data-concept-card="${item.title}"] [data-body-text] {
            color: #f0ece4;
          }
          [data-concept-card="${item.title}"] [data-cta-link] {
            color: #f0ece4;
          }
        }
      `}</style>
      <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: EASE }}
      className="overflow-hidden"
      data-concept-card={item.title}
      style={{
        border: '1px solid rgba(160,148,134,0.15)',
        backgroundColor: '#ffffff',
        borderRadius: '32px',
      }}
    >
      <div className="flex relative items-stretch" dir="rtl" style={{ maxHeight: '330px' }}>
        {/* Content - Right Side */}
        <div className="w-full md:w-1/2 px-6 py-5 flex flex-col justify-between text-right">
          <div>
            <div className="flex justify-between items-center gap-3 mb-4">
              <h3
                className="font-bold text-[#1a1a1a] text-right"
                style={{ fontSize: 'clamp(22px, 2.5vw, 32px)' }}
              >
                {item.title}
              </h3>
              <span
                className="font-bold text-white text-xs px-2 py-1"
                data-badge
                style={{
                  backgroundColor: '#92a6b4',
                  borderRadius: '4px',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.badge}
              </span>
            </div>
            <div
              className="font-normal text-black text-[15px] 2xl:text-[18px] 3xl:text-[22px] leading-[1.75]"
              data-body-text
            >
              {item.body.map((paragraph, idx) => (
                <p key={idx} style={{ marginBottom: '10px' }}>
                  {paragraph}
                </p>
              ))}
            </div>
            <Link
              to={item.title === 'SCULPT' ? '/blog/sculpt' : '/blog/barre'}
              className="inline-flex md:hidden items-center gap-2 font-medium text-[#1a1a1a] group cursor-pointer"
              data-cta-link
              style={{ fontSize: 'var(--t-nav)', paddingTop: '6px', paddingBottom: '7px' }}
            >
              <span className="group-hover:font-bold transition-all duration-200">לפרטים על השיעור</span>
              <span className="group-hover:font-bold transition-all duration-200 flex items-center justify-center" style={{ lineHeight: '1', height: '1em', marginTop: '-3px' }}>←</span>
            </Link>
          </div>

          <Link
            to={item.title === 'SCULPT' ? '/blog/sculpt' : '/blog/barre'}
            className="hidden md:inline-flex items-center gap-2 font-medium text-[#1a1a1a] group cursor-pointer"
            data-cta-link
            style={{ fontSize: 'var(--t-nav)', paddingBottom: '7px' }}
          >
            <span className="group-hover:font-bold transition-all duration-200">לפרטים על השיעור</span>
            <span className="group-hover:font-bold transition-all duration-200 flex items-center justify-center" style={{ lineHeight: '1', height: '1em', marginTop: '-3px' }}>←</span>
          </Link>
        </div>

        {/* Image - Left Side */}
        <div className="hidden md:block w-1/2 overflow-hidden" style={{ maxHeight: '100%' }}>
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </motion.div>
    </>
  )
}

function MainPilatesCard() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE }}
      className="overflow-hidden mb-8"
      style={{
        border: '1px solid rgba(160,148,134,0.15)',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        borderRadius: '32px',
      }}
    >
      {/* Desktop Layout: Image Left, Content Right */}
      <div className="hidden md:flex flex-row-reverse">
        {/* Image */}
        <div className="w-1/2 overflow-hidden" style={{ maxHeight: '400px' }}>
          <img
            src="/reformer-studio-hires.jpg"
            alt="פילאטיס מכשירים"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="w-1/2 flex flex-col justify-between text-right" style={{ padding: '20px 24px' }}>
          <div>
            <h2
              className="font-bold text-[#1a1a1a] mb-4 leading-tight"
              style={{ fontSize: 'clamp(22px, 2.5vw, 32px)' }}
            >
              פילאטיס מכשירים
            </h2>

            <p
              className="font-normal leading-6"
              style={{
                fontSize: 'clamp(13px, 1.2vw, 15px)',
                color: '#1a1a1a',
                marginBottom: '12px',
              }}
            >
              האימון מתבצע על הרפורמר, ובעזרת קפיצים והתנגדות משתנה מאפשר עבודה מדויקת ומבוקרת לחיזוק הגוף, שיפור היציבה, הגמישות, הקואורדינציה והשליטה בתנועה.
            </p>

            <p
              className="font-normal leading-6"
              style={{
                fontSize: 'clamp(13px, 1.2vw, 15px)',
                color: '#1a1a1a',
                marginBottom: '12px',
              }}
            >
              שיעורי הפילאטיס הם הלב הפועם של הסטודיו. הם מחולקים לרמות, כך שכל מתאמנת יכולה להתאמן בהתאם לנסיון, ליכולת ולמטרות שלה.
            </p>

            <p
              className="font-normal leading-6"
              style={{
                fontSize: 'clamp(13px, 1.2vw, 15px)',
                color: '#1a1a1a',
                marginBottom: '12px',
              }}
            >
              <strong>רמה 1</strong> – מתאים למתאמנות מתחילות או חוזרות לתנועה שצריכות לחזק את הגוף מהבסיס ולצבור ביטחון על הרפורמר.
            </p>

            <p
              className="font-normal leading-6"
              style={{
                fontSize: 'clamp(13px, 1.2vw, 15px)',
                color: '#1a1a1a',
                marginBottom: '12px',
              }}
            >
              <strong>רמה 2</strong> – מתאים למתאמנות עם בסיס תנועתי שכבר שולטות בתרגילי הבסיס ורוצות להעמיק בשיטה ולאתגר את הגוף.
            </p>

            <p
              className="font-normal leading-6"
              style={{
                fontSize: 'clamp(13px, 1.2vw, 15px)',
                color: '#1a1a1a',
              }}
            >
              <strong>גיל שלישי</strong> – מתאים למתאמנות שמחפשות אימון בטוח ומותאם לקצב שלהן, עם דגש על חיזוק, יציבה, שיווי משקל וגמישות, לשמירה על תפקוד יומיומי ואיכות חיים.
            </p>

            {/* Inner Level Cards */}
            <div className="grid grid-cols-1 gap-4 mb-8 hidden">
              {PILATES_LEVELS.map((level, idx) => (
                <PilatesLevelCard key={idx} level={level} />
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          [data-main-pilates-mobile] p {
            font-size: 15px;
            line-height: 1.75;
          }
          @media (min-width: 1536px) {
            [data-main-pilates-mobile] p {
              font-size: 18px;
            }
          }
          @media (min-width: 1920px) {
            [data-main-pilates-mobile] p {
              font-size: 22px;
            }
          }
        }
      `}</style>
      {/* Mobile Layout */}
      <div className="md:hidden relative" style={{ height: 'auto', backgroundImage: 'url(/reformer-studio-hires.jpg)', backgroundSize: 'cover', backgroundPosition: 'calc(50% + 10%) center', borderRadius: '32px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.55)', zIndex: 1 }}></div>

        {/* Content */}
        <div className="text-right relative z-10" style={{ padding: '20px 24px', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }} dir="rtl">
          <h2
            className="font-bold mb-4 leading-tight"
            style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', color: '#f0ece4' }}
          >
            פילאטיס מכשירים
          </h2>

<p
            className="font-normal leading-[1.75]"
            style={{
              fontSize: '15px',
              color: '#f0ece4',
              marginBottom: '16px',
            }}
          >
            האימון מתבצע על הרפורמר, ובעזרת קפיצים והתנגדות משתנה מאפשר עבודה מדויקת ומבוקרת לחיזוק הגוף, שיפור היציבה, הגמישות, הקואורדינציה והשליטה בתנועה.
          </p>

          <p
            className="font-normal leading-[1.75]"
            style={{
              fontSize: '15px',
              color: '#f0ece4',
              marginBottom: '16px',
            }}
          >
            שיעורי הפילאטיס הם הלב הפועם של הסטודיו. הם מחולקים לרמות, כך שכל מתאמנת יכולה להתאמן בהתאם לנסיון, ליכולת ולמטרות שלה.
          </p>

          <p
            className="font-normal leading-[1.75]"
            style={{
              fontSize: '15px',
              color: '#f0ece4',
              marginBottom: '16px',
            }}
          >
            <strong>רמה 1</strong> – מתאים למתאמנות מתחילות או חוזרות לתנועה שצריכות לחזק את הגוף מהבסיס ולצבור ביטחון על הרפורמר.
          </p>

          <p
            className="font-normal leading-[1.75]"
            style={{
              fontSize: '15px',
              color: '#f0ece4',
              marginBottom: '16px',
            }}
          >
            <strong>רמה 2</strong> – מתאים למתאמנות עם בסיס תנועתי שכבר שולטות בתרגילי הבסיס ורוצות להעמיק בשיטה ולאתגר את הגוף.
          </p>

          <p
            className="font-normal leading-[1.75]"
            style={{
              fontSize: '15px',
              color: '#f0ece4',
            }}
          >
            <strong>גיל שלישי</strong> – מתאים למתאמנות שמחפשות אימון בטוח ומותאם לקצב שלהן, עם דגש על חיזוק, יציבה, שיווי משקל וגמישות, לשמירה על תפקוד יומיומי ואיכות חיים.
          </p>

        </div>
      </div>
    </motion.div>
  )
}

export default function Levels() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-8%' })

  return (
    <section
      id="levels"
      className="relative overflow-hidden md:py-14 pb-10 md:pb-16 pt-12 md:pt-0 md:mt-[48px]"
      style={{
        backgroundColor: '#f0ece4',
        paddingLeft: 'clamp(20px, 5.625vw, 55px)',
        paddingRight: 'clamp(20px, 5.625vw, 55px)',
      }}
    >
      <div className="relative max-w-[1200px] mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 md:mb-10">
          <div className="inline-block">
            <motion.h2
              className="font-bold text-[#1a1a1a] tracking-[-0.02em] leading-none"
              style={{ fontSize: 'var(--t-3xl)' }}
              initial={{ opacity: 0, y: 18 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
            >
              השיעורים בסטודיו
            </motion.h2>
            <motion.div
              className="h-[3px] bg-[#92a6b4] mt-3 origin-right"
              style={{ width: '100%' }}
              initial={{ scaleX: 0 }}
              animate={headerInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            />
          </div>
        </div>

        {/* Main Pilates Card */}
        <MainPilatesCard />

{/* Concept Cards */}
        <div className="space-y-6">
          {CONCEPT_CLASSES.map((item, idx) => (
            <ConceptCard key={item.title} item={item} index={idx} />
          ))}
        </div>

      </div>
    </section>
  )
}
