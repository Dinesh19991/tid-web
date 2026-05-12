import { useEffect, useRef } from 'react';

/**
 * Cinematic cursor: a tight dot + a soft trailing ring, both mix-blend-mode:difference
 * so they read against any surface. Grows on interactive elements; idle-pulses softly.
 * Hidden on touch devices.
 */
export default function CursorBlob() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none)').matches) return;

    document.documentElement.classList.add('has-cursor-blob');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, [data-cursor], input, textarea, [role="button"]'
      );
      const hint = target.closest('[data-cursor-label]') as HTMLElement | null;

      if (interactive) {
        ringRef.current?.classList.add('hover');
        dotRef.current?.classList.add('hover');
      } else {
        ringRef.current?.classList.remove('hover');
        dotRef.current?.classList.remove('hover');
      }

      if (hint && labelRef.current) {
        const label = hint.getAttribute('data-cursor-label') || '';
        labelRef.current.textContent = label;
        labelRef.current.classList.add('on');
      } else {
        labelRef.current?.classList.remove('on');
      }
    };

    const onLeave = () => {
      ringRef.current?.classList.remove('hover');
      dotRef.current?.classList.remove('hover');
      labelRef.current?.classList.remove('on');
    };

    const loop = () => {
      // dot tracks tightly, ring with a soft lerp
      dotX += (mouseX - dotX) * 0.4;
      dotY += (mouseY - dotY) * 0.4;
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${ringX}px, ${ringY + 38}px, 0) translate(-50%, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseout', onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('has-cursor-blob');
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={labelRef} className="cursor-label" aria-hidden />
    </>
  );
}
