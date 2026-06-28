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
  ArrowRight,
  Smartphone,
  Settings,
  Search,
  Compass,
  Sparkles
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const webDevServices = [
  { name: "Custom Web Applications", icon: Code2 },
  { name: "E-Commerce Solutions", icon: Globe },
  { name: "CMS & WordPress Development", icon: Layout },
  { name: "API & Backend Integrations", icon: Cpu }
]

const webDesignServices = [
  { name: "UI/UX & Wireframing", icon: Layout },
  { name: "Landing Page & Funnel Design", icon: Filter },
  { name: "Interactive Prototyping", icon: Monitor },
  { name: "Design System Architecture", icon: Palette }
]

const appDevServices = [
  { name: "iOS & Android Native Apps", icon: Smartphone },
  { name: "Cross-Platform Frameworks", icon: Code2 },
  { name: "Mobile UI/UX Prototyping", icon: User },
  { name: "App Deployment & Maintenance", icon: Settings }
]

const seoServices = [
  { name: "Technical SEO Audits", icon: Search },
  { name: "Keyword & Market Strategy", icon: TrendingUp },
  { name: "On-Page Optimization", icon: Globe },
  { name: "Link Building & Domain Authority", icon: Share2 }
]

const brandingServices = [
  { name: "Brand Identity Design", icon: Fingerprint },
  { name: "Logo & Style Guides", icon: Palette },
  { name: "Brand Positioning Strategy", icon: Compass },
  { name: "Marketing Collateral Systems", icon: Sparkles }
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

      // Section 2: Stacking Verticals scroll timeline
      const cardsTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.verticals-scroll-track',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          pin: '.verticals-sticky-wrapper',
        }
      })

      cardsTl
        // Card 2 enters
        .fromTo('.vertical-card-2', { yPercent: 100, opacity: 0, pointerEvents: 'none' }, { yPercent: 0, opacity: 1, pointerEvents: 'auto', ease: 'none' }, 'card2')
        
        // Card 3 enters
        .fromTo('.vertical-card-3', { yPercent: 100, opacity: 0, pointerEvents: 'none' }, { yPercent: 0, opacity: 1, pointerEvents: 'auto', ease: 'none' }, 'card3')

        // Card 4 enters
        .fromTo('.vertical-card-4', { yPercent: 100, opacity: 0, pointerEvents: 'none' }, { yPercent: 0, opacity: 1, pointerEvents: 'auto', ease: 'none' }, 'card4')

        // Card 5 enters
        .fromTo('.vertical-card-5', { yPercent: 100, opacity: 0, pointerEvents: 'none' }, { yPercent: 0, opacity: 1, pointerEvents: 'auto', ease: 'none' }, 'card5')

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
      className="w-full text-[#F5FBEF] font-sans selection:bg-white/10 selection:text-white"
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

      {/* SECTION 2: THE FIVE VERTICALS (Sticky Stacking Layout) */}
      <section 
        className="verticals-scroll-track relative w-full"
        style={{ minHeight: '500vh', background: '#0A0A0A' }}
      >
        <div className="verticals-sticky-wrapper sticky top-0 h-screen w-full flex flex-col justify-start items-center overflow-hidden">
          {/* Label container to align "Our verticals" */}
          <div className="w-full h-[80px] px-8 md:px-16 flex items-center justify-start flex-shrink-0">
            <div className="uppercase tracking-[0.12em] text-white/25 font-medium select-none text-[11px]">
              Our verticals
            </div>
          </div>

          {/* Stacking Cards Container */}
          <div className="relative w-full flex-1 overflow-visible">
            
            {/* Card 1 — Web Development */}
            <div className="vertical-card-1 absolute inset-x-0 bottom-0 w-full bg-black border-t border-b border-white/10 flex flex-col justify-start" style={{ top: '80px', zIndex: 10 }}>
              {/* Header Bar */}
              <div className="w-full h-[70px] border-b border-white/5 flex items-center justify-between px-8 md:px-16 flex-shrink-0 bg-black">
                <div className="flex items-center gap-6">
                  <span className="font-display font-medium text-[20px] text-white/40">01</span>
                  <h3 className="font-display font-medium text-white text-[20px] md:text-[24px]">
                    Web Development
                  </h3>
                </div>
                <Link 
                  to="/services/development"
                  className="text-[12px] text-white/40 hover:text-white transition-colors duration-200 inline-flex items-center gap-1"
                >
                  Explore vertical <ArrowRight size={12} />
                </Link>
              </div>
              {/* Body Area */}
              <div className="flex-1 w-full px-8 md:px-16 py-8 flex flex-col lg:flex-row lg:items-start justify-between lg:gap-16 overflow-hidden">
                {/* Column 1: Image / Visual Portrait */}
                <div className="w-full lg:w-[240px] h-[160px] lg:h-[280px] rounded-xl overflow-hidden relative flex-shrink-0 bg-[#121212] border border-white/5">
                  <img src="/web_dev.png" alt="Web Development" className="w-full h-full object-cover" />
                </div>
                {/* Column 2: Deliverables List */}
                <div className="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-1.5 justify-center">
                  <span className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-white/40 mb-2 block">Services</span>
                  {webDevServices.map((service, sIdx) => (
                    <Link 
                      key={sIdx}
                      to="/services/development"
                      className="flex items-center justify-between py-2 border-b border-white/10 hover:border-white/20 transition-all duration-200 group cursor-pointer"
                    >
                      <span className="text-[13px] text-white/75 group-hover:text-white font-medium transition-colors">{service.name}</span>
                      <ArrowRight size={12} className="text-white/20 group-hover:text-[#EF3E36] group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2 — Web Design */}
            <div className="vertical-card-2 absolute inset-x-0 bottom-0 w-full bg-black border-t border-b border-white/10 flex flex-col justify-start opacity-0 pointer-events-none" style={{ top: '150px', zIndex: 20 }}>
              {/* Header Bar */}
              <div className="w-full h-[70px] border-b border-white/5 flex items-center justify-between px-8 md:px-16 flex-shrink-0 bg-black">
                <div className="flex items-center gap-6">
                  <span className="font-display font-medium text-[20px] text-white/40">02</span>
                  <h3 className="font-display font-medium text-white text-[20px] md:text-[24px]">
                    Web Design
                  </h3>
                </div>
                <Link 
                  to="/services/design"
                  className="text-[12px] text-white/40 hover:text-white transition-colors duration-200 inline-flex items-center gap-1"
                >
                  Explore vertical <ArrowRight size={12} />
                </Link>
              </div>
              {/* Body Area */}
              <div className="flex-1 w-full px-8 md:px-16 py-8 flex flex-col lg:flex-row lg:items-start justify-between lg:gap-16 overflow-hidden">
                {/* Column 1: Image / Visual Portrait */}
                <div className="w-full lg:w-[240px] h-[160px] lg:h-[280px] rounded-xl overflow-hidden relative flex-shrink-0 bg-[#121212] border border-white/5">
                  <img src="/web_design.png" alt="Web Design" className="w-full h-full object-cover" />
                </div>
                {/* Column 2: Deliverables List */}
                <div className="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-1.5 justify-center">
                  <span className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-white/40 mb-2 block">Services</span>
                  {webDesignServices.map((service, sIdx) => (
                    <Link 
                      key={sIdx}
                      to="/services/design"
                      className="flex items-center justify-between py-2 border-b border-white/10 hover:border-white/20 transition-all duration-200 group cursor-pointer"
                    >
                      <span className="text-[13px] text-white/75 group-hover:text-white font-medium transition-colors">{service.name}</span>
                      <ArrowRight size={12} className="text-white/20 group-hover:text-[#EF3E36] group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 3 — App Development */}
            <div className="vertical-card-3 absolute inset-x-0 bottom-0 w-full bg-black border-t border-b border-white/10 flex flex-col justify-start opacity-0 pointer-events-none" style={{ top: '220px', zIndex: 30 }}>
              {/* Header Bar */}
              <div className="w-full h-[70px] border-b border-white/5 flex items-center justify-between px-8 md:px-16 flex-shrink-0 bg-black">
                <div className="flex items-center gap-6">
                  <span className="font-display font-medium text-[20px] text-white/40">03</span>
                  <h3 className="font-display font-medium text-white text-[20px] md:text-[24px]">
                    App Development
                  </h3>
                </div>
                <Link 
                  to="/services/development"
                  className="text-[12px] text-white/40 hover:text-white transition-colors duration-200 inline-flex items-center gap-1"
                >
                  Explore vertical <ArrowRight size={12} />
                </Link>
              </div>
              {/* Body Area */}
              <div className="flex-1 w-full px-8 md:px-16 py-8 flex flex-col lg:flex-row lg:items-start justify-between lg:gap-16 overflow-hidden">
                {/* Column 1: Image / Visual Portrait */}
                <div className="w-full lg:w-[240px] h-[160px] lg:h-[280px] rounded-xl overflow-hidden relative flex-shrink-0 bg-[#121212] border border-white/5">
                  <img src="/app_dev.png" alt="App Development" className="w-full h-full object-cover" />
                </div>
                {/* Column 2: Deliverables List */}
                <div className="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-1.5 justify-center">
                  <span className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-white/40 mb-2 block">Services</span>
                  {appDevServices.map((service, sIdx) => (
                    <Link 
                      key={sIdx}
                      to="/services/development"
                      className="flex items-center justify-between py-2 border-b border-white/10 hover:border-white/20 transition-all duration-200 group cursor-pointer"
                    >
                      <span className="text-[13px] text-white/75 group-hover:text-white font-medium transition-colors">{service.name}</span>
                      <ArrowRight size={12} className="text-white/20 group-hover:text-[#EF3E36] group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 4 — SEO */}
            <div className="vertical-card-4 absolute inset-x-0 bottom-0 w-full bg-black border-t border-b border-white/10 flex flex-col justify-start opacity-0 pointer-events-none" style={{ top: '290px', zIndex: 40 }}>
              {/* Header Bar */}
              <div className="w-full h-[70px] border-b border-white/5 flex items-center justify-between px-8 md:px-16 flex-shrink-0 bg-black">
                <div className="flex items-center gap-6">
                  <span className="font-display font-medium text-[20px] text-white/40">04</span>
                  <h3 className="font-display font-medium text-white text-[20px] md:text-[24px]">
                    SEO
                  </h3>
                </div>
                <Link 
                  to="/services/marketing"
                  className="text-[12px] text-white/40 hover:text-white transition-colors duration-200 inline-flex items-center gap-1"
                >
                  Explore vertical <ArrowRight size={12} />
                </Link>
              </div>
              {/* Body Area */}
              <div className="flex-1 w-full px-8 md:px-16 py-8 flex flex-col lg:flex-row lg:items-start justify-between lg:gap-16 overflow-hidden">
                {/* Column 1: Image / Visual Portrait */}
                <div className="w-full lg:w-[240px] h-[160px] lg:h-[280px] rounded-xl overflow-hidden relative flex-shrink-0 bg-[#121212] border border-white/5">
                  <img src="/seo.png" alt="SEO" className="w-full h-full object-cover" />
                </div>
                {/* Column 2: Deliverables List */}
                <div className="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-1.5 justify-center">
                  <span className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-white/40 mb-2 block">Services</span>
                  {seoServices.map((service, sIdx) => (
                    <Link 
                      key={sIdx}
                      to="/services/marketing"
                      className="flex items-center justify-between py-2 border-b border-white/10 hover:border-white/20 transition-all duration-200 group cursor-pointer"
                    >
                      <span className="text-[13px] text-white/75 group-hover:text-white font-medium transition-colors">{service.name}</span>
                      <ArrowRight size={12} className="text-white/20 group-hover:text-[#EF3E36] group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 5 — Branding */}
            <div className="vertical-card-5 absolute inset-x-0 bottom-0 w-full bg-black border-t border-b border-white/10 flex flex-col justify-start opacity-0 pointer-events-none" style={{ top: '360px', zIndex: 50 }}>
              {/* Header Bar */}
              <div className="w-full h-[70px] border-b border-white/5 flex items-center justify-between px-8 md:px-16 flex-shrink-0 bg-black">
                <div className="flex items-center gap-6">
                  <span className="font-display font-medium text-[20px] text-white/40">05</span>
                  <h3 className="font-display font-medium text-white text-[20px] md:text-[24px]">
                    Branding
                  </h3>
                </div>
                <Link 
                  to="/services/design"
                  className="text-[12px] text-white/40 hover:text-white transition-colors duration-200 inline-flex items-center gap-1"
                >
                  Explore vertical <ArrowRight size={12} />
                </Link>
              </div>
              {/* Body Area */}
              <div className="flex-1 w-full px-8 md:px-16 py-8 flex flex-col lg:flex-row lg:items-start justify-between lg:gap-16 overflow-hidden">
                {/* Column 1: Image / Visual Portrait */}
                <div className="w-full lg:w-[240px] h-[160px] lg:h-[280px] rounded-xl overflow-hidden relative flex-shrink-0 bg-[#121212] border border-white/5">
                  <img src="/branding.png" alt="Branding" className="w-full h-full object-cover" />
                </div>
                {/* Column 2: Deliverables List */}
                <div className="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-1.5 justify-center">
                  <span className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-white/40 mb-2 block">Services</span>
                  {brandingServices.map((service, sIdx) => (
                    <Link 
                      key={sIdx}
                      to="/services/design"
                      className="flex items-center justify-between py-2 border-b border-white/10 hover:border-white/20 transition-all duration-200 group cursor-pointer"
                    >
                      <span className="text-[13px] text-white/75 group-hover:text-white font-medium transition-colors">{service.name}</span>
                      <ArrowRight size={12} className="text-white/20 group-hover:text-[#EF3E36] group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
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
