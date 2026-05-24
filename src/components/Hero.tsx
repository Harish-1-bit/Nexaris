import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import HexGrid from './HexGrid'


export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 }) // % values for spotlight

  // Spring-smoothed mouse for blob parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)


  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const fadeOut   = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  useEffect(() => {
    let rafId = 0
    let pending = false
    const onMove = (e: MouseEvent) => {
      if (pending) return
      pending = true
      rafId = requestAnimationFrame(() => {
        const w = window.innerWidth
        const h = window.innerHeight
        // Spotlight position as percentage
        setMousePos({ x: (e.clientX / w) * 100, y: (e.clientY / h) * 100 })
        // Blob parallax offset
        mouseX.set(((e.clientX / w) - 0.5) * 32)
        mouseY.set(((e.clientY / h) - 0.5) * 20)
        pending = false
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafId) }
  }, [mouseX, mouseY])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: 620, background: '#000000' }}
    >
      {/* ── INTERACTIVE MOUSE-TRACKED RADIAL SPOTLIGHT ── */}
      <div
        className="absolute inset-0 pointer-events-none transition-none"
        style={{
          background: `radial-gradient(ellipse 55% 55% at ${mousePos.x}% ${mousePos.y}%,
            rgba(255,30,30,0.15) 0%,
            rgba(255,94,0,0.08) 30%,
            rgba(255,30,30,0.04) 55%,
            transparent 75%)`,
          willChange: 'background',
        }}
      />

      {/* ── STATIC BASE GLOW — bottom-center ambient ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,30,30,0.18) 0%, rgba(255,94,0,0.08) 40%, transparent 70%)',
        }}
      />

      {/* ── UNIFIED PARALLAX WRAPPER (handles scroll parallax & fadeOut) ── */}
      <motion.div
        style={{ y: parallaxY, opacity: fadeOut, willChange: 'transform, opacity' }}
        className="absolute inset-0 z-10 pointer-events-none"
      >
        {/* ── ISOMETRIC HEX GRID BACKDROP ── */}
        <div className="absolute inset-0 w-full h-full pointer-events-auto">
          <HexGrid />
        </div>

        {/* ── TEXT CONTENT (absolute positioned inside unified wrapper) ── */}
        <div className="absolute bottom-[14vh] left-8 md:left-14 z-20 max-w-[660px] pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#FF5E00' }} />
            <span className="text-xs font-medium tracking-[0.22em] uppercase" style={{ color: '#FF5E00' }}>
              Digital Innovation Studio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold leading-[1.05] tracking-tight"
            style={{ fontSize: 'clamp(2.8rem, 6.4vw, 5.8rem)', color: '#F0EEF8' }}
          >
            A digital studio<br />
            built for your<br />
            <span style={{
              background: 'linear-gradient(135deg, #F0EEF8 0%, #FF7A29 45%, #FF1E1E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              ambition.
            </span>
          </motion.h1>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex items-center gap-4 mt-8 pointer-events-auto"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 32px rgba(255,94,0,0.40)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-7 py-3.5 rounded-xl text-sm font-semibold cursor-pointer"
              style={{ background: 'linear-gradient(135deg,#FF5E00,#FF1E1E)', color: '#fff' }}
            >
              Explore Services
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, borderColor: 'rgba(255,94,0,0.4)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-7 py-3.5 rounded-xl text-sm font-medium transition-all duration-250 cursor-pointer"
              style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(240,238,248,0.75)' }}
            >
              View Our Work
            </motion.button>
          </motion.div>
        </div>

        {/* ── DESCRIPTION (bottom-right of the same wrapper) ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.0 }}
          style={{ color: 'rgba(155,147,184,0.85)' }}
          className="absolute bottom-[11vh] right-8 md:right-14 z-20 max-w-[240px] text-right text-sm leading-relaxed pointer-events-none"
        >
          IT services &amp; digital solutions studio. We create visual identities and
          digital experiences that truly reflect who you are.
        </motion.p>
      </motion.div>

      {/* ── SCROLL LINE indicator ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
      >
        <motion.div
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 origin-top"
          style={{ background: 'linear-gradient(to bottom,rgba(255,94,0,.8),transparent)', willChange: 'transform, opacity' }}
        />
      </motion.div>
    </section>
  )
}
