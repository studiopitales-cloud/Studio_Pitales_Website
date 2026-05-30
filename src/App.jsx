import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
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
import Privacy from './components/Privacy'
import Accessibility from './components/Accessibility'
import Terms from './components/Terms'
import Preloader from './components/Preloader'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'

const PRELOADER_KEY = 'pitales_preloader_seen'

function smoothScroll(id) {
  const el = document.querySelector(id)
  if (!el) return
  window.__progScroll = true
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 92, behavior: 'smooth' })
  setTimeout(() => { window.__progScroll = false }, 1400)
}

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
    const t = setTimeout(() => smoothScroll(target), 150)
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  )
}
