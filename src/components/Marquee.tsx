const WORDS = [
  'Capture',
  'Recall',
  'Reflect',
  'Compose',
  'Connect',
  'Refine',
  'Remember',
  'Focus',
];

function Row() {
  return (
    <div className="flex shrink-0 items-center gap-14 pr-14">
      {WORDS.map((w, i) => (
        <span key={i} className="flex items-center gap-14 leading-none">
          <span
            className="text-white/90"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(56px, 8vw, 128px)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            {w}
          </span>
          <span className="block w-2.5 h-2.5 rounded-full bg-indigo-400/80 shadow-[0_0_18px_rgba(99,102,241,0.7)]" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="relative bg-black py-16 md:py-24 border-b border-white/[0.06] overflow-hidden">
      {/* Edge fades into the dark background */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-black to-transparent" />

      <div className="flex w-max animate-marquee">
        <Row />
        <Row />
      </div>
    </section>
  );
}
