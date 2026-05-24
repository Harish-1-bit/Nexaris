import { motion } from 'framer-motion'

const items = [
  'Website Development', '✦', 'Mobile Apps', '✦', 'UI/UX Design', '✦',
  'Video Production', '✦', 'Brand Identity', '✦', 'Digital Marketing', '✦',
  'Content Strategy', '✦', 'Innovation', '✦', 'Excellence', '✦',
]

export default function Marquee() {
  return (
    <div
      className="relative py-5 overflow-hidden"
      style={{
        borderTop: '1px solid rgba(255,94,0,0.12)',
        borderBottom: '1px solid rgba(255,94,0,0.12)',
        background: 'rgba(20,20,20,0.6)',
      }}
    >
      <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right,#000000,transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left,#000000,transparent)' }} />

      <div className="flex">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          className="flex items-center gap-8 whitespace-nowrap"
          style={{ willChange: 'transform' }}
        >
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="text-xs font-medium tracking-[0.18em] uppercase"
              style={{
                color: item === '✦'
                  ? (i % 6 === 1 ? '#FF5E00' : i % 6 === 3 ? '#FF1E1E' : '#FF7A29')
                  : 'rgba(155,147,184,0.65)',
              }}
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
