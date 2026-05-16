const images = [
  { src: '/DSC07910.jpg', tall: true,  alt: '' },
  { src: '/DSC07873.jpg', tall: false, alt: '' },
  { src: '/DSC07980.jpg', tall: false, alt: '' },
  { src: '/DSC08053.jpg', tall: false, alt: '' },
  { src: '/DSC08236.jpg', tall: false, alt: '' },
]

export default function Gallery() {
  return (
    <section id="gallery" className="bg-[#e6e2da] overflow-hidden">
      <header className="text-center pt-6 md:pt-10 pb-[18px] md:pb-[28px] px-8">
        <div className="inline-block mb-0">
          <h2 className="text-[28px] md:text-[32px] font-light tracking-[-0.02em] text-brand-dark leading-none">גלריה</h2>
          <div className="h-[3px] bg-blue-gray mt-3" style={{ width: '100%' }} />
        </div>
      </header>

      {/* Mobile: simple 2-col grid; md+: 3-col bento with tall first image */}
      <div className="hidden md:grid grid-cols-3 gap-[3px]">
        {images.map((img, i) => (
          <div
            key={i}
            className={[
              'overflow-hidden relative group',
              img.tall ? 'h-[603px] row-span-2' : 'h-[300px]',
            ].join(' ')}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.06] saturate-[0.88]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-gray/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      {/* Mobile gallery — 2 column simple grid, tall image excluded */}
      <div className="md:hidden grid grid-cols-2 gap-[2px]">
        {images.filter(img => !img.tall).map((img, i) => (
          <div
            key={i}
            className="overflow-hidden relative h-[180px]"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-full object-cover saturate-[0.88]"
            />
          </div>
        ))}
      </div>

    </section>
  )
}
