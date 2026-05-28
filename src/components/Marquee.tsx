const TOOLS = [
  'Substack',
  'Notion',
  'Linear',
  'Beehiiv',
  'Ramp',
  'Field Notes',
  'Obsidian',
  'Readwise',
];

function Row() {
  return (
    <div className="flex w-max items-center gap-14 animate-marquee">
      {[...TOOLS, ...TOOLS].map((t, i) => (
        <span
          key={`${t}-${i}`}
          className="shrink-0 text-white/35 text-[17px] tracking-tight font-medium whitespace-nowrap"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="relative bg-[#0a0a0d] py-16 md:py-20 overflow-hidden">
      <p className="text-center text-[10.5px] tracking-[0.32em] uppercase text-white/35 font-medium mb-9">
        Trusted by teams who think for a living
      </p>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-40 z-10 bg-gradient-to-r from-[#0a0a0d] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-40 z-10 bg-gradient-to-l from-[#0a0a0d] to-transparent" />
      <Row />
    </section>
  );
}
