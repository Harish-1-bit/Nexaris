import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

const COLS = 10

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 }) // % values for spotlight

  // Spring-smoothed mouse for blob parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const blobX  = useSpring(mouseX, { stiffness: 22, damping: 24, restDelta: 0.001 })
  const blobMY = useSpring(mouseY, { stiffness: 22, damping: 24, restDelta: 0.001 })

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
      style={{ height: '100svh', minHeight: 620, background: '#080510' }}
    >
      {/* ── INTERACTIVE MOUSE-TRACKED RADIAL SPOTLIGHT ── */}
      <div
        className="absolute inset-0 pointer-events-none transition-none"
        style={{
          background: `radial-gradient(ellipse 55% 55% at ${mousePos.x}% ${mousePos.y}%,
            rgba(108,59,255,0.18) 0%,
            rgba(168,85,247,0.10) 30%,
            rgba(236,72,153,0.06) 55%,
            transparent 75%)`,
          willChange: 'background',
        }}
      />

      {/* ── STATIC BASE GLOW — bottom-center ambient ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(108,59,255,0.22) 0%, rgba(236,72,153,0.10) 40%, transparent 70%)',
        }}
      />

      {/* ── AURORA BLOB — right side, new violet/magenta palette ── */}
      <motion.div
        style={{ y: parallaxY, opacity: fadeOut, x: blobX, willChange: 'transform, opacity' }}
        className="absolute inset-y-0 right-0 w-[60%] pointer-events-none"
      >
        <motion.div style={{ y: blobMY, willChange: 'transform' }} className="relative w-full h-full">

          {/* Outer violet mass */}
          <div
            className="absolute aurora-pulse"
            style={{
              top: '8%', left: '2%', right: '-2%', bottom: '8%',
              background:
                'radial-gradient(ellipse 78% 88% at 60% 50%, rgba(108,59,255,0.50) 0%, rgba(168,85,247,0.32) 35%, rgba(236,72,153,0.14) 60%, transparent 80%)',
              filter: 'blur(42px)',
              willChange: 'transform',
            }}
          />

          {/* Inner magenta/pink core */}
          <div
            className="absolute aurora-pulse-slow"
            style={{
              top: '20%', left: '20%', right: '5%', bottom: '20%',
              background:
                'radial-gradient(ellipse 58% 68% at 55% 48%, rgba(236,72,153,0.60) 0%, rgba(168,85,247,0.30) 45%, transparent 78%)',
              filter: 'blur(26px)',
              willChange: 'transform',
            }}
          />

          {/* Amber/gold accent glow — complementary color pop */}
          <div
            className="absolute aurora-pulse"
            style={{
              top: '30%', right: '5%', width: '35%', height: '40%',
              background:
                'radial-gradient(ellipse at center, rgba(251,191,36,0.22) 0%, rgba(255,107,107,0.12) 50%, transparent 80%)',
              filter: 'blur(30px)',
              animationDelay: '2s',
              willChange: 'transform',
            }}
          />

          {/* Light columns — violet/magenta */}
          {Array.from({ length: COLS }).map((_, i) => {
            const left    = 6 + (i / (COLS - 1)) * 88
            const delay   = i * 0.40
            const dur     = 3.0 + (i % 4) * 0.70
            const opacity = 0.22 + (i % 3) * 0.20
            const width   = 2 + (i % 5)
            const blur    = 3 + (i % 3) * 2
            // Alternate violet / magenta / amber columns
            const colColor = i % 3 === 0
              ? 'linear-gradient(to bottom, transparent 0%, rgba(168,85,247,0.65) 25%, rgba(108,59,255,0.90) 50%, rgba(168,85,247,0.65) 75%, transparent 100%)'
              : i % 3 === 1
              ? 'linear-gradient(to bottom, transparent 0%, rgba(236,72,153,0.60) 25%, rgba(244,114,182,0.85) 50%, rgba(236,72,153,0.60) 75%, transparent 100%)'
              : 'linear-gradient(to bottom, transparent 0%, rgba(251,191,36,0.40) 25%, rgba(255,107,107,0.55) 50%, rgba(251,191,36,0.40) 75%, transparent 100%)'

            return (
              <div
                key={i}
                className="absolute top-0 bottom-0 rounded-full col-pulse"
                style={{
                  left: `${left}%`, width: `${width}px`, opacity,
                  background: colColor,
                  filter: `blur(${blur}px)`,
                  animationDelay: `${delay}s`,
                  animationDuration: `${dur}s`,
                  willChange: 'transform, opacity',
                }}
              />
            )
          })}

          {/* Edge fades */}
          <div className="absolute inset-y-0 left-0 w-[46%] pointer-events-none"
            style={{ background: 'linear-gradient(to right,#080510 0%,#080510 10%,rgba(8,5,16,.82) 42%,transparent 100%)' }} />
          <div className="absolute top-0 inset-x-0 h-[28%] pointer-events-none"
            style={{ background: 'linear-gradient(to bottom,#080510,transparent)' }} />
          <div className="absolute bottom-0 inset-x-0 h-[28%] pointer-events-none"
            style={{ background: 'linear-gradient(to top,#080510,transparent)' }} />

          {/* Grain */}
          <div className="absolute inset-0 grain-overlay pointer-events-none" style={{ opacity: 0.40 }} />
        </motion.div>
      </motion.div>

      {/* ── HEADLINE ── */}
      <motion.div
        style={{ y: parallaxY, opacity: fadeOut, willChange: 'transform, opacity' }}
        className="absolute inset-0 z-10 flex flex-col justify-end pb-[14vh] px-8 md:px-14 pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex items-center gap-2 mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#A855F7' }} />
          <span className="text-xs font-medium tracking-[0.22em] uppercase" style={{ color: '#A855F7' }}>
            Digital Innovation Studio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 52 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold leading-[1.0] tracking-tight"
          style={{ fontSize: 'clamp(2.8rem, 6.8vw, 6.4rem)', maxWidth: 660, color: '#F0EEF8' }}
        >
          A digital studio<br />
          built for your<br />
          <span style={{
            background: 'linear-gradient(135deg, #F0EEF8 0%, #C084FC 35%, #EC4899 65%, #FBBF24 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            ambition.
          </span>
        </motion.h1>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex items-center gap-4 mt-8 pointer-events-auto"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 32px rgba(168,85,247,0.50)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3.5 rounded-xl text-sm font-semibold"
            style={{ background: 'linear-gradient(135deg,#6C3BFF,#EC4899)', color: '#fff' }}
          >
            Explore Services
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03, borderColor: 'rgba(168,85,247,0.5)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3.5 rounded-xl text-sm font-medium transition-all duration-250"
            style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(240,238,248,0.75)' }}
          >
            View Our Work
          </motion.button>
        </motion.div>
      </motion.div>

      {/* ── DESCRIPTION bottom-right ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.0 }}
        style={{ opacity: fadeOut, color: 'rgba(155,147,184,0.85)', willChange: 'opacity' }}
        className="absolute bottom-[11vh] right-8 md:right-14 z-10 max-w-[240px] text-right text-sm leading-relaxed pointer-events-none"
      >
        IT services &amp; digital solutions studio. We create visual identities and
        digital experiences that truly reflect who you are.
      </motion.p>

      {/* ── SCROLL LINE ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
      >
        <motion.div
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 origin-top"
          style={{ background: 'linear-gradient(to bottom,rgba(168,85,247,.8),transparent)', willChange: 'transform, opacity' }}
        />
      </motion.div>
    </section>
  )
}
