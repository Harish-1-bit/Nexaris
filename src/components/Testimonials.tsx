import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      });

      // 1. Frame Lines (Radial wipe mimics a line draw perfectly around corners)
      tl.fromTo('.frame-line-tr',
        { clipPath: 'circle(0% at 100% 100%)' },
        { clipPath: 'circle(150% at 100% 100%)', duration: 1.2, ease: 'power2.inOut' },
        0
      );
      tl.fromTo('.frame-line-bl',
        { clipPath: 'circle(0% at 0% 0%)' },
        { clipPath: 'circle(150% at 0% 0%)', duration: 1.2, ease: 'power2.inOut' },
        0
      );

      // 2. Quotation Marks Pop Out
      tl.fromTo('.quote-top',
        { x: -30, opacity: 0, scale: 0.5 },
        { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)' },
        0.4
      );
      tl.fromTo('.quote-bottom',
        { x: 30, opacity: 0, scale: 0.5 },
        { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)' },
        0.4
      );

      // 3. Center Text Reveal (Hero Style Stagger)
      if (textRef.current) {
        const words = textRef.current.querySelectorAll('.word');
        tl.fromTo(words,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.04, duration: 0.8, ease: 'power2.out' },
          0.6
        );
      }

      // 4. Author Info
      tl.fromTo('.author-info',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        1.2
      );

      // 5. Stat & Logos (Fade up slowly)
      tl.fromTo('.stat-logos',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        1.4
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const wrapWords = (text: string) => {
    return text.split(' ').filter(word => word !== '').map((word, i) => {
      let className = "word inline-block opacity-0 mr-[0.25em]";
      let displayWord = word;

      // Highlight formatting: *word* -> bold & white
      if (displayWord.startsWith('*') && displayWord.endsWith('*')) {
        className += " text-white font-semibold";
        displayWord = displayWord.slice(1, -1);
      }
      // Highlight formatting: _word_ -> italic & white
      else if (displayWord.startsWith('_') && displayWord.endsWith('_')) {
        className += " italic text-white";
        displayWord = displayWord.slice(1, -1);
      }

      return (
        <span key={i} className={className}>
          {displayWord}
        </span>
      );
    });
  };

  const testimonialText = "Working with Nexaris felt like having a *world-class* creative partner embedded in our team. They understood our vision immediately and delivered something that _exceeded_ _every_ _expectation_ we had.";

  return (
    <section className="bg-black py-[140px] px-6 md:px-12 relative overflow-hidden">
      {/* Background glow for depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-white/[0.02] blur-[120px] pointer-events-none" />

      <div ref={containerRef} className="max-w-[1100px] mx-auto flex flex-col items-center">

        {/* The Premium Quote Frame */}
        <div className="relative w-full max-w-[940px] px-8 py-16 md:px-20 md:py-24 mb-20">

          {/* Decorative Frame Hooks */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top Right Hook */}
            <div className="frame-line-tr absolute top-0 right-0 w-[70%] h-[60%] border-t border-r border-white/20 rounded-tr-[80px]" />
            {/* Bottom Left Hook */}
            <div className="frame-line-bl absolute bottom-0 left-0 w-[70%] h-[60%] border-b border-l border-white/20 rounded-bl-[80px]" />
          </div>

          {/* Quote Marks */}
          <div className="quote-top absolute -top-6 left-12 text-white">
            <svg width="48" height="38" viewBox="0 0 48 38" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 21.375V0H18.75V21.375C18.75 30.75 14.25 38 4.5 38H0.75C6 32.75 8.25 28.25 8.25 21.375H0ZM27 21.375V0H45.75V21.375C45.75 30.75 41.25 38 31.5 38H27.75C33 32.75 35.25 28.25 35.25 21.375H27Z" />
            </svg>
          </div>
          <div className="quote-bottom absolute -bottom-6 right-12 text-white rotate-180">
            <svg width="48" height="38" viewBox="0 0 48 38" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 21.375V0H18.75V21.375C18.75 30.75 14.25 38 4.5 38H0.75C6 32.75 8.25 28.25 8.25 21.375H0ZM27 21.375V0H45.75V21.375C45.75 30.75 41.25 38 31.5 38H27.75C33 32.75 35.25 28.25 35.25 21.375H27Z" />
            </svg>
          </div>

          {/* Quote Text */}
          <div className="text-center relative z-10">
            <p ref={textRef} className="font-display text-[26px] md:text-[38px] text-[rgba(255,255,255,0.7)] font-medium leading-[1.3] tracking-[-0.02em]">
              {wrapWords(testimonialText)}
            </p>

            {/* Author */}
            <div className="author-info mt-12 flex flex-col items-center opacity-0">
              <div className="w-8 h-[1px] bg-white/20 mb-6" />
              <span className="font-sans text-[16px] text-white font-medium tracking-wide">David Park</span>
              <span className="font-sans text-[12px] text-white/40 uppercase tracking-[0.15em] mt-2">Founder, Aura Health</span>
            </div>
          </div>
        </div>

        {/* The Stat & Logos */}
        <div className="stat-logos w-full border-t border-white/[0.03] pt-16 flex flex-col md:flex-row items-center justify-between gap-12 opacity-0">

          {/* Stat */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-display text-[56px] text-white font-medium leading-[1]">50+</span>
            <span className="font-sans text-[11px] text-white/40 uppercase tracking-[0.2em] mt-3">High-Growth Brands Built</span>
          </div>

          {/* Logos */}
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-10 md:gap-16 opacity-35 grayscale hover:opacity-60 transition-opacity duration-500">
            {['LUMINARY', 'AURA', 'VERTEX', 'PULSE', 'SOLARIS'].map((brand, i) => (
              <div key={i} className="font-display font-bold text-[18px] tracking-widest text-white italic">
                {brand}
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
