import { useState, useEffect } from 'react';
import { submitEmail } from '../lib/waitlist';
import FooterStickers from './FooterStickers';

function LiveTimeStatus() {
  const [timeStr, setTimeStr] = useState('');
  const [cityStr, setCityStr] = useState('PHILADELPHIA');

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      const city = tz.split('/')[1]?.replace(/_/g, ' ') || 'PHILADELPHIA';
      setCityStr(city);
    } catch {
      setCityStr('PHILADELPHIA');
    }

    const update = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    update();
    const interval = setInterval(update, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-white/50 text-[12px] font-inter font-normal tracking-tight">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      <span>{cityStr} {timeStr}</span>
    </div>
  );
}

export default function Footer({ transparent = false }: { transparent?: boolean }) {
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
    <footer
      className={`relative ${
        transparent ? 'bg-transparent' : 'bg-[#0a0a0d] border-t border-white/[0.07]'
      } overflow-hidden pt-16 md:pt-20 select-none flex flex-col justify-between font-inter`}
    >
      {/* Top Section: Header & Navigation */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full mb-10 md:mb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-8 items-start">
          {/* Left Column: Location, Headline, Newsletter */}
          <div className="lg:col-span-7">
            <LiveTimeStatus />

            <h2
              className="text-white mt-5"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(32px, 4.5vw, 56px)',
                lineHeight: 1.06,
                letterSpacing: '-0.03em',
                margin: '20px 0 0 0',
              }}
            >
              Ready to create something cool together,
              <br className="hidden sm:inline" /> or just press the star
            </h2>

            {subscribed ? (
              <p className="mt-6 text-white/70 text-[13px] font-inter font-normal">
                Thanks — you're subscribed. ✦
              </p>
            ) : (
              <form
                className="mt-6 flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] pl-4 pr-1.5 py-1.5 max-w-[19rem]"
                onSubmit={handleSubscribe}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 bg-transparent text-white placeholder-white/40 text-[13px] font-inter focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="bg-white text-[#0a0a0d] text-[12.5px] font-inter font-medium rounded-full px-4 py-2 hover:bg-white/90 transition shrink-0 disabled:opacity-60"
                >
                  {busy ? '…' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>

          {/* Right Columns: Structured Navigation */}
          <div className="lg:col-span-5 flex justify-start lg:justify-end gap-14 sm:gap-20">
            {/* (Explore) */}
            <div>
              <h4 className="text-white text-[12.5px] font-inter font-medium tracking-tight mb-4">
                Explore
              </h4>
              <ul className="space-y-3 font-inter text-[13px]">
                <li>
                  <a href="/#features" className="text-white/50 hover:text-white transition-colors">
                    Work
                  </a>
                </li>
                <li>
                  <a href="/#usecases" className="text-white/50 hover:text-white transition-colors">
                    Playground
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-white/50 hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="/#pricing" className="text-white/50 hover:text-white transition-colors">
                    Resume
                  </a>
                </li>
              </ul>
            </div>

            {/* (Contact) */}
            <div>
              <h4 className="text-white text-[12.5px] font-inter font-medium tracking-tight mb-4">
                Contact
              </h4>
              <ul className="space-y-3 font-inter text-[13px]">
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/50 hover:text-white transition-colors flex items-center gap-1"
                  >
                    LinkedIn ↗
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@tid.app"
                    className="text-white/50 hover:text-white transition-colors flex items-center gap-1"
                  >
                    Email ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/50 hover:text-white transition-colors flex items-center gap-1"
                  >
                    Twitter ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Physics Sticker Tags & Star */}
      <div className="w-full relative">
        <FooterStickers />
      </div>

      {/* Clean Inter bottom copyright line */}
      <div className="border-t border-white/[0.06] py-4 px-6 text-white/40 font-inter text-[12px] flex flex-col sm:flex-row justify-between items-center gap-2 max-w-7xl mx-auto w-full">
        <span>© 2026 tid. All rights reserved.</span>
        <span>The AI notebook that thinks with you</span>
      </div>
    </footer>
  );
}
