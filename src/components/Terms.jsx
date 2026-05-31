import { useEffect } from 'react'
import Navbar from './Navbar'
import { BottomBar } from './Footer'

const BASE = 'https://www.studiopitales.co.il'

const SECTIONS = [
  {
    num: '1', title: 'כללי',
    content: (
      <>
        <p className="mb-3">1.1 האתר משמש כאתר תדמיתי, שיווקי ואינפורמטיבי עבור סטודיו Pitales – סטודיו לפילאטיס מכשירים באשקלון.</p>
        <p className="mb-3">1.2 האתר כולל בין היתר:</p>
        <ul className="space-y-1 pr-4 mb-3">
          {['מידע אודות שירותי הסטודיו','מידע על סוגי אימונים ושיעורים','גלריות ותכנים חזותיים','טפסי יצירת קשר','קישורים לרשתות חברתיות','מידע מקצועי, שיווקי ותדמיתי'].map(t => (
            <li key={t} className="flex gap-2"><span className="text-[#5d7a87] shrink-0">–</span>{t}</li>
          ))}
        </ul>
        <p>1.3 הנהלת הסטודיו רשאית לעדכן, לשנות, להסיר או להוסיף תכנים באתר בכל עת ולפי שיקול דעתה.</p>
      </>
    ),
  },
  {
    num: '2', title: 'שימוש באתר',
    content: (
      <>
        <p className="mb-3">2.1 השימוש באתר מיועד למטרות אישיות, חוקיות ולצרכי התרשמות וקבלת מידע בלבד.</p>
        <p className="mb-3">2.2 אין לעשות באתר או בתכניו שימוש בלתי חוקי, פוגעני, מסחרי או כזה העלול לפגוע בפעילות האתר, בבעליו או במשתמשים אחרים.</p>
        <p>2.3 חל איסור להעתיק, לשכפל, להפיץ, לפרסם, להציג בפומבי, לשדר או לעשות שימוש כלשהו בתכני האתר ללא אישור מראש ובכתב מבעלי האתר.</p>
      </>
    ),
  },
  {
    num: '3', title: 'תוכן האתר והגבלת אחריות',
    content: (
      <>
        <p className="mb-3">3.1 התכנים באתר נועדו למטרות מידע כללי, שיווק והתרשמות בלבד.</p>
        <p className="mb-3">3.2 אין לראות במידע המופיע באתר משום:</p>
        <ul className="space-y-1 pr-4 mb-3">
          {['ייעוץ רפואי','אבחון רפואי','חוות דעת מקצועית','או תחליף לייעוץ אישי ומקצועי'].map(t => (
            <li key={t} className="flex gap-2"><span className="text-[#5d7a87] shrink-0">–</span>{t}</li>
          ))}
        </ul>
        <p className="mb-3">3.3 פעילות גופנית ובפרט פילאטיס מכשירים עשויה שלא להתאים לכל אדם ועלולה להיות כרוכה במאמץ פיזי ובסיכונים מסוימים.</p>
        <p className="mb-3">3.4 האחריות לבדיקת התאמת הפעילות למצבו הבריאותי של המשתמש חלה עליו בלבד.</p>
        <p className="mb-3">3.5 מומלץ להיוועץ ברופא טרם תחילת פעילות גופנית, במיוחד במקרה של:</p>
        <ul className="space-y-1 pr-4 mb-3">
          {['הריון','פציעות','מגבלות רפואיות','כאבים','או מצב רפואי קיים'].map(t => (
            <li key={t} className="flex gap-2"><span className="text-[#5d7a87] shrink-0">–</span>{t}</li>
          ))}
        </ul>
        <p>3.6 הנהלת הסטודיו אינה אחראית לכל נזק ישיר או עקיף העלול להיגרם כתוצאה מהסתמכות על מידע המופיע באתר או מהשימוש בו.</p>
      </>
    ),
  },
  {
    num: '4', title: 'יצירת קשר והשארת פרטים',
    content: (
      <>
        <p className="mb-3">4.1 האתר עשוי לאפשר יצירת קשר באמצעות:</p>
        <ul className="space-y-1 pr-4 mb-3">
          {['טפסי יצירת קשר','WhatsApp','דוא"ל','טלפון','או אמצעי תקשורת נוספים'].map(t => (
            <li key={t} className="flex gap-2"><span className="text-[#5d7a87] shrink-0">–</span>{t}</li>
          ))}
        </ul>
        <p className="mb-3">4.2 משתמש המשאיר פרטים באתר מאשר כי הפרטים שנמסרו על ידו נכונים ומדויקים.</p>
        <p className="mb-3">4.3 השארת פרטים באתר מהווה הסכמה לקבלת פנייה מטעם הסטודיו לצורך מתן מידע, תיאום שיעורים, מתן שירות, עדכונים ותוכן רלוונטי.</p>
        <p>4.4 השימוש במידע אישי כפוף למדיניות הפרטיות של האתר.</p>
      </>
    ),
  },
  {
    num: '5', title: 'קניין רוחני',
    content: (
      <>
        <p className="mb-3">5.1 כל זכויות הקניין הרוחני באתר, לרבות:</p>
        <ul className="space-y-1 pr-4 mb-3">
          {['עיצוב האתר','לוגו','סימני מסחר','תמונות','סרטונים','טקסטים','אייקונים','קבצי מדיה','ועיצוב גרפי'].map(t => (
            <li key={t} className="flex gap-2"><span className="text-[#5d7a87] shrink-0">–</span>{t}</li>
          ))}
        </ul>
        <p className="mb-3">שייכים לסטודיו בלבד או נמצאים בשימוש כדין.</p>
        <p>5.2 אין לעשות כל שימוש בתכני האתר ללא אישור מראש ובכתב.</p>
      </>
    ),
  },
  {
    num: '6', title: 'תמונות, סרטונים ותוכן שיווקי',
    content: (
      <>
        <p className="mb-3">6.1 באתר עשויים להופיע צילומים, סרטונים ותכנים חזותיים מתוך פעילות הסטודיו.</p>
        <p className="mb-3">6.2 אין להעתיק, להפיץ, לערוך או לעשות שימוש בתכנים אלו ללא אישור מראש ובכתב.</p>
        <p>6.3 הנהלת הסטודיו רשאית להשתמש בתכנים חזותיים לצורכי שיווק, פרסום וקידום.</p>
      </>
    ),
  },
  {
    num: '7', title: 'שירותי צד שלישי וקישורים חיצוניים',
    content: (
      <>
        <p className="mb-3">7.1 האתר עשוי לכלול קישורים, הטמעות או שימוש בשירותי צד שלישי, לרבות:</p>
        <ul className="space-y-1 pr-4 mb-3">
          {['Google Maps','Instagram','Facebook / Meta','WhatsApp'].map(t => (
            <li key={t} className="flex gap-2"><span className="text-[#5d7a87] shrink-0">–</span>{t}</li>
          ))}
        </ul>
        <p className="mb-3">7.2 השימוש בשירותים אלו כפוף לתנאי השימוש ומדיניות הפרטיות של אותם צדדים שלישיים.</p>
        <p>7.3 הנהלת הסטודיו אינה אחראית לתוכן, זמינות או פעילות של אתרים ושירותים חיצוניים.</p>
      </>
    ),
  },
  {
    num: '8', title: 'זמינות האתר',
    content: (
      <>
        <p className="mb-3">8.1 הנהלת הסטודיו עושה מאמצים לשמור על פעילות תקינה ורציפה של האתר.</p>
        <p className="mb-3">8.2 עם זאת, ייתכנו תקלות, הפרעות, השבתות זמניות או בעיות טכניות שאינן בשליטת הסטודיו.</p>
        <p>8.3 הנהלת הסטודיו לא תישא באחריות לכל נזק הנובע מהשבתת האתר, תקלה טכנית, עומס, כוח עליון, פריצה או כל גורם שאינו בשליטתה.</p>
      </>
    ),
  },
  {
    num: '9', title: 'פרטיות ואבטחת מידע',
    content: (
      <>
        <p className="mb-3">9.1 השימוש באתר כפוף גם למדיניות הפרטיות של האתר.</p>
        <p className="mb-3">9.2 הנהלת הסטודיו נוקטת באמצעי אבטחה סבירים לצורך שמירה על מידע אישי.</p>
        <p>9.3 למרות האמור, אין אפשרות להבטיח אבטחה מוחלטת של מידע המועבר דרך האינטרנט.</p>
      </>
    ),
  },
  {
    num: '10', title: 'שינויים באתר ובתקנון',
    content: (
      <>
        <p className="mb-3">10.1 הנהלת הסטודיו רשאית לעדכן את האתר, השירותים ותנאי תקנון זה בכל עת ולפי שיקול דעתה.</p>
        <p className="mb-3">10.2 כל שינוי ייכנס לתוקף מיד עם פרסומו באתר.</p>
        <p>10.3 שימוש מתמשך באתר לאחר עדכון התקנון מהווה הסכמה לגרסה המעודכנת.</p>
      </>
    ),
  },
  {
    num: '11', title: 'דין וסמכות שיפוט',
    content: (
      <>
        <p className="mb-3">11.1 על תקנון זה יחולו דיני מדינת ישראל בלבד.</p>
        <p>11.2 סמכות השיפוט הבלעדית בכל מחלוקת הנוגעת לאתר או לשימוש בו תהיה לבתי המשפט המוסמכים במחוז דרום.</p>
      </>
    ),
  },
  {
    num: '12', title: 'יצירת קשר',
    content: <><p className="mb-1">לשאלות או פניות בנושא האתר ניתן ליצור קשר:</p><p className="mb-1">טלפון: <a href="tel:+972508290919" className="text-[#5d7a87] hover:underline">050-8290919</a></p><p>דוא"ל: <a href="mailto:studiopitales@gmail.com" className="text-[#5d7a87] hover:underline">studiopitales@gmail.com</a></p></>,
  },
]

export default function Terms() {
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'תקנון האתר | Studio Pitales'

    let metaEl = document.querySelector('meta[name="description"]')
    const metaExisted = !!metaEl
    const prevDesc = metaEl?.getAttribute('content')
    if (!metaEl) { metaEl = document.createElement('meta'); metaEl.name = 'description'; document.head.appendChild(metaEl) }
    metaEl.setAttribute('content', 'תקנון השימוש באתר סטודיו PITALES — פילאטיס מכשירים באשקלון')

    let canonEl = document.querySelector('link[rel="canonical"]')
    const canonExisted = !!canonEl
    const prevCanon = canonEl?.getAttribute('href')
    if (!canonEl) { canonEl = document.createElement('link'); canonEl.rel = 'canonical'; document.head.appendChild(canonEl) }
    canonEl.setAttribute('href', `${BASE}/terms`)

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
              <h1 className="text-[28px] md:text-[36px] font-light tracking-[-0.02em] leading-[1.3]">תקנון האתר</h1>
              <div className="h-[3px] bg-[#92a6b4] mt-3 w-full" />
            </div>
            <p className="text-[13px] text-[#1a1a1a]">עודכן לאחרונה: 15.05.2026</p>
          </div>

          <div className="mb-7 leading-[1.8] font-normal text-[clamp(16px,1.45vw,18px)] space-y-3">
            <p>ברוכים הבאים לאתר <a href="https://www.studiopitales.co.il" className="text-[#5d7a87] hover:underline">https://www.studiopitales.co.il</a> (להלן: "האתר"), המופעל ומנוהל על ידי טל פיטליס, עוסק מורשה מספר 208063255 (להלן: "הסטודיו", "Studio Pitales", "אנחנו").</p>
            <p className="font-medium">הגלישה והשימוש באתר ובתכנים המופיעים בו כפופים לתנאי תקנון זה ומהווים הסכמה מצד המשתמש לתנאיו.</p>
          </div>

          <div className="space-y-6 leading-[1.8] font-normal text-[clamp(16px,1.45vw,18px)]">
            {SECTIONS.map(({ num, title, content }) => (
              <section key={num}>
                <h2 className="text-[16px] md:text-[18px] font-medium mb-3 pb-2 border-b border-[#92a6b4]/30">
                  {num}. {title}
                </h2>
                {content}
              </section>
            ))}
          </div>

        </div>
      </main>
      <div className="pb-5" />
      <BottomBar />
    </>
  )
}
