const Hero = ({ bgImage, title, subtitle, ctaText, ctaHref }) => {
  return (
    <section
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${bgImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        minHeight: 'clamp(390px, 65vh, 600px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FAEFE6',
      }}
    >
      <div style={{ maxWidth: '1140px', padding: '0 20px', width: '100%' }}>
        <h1
          style={{
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 700,
            margin: '0 0 20px 0',
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: '22px',
            fontWeight: 700,
            maxWidth: '780px',
            margin: '0 auto 32px auto',
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </p>
        <a
          href={ctaHref}
          style={{
            display: 'inline-block',
            background: '#FAEFE6',
            color: '#6C715D',
            padding: '14px 32px',
            borderRadius: '999px',
            fontSize: '18px',
            fontWeight: 600,
            textDecoration: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
          onMouseEnter={(e) => {
            e.target.style.opacity = '0.85'
            e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)'
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = '1'
            e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          {ctaText}
        </a>
      </div>
    </section>
  )
}

export default Hero
