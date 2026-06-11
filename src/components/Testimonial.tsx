import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

const QUOTES = [
  {
    quote:
      'The first product I have seen that nails the capture experience. This is what modern note-taking should feel like.',
    name: 'Leonard Suarez',
    role: 'Writer',
    initials: 'LS',
  },
  {
    quote:
      'tid dramatically speeds up my process by giving me an answer immediately. It is far more useful than scrolling through a folder tree.',
    name: 'Han Fu',
    role: 'Founder, Poppins',
    initials: 'HF',
  },
  {
    quote:
      'tid materially strengthens my recall. It cares about the context I capture and resurfaces it exactly when I need it.',
    name: 'Joseph Henry',
    role: 'PhD candidate',
    initials: 'JH',
  },
];

export default function Testimonial() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.t-head, .t-card', {
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
      ref={sectionRef}
      className="relative bg-[#0a0a0d] py-24 md:py-32 px-6 sm:px-8 lg:px-12 border-t border-white/[0.06]"
    >
      <div className="relative max-w-7xl mx-auto">
        <div className="t-head mb-14 max-w-2xl">
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
            What note-takers
            <br />
            say about tid
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {QUOTES.map((q) => (
            <div
              key={q.name}
              className="t-card card-blur rounded-2xl border border-white/[0.07] p-8 flex flex-col justify-between min-h-[260px]"
            >
              <p className="text-white/85 text-[15px] leading-relaxed">
                &ldquo;{q.quote}&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 grid place-items-center text-white/80 text-[11px] font-semibold">
                  {q.initials}
                </div>
                <div>
                  <div className="text-white text-[13px] font-medium tracking-tight">
                    {q.name}
                  </div>
                  <div className="text-white/45 text-[11px]">{q.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
