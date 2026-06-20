import { useState, useEffect } from 'react'

const declarations = [
  {
    num: "01",
    headline: "We are not an agency.",
    body: "We have never been an agency. Agencies take briefs. Agencies deliver deliverables. Agencies invoice and move on. The Hustle House is something different — it is an entity that takes ownership. When we work on something, it is ours as much as it is yours. We don't clock out. We don't submit work and wait for feedback. We build alongside you, because we have always been builders first."
  },
  {
    num: "02",
    headline: "This entity was built from survival, not ambition.",
    body: "The Hustle House was not born from a business plan or a market gap analysis. It was born from two 18-year-olds who had nothing left to lose. When you're that low, the only direction available is up. That's not a metaphor — it's the actual geometry of our origin. The chevron in our logo isn't decoration. It is the only direction we have ever known how to move."
  },
  {
    num: "03",
    headline: "Every person who comes through these walls leaves changed.",
    body: "We don't know how to explain this, so we'll just say it directly: something happens to people inside The Hustle House. They find a version of themselves that was dormant. They hit what we call their prime — a period of clarity, capability, and drive that they hadn't accessed before. This has happened to people we hired, people who freelanced with us, and people who founded companies alongside us. It doesn't matter if they stayed or left. They all left different."
  },
  {
    num: "04",
    headline: "We evolve. We do not pivot.",
    body: "Marketing came first. Design joined. Development followed. AI is next. A SaaS is in the room. Each of these wasn't a strategic pivot — it was a natural extension of what we were already becoming. Pivots happen when something isn't working. Evolution happens when something is working so well that it expands. The Hustle House evolves."
  },
  {
    num: "05",
    headline: "Bootstrapped is not a phase. It is a philosophy.",
    body: "We have never taken external funding. Not because it wasn't offered, and not because we are opposed to it in principle. Because constraint is where creativity lives. Every rupee we have ever spent was earned. Every decision we have ever made was made without a safety net. That discipline — the kind you can only build when failure has a real cost — is what makes THH work built differently. You can feel it in the output."
  },
  {
    num: "06",
    headline: "We are building an ecosystem, not a service list.",
    body: "Services were the beginning. They funded everything. They built the team, the credibility, the clients, the culture. But the future of The Hustle House is products. Ventures. Entities that live beyond any single client relationship. We are in the process of building something that scales beyond what any service business can. The first product is almost here. It will not be the last."
  },
  {
    num: "07",
    headline: "The work we do must matter.",
    body: "We are selective. We have said no to money that didn't feel right. We have ended client relationships that were good for revenue and bad for everything else. This is not because we can afford to — it's because we cannot afford not to. The quality of what we do is directly connected to whether we believe in what we're doing. We will always choose meaningful work over comfortable work."
  },
  {
    num: "08",
    headline: "We are just getting started.",
    body: "Three years. Zero funding. 50+ brands. 20+ industries. One SaaS in the works. And the honest belief that everything so far — everything — has been the warm-up. The Hustle House at 3 years old is not what it will be at 5, or 10, or 30. We know that because we are different people than we were at the start. The entity grows as its people grow. And we are nowhere near done growing."
  }
]

const splitHeadline = (headline: string) => {
  const parts = headline.split(' ')
  const firstWord = parts[0]
  const restOfWords = parts.slice(1).join(' ')
  return { firstWord, restOfWords }
}

export default function Manifesto() {
  const [scrollProgress, setScrollProgress] = useState(0)

  // Calculate scroll progress percentage dynamically
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100
        setScrollProgress(progress)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fade up scroll animations using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    const elements = document.querySelectorAll('.manifesto-animate')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const shareTwitter = () => {
    const text = encodeURIComponent("Just read The Hustle House Manifesto. Something different. thehustlehouseofficial.com/manifesto")
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank')
  }

  const shareLinkedIn = () => {
    const url = encodeURIComponent("https://thehustlehouseofficial.com/manifesto")
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
  }

  return (
    <div 
      style={{ background: '#0A0A0A' }}
      className="w-full min-h-screen text-[#F0EEF8] font-sans selection:bg-white/10 selection:text-white pb-32"
    >
      {/* Fixed edge-to-edge reading progress bar */}
      <div 
        className="fixed top-0 left-0 h-[2px] z-[100] transition-all duration-75"
        style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #C0392B, #E8682A)',
        }}
      />

      {/* Content wrapper */}
      <div className="w-full max-w-[680px] mx-auto px-10">
        
        {/* Header */}
        <header className="pt-[140px] pb-20 select-none">
          {/* Breadcrumb */}
          <div
            className="text-[11px] uppercase tracking-[0.12em]"
            style={{ color: 'rgba(255, 255, 255, 0.25)', fontWeight: 500 }}
          >
            The Hustle House™ / Manifesto
          </div>

          {/* Title */}
          <h1
            className="text-white font-medium"
            style={{
              fontSize: 'clamp(56px, 8vw, 110px)',
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
              marginTop: '32px',
            }}
          >
            The Manifesto.
          </h1>

          {/* Horizontal Rule */}
          <div 
            className="h-[0.5px] w-full"
            style={{ background: 'rgba(255, 255, 255, 0.1)', margin: '32px 0' }}
          />

          {/* Meta row */}
          <div 
            className="font-normal"
            style={{
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.3)',
              letterSpacing: '0.04em'
            }}
          >
            Published by The Hustle House™ · Est. July 26, 2023 · Version 1.0
          </div>
        </header>

        {/* Declarations List */}
        <main className="flex flex-col">
          {declarations.map((decl, index) => {
            const { firstWord, restOfWords } = splitHeadline(decl.headline)
            return (
              <div key={decl.num}>
                {/* CSS Transition classes mapped via IntersectionObserver observer */}
                <article 
                  className="manifesto-declaration manifesto-animate flex flex-col items-start w-full transition-all duration-700 ease-out translate-y-4 opacity-0"
                  style={{ transitionProperty: 'opacity, transform' }}
                >
                  {/* Number */}
                  <div 
                    className="font-mono text-white/25"
                    style={{ fontSize: '11px', marginBottom: '12px' }}
                  >
                    {decl.num}
                  </div>

                  {/* Headline with split hover gradient first-word transition */}
                  <h3 
                    className="text-white font-medium group cursor-pointer text-left select-none"
                    style={{
                      fontSize: '26px',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.3,
                      marginBottom: '16px',
                    }}
                  >
                    <span className="relative inline-block">
                      {/* Normal state */}
                      <span className="transition-opacity duration-300 group-hover:opacity-0">
                        {firstWord}
                      </span>
                      {/* Hover state gradient */}
                      <span 
                        className="absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 select-none pointer-events-none"
                        style={{
                          background: 'linear-gradient(135deg, #8B0000, #C0392B, #E8682A)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {firstWord}
                      </span>
                    </span>
                    <span> {restOfWords}</span>
                  </h3>

                  {/* Body text */}
                  <p 
                    className="font-normal text-white/[0.58]"
                    style={{
                      fontSize: '17px',
                      lineHeight: 1.9,
                    }}
                  >
                    {decl.body}
                  </p>
                </article>

                {/* Thin divider (only between declarations) */}
                {index < declarations.length - 1 && (
                  <div 
                    className="h-[0.5px] w-full"
                    style={{ background: 'rgba(255, 255, 255, 0.07)', margin: '64px 0' }}
                  />
                )}
              </div>
            )
          })}
        </main>

        {/* Closing Element */}
        <footer 
          className="manifesto-animate flex flex-col items-center text-center transition-all duration-700 ease-out translate-y-4 opacity-0"
          style={{ marginTop: '80px', transitionProperty: 'opacity, transform' }}
        >
          {/* Logo Mark centered, 64px x 64px, white-fill 12% opacity */}
          <div 
            className="w-16 h-16 select-none pointer-events-none"
            style={{ color: 'rgba(255, 255, 255, 0.12)' }}
          >
            <svg 
              viewBox="0 0 100 100" 
              className="w-full h-full" 
              fill="currentColor"
            >
              {/* Diamond */}
              <polygon points="50,15 75,40 50,65 25,40" />
              {/* Chevron */}
              <polygon points="50,90 15,55 25,45 50,70 75,45 85,55" />
            </svg>
          </div>

          <div
            className="font-medium text-white/25 uppercase tracking-[0.06em]"
            style={{ fontSize: '14px', marginTop: '16px' }}
          >
            The Hustle House™
          </div>

          <div
            className="font-normal text-white/15"
            style={{ fontSize: '11px', marginTop: '4px' }}
          >
            Est. July 26, 2023 · Indore, India · thehustlehouseofficial.com
          </div>

          {/* Share Row */}
          <div 
            className="flex items-center gap-4 mt-10"
            style={{ marginTop: '40px' }}
          >
            <span 
              className="font-normal text-white/30"
              style={{ fontSize: '11px' }}
            >
              Share this
            </span>

            {/* Twitter/X Button */}
            <button
              onClick={shareTwitter}
              className="w-8 h-8 rounded-full border border-white/20 hover:border-white/40 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
              title="Share on X"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>

            {/* LinkedIn Button */}
            <button
              onClick={shareLinkedIn}
              className="w-8 h-8 rounded-full border border-white/20 hover:border-white/40 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
              title="Share on LinkedIn"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </button>
          </div>
        </footer>

      </div>

      {/* Global CSS Inject to support observer animation toggles */}
      <style>{`
        .manifesto-declaration.visible, footer.visible {
          transform: translateY(0) !important;
          opacity: 1 !important;
        }
      `}</style>
    </div>
  )
}
