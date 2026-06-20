import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { Link } from 'react-router-dom'
import { 
  User, 
  TrendingUp, 
  Globe, 
  Share2, 
  Fingerprint, 
  Layout, 
  Filter, 
  Monitor, 
  Palette, 
  Cpu, 
  Code2, 
  Bot 
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const marketingServices = [
  { name: "Personal Branding", icon: User },
  { name: "Performance Marketing", icon: TrendingUp },
  { name: "Digital Marketing", icon: Globe },
  { name: "Social Media Management", icon: Share2 }
]

const designServices = [
  { name: "Brand Identity", icon: Fingerprint },
  { name: "UI/UX Design", icon: Layout },
  { name: "Funnel Design", icon: Filter },
  { name: "Website Design", icon: Monitor },
  { name: "Graphic Design", icon: Palette },
  { name: "Software Design", icon: Cpu }
]

const devServices = [
  { name: "Web Development", icon: Code2 },
  { name: "AI Solutions & Automation", icon: Bot }
]

const processSteps = [
  { num: "01", title: "Discovery", desc: "We get obsessive about understanding your business, your market, your actual problem — not just the brief." },
  { num: "02", title: "Strategy", desc: "Everything we build is rooted in a clear strategic rationale. No decoration. No random creativity." },
  { num: "03", title: "Execution", desc: "We build fast and iterate. Shipping something real beats perfecting something invisible." },
  { num: "04", title: "Ownership", desc: "After delivery, we don't disappear. We care about results because the work is ours too." }
]

const row1Industries = ["SaaS", "Real Estate", "Fashion", "Hospitality", "EdTech", "Healthcare", "E-Commerce", "Finance", "Fitness", "Food & Beverage"]
const row2Industries = ["Personal Brands", "Architecture", "Legal Services", "Events", "Media", "FinTech", "Coaching", "Consulting", "Retail", "Manufacturing"]

export default function ServicesOverview() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)

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
      // Hero staggered entrance
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

      gsap.fromTo(
        subRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: 'power3.out',
        }
      )

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

      // Section 2: Verticals blocks scroll reveals
      gsap.utils.toArray('.vertical-block').forEach((block: any) => {
        gsap.fromTo(
          block,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          }
        )
      })

      // Section 3: Process Steps animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.process-container',
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      })

      // Stagger reveal of step contents and scaleX of horizontal connectors
      tl.fromTo('.process-step-0', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 })
        .fromTo('.process-line-0', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power1.inOut' })
        .fromTo('.process-step-1', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 })
        .fromTo('.process-line-1', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power1.inOut' })
        .fromTo('.process-step-2', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 })
        .fromTo('.process-line-2', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power1.inOut' })
        .fromTo('.process-step-3', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 })

      // Section 4: Industries header reveal
      gsap.fromTo(
        '.industries-header',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.industries-section',
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      )

      // Section 5: CTA reveal
      gsap.fromTo(
        '.services-cta-content',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.services-cta-section',
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
      {/* SECTION 1: HERO */}
      <section 
        className="relative flex flex-col justify-end w-full min-h-[65vh] pb-20 overflow-hidden"
        style={{ background: '#0A0A0A' }}
      >
        {/* Ghost background watermark word */}
        <div
          className="absolute bottom-[-20px] left-[-10px] select-none pointer-events-none font-sans font-medium text-white/[0.025]"
          style={{
            fontSize: 'clamp(100px, 18vw, 220px)',
            letterSpacing: '-0.05em',
            zIndex: 1,
          }}
        >
          SERVICES
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 md:px-12 flex flex-col items-start">
          {/* Breadcrumb line at top */}
          <div
            className="absolute top-[-22vh] text-[11px] uppercase tracking-[0.12em] select-none"
            style={{
              color: 'rgba(255, 255, 255, 0.25)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
            }}
          >
            The Hustle House™ / Services
          </div>

          {/* Main Headline */}
          <h1
            className="text-left select-none text-white font-sans font-medium flex flex-col"
            style={{
              fontSize: 'clamp(44px, 6.5vw, 88px)',
              lineHeight: 1.08,
              letterSpacing: '-0.04em',
            }}
          >
            <div className="overflow-hidden py-1">
              <span className="hero-title-line inline-block">Everything you need.</span>
            </div>
            <div className="overflow-hidden py-1">
              <span className="hero-title-line inline-block">Nothing you don't.</span>
            </div>
          </h1>

          {/* Subheadline */}
          <p
            ref={subRef}
            className="text-left font-sans font-normal opacity-0"
            style={{
              marginTop: '24px',
              maxWidth: '520px',
              fontSize: '17px',
              color: 'rgba(255, 255, 255, 0.45)',
              lineHeight: 1.75,
            }}
          >
            Three verticals. Dozens of services. One entity that takes ownership of every single one.
          </p>
        </div>

        {/* Sliding Horizontal Line */}
        <div
          ref={lineRef}
          className="absolute bottom-0 left-0 w-full origin-left scale-x-0"
          style={{
            height: '0.5px',
            background: 'rgba(255, 255, 255, 0.1)',
          }}
        />
      </section>

      {/* SECTION 2: THE THREE VERTICALS */}
      <section 
        className="w-full"
        style={{ background: '#0A0A0A', padding: '120px 0' }}
      >
        <div className="w-full max-w-[1100px] mx-auto px-6 md:px-12 flex flex-col items-start font-sans">
          
          {/* Label */}
          <div 
            className="uppercase tracking-[0.12em] text-white/25 font-medium select-none"
            style={{ fontSize: '11px', marginBottom: '64px' }}
          >
            Our verticals
          </div>

          {/* Vertical Stack Blocks */}
          <div className="w-full flex flex-col items-start">
            
            {/* Block 1 — Marketing */}
            <div className="vertical-block w-full flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-12 min-h-[320px] py-12 border-t border-white/[0.08]">
              {/* Left Side */}
              <div className="w-full lg:w-[45%] flex flex-col justify-between items-start">
                <div>
                  <div className="font-mono text-white/25 text-[11px] mb-4">01</div>
                  <h3 
                    className="text-white font-medium"
                    style={{ fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-0.025em', lineHeight: 1.1 }}
                  >
                    Marketing
                  </h3>
                  <div 
                    className="text-[11px] uppercase tracking-[0.1em] text-white/30 border border-white/[0.12] px-2.5 py-1 rounded-full mt-3 inline-block select-none"
                  >
                    4 services
                  </div>
                </div>
                <Link 
                  to="/services/marketing"
                  className="text-[13px] text-white/50 hover:text-white transition-colors duration-200 mt-8 lg:mt-0 font-medium"
                >
                  Explore vertical &rarr;
                </Link>
              </div>
              {/* Right Side Services Grid */}
              <div className="w-full lg:w-[55%] grid grid-cols-1 sm:grid-cols-2 gap-3 self-center">
                {marketingServices.map((service, sIdx) => (
                  <Link 
                    key={sIdx}
                    to="/services/marketing"
                    className="flex items-center gap-2 p-3 px-4 rounded border border-white/[0.1] bg-transparent hover:bg-white/[0.04] hover:border-white/[0.25] transition-all duration-200 group"
                  >
                    <service.icon size={14} className="text-white/40 group-hover:text-white transition-colors" />
                    <span className="text-[13px] text-white font-medium">{service.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Block 2 — Design */}
            <div className="vertical-block w-full flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-12 min-h-[320px] py-12 border-t border-white/[0.08]">
              {/* Left Side */}
              <div className="w-full lg:w-[45%] flex flex-col justify-between items-start">
                <div>
                  <div className="font-mono text-white/25 text-[11px] mb-4">02</div>
                  <h3 
                    className="text-white font-medium"
                    style={{ fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-0.025em', lineHeight: 1.1 }}
                  >
                    Design
                  </h3>
                  <div 
                    className="text-[11px] uppercase tracking-[0.1em] text-white/30 border border-white/[0.12] px-2.5 py-1 rounded-full mt-3 inline-block select-none"
                  >
                    6 services
                  </div>
                </div>
                <Link 
                  to="/services/design"
                  className="text-[13px] text-white/50 hover:text-white transition-colors duration-200 mt-8 lg:mt-0 font-medium"
                >
                  Explore vertical &rarr;
                </Link>
              </div>
              {/* Right Side Services Grid */}
              <div className="w-full lg:w-[55%] grid grid-cols-1 sm:grid-cols-2 gap-3 self-center">
                {designServices.map((service, sIdx) => (
                  <Link 
                    key={sIdx}
                    to="/services/design"
                    className="flex items-center gap-2 p-3 px-4 rounded border border-white/[0.1] bg-transparent hover:bg-white/[0.04] hover:border-white/[0.25] transition-all duration-200 group"
                  >
                    <service.icon size={14} className="text-white/40 group-hover:text-white transition-colors" />
                    <span className="text-[13px] text-white font-medium">{service.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Block 3 — Development & AI */}
            <div className="vertical-block w-full flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-12 min-h-[320px] py-12 border-t border-white/[0.08] border-b border-white/[0.08]">
              {/* Left Side */}
              <div className="w-full lg:w-[45%] flex flex-col justify-between items-start">
                <div>
                  <div className="font-mono text-white/25 text-[11px] mb-4">03</div>
                  <h3 
                    className="text-white font-medium flex items-center"
                    style={{ fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-0.025em', lineHeight: 1.1 }}
                  >
                    <span>Development & AI</span>
                    <span 
                      className="text-[9px] tracking-[0.1em] text-[#C0392B] border border-[#C0392B] py-0.5 px-1.5 rounded-[3px] align-middle ml-2.5 inline-block font-medium select-none"
                    >
                      NEW
                    </span>
                  </h3>
                  <div 
                    className="text-[11px] uppercase tracking-[0.1em] text-white/30 border border-white/[0.12] px-2.5 py-1 rounded-full mt-3 inline-block select-none"
                  >
                    2 services
                  </div>
                </div>
                <Link 
                  to="/services/development"
                  className="text-[13px] text-white/50 hover:text-white transition-colors duration-200 mt-8 lg:mt-0 font-medium"
                >
                  Explore vertical &rarr;
                </Link>
              </div>
              {/* Right Side Services Grid */}
              <div className="w-full lg:w-[55%] grid grid-cols-1 sm:grid-cols-2 gap-3 self-center">
                {devServices.map((service, sIdx) => (
                  <Link 
                    key={sIdx}
                    to="/services/development"
                    className="flex items-center gap-2 p-3 px-4 rounded border border-white/[0.1] bg-transparent hover:bg-white/[0.04] hover:border-white/[0.25] transition-all duration-200 group"
                  >
                    <service.icon size={14} className="text-white/40 group-hover:text-white transition-colors" />
                    <span className="text-[13px] text-white font-medium">{service.name}</span>
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: HOW WE WORK */}
      <section 
        className="w-full"
        style={{ background: '#0D0D0D', padding: '120px 0' }}
      >
        <div className="w-full max-w-[1100px] mx-auto px-6 md:px-12 flex flex-col items-start font-sans">
          
          {/* Label */}
          <div 
            className="uppercase tracking-[0.12em] text-white/25 font-medium select-none"
            style={{ fontSize: '11px', marginBottom: '16px' }}
          >
            How we work
          </div>

          {/* Headline */}
          <h2 
            className="text-white font-medium"
            style={{
              fontSize: 'clamp(26px, 3vw, 40px)',
              letterSpacing: '-0.02em',
              maxWidth: '600px',
              marginBottom: '64px',
              lineHeight: 1.2
            }}
          >
            We don't freelance your project. We join it.
          </h2>

          {/* Row container */}
          <div className="process-container flex flex-col md:flex-row gap-12 md:gap-16 w-full relative">
            {processSteps.map((step, idx) => (
              <div 
                key={idx}
                className={`process-step-${idx} relative flex-1 flex flex-col items-start opacity-0`}
              >
                {/* Connector line (desktop only) */}
                {idx < 3 && (
                  <div 
                    className={`absolute top-[6px] left-[50px] right-[-64px] h-[0.5px] origin-left scale-x-0 process-line-${idx} hidden md:block`}
                    style={{ background: 'rgba(255, 255, 255, 0.08)' }}
                  />
                )}

                {/* Step Number */}
                <div 
                  className="font-mono text-white/25"
                  style={{ fontSize: '11px' }}
                >
                  {step.num}
                </div>

                {/* Step Title */}
                <h4 
                  className="text-white font-medium"
                  style={{ fontSize: '16px', marginTop: '8px' }}
                >
                  {step.title}
                </h4>

                {/* Description */}
                <p 
                  className="font-normal text-white/45"
                  style={{ fontSize: '13px', lineHeight: 1.7, marginTop: '8px', maxWidth: '220px' }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: INDUSTRIES */}
      <section 
        className="industries-section w-full overflow-hidden"
        style={{ background: '#0A0A0A', padding: '100px 0' }}
      >
        <div className="w-full max-w-[1100px] mx-auto px-6 md:px-12 flex flex-col items-start font-sans">
          {/* Label */}
          <div 
            className="industries-header uppercase tracking-[0.12em] text-white/25 font-medium select-none"
            style={{ fontSize: '11px', marginBottom: '40px' }}
          >
            Industries we've touched
          </div>
        </div>

        {/* Marquee area */}
        <div className="w-full flex flex-col gap-3 py-4 select-none overflow-hidden relative">
          
          {/* Row 1 (LTR) */}
          <div className="overflow-hidden w-full flex relative marquee-container">
            <div className="flex gap-[12px] animate-marquee-ltr whitespace-nowrap">
              {[...row1Industries, ...row1Industries].map((item, i) => (
                <div 
                  key={i} 
                  className="industry-pill px-[18px] py-[8px] text-[13px] border border-white/10 rounded-full text-white/50 hover:text-white hover:border-white/35 transition-all duration-200 cursor-pointer whitespace-nowrap select-none"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 (RTL) */}
          <div className="overflow-hidden w-full flex relative marquee-container">
            <div className="flex gap-[12px] animate-marquee-rtl whitespace-nowrap">
              {[...row2Industries, ...row2Industries].map((item, i) => (
                <div 
                  key={i} 
                  className="industry-pill px-[18px] py-[8px] text-[13px] border border-white/10 rounded-full text-white/50 hover:text-white hover:border-white/35 transition-all duration-200 cursor-pointer whitespace-nowrap select-none"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Caption Stat */}
        <div 
          className="text-center font-normal italic mt-12 text-[15px] text-white/35 select-none"
          style={{ marginTop: '48px' }}
        >
          20+ industries. The number grows every quarter.
        </div>
      </section>

      {/* SECTION 5: SERVICES PAGE CTA */}
      <section 
        className="services-cta-section w-full"
        style={{ 
          background: '#0A0A0A', 
          padding: '100px 0 120px',
          borderTop: '0.5px solid rgba(255,255,255,0.06)' 
        }}
      >
        <div className="services-cta-content w-full max-w-[600px] mx-auto px-6 flex flex-col items-center text-center font-sans">
          {/* Headline */}
          <h2 
            className="text-white font-medium"
            style={{
              fontSize: 'clamp(32px, 4vw, 54px)',
              letterSpacing: '-0.025em',
              lineHeight: 1.1
            }}
          >
            Not sure where to start?
          </h2>

          {/* Subheadline */}
          <p 
            className="font-normal text-white/45"
            style={{
              fontSize: '16px',
              marginTop: '16px',
              marginBottom: '36px',
              lineHeight: 1.6
            }}
          >
            Tell us what you're trying to build. We'll tell you exactly how we can help.
          </p>

          {/* Buttons container */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center select-none">
            <Link 
              to="/contact"
              className="font-medium bg-white text-[#0A0A0A] text-[15px] px-8 py-3.5 rounded hover:opacity-90 transition-opacity duration-200 text-center w-full sm:w-auto"
            >
              Start a Conversation
            </Link>
            <Link 
              to="/contact"
              className="font-medium border border-white/30 text-white text-[15px] px-8 py-3.5 rounded hover:border-white hover:bg-white/5 transition-all duration-200 text-center w-full sm:w-auto"
            >
              Book a Free Call
            </Link>
          </div>

        </div>
      </section>

      {/* Global CSS Styles for Marquee */}
      <style>{`
        .animate-marquee-ltr {
          display: flex;
          gap: 12px;
          animation: marquee-ltr 35s linear infinite;
        }
        .animate-marquee-rtl {
          display: flex;
          gap: 12px;
          animation: marquee-rtl 35s linear infinite;
        }

        @keyframes marquee-ltr {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marquee-rtl {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        .marquee-container:hover .animate-marquee-ltr,
        .marquee-container:hover .animate-marquee-rtl {
          animation-play-state: paused;
        }
      `}</style>

    </div>
  )
}
