import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const RAYS = 12

export default function Horizon() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scanX  = useTransform(scrollYProgress, [0, 1], ['-100%', '200%'])
  const fadeIn = useTransform(scrollYProgress, [0, 0.25], [0, 1])

  return (
    <motion.div
      ref={ref}
      style={{ opacity: fadeIn, height: 220, background: '#080510' }}
      className="relative w-full overflow-hidden"
    >
      {/* ── PERSPECTIVE GRID FLOOR ── */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: '100%',
          background: `
            linear-gradient(to bottom,
              transparent 0%,
              rgba(108,59,255,0.04) 40%,
              rgba(108,59,255,0.10) 100%)
          `,
        }}
      >
        {/* Perspective grid lines — SVG, zero JS */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hLineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="rgba(108,59,255,0)"   />
              <stop offset="60%"  stopColor="rgba(168,85,247,0.35)" />
              <stop offset="100%" stopColor="rgba(236,72,153,0.55)" />
            </linearGradient>
            <linearGradient id="vLineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="rgba(108,59,255,0)"   />
              <stop offset="100%" stopColor="rgba(168,85,247,0.28)" />
            </linearGradient>
          </defs>

          {/* Horizontal lines — perspective spacing (closer = denser at bottom) */}
          {[0.18, 0.32, 0.46, 0.58, 0.68, 0.77, 0.84, 0.90, 0.95, 1.0].map((t, i) => (
            <line
              key={i}
              x1="0" y1={t * 220}
              x2="1440" y2={t * 220}
              stroke="url(#hLineGrad)"
              strokeWidth={0.6 + i * 0.12}
              opacity={0.3 + i * 0.07}
            />
          ))}

          {/* Vertical lines — converge to vanishing point at center-top */}
          {Array.from({ length: RAYS }).map((_, i) => {
            const spread = 1440
            const vp = 720 // vanishing point x
            const x  = (i / (RAYS - 1)) * spread
            return (
              <line
                key={i}
                x1={vp} y1={0}
                x2={x}  y2={220}
                stroke="url(#vLineGrad)"
                strokeWidth={0.7}
                opacity={0.22 + (i % 3) * 0.08}
              />
            )
          })}
        </svg>
      </div>

      {/* ── HORIZON LINE — the glowing seam ── */}
      <div
        className="absolute inset-x-0 horizon-glow"
        style={{
          top: '28%',
          height: 1,
          background: 'linear-gradient(to right, transparent 0%, rgba(108,59,255,0.6) 15%, rgba(236,72,153,0.9) 40%, rgba(251,191,36,0.8) 50%, rgba(236,72,153,0.9) 60%, rgba(108,59,255,0.6) 85%, transparent 100%)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Horizon glow bloom */}
      <div
        className="absolute inset-x-0 horizon-glow"
        style={{
          top: '18%',
          height: 60,
          background: 'radial-gradient(ellipse 70% 100% at 50% 100%, rgba(168,85,247,0.28) 0%, rgba(236,72,153,0.18) 40%, transparent 80%)',
          filter: 'blur(12px)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Amber accent bloom — complementary pop */}
      <div
        className="absolute horizon-glow"
        style={{
          top: '15%', left: '35%', right: '35%', height: 50,
          background: 'radial-gradient(ellipse at center, rgba(251,191,36,0.22) 0%, transparent 80%)',
          filter: 'blur(16px)',
          animationDelay: '1.5s',
          willChange: 'transform, opacity',
        }}
      />

      {/* ── SCANNING LIGHT — moves across horizon ── */}
      <motion.div
        style={{
          x: scanX,
          willChange: 'transform',
          position: 'absolute',
          top: '10%', width: '30%', height: '60%',
          background: 'linear-gradient(to right, transparent, rgba(236,72,153,0.12), rgba(251,191,36,0.08), transparent)',
          filter: 'blur(8px)',
        }}
      />

      {/* ── TOP FADE — blends into hero ── */}
      <div
        className="absolute top-0 inset-x-0 h-[45%] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #080510, transparent)' }}
      />

      {/* ── BOTTOM FADE — blends into next section ── */}
      <div
        className="absolute bottom-0 inset-x-0 h-[35%] pointer-events-none"
        style={{ background: 'linear-gradient(to top, #080510, transparent)' }}
      />

      {/* ── FLOATING STATS above horizon ── */}
      <div className="absolute inset-x-0 top-[4%] flex items-center justify-center gap-16 z-10 px-8">
        {[
          { value: '150+', label: 'Projects Delivered' },
          { value: '98%',  label: 'Client Satisfaction' },
          { value: '7+',   label: 'Years of Excellence' },
          { value: '40+',  label: 'Global Clients' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="text-center"
          >
            <div
              className="font-display font-bold text-2xl md:text-3xl mb-0.5"
              style={{
                background: 'linear-gradient(135deg, #F0EEF8, #C084FC, #EC4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {s.value}
            </div>
            <div className="text-xs" style={{ color: 'rgba(155,147,184,0.7)' }}>{s.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
