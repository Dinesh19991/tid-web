import LinkLandingShell from './LinkLandingShell';

/**
 * Landing page for /open and /get.
 *
 * Used from transactional emails (welcome, verification) and marketing
 * QR codes. On Android with the app installed, the shell auto-launches
 * the app to its home screen. Otherwise the user sees a clean install
 * prompt with the Play Store link.
 */
export default function OpenAppLanding() {
  return (
    <LinkLandingShell
      eyebrow="Open tid"
      title="Open tid on your phone"
      subtitle="Tapping the button below will open the tid app if it's installed, or take you to the Play Store to get it."
      appPath="/open"
      primaryCta="Open tid"
    />
  );
}
