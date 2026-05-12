import { useEffect, useRef } from 'react';
import { PenTool, Rocket, GraduationCap, Microscope } from 'lucide-react';
import { gsap } from '../lib/gsap';

const PERSONAS = [
  {
    icon: PenTool,
    title: 'Writers',
    body: 'Drafts, half-thoughts, story seeds — captured before they slip. Find the line you wrote three months ago by what it meant.',
    chips: ['daily pages', 'voice drafts', 'character notes'],
  },
  {
    icon: Rocket,
    title: 'Founders',
    body: 'Decisions, meetings, ideas — surfaced when you need them. Walk into every call already prepared.',
    chips: ['meeting recap', 'investor follow-ups', 'product spec'],
  },
  {
    icon: GraduationCap,
    title: 'Students',
    body: 'Lecture audio in. Structured, searchable notes out. Quiz yourself on what you actually saved.',
    chips: ['lecture audio', 'flashcards', 'cite-ready'],
  },
  {
    icon: Microscope,
    title: 'Researchers',
    body: 'Cite-ready summaries from any source. Link evidence to argument without losing the thread.',
    chips: ['paper notes', 'literature map', 'quotations'],
  },
] as const;

export default function UseCases() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-head', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
      gsap.from('.persona-card', {
        opacity: 0,
        y: 44,
        duration: 0.95,
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
      className="relative bg-black py-28 md:py-40 px-6 sm:px-8 lg:px-12 border-b border-white/[0.06] overflow-hidden"
    >
      <div className="absolute -top-32 left-[10%] w-[420px] h-[420px] bg-indigo-700/15 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 right-[8%] w-[420px] h-[420px] bg-violet-700/12 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="mb-20 max-w-3xl reveal-head">
          <p className="text-[11px] font-medium tracking-[0.32em] mb-7 uppercase">
            <span className="text-indigo-300">Chapter 06</span>
            <span className="mx-3 text-white/20">·</span>
            <span className="text-white/50">Built for</span>
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
            For the way{' '}
            <span className="serif-i text-white/55">you</span> think.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {PERSONAS.map(({ icon: Icon, title, body, chips }) => (
            <div
              key={title}
              className="persona-card glass-dark glass-dark-hover group rounded-3xl p-8 transition-all duration-500 flex flex-col"
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-11 h-11 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-md flex items-center justify-center mb-6 group-hover:bg-white/[0.1] group-hover:scale-110 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_6px_18px_-10px_rgba(79,70,229,0.35)]">
                  <Icon size={18} strokeWidth={1.6} className="text-indigo-300" />
                </div>
                <h3
                  className="text-white text-[20px] font-medium mb-3"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {title}
                </h3>
                <p className="text-white/55 text-[14px] leading-relaxed mb-6 flex-1">
                  {body}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {chips.map((c) => (
                    <span
                      key={c}
                      className="text-[10.5px] tracking-[0.14em] uppercase text-indigo-200/90 bg-white/[0.04] border border-white/10 backdrop-blur-md rounded-full px-2.5 py-1 font-medium"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
