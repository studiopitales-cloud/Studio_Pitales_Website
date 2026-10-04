const TextImage = ({ title, text, image, fullHeight = false }) => {
  return (
    <section
      style={{
        padding: fullHeight ? '0' : 'clamp(50px, 10vw, 80px) 20px',
        background: '#FDF7F3',
        minHeight: fullHeight ? '100vh' : 'auto',
        display: fullHeight ? 'flex' : 'block',
        alignItems: fullHeight ? 'center' : 'stretch',
      }}
    >
      <div
        style={{
          maxWidth: fullHeight ? '100%' : '1140px',
          margin: fullHeight ? '0' : '0 auto',
          display: 'grid',
          gridTemplateColumns: fullHeight ? '1fr 1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: fullHeight ? '0' : '40px',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* RTL: טקסט בצד ימין, תמונה בצד שמאל */}
        <div style={{ order: fullHeight ? 2 : 2, padding: fullHeight ? '60px 60px 60px 80px' : '0' }}>
          <h2
            style={{
              fontSize: fullHeight ? 'clamp(40px, 4vw, 52px)' : 'clamp(26px, 3vw, 36px)',
              fontWeight: 700,
              color: '#000',
              margin: '0 0 20px 0',
              lineHeight: 1,
              textAlign: 'right',
            }}
          >
            {Array.isArray(title) ? (
              <>
                {title[0]}
                <br />
                {title[1]}
              </>
            ) : (
              title
            )}
          </h2>
          <p
            style={{
              fontSize: fullHeight ? '18px' : '18px',
              color: '#000',
              lineHeight: 1.6,
              margin: 0,
              textAlign: 'right',
            }}
          >
            {text}
          </p>
        </div>

        {/* תמונה */}
        <div style={{ order: fullHeight ? 1 : 1, height: fullHeight ? '100%' : 'auto' }}>
          <img
            src={image}
            alt="תמונה"
            loading="lazy"
            style={{
              width: '100%',
              height: fullHeight ? '100%' : 'auto',
              aspectRatio: fullHeight ? 'auto' : '1.4 / 1',
              objectFit: 'cover',
              borderRadius: fullHeight ? '0' : '32px',
              display: 'block',
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default TextImage
