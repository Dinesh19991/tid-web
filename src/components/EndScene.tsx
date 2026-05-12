import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from '../lib/gsap';

export default function EndScene() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.end-chapter', {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from('.end-headline', {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      gsap.from('.end-sub, .end-cta, .end-rail', {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      gsap.from('.end-wordmark', {
        opacity: 0,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black overflow-hidden pt-32 md:pt-40 pb-24 md:pb-32 px-6 sm:px-8 lg:px-12"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-600/15 blur-[180px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center">
        <div className="end-chapter inline-flex items-center gap-3 mb-10 text-[10px] tracking-[0.42em] uppercase text-white/40 font-medium">
          <span className="block w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_14px_rgba(99,102,241,0.85)]" />
          End scene
        </div>

        <h2
          className="end-headline text-white"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(40px, 6.8vw, 92px)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            margin: 0,
          }}
        >
          Begin your{' '}
          <span className="serif-i text-white/65">quiet revolution.</span>
        </h2>

        <p className="end-sub mt-9 mx-auto max-w-xl text-white/55 text-[15.5px] leading-relaxed">
          The second brain that listens. Capture once — recall forever.
          Designed to disappear so your thinking can take center stage.
        </p>

        <div className="end-cta mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            className="group inline-flex items-center gap-3 bg-white text-black text-[14px] font-medium rounded-full pl-7 pr-5 py-3.5 transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_36px_4px_rgba(255,255,255,0.22)] active:scale-[0.97]"
          >
            Get tid free
            <ArrowUpRight
              size={16}
              strokeWidth={2}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
            />
          </button>
          <button
            type="button"
            className="liquid-glass rounded-full px-7 py-3.5 text-[13px] font-medium tracking-[0.18em] text-white/85 hover:text-white"
          >
            WATCH THE FILM
          </button>
        </div>

        <div className="end-rail mt-16 grid grid-cols-3 max-w-2xl mx-auto gap-px rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.02]">
          {[
            { v: 'iOS', s: 'available now' },
            { v: 'Android', s: 'available now' },
            { v: 'Web · Desktop', s: 'in beta' },
          ].map((p) => (
            <div
              key={p.v}
              className="bg-black/40 px-4 py-6"
            >
              <div className="text-white text-[14px] font-medium tracking-tight">
                {p.v}
              </div>
              <div className="mt-1 text-[10px] tracking-[0.22em] uppercase text-white/40">
                {p.s}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Massive background wordmark */}
      <div className="end-wordmark pointer-events-none absolute inset-x-0 bottom-[-6%] select-none text-center leading-none opacity-[0.05]">
        <span
          className="text-white"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(140px, 26vw, 320px)',
            fontWeight: 600,
            letterSpacing: '-0.06em',
          }}
        >
          tid.
        </span>
      </div>
    </section>
  );
}
