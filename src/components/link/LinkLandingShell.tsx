import { useEffect, useMemo, useState, type ReactNode } from 'react';
import tidLogo from '../../assets/assets/tid_logo.png';

const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.tid.app';

/** UA detection — used to decide whether to auto-attempt an app launch. */
export function isAndroid(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /android/i.test(navigator.userAgent);
}
export function isIOS(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}
export function isMobile(): boolean {
  return isAndroid() || isIOS();
}

/**
 * Build an Android Intent URI that opens the tid app to a specific https
 * path, with a browser fallback to the same URL if the app isn't installed.
 * See https://developer.chrome.com/docs/multidevice/android/intents/.
 */
export function buildIntentUri(pathAndQuery: string): string {
  const cleanPath = pathAndQuery.startsWith('/') ? pathAndQuery : `/${pathAndQuery}`;
  // Use & when the path already carries a query string (?t=…), otherwise ?
  const sep = cleanPath.includes('?') ? '&' : '?';
  const fallback = `https://trytid.com${cleanPath}${sep}open=denied`;
  return (
    `intent://trytid.com${cleanPath}` +
    `#Intent;scheme=https;package=com.tid.app;` +
    `S.browser_fallback_url=${encodeURIComponent(fallback)};end`
  );
}

type Props = {
  /** Small uppercase tag matching the OG image style — e.g. "Shared room". */
  eyebrow: string;
  /** Big display headline. */
  title: string;
  /** One-line supporting sentence. */
  subtitle: string;
  /** Path the tid app should open — `/r/{id}`, `/n/{id}`, `/r/{id}/join?t=…`. */
  appPath: string;
  /** Text for the primary CTA. */
  primaryCta?: string;
  /** Extra content slot (member preview, note snippet, etc.). */
  children?: ReactNode;
  /**
   * If true, auto-launch the app immediately on Android mount. The
   * fallback state ("didn't open? tap the button") appears after
   * ~1.6s if the app didn't intercept the navigation.
   */
  autoLaunchOnMobile?: boolean;
};

export default function LinkLandingShell({
  eyebrow,
  title,
  subtitle,
  appPath,
  primaryCta = 'Open in tid',
  children,
  autoLaunchOnMobile = true,
}: Props) {
  const intentUri = useMemo(() => buildIntentUri(appPath), [appPath]);
  const [autoLaunched, setAutoLaunched] = useState(false);
  const [suggestInstall, setSuggestInstall] = useState(false);

  // On Android, try to launch the app immediately. If it doesn't
  // intercept the navigation, we'll still be here after ~1.6s — that's
  // the cue to surface "get the app" more prominently.
  useEffect(() => {
    if (!autoLaunchOnMobile) return;
    if (!isAndroid()) return;
    // Skip if the URL explicitly told us the previous attempt failed.
    if (new URLSearchParams(window.location.search).get('open') === 'denied') {
      setSuggestInstall(true);
      return;
    }
    setAutoLaunched(true);
    // Use replace so the intent URI doesn't pollute back-nav history.
    window.location.replace(intentUri);
    const t = window.setTimeout(() => setSuggestInstall(true), 1600);
    return () => window.clearTimeout(t);
  }, [autoLaunchOnMobile, intentUri]);

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden text-white"
      style={{
        fontFamily: "'Inter', sans-serif",
        background:
          'radial-gradient(55% 55% at 78% 12%, rgba(110,135,240,0.28), transparent 65%),' +
          'radial-gradient(65% 60% at 18% 22%, rgba(80,105,215,0.22), transparent 70%),' +
          'radial-gradient(130% 80% at 50% 112%, rgba(4,6,18,0.72), transparent 65%),' +
          'linear-gradient(160deg, #14183c 0%, #0b0f28 55%, #050716 100%)',
      }}
    >
      {/* subtle noise/depth overlay to match the OG image feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 100%, rgba(157,184,245,0.06), transparent 60%)',
        }}
      />

      {/* Header: just the tid mark, no full nav — this is a landing surface. */}
      <header className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 pt-8">
        <a href="/" className="inline-flex items-center gap-2 group">
          <img
            src={tidLogo}
            alt="tid"
            className="h-[18px] w-auto"
            draggable={false}
          />
        </a>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 sm:pt-24 pb-24 text-center">
        {/* Eyebrow — matches the OG image pill */}
        <div className="inline-flex items-center rounded-full border border-[#5670d8]/40 bg-[#5670d8]/12 px-4 py-1.5">
          <span className="text-[10.5px] tracking-[0.32em] uppercase text-[#bdd1f7] font-semibold">
            {eyebrow}
          </span>
        </div>

        <h1
          className="mt-8 text-white"
          style={{
            fontWeight: 300,
            fontSize: 'clamp(34px, 5vw, 60px)',
            lineHeight: 1.06,
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          {title}
        </h1>

        <p className="mt-6 max-w-lg mx-auto text-white/62 text-[15.5px] leading-relaxed">
          {subtitle}
        </p>

        {/* Optional slot for room previews, note snippets, etc. */}
        {children ? <div className="mt-10">{children}</div> : null}

        {/* Primary CTA — anchor rather than button so long-press "open in
            new tab" works and OS handles the intent URI natively. */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <a
            href={intentUri}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14.5px] font-medium text-[#0a0a0d] transition hover:scale-[1.02] active:scale-95"
          >
            {primaryCta}
            <span aria-hidden>→</span>
          </a>

          {/* Play Store fallback — always visible so users on desktop or
              without the app installed can jump straight to install. */}
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/55 hover:text-white text-[13px] underline underline-offset-4 decoration-white/25 hover:decoration-white/60 transition-colors"
          >
            Don&apos;t have tid? Get it on Google Play →
          </a>
        </div>

        {/* Auto-launch feedback: appears if we tried to open the app and
            the browser is still here after ~1.6s. Encourages install. */}
        {autoLaunched && suggestInstall ? (
          <div
            role="status"
            className="mt-10 mx-auto max-w-md rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 text-[13px] leading-relaxed text-white/70"
          >
            Didn&apos;t open? tid may not be installed on this device.{' '}
            <a
              href={PLAY_STORE_URL}
              className="text-white underline underline-offset-4 decoration-white/40 hover:decoration-white"
            >
              Install it on the Play Store
            </a>{' '}
            — the app will pick up right where this link points.
          </div>
        ) : null}
      </main>

      {/* Footer trust line, tiny */}
      <footer className="relative z-10 pb-8 text-center text-white/35 text-[11.5px]">
        <p>tid — the AI notebook that thinks with you</p>
      </footer>
    </div>
  );
}
