import LinkLandingShell from './LinkLandingShell';

/**
 * Landing page for /get?ref={referrerUid}.
 *
 * A friend shared their referral link. On Android with the app installed
 * the shell auto-launches the app; otherwise the visitor sees an install
 * prompt. The referrer's uid is passed through in the app path so once
 * they install and open, the app credits the referral.
 */
export default function ReferralLanding({ ref: refId }: { ref: string }) {
  // Pass the ref through to the app so the deep-link handler can credit
  // it after sign-in. Safe to include even when the app opens directly.
  const appPath = `/get?ref=${encodeURIComponent(refId)}`;

  return (
    <LinkLandingShell
      eyebrow="A friend invited you"
      title="Notes that think with you."
      subtitle="Someone shared tid with you — AI-powered notes, voice memos, and shared rooms. Take a look."
      appPath={appPath}
      primaryCta="Open tid"
    />
  );
}
