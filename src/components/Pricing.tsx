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
  yearly: number; // effective per-month when billed yearly
  blurb: string;
  // Features in display order — anchor benefit first.
  // Each line is something the app actually does today.
  features: string[];
  cta: string;
  featured: boolean;
};

const TIERS: Tier[] = [
  {
    // Acquisition. Tight ceilings on everything that costs us Gemini $$:
    // voice minutes, photo extracts, AI edit requests. Cheap features
    // (notes, reminders, todos, basic search) run free to drive habit.
    name: 'Free',
    monthly: 0,
    yearly: 0,
    blurb: 'Try the magic — capture notes by voice, text, or photo.',
    features: [
      '50 notes',
      '10 min of voice transcription / month',
      '5 Mr. Tid AI requests / day',
      '5 photo-to-note extractions / month',
      'Reminders, todos & focus timer',
      '1 personal room',
      '2 devices',
    ],
    cta: 'Get started',
    featured: false,
  },
  {
    // Core monetization. Removes anxiety caps for daily users but keeps
    // the truly heavy stuff (PDF batches, unlimited voice, big rooms)
    // for Max. PDF extraction has a 300s function timeout — costliest
    // call — so a monthly cap protects margin here.
    name: 'Pro',
    monthly: 12,
    yearly: 9,
    blurb: 'For people who take notes all day, every day.',
    features: [
      'Unlimited notes',
      '5 hours of voice transcription / month',
      'Unlimited Mr. Tid AI editing',
      'Unlimited photo-to-note',
      '20 PDF text extractions / month',
      'Auto-summaries & task extraction',
      'Daily brief from your todos & reminders',
      '3 shared rooms (up to 5 members each)',
      'Unlimited devices',
    ],
    cta: 'Start 7-day free trial',
    featured: true,
  },
  {
    // High-ARPU. Captures cost-overrun power users (unlimited voice/PDF)
    // and small teams. Larger rooms = team revenue without changing the
    // app's per-user billing model. Priority queue is a real lever — we
    // can route Max users to a higher-quota Cloud Functions region.
    name: 'Max',
    monthly: 24,
    yearly: 18,
    blurb: 'For power note-takers and growing teams.',
    features: [
      'Everything in Pro',
      'Unlimited voice transcription',
      'Unlimited PDF text extractions',
      'Unlimited shared rooms (up to 25 members each)',
      'Auto-generated meeting briefs & action items',
      'Health-aware daily brief',
      'Priority AI processing',
      'Export to Markdown, PDF & JSON',
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
      gsap.from('.price-head, .price-card, .price-enterprise', {
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

  // Savings % anchored to Pro (the headline tier).
  const proSavings = Math.round((1 - TIERS[1].yearly / TIERS[1].monthly) * 100);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative bg-[#0a0a0d] py-24 md:py-32 px-6 sm:px-8 lg:px-12 border-t border-white/[0.06]"
    >
      <div className="relative max-w-6xl mx-auto">
        {/* heading + billing toggle */}
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
                {p === 'monthly' ? 'Monthly' : `Yearly · save ${proSavings}%`}
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

        {/* enterprise row — SSO + audit logs are the only features the app
            would need a real refactor to ship, which is exactly why they
            belong in an enterprise contract, not a self-serve tier. */}
        <div className="price-enterprise mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h3 className="text-white text-[16px] font-medium tracking-tight">
                Enterprise
              </h3>
              <span className="text-[9.5px] tracking-[0.18em] uppercase text-white/55 bg-white/[0.05] border border-white/15 rounded-full px-2.5 py-1 font-medium">
                Custom
              </span>
            </div>
            <p className="mt-2 text-white/55 text-[13px] leading-relaxed max-w-2xl">
              For teams who need SSO, audit logs, custom AI quotas, a signed
              DPA, or a dedicated success manager. We tailor a plan to how
              your team actually thinks.
            </p>
          </div>
          <a
            href="mailto:hello@trytid.com?subject=tid%20Enterprise"
            className="shrink-0 rounded-full px-5 py-2.5 text-[13.5px] font-medium border border-white/15 text-white/90 hover:bg-white/[0.05] hover:border-white/30 transition self-start sm:self-auto"
          >
            Talk to sales →
          </a>
        </div>

        {/* trust line — privacy positioning lives across every page, never
            paywalled. */}
        <p className="mt-8 text-center text-white/40 text-[12.5px]">
          Every plan includes end-to-end encryption, offline capture, and full
          data export.
        </p>
      </div>
    </section>
  );
}
