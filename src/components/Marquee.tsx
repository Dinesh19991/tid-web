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

// One row of the loop. Trailing pr-14 carries the same spacing
// past the last item, so when this row sits next to a duplicate
// of itself the seam is invisible.
function Row({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-14 pr-14 list-none m-0 p-0"
    >
      {TOOLS.map((t) => (
        <li
          key={t}
          className="shrink-0 text-white/35 hover:text-white text-[17px] tracking-tight font-medium whitespace-nowrap transition-colors duration-300 cursor-default"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <section className="relative bg-[#0a0a0d] py-16 md:py-20 overflow-hidden">
      <p className="text-center text-[10.5px] tracking-[0.32em] uppercase text-white/35 font-medium mb-9">
        Loved by people who take a lot of notes
      </p>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-40 z-10 bg-gradient-to-r from-[#0a0a0d] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-40 z-10 bg-gradient-to-l from-[#0a0a0d] to-transparent" />

      {/* Four identical rows, side by side. The animation translates the
          flex container by -50% of its width — which equals exactly 2 full
          Rows. Because every row is pixel-identical, the visible content
          at the end matches the start, so the loop is seamless.

          Rendering 4 copies (not 2) guarantees the container stays wider
          than the viewport even on ultrawide screens — no empty space can
          appear at the trailing edge during the animation. */}
      <div className="flex w-max animate-marquee">
        <Row />
        <Row ariaHidden />
        <Row ariaHidden />
        <Row ariaHidden />
      </div>
    </section>
  );
}
