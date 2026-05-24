import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Horizon from './components/Horizon'
import Marquee from './components/Marquee'
import Services from './components/Services'
import Work from './components/Work'
import Testimonials from './components/Testimonials'
import About from './components/About'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: '#080510' }}>
      <Navbar />
      <main>
        <Hero />
        <Horizon />
        <Marquee />
        <Services />
        <Work />
        <Testimonials />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
