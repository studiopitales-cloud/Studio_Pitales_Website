import { useState } from 'react'

const FAQAccordion = ({ eyebrow, title, faqs }) => {
  const [openIdx, setOpenIdx] = useState(null)

  const toggleFAQ = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <section
      style={{
        padding: 'clamp(50px, 10vw, 80px) 20px',
        background: '#FDF7F3',
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

        {/* FAQ List */}
        <div>
          {faqs.map((faq, idx) => (
            <div key={idx} style={{ borderBottom: '1px solid #B0B0B0' }}>
              <button
                onClick={() => toggleFAQ(idx)}
                aria-expanded={openIdx === idx}
                aria-controls={`faq-${idx}`}
                style={{
                  width: '100%',
                  padding: '20px 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 'inherit',
                  fontFamily: 'inherit',
                }}
              >
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#000',
                    textAlign: 'right',
                    flex: 1,
                  }}
                >
                  {faq.question}
                </span>
                <span
                  style={{
                    fontSize: '15px',
                    color: '#000',
                    marginRight: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '20px',
                    height: '20px',
                    flexShrink: 0,
                  }}
                >
                  {openIdx === idx ? '−' : '+'}
                </span>
              </button>

              {/* Answer */}
              {openIdx === idx && (
                <div
                  id={`faq-${idx}`}
                  style={{
                    paddingBottom: '20px',
                    animation: 'slideDown 0.5s ease',
                  }}
                >
                  <p
                    style={{
                      fontSize: '18px',
                      color: '#333',
                      lineHeight: 1.6,
                      margin: 0,
                      textAlign: 'right',
                    }}
                  >
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        })}
      </script>
    </section>
  )
}

export default FAQAccordion
