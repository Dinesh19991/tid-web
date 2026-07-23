import { useEffect, useState, type ComponentType, type ReactNode } from 'react';
import { ScrollTrigger } from './lib/gsap';
import Loader from './components/Loader';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Manifesto from './components/Manifesto';
import Features from './components/Features';
import Testimonial from './components/Testimonial';
import Stats from './components/Stats';
import HowItWorks from './components/HowItWorks';
import UseCases from './components/UseCases';
import Showcase from './components/Showcase';
import Scenes from './components/Scenes';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import EndScene from './components/EndScene';
import Footer from './components/Footer';
import { Terms, Privacy, TrustCenter, About } from './components/LegalPages';
import ComingSoon from './components/ComingSoon';
import RoomLanding from './components/link/RoomLanding';
import RoomInviteLanding from './components/link/RoomInviteLanding';
import NoteLanding from './components/link/NoteLanding';
import OpenAppLanding from './components/link/OpenAppLanding';

function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Manifesto />
      <Features />
      <Testimonial />
      <Stats />
      <HowItWorks />
      <UseCases />
      <Showcase />
      <Scenes />
      <Pricing />
      <FAQ />
      <div className="relative mountain-bg overflow-hidden">
        <div className="absolute inset-0 mountain-ridge pointer-events-none" />
        <EndScene />
        <Footer transparent />
      </div>
    </>
  );
}

const ROUTES: Record<string, ComponentType> = {
  '/terms': Terms,
  '/privacy': Privacy,
  '/trust': TrustCenter,
  '/about': About,
};

/**
 * Match a pathname against the deep-link patterns.
 *
 * Returns a ReactNode (the rendered landing page) when the path is a
 * deep-link URL, or null when it should fall through to the SPA's own
 * routing (Home, Legal pages, etc.).
 *
 * These are standalone landing surfaces — they render without the
 * marketing Header/Footer/Loader chrome, same pattern as `/soon`.
 */
function matchDeepLink(pathname: string): ReactNode | null {
  // /r/{roomId}/join → invite acceptance
  const inviteMatch = pathname.match(/^\/r\/([^/]+)\/join\/?$/);
  if (inviteMatch) return <RoomInviteLanding roomId={inviteMatch[1]} />;

  // /r/{roomId}/n/{messageId} → same landing as room (Phase 2 renders the
  // room preview; the app deep-link handles scroll-to-message).
  const roomMsgMatch = pathname.match(/^\/r\/([^/]+)\/n\/([^/]+)\/?$/);
  if (roomMsgMatch) return <RoomLanding roomId={roomMsgMatch[1]} />;

  // /r/{roomId}
  const roomMatch = pathname.match(/^\/r\/([^/]+)\/?$/);
  if (roomMatch) return <RoomLanding roomId={roomMatch[1]} />;

  // /n/{noteId}
  const noteMatch = pathname.match(/^\/n\/([^/]+)\/?$/);
  if (noteMatch) return <NoteLanding noteId={noteMatch[1]} />;

  // /open, /get → universal opener
  if (pathname === '/open' || pathname === '/get') return <OpenAppLanding />;

  return null;
}

export default function App() {
  const [path, setPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/',
  );

  // Lightweight client-side router: intercept internal links, handle back/forward.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const onPop = () => setPath(window.location.pathname);

    const onClick = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
        return;
      const target = e.target as HTMLElement;
      const a = target.closest?.('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('/') || a.getAttribute('target') === '_blank')
        return;

      e.preventDefault();
      const url = new URL(href, window.location.origin);
      if (url.pathname !== window.location.pathname || url.hash) {
        window.history.pushState({}, '', href);
        setPath(url.pathname);
      }
      if (url.hash) {
        // let Home render, then scroll to the anchor
        window.setTimeout(() => {
          const el = document.querySelector(url.hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          else window.scrollTo(0, 0);
        }, 80);
      } else {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('popstate', onPop);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('popstate', onPop);
      document.removeEventListener('click', onClick);
    };
  }, []);

  // Recalculate scroll-driven animations when returning to the home route.
  useEffect(() => {
    const t1 = window.setTimeout(() => ScrollTrigger.refresh(), 60);
    const t2 = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    const t3 = window.setTimeout(() => ScrollTrigger.refresh(), 1200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [path]);

  const RouteComponent = ROUTES[path];
  const deepLink = matchDeepLink(path);

  // Standalone full-screen pages (no marketing header/footer/loader)
  if (path === '/soon') {
    return (
      <div
        className="relative min-h-[100dvh] bg-[#070708] text-white [overflow-x:clip]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <ComingSoon />
      </div>
    );
  }

  // Deep-link landing pages (/r/*, /n/*, /open, /get) — rendered
  // without Loader/Header/Footer so users tapping a share link see
  // content instantly.
  if (deepLink) {
    return (
      <div
        className="relative min-h-[100dvh] [overflow-x:clip]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {deepLink}
      </div>
    );
  }

  return (
    <div
      className="relative min-h-[100dvh] bg-[#0a0a0d] text-white [overflow-x:clip]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Loader />
      <Header />
      {RouteComponent ? (
        <>
          <RouteComponent />
          <Footer />
        </>
      ) : (
        <Home />
      )}
    </div>
  );
}
