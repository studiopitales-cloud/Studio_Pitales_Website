import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { smoothScrollTo } from './utils/scroll'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutUs from './components/AboutUs'
import Team from './components/Team'
import Levels from './components/Levels'
import Reviews from './components/Reviews'
import Instagram from './components/Instagram'
import BlogSection from './components/BlogSection'
import Footer from './components/Footer'
import ContactSheet from './components/ContactSheet'
import Preloader from './components/Preloader'

const Privacy       = lazy(() => import('./components/Privacy'))
const Accessibility = lazy(() => import('./components/Accessibility'))
const Terms         = lazy(() => import('./components/Terms'))
const Blog          = lazy(() => import('./pages/Blog'))
const BlogPost      = lazy(() => import('./pages/BlogPost'))

const PRELOADER_KEY = 'pitales_preloader_seen'

function Home() {
  const [showPreloader, setShowPreloader] = useState(() => !sessionStorage.getItem(PRELOADER_KEY))
  const location = useLocation()

  const handleDone = () => {
    sessionStorage.setItem(PRELOADER_KEY, '1')
    setShowPreloader(false)
  }

  useEffect(() => {
    const target = location.state?.scrollTo
    if (!target) return
    const t = setTimeout(() => smoothScrollTo(target), 150)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!location.state?.openContact) return
    const t = setTimeout(() => document.dispatchEvent(new CustomEvent('openContactSheet')), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      {showPreloader && <Preloader onDone={handleDone} />}
      <Navbar />
      <main>
        <Hero />
        <AboutUs />
        <Levels />
        <Team />
        <Reviews />
        <BlogSection />
        <Instagram />
        <Footer />
      </main>
      <ContactSheet />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-[#f0ece4]" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
