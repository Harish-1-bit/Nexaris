import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Work',     href: '/work'     },
  { label: 'About',    href: '/about'    },
  { label: 'Contact',  href: '/contact'  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const isActive = (path: string) => location.pathname === path

  return (
    <>
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 transition-all duration-400"
        style={{
          background:     scrolled ? 'rgba(0,0,0,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(18px)'        : 'none',
          borderBottom:   scrolled ? '1px solid rgba(48,102,190,0.10)' : 'none',
          padding:        scrolled ? '12px 0' : '22px 0',
        }}
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 flex items-center justify-between">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.03 }}>
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-lg"
                  style={{ background: 'linear-gradient(135deg,#3066BE,#EF3E36)' }} />
                <div className="absolute inset-[1.5px] rounded-md flex items-center justify-center"
                  style={{ background: '#000000' }}>
                  <span className="font-display font-black text-[11px]"
                    style={{ background: 'linear-gradient(135deg,#3066BE,#EF3E36)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    N
                  </span>
                </div>
              </div>
              <span className="font-display font-bold text-base tracking-tight" style={{ color: '#F5FBEF' }}>
                Nexaris
              </span>
            </Link>
          </motion.div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="relative text-sm font-medium transition-colors duration-250 group cursor-pointer py-1"
                style={{ color: isActive(link.href) ? '#3066BE' : 'rgba(155,147,184,0.75)' }}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px transition-all duration-300 group-hover:w-full"
                  style={{ width: isActive(link.href) ? '100%' : '0%', background: 'linear-gradient(to right,#3066BE,#EF3E36)' }} />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <motion.div whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(48, 102, 190, 0.35)' }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact"
                className="inline-block px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-250 cursor-pointer"
                style={{ background: '#3066BE', color: '#FFFFFF' }}
              >
                Contact us
              </Link>
            </motion.div>
          </div>

          <button className="md:hidden p-1.5 cursor-pointer" style={{ color: 'rgba(245,251,239,0.7)' }}
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
            style={{ background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-left font-display font-bold text-3xl transition-colors block cursor-pointer"
                    style={{ color: isActive(link.href) ? '#3066BE' : '#F5FBEF' }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="mt-4 inline-block px-6 py-3.5 rounded-xl font-semibold text-base text-center text-white cursor-pointer"
                  style={{ background: '#3066BE' }}
                >
                  Contact us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
