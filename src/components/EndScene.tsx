import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import StoreBadges from './StoreBadges';

export default function EndScene() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-inner > *', {
        opacity: 0,
        y: 26,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="get-tid"
      ref={sectionRef}
      className="relative mountain-bg py-28 md:py-40 px-6 sm:px-8 lg:px-12 overflow-hidden"
    >
      <div className="absolute inset-0 mountain-ridge" />

      <div className="cta-inner relative z-10 max-w-2xl mx-auto text-center">
        <h2
          className="text-white"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(34px, 5vw, 64px)',
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          Ready to think clearer?
        </h2>
        <p className="mt-5 text-white/65 text-[15px] leading-relaxed max-w-md mx-auto">
          Join thousands of thinkers capturing, organizing, and recalling
          everything with tid.
        </p>
        <div className="mt-9 flex justify-center">
          <StoreBadges center />
        </div>
      </div>
    </section>
  );
}
