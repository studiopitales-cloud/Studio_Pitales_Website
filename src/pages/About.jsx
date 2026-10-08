import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { smoothScrollTo } from '../utils/scroll'
import Navbar from '../components/Navbar'

const EASE = [0.16, 1, 0.3, 1]

const CHAPTER = {
  heading: 'הפילאטיס של טל',
  body: [
    'אני טל, מייסדת PITALES, מדריכת פילאטיס וכושר ובוגרת תואר ראשון בחינוך גופני (B.Ed.) עם התמחות בגיל השלישי. תנועה תמיד הייתה חלק בלתי נפרד מהחיים שלי.',
    'זה התחיל בריקוד והמשיך לעולם הכושר, שבו אני מדריכה כבר מעל עשור. בדרך הבנתי כמה סיפוק יש בלעזור לאנשים להתחבר לעצמם דרך תנועה, להתחזק ולהרגיש טוב יותר בגוף שלהם. ואז הגעתי לפילאטיס — ושם מצאתי את התשוקה האמיתית שלי.',
    'בפילאטיס מצאתי בדיוק את מה שחיפשתי בתנועה — שילוב בין דיוק, שליטה, כוח והקשבה לגוף. אהבתי את העובדה שאין כאן רק "לעשות אימון", אלא ללמוד את הגוף, להבין אותו ולהתקדם בצורה חכמה ומדויקת יותר משיעור לשיעור.',
    'עם השנים למדתי שהתמדה בספורט מתחילה במקום שרואה אותך באמת — מקום שכיף להגיע אליו, שמרגישים בו בנוח ושבאמת אכפת בו מההתקדמות שלך.',
    'מתוך המקום הזה הקמתי את PITALES: סטודיו שבו כל שיעור נבנה בקפידה, כל מדריכה נבחרת בפינצטה, וכל מתאמנת מקבלת יחס אישי אמיתי.',
    'כי מבחינתי, ההתקדמות שלך היא גם ההצלחה שלי.',
  ],
  img:    '/DSC07363-1280.jpg',
  srcSet: '/DSC07363-480.jpg 480w, /DSC07363-800.jpg 800w, /DSC07363-1280.jpg 1280w',
}

function StudioStory() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div
      className="relative flex items-center overflow-hidden md:bg-no-repeat"
      style={{
        backgroundColor: '#f0ece4',
        height: isMobile ? 'calc(100lvh - var(--navbar-h))' : 'auto',
        paddingTop: isMobile ? '0' : 'clamp(120px, 15vw, 220px)',
        paddingBottom: isMobile ? '0' : 'clamp(30px, 8vw, 130px)',
        backgroundImage: isMobile ? `url('${CHAPTER.img}')` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: isMobile ? 'rgba(0, 0, 0, 0.5)' : 'radial-gradient(ellipse 55% 50% at 25% 55%, rgba(146,166,180,0.12) 0%, transparent 62%)' }}
      />

      <motion.div
        style={{ gridTemplateColumns: isMobile ? '1fr' : '9fr 11fr', height: 'auto', minHeight: '500px' }}
        className="relative w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 md:items-center"
      >

        {/* ── LEFT column: text content ── */}
        <motion.div
          className="relative flex flex-col justify-center text-right"
          style={{ marginLeft: isMobile ? '20px' : '55px', marginRight: isMobile ? '20px' : '55px', order: isMobile ? -1 : 0 }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
            <div style={{ width: '5px', height: isMobile ? '0px' : '47px', backgroundColor: '#92a6b4', flexShrink: 0 }} />
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: isMobile ? '#f0ece4' : '#000000', lineHeight: '1.3', margin: 0, flex: 1 }}>
              {CHAPTER.heading}
            </h2>
          </div>
          {CHAPTER.body.map((para, i) => (
            <p key={i} style={{ fontSize: '18px', fontWeight: 'normal', color: isMobile ? '#f0ece4' : '#000000', lineHeight: '1.6', marginBottom: i < CHAPTER.body.length - 1 ? '16px' : '24px' }}>
              {para}
            </p>
          ))}
        </motion.div>

        {/* ── RIGHT column: image ── */}
        <div className="relative hidden md:flex md:items-center md:justify-center" style={{ marginLeft: '55px' }}>
          <img
            src={CHAPTER.img}
            srcSet={CHAPTER.srcSet}
            sizes="50vw"
            alt={CHAPTER.heading}
            loading="lazy"
            className="w-full h-full object-cover"
            style={{ maxHeight: '100%', maxWidth: '100%', borderRadius: '32px' }}
          />
        </div>

      </motion.div>
    </div>
  )
}

export default function About() {
  return (
    <>
      <Navbar forceScrolled />
      <StudioStory />
    </>
  )
}
