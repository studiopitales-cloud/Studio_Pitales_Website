import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
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
      className="flex flex-col bg-white rounded-2xl overflow-hidden h-full"
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
          <h3 className="text-[20px] md:text-[22px] font-bold text-[#1a1a1a] leading-snug tracking-[-0.02em] mb-3">
            {post.title}
          </h3>
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

export default function BlogSection() {
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true, margin: '-8%' })

  const posts = POSTS.slice(0, 3)

  return (
    <section className="bg-[#f0ece4] pt-10 md:pt-14 pb-0" dir="rtl">
      <div>

        <div ref={headerRef} className="text-center mb-8 md:mb-10 px-4 md:px-16">
          <div className="inline-block">
            <motion.h2
              className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] text-[#1a1a1a] leading-none"
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
            >
              מאמרים על פילאטיס
            </motion.h2>
            <motion.div
              className="h-[3px] bg-[#92a6b4] mt-3 origin-right"
              style={{ width: '100%' }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            />
          </div>
        </div>

        <div className="mx-4 md:mx-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <div key={post.slug} className={i > 0 ? 'hidden md:flex md:flex-col' : 'flex flex-col'}>
              <BlogCard post={post} index={i} />
            </div>
          ))}
        </div>

        <div className="mt-8 pb-0 text-center mx-4 md:mx-20">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[15px] font-bold px-5 py-2 rounded-xl bg-white group"
            style={{ color: '#1a1a1a', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:scale-125 shrink-0">
              <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="transition-transform duration-200 group-hover:scale-[1.04] inline-block origin-right">לכל המאמרים</span>
          </Link>
        </div>

      </div>
    </section>
  )
}
