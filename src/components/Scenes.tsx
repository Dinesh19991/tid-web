import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

const COLS = ['tid', 'Notes apps', 'Folders & tags'];

const ROWS: { label: string; cells: ('yes' | 'partial' | 'no')[] }[] = [
  { label: 'Captures voice, text & links in one place', cells: ['yes', 'partial', 'no'] },
  { label: 'Organizes automatically by meaning', cells: ['yes', 'no', 'no'] },
  { label: 'Recall by plain-language questions', cells: ['yes', 'partial', 'no'] },
  { label: 'Summaries & action items on demand', cells: ['yes', 'no', 'no'] },
  { label: 'Links related thoughts for you', cells: ['yes', 'partial', 'no'] },
  { label: 'Gets smarter the more you use it', cells: ['yes', 'no', 'no'] },
];

function Cell({ v }: { v: 'yes' | 'partial' | 'no' }) {
  if (v === 'yes')
    return (
      <span className="inline-grid place-items-center w-5 h-5 rounded-full bg-white text-[#0a0a0d] text-[11px]">
        ✓
      </span>
    );
  if (v === 'partial')
    return <span className="text-amber-300/90 text-[15px]">~</span>;
  return <span className="text-white/25 text-[15px]">—</span>;
}

export default function Scenes() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cmp-head, .cmp-table', {
        opacity: 0,
        y: 30,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.12,
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
      id="features"
      ref={sectionRef}
      className="relative bg-[#0a0a0d] py-24 md:py-32 px-6 sm:px-8 lg:px-12 border-t border-white/[0.06]"
    >
      <div className="relative max-w-5xl mx-auto">
        <div className="cmp-head mb-12 max-w-2xl">
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
            Built for how you
            <br />
            actually take notes
          </h2>
        </div>

        <div className="cmp-table overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
         <div className="rounded-2xl border border-white/[0.08] bg-[#141519] overflow-hidden min-w-[560px]">
          {/* header row */}
          <div className="grid grid-cols-[1.6fr_repeat(3,1fr)] border-b border-white/[0.07]">
            <div className="px-5 py-4 text-[12px] text-white/45">Capability</div>
            {COLS.map((c, i) => (
              <div
                key={c}
                className={`px-3 py-4 text-center text-[13px] font-medium ${
                  i === 0
                    ? 'text-white bg-white/[0.05]'
                    : 'text-white/50'
                }`}
              >
                {c}
              </div>
            ))}
          </div>

          {ROWS.map((row, ri) => (
            <div
              key={row.label}
              className={`grid grid-cols-[1.6fr_repeat(3,1fr)] items-center ${
                ri !== ROWS.length - 1 ? 'border-b border-white/[0.06]' : ''
              }`}
            >
              <div className="px-5 py-4 text-[13.5px] text-white/75">
                {row.label}
              </div>
              {row.cells.map((v, ci) => (
                <div
                  key={ci}
                  className={`px-3 py-4 text-center ${
                    ci === 0 ? 'bg-white/[0.04]' : ''
                  }`}
                >
                  <Cell v={v} />
                </div>
              ))}
            </div>
          ))}
         </div>
        </div>
      </div>
    </section>
  );
}
