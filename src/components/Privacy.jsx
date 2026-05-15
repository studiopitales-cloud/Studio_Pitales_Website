import Navbar from './Navbar'
import Footer from './Footer'

const SECTIONS = [
  {
    num: '1', title: 'כללי',
    content: (
      <>
        <p className="mb-3">מדיניות פרטיות זו נועדה להסביר:</p>
        <ul className="space-y-1 pr-4 mb-4">
          {['איזה מידע נאסף באתר','כיצד נעשה בו שימוש','אילו צדדים שלישיים עשויים לקבל גישה אליו','ומהן זכויות המשתמשים בנוגע למידע שלהם'].map(t => (
            <li key={t} className="flex gap-2"><span className="text-[#92a6b4] shrink-0">–</span>{t}</li>
          ))}
        </ul>
        <p>המדיניות מנוסחת בלשון זכר מטעמי נוחות בלבד ופונה לכל המינים.</p>
      </>
    ),
  },
  {
    num: '2', title: 'איזה מידע אנו אוספים',
    content: (
      <>
        <p className="font-medium mb-2">א. מידע שנמסר על ידכם באופן יזום</p>
        <p className="mb-3">בעת יצירת קשר עם הסטודיו או שימוש בטפסים באתר, ייתכן שתתבקשו למסור מידע כגון:</p>
        <ul className="space-y-1 pr-4 mb-5">
          {['שם מלא','מספר טלפון','כתובת דוא"ל','תוכן הפנייה','כל מידע נוסף שתבחרו למסור'].map(t => (
            <li key={t} className="flex gap-2"><span className="text-[#92a6b4] shrink-0">–</span>{t}</li>
          ))}
        </ul>
        <p className="font-medium mb-2">ב. מידע טכני הנאסף אוטומטית</p>
        <p className="mb-3">בעת השימוש באתר ייתכן שייאסף מידע טכנולוגי, לרבות:</p>
        <ul className="space-y-1 pr-4">
          {['כתובת IP','סוג מכשיר ודפדפן','מערכת הפעלה','זמני גלישה','עמודים שנצפו באתר','מקור ההגעה לאתר','נתוני שימוש כלליים באתר'].map(t => (
            <li key={t} className="flex gap-2"><span className="text-[#92a6b4] shrink-0">–</span>{t}</li>
          ))}
        </ul>
      </>
    ),
  },
  {
    num: '3', title: 'מטרות השימוש במידע',
    content: (
      <>
        <p className="mb-3">המידע שנאסף עשוי לשמש לצורך:</p>
        <ul className="space-y-1 pr-4">
          {['יצירת קשר ומתן מענה לפניות','תיאום שיעורי ניסיון ואימונים','שיפור חוויית המשתמש באתר','שיפור השירותים והתכנים','ניתוח נתוני שימוש באתר','שליחת עדכונים, מידע מקצועי או הצעות רלוונטיות','ניהול ותפעול האתר באופן תקין ובטוח'].map(t => (
            <li key={t} className="flex gap-2"><span className="text-[#92a6b4] shrink-0">–</span>{t}</li>
          ))}
        </ul>
      </>
    ),
  },
  {
    num: '4', title: 'דיוור ועדכונים שיווקיים',
    content: <><p className="mb-3">במידה והמשתמש השאיר פרטי קשר באתר, ייתכן שישלחו אליו עדכונים, הטבות, תוכן מקצועי ומידע על שירותי הסטודיו.</p><p>ניתן להסיר את עצמכם מרשימת הדיוור בכל עת באמצעות פנייה לסטודיו או דרך אפשרות ההסרה בהודעות, ככל שקיימת.</p></>,
  },
  {
    num: '5', title: 'Cookies וטכנולוגיות מעקב',
    content: (
      <>
        <p className="mb-3">האתר עשוי להשתמש בקובצי Cookies ובטכנולוגיות דומות לצורך:</p>
        <ul className="space-y-1 pr-4 mb-4">
          {['תפעול תקין של האתר','אבטחת מידע','שמירת העדפות משתמש','ניתוח סטטיסטי','שיפור חוויית המשתמש','התאמת תכנים ופרסומות'].map(t => (
            <li key={t} className="flex gap-2"><span className="text-[#92a6b4] shrink-0">–</span>{t}</li>
          ))}
        </ul>
        <p className="mb-2">חלק מה-Cookies מופעלים על ידי צדדים שלישיים.</p>
        <p>ניתן לחסום או למחוק Cookies דרך הגדרות הדפדפן שלכם. עם זאת, חסימת Cookies מסוימים עלולה להשפיע על חוויית השימוש באתר.</p>
      </>
    ),
  },
  {
    num: '6', title: 'שירותי צד שלישי',
    content: (
      <>
        <p className="mb-3">האתר עשוי לעשות שימוש בשירותים חיצוניים, לרבות: Google Analytics, Google Maps, Meta / Facebook Pixel, Instagram, WhatsApp ושירותי אחסון ואבטחה.</p>
        <p className="mb-3">שירותים אלו עשויים לאסוף מידע בהתאם למדיניות הפרטיות שלהם.</p>
        <p className="text-[14px]">למידע נוסף:<br />
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#92a6b4] hover:underline">https://policies.google.com/privacy</a><br />
          <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className="text-[#92a6b4] hover:underline">https://www.facebook.com/privacy/policy</a>
        </p>
      </>
    ),
  },
  {
    num: '7', title: 'מסירת מידע לצדדים שלישיים',
    content: (
      <>
        <p className="mb-3">הסטודיו לא ימכור או יעביר מידע אישי לצדדים שלישיים, למעט במקרים הבאים:</p>
        <ul className="space-y-1 pr-4">
          {['לצורך תפעול השירותים באתר','לספקים טכנולוגיים הפועלים מטעמנו','במקרה של חובה חוקית או צו שיפוטי','לצורך הגנה על זכויותינו המשפטיות','במקרה של הפרת תנאי השימוש באתר'].map(t => (
            <li key={t} className="flex gap-2"><span className="text-[#92a6b4] shrink-0">–</span>{t}</li>
          ))}
        </ul>
      </>
    ),
  },
  {
    num: '8', title: 'אבטחת מידע',
    content: <><p className="mb-3">אנו נוקטים באמצעי אבטחה סבירים ומקובלים לצורך שמירה על המידע האישי ומניעת גישה בלתי מורשית.</p><p>עם זאת, אין אפשרות להבטיח אבטחה מוחלטת של מידע המועבר דרך האינטרנט, ולכן השימוש באתר נעשה באחריות המשתמש.</p></>,
  },
  {
    num: '9', title: 'קישורים לאתרים חיצוניים',
    content: <p>האתר עשוי לכלול קישורים לאתרים חיצוניים או שירותים של צדדים שלישיים. הגלישה והשימוש באתרים אלו כפופים למדיניות הפרטיות שלהם בלבד, ולסטודיו אין אחריות עליהם.</p>,
  },
  {
    num: '10', title: 'שמירת מידע',
    content: (
      <>
        <p className="mb-3">המידע יישמר למשך הזמן הדרוש לצורך:</p>
        <ul className="space-y-1 pr-4">
          {['מתן השירותים','תפעול האתר','עמידה בדרישות חוקיות','הגנה על אינטרסים לגיטימיים של הסטודיו'].map(t => (
            <li key={t} className="flex gap-2"><span className="text-[#92a6b4] shrink-0">–</span>{t}</li>
          ))}
        </ul>
      </>
    ),
  },
  {
    num: '11', title: 'זכויות המשתמשים',
    content: <><p className="mb-3">באפשרותכם לפנות אלינו בכל עת לצורך עיון במידע שנשמר אודותיכם, תיקון מידע שגוי, מחיקת מידע, הסרה מדיוור, או בירור בנושא פרטיות.</p><p>פניות בנושא פרטיות ניתן לשלוח לכתובת: <a href="mailto:studiopitales@gmail.com" className="text-[#92a6b4] hover:underline">studiopitales@gmail.com</a></p></>,
  },
  {
    num: '12', title: 'שינויים במדיניות הפרטיות',
    content: <p>אנו רשאים לעדכן מדיניות זו מעת לעת בהתאם לצורך, לשינויים טכנולוגיים או לדרישות הדין. הגרסה המעודכנת תפורסם באתר ותיכנס לתוקף מיד עם פרסומה.</p>,
  },
]

export default function Privacy() {

  return (
    <>
      <Navbar forceScrolled />
      <main className="bg-[#f0ece4] min-h-screen pt-[92px]">
        <div className="max-w-[1100px] mx-auto px-8 py-8 md:py-12" dir="rtl">

          <div className="mb-8">
            <div className="inline-block mb-5">
              <h1 className="text-[28px] md:text-[36px] font-light tracking-[-0.02em] leading-[1.3]">מדיניות פרטיות</h1>
              <div className="h-[3px] bg-[#92a6b4] mt-3 w-full" />
            </div>
            <p className="text-[13px] text-[#1a1a1a]">עודכן לאחרונה: 15.05.2026</p>
          </div>

          <div className="mb-7 leading-[1.8] font-normal text-[15px] md:text-[16px] space-y-3">
            <p>ברוכים הבאים לאתר <a href="https://www.studiopitales.co.il" className="text-[#92a6b4] hover:underline">https://www.studiopitales.co.il</a> (להלן: "האתר"), המופעל ומנוהל על ידי טל פיטליס, עוסק מורשה מספר 208063255 (להלן: "הסטודיו" ו/או "אנחנו").</p>
            <p>מדיניות פרטיות זו נועדה להסביר כיצד אנו אוספים, משתמשים, שומרים ומגנים על המידע האישי הנמסר על ידי משתמשי האתר, בהתאם להוראות חוק הגנת הפרטיות, התשמ"א–1981.</p>
            <p>אנו מכבדים את פרטיות המשתמשים באתר ופועלים לשמירה על המידע האישי הנמסר לנו במסגרת השימוש באתר ובשירותי הסטודיו.</p>
            <p className="font-medium">השימוש באתר מהווה הסכמה למדיניות פרטיות זו.</p>
          </div>

          <div className="space-y-6 leading-[1.8] font-normal text-[15px] md:text-[16px]">
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
      <Footer />
    </>
  )
}
