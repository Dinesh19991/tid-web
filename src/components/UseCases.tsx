import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

const CASES = [
  {
    tag: 'Capture',
    title: 'Catch every fleeting idea',
    body: 'Dictate on a walk, paste an article, snap a whiteboard. tid transcribes, tags, and tidies it the moment it arrives.',
  },
  {
    tag: 'Organize',
    title: 'Structure without filing',
    body: 'No folders, no tags to maintain. tid clusters notes by meaning and links related thoughts automatically.',
  },
  {
    tag: 'Recall',
    title: 'Find anything by meaning',
    body: 'Ask a question in plain English and tid surfaces the right note, summarized and sourced — even if you forgot the title.',
  },
];

export default function UseCases() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.uc-head, .uc-card', {
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
      id="usecases"
      ref={sectionRef}
      className="relative bg-[#0a0a0d] py-24 md:py-32 px-6 sm:px-8 lg:px-12 border-t border-white/[0.06]"
    >
      <div className="relative max-w-7xl mx-auto">
        <div className="uc-head mb-14 max-w-2xl">
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
            One AI. Every kind of thought.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CASES.map((c) => (
            <div
              key={c.title}
              className="uc-card card-blur rounded-2xl border border-white/[0.07] p-7 transition-all"
            >
              <span className="text-[10.5px] tracking-[0.18em] uppercase text-white/40 font-medium">
                {c.tag}
              </span>
              <h3 className="mt-4 text-[18px] font-medium tracking-tight text-white">
                {c.title}
              </h3>
              <p className="mt-2.5 text-white/55 text-[13.5px] leading-relaxed">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
