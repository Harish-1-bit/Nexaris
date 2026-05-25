import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Move, Globe, Zap, Sparkles, Layout, Shield } from 'lucide-react'

const items = [
  {
    id: 1,
    x: 830,
    y: 470,
    width: 540,
    type: 'hero',
    content: (
      <div className="text-center p-12 flex flex-col items-center gap-4 select-none">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 flex items-center justify-center animate-pulse">
          <Move size={24} className="text-[#FF5E00]" />
        </div>
        <h3 className="font-display font-extrabold text-3xl text-white">Nexaris Universe</h3>
        <p className="text-sm max-w-sm text-muted leading-relaxed">
          Click and drag in any direction to explore our metrics, values, and digital stack.
        </p>
        <span className="text-[10px] uppercase tracking-widest text-[#FF5E00] font-semibold bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
          Inertial Map Playground
        </span>
      </div>
    ),
  },
  {
    id: 2,
    x: 585,
    y: 250,
    width: 380,
    type: 'card',
    content: (
      <div className="p-8 flex flex-col gap-3 select-none">
        <Zap size={24} className="text-[#FF5E00]" />
        <h4 className="font-display font-bold text-lg text-white">Performance Obsessed</h4>
        <p className="text-xs text-muted leading-relaxed">
          Buttery-smooth 60FPS scrolls and direct requestAnimationFrame loops to prevent any layout thrashing.
        </p>
      </div>
    ),
  },
  {
    id: 3,
    x: 1235,
    y: 250,
    width: 380,
    type: 'card',
    content: (
      <div className="p-8 flex flex-col gap-3 select-none">
        <Globe size={24} className="text-[#FF1E1E]" />
        <h4 className="font-display font-bold text-lg text-white">Semantic Edge</h4>
        <p className="text-xs text-muted leading-relaxed">
          Distributed globally via high-availability edge networks. Built from scratch with SEO semantic standards.
        </p>
      </div>
    ),
  },
  {
    id: 4,
    x: 575,
    y: 760,
    width: 400,
    type: 'card',
    content: (
      <div className="p-8 flex flex-col gap-4 select-none">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5E00]" />
          <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">Metrics Hub</h4>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-2xl font-bold font-display text-white">32ms</div>
            <div className="text-[10px] text-muted uppercase">Avg Response</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-white">+180%</div>
            <div className="text-[10px] text-muted uppercase">Conversions</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    x: 1235,
    y: 760,
    width: 380,
    type: 'card',
    content: (
      <div className="p-8 flex flex-col gap-3 select-none">
        <Sparkles size={24} className="text-[#FF5E00]" />
        <h4 className="font-display font-bold text-lg text-white">Elite Quality</h4>
        <p className="text-xs text-muted leading-relaxed">
          We reject templates. Every product features bespoke layouts, curated colors, and custom vectors.
        </p>
      </div>
    ),
  },
  {
    id: 6,
    x: 900,
    y: 970,
    width: 400,
    type: 'card',
    content: (
      <div className="p-8 select-none">
        <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Layout size={16} className="text-[#FF5E00]" /> Technology Stack
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {['React 19', 'TypeScript', 'Tailwind v4', 'Framer Motion', 'Vite 8', 'Lenis Scroll', 'Radix UI'].map(t => (
            <span key={t} className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 rounded text-white-soft">
              {t}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 7,
    x: 890,
    y: 40,
    width: 420,
    type: 'card',
    content: (
      <div className="p-8 flex flex-col justify-between h-full gap-4 select-none">
        <p className="text-sm italic text-white-soft leading-relaxed">
          "They completely reshaped our digital presence. We didn't just get a new site; we got a fully scaled brand ecosystem."
        </p>
        <div className="text-[11px] font-semibold text-[#FF5E00]">
          — CEO, Luminary Finance
        </div>
      </div>
    ),
  },
  {
    id: 8,
    x: 1732,
    y: 310,
    width: 380,
    type: 'card',
    content: (
      <div className="p-6 text-center select-none">
        <span className="text-[10px] font-semibold text-muted uppercase tracking-[0.2em] mb-1 block">Core Philosophy</span>
        <div className="text-lg font-display font-bold text-gradient">Relentless Craft</div>
      </div>
    ),
  },
  {
    id: 9,
    x: 1570,
    y: 510,
    width: 360,
    type: 'card',
    content: (
      <div className="p-8 select-none">
        <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">Industries We Scale</h4>
        <div className="grid grid-cols-2 gap-2.5 text-xs text-muted">
          {['FinTech Platforms', 'Luxury E-Commerce', 'SaaS Projects', 'HealthTech Hubs', 'Logistics Systems', 'AI Products'].map(i => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E00]" />
              <span>{i}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 10,
    x: 270,
    y: 510,
    width: 360,
    type: 'card',
    content: (
      <div className="p-8 flex flex-col gap-3 select-none">
        <Sparkles size={24} className="text-[#FF1E1E]" />
        <h4 className="font-display font-bold text-lg text-white">Strategic Roadmap</h4>
        <p className="text-xs text-muted leading-relaxed">
          We align your product engineering with commercial outcomes. In-depth market fit analysis and strategic launch timelines.
        </p>
      </div>
    ),
  },
  {
    id: 11,
    x: 86,
    y: 280,
    width: 385,
    type: 'card',
    content: (
      <div className="p-8 flex flex-col gap-3 select-none">
        <Shield size={24} className="text-[#FF5E00]" />
        <h4 className="font-display font-bold text-lg text-white">Rigorous Testing</h4>
        <p className="text-xs text-muted leading-relaxed">
          Comprehensive unit, integration, and end-to-end testing pipelines. Zero-regression builds pushed automatically on every commit.
        </p>
      </div>
    ),
  },
  {
    id: 12,
    x: 1727,
    y: 740,
    width: 390,
    type: 'card',
    content: (
      <div className="p-8 flex flex-col gap-3 select-none">
        <Shield size={24} className="text-[#FF5E00]" />
        <h4 className="font-display font-bold text-lg text-white">Bulletproof Security</h4>
        <p className="text-xs text-muted leading-relaxed">
          Continuous vulnerability scans, HTTPS-only forced routing, encrypted database schemes, and strict CORS policies.
        </p>
      </div>
    ),
  },
  {
    id: 13,
    x: 113,
    y: 740,
    width: 330,
    type: 'card',
    content: (
      <div className="p-8 flex flex-col gap-3 select-none">
        <Layout size={24} className="text-[#FF1E1E]" />
        <h4 className="font-display font-bold text-lg text-white">Visual Narrative</h4>
        <p className="text-xs text-muted leading-relaxed">
          Motion graphics, brand films, and high-fidelity video production integrated right into your marketing pipelines.
        </p>
      </div>
    ),
  },
]

export default function ExploreCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section className="relative py-20 overflow-hidden bg-black">
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
      
      <div className="max-w-7xl mx-auto px-8 md:px-14 mb-10">
        <p className="text-xs font-medium tracking-[0.2em] uppercase mb-4" style={{ color: '#FF5E00' }}>
          Playground
        </p>
        <h2 className="font-display font-bold text-white text-3xl md:text-4xl leading-tight">
          Explore our universe.
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-14">
        {/* Outer bounds constraints viewport */}
        <div
          ref={containerRef}
          className="w-full h-[620px] relative overflow-hidden bg-[#080808] border border-white/5 rounded-3xl cursor-grab active:cursor-grabbing"
          style={{
            boxShadow: 'inset 0 0 50px rgba(0,0,0,0.8)',
          }}
        >
          {/* Inner canvas */}
          <motion.div
            drag
            dragConstraints={{
              left: -1150,
              right: 150,
              top: -700,
              bottom: 150,
            }}
            dragElastic={0.15}
            dragMomentum={true}
            dragTransition={{ bounceStiffness: 400, bounceDamping: 26, power: 0.18 }}
            initial={{ x: -500, y: -290 }}
            className="absolute dot-grid"
            style={{
              width: 2200,
              height: 1200,
              border: '2px dashed rgba(255, 94, 0, 0.08)',
              borderRadius: '24px',
            }}
          >
            {items.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.025, borderColor: 'rgba(255, 94, 0, 0.3)', boxShadow: '0 20px 40px rgba(255, 94, 0, 0.08)' }}
                className="absolute rounded-2xl glass transition-all duration-300 overflow-hidden"
                style={{
                  left: item.x,
                  top: item.y,
                  width: item.width,
                  zIndex: item.type === 'hero' ? 2 : 1,
                  boxShadow: item.type === 'hero' ? '0 15px 45px rgba(255, 94, 0, 0.06)' : 'none',
                }}
              >
                {item.content}
              </motion.div>
            ))}
          </motion.div>

          {/* Fade overlays on viewport borders to make it look smooth */}
          <div className="absolute inset-0 pointer-events-none rounded-3xl"
            style={{
              boxShadow: 'inset 0 0 40px rgba(0,0,0,0.9)',
              background: 'linear-gradient(to right, #080808 0%, transparent 8%, transparent 92%, #080808 100%), linear-gradient(to bottom, #080808 0%, transparent 8%, transparent 92%, #080808 100%)'
            }}
          />
        </div>
      </div>
    </section>
  )
}
