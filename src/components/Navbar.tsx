import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work',     href: '#work'     },
  { label: 'About',    href: '#about'    },
  { label: 'Contact',  href: '#contact'  },
]

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [activeLink, setActiveLink] = useState('')

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (href: string) => {
    setActiveLink(href); setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 transition-all duration-400"
        style={{
          background:     scrolled ? 'rgba(8,5,16,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(18px)'        : 'none',
          borderBottom:   scrolled ? '1px solid rgba(168,85,247,0.10)' : 'none',
          padding:        scrolled ? '12px 0' : '22px 0',
        }}
      >
        <div className="max-w-6xl mx-auto px-8 md:px-14 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-2.5"
          >
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-lg"
                style={{ background: 'linear-gradient(135deg,#6C3BFF,#EC4899)' }} />
              <div className="absolute inset-[1.5px] rounded-md flex items-center justify-center"
                style={{ background: '#080510' }}>
                <span className="font-display font-black text-[11px]"
                  style={{ background: 'linear-gradient(135deg,#A855F7,#EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  N
                </span>
              </div>
            </div>
            <span className="font-display font-bold text-base tracking-tight" style={{ color: '#F0EEF8' }}>
              Nexaris
            </span>
          </motion.a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button key={link.href} onClick={() => go(link.href)}
                className="relative text-sm font-medium transition-colors duration-250 group"
                style={{ color: activeLink === link.href ? '#C084FC' : 'rgba(155,147,184,0.75)' }}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px transition-all duration-300 group-hover:w-full"
                  style={{ width: activeLink === link.href ? '100%' : '0%', background: 'linear-gradient(to right,#6C3BFF,#EC4899)' }} />
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <motion.button
              onClick={() => go('#contact')}
              whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(168,85,247,0.35)' }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-250"
              style={{ background: 'linear-gradient(135deg,#6C3BFF,#EC4899)' }}
            >
              Contact us
            </motion.button>
          </div>

          <button className="md:hidden p-1.5" style={{ color: 'rgba(240,238,248,0.7)' }}
            onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 flex flex-col pt-20 px-8"
            style={{ background: 'rgba(8,5,16,0.97)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link, i) => (
                <motion.button key={link.href}
                  initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => go(link.href)}
                  className="text-left font-display font-bold text-3xl transition-colors"
                  style={{ color: '#F0EEF8' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#C084FC')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#F0EEF8')}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                onClick={() => go('#contact')}
                className="mt-4 px-6 py-3.5 rounded-xl font-semibold text-base self-start text-white"
                style={{ background: 'linear-gradient(135deg,#6C3BFF,#EC4899)' }}
              >
                Contact us
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
