import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    quote: "We called on Nexaris for our branding and digital presence. Perfect support from start to finish. The team took all our wishes into consideration, but also knew how to advise us on the best approach for our target audience. We recommend them without a doubt.",
    author: 'Sarah Mitchell',
    role: 'CEO',
    company: 'Luminary Finance',
    initials: 'SM',
  },
  {
    quote: "Working with Nexaris felt like having a world-class creative partner embedded in our team. They understood our vision immediately and delivered something that exceeded every expectation we had going in.",
    author: 'David Park',
    role: 'Founder',
    company: 'Aura Health',
    initials: 'DP',
  },
  {
    quote: "The brand identity Nexaris created became the foundation of our entire market positioning. Three years later it still feels fresh, modern, and completely authentic to who we are as a company.",
    author: 'Elena Vasquez',
    role: 'CMO',
    company: 'Vertex Studio',
    initials: 'EV',
  },
  {
    quote: "Our platform went from concept to launch in under six months. Nexaris's process is rigorous, their communication is impeccable, and their output is consistently extraordinary.",
    author: 'James Okafor',
    role: 'CTO',
    company: 'Pulse Technologies',
    initials: 'JO',
  },
]

/* client logo placeholders */
const clients = ['Luminary', 'Aura', 'Vertex', 'Pulse', 'Solaris']

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)
  const t = testimonials[current]

  return (
    <section className="relative py-28 overflow-hidden" style={{ background: '#000' }}>
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

      <div className="max-w-6xl mx-auto px-8 md:px-14">
        {/* label */}
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs font-medium tracking-[0.2em] uppercase mb-14"
          style={{ color: '#A855F7' }}
        >
          Testimonies
        </motion.p>

        {/* heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.72, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-white mb-14"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
        >
          What our clients say
        </motion.h2>

        {/* carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* quote — 3 cols */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* opening quote mark */}
                <div className="text-6xl font-display font-bold leading-none mb-4 select-none"
                  style={{ color: 'rgba(168,85,247,0.25)' }}>
                  "
                </div>
                <blockquote
                  className="text-base md:text-lg leading-relaxed mb-8 font-light"
                  style={{ color: 'rgba(232,234,240,0.9)' }}
                >
                  {t.quote}
                </blockquote>

                {/* author */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,rgba(108,59,255,0.6),rgba(168,85,247,0.6))', color: '#e8eaf0' }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: '#e8eaf0' }}>{t.author}</div>
                    <div className="text-xs" style={{ color: 'rgba(160,168,192,0.7)' }}>{t.role}, {t.company}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* nav */}
            <div className="flex items-center gap-4 mt-10">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(160,168,192,0.7)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(168,85,247,0.4)'; (e.currentTarget as HTMLElement).style.color = '#A855F7' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLElement).style.color = 'rgba(160,168,192,0.7)' }}
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === current ? 24 : 8,
                      height: 8,
                      background: i === current
                        ? 'linear-gradient(to right,#6C3BFF,#A855F7)'
                        : 'rgba(255,255,255,0.18)',
                    }}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(160,168,192,0.7)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(168,85,247,0.4)'; (e.currentTarget as HTMLElement).style.color = '#A855F7' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLElement).style.color = 'rgba(160,168,192,0.7)' }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* client logos — 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-4 lg:pt-2">
            {clients.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.07 }}
                className="flex items-center justify-center h-14 rounded-xl"
                style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(14,10,31,0.4)' }}
              >
                <span className="font-display font-bold text-sm tracking-widest uppercase"
                  style={{ color: 'rgba(160,168,192,0.45)' }}>
                  {name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
