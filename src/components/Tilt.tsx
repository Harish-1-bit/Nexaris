import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface TiltProps {
  children: React.ReactNode
  maxRotate?: number
  className?: string
}

export default function Tilt({ children, maxRotate = 10, className = '' }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  // Track relative cursor positions (-0.5 to 0.5)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Map to degree ranges
  const rotateX = useTransform(y, [-0.5, 0.5], [maxRotate, -maxRotate])
  const rotateY = useTransform(x, [-0.5, 0.5], [-maxRotate, maxRotate])

  // Apply responsive smoothing springs
  const springConfig = { stiffness: 180, damping: 22 }
  const springX = useSpring(rotateX, springConfig)
  const springY = useSpring(rotateY, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    // Calculate cursor distance from element boundaries
    const clientX = e.clientX - rect.left
    const clientY = e.clientY - rect.top
    // Shift coordinate from 0..1 range to -0.5..0.5 range
    x.set(clientX / rect.width - 0.5)
    y.set(clientY / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    // Reset to center
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
