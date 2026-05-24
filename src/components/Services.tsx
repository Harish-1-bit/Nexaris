import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const services = [
  {
    number: '01',
    title: 'Branding',
    description: 'Brand strategy, logo, guidelines. The fundamentals of your image.',
    visual: 'brand',
  },
  {
    number: '02',
    title: 'Web Design',
    description: 'UX, UI, prototypes. Interfaces designed around real user needs.',
    visual: 'design',
  },
  {
    number: '03',
    title: 'Web Development',
    description: 'Performance, security, scalability. A website built to last.',
    visual: 'web',
  },
  {
    number: '04',
    title: 'Mobile Apps',
    description: 'iOS & Android. Native and cross-platform apps users love.',
    visual: 'mobile',
  },
  {
    number: '05',
    title: 'Video Production',
    description: 'Brand films, motion graphics, and social content that captivates.',
    visual: 'video',
  },
  {
    number: '06',
    title: 'Digital Marketing',
    description: 'Data-driven campaigns that deliver measurable ROI and growth.',
    visual: 'marketing',
  },
]

/* ── SVG visuals per service ── */
function Visual({ type, hovered }: { type: string; hovered: boolean }) {
  const stroke = hovered ? 'rgba(168,85,247,0.9)' : 'rgba(168,85,247,0.55)'
  const fill   = hovered ? 'rgba(168,85,247,0.18)' : 'rgba(168,85,247,0.08)'
  const glow   = hovered ? 'rgba(108,59,255,0.35)'  : 'rgba(108,59,255,0.15)'

  const map: Record<string, React.ReactNode> = {
    brand: (
      <svg viewBox="0 0 160 160" className="w-full h-full">
        <defs>
          <radialGradient id="vb1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={glow} /><stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx="80" cy="80" r="70" fill="url(#vb1)" />
        <path d="M80 24 L128 104 L32 104 Z" fill={fill} stroke={stroke} strokeWidth="1.5" />
        <path d="M80 44 L112 96 L48 96 Z" fill={fill} stroke={stroke} strokeWidth="1" opacity=".6" />
        <circle cx="80" cy="24" r="4" fill={stroke} />
        <circle cx="128" cy="104" r="4" fill={stroke} opacity=".7" />
        <circle cx="32" cy="104" r="4" fill={stroke} opacity=".7" />
      </svg>
    ),
    design: (
      <svg viewBox="0 0 160 160" className="w-full h-full">
        <defs>
          <radialGradient id="vd1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={glow} /><stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx="80" cy="80" r="70" fill="url(#vd1)" />
        <circle cx="80" cy="80" r="52" fill="none" stroke={stroke} strokeWidth="1" opacity=".4" />
        <circle cx="80" cy="80" r="36" fill="none" stroke={stroke} strokeWidth="1.2" opacity=".6" />
        <circle cx="80" cy="80" r="18" fill={fill} stroke={stroke} strokeWidth="1.5" />
        <circle cx="80" cy="28" r="5" fill={stroke} />
        <circle cx="122" cy="104" r="5" fill={stroke} opacity=".8" />
        <circle cx="38"  cy="104" r="5" fill={stroke} opacity=".8" />
        <line x1="80" y1="28" x2="122" y2="104" stroke={stroke} strokeWidth=".8" opacity=".4" />
        <line x1="122" y1="104" x2="38" y2="104" stroke={stroke} strokeWidth=".8" opacity=".4" />
        <line x1="38"  y1="104" x2="80" y2="28"  stroke={stroke} strokeWidth=".8" opacity=".4" />
      </svg>
    ),
    web: (
      <svg viewBox="0 0 160 160" className="w-full h-full">
        <defs>
          <radialGradient id="vw1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={glow} /><stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx="80" cy="80" r="70" fill="url(#vw1)" />
        <rect x="20" y="34" width="120" height="92" rx="8" fill={fill} stroke={stroke} strokeWidth="1.5" />
        <rect x="20" y="34" width="120" height="22" rx="8" fill={fill} stroke={stroke} strokeWidth="1" />
        <circle cx="36" cy="45" r="4" fill={stroke} opacity=".9" />
        <circle cx="50" cy="45" r="4" fill={stroke} opacity=".6" />
        <circle cx="64" cy="45" r="4" fill={stroke} opacity=".35" />
        <rect x="32" y="70" width="44" height="4" rx="2" fill={stroke} opacity=".7" />
        <rect x="32" y="80" width="72" height="3" rx="1.5" fill={stroke} opacity=".3" />
        <rect x="32" y="88" width="60" height="3" rx="1.5" fill={stroke} opacity=".25" />
        <rect x="32" y="96" width="66" height="3" rx="1.5" fill={stroke} opacity=".2" />
        <rect x="100" y="70" width="28" height="34" rx="4" fill={fill} stroke={stroke} strokeWidth="1" />
      </svg>
    ),
    mobile: (
      <svg viewBox="0 0 160 160" className="w-full h-full">
        <defs>
          <radialGradient id="vm1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={glow} /><stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx="80" cy="80" r="70" fill="url(#vm1)" />
        <rect x="50" y="20" width="60" height="120" rx="10" fill={fill} stroke={stroke} strokeWidth="1.5" />
        <rect x="64" y="26" width="32" height="4" rx="2" fill={stroke} opacity=".5" />
        <circle cx="80" cy="130" r="5" fill="none" stroke={stroke} strokeWidth="1.2" opacity=".6" />
        <rect x="58" y="40" width="44" height="28" rx="4" fill={fill} stroke={stroke} strokeWidth="1" />
        <rect x="58" y="76" width="20" height="20" rx="3" fill={stroke} opacity=".25" />
        <rect x="82" y="76" width="20" height="20" rx="3" fill={stroke} opacity=".18" />
        <rect x="58" y="102" width="44" height="5" rx="2.5" fill={stroke} opacity=".2" />
      </svg>
    ),
    video: (
      <svg viewBox="0 0 160 160" className="w-full h-full">
        <defs>
          <radialGradient id="vv1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={glow} /><stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx="80" cy="80" r="70" fill="url(#vv1)" />
        <rect x="18" y="46" width="88" height="68" rx="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
        <polygon points="106,58 140,80 106,102" fill={fill} stroke={stroke} strokeWidth="1.5" />
        <circle cx="62" cy="80" r="20" fill={fill} stroke={stroke} strokeWidth="1" opacity=".7" />
        <polygon points="56,71 56,89 74,80" fill={stroke} opacity=".85" />
      </svg>
    ),
    marketing: (
      <svg viewBox="0 0 160 160" className="w-full h-full">
        <defs>
          <radialGradient id="vmk1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={glow} /><stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx="80" cy="80" r="70" fill="url(#vmk1)" />
        <polyline points="20,120 44,88 68,96 96,54 128,32"
          fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20"  cy="120" r="4.5" fill={stroke} />
        <circle cx="44"  cy="88"  r="4.5" fill={stroke} opacity=".8" />
        <circle cx="68"  cy="96"  r="4.5" fill={stroke} opacity=".8" />
        <circle cx="96"  cy="54"  r="4.5" fill={stroke} opacity=".9" />
        <circle cx="128" cy="32"  r="6"   fill={stroke} />
        <line x1="20" y1="126" x2="128" y2="126" stroke={stroke} strokeWidth=".8" opacity=".2" />
        <line x1="20" y1="126" x2="20"  y2="26"  stroke={stroke} strokeWidth=".8" opacity=".2" />
      </svg>
    ),
  }
  return <>{map[type] ?? map['web']}</>
}

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const col = index % 2
  const row = Math.floor(index / 2)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: col === 0 ? -40 : 40, y: 20 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.72, delay: row * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative flex items-stretch cursor-pointer rounded-xl overflow-hidden transition-all duration-400"
      style={{
        background: hovered ? 'rgba(18,13,40,0.5)' : 'rgba(14,10,31,0.45)',
        border: `1px solid ${hovered ? 'rgba(168,85,247,0.22)' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hovered ? '0 16px 48px rgba(168,85,247,0.07)' : 'none',
      }}
    >
      {/* left: text */}
      <div className="flex-1 p-7 flex flex-col justify-between min-h-[180px]">
        <div>
          <span className="text-xs font-medium tracking-widest mb-4 block" style={{ color: 'rgba(160,168,192,0.6)' }}>
            {service.number}
          </span>
          <h3
            className="font-display font-bold text-xl mb-2.5 transition-all duration-300"
            style={{
              color: hovered ? 'transparent' : '#e8eaf0',
              background: hovered ? 'linear-gradient(135deg,#e8eaf0,#A855F7)' : 'none',
              WebkitBackgroundClip: hovered ? 'text' : 'unset',
              WebkitTextFillColor: hovered ? 'transparent' : 'unset',
              backgroundClip: hovered ? 'text' : 'unset',
            }}
          >
            {service.title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(160,168,192,0.75)' }}>
            {service.description}
          </p>
        </div>
        <motion.div
          animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-1.5 text-xs font-medium mt-5"
          style={{ color: '#A855F7' }}
        >
          Learn more <ArrowRight size={11} />
        </motion.div>
      </div>

      {/* right: visual */}
      <div
        className="w-[148px] flex-shrink-0 flex items-center justify-center p-5"
        style={{ borderLeft: '1px solid rgba(255,255,255,0.05)', background: 'rgba(108,59,255,0.03)' }}
      >
        <motion.div
          animate={{ scale: hovered ? 1.07 : 1, opacity: hovered ? 1 : 0.65 }}
          transition={{ duration: 0.35 }}
          className="w-[100px] h-[100px]"
        >
          <Visual type={service.visual} hovered={hovered} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" className="relative py-28 overflow-hidden" style={{ background: '#000' }}>
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

      {/* subtle center glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top,rgba(168,85,247,0.05) 0%,transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-8 md:px-14">
        {/* header */}
        <div ref={ref} className="flex flex-col items-center text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-medium tracking-[0.2em] uppercase mb-5"
            style={{ color: '#A855F7' }}
          >
            Services
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.72, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-white"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)' }}
          >
            From strategy to launch.
          </motion.h2>
        </div>

        {/* 2-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((s, i) => (
            <ServiceCard key={s.number} service={s} index={i} />
          ))}
        </div>

        {/* view all */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex justify-center mt-12"
        >
          <motion.button
            whileHover={{ x: 4 }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-2 text-sm font-medium transition-colors duration-200"
            style={{ color: 'rgba(160,168,192,0.7)' }}
          >
            View all services
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" style={{ color: '#A855F7' }} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
