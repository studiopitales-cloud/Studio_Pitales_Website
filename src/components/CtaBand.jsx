export default function CtaBand() {
  return (
    <section id="join" className="relative bg-brand-dark py-28 px-8 text-center overflow-hidden">
      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '300px 300px',
        }}
      />
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle 500px at 75% 50%, rgba(146,166,180,0.10) 0%, transparent 70%)' }}
      />
      {/* Ghost icon */}
      <img
        src="/brand_assets/tal_Icon_.svg"
        alt=""
        aria-hidden="true"
        className="absolute -left-28 top-1/2 -translate-y-1/2 w-[420px] h-[420px] opacity-[0.04] pointer-events-none"
        style={{ filter: 'brightness(0) invert(0.6)' }}
      />

      <div className="relative z-10 max-w-[560px] mx-auto">
        <p className="text-[10px] tracking-[0.4em] text-blue-gray uppercase mb-5">הצטרפי אלינו</p>
        <h2
          className="font-light leading-[1.0] tracking-[-0.03em] text-cream mb-6"
          style={{ fontSize: 'clamp(42px, 5vw, 64px)' }}
        >
          הצטרפו<br />לקלאב
        </h2>
        <p className="text-[16px] font-light leading-[1.85] text-cream/55 mb-12">
          מנויות חודשיות, שיעורי ניסיון ומסלולים מותאמים אישית —<br />
          מוזמנות לבוא להכיר אותנו.
        </p>
        <a
          href="#contact"
          onClick={e => {
            const el = document.querySelector('#contact')
            if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }) }
          }}
          className="inline-block bg-blue-gray text-brand-dark text-[12px] tracking-[0.2em] font-semibold uppercase px-14 py-4 hover:bg-cream transition-colors duration-300"
        >
          הצטרפו עכשיו
        </a>
      </div>
    </section>
  )
}
