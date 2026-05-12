import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

const LINES = [
  'Most apps are built to keep you scrolling.',
  'tid is built to keep you thinking.',
  'A private place for the half-formed plan,',
  'the voice memo at 2am, the spark before the storm.',
  'Powered by AI that listens — not by feeds that distract.',
];

export default function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>('.manifest-line');

      // Initial state: very dim, blurred, slightly below
      gsap.set(lines, { opacity: 0.08, filter: 'blur(14px)', y: 26 });

      // Pinned scrub: reveals all lines across the first ~70% of pinned scroll,
      // then holds with everything sharp before the section unpins.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=220%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          const revealRange = 0.7;
          const windowSize = revealRange / lines.length;
          lines.forEach((line, i) => {
            const start = i * windowSize;
            const localT = Math.max(0, Math.min(1, (p - start) / windowSize));
            const eased = 1 - Math.pow(1 - localT, 3);
            gsap.set(line, {
              opacity: 0.08 + eased * 0.92,
              filter: `blur(${(1 - eased) * 14}px)`,
              y: (1 - eased) * 26,
            });
          });
        },
      });

      // Chapter label fade-in
      gsap.from('.manifest-chapter', {
        opacity: 0,
        y: 18,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* Ambient indigo glow drift */}
      <div className="absolute top-1/3 -left-[10%] w-[700px] h-[700px] bg-indigo-700/15 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-[10%] w-[600px] h-[600px] bg-violet-700/12 blur-[180px] rounded-full pointer-events-none" />

      <div className="relative h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12">
        <div className="max-w-5xl text-center">
          <div className="manifest-chapter inline-flex items-center gap-3 mb-12 text-[10px] tracking-[0.42em] uppercase text-white/40 font-medium">
            <span className="block w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_14px_rgba(99,102,241,0.85)]" />
            Opening — A quiet thesis
          </div>
          <h2
            className="text-white"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(28px, 4.4vw, 60px)',
              lineHeight: 1.25,
              letterSpacing: '-0.025em',
              margin: 0,
            }}
          >
            {LINES.map((line, i) => (
              <span
                key={i}
                className="manifest-line block will-change-[opacity,filter,transform]"
              >
                {line.includes('thinking') ? (
                  <>
                    tid is built to keep you{' '}
                    <span className="serif-i text-indigo-300">thinking.</span>
                  </>
                ) : line.includes('AI that listens') ? (
                  <>
                    Powered by AI that{' '}
                    <span className="serif-i text-indigo-300">listens</span> —
                    not by feeds that distract.
                  </>
                ) : (
                  line
                )}
              </span>
            ))}
          </h2>
        </div>
      </div>
    </section>
  );
}
