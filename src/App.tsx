import { useEffect } from 'react';
import { ScrollTrigger } from './lib/gsap';
import Header from './components/Header';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Stats from './components/Stats';
import Marquee from './components/Marquee';
import Showcase from './components/Showcase';
import Features from './components/Features';
import Scenes from './components/Scenes';
import HowItWorks from './components/HowItWorks';
import UseCases from './components/UseCases';
import Testimonial from './components/Testimonial';
import FAQ from './components/FAQ';
import EndScene from './components/EndScene';
import Footer from './components/Footer';
import CursorBlob from './components/CursorBlob';

export default function App() {
  useEffect(() => {
    // After all sections mount (including pinned ones that inject spacers),
    // recalculate every ScrollTrigger position. Without this, reveals in
    // sections that follow pinned sections can stay stuck at opacity 0.
    const t1 = window.setTimeout(() => ScrollTrigger.refresh(), 50);
    const t2 = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    const t3 = window.setTimeout(() => ScrollTrigger.refresh(), 1200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div
      className="relative min-h-screen bg-black text-white overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Global cinematic film grain (subtle overlay) */}
      <div className="grain" aria-hidden />

      {/* Custom cursor — only visible on hover-capable devices */}
      <CursorBlob />

      <Header />
      <Hero />
      <Manifesto />
      <Stats />
      <Marquee />
      <Showcase />
      <Features />
      <Scenes />
      <HowItWorks />
      <UseCases />
      <Testimonial />
      <FAQ />
      <EndScene />
      <Footer />
    </div>
  );
}
