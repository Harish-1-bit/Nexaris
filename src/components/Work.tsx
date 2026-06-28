import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import TextReveal from './TextReveal'

const projects = [
  {
    id: 1,
    title: 'Luminary Finance',
    tags: ['Branding', 'UX/UI Design', 'Web Development'],
    description:
      'A next-generation wealth management platform. We refined their visual identity and rebuilt their website to reflect strategic insight and decisive action.',
  },
  {
    id: 2,
    title: 'Aura Health',
    tags: ['UX/UI Design', 'Web Development', 'Photography'],
    description:
      'Mindfulness and wellness platform with personalized coaching. A complete digital experience built around calm, clarity, and user wellbeing.',
  },
  {
    id: 3,
    title: 'C-Carré',
    tags: ['Branding', 'UX/UI Design', 'Web Development'],
    description:
      'A smart B2B solution tracking energy consumption and certifications. Built for businesses seeking better performance and compliance.',
  },
  {
    id: 4,
    title: 'Varros Diagnostic',
    tags: ['Branding', 'UX/UI Design', 'Web Development'],
    description:
      'A diagnostic tool helping professionals identify and treat critical issues. The site serves as a trusted reference across the industry.',
  },
  {
    id: 5,
    title: 'Solaris Commerce',
    tags: ['Branding', 'UX/UI Design', 'Web Development'],
    description:
      'Premium e-commerce experience for a luxury lifestyle brand. Immersive product storytelling with a +180% conversion rate improvement.',
  },
]

/* gradient visual per project */
const palettes = [
  { a: 'rgba(48,102,190,0.32)',  b: 'rgba(239,62,54,0.14)', line: '#3066BE' },
  { a: 'rgba(239,62,54,0.28)',  b: 'rgba(48,102,190,0.10)', line: '#EF3E36' },
  { a: 'rgba(48,102,190,0.35)',  b: 'rgba(239,62,54,0.08)', line: '#3066BE' },
  { a: 'rgba(239,62,54,0.4)',   b: 'rgba(48,102,190,0.14)', line: '#EF3E36' },
  { a: 'rgba(48,102,190,0.30)',  b: 'rgba(239,62,54,0.12)', line: '#3066BE' },
]

function ProjectVisual({ id }: { id: number }) {
  const p = palettes[(id - 1) % palettes.length]
  return (
    <div className="w-full h-full relative overflow-hidden"
      style={{ background: `linear-gradient(135deg,${p.a},${p.b})` }}>
      {/* grid */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${p.line}15 1px,transparent 1px),linear-gradient(90deg,${p.line}15 1px,transparent 1px)`,
          backgroundSize: '24px 24px',
        }} />
      {/* center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full"
        style={{ background: `radial-gradient(circle,${p.line}28 0%,transparent 70%)`, filter: 'blur(14px)' }} />
      {/* decorative rings */}
      <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 280 200">
        <circle cx="140" cy="100" r="50" fill="none" stroke={p.line} strokeWidth="0.8" />
        <circle cx="140" cy="100" r="30" fill="none" stroke={p.line} strokeWidth="0.5" />
        <line x1="80"  y1="40"  x2="200" y2="160" stroke={p.line} strokeWidth="0.5" opacity=".5" />
        <line x1="200" y1="40"  x2="80"  y2="160" stroke={p.line} strokeWidth="0.5" opacity=".5" />
      </svg>
      {/* bottom shimmer */}
      <div className="absolute bottom-0 inset-x-0 h-1 rounded-full opacity-40"
        style={{ background: `linear-gradient(to right,transparent,${p.line},transparent)` }} />
    </div>
  )
}

export default function Work() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })
  const carouselRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const interactedRef = useRef(false)

  // Auto rotation every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (!interactedRef.current) {
        setActiveIndex((prev) => prev + 1)
      }
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  const handlePrev = () => {
    interactedRef.current = true
    setActiveIndex((prev) => prev - 1)
  }

  const handleNext = () => {
    interactedRef.current = true
    setActiveIndex((prev) => prev + 1)
  }

  return (
    <section id="work" className="relative py-28 overflow-hidden bg-black select-none">
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

      {/* right ambient glow */}
      <div className="absolute right-0 top-1/3 w-[420px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at right,rgba(239,62,54,0.06) 0%,transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-8 md:px-14">
        {/* header — split layout */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs font-medium tracking-[0.2em] uppercase mb-5"
              style={{ color: '#3066BE' }}
            >
              Projects
            </motion.p>
            <TextReveal
              lines={["Work that speaks."]}
              className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)' }}
            />
          </div>
          
          <div className="flex flex-col md:items-end gap-6">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-sm leading-relaxed max-w-xs md:text-right"
              style={{ color: 'rgba(160,168,192,0.75)' }}
            >
              We support brands in creating unique and memorable digital experiences.
              Browse our projects and dive into our world.
            </motion.p>
            
            {/* Custom Slider Navigation */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 bg-transparent"
                style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(160,168,192,0.7)', cursor: 'pointer' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(48,102,190,0.4)'; (e.currentTarget as HTMLElement).style.color = '#3066BE' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLElement).style.color = 'rgba(160,168,192,0.7)' }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 bg-transparent"
                style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(160,168,192,0.7)', cursor: 'pointer' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(48,102,190,0.4)'; (e.currentTarget as HTMLElement).style.color = '#3066BE' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLElement).style.color = 'rgba(160,168,192,0.7)' }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Section */}
        <div ref={carouselRef} className="mt-10 flex flex-col items-center justify-center gap-4 relative z-10 w-full overflow-hidden px-4 py-8">
          <div className="flex items-center justify-center w-full max-w-[1100px]">
            <div className="relative perspective-[1200px] flex items-center justify-center h-[460px] w-full max-w-[80vw] md:max-w-[800px] overflow-visible">
              {projects.map((project, i) => {
                const n = projects.length;
                // Normalize active index to safely handle negative values
                const active = ((activeIndex % n) + n) % n;
                
                // Calculate shortest path offset on the circle
                let offset = i - active;
                if (offset > Math.floor(n / 2)) offset -= n;
                if (offset < -Math.floor(n / 2)) offset += n;

                const isActive = offset === 0;
                // Adjust opacity and z-index based on distance from center
                const zIndex = 20 - Math.abs(offset);
                const opacity = isActive ? 1 : Math.max(0.1, 1 - Math.abs(offset) * 0.4);
                const scale = isActive ? 1.1 : 0.95 - Math.abs(offset) * 0.05;
                const translateX = offset * 200; // Spread out the cards horizontally

                return (
                  <div 
                    key={project.id}
                    className="w-[260px] md:w-[280px] h-[400px] md:h-[420px] rounded-[12px] border border-[rgba(255,255,255,0.1)] bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] p-6 flex flex-col justify-between shadow-2xl absolute transition-all duration-500 ease-out cursor-pointer select-none"
                    onClick={() => {
                      interactedRef.current = true;
                      setActiveIndex(activeIndex + offset);
                    }}
                    style={{ 
                      transformOrigin: 'top center',
                      transform: `translateX(${translateX}px) translateY(${Math.abs(offset) * 30}px) rotateY(${offset * 15}deg) rotateZ(${offset * 5}deg) scale(${scale})`,
                      zIndex,
                      opacity,
                      pointerEvents: Math.abs(offset) > 2 ? 'none' : 'auto'
                    }}
                  >
                    <div>
                      <p className="text-[rgba(255,255,255,0.4)] font-sans text-[12px] mb-4">0{project.id}</p>
                      <h3 className="text-[20px] md:text-[22px] font-display font-medium leading-[1.2] text-white tracking-[-0.01em]">{project.title}</h3>
                    </div>
                    
                    {/* Visual Graphics Container */}
                    <div className="h-32 md:h-40 rounded-[4px] overflow-hidden bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] flex items-center justify-center relative">
                      <ProjectVisual id={project.id} />
                    </div>
                    
                    <p className="text-[rgba(255,255,255,0.5)] font-sans text-[13px] leading-[1.6] line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col items-center mt-10 md:mt-12 max-w-[800px] mx-auto px-6">
            <p className="text-center text-[rgba(255,255,255,0.5)] text-[16px] md:text-[18px] leading-relaxed">
              Five core systems. Each one eliminates a specific way your business loses leads. Together, they make growth inevitable.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <a
              href="/contact"
              className="font-sans font-medium text-[14px] bg-white text-[#0A0A0A] py-3 px-7 rounded-[4px] hover:opacity-85 transition-opacity duration-200"
            >
              Start a project →
            </a>
            <a
              href="https://topmate.io/the_hustle_house/1492097"
              target="_blank"
              rel="noopener noreferrer"
              data-gtm="book-call"
              className="font-sans font-medium text-[14px] bg-transparent text-[rgba(255,255,255,0.75)] border-[0.5px] border-[rgba(255,255,255,0.3)] py-3 px-7 rounded-[4px] hover:border-white hover:text-white transition-colors duration-200"
            >
              Book a strategy call →
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
