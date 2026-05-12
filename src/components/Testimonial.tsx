import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

export default function Testimonial() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-quote', {
        opacity: 0,
        y: 30,
        scale: 0.98,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      gsap.from('.reveal-byline', {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-28 md:py-40 px-6 sm:px-8 lg:px-12 border-b border-white/[0.06] overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[460px] bg-indigo-700/18 blur-[170px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        {/* Editorial slug */}
        <div className="reveal-byline flex items-center justify-center gap-3 mb-16 text-[10px] tracking-[0.36em] uppercase font-medium">
          <span className="block w-6 h-px bg-indigo-300/50" />
          <span className="text-indigo-300">Chapter 07</span>
          <span className="text-white/20">·</span>
          <span className="text-white/50">From the field</span>
          <span className="block w-6 h-px bg-indigo-300/50" />
        </div>

        {/* Oversized quote-mark mark */}
        <div
          aria-hidden
          className="reveal-byline pointer-events-none select-none absolute -top-2 left-1/2 -translate-x-1/2 text-indigo-300/30 leading-none"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(180px, 22vw, 320px)',
            letterSpacing: '-0.04em',
          }}
        >
          “
        </div>

        <blockquote
          className="relative text-white text-center reveal-quote max-w-4xl mx-auto"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontWeight: 400,
            fontSize: 'clamp(34px, 5.2vw, 76px)',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          tid is the first app that{' '}
          <span className="italic text-indigo-300/90">actually</span>{' '}
          understands what I meant — not just what I typed. It's like having a
          research assistant who{' '}
          <span className="italic text-indigo-300/90">never forgets.</span>
        </blockquote>

        {/* Byline rail */}
        <div className="reveal-byline mt-20 flex items-center justify-center gap-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-700 border border-white/15 flex items-center justify-center shadow-[0_0_24px_rgba(99,102,241,0.45)]">
            <span className="text-white text-[13px] font-medium">MR</span>
          </div>
          <div className="text-left">
            <div className="text-white text-[15px] font-medium tracking-tight">
              Maya Rao
            </div>
            <div className="text-white/45 text-[11px] tracking-[0.22em] uppercase mt-0.5">
              Writer · Founder, Field Notes
            </div>
          </div>
          <span className="block w-px h-8 bg-white/15 mx-1" />
          <div
            className="text-white/40"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: '18px',
              letterSpacing: '-0.01em',
            }}
          >
            Issue No. 07
          </div>
        </div>
      </div>
    </section>
  );
}
