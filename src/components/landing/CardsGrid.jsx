const CardsGrid = ({ eyebrow, title, cards, gridImage }) => {
  return (
    <section
      style={{
        padding: 'clamp(50px, 10vw, 80px) 20px',
        background: '#FAEFE6',
      }}
    >
      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        {/* Eyebrow */}
        <p
          style={{
            fontSize: '22px',
            fontWeight: 700,
            color: '#000',
            margin: '0 0 8px 0',
            textAlign: 'right',
          }}
        >
          {eyebrow}
        </p>

        {/* Title */}
        <h2
          style={{
            fontSize: 'clamp(26px, 3vw, 36px)',
            fontWeight: 700,
            color: '#000',
            margin: '0 0 40px 0',
            lineHeight: 1.2,
            textAlign: 'right',
          }}
        >
          {title}
        </h2>

        {/* Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '35px',
            marginBottom: '40px',
          }}
        >
          {cards.map((card, idx) => (
            <div
              key={idx}
              style={{
                background: '#92a6b4',
                borderRadius: '32px',
                padding: '28px 24px',
                textAlign: 'center',
                color: '#FAEFE6',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
            >
              <h3
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  margin: '0 0 12px 0',
                  color: '#FAEFE6',
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontSize: '16px',
                  lineHeight: 1.5,
                  margin: 0,
                  color: '#FAEFE6',
                }}
              >
                {card.text}
              </p>
            </div>
          ))}
        </div>

        {/* Grid Image */}
        <img
          src={gridImage}
          alt="תמונה"
          loading="lazy"
          style={{
            width: '100%',
            aspectRatio: '1.4 / 1',
            height: 'clamp(300px, 50vw, 600px)',
            objectFit: 'cover',
            borderRadius: '32px',
            display: 'block',
            boxShadow: '0 4px 16px rgba(0,0,0,.25)',
          }}
        />
      </div>
    </section>
  )
}

export default CardsGrid
