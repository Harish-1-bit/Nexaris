import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
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
import Story from './components/Story'
import CursorGlow from './components/CursorGlow'
import PageWrapper from './components/PageWrapper'
import ScrollToTop from './components/ScrollToTop'

function Home() {
  return (
    <PageWrapper>
      <Hero />
      <Horizon />
      <Marquee />
      <Services />
      <Work />
      <Testimonials />
      <About />
      <Process />
      <Contact />
    </PageWrapper>
  )
}

function ServicesPage() {
  return (
    <PageWrapper>
      <Services />
      <Process />
      <Contact />
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
      <About />
      <Story />
      <Testimonials />
      <Contact />
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

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-[#F0EEF8]">
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
