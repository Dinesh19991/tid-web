import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';

const STEPS = [
  {
    title: 'Writes the note for you',
    body: 'Speak, type, or paste — tid turns half-formed thoughts into clean, structured notes you would have written yourself.',
  },
  {
    title: 'Files itself by meaning',
    body: 'No folders, no tags. tid groups related notes by what they are about, so everything stays in the right place automatically.',
  },
  {
    title: 'Finds what you forgot',
    body: 'Ask in plain words and tid pulls up the exact note — even when you have lost the title and only remember the vibe.',
  },
  {
    title: 'Turns notes into next steps',
    body: 'Summaries, action items, and follow-ups are drafted for you, so a messy capture becomes something you can act on.',
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.how-head, .how-step, .how-visual', {
        opacity: 0,
        y: 30,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.08,
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how"
      ref={sectionRef}
      className="relative bg-[#0a0a0d] py-24 md:py-32 px-6 sm:px-8 lg:px-12 border-t border-white/[0.06]"
    >
      <div className="relative max-w-7xl mx-auto">
        <div className="how-head mb-14 max-w-2xl">
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
            How tid takes notes
            <br />
            for you, 24/7
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* steps */}
          <div className="flex flex-col">
            {STEPS.map((s, i) => (
              <button
                key={s.title}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`how-step text-left py-5 border-b border-white/[0.08] transition-colors ${
                  active === i ? '' : 'opacity-55 hover:opacity-90'
                }`}
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-[12px] tabular-nums font-medium text-white/40">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-[18px] font-medium tracking-tight text-white">
                      {s.title}
                    </h3>
                    <div
                      className="grid transition-[grid-template-rows] duration-300"
                      style={{ gridTemplateRows: active === i ? '1fr' : '0fr' }}
                    >
                      <div className="overflow-hidden">
                        <p className="pt-2 text-white/55 text-[14px] leading-relaxed max-w-md">
                          {s.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* product mockup */}
          <div className="how-visual">
            <div className="rounded-2xl bg-[#16151a] border border-white/[0.06] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.06]">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[10px] tracking-[0.18em] uppercase text-white/35">
                  tid · workspace
                </span>
              </div>
              <div className="grid grid-cols-[1.3fr_1fr]">
                <div className="p-5 border-r border-white/[0.06]">
                  <div className="text-white/85 text-[13px] font-medium mb-1">
                    Q3 planning — first cut
                  </div>
                  <div className="text-white/35 text-[10px] tracking-[0.16em] uppercase mb-4">
                    Voice · 14m · auto-summarized
                  </div>
                  <div className="space-y-2.5">
                    {[
                      'Refocus on retention before growth spend.',
                      'Hire one DRI for onboarding by mid-Aug.',
                      'Move research wiki into tid.',
                    ].map((l, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 text-[12px] text-white/70 leading-relaxed"
                      >
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/40 shrink-0" />
                        {l}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="text-[9.5px] tracking-[0.2em] uppercase text-white/30">
                    Surfaced
                  </div>
                  {[
                    { k: 'Topic', v: '3 linked notes' },
                    { k: 'Owner', v: 'Maya' },
                    { k: 'Due', v: 'Aug 14' },
                  ].map((r) => (
                    <div key={r.k} className="flex items-center justify-between">
                      <span className="text-white/45 text-[11.5px]">{r.k}</span>
                      <span className="text-white/80 text-[11.5px] bg-white/[0.06] rounded-md px-2 py-0.5">
                        {r.v}
                      </span>
                    </div>
                  ))}
                  <div className="mt-3 rounded-lg bg-white/[0.04] border border-white/[0.06] px-3 py-2 text-white/55 text-[11px] leading-relaxed">
                    Matched by meaning, not keywords.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
