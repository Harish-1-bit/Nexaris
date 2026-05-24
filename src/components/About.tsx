import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

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
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="font-display font-bold text-white leading-[1.08] tracking-tight"
              style={{ fontSize: 'clamp(2rem, 4.2vw, 3.6rem)' }}
            >
              An approach built<br />on one belief.
            </h2>
          </motion.div>

          {/* right — body + cta */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <motion.button
              whileHover={{ x: 4 }}
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/contact';
                }
              }}
              className="group inline-flex items-center gap-2 text-sm font-medium self-start cursor-pointer"
              style={{ color: '#a0a8c0' }}
            >
              Discover the studio
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" style={{ color: '#FF5E00' }} />
            </motion.button>

            <p className="text-base leading-relaxed" style={{ color: 'rgba(160,168,192,0.85)' }}>
              Nexaris was founded on a simple idea: your digital presence should reflect who you
              actually are. That's been our driving force since day one, and it shapes every
              project we take on — from brand identity to full-stack development.
            </p>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
