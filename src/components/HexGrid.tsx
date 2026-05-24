import { useMemo, useEffect, useRef } from 'react'

export default function HexGrid() {
  const spotlightRef = useRef<HTMLDivElement>(null)

  // Direct DOM manipulation for spotlight to prevent 60FPS React re-renders of the entire grid!
  useEffect(() => {
    let rafId = 0
    const onMove = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        if (spotlightRef.current) {
          const x = (e.clientX / window.innerWidth) * 100
          const y = (e.clientY / window.innerHeight) * 100
          spotlightRef.current.style.background = `radial-gradient(circle 1000px at ${x}% ${y}%, rgba(255, 94, 0, 0.2), transparent 60%)`
        }
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // Massively increase hex size to reduce total DOM nodes
  const hexWidth = 260
  const hexHeight = 225
  const colSpacing = hexWidth * 0.75
  const rowSpacing = hexHeight

  // Reduce grid dimensions to prevent lag (18x24 = 432 hexes, much better than 1000+)
  const cols = 18
  const rows = 24

  const hexes = useMemo(() => {
    const items = []
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const x = c * colSpacing
        let y = r * rowSpacing
        if (c % 2 === 1) {
          y += rowSpacing / 2
        }

        const elevated = Math.random() > 0.85
        const elevation = elevated ? 30 : 0
        const baseOpacity = 0.4 + Math.random() * 0.4

        items.push(
          <div
            key={`${c}-${r}`}
            className="absolute transition-transform duration-500 ease-out cursor-pointer hover:z-20 group"
            style={{
              left: x,
              top: y,
              width: hexWidth - 4,
              height: hexHeight - 4,
              transformStyle: 'preserve-3d',
              transform: `translateZ(${elevation}px)`,
            }}
          >
            {/* Reduced to 2 layers for maximum performance */}
            {[0, 25].map((zDepth, i) => {
              const isTop = i === 0
              return (
                <div 
                  key={i}
                  className={`absolute inset-0 transition-transform duration-300 ease-out ${isTop ? 'group-hover:-translate-y-2' : ''}`}
                  style={{
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                    transform: `translateZ(${-zDepth}px) scale(0.99)`,
                    background: isTop 
                      ? `linear-gradient(135deg, rgba(255, 120, 40, ${baseOpacity}), rgba(200, 20, 0, ${baseOpacity - 0.2}))`
                      : `rgba(90, 10, 0, ${1 - i * 0.4})`, // Darker sides
                  }}
                >
                  {isTop && (
                    <div 
                      className="absolute inset-0 transition-opacity duration-300 opacity-60 group-hover:opacity-100"
                      style={{
                        background: 'linear-gradient(to bottom right, rgba(255,255,255,0.4) 0%, transparent 40%, rgba(255,255,255,0.1) 100%)',
                      }}
                    />
                  )}
                  {isTop && (
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(255, 94, 0, 0.8) 0%, transparent 70%)',
                      }}
                    />
                  )}
                </div>
              )
            })}
          </div>
        )
      }
    }
    return items
  }, [hexWidth, hexHeight, colSpacing, rowSpacing, cols, rows])

  const gridWidth = cols * colSpacing
  const gridHeight = rows * rowSpacing

  return (
    <div 
      className="absolute inset-0 overflow-hidden bg-black pointer-events-auto" 
      style={{ perspective: '1000px' }}
    >
      <div 
        className="absolute top-1/2 left-1/2"
        style={{
          width: gridWidth,
          height: gridHeight,
          transform: 'translate(-50%, -20%) rotateX(72deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="relative w-full h-full">
          {/* Spotlight mapped to ref instead of state to prevent re-renders */}
          <div 
            ref={spotlightRef}
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: `radial-gradient(circle 1000px at 50% 50%, rgba(255, 94, 0, 0.2), transparent 60%)`,
              willChange: 'background',
              transform: 'translateZ(1px)',
            }}
          />
          {hexes}
        </div>
      </div>

      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: 'radial-gradient(ellipse 150% 100% at 50% 100%, transparent 30%, #000000 85%)',
        }}
      />
      
      <div 
        className="absolute top-0 inset-x-0 h-[70%] pointer-events-none" 
        style={{
          background: 'linear-gradient(to bottom, #000000 0%, #000000 20%, rgba(0,0,0,0.9) 45%, transparent 100%)',
        }}
      />
    </div>
  )
}
