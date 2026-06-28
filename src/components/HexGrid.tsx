import { useMemo, useEffect, useRef } from 'react'

export default function HexGrid() {
  const spotlightRef = useRef<HTMLDivElement>(null)

  // Direct DOM manipulation to prevent lag
  useEffect(() => {
    let rafId = 0
    const onMove = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        if (spotlightRef.current) {
          const x = (e.clientX / window.innerWidth) * 100
          const y = (e.clientY / window.innerHeight) * 100
          spotlightRef.current.style.background = `radial-gradient(circle 800px at ${x}% ${y}%, rgba(48, 102, 190, 0.2), transparent 80%)`
        }
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const hexWidth = 190
  const hexHeight = 164
  const colSpacing = hexWidth * 0.75
  const rowSpacing = hexHeight

  // Optimized grid count to completely eliminate GPU bottlenecks (506 hexes)
  const cols = 22
  const rows = 26

  // Helper to find adjacent hexes in a pointy-topped grid
  const getNeighbors = (c: number, r: number) => {
    const neighbors = [
      [c, r - 1],
      [c, r + 1],
    ]
    if (c % 2 === 0) {
      neighbors.push([c - 1, r - 1], [c - 1, r], [c + 1, r - 1], [c + 1, r])
    } else {
      neighbors.push([c - 1, r], [c - 1, r + 1], [c + 1, r], [c + 1, r + 1])
    }
    return neighbors
  }

  const hexes = useMemo(() => {
    const items = []
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const x = c * colSpacing
        let y = r * rowSpacing
        if (c % 2 === 1) {
          y += rowSpacing / 2
        }

        const baseOpacity = 0.05 + Math.random() * 0.15

        items.push(
          <div
            key={`${c}-${r}`}
            className="absolute transition-all duration-500 ease-out cursor-pointer hover:z-10 group"
            style={{
              left: x,
              top: y,
              width: hexWidth - 2, // -2 for gap
              height: hexHeight - 2,
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
              transformStyle: 'preserve-3d',
            }}
            onMouseEnter={() => {
              // Elevate main hex
              const mainEl = document.getElementById(`hex-inner-${c}-${r}`)
              const mainHighlight = document.getElementById(`hex-highlight-${c}-${r}`)
              if (mainEl) mainEl.style.transform = 'translateY(-12px)'
              if (mainHighlight) mainHighlight.style.opacity = '1'

              // Elevate adjacent hexes slightly
              getNeighbors(c, r).forEach(([nc, nr]) => {
                const el = document.getElementById(`hex-inner-${nc}-${nr}`)
                const highlight = document.getElementById(`hex-highlight-${nc}-${nr}`)
                if (el) el.style.transform = 'translateY(-6px)'
                if (highlight) highlight.style.opacity = '0.4'
              })
            }}
            onMouseLeave={() => {
              // Reset main hex
              const mainEl = document.getElementById(`hex-inner-${c}-${r}`)
              const mainHighlight = document.getElementById(`hex-highlight-${c}-${r}`)
              if (mainEl) mainEl.style.transform = ''
              if (mainHighlight) mainHighlight.style.opacity = ''

              // Reset adjacent hexes
              getNeighbors(c, r).forEach(([nc, nr]) => {
                const el = document.getElementById(`hex-inner-${nc}-${nr}`)
                const highlight = document.getElementById(`hex-highlight-${nc}-${nr}`)
                if (el) el.style.transform = ''
                if (highlight) highlight.style.opacity = ''
              })
            }}
          >
            {/* Extremely optimized 3D depth using filter drop-shadow instead of physical layers */}
            <div 
              id={`hex-inner-${c}-${r}`}
              className="w-full h-full transition-transform duration-300 ease-out"
              style={{
                background: `rgba(48, 102, 190, ${baseOpacity})`,
                boxShadow: 'inset 0 0 20px rgba(239, 62, 54, 0.5)', 
                clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                // This single line creates the 3D depth block without any extra DOM nodes or preserve-3d!
                filter: 'drop-shadow(0px 16px 0px rgba(16, 40, 90, 0.9))',
              }}
            >
              {/* Highlight on top edge */}
              <div 
                id={`hex-highlight-${c}-${r}`}
                className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, transparent 40%)',
                }}
              />
            </div>
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
      className="absolute inset-0 overflow-hidden" 
      style={{ perspective: '1200px' }}
    >
      {/* 3D Plane Wrapper (NO preserve-3d needed!) */}
      <div 
        className="absolute top-1/2 left-1/2"
        style={{
          width: gridWidth,
          height: gridHeight,
          transform: 'translate(-50%, -40%) rotateX(65deg)',
        }}
      >
        <div className="relative w-full h-full">
          {/* Spotlight on the grid */}
          <div 
            ref={spotlightRef}
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: `radial-gradient(circle 800px at 50% 50%, rgba(48, 102, 190, 0.25), transparent 80%)`,
              willChange: 'background',
              transform: 'translateZ(1px)', // just above the hexes
            }}
          />
          {hexes}
        </div>
      </div>

      {/* Fade out edges to blend into the parent section */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: 'radial-gradient(ellipse at 50% 60%, transparent 20%, #000000 70%)',
        }}
      />
      
      {/* Fade out top heavily to blend with the rest of the page */}
      <div 
        className="absolute top-0 inset-x-0 h-1/2 pointer-events-none" 
        style={{
          background: 'linear-gradient(to bottom, #000000 0%, transparent 100%)',
        }}
      />
    </div>
  )
}
