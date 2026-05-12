import logoMark from '../assets/assets/Logo_mark.png';
import { ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'CAPABILITIES', href: '#features' },
  { label: 'PRICING', href: '#pricing' },
  { label: 'JOIN', href: '#join' },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-8 lg:px-12 py-6 flex justify-between items-center">
      <a href="#" className="flex items-center gap-2 text-white">
        <img
          src={logoMark}
          alt="tid"
          className="h-7 w-7 object-contain"
          draggable={false}
        />
        <span className="text-[17px] font-semibold tracking-tight lowercase">
          tid
        </span>
      </a>

      <nav className="liquid-glass rounded-full px-2 py-2 hidden md:flex items-center gap-1">
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="text-[11px] font-medium tracking-[0.18em] text-white/85 hover:text-white px-4 py-1.5 rounded-full transition-colors duration-200"
          >
            {label}
          </a>
        ))}
      </nav>

      <a
        href="#join"
        data-cursor-label="start free"
        className="liquid-glass rounded-full pl-5 pr-4 py-2.5 text-[11px] font-medium tracking-[0.18em] text-white/90 hover:text-white flex items-center gap-1.5 group"
      >
        START FREE
        <ArrowUpRight
          size={13}
          strokeWidth={2}
          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
        />
      </a>
    </header>
  );
}
