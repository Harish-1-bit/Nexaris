import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  
  // Slow spring for the massive ambient background glow
  const springXGlow = useSpring(mouseX, { stiffness: 80, damping: 25 })
  const springYGlow = useSpring(mouseY, { stiffness: 80, damping: 25 })

  // Fast spring for the custom cursor ring
  const springXCursor = useSpring(mouseX, { stiffness: 400, damping: 28 })
  const springYCursor = useSpring(mouseY, { stiffness: 400, damping: 28 })

  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      
      // Check if hovering over a clickable element
      const target = e.target as HTMLElement
      const isClickable = target.closest('a') || target.closest('button') || target.closest('.cursor-pointer') || target.closest('[role="button"]')
      setIsHovering(!!isClickable)
    }
    
    // Hide native cursor site-wide (premium agency feel)
    const style = document.createElement('style')
    style.innerHTML = `* { cursor: none !important; }`
    document.head.appendChild(style)
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.head.removeChild(style)
    }
  }, [mouseX, mouseY])

  return (
    <>
      {/* Massive Ambient Glow */}
      <motion.div
        className="pointer-events-none fixed z-0 rounded-full"
        style={{
          width: 600,
          height: 600,
          x: springXGlow,
          y: springYGlow,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(255,48,48,0.06) 0%, transparent 70%)',
        }}
      />
      
      {/* Custom Solid Cursor Dot (Instant Follow) */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full"
        animate={{ opacity: isHovering ? 0 : 1, scale: isHovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        style={{
          width: 6,
          height: 6,
          x: mouseX, 
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          background: '#FF5E00',
          boxShadow: '0 0 10px rgba(255, 94, 0, 0.8)'
        }}
      />

      {/* Custom Cursor Trailing Ring (Spring Follow + Hover Expansion) */}
      <motion.div
        className="pointer-events-none fixed z-[9998] rounded-full"
        initial={false}
        animate={{
          width: isHovering ? 56 : 32,
          height: isHovering ? 56 : 32,
          backgroundColor: isHovering ? 'rgba(255, 94, 0, 0.15)' : 'transparent',
          border: isHovering ? '1px solid rgba(255, 94, 0, 0.5)' : '1px solid rgba(255, 94, 0, 0.3)',
          backdropFilter: isHovering ? 'blur(2px)' : 'none',
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{
          x: springXCursor,
          y: springYCursor,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* "VIEW" text that appears on hover (can be customized further later) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering ? 0 : 0 }} // Hidden by default, we can make it show on specific items later
          className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[#FF5E00] tracking-wider"
        >
          VIEW
        </motion.div>
      </motion.div>
    </>
  )
}
