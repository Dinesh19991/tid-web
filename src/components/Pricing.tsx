import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      className="shrink-0 mt-[3px]"
    >
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

function Spark() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="12"
      height="12"
      fill="currentColor"
      className="shrink-0"
    >
      <path d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2z" />
    </svg>
  );
}

type Feature = { label: string; highlight?: boolean };

type Tier = {
  name: 'Free' | 'Pro' | 'Max';
  badge?: string;
  persona: string;
  blurb: string;
  monthly: number;
  yearly: number;
  cta: string;
  featured: boolean;
  model: string;
  sections: { title: string; items: Feature[] }[];
};

const TIERS: Tier[] = [
  {
    name: 'Free',
    persona: 'For first-time note-takers',
    blurb:
      'Get a real taste of thinking on tid — capture by voice or text, and let AI do the filing.',
    monthly: 0,
    yearly: 0,
    cta: 'Start free',
    featured: false,
    model: 'Gemini Flash',
    sections: [
      {
        title: 'Capture',
        items: [
          { label: 'Up to 100 notes' },
          { label: '30 min of voice transcription / mo' },
          { label: '2 devices' },
        ],
      },
      {
        title: 'Intelligence',
        items: [
          { label: 'AI summaries & action items' },
          { label: 'Semantic search' },
          { label: 'Auto-tagging' },
        ],
      },
    ],
  },
  {
    name: 'Pro',
    badge: 'Most popular',
    persona: 'For people who take notes every day',
    blurb:
      'A real notebook brain — captures everything, files itself by meaning, and answers in plain words.',
    monthly: 12,
    yearly: 10,
    cta: 'Start 7-day free trial',
    featured: true,
    model: 'Gemini 2.5 Pro',
    sections: [
      {
        title: 'Capture',
        items: [
          { label: 'Unlimited notes', highlight: true },
          { label: '10 hrs of voice transcription / mo' },
          { label: 'Unlimited devices' },
          { label: 'Capture from web, email & share sheet' },
        ],
      },
      {
        title: 'Intelligence',
        items: [
          { label: 'Auto-organize & auto-link', highlight: true },
          { label: 'Personal knowledge graph' },
          { label: 'Daily & weekly digests' },
          { label: 'Chat with all your notes' },
        ],
      },
      {
        title: 'Ownership',
        items: [
          { label: 'Export to Markdown, PDF, JSON' },
          { label: 'End-to-end encrypted sync' },
        ],
      },
    ],
  },
  {
    name: 'Max',
    badge: 'Built for power',
    persona: 'For founders, researchers & small teams',
    blurb:
      'Deeper reasoning, AI agents that act on your notes, and one shared notebook for the whole team.',
    monthly: 24,
    yearly: 20,
    cta: 'Get Max',
    featured: false,
    model: 'Gemini 2.5 Pro · Deep Think',
    sections: [
      {
        title: 'Everything in Pro, plus',
        items: [
          { label: 'Unlimited voice transcription', highlight: true },
          { label: '1M-token long-context reasoning' },
          { label: 'AI agents — research, draft, plan', highlight: true },
          { label: 'Connect Notion, Linear, Slack, GDrive' },
        ],
      },
      {
        title: 'For teams',
        items: [
          { label: 'Shared workspaces (up to 5 seats)' },
          { label: 'Roles, permissions & audit log' },
          { label: 'SSO & admin controls' },
        ],
      },
      {
        title: 'Support',
        items: [
          { label: 'Priority AI processing' },
          { label: 'Priority human support' },
          { label: 'Early access to new features' },
        ],
      },
    ],
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
        {/* heading + billing toggle */}
        <div className="price-head mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-[10.5px] tracking-[0.32em] uppercase text-[#9db8f5]/80 font-medium">
              Pricing
            </span>
            <h2
              className="mt-3"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(28px, 3.8vw, 46px)',
                lineHeight: 1.08,
                letterSpacing: '-0.025em',
                margin: 0,
              }}
            >
              Built for every kind
              <br />
              of note-taker.
            </h2>
            <p className="mt-5 text-white/55 text-[14.5px] leading-relaxed max-w-md">
              Start free, grow into more capable AI as your thinking does. Cancel
              anytime — your notes are always yours.
            </p>
          </div>

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
                className={`relative rounded-full px-4 py-1.5 text-[12.5px] font-medium tracking-tight transition-colors ${
                  billing === p
                    ? 'bg-white text-[#0a0a0d]'
                    : 'text-white/55 hover:text-white/80'
                }`}
              >
                {p === 'monthly' ? 'Monthly' : 'Yearly'}
                {p === 'yearly' && (
                  <span
                    className={`ml-1.5 text-[9.5px] tracking-[0.16em] uppercase ${
                      billing === 'yearly' ? 'text-[#5670d8]' : 'text-[#9db8f5]/80'
                    }`}
                  >
                    Save 17%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* tier grid */}
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
                className={`price-card relative rounded-2xl p-7 flex flex-col border transition-colors overflow-hidden ${
                  tier.featured
                    ? 'bg-gradient-to-b from-[#1b2150] to-[#0e0f1a] border-[#5670d8]/40 shadow-[0_40px_90px_-40px_rgba(86,112,216,0.55)]'
                    : 'bg-[#101115] border-white/[0.07] hover:border-white/15'
                }`}
              >
                {/* subtle top edge highlight for featured */}
                {tier.featured && (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#9db8f5]/50 to-transparent"
                  />
                )}

                {/* header: name + badge */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-white text-[15px] font-medium tracking-tight">
                      {tier.name}
                    </h3>
                    <p className="mt-1 text-white/45 text-[12px] leading-relaxed">
                      {tier.persona}
                    </p>
                  </div>
                  {tier.badge && (
                    <span
                      className={`shrink-0 text-[9.5px] tracking-[0.18em] uppercase rounded-full px-2.5 py-1 font-medium border ${
                        tier.featured
                          ? 'text-[#aebcf2] bg-[#5670d8]/20 border-[#5670d8]/40'
                          : 'text-white/65 bg-white/[0.05] border-white/15'
                      }`}
                    >
                      {tier.badge}
                    </span>
                  )}
                </div>

                {/* price */}
                <div className="mt-6 flex items-baseline gap-1.5">
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

                {/* blurb */}
                <p className="mt-4 text-white/55 text-[13px] leading-relaxed min-h-[58px]">
                  {tier.blurb}
                </p>

                {/* CTA */}
                <button
                  type="button"
                  className={`mt-5 w-full rounded-full py-2.5 text-[13.5px] font-medium transition ${
                    tier.featured
                      ? 'bg-white text-[#0a0a0d] hover:scale-[1.02] active:scale-95'
                      : 'border border-white/15 text-white/90 hover:bg-white/[0.05] hover:border-white/30'
                  }`}
                >
                  {tier.cta}
                </button>

                {/* divider */}
                <div className="mt-7 mb-5 h-px bg-white/[0.07]" />

                {/* features grouped by section */}
                <div className="flex flex-col gap-5 flex-1">
                  {tier.sections.map((sec) => (
                    <div key={sec.title}>
                      <h4 className="text-[10.5px] tracking-[0.18em] uppercase text-white/35 font-medium mb-3">
                        {sec.title}
                      </h4>
                      <ul className="space-y-2.5">
                        {sec.items.map((f) => (
                          <li
                            key={f.label}
                            className={`flex items-start gap-2.5 text-[13px] leading-snug ${
                              f.highlight ? 'text-white' : 'text-white/65'
                            }`}
                          >
                            <span
                              className={
                                tier.featured
                                  ? 'text-[#aebcf2]'
                                  : f.highlight
                                  ? 'text-[#9db8f5]'
                                  : 'text-white/45'
                              }
                            >
                              <Check />
                            </span>
                            {f.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* powered by */}
                <div className="mt-7 pt-5 border-t border-white/[0.05]">
                  <div className="flex items-center gap-2 text-[11.5px] text-white/45">
                    <span
                      className={
                        tier.featured ? 'text-[#aebcf2]' : 'text-[#9db8f5]/80'
                      }
                    >
                      <Spark />
                    </span>
                    Powered by{' '}
                    <span className="text-white/70 font-medium">
                      {tier.model}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* footnote */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-white/45 text-[12.5px]">
          <p>
            All plans include end-to-end encryption, offline capture, and full
            data export.
          </p>
          <p>
            Need more seats or custom AI?{' '}
            <a
              href="mailto:hello@trytid.com"
              className="text-white/75 hover:text-white underline underline-offset-4 decoration-white/30"
            >
              Talk to us →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
