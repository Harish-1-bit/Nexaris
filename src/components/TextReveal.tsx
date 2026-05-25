import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface TextRevealProps {
  lines: string[]
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  delay?: number
  gradientWords?: string[]
  gradientStyle?: React.CSSProperties
  style?: React.CSSProperties
}

export default function TextReveal({
  lines,
  className = '',
  tag = 'h2',
  delay = 0,
  gradientWords = [],
  gradientStyle = {
    background: 'linear-gradient(135deg, #F0EEF8 0%, #FF7A29 45%, #FF1E1E 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  style
}: TextRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  // Animation triggers once when top is 12% inside the viewport
  const isInView = useInView(ref, { once: true, margin: '-12%' })
  const Tag = tag

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  }

  const wordVariants = {
    hidden: { y: '120%' },
    visible: {
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // slick custom cubic-bezier
      },
    },
  }

  return (
    <Tag ref={ref} className={`overflow-hidden flex flex-col ${className}`} style={style}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="flex flex-col items-center"
      >
        {lines.map((line, lineIdx) => (
          <span key={lineIdx} className="flex flex-wrap justify-center leading-tight">
            {line.split(' ').map((word, wordIdx) => {
              // Strip punctuation to match highlighting keywords
              const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
              const isGradient = gradientWords.some(gw => 
                gw.toLowerCase() === cleanWord.toLowerCase() || 
                word.toLowerCase().includes(gw.toLowerCase())
              )

              return (
                <span
                  key={wordIdx}
                  className="inline-block overflow-hidden mr-[0.25em] py-[0.1em] -my-[0.1em]"
                >
                  <motion.span
                    variants={wordVariants}
                    className="inline-block origin-bottom"
                    style={isGradient ? gradientStyle : undefined}
                  >
                    {word}
                  </motion.span>
                </span>
              )
            })}
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
