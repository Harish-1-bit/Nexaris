import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#work' },
  { label: 'About',    href: '#about'   },
  { label: 'Contact',  href: '#contact' },
]

const contactDetails = [
  { icon: Mail,  value: 'hello@nexaris.io',   href: 'mailto:hello@nexaris.io' },
  { icon: Phone, value: '+1 (555) 000-0000',  href: 'tel:+15550000000'        },
  { icon: MapPin,value: 'San Francisco, CA',  href: '#'                       },
]

export default function Footer() {
  const infoRef = useRef(null)
  const infoInView = useInView(infoRef, { once: true, margin: '-60px' })

  return (
    <footer className="relative overflow-hidden" style={{ background: '#000000' }}>



      {/* ── INFO STRIP ── */}
      <div
        ref={infoRef}
        className="relative z-10"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#000000' }}
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={infoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55 }}
            >
              <p className="font-display font-semibold text-white text-sm leading-snug mb-1">
                You have a project idea?
              </p>
              <p className="font-display font-semibold text-white text-sm leading-snug mb-5">
                Let's talk about it.
              </p>
              <button
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/contact';
                  }
                }}
                className="px-5 py-2 rounded-lg text-xs font-medium text-white transition-all duration-250 cursor-pointer"
                style={{ border: '1px solid rgba(255,255,255,0.18)' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(48,102,190,0.4)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)')}
              >
                Contact us
              </button>
            </motion.div>

            {/* Center — nav */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={infoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              <p className="text-xs font-medium tracking-[0.18em] uppercase mb-4"
                style={{ color: 'rgba(160,168,192,0.5)' }}>
                Pages
              </p>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.querySelector(link.href);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          // navigate based on mapping
                          const path = link.href === '#services' ? '/services' : 
                                       link.href === '#work' ? '/work' :
                                       link.href === '#about' ? '/about' :
                                       link.href === '#contact' ? '/contact' : '/';
                          window.location.href = path;
                        }
                      }}
                      className="text-sm transition-colors duration-200"
                      style={{ color: 'rgba(160,168,192,0.7)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#e8eaf0')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(160,168,192,0.7)')}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right — contact */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={infoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.16 }}
            >
              <p className="text-xs font-medium tracking-[0.18em] uppercase mb-4"
                style={{ color: 'rgba(160,168,192,0.5)' }}>
                Contact
              </p>
              <ul className="space-y-3">
                {contactDetails.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.value}>
                      <a href={item.href}
                        className="flex items-center gap-2.5 text-sm transition-colors duration-200 group"
                        style={{ color: 'rgba(160,168,192,0.7)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#e8eaf0')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(160,168,192,0.7)')}
                      >
                        <Icon size={12} style={{ color: 'rgba(48,102,190,0.55)', flexShrink: 0 }} />
                        {item.value}
                      </a>
                    </li>
                  )
                })}
              </ul>
              <div className="flex gap-5 mt-6">
                {['Privacy', 'Terms'].map((t) => (
                  <a key={t} href="#"
                    className="text-xs transition-colors duration-200"
                    style={{ color: 'rgba(160,168,192,0.35)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(160,168,192,0.7)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(160,168,192,0.35)')}
                  >
                    {t}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── GIANT WORDMARK ── */}
      <div className="relative overflow-hidden select-none" style={{ background: '#000000' }}>
        <div className="absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(to right,transparent,rgba(255,255,255,0.05),transparent)' }} />
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center overflow-hidden pt-2"
        >
          <span
            className="font-display font-black leading-none tracking-tighter block"
            style={{
              fontSize: 'clamp(5rem, 18vw, 16rem)',
              letterSpacing: '-0.02em',
              color: 'rgba(255,255,255,0.055)',
            }}
          >
            NEXARIS
          </span>
        </motion.div>
        <div className="text-center pb-5 -mt-3">
          <p className="text-xs" style={{ color: 'rgba(160,168,192,0.25)' }}>
            © {new Date().getFullYear()} Nexaris. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
