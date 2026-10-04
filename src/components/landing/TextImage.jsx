const TextImage = ({ title, text, image, fullHeight = false }) => {
  const isFullscreen = fullHeight && typeof window !== 'undefined'

  return (
    <section
      style={{
        padding: isFullscreen ? '0' : 'clamp(50px, 10vw, 80px) 20px',
        background: '#FDF7F3',
        height: isFullscreen ? '100vh' : 'auto',
        display: isFullscreen ? 'flex' : 'block',
        alignItems: isFullscreen ? 'center' : 'stretch',
      }}
      className={isFullscreen ? 'fullscreen-section' : ''}
    >
      <style>{`
        @media (max-width: 767px) {
          .fullscreen-section {
            min-height: auto !important;
            display: block !important;
          }
        }
      `}</style>
      <div
        style={{
          maxWidth: isFullscreen ? '100%' : '1140px',
          margin: isFullscreen ? '0' : '0 auto',
          display: 'grid',
          gridTemplateColumns: isFullscreen ? '1fr 1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: isFullscreen ? '0' : '40px',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* RTL: טקסט בצד ימין, תמונה בצד שמאל */}
        <div style={{
          order: isFullscreen ? 2 : 2,
          padding: isFullscreen ? '0 80px' : '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ maxWidth: '500px' }}>
            <h2
              style={{
                fontSize: isFullscreen ? '40px' : 'clamp(26px, 3vw, 36px)',
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
                fontSize: isFullscreen ? '18px' : '18px',
                color: '#000',
                lineHeight: 1.6,
                margin: 0,
                textAlign: 'right',
              }}
            >
              {text}
            </p>
          </div>
        </div>

        {/* תמונה */}
        <div style={{
          order: isFullscreen ? 1 : 1,
          height: isFullscreen ? '100%' : 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isFullscreen ? '100px' : '0',
        }}>
          <img
            src={image}
            alt="תמונה"
            loading="lazy"
            style={{
              width: '100%',
              height: isFullscreen ? 'auto' : 'auto',
              maxHeight: isFullscreen ? 'calc(100vh - 200px)' : 'auto',
              aspectRatio: isFullscreen ? '1 / 1' : '1.4 / 1',
              objectFit: 'cover',
              borderRadius: '32px',
              display: 'block',
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default TextImage
