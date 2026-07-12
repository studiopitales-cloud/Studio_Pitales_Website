import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { trackClickInstagram } from '../utils/googleAnalytics'

export default function Instagram() {
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true, margin: '-8%' })

  useEffect(() => {
    if (document.querySelector('script[src="https://w.behold.so/widget.js"]')) return
    const s = document.createElement('script')
    s.type = 'module'
    s.src = 'https://w.behold.so/widget.js'
    document.head.append(s)
  }, [])

  return (
    <section id="instagram" className="overflow-hidden">

      <div className="bg-[#111] pt-5 md:pt-4 pb-0">
      <div className="max-w-[1100px] md:max-w-none mx-auto px-0">

        <div ref={headerRef} className="text-center mb-4">
          <div className="inline-block">
            <motion.h2
              className="font-bold tracking-[-0.02em] text-white leading-none"
              style={{ fontSize: 'var(--t-3xl)' }}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              עקבי אחרינו
            </motion.h2>
            <motion.div
              className="h-[3px] bg-[#92a6b4] mt-3 mb-0 origin-right"
              style={{ width: '100%' }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
        </div>

        <p
          className="text-[#92a6b4] font-normal text-center px-8 pb-6 md:pb-7"
          style={{ fontSize: 'var(--fs-body)' }}
          dir="rtl"
        >
          אווירה, רגעים אמיתיים ועוד המון תוכן מהסטודיו מחכים לך <a href="https://www.instagram.com/tal_pitales/" target="_blank" rel="noopener noreferrer" onClick={trackClickInstagram} className="hover:opacity-75 transition-opacity">באינסטגרם שלנו</a>.
        </p>

        <div className="md:[&>behold-widget]:m-0 bg-[#111]" style={{ overflow: 'hidden' }}>
          <behold-widget feed-id="h0wfi6rXRMyQtVDfTEcI" style={{ display: 'block', margin: 0, padding: 0 }} />
        </div>

      </div>
      </div>

    </section>
  )
}
