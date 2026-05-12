import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const videoWrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const wrap = videoWrapRef.current;
    if (!wrap) return;

    gsap.set(wrap, { scale: 1.08, transformOrigin: 'center center' });

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = 0;

    const onMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = ((e.clientX - cx) / cx) * 20;
      targetY = ((e.clientY - cy) / cy) * 20;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      gsap.set(wrap, { x: currentX, y: currentY, scale: 1.08 });
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleLoadedMetadata = () => {
    if (videoRef.current) videoRef.current.playbackRate = 1.25;
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div ref={videoWrapRef} className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4"
          autoPlay
          muted
          loop
          playsInline
          onLoadedMetadata={handleLoadedMetadata}
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className={`absolute left-0 right-0 z-20 text-center transition-all duration-1000 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
        style={{ top: '120px' }}
      >
        <div className="mb-7 inline-flex items-center gap-3 text-[10px] tracking-[0.42em] uppercase text-white/55 font-medium">
          <span className="block w-1.5 h-1.5 rounded-full bg-indigo-300 shadow-[0_0_14px_rgba(99,102,241,0.85)]" />
          Scene 00 — A second brain begins
        </div>
        <h1
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(40px, 5.4vw, 72px)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          <span className="block text-white">
            Notes that <span className="serif-i">think</span> with you.
          </span>
          <span className="block" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Capture, organize, recall — instantly.
          </span>
        </h1>
      </div>

      <div
        className={`absolute bottom-14 left-0 right-0 z-20 flex flex-col items-center gap-6 transition-all duration-1000 delay-300 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <p className="max-w-[620px] text-[15px] leading-relaxed text-center px-6">
          <span className="text-white">
            Speak, type, or sketch — tid's AI weaves your scattered thoughts
            into clear, searchable notes.
          </span>
          <span className="text-white/55">
            {' '}
            Your second brain, always a tap away.
          </span>
        </p>

        <button
          type="button"
          data-cursor-label="begin"
          className="bg-white text-black text-[15px] font-medium rounded-full px-8 py-3.5 transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_32px_4px_rgba(255,255,255,0.2)] active:scale-[0.97]"
        >
          Start taking notes
        </button>
      </div>
    </section>
  );
}
