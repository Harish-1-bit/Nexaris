import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import ServicesOverview from './components/ServicesOverview'
import Work from './components/Work'
import About from './components/About'
import AboutTHH from './components/AboutTHH'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Testimonials from './components/Testimonials'
import CursorGlow from './components/CursorGlow'
import PageWrapper from './components/PageWrapper'
import ScrollToTop from './components/ScrollToTop'
import ExploreCanvas from './components/ExploreCanvas'
import Preloader from './components/Preloader'

function Home() {
  return (
    <PageWrapper>
      <Hero />
      <Marquee />
      <Services />
      <Work />
      <Testimonials />
      <About />
      <ExploreCanvas />
      <Process />
      <Contact />
    </PageWrapper>
  )
}

function ServicesPage() {
  return (
    <PageWrapper>
      <ServicesOverview />
    </PageWrapper>
  )
}

function WorkPage() {
  return (
    <PageWrapper>
      <Work />
      <Testimonials />
      <Contact />
    </PageWrapper>
  )
}

function AboutPage() {
  return (
    <PageWrapper>
      <AboutTHH />
    </PageWrapper>
  )
}

function ContactPage() {
  return (
    <PageWrapper>
      <Contact />
    </PageWrapper>
  )
}


function AppContent() {
  const location = useLocation()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isLoaded])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-[#F0EEF8]">
      <AnimatePresence>
        {!isLoaded && (
          <Preloader onComplete={() => setIsLoaded(true)} key="preloader" />
        )}
      </AnimatePresence>

      <ScrollToTop />
      <Navbar />
      <CursorGlow />
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
