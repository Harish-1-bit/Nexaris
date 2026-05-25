import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import TextReveal from './TextReveal'

const chapters = [
  {
    year: '2017',
    chapter: 'Chapter I',
    title: 'The Spark',
    body: 'It started in a small studio with a big question: why do most digital products feel forgettable? Three designers and two engineers decided to answer it — by building things that actually matter.',
    accent: 'from-orange-500 to-red-500',
  },
  {
    year: '2019',
    chapter: 'Chapter II',
    title: 'The Craft',
    body: 'We stopped chasing trends and started setting them. Our obsession with craft — every pixel, every interaction, every line of code — earned us our first international clients and industry recognition.',
    accent: 'from-red-500 to-orange-500',
  },
  {
    year: '2021',
    chapter: 'Chapter III',
    title: 'The Scale',
    body: 'What began as a boutique studio grew into a full-service digital powerhouse. We expanded our capabilities across mobile, video, branding, and marketing — without ever compromising on quality.',
    accent: 'from-orange-400 to-red-400',
  },
  {
    year: '2024',
    chapter: 'Chapter IV',
    title: 'The Future',
    body: 'Today, Nexaris stands at the intersection of technology and storytelling. We\'re not just building products — we\'re shaping how the world experiences brands in the digital age.',
    accent: 'from-red-400 to-orange-500',
  },
]

function ChapterCard({ chapter, index }: { chapter: typeof chapters[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 mb-24`}
    >
      {/* Year bubble */}
      <div className="flex-shrink-0 relative">
        <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${chapter.accent} p-0.5`}>
          <div className="w-full h-full rounded-full bg-black flex flex-col items-center justify-center">
            <span className="text-2xl font-display font-bold text-white-soft">{chapter.year}</span>
          </div>
        </div>
        {/* Connecting line */}
        {index < chapters.length - 1 && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-orange-500/40 to-transparent hidden md:block" />
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 ${isEven ? 'md:text-left' : 'md:text-right'} text-center`}>
        <span className="text-orange-500/70 text-xs font-medium tracking-widest uppercase mb-2 block">
          {chapter.chapter}
        </span>
        <h3 className="font-display font-bold text-3xl text-white-soft mb-4">
          {chapter.title}
        </h3>
        <p className="text-muted text-base leading-relaxed max-w-lg">
          {chapter.body}
        </p>
      </div>
    </motion.div>
  )
}

export default function Story() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section id="story" ref={containerRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-black" />

      {/* Animated vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 hidden md:block">
        <motion.div
          style={{ height: lineHeight }}
          className="w-full bg-gradient-to-b from-red-500 via-orange-400 to-red-500"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-orange-500/20 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span className="text-orange-500 text-xs font-medium tracking-widest uppercase">
              Our Journey
            </span>
          </motion.div>

          <TextReveal
            lines={["A Story of Relentless", "Innovation"]}
            gradientWords={["Relentless"]}
            className="font-display font-bold text-white-soft text-center mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            delay={0.1}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-muted text-lg max-w-xl mx-auto"
          >
            Every great brand has a story. Here's ours — told in chapters, 
            built in code, and measured in impact.
          </motion.p>
        </div>

        {/* Chapters */}
        {chapters.map((chapter, i) => (
          <ChapterCard key={chapter.year} chapter={chapter} index={i} />
        ))}

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-12 p-12 rounded-3xl glass border border-orange-500/10"
        >
          <p className="font-display font-bold text-white-soft text-2xl md:text-3xl leading-relaxed">
            "We don't just build digital products.{' '}
            <span className="text-gradient">We build the next chapter</span>{' '}
            of your brand's story."
          </p>
          <p className="text-muted mt-4 text-sm">— The Nexaris Team</p>
        </motion.div>
      </div>
    </section>
  )
}
