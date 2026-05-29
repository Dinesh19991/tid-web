import { useEffect, useRef, useState, type CSSProperties } from 'react';
import tidLogo from '../assets/assets/tid_logo.png';
import { submitEmail } from '../lib/waitlist';

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const [busy, setBusy] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || busy) return;
    setBusy(true);
    const ok = await submitEmail(email, 'coming-soon');
    setBusy(false);
    if (ok) setJoined(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // gentle cursor-reactive light
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--cx', `${e.clientX - r.left}px`);
      el.style.setProperty('--cy', `${e.clientY - r.top}px`);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#070708] text-white"
      style={{ '--cx': '75%', '--cy': '30%' } as CSSProperties}
    >
      {/* grid */}
      <div className="cs-grid absolute inset-0" />

      {/* huge ghosted word, clipped at the edges */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none pointer-events-none">
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(150px, 32vw, 560px)',
            letterSpacing: '-0.06em',
            lineHeight: 0.8,
            color: 'rgba(255,255,255,0.045)',
            whiteSpace: 'nowrap',
          }}
        >
          notes
        </span>
      </div>

      {/* cursor-reactive soft light */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle 360px at var(--cx) var(--cy), rgba(255,255,255,0.06), transparent 60%)',
        }}
      />

      {/* vignette for depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]" />

      {/* corner texts */}
      <p className="absolute bottom-[12%] left-[5%] max-w-[210px] text-[11.5px] leading-relaxed text-white/40 hidden sm:block">
        Every fleeting idea, voice memo, and to-do — captured the moment it
        strikes, and organized without lifting a finger.
      </p>
      <p className="absolute top-[40%] right-[5%] max-w-[200px] text-right text-[11.5px] leading-relaxed text-white/45 hidden sm:block">
        Ask in plain words, and tid finds the exact note — even when you've
        forgotten the title.
      </p>

      {/* foreground content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <img
          src={tidLogo}
          alt="tid"
          className="h-6 w-auto opacity-90 mb-9"
          draggable={false}
        />

        <p className="text-[11px] tracking-[0.42em] uppercase text-white/45 mb-6">
          Coming soon
        </p>

        <h1
          className="text-white"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(34px, 5.2vw, 66px)',
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          Notes that think
          <br />
          with you.
        </h1>

        <p className="mt-6 max-w-md text-white/55 text-[14.5px] leading-relaxed">
          tid is your AI note-taker — jot anything by voice or text, and it
          organizes, summarizes, and resurfaces it the moment you need it.
          Launching soon.
        </p>

        {/* waitlist */}
        <div className="mt-11 w-full max-w-md">
          {joined ? (
            <p className="py-2 text-[14px] text-white/80">
              You're on the list — we'll be in touch. ✦
            </p>
          ) : (
            <>
              <form
                className="flex items-center gap-2 rounded-full border border-white/12 bg-black/30 pl-4 pr-1.5 py-1.5"
                onSubmit={handleJoin}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 bg-transparent text-white placeholder-white/40 text-[14px] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="bg-white text-[#070708] text-[13px] font-medium rounded-full px-5 py-2.5 transition hover:scale-[1.03] active:scale-95 flex-shrink-0 disabled:opacity-60"
                >
                  {busy ? 'Joining…' : 'Join waitlist'}
                </button>
              </form>
              <p className="mt-3 text-[11.5px] text-white/35">
                Be the first to take smarter notes. No spam, ever.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
