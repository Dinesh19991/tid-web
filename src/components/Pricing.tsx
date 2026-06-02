import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      className="shrink-0 mt-0.5"
    >
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

type Tier = {
  name: 'Free' | 'Pro' | 'Max';
  monthly: number;
  yearly: number;
  blurb: string;
  features: string[];
  cta: string;
  featured: boolean;
};

const TIERS: Tier[] = [
  {
    name: 'Free',
    monthly: 0,
    yearly: 0,
    blurb: 'Everything you need to start taking smarter notes.',
    features: [
      '100 notes',
      '30 min of voice / month',
      'AI summaries & action items',
      'Semantic search',
      '2 devices',
    ],
    cta: 'Get started',
    featured: false,
  },
  {
    name: 'Pro',
    monthly: 12,
    yearly: 10,
    blurb: 'For people who take notes all day, every day.',
    features: [
      'Unlimited notes',
      '10 hours of voice / month',
      'Auto-organize & auto-link',
      'Chat with your notes',
      'Personal knowledge graph',
      'Unlimited devices',
    ],
    cta: 'Start free trial',
    featured: true,
  },
  {
    name: 'Max',
    monthly: 24,
    yearly: 20,
    blurb: 'Deeper reasoning, AI agents, and a notebook for your whole team.',
    features: [
      'Everything in Pro',
      'Unlimited voice transcription',
      'AI agents — research, draft, plan',
      'Long-context reasoning',
      'Shared workspaces',
      'Priority support',
    ],
    cta: 'Get Max',
    featured: false,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.price-head, .price-card', {
        opacity: 0,
        y: 32,
        duration: 0.85,
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
      id="pricing"
      ref={sectionRef}
      className="relative bg-[#0a0a0d] py-24 md:py-32 px-6 sm:px-8 lg:px-12 border-t border-white/[0.06]"
    >
      <div className="relative max-w-6xl mx-auto">
        <div className="price-head mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <h2
            className="max-w-xl"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(28px, 3.8vw, 46px)',
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              margin: 0,
            }}
          >
            Start free.
            <br />
            Upgrade when it clicks.
          </h2>

          {/* billing toggle */}
          <div
            role="tablist"
            aria-label="Billing period"
            className="inline-flex items-center self-start md:self-end rounded-full border border-white/[0.08] bg-white/[0.03] p-1"
          >
            {(['monthly', 'yearly'] as const).map((p) => (
              <button
                key={p}
                role="tab"
                aria-selected={billing === p}
                onClick={() => setBilling(p)}
                className={`rounded-full px-4 py-1.5 text-[12.5px] font-medium tracking-tight transition-colors ${
                  billing === p
                    ? 'bg-white text-[#0a0a0d]'
                    : 'text-white/55 hover:text-white/80'
                }`}
              >
                {p === 'monthly' ? 'Monthly' : 'Yearly'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {TIERS.map((tier) => {
            const price = billing === 'monthly' ? tier.monthly : tier.yearly;
            const cadence =
              tier.monthly === 0
                ? 'forever'
                : billing === 'monthly'
                ? 'per month'
                : 'per month, billed yearly';

            return (
              <div
                key={tier.name}
                className={`price-card relative rounded-2xl p-8 flex flex-col border transition-colors ${
                  tier.featured
                    ? 'bg-gradient-to-b from-[#1b2150] to-[#101119] border-[#5670d8]/40 shadow-[0_40px_90px_-40px_rgba(86,112,216,0.5)]'
                    : 'bg-[#141519] border-white/[0.07] hover:border-white/15'
                }`}
              >
                {tier.featured && (
                  <span className="absolute top-5 right-5 text-[9.5px] tracking-[0.18em] uppercase text-[#aebcf2] bg-[#5670d8]/20 border border-[#5670d8]/40 rounded-full px-2.5 py-1 font-medium">
                    Popular
                  </span>
                )}

                <h3
                  className="text-white font-medium"
                  style={{
                    fontSize: '26px',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.05,
                  }}
                >
                  {tier.name}
                </h3>

                <div className="mt-4 flex items-baseline gap-1.5">
                  <span
                    className="text-white"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: '44px',
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                    }}
                  >
                    ${price}
                  </span>
                  <span className="text-white/40 text-[12.5px]">
                    {cadence}
                  </span>
                </div>

                <p className="mt-3 text-white/50 text-[13px] leading-relaxed min-h-[40px]">
                  {tier.blurb}
                </p>

                <button
                  type="button"
                  className={`mt-6 w-full rounded-full py-2.5 text-[13.5px] font-medium transition ${
                    tier.featured
                      ? 'bg-white text-[#0a0a0d] hover:scale-[1.02] active:scale-95'
                      : 'border border-white/15 text-white/90 hover:bg-white/[0.05] hover:border-white/30'
                  }`}
                >
                  {tier.cta}
                </button>

                <ul className="mt-8 space-y-3">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-white/65 text-[13px]"
                    >
                      <span className={tier.featured ? 'text-[#aebcf2]' : 'text-white/55'}>
                        <Check />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
