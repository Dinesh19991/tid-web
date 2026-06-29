import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

type Seg = { tone: 'bright' | 'muted' | 'accent'; text: string };

const PARAGRAPHS: Seg[][] = [
  [
    { tone: 'bright', text: 'You want to capture every thought before it slips away.' },
    { tone: 'bright', text: 'Your ideas want to resurface the moment they matter.' },
  ],
  [
    { tone: 'muted', text: 'Scattered notes and folders slow both down.' },
    { tone: 'accent', text: 'tid changes that.' },
  ],
];

const TONE = {
  bright: { color: '#ffffff', max: 1 },
  muted: { color: '#ffffff', max: 0.5 },
  accent: { color: '#9db8f5', max: 1 },
};

const DIM = 0.12;

export default function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('.mani-word');
      const apply = (p: number) => {
        const revealRange = 0.82;
        const win = revealRange / words.length;
        words.forEach((w, i) => {
          const start = i * win;
          const local = Math.max(0, Math.min(1, (p - start) / (win * 2.4)));
          const eased = 1 - Math.pow(1 - local, 2);
          const max = parseFloat(w.dataset.max || '1');
          w.style.opacity = String(DIM + eased * (max - DIM));
        });
      };
      apply(0);

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.4,
        onUpdate: (self) => apply(self.progress),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0a0a0d]"
      style={{ height: '210vh' }}
    >
      <div className="sticky top-0 h-[100dvh] flex items-center px-6 sm:px-8 lg:px-12 overflow-hidden">
        <div className="max-w-3xl mx-auto w-full space-y-7">
          {PARAGRAPHS.map((para, pi) => (
            <p
              key={pi}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(23px, 3.1vw, 40px)',
                lineHeight: 1.34,
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              {para.map((seg, si) =>
                seg.text.split(' ').map((word, wi) => (
                  <span
                    key={`${pi}-${si}-${wi}`}
                    className="mani-word inline-block will-change-[opacity]"
                    data-max={TONE[seg.tone].max}
                    style={{
                      color: TONE[seg.tone].color,
                      opacity: DIM,
                      marginRight: '0.26em',
                    }}
                  >
                    {word}
                  </span>
                )),
              )}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
