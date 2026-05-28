import { useEffect } from 'react';
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

export default function App() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
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
      className="relative min-h-screen bg-[#0a0a0d] text-white [overflow-x:clip]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Loader />
      <Header />
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
      <EndScene />
      <Footer />
    </div>
  );
}
