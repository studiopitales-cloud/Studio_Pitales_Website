import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutUs from './components/AboutUs'
import Team from './components/Team'
import Levels from './components/Levels'
import Gallery from './components/Gallery'
import Footer from './components/Footer'
import ContactSheet from './components/ContactSheet'
import Privacy from './components/Privacy'

function Home() {
  return (
    <>
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </BrowserRouter>
  )
}
