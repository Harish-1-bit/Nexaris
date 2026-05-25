import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Magnetic from './Magnetic'
import TextReveal from './TextReveal'

// Custom component for scroll-triggered text reveal
function ScrubText({ text }: { text: string }) {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 85%", "end 55%"] // Starts revealing when top hits 85% of viewport, ends at 55%
  })

  const words = text.split(" ")

  return (
    <p ref={container} className="text-xl md:text-2xl leading-relaxed font-medium flex flex-wrap gap-x-1.5 md:gap-x-2">
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + (1 / words.length)
        const color = useTransform(scrollYProgress, [start, end], ['rgba(160,168,192,0.15)', '#F0EEF8'])
        return (
          <motion.span key={i} style={{ color }}>
            {word}
          </motion.span>
        )
      })}
    </p>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="relative py-28 overflow-hidden" style={{ background: '#000000' }}>
      {/* subtle top border */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

      <div className="max-w-7xl mx-auto px-8 md:px-14">
        {/* label */}
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-xs font-medium tracking-[0.2em] uppercase mb-10"
          style={{ color: '#FF5E00' }}
        >
          About
        </motion.p>

        {/* two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* left — big heading */}
          <TextReveal
            lines={["Everything you need.", "Under one roof."]}
            className="font-display font-bold text-white leading-[1.08] tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4.2vw, 3.6rem)' }}
            delay={0.1}
          />

          {/* right — body + cta */}
          <div className="flex flex-col gap-10">
            {/* Interactive Scroll Text */}
            <ScrubText text="Nexaris is your all-in-one digital powerhouse. From cutting-edge web & app development to strategic content writing and elite video editing, we provide the full spectrum of services necessary to scale your enterprise online." />

            <Magnetic>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 4 }}
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.hash = 'contact';
                  }
                }}
                className="group inline-flex items-center gap-2 text-sm font-medium self-start cursor-pointer"
                style={{ color: '#a0a8c0' }}
              >
                Discover the studio
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" style={{ color: '#FF5E00' }} />
              </motion.button>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  )
}
