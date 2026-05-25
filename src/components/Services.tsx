import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowRight, Sparkles, Check } from 'lucide-react'
import Tilt from './Tilt'
import TextReveal from './TextReveal'

const services = [
  {
    number: '01',
    title: 'Branding',
    description: 'Brand strategy, logo, guidelines. The fundamentals of your image.',
    deliverables: ['Brand Strategy', 'Logo & Identity Design', 'Visual Guidelines', 'Stationery Systems'],
    visual: 'brand',
    color: '#FF5E00',
    glowColor: 'rgba(255, 94, 0, 0.15)',
  },
  {
    number: '02',
    title: 'Web Design',
    description: 'UX, UI, prototypes. Interfaces designed around real user needs.',
    deliverables: ['User Research', 'Figma Prototyping', 'Design Systems', 'Micro-Interactions'],
    visual: 'design',
    color: '#FF1E1E',
    glowColor: 'rgba(255, 30, 30, 0.15)',
  },
  {
    number: '03',
    title: 'Web Development',
    description: 'Performance, security, scalability. A website built to last.',
    deliverables: ['Next.js & React 19', 'Tailwind CSS v4', 'Custom API Integrations', 'SEO & Performance'],
    visual: 'web',
    color: '#00F0FF',
    glowColor: 'rgba(0, 240, 255, 0.15)',
  },
  {
    number: '04',
    title: 'Mobile Apps',
    description: 'iOS & Android. Native and cross-platform apps users love.',
    deliverables: ['iOS Swift Native', 'Android Kotlin Native', 'React Native Apps', 'App Store Launch'],
    visual: 'mobile',
    color: '#FFD700',
    glowColor: 'rgba(255, 215, 0, 0.15)',
  },
  {
    number: '05',
    title: 'Video Production',
    description: 'Brand films, motion graphics, and social content that captivates.',
    deliverables: ['Storyboarding', 'Motion Graphics', 'Cinematography', 'Social Ad Campaigns'],
    visual: 'video',
    color: '#FF00FF',
    glowColor: 'rgba(255, 0, 255, 0.15)',
  },
  {
    number: '06',
    title: 'Digital Marketing',
    description: 'Data-driven campaigns that deliver measurable ROI and growth.',
    deliverables: ['SEO Optimization', 'Paid Media Campaigns', 'Analytics Setup', 'Content Strategy'],
    visual: 'marketing',
    color: '#00FF88',
    glowColor: 'rgba(0, 255, 136, 0.15)',
  },
]

/* ── Interactive vector showcases per service ── */
function BrandShowcase({ active }: { active: boolean }) {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-black/60 rounded-2xl border border-white/5">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
      
      <div className="relative w-44 h-44 flex items-center justify-center">
        {/* Rotating constructs */}
        <motion.div
          animate={active ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute w-full h-full border border-dashed border-[#FF5E00]/40 rounded-full"
        />
        <motion.div
          animate={active ? { rotate: -360 } : { rotate: 0 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute w-36 h-36 border border-[#FF5E00]/30 rounded-3xl"
        />
        <motion.div
          animate={active ? { scale: [1, 1.05, 1], rotate: 45 } : { rotate: 45 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-24 h-24 bg-gradient-to-br from-[#FF5E00]/20 to-[#FF1E1E]/20 border border-[#FF5E00] flex items-center justify-center shadow-[0_0_30px_rgba(255,94,0,0.15)]"
          style={{ transform: 'rotate(45deg)' }}
        >
          <Sparkles className="text-white w-8 h-8 -rotate-45" />
        </motion.div>
      </div>
    </div>
  )
}

function DesignShowcase({ active }: { active: boolean }) {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-black/60 rounded-2xl border border-white/5 p-6">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
      
      {/* Desktop UI mockup */}
      <motion.div
        animate={active ? { y: [0, -6, 0] } : {}}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="w-full max-w-[280px] h-[190px] rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="h-6 border-b border-white/10 px-3 flex items-center justify-between bg-white/[0.02]">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/60" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <span className="w-2 h-2 rounded-full bg-green-500/60" />
          </div>
          <div className="w-28 h-2.5 rounded-full bg-white/10" />
          <div className="w-4 h-4 rounded-full bg-[#FF1E1E]/30 border border-[#FF1E1E]/40" />
        </div>
        {/* Layout content blocks */}
        <div className="flex-1 p-3 flex gap-3">
          {/* Left panel */}
          <div className="w-1/3 border border-white/5 bg-white/[0.01] rounded-lg p-1.5 flex flex-col gap-2">
            <div className="w-full h-3 rounded bg-white/5" />
            <div className="w-3/4 h-2.5 rounded bg-white/5" />
            <div className="w-1/2 h-2 rounded bg-white/5" />
          </div>
          {/* Right workspace */}
          <div className="flex-1 flex flex-col gap-2.5 justify-between">
            <div className="flex gap-2">
              <div className="flex-1 h-12 border border-[#FF1E1E]/20 bg-[#FF1E1E]/5 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-[#FF1E1E]/20 animate-pulse" />
              </div>
              <div className="w-1/3 h-12 border border-white/5 bg-white/[0.02] rounded-lg" />
            </div>
            <div className="w-full h-6 border border-white/5 bg-white/[0.01] rounded-lg flex items-center px-2">
              <motion.div 
                animate={active ? { width: ['30%', '90%', '30%'] } : {}}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="h-2 rounded-full bg-[#FF1E1E]/40"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function WebDevShowcase({ active }: { active: boolean }) {
  const [typedLine, setTypedLine] = useState(0)

  useEffect(() => {
    if (!active) return
    const interval = setInterval(() => {
      setTypedLine((prev) => (prev + 1) % 4)
    }, 2000)
    return () => clearInterval(interval)
  }, [active])

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-black/60 rounded-2xl border border-white/5 p-6">
      {/* Code window */}
      <div className="w-full max-w-[280px] h-[190px] rounded-lg border border-white/10 bg-black/90 font-mono text-[9.5px] text-white-soft flex flex-col shadow-2xl">
        {/* Terminal Header */}
        <div className="h-6 border-b border-white/10 px-3 flex items-center gap-1.5 bg-white/[0.02]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]/30" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]/20" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]/10" />
          <span className="text-[9px] text-white/40 ml-2">bash - build_nexus.js</span>
        </div>
        {/* Code editor body */}
        <div className="flex-1 p-3.5 space-y-1.5 leading-normal">
          <p className="text-gray-500">// Deploying Edge Cluster</p>
          <div className="flex items-center gap-1">
            <span className="text-[#00F0FF]">const</span>
            <span className="text-white">nexaris</span>
            <span className="text-[#00F0FF]">=</span>
            <span className="text-amber-300">init()</span>
          </div>
          
          <AnimatePresence mode="popLayout">
            {typedLine >= 1 && (
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-emerald-400 flex items-center gap-1"
              >
                <span>➜ [OK] Bundle optimized</span>
                <span className="text-[8px] px-1 bg-emerald-500/10 text-emerald-400 rounded">12ms</span>
              </motion.div>
            )}
            {typedLine >= 2 && (
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-indigo-400 flex items-center gap-1"
              >
                <span>➜ [OK] Edge routing active</span>
                <span className="text-[8px] px-1 bg-indigo-500/10 text-indigo-400 rounded">4ms</span>
              </motion.div>
            )}
            {typedLine >= 3 && (
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-pink-400 flex items-center gap-1"
              >
                <span>➜ [SYS] Lighthouse score: 100/100</span>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex items-center gap-0.5">
            <span className="text-[#00F0FF]">$</span>
            <span className="w-1.5 h-3 bg-[#00F0FF] animate-pulse inline-block" />
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileShowcase({ active }: { active: boolean }) {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-black/60 rounded-2xl border border-white/5 p-6">
      {/* Mobile outline */}
      <motion.div
        animate={active ? { rotate: [0, 4, 0] } : {}}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="w-[120px] h-[200px] rounded-[24px] border-2 border-white/15 bg-black relative flex flex-col p-2.5 shadow-2xl"
      >
        {/* Dynamic Island */}
        <div className="w-14 h-3 bg-white/20 rounded-full mx-auto mb-2 flex items-center justify-center">
          <span className="w-1 h-1 rounded-full bg-[#FFD700]" />
        </div>
        {/* Mock Screen Content */}
        <div className="flex-1 rounded-[16px] border border-white/5 bg-white/[0.02] p-2 flex flex-col gap-2 relative overflow-hidden">
          {/* Header widget */}
          <div className="h-9 border border-[#FFD700]/20 bg-[#FFD700]/5 rounded-lg flex items-center justify-center">
            <span className="text-[8.5px] text-[#FFD700] font-bold tracking-wider">NEXARIS APP</span>
          </div>
          {/* List items */}
          <div className="space-y-1.5">
            <div className="h-6 rounded bg-white/5 flex items-center px-1.5 justify-between">
              <span className="w-8 h-1 bg-white/20 rounded" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#FFD700]/40" />
            </div>
            <div className="h-6 rounded bg-white/5 flex items-center px-1.5 justify-between">
              <span className="w-10 h-1 bg-white/20 rounded" />
              <span className="w-3.5 h-3.5 rounded-full bg-white/10" />
            </div>
            <div className="h-6 rounded bg-white/5 flex items-center px-1.5 justify-between">
              <span className="w-7 h-1 bg-white/20 rounded" />
              <span className="w-3.5 h-3.5 rounded-full bg-white/10" />
            </div>
          </div>
          {/* Glowing cursor pointer floating */}
          <motion.div
            animate={active ? { x: [20, 60, 20], y: [80, 20, 80] } : { x: 20, y: 80 }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-4 h-4 rounded-full bg-[#FFD700]/40 border border-[#FFD700] shadow-[0_0_10px_rgba(255,215,0,0.5)]"
          />
        </div>
      </motion.div>
    </div>
  )
}

function VideoShowcase({ active }: { active: boolean }) {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-black/60 rounded-2xl border border-white/5 p-6">
      {/* Video Viewfinder */}
      <div className="w-full max-w-[280px] h-[190px] rounded-lg border border-white/10 relative overflow-hidden flex flex-col justify-between p-3.5 shadow-2xl bg-black/80">
        {/* Corners */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/40" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white/40" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-white/40" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-white/40" />

        {/* Viewfinder Header */}
        <div className="flex justify-between items-center text-[8.5px] text-white-soft">
          <div className="flex items-center gap-1">
            <motion.span
              animate={active ? { opacity: [1, 0, 1] } : { opacity: 1 }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-red-600 inline-block"
            />
            <span className="font-bold">REC</span>
          </div>
          <span className="tracking-wider">RAW 4K 60FPS</span>
        </div>

        {/* Sound Waveforms Center */}
        <div className="flex items-center justify-center gap-1.5 h-16 w-full">
          {[10, 18, 36, 24, 48, 30, 14, 32, 38, 20, 8].map((height, i) => (
            <motion.div
              key={i}
              animate={active ? { height: [height * 0.4, height, height * 0.4] } : { height: height * 0.4 }}
              transition={{ duration: 1.5 + (i * 0.1), repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 rounded-full bg-gradient-to-t from-[#FF00FF] to-pink-500"
              style={{ height: height * 0.4 }}
            />
          ))}
        </div>

        {/* Playback timeline */}
        <div className="flex items-center justify-between text-[8px] text-white/40">
          <span>00:04:12</span>
          <div className="w-24 h-1 bg-white/10 rounded-full relative overflow-hidden">
            <motion.div
              animate={active ? { left: ['-100%', '100%', '-100%'] } : {}}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute w-1/3 h-full bg-[#FF00FF] rounded-full"
            />
          </div>
          <span>00:10:00</span>
        </div>
      </div>
    </div>
  )
}

function MarketingShowcase({ active }: { active: boolean }) {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-black/60 rounded-2xl border border-white/5 p-6">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
      
      {/* Analytical chart widget */}
      <div className="w-full max-w-[280px] h-[190px] rounded-lg border border-white/10 bg-black/90 p-4 flex flex-col justify-between shadow-2xl relative">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">Net Conversions</h4>
            <div className="text-lg font-bold text-white leading-none mt-0.5">+182.4%</div>
          </div>
          <span className="text-[8px] font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">Active Growth</span>
        </div>
        {/* Dynamic bar charts */}
        <div className="flex items-end justify-between h-16 w-full pt-4">
          {[20, 35, 42, 38, 55, 68, 85].map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <div className="w-full bg-white/5 rounded-t relative h-16 flex items-end">
                <motion.div
                  initial={{ height: 0 }}
                  animate={active ? { height: `${height}%` } : { height: '10%' }}
                  transition={{ duration: 1.2, delay: i * 0.1, ease: 'easeOut' }}
                  className="w-full rounded-t"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,255,136,0.1), #00FF88)',
                    boxShadow: '0 0 10px rgba(0,255,136,0.3)',
                  }}
                />
              </div>
              <span className="text-[6px] text-gray-600 font-mono">Q{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function VisualContainer({ type, active }: { type: string; active: boolean }) {
  const map: Record<string, React.ReactNode> = {
    brand: <BrandShowcase active={active} />,
    design: <DesignShowcase active={active} />,
    web: <WebDevShowcase active={active} />,
    mobile: <MobileShowcase active={active} />,
    video: <VideoShowcase active={active} />,
    marketing: <MarketingShowcase active={active} />,
  }
  return <>{map[type] ?? map['web']}</>
}

export default function Services() {
  const [activeTab, setActiveTab] = useState(0)
  const containerRef = useRef(null)
  const inView = useInView(containerRef, { once: true, margin: '-80px' })

  return (
    <section id="services" className="relative py-32 overflow-hidden bg-black" ref={containerRef}>
      {/* Horizontal Border top */}
      <div className="absolute top-0 inset-x-0 h-px bg-white/5" />

      {/* Dynamic Background Glow changing with active tab */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none transition-all duration-1000 blur-[100px] rounded-full opacity-40 z-0"
        style={{
          background: `radial-gradient(ellipse at center, ${services[activeTab].glowColor} 0%, transparent 70%)`
        }}
      />

      <div className="max-w-7xl mx-auto px-8 md:px-14 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.22em] uppercase mb-4"
            style={{ color: services[activeTab].color }}
          >
            Capabilities
          </motion.p>
          <TextReveal
            lines={["Bespoke Digital Solutions."]}
            className="font-display font-bold text-white text-center"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)' }}
          />
        </div>

        {/* Split Accordion Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-28 items-start">
          
          {/* Left Column: Interactive Accordion list */}
          <div className="lg:col-span-7 space-y-4">
            {services.map((service, index) => {
              const isActive = activeTab === index
              return (
                <div
                  key={service.number}
                  onMouseEnter={() => setActiveTab(index)}
                  onClick={() => setActiveTab(index)}
                  className="group relative border-b border-white/5 pb-4 cursor-pointer"
                >
                  {/* Hover indicator background */}
                  <div 
                    className="absolute inset-0 -mx-4 px-4 py-2 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100 bg-white/[0.02]"
                    style={{
                      borderLeft: isActive ? `2px solid ${service.color}` : 'none'
                    }}
                  />

                  <div className="relative flex items-start gap-5 pt-4">
                    {/* Typographic Number */}
                    <span 
                      className="text-sm font-semibold font-mono transition-colors duration-300"
                      style={{ color: isActive ? service.color : 'rgba(160,168,192,0.4)' }}
                    >
                      {service.number}
                    </span>

                    {/* Content Block */}
                    <div className="flex-1">
                      <h3 
                        className="font-display font-bold text-xl md:text-2xl transition-colors duration-300"
                        style={{ color: isActive ? '#ffffff' : 'rgba(232, 234, 240, 0.75)' }}
                      >
                        {service.title}
                      </h3>

                      {/* Expandable accordion container */}
                      <motion.div
                        initial={false}
                        animate={{ 
                          height: isActive ? 'auto' : 0, 
                          opacity: isActive ? 1 : 0 
                        }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden mt-3"
                      >
                        <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-xl">
                          {service.description}
                        </p>
                        
                        {/* Deliverables tags */}
                        <div className="flex flex-wrap gap-2.5 mt-5">
                          {service.deliverables.map((item) => (
                            <div 
                              key={item} 
                              className="flex items-center gap-1.5 text-[11px] bg-white/5 border border-white/10 px-3 py-1 rounded text-[#e8eaf0] font-medium"
                            >
                              <Check size={10} style={{ color: service.color }} />
                              {item}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* Expand/Learn Arrow indicator */}
                    <motion.div
                      animate={{ 
                        rotate: isActive ? 45 : 0,
                        color: isActive ? service.color : 'rgba(160,168,192,0.4)'
                      }}
                      transition={{ duration: 0.25 }}
                      className="flex-shrink-0 pt-1"
                    >
                      <ArrowRight size={18} />
                    </motion.div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Column: Sticky Showcase Visualizer */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 relative w-full h-[300px] lg:h-[460px] max-w-[360px] mx-auto">
            <Tilt maxRotate={6} className="w-full h-full">
              <div 
                className="w-full h-full rounded-2xl p-6 relative transition-all duration-500 overflow-hidden"
                style={{
                  background: 'rgba(12,12,12,0.6)',
                  border: `1px solid rgba(255,255,255,0.06)`,
                  boxShadow: `0 24px 60px -15px rgba(0,0,0,0.8), 0 0 40px ${services[activeTab].glowColor}`,
                }}
              >
                {/* Floating particle glows */}
                <div 
                  className="absolute top-0 right-0 w-32 h-32 blur-[50px] rounded-full pointer-events-none transition-all duration-700"
                  style={{ background: services[activeTab].color, opacity: 0.15 }}
                />
                
                {/* Render the showcase corresponding to the active index */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <VisualContainer type={services[activeTab].visual} active={true} />
                  </motion.div>
                </AnimatePresence>

                {/* Subtitle badge under showcase card */}
                <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center pointer-events-none">
                  <span className="text-[10px] tracking-[0.2em] font-mono text-white/45 uppercase">Nexaris Core Engine</span>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: services[activeTab].color }} />
                </div>
              </div>
            </Tilt>
          </div>

        </div>

        {/* View all / CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex justify-center mt-20"
        >
          <motion.button
            whileHover={{ x: 4 }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-2 text-sm font-semibold transition-colors duration-200 cursor-pointer"
            style={{ color: 'rgba(160,168,192,0.7)' }}
          >
            Discuss a project
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" style={{ color: services[activeTab].color }} />
          </motion.button>
        </motion.div>

      </div>
    </section>
  )
}
