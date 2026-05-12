import { useEffect, useRef } from 'react';
import { Mic, Wand2, MessageSquare } from 'lucide-react';
import { gsap } from '../lib/gsap';

const STEPS = [
  {
    n: '01',
    icon: Mic,
    title: 'Capture',
    body: 'Tap, talk, or type. tid grabs every thought without friction or judgement.',
  },
  {
    n: '02',
    icon: Wand2,
    title: 'Refine',
    body: 'AI cleans up, summarizes, and tags. Your notes structure themselves.',
  },
  {
    n: '03',
    icon: MessageSquare,
    title: 'Recall',
    body: 'Ask anything in plain English. tid finds it — and connects the dots.',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-head', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from('.step-row', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.18,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      });
      gsap.from('.step-numeral', {
        opacity: 0,
        scale: 0.85,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.18,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-28 md:py-40 px-6 sm:px-8 lg:px-12 border-b border-white/[0.06] overflow-hidden"
    >
      <div className="absolute top-1/3 -left-[6%] w-[420px] h-[420px] bg-indigo-700/12 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-[6%] w-[420px] h-[420px] bg-violet-700/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <div className="mb-20 max-w-3xl reveal-head">
          <p className="text-[11px] font-medium tracking-[0.32em] mb-7 uppercase">
            <span className="text-indigo-300">Chapter 05</span>
            <span className="mx-3 text-white/20">·</span>
            <span className="text-white/50">Workflow</span>
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
            Three steps from{' '}
            <span className="serif-i text-white/55">thought</span> to note.
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-[88px] sm:left-[120px] top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-indigo-400/60 to-transparent" />

          <div className="space-y-16">
            {STEPS.map(({ n, icon: Icon, title, body }) => (
              <div
                key={n}
                className="step-row grid grid-cols-[88px_1fr] sm:grid-cols-[120px_1fr] gap-8 sm:gap-14 items-start"
              >
                <div className="text-right relative">
                  <div
                    className="step-numeral text-indigo-300/90 leading-none"
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontStyle: 'italic',
                      fontSize: 'clamp(56px, 7vw, 96px)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {n}
                  </div>
                </div>

                <div className="pt-3">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                      <Icon
                        size={16}
                        strokeWidth={1.5}
                        className="text-indigo-300"
                      />
                    </div>
                    <h3
                      className="text-white text-[28px] font-medium tracking-tight"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {title}
                    </h3>
                  </div>
                  <p className="text-white/55 text-[15.5px] leading-relaxed max-w-lg">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
