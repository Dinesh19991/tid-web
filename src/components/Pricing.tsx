import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { gsap } from '../lib/gsap';

const TIERS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Everything you need to start thinking out loud.',
    features: [
      'Up to 100 notes',
      'Voice capture, 10 min / day',
      'Manual organization',
      'Sync across 2 devices',
    ],
    cta: 'Get tid free',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$8',
    period: 'per month',
    description: 'Unlock the full power of AI note-making.',
    features: [
      'Unlimited notes',
      'Unlimited voice capture',
      'AI summaries & semantic search',
      'Sync across all devices',
      'Priority support',
    ],
    cta: 'Start 14-day trial',
    highlight: true,
  },
];

export default function Pricing() {
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
      gsap.from('.tier-card', {
        opacity: 0,
        y: 60,
        scale: 0.96,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative bg-black py-28 md:py-40 px-6 sm:px-8 lg:px-12 border-b border-white/[0.06] overflow-hidden"
    >
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-700/25 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[480px] h-[480px] bg-violet-700/15 blur-[170px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <div className="mb-20 max-w-3xl reveal-head">
          <p className="text-[11px] font-medium tracking-[0.32em] mb-7 uppercase">
            <span className="text-indigo-300">Chapter 09</span>
            <span className="mx-3 text-white/20">·</span>
            <span className="text-white/50">Pricing</span>
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
            Simple pricing.{' '}
            <span className="serif-i text-white/55">No surprises.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={`tier-card relative rounded-3xl p-10 overflow-hidden transition-all duration-500 hover:-translate-y-1 ${
                t.highlight
                  ? 'bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900 text-white shadow-[0_30px_60px_-20px_rgba(79,70,229,0.5)]'
                  : 'glass-dark glass-dark-hover'
              }`}
            >
              {t.highlight && (
                <>
                  <div className="absolute -top-32 -right-20 w-72 h-72 rounded-full bg-white/15 blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-32 -left-20 w-72 h-72 rounded-full bg-violet-400/30 blur-3xl pointer-events-none" />
                </>
              )}

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <h3
                    className="text-[22px] font-medium tracking-tight text-white"
                  >
                    {t.name}
                  </h3>
                  {t.highlight && (
                    <span className="text-[10px] font-medium tracking-[0.16em] text-indigo-100 bg-white/15 border border-white/20 rounded-full px-3 py-1">
                      POPULAR
                    </span>
                  )}
                </div>
                <p
                  className={`text-[14px] mb-8 max-w-xs ${
                    t.highlight ? 'text-indigo-100/80' : 'text-white/55'
                  }`}
                >
                  {t.description}
                </p>
                <div className="flex items-baseline gap-2 mb-10">
                  <span
                    className="text-[56px] font-medium leading-none text-white"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: '-0.035em',
                    }}
                  >
                    {t.price}
                  </span>
                  <span
                    className={`text-[14px] ${
                      t.highlight ? 'text-indigo-100/70' : 'text-white/50'
                    }`}
                  >
                    {t.period}
                  </span>
                </div>
                <ul className="space-y-3.5 mb-10">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check
                        size={16}
                        strokeWidth={2}
                        className={`mt-0.5 flex-shrink-0 ${
                          t.highlight ? 'text-indigo-200' : 'text-indigo-300'
                        }`}
                      />
                      <span
                        className={`text-[14.5px] ${
                          t.highlight ? 'text-white/90' : 'text-white/85'
                        }`}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={`w-full rounded-full py-3.5 text-[14px] font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                    t.highlight
                      ? 'bg-white text-indigo-700 hover:shadow-[0_0_40px_8px_rgba(255,255,255,0.25)]'
                      : 'bg-white text-black hover:bg-indigo-200'
                  }`}
                >
                  {t.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-white/45 text-[12px] mt-10 tracking-wide">
          Both plans include end-to-end encryption · 99.9% uptime · Cancel
          anytime.
        </p>
      </div>
    </section>
  );
}
