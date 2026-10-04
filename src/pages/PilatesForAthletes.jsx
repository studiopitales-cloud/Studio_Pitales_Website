import { useState } from 'react'
import Hero from '../components/landing/Hero'
import TextImage from '../components/landing/TextImage'
import CardsGrid from '../components/landing/CardsGrid'
import FAQAccordion from '../components/landing/FAQAccordion'

const PilatesForAthletes = () => {
  const heroData = {
    bgImage: 'https://placehold.co/1440x600/6C715D/FAEFE6?text=Athletes+Pilates',
    title: 'פילאטיס לספורטאים',
    subtitle: 'חיזוק, דיוק והתמודדות עם פציעות – הדרך של האתלטים המובילים בעולם',
    ctaText: 'בואי להתחיל',
    ctaHref: '#contact'
  }

  const introData = {
    title: ['פילאטיס', 'לספורטאים'],
    text: 'ספורטאים מקצועיים משתמשים בפילאטיס לא רק לשיפור ביצועים, אלא גם למניעת פציעות וחזרה בטוחה לאימונים אחרי שיקום. כי גוף חזק ודיוק בתנועה הם הסוד של אתלט שנשאר בבריאות.',
    image: 'https://placehold.co/560x400/FAEFE6/6C715D?text=Athlete+Training'
  }

  const cardsData = [
    {
      title: 'חיזוק יציבה',
      text: 'שרירי הליבה והעמוד השדרה מתחזקים בדיוק, מה שמונע כאבים ושפר ביצועים בכל ספורט.'
    },
    {
      title: 'מניעת פציעות',
      text: 'עבודה על שיווי משקל, גמישות וקואורדינציה מפחיתה משמעותית את סיכון הפציעות.'
    },
    {
      title: 'שיקום מהיר',
      text: 'חזרה בטוחה לאימונים לאחר פציעה או ניתוח, עם שליטה מלאה על התנועה.'
    }
  ]

  const faqData = [
    {
      question: 'האם אני צריך ניסיון בפילאטיס כדי להתחיל?',
      answer: 'לא כלל. המדריכות שלנו יותאימו את כל תרגיל ליכולת שלך, בין אם זו הפעם הראשונה או אתה מתאמן שנים.'
    },
    {
      question: 'כמה פעמים בשבוע כדאי להתאמן?',
      answer: '2-3 פעמים בשבוע אידיאליים לתוצאות משמעותיות. גם פעם אחת בשבוע מהווה השלמה טובה לשגרת האימונים שלך.'
    },
    {
      question: 'האם פילאטיס יכול לעזור בשיקום פציעות?',
      answer: 'כן, בוודאות. העבודה מבוקרת בדיוק, והציוד מאפשר תמיכה מלאה תוך חיזוק בטוח של האזורים הפגועים.'
    },
    {
      question: 'מה ההבדל בין פילאטיס לאימוני כוח רגילים?',
      answer: 'פילאטיס מתמקד בדיוק בתנועה, יציבה ושליטה, בעוד שאימוני כוח רגילים מתמקדים בעלייה של משקל. בשיעור אצלנו משלבים את שניהם.'
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
