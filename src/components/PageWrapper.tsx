import { motion } from 'framer-motion'
import CurvedCurtain from './CurvedCurtain'

interface PageWrapperProps {
  children: React.ReactNode
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.85 }}
    >
      {/* Curtain sweeps down to reveal page */}
      <CurvedCurtain mode="enter" />
      {children}
      {/* Curtain sweeps up to cover page when exiting */}
      <CurvedCurtain mode="exit" />
    </motion.div>
  )
}
