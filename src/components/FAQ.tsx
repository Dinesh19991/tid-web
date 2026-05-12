import { useEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { gsap } from '../lib/gsap';

const ITEMS = [
  {
    q: 'Is everything I capture really private?',
    a: 'Yes. Notes are encrypted in transit and at rest, and only you hold the key. tid is never trained on your data, and we don\'t sell anything to anyone — least of all you.',
  },
  {
    q: 'How does the AI actually work?',
    a: 'A private model summarizes notes, extracts tasks, and suggests reminders. It runs against your content on demand, on a per-note basis — never as an ambient feed.',
  },
  {
    q: 'Can I export my notes?',
    a: 'Anytime. Export as plain Markdown, JSON, or PDF. Your data is yours. We make leaving easy because we want you to stay because you choose to.',
  },
  {
    q: 'Which platforms does tid support?',
    a: 'iOS and Android today; web and desktop in beta. One account, every device, two-way encrypted sync.',
  },
  {
    q: 'What\'s the difference between Free and Pro?',
    a: 'Free covers everything you need to start: up to 100 notes, daily voice capture, manual organization, two devices. Pro lifts every limit and unlocks AI summaries, semantic search, and unlimited sync.',
  },
  {
    q: 'Will tid spam me with notifications?',
    a: 'Never. tid has no streaks, no nudges, no growth-hack notifications. The only push you\'ll ever get is one you explicitly schedule yourself.',
  },
] as const;

function FAQItem({
  index,
  q,
  a,
  open,
  onToggle,
}: {
  index: number;
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`faq-row glass-dark rounded-2xl transition-all duration-500 ${
        open ? 'shadow-[0_32px_80px_-30px_rgba(99,102,241,0.45)]' : ''
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="relative z-10 group w-full flex items-start gap-5 sm:gap-6 px-6 sm:px-8 py-6 sm:py-7 text-left rounded-2xl"
        aria-expanded={open}
      >
        <span className="text-indigo-300/90 text-[11px] tracking-[0.22em] font-medium pt-2.5 tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="flex-1 text-white text-[18px] sm:text-[20px] font-medium tracking-tight leading-snug pt-1">
          {q}
        </span>
        <span
          className={`mt-1 grid place-items-center w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md text-indigo-300 transition-transform duration-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] ${
            open ? 'rotate-45' : 'rotate-0'
          }`}
        >
          <Plus size={16} strokeWidth={1.8} />
        </span>
      </button>
      <div
        ref={bodyRef}
        className="relative z-10 grid transition-[grid-template-rows] duration-500 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="pl-[3.25rem] sm:pl-[4.25rem] pr-6 sm:pr-14 pb-7 sm:pb-8 text-white/65 text-[15px] leading-relaxed max-w-3xl">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
      gsap.from('.faq-row', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.07,
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-28 md:py-40 px-6 sm:px-8 lg:px-12 border-b border-white/[0.06] overflow-hidden"
    >
      <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[480px] h-[480px] bg-indigo-700/15 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute -top-24 left-[-8%] w-[420px] h-[420px] bg-violet-700/12 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        <div className="mb-20 max-w-3xl reveal-head">
          <p className="text-[11px] font-medium tracking-[0.32em] mb-7 uppercase">
            <span className="text-indigo-300">Chapter 08</span>
            <span className="mx-3 text-white/20">·</span>
            <span className="text-white/50">Questions answered</span>
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
            Everything you wanted{' '}
            <span className="serif-i text-white/55">to ask.</span>
          </h2>
        </div>

        <div className="relative flex flex-col gap-3">
          {ITEMS.map((item, i) => (
            <FAQItem
              key={item.q}
              index={i}
              q={item.q}
              a={item.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        <p className="mt-14 text-white/45 text-[13px] tracking-wide">
          Still curious? Write to{' '}
          <a
            href="mailto:hello@tid.app"
            className="text-indigo-300 hover:text-indigo-200 underline underline-offset-4 decoration-indigo-400/40"
          >
            hello@tid.app
          </a>
          .
        </p>
      </div>
    </section>
  );
}
