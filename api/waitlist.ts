/**
 * Vercel serverless function (Node runtime) — website "join waitlist" handler.
 *
 * On each signup POST it:
 *   1. Sends the confirmation email via Resend from noreply@trytid.com, using
 *      the live public/waitlist-email.html template (same look as the app
 *      welcome email).
 *   2. Records the signup in Firestore (collection "waitlist") so it shows up
 *      in the admin console — best-effort, only when a service account is set.
 *
 * Vercel env (Project Settings -> Environment Variables):
 *   RESEND_API_KEY                (required)  — used to send the email
 *   FIREBASE_SERVICE_ACCOUNT_B64  (optional)  — base64 of the service-account
 *                                  JSON; enables Firestore logging when present
 *
 * This replaces the old Google Apps Script flow (which sent from a personal
 * Gmail and hard-coded the template inline).
 */

const TEMPLATE_URL = 'https://www.trytid.com/waitlist-email.html';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const body = (typeof req.body === 'string' ? safeParse(req.body) : req.body) || {};
  const email = String(body.email || '').trim().toLowerCase();
  const source = String(body.source || '');
  const ts = String(body.ts || new Date().toISOString());

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: 'invalid_email' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[waitlist] RESEND_API_KEY is not set');
    return res.status(500).json({ ok: false, error: 'not_configured' });
  }

  // 1) Send the confirmation email (primary path).
  let sent = false;
  let debug: Record<string, unknown> | undefined;
  try {
    const html = await (await fetch(`${TEMPLATE_URL}?v=${Date.now()}`)).text();
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Tid <noreply@trytid.com>',
        to: [email],
        subject: "You're on the Tid waitlist ✦",
        html,
      }),
    });
    sent = r.ok;
    if (!r.ok) {
      const errBody = await r.text();
      console.error('[waitlist] resend error', r.status, errBody);
      // TEMP DIAGNOSTIC — reveals the Resend error + key shape (not the key).
      debug = {
        resendStatus: r.status,
        resendBody: errBody,
        keyPrefix: apiKey.slice(0, 3),
        keyLen: apiKey.length,
        keyTrimmedLen: apiKey.trim().length,
      };
    }
  } catch (err) {
    console.error('[waitlist] resend threw', err);
    debug = { threw: String(err) };
  }

  // 2) Record the signup (best-effort; only if Firestore is configured).
  await logSignup({ email, source, ts, emailSent: sent }).catch((e) =>
    console.error('[waitlist] firestore log failed', e),
  );

  return res.status(sent ? 200 : 502).json({ ok: sent, debug });
}

async function logSignup(data: Record<string, unknown>): Promise<void> {
  const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_B64;
  if (!b64) return; // logging not configured — skip silently, email still sends
  const { cert, getApps, initializeApp } = await import('firebase-admin/app');
  const { getFirestore, FieldValue } = await import('firebase-admin/firestore');
  if (!getApps().length) {
    const sa = JSON.parse(Buffer.from(b64, 'base64').toString('utf8'));
    initializeApp({ credential: cert(sa) });
  }
  await getFirestore()
    .collection('waitlist')
    .add({ ...data, createdAt: FieldValue.serverTimestamp() });
}

function safeParse(s: string): Record<string, unknown> {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}
