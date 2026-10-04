const TextImage = ({ title, text, image, fullHeight = false }) => {
  const isFullHeightDesktop = typeof window !== 'undefined' && window.innerWidth >= 768 && fullHeight

  return (
    <section
      style={{
        padding: isFullHeightDesktop ? '0' : 'clamp(50px, 10vw, 80px) 20px',
        background: '#FDF7F3',
        minHeight: isFullHeightDesktop ? '100vh' : 'auto',
        display: isFullHeightDesktop ? 'flex' : 'block',
        alignItems: isFullHeightDesktop ? 'center' : 'stretch',
      }}
    >
      <div
        style={{
          maxWidth: isFullHeightDesktop ? '100%' : '1140px',
          margin: isFullHeightDesktop ? '0' : '0 auto',
          display: 'grid',
          gridTemplateColumns: isFullHeightDesktop ? '1fr 1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: isFullHeightDesktop ? '0' : '40px',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* RTL: טקסט בצד ימין, תמונה בצד שמאל */}
        <div style={{
          order: isFullHeightDesktop ? 2 : 2,
          padding: isFullHeightDesktop ? '0 80px' : '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ maxWidth: '500px' }}>
            <h2
              style={{
                fontSize: isFullHeightDesktop ? '40px' : 'clamp(26px, 3vw, 36px)',
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
                fontSize: isFullHeightDesktop ? '18px' : '18px',
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
          order: isFullHeightDesktop ? 1 : 1,
          height: isFullHeightDesktop ? '100%' : 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isFullHeightDesktop ? '100px' : '0',
        }}>
          <img
            src={image}
            alt="תמונה"
            loading="lazy"
            style={{
              width: '100%',
              height: isFullHeightDesktop ? 'auto' : 'auto',
              maxHeight: isFullHeightDesktop ? 'calc(100vh - 200px)' : 'auto',
              aspectRatio: isFullHeightDesktop ? '1 / 1' : '1.4 / 1',
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
