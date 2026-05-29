import { useEffect, useState } from 'react';
import tidLogo from '../assets/assets/tid_logo.png';

const NAV = [
  { label: 'How it works', href: '/#how' },
  { label: 'Outcomes', href: '/#outcomes' },
  { label: 'Use cases', href: '/#usecases' },
  { label: 'Pricing', href: '/#pricing' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkColor = 'text-white/65 hover:text-white';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0d]/80 backdrop-blur-md border-b border-white/[0.07]'
          : 'border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
        <div className="flex-1 flex justify-start">
          <a href="/" className="flex items-center">
            <img
              src={tidLogo}
              alt="tid"
              className="h-[18px] w-auto"
              draggable={false}
            />
          </a>
        </div>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className={`text-[13px] whitespace-nowrap transition-colors ${linkColor}`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex-1 flex items-center justify-end">
          <a
            href="/#get-tid"
            className="text-[13px] font-medium rounded-full px-4 py-2 transition bg-white text-[#0a0a0d] hover:bg-white/90"
          >
            Download now
          </a>
        </div>
      </div>
    </header>
  );
}
