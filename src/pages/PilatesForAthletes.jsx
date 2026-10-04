import { useState } from 'react'
import Hero from '../components/landing/Hero'
import TextImage from '../components/landing/TextImage'
import CardsGrid from '../components/landing/CardsGrid'
import FAQAccordion from '../components/landing/FAQAccordion'

const PilatesForAthletes = () => {
  const heroData = {
    bgImage: 'https://placehold.co/1440x600/6C715D/FAEFE6?text=Athletes+Pilates',
    title: 'פילאטיס לספורטאים',
    subtitle: 'נובאק ג\'וקוביץ\', לברון ג\'יימס, טייגר וודס ועוד. ספורטאים מהטובים בעולם בחרו בפילאטיס כחלק מהאימון שלהם.',
    ctaText: 'בואי להתחיל',
    ctaHref: '#contact'
  }

  const introData = {
    title: ['מה פילאטיס', 'נותן לספורטאי?'],
    text: 'כשמדברים על פילאטיס, רבים עדיין חושבים על שיעור רגיעה לנשים. אבל בעשור האחרון גדלה מאוד ההכרה בקרב ספורטאים מקצועיים בכוחה של השיטה. מהסיבה הפשוטה שפילאטיס מכשירים עושה דברים שאימוני כוח מסורתיים פשוט לא עושים.',
    image: '/DSC08094.jpg'
  }

  const cardsData = [
    {
      title: 'חיזוק שרירי הייצוב',
      text: 'שרירי הייצוב העמוקים שמגנים על המפרקים בעומס גבוה מתחזקים בדיוק.'
    },
    {
      title: 'מניעת חוסר איזון',
      text: 'שיפור סימטריה בין צדי הגוף ומניעת חוסר איזון שמוביל לפציעות.'
    },
    {
      title: 'גמישות פונקציונלית',
      text: 'משפרת טווחי תנועה ספורטיביים וקואורדינציה בתנועה.'
    }
  ]

  const faqData = [
    {
      question: 'ספורטאים מקצועיים משתמשים בפילאטיס?',
      answer: 'כן. נובאק ג\'וקוביץ\', לברון ג\'יימס וטייגר וודס כולם משתמשים בפילאטיס כחלק מהשגרה שלהם. היא מסייעת בשיפור ביצועים, מניעת פציעות ושיקום מהיר.'
    },
    {
      question: 'כמה פעמים בשבוע כדאי להתאמן?',
      answer: '2-3 פעמים בשבוע אידיאליים לתוצאות משמעותיות. גם פעם אחת בשבוע מהווה השלמה טובה לשגרת האימונים הספורטיבית שלך.'
    },
    {
      question: 'האם פילאטיס עוזר בשיקום פציעות?',
      answer: 'כן, בוודאות. זו אחת היתרונות המרכזיים. העבודה מבוקרת בדיוק, הציוד מספק תמיכה מלאה, והתנועות בטוחות וממוקדות.'
    },
    {
      question: 'מה ההבדל בין פילאטיס לאימוני כוח רגילים?',
      answer: 'פילאטיס מתמקד בדיוק בתנועה, יציבה, שליטה ומודעות גוף. אימוני כוח רגילים מתמקדים בכבדות. בשיעור אצלנו משלבים את שניהם – כוח עם דיוק.'
    }
  ]

  return (
    <div dir="rtl" lang="he" style={{ background: '#FDF7F3', minHeight: '100vh' }}>
      <Hero {...heroData} />
      <TextImage {...introData} />
      <CardsGrid
        eyebrow="איך זה עובד"
        title="העקרונות שלנו"
        cards={cardsData}
        gridImage="https://placehold.co/1140x600/6C715D/FAEFE6?text=Our+Approach"
      />
      <FAQAccordion
        eyebrow="שאלות נפוצות"
        title="אנחנו כאן כדי לענות על הכל"
        faqs={faqData}
      />
    </div>
  )
}

export default PilatesForAthletes
