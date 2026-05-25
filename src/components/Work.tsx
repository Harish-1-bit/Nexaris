import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Magnetic from './Magnetic'
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
  { a: 'rgba(255,30,30,0.32)',  b: 'rgba(255,94,0,0.14)', line: '#FF5E00' },
  { a: 'rgba(255,30,30,0.28)',  b: 'rgba(255,94,0,0.10)', line: '#FF7A29' },
  { a: 'rgba(200,40,40,0.35)',  b: 'rgba(255,94,0,0.08)', line: '#FF5E00' },
  { a: 'rgba(140,20,20,0.4)',   b: 'rgba(255,30,30,0.14)', line: '#FF1E1E' },
  { a: 'rgba(180,40,40,0.30)',  b: 'rgba(255,94,0,0.12)', line: '#FF5E00' },
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

function ProjectCardMobile({ project }: { project: typeof projects[0] }) {
  return (
    <div
      className="rounded-2xl overflow-hidden p-5 flex flex-col gap-4"
      style={{ background: 'rgba(15,15,15,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* visual */}
      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden">
        <ProjectVisual id={project.id} />
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1 z-10">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded text-[9px] font-medium"
              style={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,94,0,0.15)', color: 'rgba(255,255,255,0.8)' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      {/* text */}
      <div>
        <h4 className="font-display font-bold text-lg text-white mb-2">{project.title}</h4>
        <p className="text-xs leading-relaxed" style={{ color: 'rgba(160,168,192,0.7)' }}>{project.description}</p>
        <div className="flex items-center gap-1 text-xs font-semibold mt-4" style={{ color: '#FF5E00' }}>
          View Project <ArrowRight size={11} />
        </div>
      </div>
    </div>
  )
}

function ProjectCardDesktop({
  project,
  index,
  hoveredIndex,
  setHoveredIndex,
}: {
  project: typeof projects[0]
  index: number
  hoveredIndex: number | null
  setHoveredIndex: (idx: number | null) => void
}) {
  const baseX = (index - 2) * 300 // increased horizontal spacing offset
  const baseRotate = (index - 2) * 6 // rotational fan angle
  const baseTranslateY = Math.abs(index - 2) * 12 // vertical arc drop

  const isHovered = hoveredIndex === index
  const isLeft = hoveredIndex !== null && index < hoveredIndex
  const isRight = hoveredIndex !== null && index > hoveredIndex

  const x = isLeft ? baseX - 60 : isRight ? baseX + 60 : baseX
  const y = isHovered ? -20 : baseTranslateY
  const rotate = isHovered ? 0 : baseRotate
  const scale = isHovered ? 1.04 : (hoveredIndex !== null ? 0.96 : 1)
  const zIndex = isHovered ? 30 : 10 + index

  return (
    <motion.div
      onHoverStart={() => setHoveredIndex(index)}
      onHoverEnd={() => setHoveredIndex(null)}
      animate={{ x, y, rotate, scale, zIndex }}
      transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.85 }}
      className="absolute bottom-10 origin-bottom cursor-pointer rounded-2xl overflow-hidden p-5 flex flex-col justify-between"
      style={{
        width: 360,
        height: 480,
        background: 'rgba(15,15,15,0.85)',
        backdropFilter: 'blur(16px)',
        border: isHovered ? '1px solid rgba(255,94,0,0.35)' : '1px solid rgba(255,255,255,0.06)',
        boxShadow: isHovered ? '0 25px 60px rgba(255,30,30,0.12)' : 'none',
      }}
    >
      {/* Visual */}
      <div className="relative w-full h-[220px] rounded-xl overflow-hidden mb-4">
        <ProjectVisual id={project.id} />
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1 z-10">
          {project.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-2.5 py-0.5 rounded text-[10px] font-medium"
              style={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,94,0,0.15)', color: 'rgba(255,255,255,0.8)' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-display font-bold text-lg text-white mb-2 leading-tight">
            {project.title}
          </h4>
          <p className="text-sm leading-relaxed line-clamp-4" style={{ color: 'rgba(160,168,192,0.7)' }}>
            {project.description}
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold mt-3" style={{ color: '#FF5E00' }}>
          View Project <ArrowRight size={12} />
        </div>
      </div>
    </motion.div>
  )
}

/* mid-section CTA */
function MidCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl p-10 flex flex-col items-start gap-5 my-2"
      style={{ background: 'rgba(15,15,15,0.6)', border: '1px solid rgba(255,30,30,0.07)' }}
    >
      <h3 className="font-display font-bold text-white text-2xl leading-snug">
        Got a project in mind?
      </h3>
      <p className="text-sm" style={{ color: 'rgba(160,168,192,0.75)' }}>
        Free 30-minute call to talk about your project.
      </p>
      <Magnetic>
        <motion.button
          whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(255,94,0,0.3)' }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            const element = document.querySelector('#contact');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.location.href = '/contact';
            }
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold cursor-pointer"
          style={{ background: 'linear-gradient(135deg,#FF5E00,#FF1E1E)', color: '#000000' }}
        >
          See how we can help <ArrowRight size={14} />
        </motion.button>
      </Magnetic>
    </motion.div>
  )
}

export default function Work() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="work" className="relative py-28 overflow-hidden" style={{ background: '#000000' }}>
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

      {/* right ambient glow */}
      <div className="absolute right-0 top-1/3 w-[420px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at right,rgba(255,30,30,0.06) 0%,transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-8 md:px-14">
        {/* header — split layout */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs font-medium tracking-[0.2em] uppercase mb-5"
              style={{ color: '#FF5E00' }}
            >
              Projects
            </motion.p>
            <TextReveal
              lines={["Work that speaks."]}
              className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)' }}
            />
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

        {/* Desktop interactive card deck / Mobile grid layout */}
        <div className="relative w-full overflow-visible min-h-[480px] flex items-center justify-center my-10">
          
          {/* Mobile vertical stack layout */}
          <div className="flex flex-col gap-8 w-full md:hidden">
            {projects.map((project) => (
              <ProjectCardMobile key={project.id} project={project} />
            ))}
          </div>

          {/* Desktop interactive fanned deck */}
          <div className="hidden md:flex relative justify-center items-end h-[560px] w-full overflow-visible">
            {projects.map((project, i) => (
              <ProjectCardDesktop
                key={project.id}
                project={project}
                index={i}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
              />
            ))}
          </div>
        </div>

        {/* mid CTA */}
        <div className="mt-20">
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
          <Magnetic>
            <motion.button
              whileHover={{ x: 4 }}
              className="group flex items-center gap-2 text-sm font-medium cursor-pointer"
              style={{ color: 'rgba(160,168,192,0.7)' }}
            >
              All projects
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" style={{ color: '#FF5E00' }} />
            </motion.button>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}
