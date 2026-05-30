import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';

const ITEMS = [
  {
    q: 'How does tid capture my notes?',
    a: 'Speak, type, or paste. tid transcribes voice in real time and tags everything automatically — no setup required.',
  },
  {
    q: 'Where does my data live?',
    a: 'Encrypted in transit and at rest. Only you hold the key, and tid is never trained on your private notes.',
  },
  {
    q: 'Will I need to learn it?',
    a: 'No. There are no folders or syntax to master — you just capture, and tid organizes everything by meaning.',
  },
  {
    q: 'How fast is recall?',
    a: 'Ask a question in plain language and tid surfaces the right note, summarized and sourced, in around 180ms.',
  },
  {
    q: 'How much does it cost?',
    a: 'Free to start with generous limits. Pro unlocks unlimited capture, AI summaries, semantic search and the knowledge graph.',
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-head, .faq-chat', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.14,
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0a0a0d] py-28 md:py-36 px-6 sm:px-8 lg:px-12 overflow-hidden border-t border-white/[0.06]"
    >
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="faq-head">
          <h2
            className="text-white"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(30px, 4vw, 52px)',
              lineHeight: 1.06,
              letterSpacing: '-0.03em',
              margin: 0,
            }}
          >
            Frequently asked
            <br />
            questions
          </h2>
          <p className="mt-5 text-white/55 text-[14px] leading-relaxed max-w-sm">
            Everything you might want to know before you start taking notes
            with tid. Still curious? Just ask.
          </p>
        </div>

        {/* chat-style Q&A */}
        <div className="faq-chat rounded-2xl bg-white/[0.06] border border-white/12 backdrop-blur-md p-4 sm:p-5 space-y-3">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex justify-end"
                >
                  <span
                    className={`max-w-[80%] text-left rounded-2xl rounded-br-md px-4 py-2.5 text-[13px] transition-colors ${
                      isOpen
                        ? 'bg-white text-[#1a1814]'
                        : 'bg-white/15 text-white/85 hover:bg-white/20'
                    }`}
                  >
                    {item.q}
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-400 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="flex justify-start mt-2">
                      <span className="max-w-[85%] rounded-2xl rounded-bl-md bg-white/10 border border-white/10 px-4 py-2.5 text-[13px] text-white/80 leading-relaxed">
                        {item.a}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] pl-4 pr-1.5 py-1.5 mt-4">
            <span className="flex-1 text-white/40 text-[12.5px]">
              Ask anything about tid…
            </span>
            <button className="w-7 h-7 grid place-items-center rounded-full bg-white text-[#1a1814] text-[13px]">
              ↑
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
