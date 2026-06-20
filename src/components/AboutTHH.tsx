import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const timelineEvents = [
  {
    date: "July 2023",
    title: "The Hustle House is born.",
    desc: "Founded in Indore by Sanidhya Rawat and Ishaan Khandelwal. No funding, no clients, no plan. Just the decision to begin."
  },
  {
    date: "Late 2023",
    title: "First clients. First proof.",
    desc: "Marketing services go live. Early clients start seeing results. The entity begins to earn its name."
  },
  {
    date: "2024",
    title: "Design joins the house.",
    desc: "Ishaan formally brings design into THH's service stack. Brand identity, UI/UX, funnel design — a full creative vertical is born."
  },
  {
    date: "2024",
    title: "50+ brands transformed.",
    desc: "A milestone that nobody planned for. Twenty-plus industries. Dozens of brands. Zero funding. All hustle."
  },
  {
    date: "2025",
    title: "Development & AI enter the room.",
    desc: "Sourabh leads the new development vertical. THH is no longer just a creative shop — it's a full-stack digital entity."
  },
  {
    date: "2025",
    title: "First SaaS product in active development.",
    desc: "The Hustle House builds its first in-house product. From service provider to product company. The ecosystem begins."
  },
  {
    date: "∞",
    title: "What comes next is being built right now.",
    desc: "This isn't the end of the story. It's barely the beginning.",
    isInfinity: true
  }
]

const teamMembers = [
  { name: "Sanidhya Rawat", role: "Founder · Marketing", dept: "Marketing" },
  { name: "Ishaan Khandelwal", role: "Co-Founder · Design", dept: "Design" },
  { name: "Sourabh", role: "Head of Development", dept: "Development" },
  { name: "[Team Member]", role: "Marketing Lead", dept: "Marketing" },
  { name: "[Team Member]", role: "Designer", dept: "Design" },
  { name: "[Team Member]", role: "Developer", dept: "Development" }
]

export default function AboutTHH() {
  const containerRef = useRef<HTMLDivElement>(null)
  const watermarkRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Lenis Smooth Scroll
    const lenis = new Lenis()
    lenis.on('scroll', ScrollTrigger.update)
    
    const tick = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const ctx = gsap.context(() => {
      // Headline lines stagger in
      gsap.fromTo(
        '.hero-title-line',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        }
      )

      // Body text delay (starts 0.2s after the second line of the headline starts animating)
      gsap.fromTo(
        bodyRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: 'power3.out',
        }
      )

      // Ghost mark fade in
      gsap.fromTo(
        watermarkRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 2.0,
          ease: 'power1.inOut',
        }
      )

      // Ghost mark rotation (barely perceptible, continuous)
      gsap.to(watermarkRef.current, {
        rotate: 360,
        duration: 120,
        ease: 'none',
        repeat: -1,
      })

      // Horizontal line slides in
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          delay: 0.4,
          ease: 'power2.out',
        }
      )

      // Section 2 Scroll Trigger Animations
      gsap.utils.toArray('.story-block').forEach((block: any) => {
        gsap.fromTo(
          block,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // Pull quote Scroll Trigger Animation
      gsap.fromTo(
        '.story-quote',
        { y: 20, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.story-quote',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Section 3: Founder Cards Animations
      gsap.fromTo(
        '.founder-card-1',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.founder-cards-container',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        '.founder-card-2',
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.founder-cards-container',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Section 4: Philosophy Animations
      gsap.fromTo(
        '.philosophy-left',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.philosophy-section',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        '.philosophy-pillar',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.philosophy-right',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Section 5: Timeline Animations
      // Spine drawing animation
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 30%',
            end: 'bottom 70%',
            scrub: true,
          }
        }
      )

      // Staggered timeline entries slide/fade-in
      gsap.utils.toArray('.timeline-entry').forEach((entry: any, index: number) => {
        const isEven = index % 2 === 0
        const xOffset = isEven ? -20 : 20
        
        // Card content slide/fade-in
        gsap.fromTo(
          entry.querySelector('.timeline-content'),
          { opacity: 0, x: xOffset },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: entry,
              start: 'top 75%',
              toggleActions: 'play none none none',
            }
          }
        )

        // Spine dot scale/fade-in
        gsap.fromTo(
          entry.querySelector('.timeline-dot'),
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: entry,
              start: 'top 75%',
              toggleActions: 'play none none none',
            }
          }
        )
      })

      // Section 6: Team Grid Animations
      gsap.fromTo(
        '.team-card',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.team-grid-container',
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      )

      // Section 7: CTA Animations
      gsap.fromTo(
        '.cta-container',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      )
    }, containerRef)

    return () => {
      ctx.revert()
      lenis.destroy()
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      style={{ background: '#0A0A0A' }} 
      className="w-full text-[#F0EEF8] font-sans selection:bg-white/10 selection:text-white"
    >
      {/* SECTION 1: Hero / Page Header */}
      <section 
        className="relative flex flex-col justify-end w-full min-h-[70vh] pb-20 overflow-hidden"
        style={{ background: '#0A0A0A' }}
      >
        {/* Background Element: Ghost Watermark Logo Mark (Chevron + Diamond) */}
        <div
          ref={watermarkRef}
          className="absolute pointer-events-none select-none"
          style={{
            right: '-5%',
            top: '10%',
            width: '55vw',
            height: '55vw',
            zIndex: 1,
            opacity: 0,
            transformOrigin: 'center center',
          }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            fill="rgba(255, 255, 255, 0.025)"
          >
            {/* Diamond */}
            <polygon points="50,15 75,40 50,65 25,40" />
            {/* Chevron */}
            <polygon points="50,90 15,55 25,45 50,70 75,45 85,55" />
          </svg>
        </div>

        {/* Breadcrumb line at top */}
        <div
          className="absolute top-[48px] text-[11px] uppercase tracking-[0.12em] select-none left-1/2 -translate-x-1/2 w-full max-w-[1100px] pl-6 md:pl-12"
          style={{
            color: 'rgba(255, 255, 255, 0.25)',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            zIndex: 10,
          }}
        >
          The Hustle House™ / About
        </div>

        {/* Content Overlay */}
        <div 
          className="relative z-10 w-full max-w-[1100px] mx-auto px-6 md:px-12 flex flex-col items-start"
        >

          {/* Main Headline */}
          <h1
            className="text-left select-none text-white font-sans font-medium flex flex-col"
            style={{
              fontSize: 'clamp(52px, 7vw, 96px)',
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
            }}
          >
            <div className="overflow-hidden py-1">
              <span className="hero-title-line inline-block">An entity,</span>
            </div>
            <div className="overflow-hidden py-1">
              <span className="hero-title-line inline-block">not a company.</span>
            </div>
          </h1>

          {/* Subheading/Body text */}
          <p
            ref={bodyRef}
            className="text-left font-sans font-normal opacity-0"
            style={{
              marginTop: '28px',
              maxWidth: '560px',
              fontSize: '17px',
              color: 'rgba(255, 255, 255, 0.5)',
              lineHeight: 1.75,
            }}
          >
            The Hustle House was not founded. It was survived into existence. This is the story of what happens when two people with nothing to lose decide to build everything.
          </p>
        </div>

        {/* Thin Horizontal Dividing Line */}
        <div
          ref={lineRef}
          className="absolute bottom-0 left-0 w-full origin-left scale-x-0"
          style={{
            height: '0.5px',
            background: 'rgba(255, 255, 255, 0.1)',
          }}
        />
      </section>

      {/* SECTION 2: The Origin Story */}
      <section 
        className="w-full"
        style={{ background: '#0A0A0A', padding: '120px 0' }}
      >
        <div className="w-full max-w-[720px] mx-auto px-6 flex flex-col items-start font-sans">
          
          {/* Label */}
          <div 
            className="story-block uppercase tracking-[0.12em] text-white/30 font-medium select-none"
            style={{ fontSize: '11px', marginBottom: '40px' }}
          >
            How it started
          </div>

          {/* Block 1 */}
          <div 
            className="story-block text-white font-medium"
            style={{
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              lineHeight: 1.6,
              letterSpacing: '-0.02em',
            }}
          >
            July 26, 2023. Two 18-year-olds. Indore, India. No funding, no clients, no roadmap. Just a shared conviction that the only thing worse than failing would be never trying.
          </div>

          {/* Block 2 */}
          <div 
            className="story-block font-normal text-white/60"
            style={{
              fontSize: '17px',
              lineHeight: 1.85,
              marginTop: '32px',
            }}
          >
            Sanidhya Rawat and Ishaan Khandelwal weren't building a business plan. They were building an escape. Both at the lowest points of their lives, both 18, both staring at the same question: what do we do when there's nothing left to lose? The answer they landed on became The Hustle House.
          </div>

          {/* Pull Quote */}
          <div 
            className="story-quote w-full select-none"
            style={{
              padding: '48px 0',
              marginTop: '40px',
              marginBottom: '40px',
              borderTop: '0.5px solid rgba(255, 255, 255, 0.08)',
              borderBottom: '0.5px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <blockquote 
              className="text-white font-medium italic"
              style={{
                fontSize: 'clamp(24px, 3vw, 38px)',
                letterSpacing: '-0.02em',
                lineHeight: 1.4,
              }}
            >
              "If we're going to die, at least we die trying."
            </blockquote>
            <cite 
              className="block font-normal not-italic"
              style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.35)',
                marginTop: '12px',
              }}
            >
              — The conviction that started it all
            </cite>
          </div>

          {/* Block 3 */}
          <div 
            className="story-block font-normal text-white/60"
            style={{
              fontSize: '17px',
              lineHeight: 1.85,
              marginTop: '28px',
            }}
          >
            The name wasn't a brand decision. It was a declaration. If we're going to die, at least we die trying. The Hustle House wasn't named in a boardroom — it was named in the space between desperation and determination.
          </div>

          {/* Block 4 */}
          <div 
            className="story-block font-normal text-white/60"
            style={{
              fontSize: '17px',
              lineHeight: 1.85,
              marginTop: '28px',
            }}
          >
            What started as Sanidhya's expertise in marketing quickly became something larger. Ishaan brought design. Then development. Then AI. Then a SaaS platform. Each addition wasn't a pivot — it was growth. THH doesn't add services. It evolves.
          </div>

        </div>
      </section>

      {/* SECTION 3: The Founders */}
      <section 
        className="w-full"
        style={{ background: '#0D0D0D', padding: '120px 0' }}
      >
        <div className="w-full max-w-[1100px] mx-auto px-6 md:px-12 flex flex-col items-start font-sans">
          
          {/* Section Label */}
          <div 
            className="uppercase tracking-[0.12em] text-white/25 font-medium select-none"
            style={{ fontSize: '11px', marginBottom: '64px' }}
          >
            The founders
          </div>

          {/* Cards Grid */}
          <div 
            className="founder-cards-container w-full grid grid-cols-1 md:grid-cols-2 gap-12"
            style={{ gap: '48px' }}
          >
            
            {/* Card 1: Sanidhya Rawat */}
            <div className="founder-card-1 group flex flex-col items-start cursor-pointer w-full">
              {/* Replace background with actual founder photo */}
              <div 
                className="relative w-full aspect-square bg-[#1A1A1A] rounded-lg overflow-hidden flex items-center justify-center border border-transparent group-hover:border-white/12 transition-all duration-300"
              >
                <svg 
                  viewBox="0 0 100 100" 
                  className="w-1/3 h-1/3 text-white/5" 
                  fill="currentColor"
                >
                  <polygon points="50,15 75,40 50,65 25,40" />
                  <polygon points="50,90 15,55 25,45 50,70 75,45 85,55" />
                </svg>
              </div>
              <h3 
                className="text-white font-medium group-hover:underline group-hover:decoration-white/20 transition-all duration-300"
                style={{ fontSize: '26px', marginTop: '24px', letterSpacing: '-0.02em', textDecorationThickness: '1px' }}
              >
                Sanidhya Rawat
              </h3>
              <div 
                className="font-medium text-white/40 uppercase tracking-[0.04em]"
                style={{ fontSize: '13px', marginTop: '6px' }}
              >
                Founder · Head of Marketing
              </div>
              <p 
                className="font-normal text-white/55"
                style={{ fontSize: '15px', lineHeight: '1.8', marginTop: '16px', maxWidth: '420px' }}
              >
                Sanidhya started THH with nothing but a deep understanding of how brands grow and a refusal to stop. The marketing backbone of The Hustle House, he is the reason THH's first clients came — and stayed. Three years in, his instincts haven't changed. His ambitions have grown 100x.
              </p>
            </div>

            {/* Card 2: Ishaan Khandelwal */}
            <div className="founder-card-2 group flex flex-col items-start cursor-pointer w-full">
              {/* Replace background with actual founder photo */}
              <div 
                className="relative w-full aspect-square bg-[#1A1A1A] rounded-lg overflow-hidden flex items-center justify-center border border-transparent group-hover:border-white/12 transition-all duration-300"
              >
                <svg 
                  viewBox="0 0 100 100" 
                  className="w-1/3 h-1/3 text-white/5" 
                  fill="currentColor"
                >
                  <polygon points="50,15 75,40 50,65 25,40" />
                  <polygon points="50,90 15,55 25,45 50,70 75,45 85,55" />
                </svg>
              </div>
              <h3 
                className="text-white font-medium group-hover:underline group-hover:decoration-white/20 transition-all duration-300"
                style={{ fontSize: '26px', marginTop: '24px', letterSpacing: '-0.02em', textDecorationThickness: '1px' }}
              >
                Ishaan Khandelwal
              </h3>
              <div 
                className="font-medium text-white/40 uppercase tracking-[0.04em]"
                style={{ fontSize: '13px', marginTop: '6px' }}
              >
                Co-Founder · Head of Design
              </div>
              <p 
                className="font-normal text-white/55"
                style={{ fontSize: '15px', lineHeight: '1.8', marginTop: '16px', maxWidth: '420px' }}
              >
                Ishaan brought the visual language to THH. Design, identity, UI/UX, experience — every pixel that represents The Hustle House has passed through his eye. He's building toward something he can't fully name yet. That's exactly what makes him dangerous.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: The Philosophy */}
      <section 
        className="philosophy-section w-full"
        style={{ background: '#0A0A0A', padding: '140px 0' }}
      >
        <div className="w-full max-w-[1100px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 lg:gap-16 items-start font-sans">
          
          {/* Left Column */}
          <div className="philosophy-left flex flex-col items-start w-full">
            {/* Label */}
            <div 
              className="uppercase tracking-[0.12em] text-white/25 font-medium select-none"
              style={{ fontSize: '11px', marginBottom: '28px' }}
            >
              What we are
            </div>
            
            {/* Headline */}
            <h2 
              className="text-white font-medium"
              style={{
                fontSize: 'clamp(28px, 3.5vw, 46px)',
                lineHeight: 1.2,
                letterSpacing: '-0.025em',
              }}
            >
              Not a vendor. Not a studio. Something you haven't seen before.
            </h2>

            {/* Body */}
            <p 
              className="font-normal text-white/50"
              style={{
                fontSize: '16px',
                lineHeight: 1.85,
                marginTop: '24px',
              }}
            >
              Every person who has truly worked inside The Hustle House — whether they're still here or have moved on — left having found something they hadn't anywhere else. That fire. That urgency. That feeling that what you're building actually matters. THH doesn't just deliver work. It changes the people who do it.
            </p>
          </div>

          {/* Right Column */}
          <div className="philosophy-right flex flex-col gap-[36px] w-full">
            
            {/* Pillar 1 */}
            <div className="philosophy-pillar flex flex-col items-start w-full">
              <div 
                className="font-mono text-white/25"
                style={{ fontSize: '11px', marginBottom: '8px' }}
              >
                01
              </div>
              <h4 className="text-white font-medium text-[17px]">
                We evolve, not pivot.
              </h4>
              <p 
                className="font-normal text-white/45"
                style={{ fontSize: '14px', lineHeight: 1.7, marginTop: '6px' }}
              >
                Marketing came first. Then design. Then development. Then AI. Each addition wasn't a reaction — it was a natural evolution of what THH was becoming.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="philosophy-pillar flex flex-col items-start w-full">
              <div 
                className="font-mono text-white/25"
                style={{ fontSize: '11px', marginBottom: '8px' }}
              >
                02
              </div>
              <h4 className="text-white font-medium text-[17px]">
                The work changes the worker.
              </h4>
              <p 
                className="font-normal text-white/45"
                style={{ fontSize: '14px', lineHeight: 1.7, marginTop: '6px' }}
              >
                Every person inside THH finds something here they never did anywhere else. The environment is designed — consciously or not — to push people toward their prime.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="philosophy-pillar flex flex-col items-start w-full">
              <div 
                className="font-mono text-white/25"
                style={{ fontSize: '11px', marginBottom: '8px' }}
              >
                03
              </div>
              <h4 className="text-white font-medium text-[17px]">
                Bootstrap is a philosophy, not a limitation.
              </h4>
              <p 
                className="font-normal text-white/45"
                style={{ fontSize: '14px', lineHeight: 1.7, marginTop: '6px' }}
              >
                Zero external funding. Everything built from revenue, from hustle, from clients who believed early. That constraint created a discipline that funded growth can't buy.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="philosophy-pillar flex flex-col items-start w-full">
              <div 
                className="font-mono text-white/25"
                style={{ fontSize: '11px', marginBottom: '8px' }}
              >
                04
              </div>
              <h4 className="text-white font-medium text-[17px]">
                Products are the future.
              </h4>
              <p 
                className="font-normal text-white/45"
                style={{ fontSize: '14px', lineHeight: 1.7, marginTop: '6px' }}
              >
                Services built the foundation. Products will build the empire. The first SaaS is just the beginning of a larger ecosystem that THH is quietly constructing.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: The Timeline */}
      <section 
        className="w-full overflow-hidden"
        style={{ background: '#0D0D0D', padding: '120px 0' }}
      >
        <div className="w-full max-w-[1100px] mx-auto px-6 md:px-12 flex flex-col items-start font-sans">
          
          {/* Label */}
          <div 
            className="uppercase tracking-[0.12em] text-white/25 font-medium select-none"
            style={{ fontSize: '11px', marginBottom: '64px' }}
          >
            Three years. Every milestone.
          </div>

          {/* Timeline Wrapper */}
          <div className="relative w-full timeline-container mt-8 pb-12">
            {/* Center Spine */}
            <div 
              className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[0.5px] origin-top scale-y-0 timeline-line"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            />

            {/* Alternating Entries */}
            <div className="flex flex-col gap-16 md:gap-24 w-full relative">
              {timelineEvents.map((event, index) => {
                const isEven = index % 2 === 0
                return (
                  <div 
                    key={index} 
                    className={`relative flex flex-col w-full items-start md:items-center timeline-entry ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Spine Dot */}
                    <div 
                      className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-white/30 bg-[#0D0D0D] z-10 timeline-dot"
                    />

                    {/* Alternating Card Content */}
                    <div 
                      className={`w-full md:w-1/2 flex justify-start pl-12 pr-6 md:pl-0 md:pr-0 md:px-12 timeline-content ${
                        isEven ? 'md:justify-end md:text-right' : 'md:justify-start md:text-left'
                      }`}
                    >
                      <div className={`flex flex-col max-w-[320px] ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                        {/* Date */}
                        <div 
                          className="font-mono text-white/35"
                          style={{ fontSize: '12px' }}
                        >
                          {event.date}
                        </div>
                        {/* Event Title */}
                        <h4 
                          className="text-white font-medium"
                          style={
                            event.isInfinity
                              ? {
                                  fontSize: '18px',
                                  marginTop: '4px',
                                  letterSpacing: '-0.01em',
                                  background: 'linear-gradient(135deg, #8B0000, #C0392B, #E8682A)',
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                  backgroundClip: 'text',
                                }
                              : {
                                  fontSize: '18px',
                                  marginTop: '4px',
                                  letterSpacing: '-0.01em',
                                }
                          }
                        >
                          {event.title}
                        </h4>
                        {/* Description */}
                        <p 
                          className="font-normal text-white/45"
                          style={{ fontSize: '13px', lineHeight: 1.6, marginTop: '6px' }}
                        >
                          {event.desc}
                        </p>
                      </div>
                    </div>

                    {/* Empty Side on Desktop */}
                    <div className="w-full md:w-1/2 hidden md:block" />
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 6: The Team */}
      <section 
        className="w-full"
        style={{ background: '#0A0A0A', padding: '120px 0' }}
      >
        <div className="w-full max-w-[1100px] mx-auto px-6 md:px-12 flex flex-col items-start font-sans">
          
          {/* Label */}
          <div 
            className="uppercase tracking-[0.12em] text-white/25 font-medium select-none"
            style={{ fontSize: '11px', marginBottom: '16px' }}
          >
            The people
          </div>

          {/* Sublabel */}
          <p 
            className="font-normal text-white/40"
            style={{ fontSize: '15px', lineHeight: '1.7', maxWidth: '500px', marginBottom: '64px' }}
          >
            Everyone who has worked inside THH has left changed. These are the ones here now.
          </p>

          {/* Grid */}
          <div 
            className="team-grid-container w-full grid"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '24px'
            }}
          >
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="team-card group flex flex-col items-start w-full p-5 rounded-lg bg-white/[0.02] border border-white/[0.07] hover:border-white/[0.15] hover:bg-white/[0.04] transition-all duration-300 cursor-pointer"
              >
                {/* Avatar Placeholder */}
                {/* Replace with team member photo */}
                <div className="w-12 h-12 rounded-full bg-white/[0.06] border border-white/[0.1]" />
                
                {/* Name */}
                <div 
                  className="font-medium text-white"
                  style={{ fontSize: '15px', marginTop: '14px' }}
                >
                  {member.name}
                </div>

                {/* Role */}
                <div 
                  className="font-normal text-white/[0.38]"
                  style={{ fontSize: '12px', marginTop: '4px' }}
                >
                  {member.role}
                </div>

                {/* Department Badge */}
                <div 
                  className="text-[10px] py-[3px] px-2 rounded-full border border-white/12 text-white/35 mt-[12px] font-medium uppercase tracking-wider select-none"
                >
                  {member.dept}
                </div>
              </div>
            ))}
            {/* Add remaining team members here — cards auto-flow in grid */}
          </div>

        </div>
      </section>

      {/* SECTION 7: About Page CTA */}
      <section 
        className="cta-section w-full"
        style={{ 
          background: '#0A0A0A', 
          padding: '100px 0 140px',
          borderTop: '0.5px solid rgba(255,255,255,0.06)' 
        }}
      >
        <div className="cta-container w-full max-w-[640px] mx-auto px-6 flex flex-col items-center text-center font-sans">
          
          {/* Label */}
          <div 
            className="uppercase tracking-[0.14em] text-white/35 font-medium select-none"
            style={{ fontSize: '11px', marginBottom: '24px' }}
          >
            There's more to the story.
          </div>

          {/* Headline */}
          <h2 
            className="text-white font-medium"
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              letterSpacing: '-0.03em',
              marginBottom: '16px',
              lineHeight: 1.1,
            }}
          >
            Read the Manifesto.
          </h2>

          {/* Sub */}
          <p 
            className="font-normal text-white/45"
            style={{
              fontSize: '16px',
              lineHeight: 1.8,
              marginBottom: '36px',
            }}
          >
            Everything THH believes — about building, about people, about what this entity is becoming — written in plain language. No corporate speak. No mission statements. Just the truth.
          </p>

          {/* CTA Button */}
          <Link 
            to="/manifesto"
            className="font-medium text-white border-[0.5px] border-white hover:bg-white hover:text-[#0A0A0A] transition-all duration-250 flex items-center justify-center select-none"
            style={{
              fontSize: '15px',
              padding: '14px 36px',
              borderRadius: '4px',
            }}
          >
            Read the Manifesto &rarr;
          </Link>

        </div>
      </section>
    </div>
  )
}
