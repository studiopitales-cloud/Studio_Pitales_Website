import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutUs from './components/AboutUs'
import Team from './components/Team'
import Levels from './components/Levels'
import Reviews from './components/Reviews'
import Instagram from './components/Instagram'
import Footer from './components/Footer'
import ContactSheet from './components/ContactSheet'
import Privacy from './components/Privacy'
import Accessibility from './components/Accessibility'
import Terms from './components/Terms'
import Preloader from './components/Preloader'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'

let hasSeenPreloader = false

function Home() {
  const [showPreloader, setShowPreloader] = useState(!hasSeenPreloader)

  const handleDone = () => {
    hasSeenPreloader = true
    setShowPreloader(false)
  }

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
