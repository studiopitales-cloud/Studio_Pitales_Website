import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutUs from './components/AboutUs'
import Team from './components/Team'
import Levels from './components/Levels'
import Gallery from './components/Gallery'
import Footer from './components/Footer'
import ContactSheet from './components/ContactSheet'
import Privacy from './components/Privacy'
import Accessibility from './components/Accessibility'
import Terms from './components/Terms'
import Preloader from './components/Preloader'

const alreadySeen = sessionStorage.getItem('preloader_done')

function Home() {
  const [showPreloader, setShowPreloader] = useState(!alreadySeen)

  const handleDone = () => {
    sessionStorage.setItem('preloader_done', '1')
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
        <Gallery />
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
