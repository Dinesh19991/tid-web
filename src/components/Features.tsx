import { useEffect, useRef } from 'react';
import { Mic, Sparkles, Search, Smartphone } from 'lucide-react';
import { gsap } from '../lib/gsap';

const FEATURES = [
  {
    icon: Mic,
    title: 'Voice capture',
    body: 'Speak in any direction your mind goes. tid transcribes and structures as you talk — no editing pass required.',
  },
  {
    icon: Sparkles,
    title: 'AI summaries',
    body: 'Meetings, articles, half-finished drafts — distilled into the points that actually matter, on demand.',
  },
  {
    icon: Search,
    title: 'Semantic search',
    body: 'Find by meaning, not exact words. Ask in plain English; tid surfaces the right note even if you misremember the title.',
  },
  {
    icon: Smartphone,
    title: 'Sync everywhere',
    body: 'iOS, Android, and web. Encrypted at rest and in transit — your second brain is portable and private.',
  },
];

export default function Features() {
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
      gsap.from('.bento-tile', {
        opacity: 0,
        y: 50,
        duration: 0.9,
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
      className="relative bg-black py-28 md:py-40 px-6 sm:px-8 lg:px-12 border-b border-white/[0.06] overflow-hidden"
    >
      {/* Ambient indigo/violet blobs so the glass cards have something to refract */}
      <div className="absolute -top-20 left-[8%] w-[440px] h-[440px] bg-indigo-700/15 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[10%] w-[460px] h-[460px] bg-violet-700/12 blur-[170px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="mb-20 max-w-3xl reveal-head">
          <p className="text-[11px] font-medium tracking-[0.32em] mb-7 uppercase">
            <span className="text-indigo-300">Chapter 03</span>
            <span className="mx-3 text-white/20">·</span>
            <span className="text-white/50">Capabilities</span>
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
            One system. <br />
            <span className="serif-i text-white/55">
              Every kind of thinking.
            </span>
          </h2>
        </div>

        {/* Magazine-style asymmetric bento — first feature is the "lead"
            spanning 3 rows; the other three trail down the right column,
            so every grid cell is filled. */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-5 lg:gap-6 md:min-h-[640px]">
          {FEATURES.map(({ icon: Icon, title, body }, i) => {
            const isLead = i === 0;
            return (
              <div
                key={title}
                className={`bento-tile glass-dark glass-dark-hover group rounded-3xl p-8 lg:p-10 transition-all duration-500 flex flex-col ${
                  isLead
                    ? 'md:col-span-2 md:row-span-3'
                    : 'md:col-span-1 md:row-span-1'
                }`}
              >
                <div className="relative z-10 flex flex-col h-full">
                  {/* Editorial fig label */}
                  <div className="flex items-center justify-between mb-7">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white/[0.1] group-hover:scale-110 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_24px_-12px_rgba(79,70,229,0.35)]">
                      <Icon
                        size={20}
                        strokeWidth={1.6}
                        className="text-indigo-300"
                      />
                    </div>
                    <span className="text-[10px] tracking-[0.32em] uppercase text-white/30 font-medium tabular-nums">
                      Fig. {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3
                    className="text-white mb-4"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: isLead
                        ? 'clamp(28px, 3vw, 42px)'
                        : 'clamp(20px, 1.8vw, 24px)',
                      lineHeight: 1.08,
                      letterSpacing: '-0.025em',
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    className={`text-white/55 leading-relaxed flex-1 ${
                      isLead ? 'text-[15.5px] max-w-lg' : 'text-[14px] max-w-md'
                    }`}
                  >
                    {body}
                  </p>

                  {/* Lead feature gets a soft footer rail */}
                  {isLead && (
                    <div className="mt-10 flex items-center gap-3 text-white/40 text-[10.5px] tracking-[0.24em] uppercase font-medium">
                      <span className="block w-8 h-px bg-indigo-300/50" />
                      <span>The headline capability</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
