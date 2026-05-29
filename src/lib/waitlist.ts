// Sends a captured email to the configured Google Sheet (via Apps Script web app).
//
// Setup:
//   1. Create a Google Sheet, then Extensions → Apps Script and paste the
//      doPost script from the README / setup notes.
//   2. Deploy → New deployment → Web app → Execute as "Me", access "Anyone".
//   3. Copy the /exec URL and set it as the env var VITE_WAITLIST_ENDPOINT
//      (in Vercel → Project → Settings → Environment Variables, then redeploy).
//
// Until the endpoint is set, submissions are accepted optimistically and logged
// to the console so the UI still works in local dev.

const ENDPOINT = (import.meta.env.VITE_WAITLIST_ENDPOINT as string | undefined) ?? '';

export async function submitEmail(
  email: string,
  source: 'coming-soon' | 'footer' | string,
): Promise<boolean> {
  const clean = email.trim();
  if (!clean || !/^\S+@\S+\.\S+$/.test(clean)) return false;

  if (!ENDPOINT) {
    // eslint-disable-next-line no-console
    console.warn(
      '[tid] VITE_WAITLIST_ENDPOINT not set — email captured locally only:',
      clean,
      `(source: ${source})`,
    );
    return true;
  }

  try {
    await fetch(ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        email: clean,
        source,
        ts: new Date().toISOString(),
      }).toString(),
    });
    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[tid] waitlist submit failed', err);
    return false;
  }
}
