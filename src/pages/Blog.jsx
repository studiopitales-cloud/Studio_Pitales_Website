import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { POSTS } from '../data/blogPosts'

const EASE = [0.16, 1, 0.3, 1]

function BlogCard({ post, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      className="flex flex-col bg-white rounded-2xl overflow-hidden"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}
    >
      <Link to={`/blog/${post.slug}`} className="overflow-hidden block" style={{ aspectRatio: '16/10' }}>
        <img
          src={post.img}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </Link>

      <div className="flex flex-col flex-1 p-6 text-right" dir="rtl">
        <Link to={`/blog/${post.slug}`} className="hover:opacity-75 transition-opacity duration-200">
          <h2 className="text-[20px] md:text-[22px] font-bold text-[#1a1a1a] leading-snug tracking-[-0.02em] mb-3">
            {post.title}
          </h2>
        </Link>

        <p className="text-[14px] md:text-[15px] font-normal text-[#1a1a1a]/65 leading-[1.9] flex-1 mb-5">
          {post.excerpt}
        </p>

        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 font-medium text-[16px] self-start cursor-pointer"
          style={{ color: '#1a1a1a' }}
        >
          למאמר המלא
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </motion.article>
  )
}

export default function Blog() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-5%' })

  return (
    <>
      <Navbar forceScrolled />
      <main className="min-h-screen bg-[#f0ece4]" dir="rtl">

        {/* Header */}
        <div ref={headerRef} className="pt-[120px] pb-10 px-8 md:px-16 text-center">
          <div className="inline-block">
            <motion.h1
              className="text-[28px] md:text-[36px] font-bold text-[#1a1a1a] tracking-[-0.02em] leading-none"
              initial={{ opacity: 0, y: 18 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE }}
            >
              מאמרים על פילאטיס
            </motion.h1>
            <motion.div
              className="h-[3px] bg-[#92a6b4] mt-3 mb-5"
              initial={{ scaleX: 0 }}
              animate={headerInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              style={{ originX: 'right' }}
            />
          </div>
          <motion.p
            className="text-[#1a1a1a]/60 font-normal"
            style={{ fontSize: 'clamp(16px, 1.45vw, 18px)' }}
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            מידע, טיפים והשראה מעולם הפילאטיס
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="mx-4 md:mx-20 pb-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POSTS.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
