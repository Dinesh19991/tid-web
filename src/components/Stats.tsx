import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.o-head, .o-card', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="outcomes"
      ref={sectionRef}
      className="relative bg-[#0a0a0d] py-24 md:py-32 px-6 sm:px-8 lg:px-12 border-t border-white/[0.06]"
    >
      <div className="relative max-w-7xl mx-auto">
        <div className="o-head mb-14 max-w-2xl">
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(28px, 3.8vw, 46px)',
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              margin: 0,
            }}
          >
            Faster notes. Better recall.
            <br />
            Zero filing.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* card 1 — capture velocity */}
          <div className="o-card card-blur rounded-2xl border border-white/[0.07] overflow-hidden flex flex-col">
            <div className="p-6 h-44 relative">
              <div className="text-[9.5px] tracking-[0.2em] uppercase text-white/30 mb-3">
                Captures this week
              </div>
              <svg viewBox="0 0 240 90" className="w-full h-24">
                <defs>
                  <linearGradient id="oc1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 70 L30 62 L60 66 L90 48 L120 52 L150 36 L180 40 L210 20 L240 26 L240 90 L0 90 Z"
                  fill="url(#oc1)"
                />
                <path
                  d="M0 70 L30 62 L60 66 L90 48 L120 52 L150 36 L180 40 L210 20 L240 26"
                  fill="none"
                  stroke="white"
                  strokeOpacity="0.7"
                  strokeWidth="1.6"
                />
              </svg>
            </div>
            <div className="px-6 pb-6 pt-2 border-t border-white/[0.06]">
              <h3 className="text-white text-[16px] font-medium tracking-tight">
                Notes that write themselves
              </h3>
              <p className="text-white/50 text-[13px] leading-relaxed mt-2">
                Speak or type freely — tid keeps up and turns every fragment into a clean note.
              </p>
            </div>
          </div>

          {/* card 2 — informed recall */}
          <div className="o-card card-blur rounded-2xl border border-white/[0.07] overflow-hidden flex flex-col">
            <div className="p-6 h-44 flex flex-col justify-center gap-2.5">
              {['Where did I note the pricing idea?', 'Found · 3 linked notes', 'Summarized in 180ms'].map(
                (t, i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-white/[0.05] border border-white/[0.06] px-3 py-2 text-white/70 text-[11.5px]"
                    style={{ opacity: 1 - i * 0.18 }}
                  >
                    {t}
                  </div>
                ),
              )}
            </div>
            <div className="px-6 pb-6 pt-2 border-t border-white/[0.06]">
              <h3 className="text-white text-[16px] font-medium tracking-tight">
                Better-informed recall
              </h3>
              <p className="text-white/50 text-[13px] leading-relaxed mt-2">
                Ask in plain words and get the exact thought, sourced.
              </p>
            </div>
          </div>

          {/* card 3 — faster */}
          <div className="o-card card-blur rounded-2xl border border-white/[0.07] overflow-hidden flex flex-col">
            <div className="p-6 h-44 flex items-center justify-center">
              <div className="text-center">
                <div
                  className="text-white"
                  style={{
                    fontWeight: 600,
                    fontSize: 56,
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                  }}
                >
                  3×
                </div>
                <div className="text-white/45 text-[11px] tracking-[0.16em] uppercase mt-2">
                  faster to find any note
                </div>
              </div>
            </div>
            <div className="px-6 pb-6 pt-2 border-t border-white/[0.06]">
              <h3 className="text-white text-[16px] font-medium tracking-tight">
                No more lost notes
              </h3>
              <p className="text-white/50 text-[13px] leading-relaxed mt-2">
                Less time filing and searching. More time using what you wrote down.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
