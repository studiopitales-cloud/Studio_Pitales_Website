import { useEffect } from 'react'
import Navbar from './Navbar'
import { BottomBar } from './Footer'

const BASE = 'https://www.studiopitales.co.il'

export default function Accessibility() {
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'הצהרת נגישות | Studio Pitales'

    let metaEl = document.querySelector('meta[name="description"]')
    const metaExisted = !!metaEl
    const prevDesc = metaEl?.getAttribute('content')
    if (!metaEl) { metaEl = document.createElement('meta'); metaEl.name = 'description'; document.head.appendChild(metaEl) }
    metaEl.setAttribute('content', 'הצהרת נגישות אתר סטודיו PITALES — פילאטיס מכשירים באשקלון')

    let canonEl = document.querySelector('link[rel="canonical"]')
    const canonExisted = !!canonEl
    const prevCanon = canonEl?.getAttribute('href')
    if (!canonEl) { canonEl = document.createElement('link'); canonEl.rel = 'canonical'; document.head.appendChild(canonEl) }
    canonEl.setAttribute('href', `${BASE}/accessibility`)

    return () => {
      document.title = prevTitle
      if (metaExisted) metaEl.setAttribute('content', prevDesc); else metaEl.remove()
      if (canonExisted) canonEl.setAttribute('href', prevCanon); else canonEl.remove()
    }
  }, [])

  return (
    <>
      <Navbar forceScrolled />
      <main className="bg-[#f0ece4] min-h-screen pt-[var(--navbar-h)]">
        <div className="max-w-[1100px] mx-auto px-8 py-8 md:py-12" dir="rtl">

          <div className="mb-8">
            <div className="inline-block mb-5">
              <h1 className="text-[28px] md:text-[36px] font-light tracking-[-0.02em] leading-[1.3]">הצהרת נגישות</h1>
              <div className="h-[3px] bg-[#92a6b4] mt-3 w-full" />
            </div>
            <p className="text-[13px] text-[#1a1a1a]">עודכן לאחרונה: 15.05.2026</p>
          </div>

          <div className="mb-7 leading-[1.8] font-normal text-[clamp(16px,1.45vw,18px)] space-y-3">
            <p>ברוכים הבאים לאתר <a href="https://www.studiopitales.co.il" className="text-[#5d7a87] hover:underline">https://www.studiopitales.co.il</a> (להלן: "האתר"), המופעל ומנוהל על ידי טל פיטליס, עוסק מורשה מספר 208063255 (להלן: "הסטודיו" ו/או "אנחנו").</p>
            <p>אנו רואים חשיבות רבה בהנגשת האתר והשירותים המוצעים בו לאנשים עם מוגבלויות ופועלים ככל האפשר כדי לאפשר חוויית גלישה נגישה, נוחה ושוויונית לכלל המשתמשים.</p>
            <p>האתר נבנה תוך מאמץ לעמוד בהוראות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג–2013, ובהתאם להמלצות התקן הישראלי ת"י 5568 המבוסס על הנחיות WCAG 2.1 ברמת AA.</p>
          </div>

          <div className="space-y-6 leading-[1.8] font-normal text-[clamp(16px,1.45vw,18px)]">

            <section>
              <h2 className="text-[16px] md:text-[18px] font-medium mb-3 pb-2 border-b border-[#92a6b4]/30">1. התאמות נגישות באתר</h2>
              <p className="mb-3">באתר בוצעו בין היתר ההתאמות הבאות:</p>
              <ul className="space-y-1 pr-4">
                {[
                  'התאמה לגלישה באמצעות מחשב, טאבלט ומובייל',
                  'תמיכה בניווט באמצעות מקלדת',
                  'שימוש במבנה תוכן ברור והיררכי',
                  'שימוש בצבעים וניגודיות לשיפור הקריאות',
                  'התאמת האתר לדפדפנים מודרניים',
                  'הוספת טקסטים חלופיים (alt) לתמונות מרכזיות ככל האפשר',
                  'שימוש בפונטים קריאים ובריווחים נוחים לקריאה',
                  'התאמה לתצוגה רספונסיבית במסכים שונים',
                ].map(t => (
                  <li key={t} className="flex gap-2"><span className="text-[#5d7a87] shrink-0">–</span>{t}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-[16px] md:text-[18px] font-medium mb-3 pb-2 border-b border-[#92a6b4]/30">2. שימוש ברכיבי צד שלישי</h2>
              <p className="mb-3">ייתכן שבאתר משולבים רכיבים או שירותים חיצוניים כגון:</p>
              <ul className="space-y-1 pr-4 mb-4">
                {['Google Maps', 'Instagram', 'WhatsApp', 'Facebook / Meta'].map(t => (
                  <li key={t} className="flex gap-2"><span className="text-[#5d7a87] shrink-0">–</span>{t}</li>
                ))}
              </ul>
              <p>רכיבים אלו מופעלים על ידי צדדים שלישיים ולכן ייתכן שחלקים מסוימים בהם אינם נגישים באופן מלא.</p>
            </section>

            <section>
              <h2 className="text-[16px] md:text-[18px] font-medium mb-3 pb-2 border-b border-[#92a6b4]/30">3. סייגים לנגישות</h2>
              <p className="mb-3">אנו ממשיכים לפעול לשיפור נגישות האתר באופן שוטף.</p>
              <p className="mb-3">ייתכן שחלקים מסוימים באתר טרם הונגשו באופן מלא, או שטרם נמצא עבורם פתרון טכנולוגי מתאים.</p>
              <p>אם נתקלתם בבעיה או בקושי בנושא נגישות, נשמח לקבל משוב ולפעול לתיקון ככל האפשר.</p>
            </section>

            <section>
              <h2 className="text-[16px] md:text-[18px] font-medium mb-3 pb-2 border-b border-[#92a6b4]/30">4. יצירת קשר בנושא נגישות</h2>
              <p className="mb-1">לשאלות, בקשות או דיווח על בעיית נגישות באתר, ניתן ליצור קשר:</p>
              <p className="mb-1">טלפון: <a href="tel:+972508290919" className="text-[#5d7a87] hover:underline">050-8290919</a></p>
              <p className="mb-3">דוא"ל: <a href="mailto:studiopitales@gmail.com" className="text-[#5d7a87] hover:underline">studiopitales@gmail.com</a></p>
              <p>אנו מתחייבים לבדוק ולטפל בכל פנייה בנושא נגישות בהקדם האפשרי.</p>
            </section>

          </div>

        </div>
      </main>
      <div className="pb-5" />
      <BottomBar />
    </>
  )
}
