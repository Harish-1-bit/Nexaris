import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface PreloaderProps {
  onComplete: () => void
}

const statusLogs = [
  { limit: 15, text: 'INIT_KERNEL_SEQUENCE' },
  { limit: 35, text: 'LOADING_DYNAMO_SHADERS' },
  { limit: 55, text: 'OPTIMIZING_EDGE_NET' },
  { limit: 75, text: 'RESOLVING_GRAVITATIONAL_GRID' },
  { limit: 90, text: 'COMPILING_BESPOKE_DOM' },
  { limit: 100, text: 'NEXARIS_CORE_ONLINE' },
]

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [currentLog, setCurrentLog] = useState(statusLogs[0].text)

  useEffect(() => {
    let current = 0
    
    // Irregular steps to feel like a real compile/load process
    const interval = setInterval(() => {
      const remaining = 100 - current
      // Speed up at the beginning, slow down at the end
      const maxStep = remaining > 40 ? 8 : remaining > 15 ? 4 : 2
      const step = Math.floor(Math.random() * maxStep) + 1
      
      current = Math.min(current + step, 100)
      setProgress(current)

      // Find matching log
      const activeLog = statusLogs.find(log => current <= log.limit)
      if (activeLog) {
        setCurrentLog(activeLog.text)
      }

      if (current >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          onComplete()
        }, 800) // Aesthetic delay at 100%
      }
    }, 70)

    return () => clearInterval(interval)
  }, [onComplete])
  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ 
        y: '-100%',
        transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[9999] bg-[#020202] flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Background cyber grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />
      
      {/* Ambient center radial glow */}
      <div 
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-15 transition-all duration-300"
        style={{
          background: 'radial-gradient(circle, #FF5E00 0%, #FF1E1E 100%)'
        }}
      />

      <div className="relative flex flex-col items-center gap-12 z-10">
        
        {/* Centered Counter typography */}
        <div className="flex flex-col items-center justify-center py-6">
          <span className="font-display font-black text-7xl md:text-8xl text-white tracking-tighter tabular-nums flex items-baseline select-none">
            {progress}
            <span className="text-2xl font-semibold text-white/30 ml-2">%</span>
          </span>
        </div>

        {/* Console Log status message */}
        <div className="flex flex-col items-center gap-2.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E00] animate-ping" />
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#FF5E00] uppercase font-bold">
              SYSTEM_BOOT
            </span>
          </div>
          <div className="h-4 flex items-center justify-center">
            <span className="text-[11px] font-mono tracking-widest text-white/50 uppercase">
              {`➜ [${currentLog}]`}
            </span>
          </div>
        </div>

      </div>

      {/* Extreme border progress lines */}
      <div className="absolute bottom-0 inset-x-0 h-0.5 bg-white/5 z-20">
        <motion.div
          className="h-full bg-gradient-to-r from-[#FF5E00] to-[#FF1E1E]"
          style={{ width: `${progress}%` }}
          transition={{ ease: 'easeOut', duration: 0.15 }}
        />
      </div>

    </motion.div>
  )
}
