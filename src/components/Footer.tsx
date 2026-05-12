import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import logoMark from '../assets/assets/Logo_mark.png';

const COLUMNS = [
  {
    title: 'SITEMAP',
    links: [
      { label: 'Home', href: '#', active: true },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Log in', href: '#' },
      { label: 'Sign up', href: '#join' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { label: 'Licensing', href: '#' },
      { label: 'Terms & Conditions', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  },
  {
    title: 'CONTACT',
    links: [
      { label: 'FAQ', href: '#' },
      { label: 'Support', href: '#' },
    ],
  },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.foot-headline', {
        opacity: 0,
        y: 30,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      });
      gsap.from('.foot-meta, .foot-btn', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      });
      gsap.from('.foot-wordmark', {
        opacity: 0,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 60%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={ref} className="relative bg-black overflow-hidden">
      <div
        id="join"
        className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-20 text-center"
      >
        <h2
          className="foot-headline text-white"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(36px, 5.4vw, 66px)',
            lineHeight: 1.06,
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          Let's make this official, sign up{' '}
          <br className="hidden md:block" />
          and{' '}
          <span className="serif-i text-white/75">start</span> your second
          brain.
        </h2>

        <div className="foot-meta mt-10 flex items-center justify-center gap-3">
          <div className="flex -space-x-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-violet-600 border-2 border-black" />
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-600 border-2 border-black" />
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 border-2 border-black" />
          </div>
          <span className="text-white/55 text-[13px]">
            12k+ thinkers already joined
          </span>
        </div>

        <button
          type="button"
          className="foot-btn mt-9 bg-[#ece8db] hover:bg-white text-black px-7 py-3 rounded-lg font-medium text-[14px] tracking-tight transition-colors duration-200"
        >
          Become a member
        </button>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16 border-t border-white/[0.06]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-white/45 text-[10px] tracking-[0.22em] uppercase mb-6 font-medium">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={`text-[14px] transition-colors ${
                        link.active
                          ? 'text-white underline underline-offset-4 decoration-white/35'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white/45 text-[10px] tracking-[0.22em] uppercase mb-6 font-medium">
              NEWSLETTER
            </h4>
            <p className="text-white/85 text-[14px] mb-6 leading-relaxed">
              You read this far, might as well sign up.
            </p>
            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="First name"
                className="bg-transparent border-b border-white/15 pb-2 text-white text-[14px] placeholder-white/40 focus:outline-none focus:border-white/45 transition-colors"
              />
              <div className="flex items-end gap-3">
                <input
                  type="email"
                  placeholder="you@tid.app"
                  className="flex-1 min-w-0 bg-transparent border-b border-white/15 pb-2 text-white text-[14px] placeholder-white/40 focus:outline-none focus:border-white/45 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 text-white text-[12px] font-medium px-4 py-1.5 rounded-md transition-colors flex-shrink-0"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="foot-wordmark relative h-[180px] md:h-[240px] overflow-hidden">
        <div
          aria-hidden
          className="absolute -bottom-10 md:-bottom-20 left-0 right-0 flex items-end justify-between leading-none pointer-events-none select-none px-6 sm:px-8 lg:px-12"
        >
          <span
            className="text-white/[0.05] flex-1"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(160px, 28vw, 380px)',
              fontWeight: 600,
              letterSpacing: '-0.06em',
              lineHeight: 0.85,
            }}
          >
            tid
          </span>
          <img
            src={logoMark}
            alt=""
            className="opacity-[0.05] flex-shrink-0"
            style={{
              width: 'clamp(120px, 24vw, 280px)',
              transform: 'translate(20%, 10%)',
            }}
          />
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-6 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-3 text-white/40 text-[10px] tracking-[0.22em] uppercase font-medium">
        <span>© 2026 TID · ALL RIGHTS RESERVED</span>
        <span className="hidden md:block">
          LINKEDIN · INSTAGRAM · X / TWITTER
        </span>
        <span>NOTES THAT THINK WITH YOU</span>
      </div>
    </footer>
  );
}
