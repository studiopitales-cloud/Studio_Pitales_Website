import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

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
    <section id="instagram" className="bg-[#f0ece4] pt-6 md:pt-9 pb-6 md:pb-9 overflow-hidden">
      <div className="max-w-[1100px] md:max-w-none mx-auto px-0">

        <div ref={headerRef} className="text-center mb-6 md:mb-9">
          <div className="inline-block">
            <motion.h2
              className="text-[28px] md:text-[32px] font-light tracking-[-0.02em] text-[#1a1a1a] leading-none"
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

        <div className="md:[&>behold-widget]:m-0" style={{ overflow: 'hidden' }}>
        <behold-widget feed-id="h0wfi6rXRMyQtVDfTEcI" style={{ display: 'block', margin: 0, padding: 0 }} />
      </div>

      </div>
    </section>
  )
}
