import { motion } from 'framer-motion'

interface CurvedCurtainProps {
  mode: 'enter' | 'exit'
}

export default function CurvedCurtain({ mode }: CurvedCurtainProps) {
  // Enter mode: sweeps down from full cover (0) to reveal page (100)
  const enterVariants = {
    initial: {
      d: "M 0 0 L 100 0 L 100 100 L 0 100 Z"
    },
    animate: {
      d: [
        "M 0 0 L 100 0 L 100 100 L 0 100 Z",                  // Full screen cover
        "M 0 50 Q 50 100 100 50 L 100 100 L 0 100 Z",         // Liquid curve dropping down
        "M 0 100 L 100 100 L 100 100 L 0 100 Z"               // Flat collapsed at bottom
      ],
      transition: {
        duration: 0.85,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number]
      }
    }
  }

  // Exit mode: sweeps up from bottom (100) to cover screen (0)
  const exitVariants = {
    initial: {
      d: "M 0 100 L 100 100 L 100 100 L 0 100 Z"
    },
    exit: {
      d: [
        "M 0 100 L 100 100 L 100 100 L 0 100 Z",              // Flat collapsed at bottom
        "M 0 50 Q 50 0 100 50 L 100 100 L 0 100 Z",           // Liquid curve rising up
        "M 0 0 L 100 0 L 100 100 L 0 100 Z"                   // Full screen flat cover
      ],
      transition: {
        duration: 0.85,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number]
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none w-screen h-screen">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="curtainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF5E00" />
            <stop offset="100%" stopColor="#FF1E1E" />
          </linearGradient>
        </defs>
        {mode === 'enter' ? (
          <motion.path
            variants={enterVariants}
            initial="initial"
            animate="animate"
            fill="url(#curtainGrad)"
          />
        ) : (
          <motion.path
            variants={exitVariants}
            initial="initial"
            exit="exit"
            fill="url(#curtainGrad)"
          />
        )}
      </svg>
    </div>
  )
}
