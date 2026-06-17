import { useEffect, useState, type ComponentType } from 'react';
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

  // Standalone full-screen pages (no marketing header/footer/loader)
  if (path === '/soon') {
    return (
      <div
        className="relative min-h-screen bg-[#070708] text-white [overflow-x:clip]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <ComingSoon />
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen bg-[#0a0a0d] text-white [overflow-x:clip]"
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
