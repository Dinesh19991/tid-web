import { useEffect } from 'react';
import type { ReactNode } from 'react';

function PageShell({
  eyebrow,
  title,
  updated,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  updated?: string;
  intro?: string;
  children: ReactNode;
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative bg-[#0a0a0d] min-h-screen pt-32 md:pt-40 pb-28 px-6 sm:px-8 lg:px-12 overflow-hidden">
      {/* soft blue glow at the top, echoing the hero */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-[#16245e]/45 via-[#101a3e]/15 to-transparent" />

      <div className="relative max-w-3xl mx-auto">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-white/45 hover:text-white text-[13px] transition-colors mb-10"
        >
          ← Back to home
        </a>

        <p className="text-[10.5px] tracking-[0.24em] uppercase text-indigo-300/70 font-medium mb-4">
          {eyebrow}
        </p>
        <h1
          className="text-white"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(34px, 5vw, 60px)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          {title}
        </h1>
        {updated && (
          <p className="mt-5 text-white/40 text-[13px]">Last updated · {updated}</p>
        )}
        {intro && (
          <p className="mt-6 text-white/60 text-[15.5px] leading-relaxed max-w-2xl">
            {intro}
          </p>
        )}

        <div className="mt-14 space-y-12">{children}</div>
      </div>
    </main>
  );
}

function Block({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-white text-[19px] font-medium tracking-tight mb-3">
        {heading}
      </h2>
      <div className="space-y-3 text-white/60 text-[14.5px] leading-relaxed">
        {children}
      </div>
    </section>
  );
}

const mail = (
  <a
    href="mailto:hello@tid.app"
    className="text-indigo-300 hover:text-indigo-200 underline underline-offset-4 decoration-indigo-400/40"
  >
    hello@tid.app
  </a>
);

export function Terms() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of Service"
      updated="May 2026"
      intro="These terms govern your use of tid. By creating an account or using the app, you agree to them — so please read them carefully."
    >
      <Block heading="1. Using tid">
        <p>
          You may use tid only if you can form a binding contract with us and
          only in compliance with these terms and all applicable laws. You must
          be at least 13 years old (or the minimum age of digital consent in
          your country).
        </p>
      </Block>
      <Block heading="2. Your account">
        <p>
          You are responsible for safeguarding your account and for any activity
          under it. Use a strong, unique password and let us know immediately if
          you suspect unauthorized access.
        </p>
      </Block>
      <Block heading="3. Your content is yours">
        <p>
          You retain full ownership of every note, recording, and file you
          capture in tid. We claim no rights over your content. You grant us
          only the limited permission required to store, sync, and process it so
          the product can function for you.
        </p>
      </Block>
      <Block heading="4. Acceptable use">
        <p>
          Don't misuse tid: no illegal content, no attempts to break, overload,
          or reverse-engineer the service, and no using it to harm others.
          We may suspend accounts that violate these rules.
        </p>
      </Block>
      <Block heading="5. Plans & billing">
        <p>
          Paid plans are billed in advance and renew automatically until
          cancelled. You can cancel anytime from your account; access continues
          until the end of the current billing period. Fees are non-refundable
          except where required by law.
        </p>
      </Block>
      <Block heading="6. Termination">
        <p>
          You can delete your account at any time. We may suspend or terminate
          access if you breach these terms. On termination you can export your
          data, after which it is removed per our retention policy.
        </p>
      </Block>
      <Block heading="7. Disclaimers & liability">
        <p>
          tid is provided "as is." To the maximum extent permitted by law, we
          disclaim implied warranties and are not liable for indirect or
          consequential damages. Nothing here limits liability that cannot be
          limited by law.
        </p>
      </Block>
      <Block heading="8. Changes & contact">
        <p>
          We may update these terms; we'll notify you of material changes.
          Questions? Reach us at {mail}.
        </p>
      </Block>
    </PageShell>
  );
}

export function Privacy() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy"
      updated="May 2026"
      intro="tid is a private second brain. This policy explains what we collect, how we use it, and the controls you have — in plain language."
    >
      <Block heading="What we collect">
        <p>
          Account basics (name, email), the content you choose to capture, and
          limited technical data (device type, app version, crash logs) needed
          to run and improve the service.
        </p>
      </Block>
      <Block heading="How we use it">
        <p>
          To provide tid: to sync your notes across devices, power features like
          summaries and search, keep the service secure, and respond to support
          requests. That's it.
        </p>
      </Block>
      <Block heading="Your notes stay yours">
        <p>
          Your notes are encrypted in transit and at rest. We never sell your
          data, and we never train AI models on your private notes. AI features
          run against your content on demand, on a per-note basis.
        </p>
      </Block>
      <Block heading="Sharing">
        <p>
          We share data only with the vetted subprocessors that run our
          infrastructure (listed in our Trust Center), or when legally required.
          We do not share your content with advertisers — ever.
        </p>
      </Block>
      <Block heading="Your rights">
        <p>
          You can access, export (Markdown, JSON, or PDF), correct, or delete
          your data at any time. Depending on where you live, you may have
          additional rights under GDPR or CCPA, which we honor.
        </p>
      </Block>
      <Block heading="Retention & contact">
        <p>
          We keep your data only as long as your account is active or as needed
          to provide the service. Delete your account and we remove it. Privacy
          questions? Email {mail}.
        </p>
      </Block>
    </PageShell>
  );
}

export function TrustCenter() {
  return (
    <PageShell
      eyebrow="Security"
      title="Trust Center"
      intro="Security and privacy aren't features — they're the foundation. Here's how we protect the thoughts you trust us with."
    >
      <Block heading="Encryption everywhere">
        <p>
          All data is encrypted in transit with TLS 1.3 and at rest with
          AES-256. Sensitive fields are additionally encrypted so that only you
          can unlock them.
        </p>
      </Block>
      <Block heading="Never trained on your data">
        <p>
          We do not use your private notes to train AI models, and we never sell
          your data. Your thinking is not our product.
        </p>
      </Block>
      <Block heading="Compliance">
        <p>
          tid is built to meet SOC 2 Type II controls and is compliant with GDPR
          and CCPA. Data processing agreements are available for teams on
          request.
        </p>
      </Block>
      <Block heading="Infrastructure">
        <p>
          We run on hardened, audited cloud infrastructure with isolated
          environments, least-privilege access, encrypted backups, and
          continuous monitoring.
        </p>
      </Block>
      <Block heading="Responsible disclosure">
        <p>
          Found a vulnerability? We appreciate your help. Report it to {mail} and
          we'll respond promptly. We don't pursue good-faith security research.
        </p>
      </Block>
      <Block heading="Subprocessors">
        <p>
          We use a small set of vetted infrastructure providers for hosting,
          storage, and email. A current list is available on request.
        </p>
      </Block>
    </PageShell>
  );
}

export function About() {
  return (
    <PageShell
      eyebrow="Company"
      title="About tid"
      intro="We're building the second brain that listens — a calm, private place for everything you think, so nothing ever slips away."
    >
      <Block heading="Our mission">
        <p>
          Modern apps are built to keep you scrolling. tid is built to keep you
          thinking. We want capturing a thought to be as effortless as having
          one — and recalling it to be instant.
        </p>
      </Block>
      <Block heading="What we believe">
        <p>
          Your notes should be organized by meaning, not by folders. Your data
          should be private by default. And the best tool is the one that
          disappears so your ideas can take center stage.
        </p>
      </Block>
      <Block heading="How we work">
        <p>
          A small, focused team obsessed with craft. We ship deliberately, listen
          to the people who think for a living, and treat privacy as a promise,
          not a setting.
        </p>
      </Block>
      <Block heading="Say hello">
        <p>
          Want to work with us, partner, or just share feedback? We'd love to
          hear from you at {mail}.
        </p>
      </Block>
    </PageShell>
  );
}
