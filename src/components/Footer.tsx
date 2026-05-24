import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'

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

const STREAKS = [0, 1, 2, 3, 4, 5]

export default function Footer() {
  const ctaRef  = useRef(null)
  const ctaInView  = useInView(ctaRef,  { once: true, margin: '-80px' })
  const infoRef = useRef(null)
  const infoInView = useInView(infoRef, { once: true, margin: '-60px' })

  return (
    <footer className="relative overflow-hidden" style={{ background: '#000' }}>

      {/* ── CTA AURORA BANNER ── */}
      <div ref={ctaRef} className="relative w-full overflow-hidden" style={{ height: 340 }}>
        <div className="absolute inset-0" style={{ background: '#000' }} />

        {/* Main glow — CSS animation, GPU only */}
        <div
          className="footer-glow absolute rounded-full"
          style={{
            top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 600, height: 260,
            background: 'radial-gradient(ellipse at center, rgba(168,85,247,0.52) 0%, rgba(108,59,255,0.32) 40%, transparent 75%)',
            filter: 'blur(40px)',
            willChange: 'transform, opacity',
          }}
        />
        {/* Inner glow */}
        <div
          className="footer-glow-b absolute rounded-full"
          style={{
            top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 380, height: 170,
            background: 'radial-gradient(ellipse at center, rgba(168,85,247,0.58) 0%, rgba(108,59,255,0.28) 50%, transparent 80%)',
            filter: 'blur(28px)',
            willChange: 'transform, opacity',
          }}
        />

        {/* Vertical streaks — CSS animation */}
        {STREAKS.map((i) => (
          <div
            key={i}
            className="footer-streak absolute top-0 bottom-0 rounded-full"
            style={{
              left: `${38 + i * 4}%`,
              width: 2,
              background: 'linear-gradient(to bottom, transparent, rgba(168,85,247,0.42), rgba(108,59,255,0.52), rgba(168,85,247,0.32), transparent)',
              filter: 'blur(3px)',
              animationDelay: `${i * 0.42}s`,
              animationDuration: `${3 + i * 0.65}s`,
              willChange: 'transform, opacity',
            }}
          />
        ))}

        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-1/3 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right,#000,transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-1/3 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left,#000,transparent)' }} />
        <div className="absolute top-0 inset-x-0 h-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom,#000,transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to top,#000,transparent)' }} />

        {/* CTA card */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md w-full text-center px-10 py-8 rounded-2xl"
            style={{
              background: 'rgba(0,0,0,0.48)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(168,85,247,0.12)',
            }}
          >
            <h2
              className="font-display font-bold text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(1.3rem, 2.8vw, 1.9rem)' }}
            >
              Ready to build a brand that<br />matches your ambition?
            </h2>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 28px rgba(168,85,247,0.38)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold"
              style={{ background: 'linear-gradient(135deg,#A855F7,#6C3BFF)', color: '#000' }}
            >
              Let's talk <ArrowRight size={13} />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* ── INFO STRIP ── */}
      <div
        ref={infoRef}
        className="relative z-10"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#000' }}
      >
        <div className="max-w-6xl mx-auto px-8 md:px-14 py-10">
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
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-5 py-2 rounded-lg text-xs font-medium text-white transition-all duration-250"
                style={{ border: '1px solid rgba(255,255,255,0.18)' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(168,85,247,0.4)')}
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
                      onClick={(e) => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }) }}
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
                        <Icon size={12} style={{ color: 'rgba(168,85,247,0.55)', flexShrink: 0 }} />
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
      <div className="relative overflow-hidden select-none" style={{ background: '#000' }}>
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
