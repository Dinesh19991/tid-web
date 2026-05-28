import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';

const TABS = [
  { n: '1', label: 'Capture', blurb: 'Speak, type, or paste — anything lands in one inbox.' },
  { n: '2', label: 'Organize', blurb: 'tid clusters by meaning into clean, linked notes.' },
  { n: '3', label: 'Recall', blurb: 'Ask in plain words and get the exact thought back.' },
  { n: '4', label: 'Improve', blurb: 'Your second brain gets sharper with every capture.' },
];

const ROWS = [
  { name: 'Albert Flores', role: 'Q3 planning memo', status: 'Summarized', tone: 'ok' },
  { name: 'Darrell Steward', role: 'Customer call notes', status: 'Tasks found', tone: 'ok' },
  { name: 'Kathryn Murphy', role: 'Reading highlights', status: '2 links added', tone: 'warn' },
  { name: 'Jack Cooper', role: 'Idea: pricing tiers', status: 'Organizing…', tone: 'mute' },
  { name: 'Jerome Bell', role: 'Voice memo · 6m', status: 'Transcribed', tone: 'ok' },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gl-head, .gl-tabs, .gl-visual', {
        opacity: 0,
        y: 30,
        duration: 0.85,
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
      ref={sectionRef}
      className="relative bg-[#0e0f13] py-24 md:py-32 px-6 sm:px-8 lg:px-12 border-t border-white/[0.06]"
    >
      <div className="relative max-w-6xl mx-auto">
        <div className="gl-head text-center max-w-2xl mx-auto mb-12">
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
            Get started in minutes, not months
          </h2>
        </div>

        {/* tabs */}
        <div className="gl-tabs grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 max-w-4xl mx-auto">
          {TABS.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              className={`text-left rounded-xl border px-4 py-3 transition-colors ${
                active === i
                  ? 'bg-white/[0.07] border-white/15'
                  : 'border-white/[0.06] hover:border-white/15'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`grid place-items-center w-5 h-5 rounded-full text-[10px] font-semibold ${
                    active === i
                      ? 'bg-white text-[#0a0a0d]'
                      : 'bg-white/[0.08] text-white/50'
                  }`}
                >
                  {t.n}
                </span>
                <span className="text-[13.5px] font-medium text-white">
                  {t.label}
                </span>
              </div>
              <p className="text-[11.5px] text-white/45 leading-snug">
                {t.blurb}
              </p>
            </button>
          ))}
        </div>

        {/* big product mockup */}
        <div className="gl-visual rounded-2xl bg-[#16151a] border border-white/[0.06] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.55)] overflow-hidden max-w-4xl mx-auto">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06]">
            <span className="text-white/85 text-[13px] font-medium">Inbox</span>
            <span className="text-white/35 text-[11px]">processing 124/1000 notes</span>
          </div>
          <div className="divide-y divide-white/[0.05]">
            {ROWS.map((r) => (
              <div
                key={r.name}
                className="flex items-center gap-4 px-5 py-3.5"
              >
                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/10 grid place-items-center text-white/70 text-[11px] font-medium shrink-0">
                  {r.name.split(' ').map((w) => w[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white/90 text-[13px] font-medium truncate">
                    {r.name}
                  </div>
                  <div className="text-white/40 text-[11.5px] truncate">
                    {r.role}
                  </div>
                </div>
                <span
                  className={`text-[11px] rounded-full px-2.5 py-1 border whitespace-nowrap ${
                    r.tone === 'ok'
                      ? 'text-emerald-300/90 border-emerald-400/20 bg-emerald-400/10'
                      : r.tone === 'warn'
                      ? 'text-amber-300/90 border-amber-400/20 bg-amber-400/10'
                      : 'text-white/50 border-white/10 bg-white/[0.04]'
                  }`}
                >
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
