const TextImage = ({ title, text, image }) => {
  return (
    <section
      style={{
        padding: 'clamp(50px, 10vw, 80px) 20px',
        background: '#FDF7F3',
      }}
    >
      <div
        style={{
          maxWidth: '1140px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          alignItems: 'center',
        }}
      >
        {/* RTL: טקסט בצד ימין, תמונה בצד שמאל */}
        <div style={{ order: 2 }}>
          <h2
            style={{
              fontSize: 'clamp(26px, 3vw, 36px)',
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
              fontSize: '18px',
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
        <div style={{ order: 1 }}>
          <img
            src={image}
            alt="תמונה"
            loading="lazy"
            style={{
              width: '100%',
              aspectRatio: '1.4 / 1',
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
