import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import tidLogo from '../assets/assets/tid_logo.png';

export default function Loader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    document.body.style.overflow = 'hidden';

    const finish = () => {
      document.body.style.overflow = '';
      setDone(true);
    };

    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const tl = gsap.timeline({ onComplete: finish });

      tl.from('.loader-mark', {
        opacity: 0,
        y: 26,
        scale: 0.92,
        duration: 0.7,
        ease: 'power3.out',
      })
        .from(
          '.loader-count',
          { opacity: 0, y: 24, duration: 0.6, ease: 'power3.out' },
          '-=0.4',
        )
        .to(
          '.loader-bar-fill',
          { scaleX: 1, duration: 1.6, ease: 'power2.inOut' },
          '-=0.2',
        )
        .to(
          counter,
          {
            v: 100,
            duration: 1.6,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (countRef.current)
                countRef.current.textContent = String(Math.round(counter.v));
            },
          },
          '<',
        )
        .to(
          '.loader-fade',
          { opacity: 0, duration: 0.4, ease: 'power2.in' },
          '+=0.2',
        )
        .to(
          '.loader-panel',
          {
            scaleY: 0,
            duration: 0.9,
            ease: 'power4.inOut',
            stagger: 0.08,
            transformOrigin: 'top center',
          },
          '-=0.05',
        );
    }, rootRef);

    // safety: never let the loader block the page
    const fallback = window.setTimeout(finish, 6000);

    return () => {
      ctx.revert();
      clearTimeout(fallback);
      document.body.style.overflow = '';
    };
  }, []);

  if (done) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[200] pointer-events-none">
      {/* curtain panels that retract upward on reveal */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="loader-panel flex-1 bg-[#0a0a0d]"
            style={{ transform: 'scaleY(1)' }}
          />
        ))}
      </div>

      {/* grid blocks background */}
      <div className="loader-fade cs-grid absolute inset-0" />

      {/* centered brand */}
      <div className="loader-fade absolute inset-0 flex flex-col items-center justify-center">
        <div className="loader-mark flex items-center gap-3">
          <img
            src={tidLogo}
            alt="tid"
            className="h-8 w-auto"
            draggable={false}
          />
        </div>
      </div>

      {/* big percentage — bottom right */}
      <div className="loader-fade loader-count absolute bottom-7 right-7 sm:bottom-9 sm:right-10 flex items-end leading-none">
        <span
          ref={countRef}
          className="text-white font-light tracking-tight tabular-nums"
          style={{ fontSize: 'clamp(56px, 9vw, 124px)' }}
        >
          0
        </span>
        <span
          className="text-white/40 font-light mb-1 sm:mb-2.5"
          style={{ fontSize: 'clamp(20px, 3vw, 40px)' }}
        >
          %
        </span>
      </div>

      {/* full-width progress line at the very bottom */}
      <div className="loader-fade absolute bottom-0 left-0 right-0 h-[2px] bg-white/12">
        <div
          className="loader-bar-fill h-full w-full bg-white origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </div>
  );
}
