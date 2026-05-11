const classes = [
  { day: '09', month: 'מאי', title: 'פילאטיס מכשירים — רמה מתקדמת', meta: '09:00 – 10:00 · מדריכה: תמר', active: true },
  { day: '11', month: 'מאי', title: 'פילאטיס מזרן — רמה בסיסית',    meta: '08:00 – 09:00 · מדריכה: נועה', active: false },
  { day: '13', month: 'מאי', title: 'ריפורמר פילאטיס — שיפור יציבה', meta: '17:00 – 18:00 · מדריכה: שיר', active: false },
  { day: '15', month: 'מאי', title: 'פילאטיס לנשים בהריון',           meta: '10:00 – 11:00 · מדריכה: תמר', active: false },
  { day: '17', month: 'מאי', title: 'פילאטיס לגיל השלישי — בעדינות', meta: '11:00 – 12:00 · מדריכה: לי', active: false },
]

export default function Schedule() {
  return (
    <section id="schedule" className="bg-[#e6e2da] py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-[820px] mx-auto">

        <header className="text-center mb-14">
          <p className="text-[10px] tracking-[0.35em] text-blue-gray font-medium uppercase mb-3">לוח שיעורים</p>
          <h2 className="text-[32px] font-light tracking-[-0.02em] text-brand-dark">הפעילות הקרובה</h2>
          <div className="w-9 h-px bg-blue-gray mx-auto mt-4" />
        </header>

        <div>
          {classes.map((c, i) => (
            <a
              key={i}
              href="#"
              className="grid grid-cols-[52px_1fr_auto] sm:grid-cols-[64px_1fr_auto] gap-3 sm:gap-5 px-2 sm:px-4 py-4 sm:py-5 border-b border-[#dbd7cf] first:border-t items-center hover:bg-blue-gray/[0.07] transition-colors duration-200 no-underline text-inherit"
            >
              {/* Date box */}
              <div className={[
                'text-center py-2 px-1.5',
                c.active
                  ? 'bg-blue-gray text-white'
                  : 'border border-[#c8c8c8] text-brand-dark',
              ].join(' ')}>
                <div className="text-[22px] font-semibold leading-none">{c.day}</div>
                <div className="text-[10px] tracking-[0.1em] opacity-80 mt-0.5">{c.month}</div>
              </div>

              <div>
                <p className="text-[14px] sm:text-[16px] font-medium text-brand-dark mb-1">{c.title}</p>
                <p className="text-[12px] sm:text-[13px] font-light text-brand-mid">{c.meta}</p>
              </div>

              <span className="text-[11px] tracking-[0.1em] text-blue-gray font-medium whitespace-nowrap hidden sm:block hover:text-brand-dark transition-colors duration-200">
                הרשמה ←
              </span>
            </a>
          ))}
        </div>

        <footer className="text-center mt-10">
          <a
            href="#"
            className="text-[12px] tracking-[0.2em] text-brand-dark border-b border-brand-dark pb-0.5 font-medium hover:text-blue-gray hover:border-blue-gray transition-colors duration-200"
          >
            לכל לוח השיעורים ←
          </a>
        </footer>
      </div>
    </section>
  )
}
