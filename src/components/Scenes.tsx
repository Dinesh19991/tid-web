import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

/* ───── Editorial-poster scenes (no app UI) ───── */

/** A common framing card so each scene reads as a magazine spread */
function Poster({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full h-full p-7 sm:p-9 flex flex-col">
      <div className="relative z-10 flex items-center gap-3 text-[10px] tracking-[0.32em] uppercase text-white/55 font-medium">
        <span className="block w-6 h-px bg-indigo-300/60" />
        {slug}
      </div>
      <div className="relative z-10 flex-1">{children}</div>
    </div>
  );
}

function SceneCapture() {
  return (
    <Poster slug="Plate I · Voice">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute size-72 sm:size-96 rounded-full bg-rose-500/15 blur-[80px]" />
      </div>
      <div className="relative h-full flex flex-col items-center justify-center text-center gap-8">
        <span
          className="text-white tabular-nums"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(96px, 16vw, 200px)',
            letterSpacing: '-0.04em',
            lineHeight: 0.85,
          }}
        >
          00:12
        </span>
        {/* Soft waveform sweep */}
        <svg
          viewBox="0 0 320 60"
          className="w-full max-w-[420px] h-16"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="wf-grad" x1="0" x2="1">
              <stop offset="0" stopColor="rgba(165,180,252,0)" />
              <stop offset="0.5" stopColor="rgba(165,180,252,0.9)" />
              <stop offset="1" stopColor="rgba(165,180,252,0)" />
            </linearGradient>
          </defs>
          <path
            d="M0 30 Q 20 12, 40 30 T 80 30 T 120 30 T 160 30 T 200 30 T 240 30 T 280 30 T 320 30"
            fill="none"
            stroke="url(#wf-grad)"
            strokeWidth="1.5"
          />
          <path
            d="M0 30 Q 20 5, 40 30 T 80 30 T 120 12, 160 30 T 200 48, 240 30 T 280 30 T 320 30"
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="1"
          />
        </svg>
        <p
          className="max-w-md text-white/65"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontSize: '18px',
            letterSpacing: '-0.01em',
            lineHeight: 1.45,
          }}
        >
          “remind me to follow up with sara on the q3 deck — monday
          morning…”
        </p>
      </div>
      <div className="relative z-10 flex items-center justify-between text-[9.5px] tracking-[0.28em] uppercase text-white/40 mt-auto">
        <span className="flex items-center gap-2">
          <span className="block w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
          recording
        </span>
        <span>field memo · 142</span>
      </div>
    </Poster>
  );
}

function SceneRefine() {
  // Constellation positions inside a 400×400 box (rendered via SVG)
  const nodes = [
    { x: 60, y: 80, label: 'sara', highlight: false },
    { x: 200, y: 60, label: 'monday call', highlight: false },
    { x: 320, y: 110, label: 'metrics', highlight: false },
    { x: 100, y: 200, label: 'Q3 deck', highlight: true },
    { x: 280, y: 220, label: 'slide 12', highlight: false },
    { x: 180, y: 320, label: 'follow up', highlight: false },
    { x: 60, y: 320, label: 'priority', highlight: false },
  ];
  const edges: [number, number][] = [
    [3, 0],
    [3, 1],
    [3, 4],
    [3, 5],
    [4, 2],
    [5, 6],
    [1, 4],
  ];
  return (
    <Poster slug="Plate II · Synapse">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute size-80 sm:size-[28rem] rounded-full bg-indigo-500/15 blur-[80px]" />
      </div>
      <div className="relative h-full flex flex-col items-center justify-center">
        <svg
          viewBox="0 0 400 400"
          className="w-full max-w-[420px] aspect-square"
        >
          <defs>
            <radialGradient id="node-glow" r="0.5">
              <stop offset="0" stopColor="rgba(165,180,252,1)" />
              <stop offset="1" stopColor="rgba(165,180,252,0)" />
            </radialGradient>
          </defs>
          {edges.map(([a, b], i) => (
            <line
              key={i}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke="rgba(165,180,252,0.35)"
              strokeWidth="0.7"
              strokeDasharray="2 4"
            />
          ))}
          {nodes.map((n, i) => (
            <g key={i}>
              {n.highlight && (
                <circle cx={n.x} cy={n.y} r="22" fill="url(#node-glow)" />
              )}
              <circle
                cx={n.x}
                cy={n.y}
                r={n.highlight ? 5 : 3}
                fill={
                  n.highlight ? 'rgba(199,210,254,1)' : 'rgba(255,255,255,0.55)'
                }
              />
              <text
                x={n.x}
                y={n.y - (n.highlight ? 14 : 10)}
                textAnchor="middle"
                fill={
                  n.highlight ? 'rgba(199,210,254,1)' : 'rgba(255,255,255,0.55)'
                }
                fontStyle="italic"
                fontFamily="'Instrument Serif', serif"
                fontSize={n.highlight ? 18 : 14}
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="relative z-10 flex items-center justify-between text-[9.5px] tracking-[0.28em] uppercase text-white/40 mt-auto">
        <span>seven nodes · one pattern</span>
        <span className="text-indigo-300">ai</span>
      </div>
    </Poster>
  );
}

function SceneOrganize() {
  // An editorial "table of contents" — chapter listing style
  const entries = [
    { num: 'I.', t: 'Morning pages', d: 'today' },
    { num: 'II.', t: 'Q3 strategy notes', d: 'mon' },
    { num: 'III.', t: 'Book ideas', d: 'fri', highlight: true },
    { num: 'IV.', t: 'Standup recap', d: 'wed' },
    { num: 'V.', t: 'Run plan', d: 'sat' },
    { num: 'VI.', t: 'Voice memo · 0:42', d: 'today' },
  ];
  return (
    <Poster slug="Plate III · The Library">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute size-72 sm:size-96 rounded-full bg-sky-500/12 blur-[80px]" />
      </div>
      <div className="relative h-full flex flex-col justify-center gap-3.5 px-2 sm:px-5">
        <div className="flex items-end justify-between mb-2 pb-3 border-b border-white/10">
          <span
            className="text-white"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: '26px',
              letterSpacing: '-0.02em',
            }}
          >
            Index of thought
          </span>
          <span className="text-[10px] tracking-[0.24em] uppercase text-white/40 font-medium">
            142 entries
          </span>
        </div>
        {entries.map((e, i) => (
          <div
            key={i}
            className={`flex items-baseline gap-4 ${
              e.highlight ? 'text-white' : 'text-white/60'
            }`}
          >
            <span
              className={`flex-shrink-0 tabular-nums ${
                e.highlight ? 'text-indigo-300' : 'text-white/40'
              }`}
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: 'italic',
                fontSize: '16px',
                letterSpacing: '-0.01em',
                width: '2.25rem',
              }}
            >
              {e.num}
            </span>
            <span
              className="flex-1 text-[15px] leading-snug truncate"
              style={{ letterSpacing: '-0.01em' }}
            >
              {e.t}
            </span>
            <span className="flex-1 mx-3 border-b border-dotted border-white/15 translate-y-[-3px]" />
            <span className="text-[10.5px] tracking-[0.22em] uppercase text-white/35 tabular-nums">
              {e.d}
            </span>
          </div>
        ))}
      </div>
      <div className="relative z-10 flex items-center justify-between text-[9.5px] tracking-[0.28em] uppercase text-white/40 mt-auto">
        <span>indexed by meaning</span>
        <span>ms · ms · ms</span>
      </div>
    </Poster>
  );
}

function SceneFocus() {
  return (
    <Poster slug="Plate IV · Do Not Disturb">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute size-80 sm:size-[28rem] rounded-full bg-indigo-500/22 blur-[90px]" />
      </div>
      <div className="relative h-full flex items-center justify-center">
        <div className="relative">
          {/* Outer dotted ring */}
          <div className="absolute -inset-12 rounded-full border border-dashed border-white/12 animate-spin-slow" />
          <div
            className="absolute -inset-6 rounded-full border border-indigo-400/25 animate-spin-slow"
            style={{ animationDuration: '22s', animationDirection: 'reverse' }}
          />
          {/* Disc */}
          <div className="relative grid place-items-center size-52 sm:size-64 rounded-full bg-gradient-to-br from-[#0d0d12] to-[#070708] border border-white/10 shadow-[inset_0_2px_0_rgba(255,255,255,0.08),0_0_60px_rgba(99,102,241,0.35)]">
            <div className="text-center">
              <div
                className="text-white"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(56px, 9vw, 96px)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}
              >
                25:00
              </div>
              <div className="mt-3 text-[10px] tracking-[0.32em] uppercase text-white/45 font-medium">
                a quiet hour
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 flex items-center justify-between text-[9.5px] tracking-[0.28em] uppercase text-white/40 mt-auto">
        <span>notifications · off</span>
        <span>flow · on</span>
      </div>
    </Poster>
  );
}

/* ───── Scenes section ───── */

const SCENES = [
  {
    num: '01',
    title: 'Speak it. Type it.',
    copy:
      'Voice notes, quick text, photo scans — tid grabs the spark before it fades. No friction. No folders.',
    Visual: SceneCapture,
  },
  {
    num: '02',
    title: 'tid does the thinking.',
    copy:
      'A private AI surfaces the pattern beneath your notes — extracting tasks, names, and the thread you didn\'t see yet.',
    Visual: SceneRefine,
  },
  {
    num: '03',
    title: 'A library, indexed.',
    copy:
      'Every note is catalogued by meaning. Ask in plain words and the right entry rises from the shelf.',
    Visual: SceneOrganize,
  },
  {
    num: '04',
    title: 'Focus, on purpose.',
    copy:
      'A built-in focus timer and distraction-free mode designed to keep you in flow. No streaks. No nudges.',
    Visual: SceneFocus,
  },
] as const;

export default function Scenes() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const total = SCENES.length;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stages = gsap.utils.toArray<HTMLElement>('.scene-stage');
      const copies = gsap.utils.toArray<HTMLElement>('.scene-copy');
      const fills = gsap.utils.toArray<HTMLElement>('.scene-fill');

      // Initial states
      stages.forEach((el, i) => {
        gsap.set(el, {
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 40,
          filter: i === 0 ? 'blur(0)' : 'blur(8px)',
          scale: i === 0 ? 1 : 0.94,
        });
      });
      copies.forEach((el, i) => {
        gsap.set(el, {
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 30,
          filter: i === 0 ? 'blur(0)' : 'blur(6px)',
        });
      });
      fills.forEach((el, i) => {
        gsap.set(el, { scaleX: i === 0 ? 1 : 0 });
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${total * 100}%`,
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const fraction = Math.min(total - 0.0001, self.progress * total);
          const active = Math.floor(fraction);

          stages.forEach((el, i) => {
            const d = fraction - i;
            const visible = Math.max(0, 1 - Math.min(1, Math.abs(d) * 1.8));
            const sign = d === 0 ? 0 : d > 0 ? -1 : 1;
            gsap.set(el, {
              opacity: visible,
              y: sign * (1 - visible) * 40,
              filter: `blur(${(1 - visible) * 8}px)`,
              scale: 0.94 + visible * 0.06,
              pointerEvents: visible > 0.6 ? 'auto' : 'none',
            });
          });
          copies.forEach((el, i) => {
            const d = fraction - i;
            const visible = Math.max(0, 1 - Math.min(1, Math.abs(d) * 2));
            const sign = d === 0 ? 0 : d > 0 ? -1 : 1;
            gsap.set(el, {
              opacity: visible,
              y: sign * (1 - visible) * 28,
              filter: `blur(${(1 - visible) * 6}px)`,
            });
          });
          fills.forEach((el, i) => {
            const fillT = Math.max(0, Math.min(1, fraction - i));
            gsap.set(el, { scaleX: fillT });
          });

          document.querySelectorAll<HTMLElement>('.scene-step').forEach((el) => {
            const idx = Number(el.getAttribute('data-i'));
            el.style.color =
              idx === active ? 'rgba(165,180,252,1)' : 'rgba(255,255,255,0.4)';
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [total]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      <div className="absolute top-1/4 -left-[10%] w-[600px] h-[600px] bg-indigo-700/15 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-[10%] w-[500px] h-[500px] bg-violet-700/12 blur-[180px] rounded-full pointer-events-none" />

      <div className="relative h-screen flex items-center px-6 sm:px-8 lg:px-12">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          {/* Left: copy column */}
          <div className="flex flex-col gap-10">
            <p className="text-[11px] font-medium tracking-[0.32em] uppercase">
              <span className="text-indigo-300">Chapter 04</span>
              <span className="mx-3 text-white/20">·</span>
              <span className="text-white/50">In motion</span>
            </p>

            <div className="relative min-h-[18rem] sm:min-h-[19rem]">
              {SCENES.map((s, i) => (
                <div
                  key={i}
                  className="scene-copy absolute inset-0 flex flex-col gap-5"
                >
                  <span className="text-[11px] tracking-[0.36em] uppercase font-medium text-indigo-300">
                    {s.num} <span className="text-white/30">/ 04</span>
                  </span>
                  <h3
                    className="text-white"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: 'clamp(34px, 4.6vw, 60px)',
                      lineHeight: 1.05,
                      letterSpacing: '-0.03em',
                      margin: 0,
                    }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-white/55 text-[15px] leading-relaxed max-w-md font-light">
                    {s.copy}
                  </p>
                </div>
              ))}
            </div>

            {/* Step rail */}
            <div className="flex items-center gap-3">
              {SCENES.map((_, i) => (
                <div
                  key={i}
                  className="relative h-[2px] flex-1 overflow-hidden bg-white/10 rounded-full"
                >
                  <span className="scene-fill absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-indigo-400 to-violet-400" />
                </div>
              ))}
              <div className="flex items-center gap-2 ml-2 text-[10px] tracking-[0.32em] uppercase font-medium">
                {SCENES.map((_, i) => (
                  <span key={i} className="scene-step tabular-nums" data-i={i}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                ))}
              </div>
            </div>

            {/* Editorial specs strip */}
            <div className="grid grid-cols-3 gap-px rounded-2xl overflow-hidden card-surface mt-2">
              {[
                { k: '180ms', l: 'avg ai response' },
                { k: 'e2e', l: 'encrypted at rest' },
                { k: '142', l: 'notes synced today' },
              ].map((s, i) => (
                <div key={i} className="bg-black/30 px-4 py-5 text-left">
                  <div
                    className="text-white"
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontStyle: 'italic',
                      fontSize: '26px',
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                    }}
                  >
                    {s.k}
                  </div>
                  <div className="mt-1.5 text-[9px] tracking-[0.22em] uppercase text-white/45">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: poster stage (editorial composition, not a phone) */}
          <div className="relative mx-auto w-full max-w-[460px]">
            <div className="relative aspect-[4/5] w-full">
              {/* Editorial frame */}
              <div className="absolute inset-0 rounded-3xl glass-dark overflow-hidden shadow-[0_60px_140px_-40px_rgba(99,102,241,0.4)]">
                {SCENES.map((s, i) => (
                  <div key={i} className="scene-stage absolute inset-0 z-10">
                    <s.Visual />
                  </div>
                ))}
                {/* Corner tick marks (printer's marks vibe) */}
                <span className="pointer-events-none absolute top-3 left-3 w-3 h-px bg-white/20" />
                <span className="pointer-events-none absolute top-3 left-3 w-px h-3 bg-white/20" />
                <span className="pointer-events-none absolute top-3 right-3 w-3 h-px bg-white/20" />
                <span className="pointer-events-none absolute top-3 right-3 w-px h-3 bg-white/20" />
                <span className="pointer-events-none absolute bottom-3 left-3 w-3 h-px bg-white/20" />
                <span className="pointer-events-none absolute bottom-3 left-3 w-px h-3 bg-white/20" />
                <span className="pointer-events-none absolute bottom-3 right-3 w-3 h-px bg-white/20" />
                <span className="pointer-events-none absolute bottom-3 right-3 w-px h-3 bg-white/20" />
              </div>

              {/* Floor reflection */}
              <div className="pointer-events-none absolute -bottom-12 left-1/2 -translate-x-1/2 w-2/3 h-24 rounded-full bg-indigo-500/15 blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
