// Sends a waitlist signup to our own serverless endpoint (api/waitlist.ts),
// which emails the confirmation via Resend (from noreply@trytid.com) and records
// the signup in Firestore. Same-origin, so no CORS dance and we can read the
// response to reflect success/failure in the UI.

const ENDPOINT = '/api/waitlist';

export async function submitEmail(
  email: string,
  source: 'coming-soon' | 'footer' | string,
): Promise<boolean> {
  const clean = email.trim();
  if (!clean || !/^\S+@\S+\.\S+$/.test(clean)) return false;

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: clean,
        source,
        ts: new Date().toISOString(),
      }),
    });
    return res.ok;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[tid] waitlist submit failed', err);
    return false;
  }
}
