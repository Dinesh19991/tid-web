// Dynamic Open Graph image generator for tid share links.
//
// Runs on Vercel's Edge runtime and renders a 1200×630 branded card in the
// tid card-blur aesthetic: deep indigo base + two blue orbs + tid wordmark.
//
// Query params (all optional):
//   type    — one of "room" | "note" | "invite" | "template" | "default"
//   title   — the resource's public title (falls back to a sensible default)
//   sub     — one-line subtitle beneath the title
//
// Called by:
//   - middleware.ts, which injects the URL into <meta property="og:image">
//   - Any share page that wants a per-resource preview
//
// Cache: Vercel edge caches the response for the given URL, so repeated
// crawls (Facebook, WhatsApp, Slack, Twitter, LinkedIn, Discord…) don't
// re-render.

import { ImageResponse } from '@vercel/og';

// Runs on Vercel's `experimental-edge` runtime — the traditional
// @vercel/og runtime that bundles Noto Sans by default (no font-loading
// boilerplate) and is treated as a distinct bundle from the Edge
// Middleware at project root.
export const config = { runtime: 'experimental-edge' };

type LinkType = 'room' | 'note' | 'invite' | 'template' | 'default';

const EYEBROWS: Record<LinkType, string> = {
  room: 'Shared room',
  note: 'Shared note',
  invite: "You're invited",
  template: 'Template',
  default: 'tid',
};

const DEFAULT_TITLES: Record<LinkType, string> = {
  room: 'Open this room on tid',
  note: 'Open this note on tid',
  invite: 'Join a room on tid',
  template: 'Get this template on tid',
  default: 'Notes that think with you',
};

const DEFAULT_SUBS: Record<LinkType, string> = {
  room: 'A shared workspace on tid — the AI notebook.',
  note: 'A shared note on tid — the AI notebook.',
  invite: 'Tap to accept the invite and join the room.',
  template: 'Add this template to your tid notebook.',
  default: 'The AI notebook that turns voice, text, and photos into clean, findable notes.',
};

export default function handler(req: Request): Response {
  const { searchParams } = new URL(req.url);
  const rawType = (searchParams.get('type') || 'default') as LinkType;
  const type: LinkType = rawType in EYEBROWS ? rawType : 'default';

  const title = truncate(searchParams.get('title') || DEFAULT_TITLES[type], 90);
  const sub = truncate(searchParams.get('sub') || DEFAULT_SUBS[type], 180);
  const eyebrow = EYEBROWS[type];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          position: 'relative',
          background:
            'linear-gradient(160deg, #1a1f44 0%, #0d1130 55%, #07091a 100%)',
          color: '#fff',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {/* Top-right vibrant blue orb */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: '-180px',
            right: '-140px',
            width: '720px',
            height: '720px',
            borderRadius: '9999px',
            background:
              'radial-gradient(circle, rgba(110,135,240,0.55), rgba(110,135,240,0) 70%)',
          }}
        />
        {/* Top-left softer indigo orb */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: '-80px',
            left: '-120px',
            width: '560px',
            height: '560px',
            borderRadius: '9999px',
            background:
              'radial-gradient(circle, rgba(80,105,215,0.45), rgba(80,105,215,0) 70%)',
          }}
        />
        {/* Bottom accent orb — for depth */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: '-220px',
            left: '30%',
            width: '640px',
            height: '640px',
            borderRadius: '9999px',
            background:
              'radial-gradient(circle, rgba(157,184,245,0.22), rgba(157,184,245,0) 70%)',
          }}
        />

        {/* Top row: eyebrow tag */}
        <div style={{ display: 'flex', position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              padding: '10px 22px',
              borderRadius: '9999px',
              background: 'rgba(157,184,245,0.14)',
              border: '1px solid rgba(157,184,245,0.35)',
              fontSize: 20,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: '#bdd1f7',
              fontWeight: 600,
            }}
          >
            {eyebrow}
          </div>
        </div>

        {/* Middle: title + subtitle */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            position: 'relative',
            maxWidth: '900px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 76,
              fontWeight: 300,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: '#ffffff',
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 26,
              lineHeight: 1.4,
              color: 'rgba(255,255,255,0.62)',
              fontWeight: 400,
              maxWidth: '820px',
            }}
          >
            {sub}
          </div>
        </div>

        {/* Bottom row: tid wordmark + url */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            {/* Blue chip mark */}
            <div
              style={{
                display: 'flex',
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background:
                  'linear-gradient(155deg,#1a2150,#0c1230)',
                border: '1px solid rgba(255,255,255,0.14)',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#ffffff',
              }}
            >
              t
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 34,
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: '#ffffff',
              }}
            >
              tid
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 20,
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.02em',
            }}
          >
            trytid.com
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      // Cache-Control set on the outer Response — 5 min at edge, 1 day in
      // downstream CDNs; a share never re-generates unless the URL changes.
      headers: {
        'cache-control':
          'public, max-age=300, s-maxage=86400, stale-while-revalidate=604800',
      },
    },
  );
}

function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trimEnd() + '…';
}
