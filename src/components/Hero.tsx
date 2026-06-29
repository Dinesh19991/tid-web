import { useEffect, useRef, useState, type CSSProperties } from 'react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(id);
  }, []);

  // cursor-reactive glow + dot reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden hero-aurora"
      style={{ '--mx': '50%', '--my': '38%' } as CSSProperties}
    >
      {/* drifting blue light blobs */}
      <div
        className="hero-blob animate-blob-a"
        style={{
          width: 620,
          height: 620,
          top: '-12%',
          left: '2%',
          background:
            'radial-gradient(circle, rgba(59,130,246,0.55), rgba(59,130,246,0) 70%)',
        }}
      />
      <div
        className="hero-blob animate-blob-b"
        style={{
          width: 540,
          height: 540,
          top: '14%',
          right: '-4%',
          background:
            'radial-gradient(circle, rgba(99,102,241,0.5), rgba(99,102,241,0) 70%)',
        }}
      />
      <div
        className="hero-blob animate-blob-c"
        style={{
          width: 560,
          height: 560,
          bottom: '-16%',
          left: '32%',
          background:
            'radial-gradient(circle, rgba(45,212,238,0.32), rgba(45,212,238,0) 70%)',
        }}
      />

      {/* dot grid — dim everywhere */}
      <div className="hero-dots absolute inset-0" />
      {/* brighter blue dots revealed in a softly breathing circle */}
      <div className="hero-dots-cursor absolute inset-0" />
      {/* continuous ripple rings emanating from the cursor */}
      <div className="hero-dots-wave absolute inset-0" />
      <div className="hero-dots-wave-2 absolute inset-0" />
      {/* soft blue glow that follows the cursor */}
      <div className="hero-cursor-glow absolute inset-0" />

      {/* fade into the dark page */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#0a0a0d]" />

      <div
        className={`relative z-10 flex flex-col items-center text-center px-6 transition-all duration-1000 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <h1
          className="text-white"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(44px, 7vw, 100px)',
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          Every idea, captured.
          <br />
          Every note, found.
        </h1>

        <p className="mt-8 max-w-2xl text-white/70 text-[18px] md:text-[22px] leading-relaxed">
          tid is the AI note-taker that turns scattered thoughts voice memos,
          quick jots, links into clean, organized notes you can recall in
          plain words. No folders, no friction.
        </p>
      </div>
    </section>
  );
}
