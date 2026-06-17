import { useState } from 'react';
import tidLogo from '../assets/assets/tid_logo.png';
import { submitEmail } from '../lib/waitlist';

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/#features' },
      { label: 'Outcomes', href: '/#outcomes' },
      { label: 'Use cases', href: '/#usecases' },
      { label: 'How it works', href: '/#how' },
      { label: 'Pricing', href: '/#pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Trust Center', href: '/trust' },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || busy) return;
    setBusy(true);
    const ok = await submitEmail(email, 'footer');
    setBusy(false);
    if (ok) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-[#0a0a0d] border-t border-white/[0.07] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-12 gap-x-8">
          <div className="col-span-2 md:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={tidLogo}
                alt="tid"
                className="h-[18px] w-auto"
                draggable={false}
              />
            </div>
            <p className="text-white/50 text-[13px] leading-relaxed max-w-[15rem] mb-5">
              The AI notebook that jots, organizes, and finds every note for you.
            </p>
            {subscribed ? (
              <p className="text-white/70 text-[13px] max-w-[18rem]">
                Thanks — you're subscribed. ✦
              </p>
            ) : (
              <form
                className="flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] pl-4 pr-1.5 py-1.5 max-w-[18rem]"
                onSubmit={handleSubscribe}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 bg-transparent text-white placeholder-white/40 text-[13px] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="bg-white text-[#0a0a0d] text-[12.5px] font-medium rounded-full px-4 py-2 hover:bg-white/90 transition shrink-0 disabled:opacity-60"
                >
                  {busy ? '…' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>

          {COLUMNS.map((col, idx) => (
            <div key={col.title} className={idx === 0 ? 'md:col-start-8 md:col-span-2' : 'md:col-span-2'}>
              <h4 className="text-white text-[12.5px] font-medium mb-5 tracking-tight">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-white/50 hover:text-white text-[13px] transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* giant wordmark */}
      <div className="overflow-hidden flex justify-center select-none pointer-events-none px-6">
        <img
          src={tidLogo}
          alt=""
          aria-hidden
          draggable={false}
          className="block w-auto opacity-[0.055]"
          style={{ height: 'clamp(70px, 15vw, 200px)' }}
        />
      </div>

      <div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 flex flex-col sm:flex-row justify-between gap-2 text-white/40 text-[12px]">
          <span>© 2026 tid. All rights reserved.</span>
          <span>The AI notebook that thinks with you</span>
        </div>
      </div>
    </footer>
  );
}
