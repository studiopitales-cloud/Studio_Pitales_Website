import Navbar from './Navbar'
import Footer from './Footer'

export default function Accessibility() {

  return (
    <>
      <Navbar forceScrolled />
      <main className="bg-[#f0ece4] min-h-screen pt-[92px]">
        <div className="max-w-[1100px] mx-auto px-8 py-8 md:py-12" dir="rtl">

          <div className="mb-8">
            <div className="inline-block mb-5">
              <h1 className="text-[28px] md:text-[36px] font-light tracking-[-0.02em] leading-[1.3]">הצהרת נגישות</h1>
              <div className="h-[3px] bg-[#92a6b4] mt-3 w-full" />
            </div>
            <p className="text-[13px] text-[#1a1a1a]">עודכן לאחרונה: 15.05.2026</p>
          </div>

          <div className="mb-7 leading-[1.8] font-normal text-[15px] md:text-[16px] space-y-3">
            <p>ברוכים הבאים לאתר <a href="https://www.studiopitales.co.il" className="text-[#92a6b4] hover:underline">https://www.studiopitales.co.il</a> (להלן: "האתר"), המופעל ומנוהל על ידי טל פיטליס, עוסק מורשה מספר 208063255 (להלן: "הסטודיו" ו/או "אנחנו").</p>
            <p>אנו רואים חשיבות רבה בהנגשת האתר והשירותים המוצעים בו לאנשים עם מוגבלויות ופועלים ככל האפשר כדי לאפשר חוויית גלישה נגישה, נוחה ושוויונית לכלל המשתמשים.</p>
            <p>האתר נבנה תוך מאמץ לעמוד בהוראות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג–2013, ובהתאם להמלצות התקן הישראלי ת"י 5568 המבוסס על הנחיות WCAG 2.1 ברמת AA.</p>
          </div>

          <div className="space-y-6 leading-[1.8] font-normal text-[15px] md:text-[16px]">

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
                  <li key={t} className="flex gap-2"><span className="text-[#92a6b4] shrink-0">–</span>{t}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-[16px] md:text-[18px] font-medium mb-3 pb-2 border-b border-[#92a6b4]/30">2. שימוש ברכיבי צד שלישי</h2>
              <p className="mb-3">ייתכן שבאתר משולבים רכיבים או שירותים חיצוניים כגון:</p>
              <ul className="space-y-1 pr-4 mb-4">
                {['Google Maps', 'Instagram', 'WhatsApp', 'Facebook / Meta'].map(t => (
                  <li key={t} className="flex gap-2"><span className="text-[#92a6b4] shrink-0">–</span>{t}</li>
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
              <p className="mb-3">לשאלות, בקשות או דיווח על בעיית נגישות באתר, ניתן ליצור קשר באמצעות פרטי ההתקשרות המופיעים בתחתית העמוד.</p>
              <p>אנו מתחייבים לבדוק ולטפל בכל פנייה בנושא נגישות בהקדם האפשרי.</p>
            </section>

          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
