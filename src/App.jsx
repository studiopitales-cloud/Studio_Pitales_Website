import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutUs from './components/AboutUs'
import Team from './components/Team'
import Levels from './components/Levels'
import Gallery from './components/Gallery'
import Footer from './components/Footer'
import ContactSheet from './components/ContactSheet'

export default function App() {
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
