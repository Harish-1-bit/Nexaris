import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Luminary Finance',
    tags: ['Branding', 'UX/UI Design', 'Web Development'],
    description:
      'A next-generation wealth management platform. We refined their visual identity and rebuilt their website to reflect strategic insight and decisive action.',
    col: 'left',
  },
  {
    id: 2,
    title: 'Aura Health',
    tags: ['UX/UI Design', 'Web Development', 'Photography'],
    description:
      'Mindfulness and wellness platform with personalized coaching. A complete digital experience built around calm, clarity, and user wellbeing.',
    col: 'right',
  },
  {
    id: 3,
    title: 'C-Carré',
    tags: ['Branding', 'UX/UI Design', 'Web Development'],
    description:
      'A smart B2B solution tracking energy consumption and certifications. Built for businesses seeking better performance and compliance.',
    col: 'left',
  },
  {
    id: 4,
    title: 'Varros Diagnostic',
    tags: ['Branding', 'UX/UI Design', 'Web Development'],
    description:
      'A diagnostic tool helping professionals identify and treat critical issues. The site serves as a trusted reference across the industry.',
    col: 'right',
  },
  {
    id: 5,
    title: 'Solaris Commerce',
    tags: ['Branding', 'UX/UI Design', 'Web Development'],
    description:
      'Premium e-commerce experience for a luxury lifestyle brand. Immersive product storytelling with a +180% conversion rate improvement.',
    col: 'left',
  },
]

/* gradient visual per project */
const palettes = [
  { a: 'rgba(108,59,255,0.4)',  b: 'rgba(168,85,247,0.18)', line: '#A855F7' },
  { a: 'rgba(108,59,255,0.35)', b: 'rgba(168,85,247,0.14)', line: '#9B72FF' },
  { a: 'rgba(80,40,200,0.45)',  b: 'rgba(168,85,247,0.12)', line: '#A855F7' },
  { a: 'rgba(60,20,140,0.5)',   b: 'rgba(108,59,255,0.18)', line: '#6C3BFF' },
  { a: 'rgba(90,40,180,0.38)',  b: 'rgba(168,85,247,0.15)', line: '#A855F7' },
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
          backgroundSize: '30px 30px',
        }} />
      {/* center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full"
        style={{ background: `radial-gradient(circle,${p.line}28 0%,transparent 70%)`, filter: 'blur(18px)' }} />
      {/* decorative rings */}
      <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 280 200">
        <circle cx="140" cy="100" r="60" fill="none" stroke={p.line} strokeWidth="0.8" />
        <circle cx="140" cy="100" r="38" fill="none" stroke={p.line} strokeWidth="0.5" />
        <line x1="80"  y1="40"  x2="200" y2="160" stroke={p.line} strokeWidth="0.5" opacity=".5" />
        <line x1="200" y1="40"  x2="80"  y2="160" stroke={p.line} strokeWidth="0.5" opacity=".5" />
      </svg>
      {/* bottom shimmer */}
      <div className="absolute bottom-0 inset-x-0 h-1 rounded-full opacity-40"
        style={{ background: `linear-gradient(to right,transparent,${p.line},transparent)` }} />
    </div>
  )
}

function ProjectCard({ project, index, col }: { project: typeof projects[0]; index: number; col: 'left' | 'right' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-70px' })
  const row = Math.floor(index / 2)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: col === 'left' ? -50 : 50, y: 16 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.82, delay: row * 0.13, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer"
    >
      {/* image */}
      <div className="relative w-full rounded-xl overflow-hidden mb-5" style={{ aspectRatio: '4/3' }}>
        <ProjectVisual id={project.id} />

        {/* tags overlay — bottom-left like AKIS */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-10">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-md text-[10px] font-medium"
              style={{ background: 'rgba(8,5,16,0.78)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }}>
              {tag}
            </span>
          ))}
        </div>

        {/* hover overlay */}
        <motion.div
          initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }}
          className="absolute inset-0"
          style={{ background: 'rgba(168,85,247,0.04)' }} />
      </div>

      {/* text */}
      <h3 className="font-display font-bold text-lg mb-2 transition-colors duration-300"
        style={{ color: '#e8eaf0' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#A855F7')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#e8eaf0')}>
        {project.title}
      </h3>
      <p className="text-sm leading-relaxed line-clamp-3" style={{ color: 'rgba(160,168,192,0.75)' }}>
        {project.description}
      </p>
    </motion.div>
  )
}

/* mid-section CTA — matches AKIS "Got a project in mind?" block */
function MidCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="col-span-1 md:col-span-2 rounded-2xl p-10 flex flex-col items-start gap-5 my-2"
      style={{ background: 'rgba(14,10,31,0.6)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <h3 className="font-display font-bold text-white text-2xl leading-snug">
        Got a project in mind?
      </h3>
      <p className="text-sm" style={{ color: 'rgba(160,168,192,0.75)' }}>
        Free 30-minute call to talk about your project.
      </p>
      <motion.button
        whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(168,85,247,0.3)' }}
        whileTap={{ scale: 0.97 }}
        onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
        className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
        style={{ background: 'linear-gradient(135deg,#A855F7,#6C3BFF)', color: '#080510' }}
      >
        See how we can help <ArrowRight size={14} />
      </motion.button>
    </motion.div>
  )
}

export default function Work() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  const leftProjects  = projects.filter((p) => p.col === 'left')
  const rightProjects = projects.filter((p) => p.col === 'right')

  return (
    <section id="work" className="relative py-28 overflow-hidden" style={{ background: '#000' }}>
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

      {/* right ambient glow */}
      <div className="absolute right-0 top-1/3 w-[420px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at right,rgba(108,59,255,0.07) 0%,transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-8 md:px-14">
        {/* header — split layout */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs font-medium tracking-[0.2em] uppercase mb-5"
              style={{ color: '#A855F7' }}
            >
              Projects
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.72, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)' }}
            >
              Work that speaks.
            </motion.h2>
          </div>
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
        </div>

        {/* staggered 2-col grid — right col offset down like AKIS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
          {/* left column */}
          <div className="flex flex-col gap-14">
            {leftProjects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i * 2} col="left" />
            ))}
          </div>
          {/* right column — pushed down */}
          <div className="flex flex-col gap-14 md:pt-20">
            {rightProjects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i * 2 + 1} col="right" />
            ))}
          </div>
        </div>

        {/* mid CTA */}
        <div className="mt-14">
          <MidCTA />
        </div>

        {/* all projects link */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex justify-center mt-10 pt-10"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <motion.button
            whileHover={{ x: 4 }}
            className="group flex items-center gap-2 text-sm font-medium"
            style={{ color: 'rgba(160,168,192,0.7)' }}
          >
            All projects
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" style={{ color: '#A855F7' }} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
