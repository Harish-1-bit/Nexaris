import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  size: number;
  opacity: number;
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const subheadlineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const chevronRef = useRef<SVGSVGElement>(null)
  const [showScroll, setShowScroll] = useState(true)

  // Particle field effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    const particles: Particle[] = []
    const particleCount = 120
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const mouse = { x: -9999, y: -9999 }

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Spawn particles on canvas init
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * (5 - 2.5) + 2.5 // randomly between 2.5px and 5px
      const opacity = Math.random() * (0.22 - 0.06) + 0.06 // randomly between 0.06 and 0.22
      const vx = Math.random() * (0.15 - -0.15) + -0.15 // random velocity between -0.15 and +0.15
      const vy = Math.random() * (0.15 - -0.15) + -0.15
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx,
        vy,
        baseVx: vx,
        baseVy: vy,
        size,
        opacity,
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    if (!isTouchDevice) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
      window.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    }

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        // 1. Drift back to natural velocity slowly (lerp with factor 0.03)
        p.vx += (p.baseVx - p.vx) * 0.03
        p.vy += (p.baseVy - p.vy) * 0.03

        // 2. Mouse Repulsion Force (disabled on touch devices)
        if (!isTouchDevice && mouse.x !== -9999) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120 && dist > 0) {
            const proximity = (120 - dist) / 120 // 0 at edge, 1 at cursor
            const pushStrength = proximity * 0.8 // gentle repulsion force
            const dirX = dx / dist
            const dirY = dy / dist

            p.vx += dirX * pushStrength
            p.vy += dirY * pushStrength
          }
        }

        // Cap speed to prevent particles from flying off too fast
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        const maxSpeed = 3.5
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed
          p.vy = (p.vy / speed) * maxSpeed
        }

        // 3. Update positions
        p.x += p.vx
        p.y += p.vy

        // 4. Wrap around edges
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // 5. Draw diamond orientation rotated 45 degrees
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(Math.PI / 4)
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (!isTouchDevice) {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseleave', handleMouseLeave)
      }
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // GSAP Entrance animations and Chevron loop
  useEffect(() => {
    if (!containerRef.current) return

    const headlineWords = containerRef.current.querySelectorAll('.hero-headline-word')

    const ctx = gsap.context(() => {
      // 1. Stagger each word of the headline: starts at opacity 0, translateY 20px, to opacity 1, translateY 0
      gsap.fromTo(
        headlineWords,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          ease: 'power2.out',
          delay: 0.3,
          duration: 0.8,
        }
      )

      // 2. Eyebrow fades in: opacity 0 -> 1
      gsap.fromTo(
        eyebrowRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          delay: 0.1,
          ease: 'power2.out',
        }
      )

      // 3. Subheadline fades in: opacity 0 -> 1, translateY 12px -> 0
      gsap.fromTo(
        subheadlineRef.current,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.7,
          ease: 'power2.out',
        }
      )

      // 4. CTA row fades in: opacity 0 -> 1, translateY 12px -> 0
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.9,
          ease: 'power2.out',
        }
      )

      // 5. Chevron animation: translateY 0 -> 4px -> 0, loop infinitely, duration 1.4s, ease sine inOut
      gsap.to(chevronRef.current, {
        y: 4,
        duration: 0.7, // 0.7s down, 0.7s up = 1.4s total period
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Fade out scroll indicator on scroll past 100px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScroll(false)
      } else {
        setShowScroll(true)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex items-center justify-center w-full select-none"
      style={{ height: '100vh', background: '#0A0A0A', overflow: 'hidden' }}
    >
      {/* Canvas Particle Field */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ zIndex: 1 }}
      />

      {/* Hero Content Overlay */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-4xl"
        style={{ pointerEvents: 'auto' }}
      >
        {/* Eyebrow Text */}
        <div
          ref={eyebrowRef}
          className="font-sans font-medium tracking-[0.14em] uppercase opacity-0"
          style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.35)', marginBottom: '24px' }}
        >
          Est. July 26, 2023 · Indore, India
        </div>

        {/* Main Headline */}
        <h1
          className="font-display font-medium leading-[1.1] tracking-[-0.03em] flex flex-col items-center"
          style={{ fontSize: 'clamp(40px, 6vw, 80px)', color: '#FFFFFF' }}
        >
          <div className="flex flex-wrap justify-center gap-x-[0.25em]">
            <span className="hero-headline-word inline-block opacity-0">We</span>
            <span className="hero-headline-word inline-block opacity-0">don't</span>
            <span className="hero-headline-word inline-block opacity-0">build</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-[0.25em]">
            <span className="hero-headline-word inline-block opacity-0">companies.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-[0.25em]">
            <span className="hero-headline-word inline-block opacity-0">We</span>
            <span className="hero-headline-word inline-block opacity-0">build</span>
            <span
              className="hero-headline-word inline-block opacity-0"
              style={{
                background: 'linear-gradient(90deg, #C0392B, #E8682A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              people.
            </span>
          </div>
        </h1>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="font-sans font-normal opacity-0"
          style={{
            fontSize: '16px',
            color: 'rgba(255, 255, 255, 0.45)',
            maxWidth: '480px',
            lineHeight: 1.7,
            marginTop: '20px',
          }}
        >
          Marketing. Design. Development. AI. Built from nothing, by people who had nothing to lose.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex gap-3 justify-center opacity-0" style={{ marginTop: '36px' }}>
          <Link
            to="/work"
            className="font-sans font-medium text-[14px] leading-none text-[#0A0A0A] bg-white rounded-[4px] cursor-pointer hover:opacity-88 transition-opacity flex items-center justify-center"
            style={{ padding: '12px 28px' }}
          >
            See Our Work
          </Link>
          <Link
            to="/about"
            className="font-sans font-medium text-[14px] leading-none text-white/75 bg-transparent border-[0.5px] border-white/30 rounded-[4px] cursor-pointer hover:border-white hover:text-white transition-colors flex items-center justify-center"
            style={{ padding: '12px 28px' }}
          >
            Our Story &rarr;
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-[28px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none transition-opacity duration-500 ease-in-out"
        style={{ opacity: showScroll ? 1 : 0, zIndex: 10 }}
      >
        <span
          className="font-sans font-medium tracking-[0.12em] uppercase"
          style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.25)' }}
        >
          Scroll
        </span>
        <svg
          ref={chevronRef}
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-30 block"
        >
          <path d="M1 1L6 6L11 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </section>
  )
}
