import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutUs from './components/AboutUs'
import Team from './components/Team'
import Levels from './components/Levels'
import Instagram from './components/Instagram'
import Footer from './components/Footer'
import ContactSheet from './components/ContactSheet'
import Privacy from './components/Privacy'
import Accessibility from './components/Accessibility'
import Terms from './components/Terms'
import Preloader from './components/Preloader'

function Home() {
  const [showPreloader, setShowPreloader] = useState(true)

  const handleDone = () => setShowPreloader(false)

  return (
    <>
      {showPreloader && <Preloader onDone={handleDone} />}
      <Navbar />
      <main>
        <Hero />
        <AboutUs />
        <Levels />
        <Team />
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
      </Routes>
    </BrowserRouter>
  )
}
