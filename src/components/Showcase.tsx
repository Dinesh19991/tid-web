import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

function Lock() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="2" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
function Shield() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function Export() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 15V4" />
      <path d="M8 7l4-4 4 4" />
      <path d="M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" />
    </svg>
  );
}
function Offline() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="6" y="3" width="12" height="18" rx="3" />
      <path d="M11 18h2" />
    </svg>
  );
}

const POINTS = [
  {
    Icon: Lock,
    title: 'End-to-end encrypted',
    body: 'Your notes are encrypted in transit and at rest. Only you hold the key — not even we can read them.',
  },
  {
    Icon: Shield,
    title: 'Never trained on',
    body: "tid is never trained on your private notes. Your thinking isn't a product, and it never will be.",
  },
  {
    Icon: Export,
    title: 'Export anytime',
    body: 'Markdown, JSON, or PDF. Leave whenever you like — every note belongs entirely to you.',
  },
  {
    Icon: Offline,
    title: 'Take notes offline',
    body: 'Jot offline and sync when you’re ready. No connection required to get a thought down.',
  },
];

export default function Showcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sec-head, .sec-card', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
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
      id="security"
      ref={sectionRef}
      className="relative bg-[#0a0a0d] py-24 md:py-32 px-6 sm:px-8 lg:px-12 border-t border-white/[0.06]"
    >
      <div className="relative max-w-7xl mx-auto">
        <div className="sec-head mb-14 max-w-2xl">
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
            Your notes
            <br />
            stay yours
          </h2>
          <p className="mt-5 text-white/55 text-[14.5px] leading-relaxed max-w-md">
            tid is private by design. Every note you take is yours alone —
            encrypted, never sold, and always portable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {POINTS.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="sec-card rounded-2xl bg-[#141519] border border-white/[0.07] p-7 hover:border-white/20 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 grid place-items-center text-white/70 mb-5">
                <Icon />
              </div>
              <h3 className="text-[16px] font-medium tracking-tight text-white">
                {title}
              </h3>
              <p className="mt-2 text-white/50 text-[13px] leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
