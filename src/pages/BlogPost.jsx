import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import { BottomBar } from '../components/Footer'
import { POSTS } from '../data/blogPosts'

const EASE = [0.16, 1, 0.3, 1]

function renderBlock(block, i) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 key={i} className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] tracking-[-0.02em] mt-4 md:mt-6 mb-1 md:mb-2">
          {block.text}
        </h2>
      )
    case 'p':
      return (
        <p key={i} className="font-normal leading-[2.0] text-[#1a1a1a]" style={{ fontSize: 'clamp(16px, 1.45vw, 18px)' }}>
          {block.text}
        </p>
      )
    case 'list':
      return (
        <ul key={i} className="flex flex-col gap-2 my-2">
          {block.items.map((item, j) => (
            <li key={j} className="flex gap-2 items-baseline font-normal leading-[1.85] text-[#1a1a1a]" style={{ fontSize: 'clamp(16px, 1.45vw, 18px)' }}>
              <span className="shrink-0 translate-y-[-0.12em] w-[6px] h-[6px] rounded-full bg-[#92a6b4] inline-block" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    default:
      return null
  }
}

const BackButton = () => (
  <Link
    to="/blog"
    className="inline-flex items-center gap-2 text-[15px] font-bold mb-8 px-5 py-2 rounded-xl bg-white group"
    style={{ color: '#1a1a1a', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
  >
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:scale-125 shrink-0">
      <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <span className="transition-transform duration-200 group-hover:scale-[1.04] inline-block origin-right">חזרה למאמרים</span>
  </Link>
)

function ArticleBody({ post }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
      <div className="inline-block mb-8">
        <h1 className="text-[26px] md:text-[36px] font-bold text-[#1a1a1a] tracking-[-0.025em] leading-tight mb-3">
          {post.title}
        </h1>
        <div className="h-[3px] bg-[#92a6b4]" />
      </div>
      <div className="flex flex-col gap-2 md:gap-3">
        {post.content.map((block, i) => renderBlock(block, i))}
      </div>
      <div className="mt-12 rounded-2xl p-7 text-center" style={{ background: 'rgba(146,166,180,0.12)', border: '1px solid rgba(146,166,180,0.25)' }}>
        <p className="font-bold text-[18px] text-[#1a1a1a] mb-2">רוצה לנסות פילאטיס מכשירים?</p>
        <p className="text-[15px] text-[#1a1a1a]/60 mb-5">הצטרפי לשיעור היכרות בסטודיו PITALES</p>
        <a
          href="/#contact"
          onClick={e => { e.preventDefault(); document.dispatchEvent(new CustomEvent('openContactSheet')) }}
          className="inline-block text-[18px] tracking-normal font-medium text-[#1a1a1a] whitespace-nowrap px-5 py-[7px] rounded-full transition-[background-color,opacity] duration-[420ms]"
          style={{ backgroundColor: '#92a6b4' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#7a95a5'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#92a6b4'}
        >
          לתיאום שיעור היכרות
        </a>
      </div>
    </motion.div>
  )
}

function MoreArticles({ others }) {
  if (!others.length) return null
  return (
    <div className="max-w-[1100px] mx-auto px-8 pb-6">
      <h3 className="font-bold text-[22px] text-[#1a1a1a] mb-5 tracking-[-0.02em]">מאמרים נוספים</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {others.map((p, idx) => (
          <div key={p.slug} className="flex items-center gap-3 group">
            {idx === 0 && (
              <Link to={`/blog/${p.slug}`} className="hidden md:flex shrink-0 items-center justify-center w-9 h-9 text-[#1a1a1a] transition-transform duration-200 group-hover:scale-125">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            )}
            <Link to={`/blog/${p.slug}`} className="flex flex-1 bg-white rounded-xl overflow-hidden items-center" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div className="md:hidden flex items-center justify-center px-4 self-stretch shrink-0 text-[#1a1a1a]">
                {idx === 0
                  ? <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                }
              </div>
              <div className="py-4 px-5 flex flex-col justify-center flex-1">
                <p className="text-[16px] font-bold text-[#1a1a1a] leading-snug tracking-[-0.01em] transition-transform duration-200 group-hover:scale-[1.04] origin-right inline-block">{p.title}</p>
              </div>
            </Link>
            {idx === 1 && (
              <Link to={`/blog/${p.slug}`} className="hidden md:flex shrink-0 items-center justify-center w-9 h-9 text-[#1a1a1a] transition-transform duration-200 group-hover:scale-125">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const BASE = 'https://www.studiopitales.co.il'

function BlogPostContent({ post }) {
  const currentIndex = POSTS.findIndex(p => p.slug === post.slug)
  const prevIndex = currentIndex === 0 ? POSTS.length - 1 : currentIndex - 1
  const nextIndex = currentIndex === POSTS.length - 1 ? 0 : currentIndex + 1
  const others = [POSTS[prevIndex], POSTS[nextIndex]]

  useEffect(() => {
    const prevTitle = document.title
    document.title = `${post.title} | Studio Pitales`

    const getMeta = name => {
      let el = document.querySelector(`meta[name="${name}"]`)
      const existed = !!el
      const prev = el?.getAttribute('content')
      if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el) }
      el.setAttribute('content', post.excerpt)
      return () => { if (existed) el.setAttribute('content', prev); else el.remove() }
    }
    const restoreDesc = getMeta('description')

    let canonEl = document.querySelector('link[rel="canonical"]')
    const canonExisted = !!canonEl
    const prevCanon = canonEl?.getAttribute('href')
    if (!canonEl) { canonEl = document.createElement('link'); canonEl.rel = 'canonical'; document.head.appendChild(canonEl) }
    canonEl.setAttribute('href', `${BASE}/blog/${post.slug}`)

    const ldEl = document.createElement('script')
    ldEl.type = 'application/ld+json'
    ldEl.id = 'article-ld'
    ldEl.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: `${BASE}${post.img}`,
      datePublished: post.date,
      inLanguage: 'he-IL',
      url: `${BASE}/blog/${post.slug}`,
      author: { '@type': 'Organization', name: 'Studio Pitales', url: BASE },
      publisher: { '@type': 'Organization', name: 'Studio Pitales', url: BASE },
    })
    document.head.appendChild(ldEl)

    return () => {
      document.title = prevTitle
      restoreDesc()
      if (canonExisted) canonEl.setAttribute('href', prevCanon); else canonEl.remove()
      document.getElementById('article-ld')?.remove()
    }
  }, [post.slug])

  return (
    <>
      <Navbar forceScrolled />
      <main className="min-h-screen bg-[#f0ece4]" dir="rtl">

        {/* Hero image — starts below navbar on mobile so object-top shows true image top */}
        <div className="w-full overflow-hidden relative mt-[92px] h-[calc(65vh-92px)] md:mt-0 md:h-[65vh]">
          <img src={post.img} alt={post.title} className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 55% at 50% calc(50% + 46px), rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.22) 100%)' }} />
          <div className="absolute z-10 md:hidden" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '65vw', height: '65vw' }}>
            <div className="w-full h-full animate-[spin_22s_linear_infinite]" style={{ opacity: 0.5 }}>
              <img src="/brand_assets/tal_slogan_.svg" alt="" className="w-full h-full" style={{ filter: 'brightness(0) invert(1)' }} />
            </div>
          </div>
        </div>

        {/* Article */}
        <div className="max-w-[1100px] mx-auto px-8 py-10">
          <BackButton />
          <ArticleBody post={post} />
        </div>

        <MoreArticles others={others} />

      </main>
      <div className="pb-5" />
      <BottomBar />
    </>
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = POSTS.find(p => p.slug === slug)
  if (!post) return <Navigate to="/blog" replace />
  return <BlogPostContent post={post} />
}
