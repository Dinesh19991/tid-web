import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

/* The orbit: editorial typographic composition with concentric rings,
   each carrying a capability word in italic serif that drifts slowly. */

type Orbit = {
  radius: number; // in % of container
  duration: number; // seconds per full rotation
  reverse?: boolean;
  words: string[];
  size: number; // px font-size for word
  opacity: number;
};

const ORBITS: Orbit[] = [
  {
    radius: 18,
    duration: 28,
    words: ['capture', 'recall'],
    size: 22,
    opacity: 0.95,
  },
  {
    radius: 32,
    duration: 44,
    reverse: true,
    words: ['refine', 'compose', 'reflect'],
    size: 28,
    opacity: 0.7,
  },
  {
    radius: 46,
    duration: 60,
    words: ['listen', 'remember', 'connect', 'focus'],
    size: 34,
    opacity: 0.55,
  },
];

export default function Showcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-head', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      gsap.from('.orbit-stage', {
        opacity: 0,
        scale: 0.9,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });

      gsap.from('.orbit-credit', {
        opacity: 0,
        y: 20,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.4,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });

      // Gentle parallax pull as the section scrolls past
      if (orbitRef.current) {
        gsap.to(orbitRef.current, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-28 md:py-40 px-6 sm:px-8 lg:px-12 border-b border-white/[0.06] overflow-hidden"
    >
      {/* Ambient halos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[760px] bg-indigo-700/18 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-20 right-[12%] w-[320px] h-[320px] bg-violet-700/14 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <div className="mb-20 max-w-3xl reveal-head">
          <p className="text-[11px] font-medium tracking-[0.32em] mb-7 uppercase">
            <span className="text-indigo-300">Chapter 02</span>
            <span className="mx-3 text-white/20">·</span>
            <span className="text-white/50">The instrument</span>
          </p>
          <h2
            className="text-white"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(40px, 5.6vw, 72px)',
              lineHeight: 1.02,
              letterSpacing: '-0.035em',
              margin: 0,
            }}
          >
            One quiet center.{' '}
            <span className="serif-i text-white/55">A whole orbit of thought.</span>
          </h2>
          <p className="mt-7 text-white/55 text-[15.5px] leading-relaxed max-w-xl">
            tid sits in the middle of how you think. Every word you speak,
            every line you type orbits one private place — surfaced when you
            need it, silent when you don't.
          </p>
        </div>

        {/* The orbit stage */}
        <div
          ref={orbitRef}
          className="orbit-stage relative mx-auto aspect-square w-full max-w-[640px]"
        >
          {/* Concentric dotted rings */}
          {ORBITS.map((o, idx) => (
            <div
              key={`ring-${idx}`}
              className="absolute inset-0 m-auto rounded-full border border-dashed border-white/8"
              style={{
                width: `${o.radius * 2}%`,
                height: `${o.radius * 2}%`,
              }}
            />
          ))}

          {/* Outer faint ring */}
          <div className="absolute inset-0 m-auto rounded-full border border-white/[0.05]" />

          {/* Center glow / orb with editorial wordmark */}
          <div className="absolute inset-0 m-auto flex items-center justify-center">
            <div className="relative">
              {/* radial glow */}
              <div className="absolute -inset-12 rounded-full bg-indigo-500/25 blur-[60px]" />
              <div className="absolute -inset-6 rounded-full bg-indigo-400/30 blur-[24px]" />
              {/* core disc */}
              <div className="relative grid place-items-center size-28 sm:size-32 rounded-full bg-gradient-to-br from-indigo-400 via-indigo-600 to-indigo-900 shadow-[inset_0_2px_0_rgba(255,255,255,0.25),0_0_60px_rgba(99,102,241,0.45)]">
                <span
                  className="text-white"
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontStyle: 'italic',
                    fontSize: '40px',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                  }}
                >
                  tid.
                </span>
              </div>
            </div>
          </div>

          {/* Word orbits — each word is positioned absolutely on its ring,
              the wrapper rotates so the word travels around the orbit */}
          {ORBITS.map((o, idx) =>
            o.words.map((word, wi) => {
              const offsetDeg = (360 / o.words.length) * wi;
              return (
                <div
                  key={`w-${idx}-${wi}`}
                  className="absolute inset-0 m-auto pointer-events-none"
                  style={{
                    width: `${o.radius * 2}%`,
                    height: `${o.radius * 2}%`,
                    animation: `orbit-${idx} ${o.duration}s linear infinite ${o.reverse ? 'reverse' : ''}`,
                    transform: `rotate(${offsetDeg}deg)`,
                  }}
                >
                  <span
                    className="absolute left-1/2 -top-3 -translate-x-1/2 whitespace-nowrap text-white"
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontStyle: 'italic',
                      fontSize: `${o.size}px`,
                      letterSpacing: '-0.02em',
                      opacity: o.opacity,
                      // counter-rotate so the word reads upright at all times
                      animation: `counter-orbit-${idx} ${o.duration}s linear infinite ${o.reverse ? '' : 'reverse'}`,
                      transformOrigin: 'center',
                    }}
                  >
                    {word}
                  </span>
                </div>
              );
            })
          )}

          {/* Inject the per-ring keyframes — kept inline so the section is self-contained */}
          <style>{`
            @keyframes orbit-0 { to { transform: rotate(360deg); } }
            @keyframes orbit-1 { to { transform: rotate(360deg); } }
            @keyframes orbit-2 { to { transform: rotate(360deg); } }
            @keyframes counter-orbit-0 { to { transform: translateX(-50%) rotate(-360deg); } }
            @keyframes counter-orbit-1 { to { transform: translateX(-50%) rotate(-360deg); } }
            @keyframes counter-orbit-2 { to { transform: translateX(-50%) rotate(-360deg); } }
          `}</style>
        </div>

        {/* Editorial credits beneath the orbit */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-x-12 gap-y-8 max-w-4xl mx-auto text-center sm:text-left">
          {[
            {
              tag: 'I.',
              h: 'One private center.',
              p: 'Everything you save lives in one quiet place. No folders. No filing.',
            },
            {
              tag: 'II.',
              h: 'Surfaces in seconds.',
              p: 'Ask in plain words. tid finds the line by what it meant — not what you typed.',
            },
            {
              tag: 'III.',
              h: 'Silent unless asked.',
              p: 'No streaks. No nudges. tid waits for you, then disappears again.',
            },
          ].map((c) => (
            <div key={c.tag} className="orbit-credit">
              <div
                className="text-indigo-300/80 mb-3"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: 'italic',
                  fontSize: '28px',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}
              >
                {c.tag}
              </div>
              <h4 className="text-white text-[16.5px] font-medium tracking-tight mb-2">
                {c.h}
              </h4>
              <p className="text-white/50 text-[13.5px] leading-relaxed max-w-xs sm:max-w-none">
                {c.p}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
