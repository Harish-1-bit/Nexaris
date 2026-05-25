import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'How much does an entire digital ecosystem cost?',
    a: 'Every enterprise is unique. Pricing depends on the scope of services—whether you need full-stack development, brand strategy, or ongoing digital marketing. We offer a free discovery call to outline a custom, transparent proposal.',
  },
  {
    q: 'Can my business get subsidies for your services?',
    a: 'Depending on your region and business type, digital transformation subsidies may be available. We can guide you through the options during our initial consultation.',
  },
  {
    q: "I don't have a clear idea yet. Can we still talk?",
    a: "Absolutely. Some of our best projects started with just a feeling or a problem to solve. We're here to help you shape the vision before we build it.",
  },
  {
    q: 'What is your process for full-scale digital transformations?',
    a: 'Our process is fully integrated: Discovery (aligning on business goals), Strategy (planning architecture, brand, and marketing), Execution (design, code, video, and content creation), and Scaling (deployment, analytics, and continuous growth).',
  },
  {
    q: 'What kind of businesses work with Nexaris?',
    a: 'We work with startups, scale-ups, and established companies across industries — from fintech and healthcare to retail and professional services. If you have ambition, we have the tools.',
  },
  {
    q: 'Do you offer support after launch?',
    a: 'Yes. We offer ongoing maintenance, performance monitoring, and growth support packages. We see launch as the beginning of the relationship, not the end.',
  },
  {
    q: 'Where are your clients from?',
    a: 'Our clients are based across North America, Europe, and beyond. We work fully remotely and have delivered projects across 15+ countries.',
  },
]

function FAQItem({ item, index }: { item: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="border-b"
      style={{ borderColor: 'rgba(255,255,255,0.07)' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span
          className="text-sm font-medium pr-8 transition-colors duration-200"
          style={{ color: open ? '#e8eaf0' : 'rgba(232,234,240,0.75)' }}
        >
          {item.q}
        </span>
        <span
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: open ? 'rgba(255,94,0,0.15)' : 'rgba(255,255,255,0.06)',
            color: open ? '#FF5E00' : 'rgba(160,168,192,0.6)',
          }}
        >
          {open ? <Minus size={12} /> : <Plus size={12} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p
              className="text-sm leading-relaxed pb-5 pr-10"
              style={{ color: 'rgba(160,168,192,0.75)' }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative py-28 overflow-hidden" style={{ background: '#000000' }}>
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

      {/* subtle ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top,rgba(255,30,30,0.05) 0%,transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-8 md:px-14">
        {/* header */}
        <div ref={ref} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs font-medium tracking-[0.2em] uppercase mb-5"
              style={{ color: '#FF5E00' }}
            >
              FAQ
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.72, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
            >
              Frequently asked<br />questions
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm max-w-xs md:text-right"
            style={{ color: 'rgba(160,168,192,0.6)' }}
          >
            Can't find what you're looking for?{' '}
            <button
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.hash = 'contact';
                }
              }}
              className="underline underline-offset-2 hover:text-white transition-colors cursor-pointer"
              style={{ color: 'rgba(160,168,192,0.6)' }}
            >
              Let's talk.
            </button>
          </motion.p>
        </div>

        {/* two-column FAQ grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16">
          <div>
            {faqs.slice(0, Math.ceil(faqs.length / 2)).map((item, i) => (
              <FAQItem key={i} item={item} index={i} />
            ))}
          </div>
          <div>
            {faqs.slice(Math.ceil(faqs.length / 2)).map((item, i) => (
              <FAQItem key={i} item={item} index={i + Math.ceil(faqs.length / 2)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
