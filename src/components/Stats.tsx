import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';

const STATS = [
  { value: 12, suffix: 'M+', label: 'Notes captured' },
  { value: 50, suffix: 'k+', label: 'Active thinkers' },
  { value: 99.9, suffix: '%', label: 'Uptime' },
  { value: 180, suffix: 'ms', label: 'Avg AI response' },
];

function useCountUp(target: number, durationMs: number, start: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const startTime = performance.now();
    const tick = (t: number) => {
      const elapsed = t - startTime;
      const p = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, start]);
  return value;
}

function StatBlock({
  value,
  suffix,
  label,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const animated = useCountUp(value, 1800, inView);
  const isFloat = !Number.isInteger(value);
  const display = isFloat
    ? animated.toFixed(1)
    : Math.floor(animated).toLocaleString();

  return (
    <div ref={ref} className="reveal-item border-l border-white/10 pl-6 pt-2 pb-3">
      <div className="text-indigo-300 text-[10px] font-medium tracking-[0.32em] mb-7 uppercase tabular-nums">
        Fig. {String(index + 1).padStart(2, '0')}
      </div>
      <div className="flex items-baseline gap-1">
        <span
          className="text-white tabular-nums"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(72px, 10vw, 156px)',
            letterSpacing: '-0.04em',
            lineHeight: 0.85,
          }}
        >
          {display}
        </span>
        <span
          className="text-indigo-300/85"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(22px, 2.4vw, 32px)',
            letterSpacing: '-0.02em',
          }}
        >
          {suffix}
        </span>
      </div>
      <div className="text-white/50 text-[11px] tracking-[0.22em] uppercase mt-6 font-medium leading-snug max-w-[18ch]">
        {label}
      </div>
    </div>
  );
}

export default function Stats() {
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
      gsap.from('.reveal-item', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-28 md:py-40 px-6 sm:px-8 lg:px-12 border-b border-white/[0.06] overflow-hidden"
    >
      {/* Ambient halos */}
      <div className="absolute -top-32 left-[8%] w-[460px] h-[460px] bg-indigo-700/15 blur-[170px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 right-[6%] w-[460px] h-[460px] bg-violet-700/12 blur-[170px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-10 reveal-head">
          <div className="max-w-2xl">
            <p className="text-[11px] font-medium tracking-[0.32em] mb-7 uppercase">
              <span className="text-indigo-300">Chapter 01</span>
              <span className="mx-3 text-white/20">·</span>
              <span className="text-white/50">By the numbers</span>
            </p>
            <h2
              className="text-white"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(40px, 5vw, 72px)',
                lineHeight: 1.02,
                letterSpacing: '-0.035em',
                margin: 0,
              }}
            >
              Built for the way people{' '}
              <span className="serif-i text-white/55">actually</span> think.
            </h2>
          </div>
          <p className="max-w-xs text-white/50 text-[13.5px] leading-relaxed md:text-right md:pb-2">
            A snapshot of the second brain
            <br />
            <span className="serif-i text-indigo-300">— in production.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
          {STATS.map((s, i) => (
            <StatBlock key={s.label} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
