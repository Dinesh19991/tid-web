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

function Dash() {
  return <span className="text-white/25">—</span>;
}

type Tier = {
  name: 'Basic' | 'Pro' | 'Max';
  price: number;
  blurb: string;
  features: string[];
  cta: string;
  featured: boolean;
};

const TIERS: Tier[] = [
  {
    name: 'Basic',
    price: 0,
    blurb: 'Try the magic — capture notes by voice or text.',
    features: [
      '50 notes',
      '10 voice notes / month',
      '5 Mr. Tid AI requests / day',
      'Reminders, todos & focus timer',
      '1 personal room',
      '2 devices',
    ],
    cta: 'Get started',
    featured: false,
  },
  {
    name: 'Pro',
    price: 9,
    blurb: 'For people who take notes all day, every day.',
    features: [
      'Unlimited notes',
      '300 voice notes / month',
      'Unlimited Mr. Tid AI editing',
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
    name: 'Max',
    price: 18,
    blurb: 'For power note-takers and growing teams.',
    features: [
      'Everything in Pro',
      'Unlimited voice notes',
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

// Detailed comparison matrix below the cards. Cells can be a string
// (printed as-is) or boolean (rendered as ✓ / —). Grouped into sections
// so the eye can scan one category at a time.
type Cell = string | boolean;
type Row = { label: string; hint?: string; cells: [Cell, Cell, Cell] };
type Group = { title: string; rows: Row[] };

const MATRIX: Group[] = [
  {
    title: 'Capture',
    rows: [
      { label: 'Notes stored', cells: ['50', 'Unlimited', 'Unlimited'] },
      {
        label: 'Voice notes',
        hint: 'Record a thought — Mr. Tid transcribes it into a clean note.',
        cells: ['10 / mo', '300 / mo', 'Unlimited'],
      },
      {
        label: 'PDF text extraction',
        hint: 'Upload a PDF and get a clean, searchable note back.',
        cells: [false, '20 / mo', 'Unlimited'],
      },
      { label: 'Devices', cells: ['2', 'Unlimited', 'Unlimited'] },
    ],
  },
  {
    title: 'Intelligence',
    rows: [
      {
        label: 'Mr. Tid AI editor',
        hint: 'Improve, fix, simplify, summarize, translate — any note.',
        cells: ['5 / day', 'Unlimited', 'Unlimited'],
      },
      {
        label: 'Auto-summaries & task extraction',
        hint: 'Every saved note gets a summary and a checklist.',
        cells: [false, true, true],
      },
      {
        label: 'Semantic search',
        hint: 'Find notes by meaning, not exact words.',
        cells: [true, true, true],
      },
      {
        label: 'Daily brief',
        hint: 'Morning summary of your todos, reminders, and priorities.',
        cells: [false, true, 'Health-aware'],
      },
      {
        label: 'Meeting briefs & action items',
        hint: 'Room notes turn into a brief with owner-assigned tasks.',
        cells: [false, false, true],
      },
      {
        label: 'Priority AI processing',
        hint: 'Faster response times on every Mr. Tid call.',
        cells: [false, false, true],
      },
    ],
  },
  {
    title: 'Sharing & teams',
    rows: [
      {
        label: 'Personal rooms',
        hint: 'A space to keep a project, a class, or a topic.',
        cells: ['1', '3', 'Unlimited'],
      },
      {
        label: 'Members per room',
        cells: ['Solo', 'Up to 5', 'Up to 25'],
      },
      { label: 'Role-based room permissions', cells: [false, false, true] },
    ],
  },
  {
    title: 'Privacy & ownership',
    rows: [
      { label: 'End-to-end encrypted', cells: [true, true, true] },
      { label: 'Offline capture', cells: [true, true, true] },
      {
        label: 'Export your data',
        cells: ['Markdown', 'Markdown + PDF', 'Markdown + PDF + JSON'],
      },
      { label: 'Never used to train AI', cells: [true, true, true] },
    ],
  },
  {
    title: 'Support',
    rows: [
      { label: 'Community help', cells: [true, true, true] },
      { label: 'Email support', cells: [false, true, true] },
      { label: 'Priority response (under 24h)', cells: [false, false, true] },
    ],
  },
];

const FAQ_QA = [
  {
    q: 'What counts as a Mr. Tid AI request?',
    a: 'Anything you ask Mr. Tid to do to your note — improve, fix, summarize, translate, continue, change tone. Voice transcription, photo capture, and auto-summaries on save have their own quotas and don\'t count against this.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel from the app in two taps. Pro and Max keep working through the end of your billing cycle, then drop to Basic. Your notes are always yours.',
  },
  {
    q: 'Do team members on Pro need their own subscription?',
    a: 'No. Pro rooms invite up to 5 people total — collaborators don\'t need to be paying users. Max rooms invite up to 25. If you need bigger teams or want everyone on Pro features, Enterprise is the right fit.',
  },
  {
    q: 'What happens if I hit a monthly limit?',
    a: 'You\'ll see a clear notice in the app. Voice and PDF caps reset on the 1st of each month. The Mr. Tid daily cap on Basic resets at midnight in your timezone.',
  },
  {
    q: 'Is there a free trial for Pro?',
    a: 'Yes — 7 days, no card required at signup. You\'ll get a reminder before it ends, and you\'ll drop to Basic if you don\'t upgrade.',
  },
];

function MatrixCell({ value }: { value: Cell }) {
  if (typeof value === 'boolean') {
    return value ? (
      <span className="inline-flex text-[#9db8f5]">
        <Check />
      </span>
    ) : (
      <Dash />
    );
  }
  return <span className="text-white/85 text-[13px]">{value}</span>;
}

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showCompare, setShowCompare] = useState(false);
  const [openFaq, setOpenFaq] = useState<number>(0);

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

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative bg-[#0a0a0d] py-24 md:py-32 px-6 sm:px-8 lg:px-12 border-t border-white/[0.06]"
    >
      <div className="relative max-w-6xl mx-auto">
        {/* heading */}
        <div className="price-head mb-14 max-w-xl">
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
            Start free.
            <br />
            Upgrade when it clicks.
          </h2>
          <p className="mt-5 text-white/55 text-[14px] leading-relaxed max-w-md">
            One quiet plan per type of thinker. Caps are written here, not
            hidden in fine print — so you always know what you&apos;re paying
            for.
          </p>
        </div>

        {/* tier grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {TIERS.map((tier) => {
            const cadence = tier.price === 0 ? 'forever' : 'per month';

            return (
              <div
                key={tier.name}
                className={`price-card relative rounded-2xl p-8 flex flex-col border transition-colors ${
                  tier.featured
                    ? 'bg-gradient-to-b from-[#1b2150] to-[#101119] border-[#5670d8]/40 shadow-[0_40px_90px_-40px_rgba(86,112,216,0.5)]'
                    : 'card-blur border-white/[0.07]'
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
                    ${tier.price}
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

        {/* enterprise row */}
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

        {/* compare-all toggle + full matrix */}
        <div className="mt-16">
          <div className="flex items-end justify-between gap-6 mb-6">
            <div>
              <h3 className="text-white text-[20px] font-medium tracking-tight">
                Compare plans in detail
              </h3>
              <p className="mt-1 text-white/50 text-[13px] leading-relaxed">
                Every limit, every feature — side by side.
              </p>
            </div>
            <button
              onClick={() => setShowCompare((v) => !v)}
              className="shrink-0 text-[12.5px] font-medium text-white/70 hover:text-white border-b border-white/20 hover:border-white/60 transition-colors pb-0.5"
            >
              {showCompare ? 'Hide details' : 'Show full comparison'}
            </button>
          </div>

          <div
            className="grid transition-[grid-template-rows,opacity] duration-500 ease-out"
            style={{
              gridTemplateRows: showCompare ? '1fr' : '0fr',
              opacity: showCompare ? 1 : 0,
            }}
            aria-hidden={!showCompare}
          >
            <div className="overflow-hidden">
              <div className="rounded-2xl border border-white/[0.07] bg-[#101115] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="min-w-[640px]">
                  {/* header row */}
                  <div className="grid grid-cols-[1.6fr_repeat(3,1fr)] border-b border-white/[0.07] bg-white/[0.02]">
                    <div className="px-5 py-3.5 text-[11px] tracking-[0.16em] uppercase text-white/40 font-medium">
                      Feature
                    </div>
                    {(['Basic', 'Pro', 'Max'] as const).map((n, i) => (
                      <div
                        key={n}
                        className={`px-3 py-3.5 text-center text-[13px] font-medium ${
                          i === 1 ? 'text-white bg-[#5670d8]/8' : 'text-white/75'
                        }`}
                      >
                        {n}
                        {i === 1 && (
                          <span className="ml-1.5 text-[9px] tracking-[0.16em] uppercase text-[#aebcf2]">
                            ★
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {MATRIX.map((group) => (
                    <div key={group.title}>
                      <div className="grid grid-cols-[1.6fr_repeat(3,1fr)] border-b border-white/[0.05] bg-white/[0.015]">
                        <div className="px-5 py-2.5 text-[10.5px] tracking-[0.2em] uppercase text-[#9db8f5]/80 font-medium">
                          {group.title}
                        </div>
                        <div />
                        <div />
                        <div />
                      </div>
                      {group.rows.map((row) => (
                        <div
                          key={row.label}
                          className="grid grid-cols-[1.6fr_repeat(3,1fr)] items-center border-b border-white/[0.04] last:border-b-0"
                        >
                          <div className="px-5 py-3.5">
                            <div className="text-white/85 text-[13px]">
                              {row.label}
                            </div>
                            {row.hint && (
                              <div className="mt-1 text-white/40 text-[11.5px] leading-snug max-w-[28ch]">
                                {row.hint}
                              </div>
                            )}
                          </div>
                          {row.cells.map((c, i) => (
                            <div
                              key={i}
                              className={`px-3 py-3.5 text-center ${
                                i === 1 ? 'bg-[#5670d8]/[0.05]' : ''
                              }`}
                            >
                              <MatrixCell value={c} />
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* mini FAQ — the questions every pricing page user actually has */}
        <div className="mt-16">
          <h3 className="text-white text-[20px] font-medium tracking-tight">
            Pricing questions, answered
          </h3>
          <p className="mt-1 text-white/50 text-[13px] leading-relaxed">
            The fine print, in plain words.
          </p>

          <div className="mt-6 rounded-2xl border border-white/[0.07] bg-[#101115] divide-y divide-white/[0.05]">
            {FAQ_QA.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={item.q}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between gap-5 text-left px-6 py-5 hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-white/90 text-[14px] font-medium tracking-tight">
                      {item.q}
                    </span>
                    <span
                      className={`shrink-0 text-white/45 transition-transform duration-300 ${
                        isOpen ? 'rotate-45' : 'rotate-0'
                      }`}
                      aria-hidden
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 -mt-1 text-white/60 text-[13.5px] leading-relaxed max-w-3xl">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* trust line */}
        <p className="mt-10 text-center text-white/40 text-[12.5px]">
          Every plan includes end-to-end encryption, offline capture, and full
          data export.
        </p>
      </div>
    </section>
  );
}
