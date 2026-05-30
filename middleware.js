const BASE = 'https://www.studiopitales.co.il'

const POSTS_META = [
  {
    slug: 'what-is-reformer-pilates',
    title: 'מה זה פילאטיס מכשירים?',
    excerpt: 'פילאטיס מכשירים היא שיטת אימון המשלבת ציוד מקצועי, ריפורמר, קדלק, חבית ועוד, כדי לאתגר את הגוף בצורה מדויקת ובטוחה. הכירו את השיטה שמשנה גופות.',
    img: '/DSC07194.jpg',
  },
  {
    slug: 'what-pilates-does-to-body',
    title: 'פילאטיס לגוף ולנפש',
    excerpt: 'פילאטיס מכשירים הוא לא רק אימון לגוף. מתאמנות רבות מגלות שהשינוי הגדול ביותר הוא הנפשי: פחות סטרס, שינה טובה יותר ותחושת ביטחון שמשתנה לגמרי. כך זה עובד.',
    img: '/DSC08037.jpg',
  },
  {
    slug: 'pilates-body-toning',
    title: 'האם פילאטיס מכשירים מחטב?',
    excerpt: 'זו אחת השאלות הנפוצות ביותר שנשים שואלות לפני שהן מגיעות לסטודיו. התשובה היא כן, אבל יש כמה דברים שכדאי להבין לפני שמתחילים.',
    img: '/DSC07902.jpg',
  },
  {
    slug: 'mat-vs-reformer-pilates',
    title: 'ההבדל בין פילאטיס מזרן לפילאטיס מכשירים',
    excerpt: 'שתי שיטות, אותה מתודולוגיה, תוצאות שונות. אם תמיד תהיתם מה ההבדל בין פילאטיס על מזרן לפילאטיס על ריפורמר, הנה התשובה הפשוטה.',
    img: '/DSC08209.jpg',
  },
  {
    slug: 'pilates-core-strengthening',
    title: 'פילאטיס מכשירים לחיזוק שרירי הליבה',
    excerpt: 'שרירי הליבה הם הבסיס לכל תנועה. כשהם חלשים, הגוף כואב. כשהם חזקים, הכל זז טוב יותר. כך פילאטיס מכשירים מחזק את הליבה בצורה שאף אימון אחר לא עושה.',
    img: '/DSC07286.jpg',
  },
  {
    slug: 'personal-attention-in-pilates',
    title: 'יחס אישי בפילאטיס: בטיחות ותוצאות',
    excerpt: 'פילאטיס מכשירים הוא אימון שבנוי על דיוק. תיקון קטן של מנח הגוף, מגע עדין של המדריכה, הסבר בזמן הנכון, אלה לא בונוסים. הם הלב של השיטה.',
    img: '/DSC07520.jpg',
  },
  {
    slug: 'pilates-injury-rehabilitation',
    title: 'פילאטיס מכשירים לשיקום פציעות',
    excerpt: 'פציעה לא אומרת עצירה. פילאטיס מכשירים מאפשר לעבוד על כל הגוף גם כשחלק ממנו בשיקום, ולחזור לתפקוד מלא בצורה בטוחה ומהירה יותר.',
    img: '/DSC07564.jpg',
  },
  {
    slug: 'pilates-for-seniors',
    title: 'פילאטיס מכשירים לגיל השלישי',
    excerpt: 'גיל השלישי הוא לא מכשול, הוא הזדמנות. פילאטיס מכשירים מותאם לגיל השלישי מחזק את הגוף, משפר שיווי משקל ומגביר את איכות החיים. הכל בקצב שלכן.',
    img: '/DSC07803.jpg',
  },
  {
    slug: 'pilates-for-athletes',
    title: 'למה ספורטאים מקצועיים בוחרים בפילאטיס?',
    excerpt: "נובאק ג'וקוביץ', לברון ג'יימס, טייגר וודס ועוד. ספורטאים מהטובים בעולם בחרו בפילאטיס כחלק מהאימון שלהם. מה הם יודעים שאנחנו עוד לא?",
    img: '/DSC08094.jpg',
  },
  {
    slug: 'pilates-during-pregnancy',
    title: 'פילאטיס מכשירים בהריון',
    excerpt: 'הריון הוא לא הזמן לעצור. פילאטיס מכשירים מותאם להריון מחזק את שרירי קרקעית האגן, מקל על כאבי גב ומכין את הגוף ללידה ולהתאוששות. הנה כל מה שחשוב לדעת.',
    img: '/DSC07474.jpg',
  },
  {
    slug: 'pilates-after-birth',
    title: 'פילאטיס לנשים אחרי לידה',
    excerpt: 'הגוף אחרי לידה צריך תשומת לב, אהבה ותנועה נכונה. פילאטיס מכשירים עוזר לנשים לחזור לעצמן אחרי לידה, לחזק את קרקעית האגן ולהחזיר כוח ויציבה.',
    img: '/DSC07873 (1).jpg',
  },
  {
    slug: 'pilates-for-fibromyalgia',
    title: 'פילאטיס לחולי פיברומיאלגיה',
    excerpt: 'פיברומיאלגיה מביאה עמה כאבים כרוניים ועייפות, אבל תנועה נכונה יכולה להיות חלק מהפתרון. כיצד פילאטיס מכשירים עוזר לחולי פיברומיאלגיה לחיות טוב יותר.',
    img: '/DSC08236 (1).jpg',
  },
]

const BOT_RE = /facebookexternalhit|Facebot|Twitterbot|LinkedInBot|Slackbot|WhatsApp|Googlebot|bingbot|DuckDuckBot|Baiduspider|YandexBot|Applebot|Discordbot|TelegramBot/i

export const config = { matcher: ['/blog', '/blog/:slug*'] }

export default function middleware(req) {
  const ua = req.headers.get('user-agent') || ''
  if (!BOT_RE.test(ua)) return

  const url = new URL(req.url)
  const pathname = url.pathname.replace(/\/$/, '')

  let title, description, imgUrl, pageUrl, ogType

  if (pathname === '/blog') {
    title       = 'מאמרים על פילאטיס | Studio Pitales'
    description = 'מאמרים מקצועיים על פילאטיס מכשירים: יתרונות, שיקום, הריון, גיל שלישי, ספורטאים ועוד. מאת Studio Pitales, סטודיו בוטיק באשקלון.'
    imgUrl      = `${BASE}/Banner.jpg`
    pageUrl     = `${BASE}/blog`
    ogType      = 'website'
  } else {
    const slug = pathname.replace(/^\/blog\//, '')
    const post = POSTS_META.find(p => p.slug === slug)
    if (!post) return
    title       = `${post.title} | Studio Pitales`
    description = post.excerpt
    imgUrl      = `${BASE}${post.img}`
    pageUrl     = `${BASE}/blog/${post.slug}`
    ogType      = 'article'
  }

  const html = `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8"/>
  <title>${title}</title>
  <meta name="description" content="${description}"/>
  <link rel="canonical" href="${pageUrl}"/>
  <meta property="og:type"        content="${ogType}"/>
  <meta property="og:url"         content="${pageUrl}"/>
  <meta property="og:title"       content="${title}"/>
  <meta property="og:description" content="${description}"/>
  <meta property="og:image"       content="${imgUrl}"/>
  <meta property="og:image:width"  content="1200"/>
  <meta property="og:image:height" content="630"/>
  <meta property="og:locale"      content="he_IL"/>
  <meta name="twitter:card"        content="summary_large_image"/>
  <meta name="twitter:title"       content="${title}"/>
  <meta name="twitter:description" content="${description}"/>
  <meta name="twitter:image"       content="${imgUrl}"/>
</head>
<body></body>
</html>`

  return new Response(html, {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  })
}
