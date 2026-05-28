import { useEffect, useState } from 'react';

const HERO_POSTER = '/videos/hero-poster.jpg';
const HERO_WEBM = '/videos/hero.webm';
const HERO_MP4 = '/videos/hero.mp4';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(id);
  }, []);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden mountain-bg">
      {/* optional real footage layered over the gradient */}
      <video
        poster={HERO_POSTER}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      >
        <source src={HERO_WEBM} type="video/webm" />
        <source src={HERO_MP4} type="video/mp4" />
      </video>

      {/* legibility + ridge fade */}
      <div className="absolute inset-0 mountain-ridge" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1335]/30 via-transparent to-[#0a0a0d]" />

      <div
        className={`relative z-10 flex flex-col items-center text-center px-6 transition-all duration-1000 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
        style={{ paddingTop: 'clamp(160px, 24vh, 260px)' }}
      >
        <h1
          className="text-white"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(38px, 5.6vw, 76px)',
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          Capture, organize & recall
          <br />
          your thinking, 24/7
        </h1>

        <p className="mt-6 max-w-xl text-white/70 text-[15px] leading-relaxed">
          tid is your AI second brain — it listens, structures, and surfaces
          every thought the moment you need it, so nothing ever slips away.
        </p>

      </div>
    </section>
  );
}
