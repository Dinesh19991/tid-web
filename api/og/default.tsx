// Dynamic Open Graph image generator for tid share links.
//
// Runs on Vercel's experimental-edge runtime and renders a 1200×630
// branded card matching the tid card-blur aesthetic: deep indigo base +
// two blue orbs + tid wordmark, with a per-type layout on top.
//
// Query params (all optional):
//   type      — "room" | "invite" | "note" | "template" | "default"
//   title     — resource name (falls back to a sensible default)
//   sub       — one-line subtitle beneath the title
//   by        — inviter or note author ("Shared by …", "Invited by …")
//   members   — integer member count (rooms/invites) — rendered as chip
//   snippet   — short body preview (notes only)
//   private   — "1" to render a private-note lock state
//
// Called by:
//   - middleware.ts, which injects the URL into <meta property="og:image">
//     and forwards through any query params the share URL carried
//
// Cache: Vercel edge caches by full URL — every distinct combination
// of params gets its own cached image.

import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'experimental-edge' };

type LinkType = 'room' | 'invite' | 'note' | 'template' | 'default';

const EYEBROWS: Record<LinkType, string> = {
  room: 'Shared room',
  invite: "You're invited",
  note: 'Shared note',
  template: 'Template',
  default: 'tid',
};

const DEFAULT_TITLES: Record<LinkType, string> = {
  room: 'Open this room on tid',
  invite: 'Join a room on tid',
  note: 'Open this note on tid',
  template: 'Get this template on tid',
  default: 'Notes that think with you',
};

const DEFAULT_SUBS: Record<LinkType, string> = {
  room: 'A shared workspace on tid — the AI notebook.',
  invite: "You've been invited to a shared workspace on tid.",
  note: 'A shared note on tid — the AI notebook.',
  template: 'Add this template to your tid notebook.',
  default:
    'The AI notebook that turns voice, text, and photos into clean, findable notes.',
};

const PRIVATE_TITLE = 'This note is private';
const PRIVATE_SUB = 'Sign in to tid on the app to view it.';

export default function handler(req: Request): Response {
  const url = new URL(req.url);
  const p = url.searchParams;

  const rawType = (p.get('type') || 'default') as LinkType;
  const type: LinkType = rawType in EYEBROWS ? rawType : 'default';
  const isPrivate = type === 'note' && p.get('private') === '1';

  const eyebrow = EYEBROWS[type];
  const title = isPrivate
    ? PRIVATE_TITLE
    : truncate(p.get('title') || DEFAULT_TITLES[type], 90);
  const sub = isPrivate
    ? PRIVATE_SUB
    : truncate(p.get('sub') || buildSubFromParams(type, p) || DEFAULT_SUBS[type], 200);

  const members = parseIntSafe(p.get('members'));
  const by = truncate((p.get('by') || '').trim(), 60);
  const snippet = truncate((p.get('snippet') || '').trim(), 180);

  const showMemberChip =
    (type === 'room' || type === 'invite') && members !== null && members > 0;
  const showByChip = !isPrivate && by.length > 0;
  const showSnippetBlock = type === 'note' && !isPrivate && snippet.length > 0;

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
        {/* Blue orbs — same recipe as the site's .card-blur */}
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

        {/* Top: eyebrow + optional private lock icon */}
        <div
          style={{
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <div
            style={{
              display: 'flex',
              padding: '10px 22px',
              borderRadius: '9999px',
              background: isPrivate
                ? 'rgba(255,255,255,0.05)'
                : 'rgba(157,184,245,0.14)',
              border: isPrivate
                ? '1px solid rgba(255,255,255,0.14)'
                : '1px solid rgba(157,184,245,0.35)',
              fontSize: 20,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: isPrivate ? 'rgba(255,255,255,0.55)' : '#bdd1f7',
              fontWeight: 600,
            }}
          >
            {eyebrow}
          </div>

          {isPrivate ? (
            <div
              style={{
                display: 'flex',
                width: '46px',
                height: '46px',
                borderRadius: '9999px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.14)',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              🔒
            </div>
          ) : null}
        </div>

        {/* Middle: title + subtitle + optional meta chips + optional snippet */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            position: 'relative',
            maxWidth: '960px',
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

          {/* Meta chips row (member count, "by X") */}
          {(showMemberChip || showByChip) && !showSnippetBlock ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginTop: '4px',
              }}
            >
              {showMemberChip ? (
                <Chip>
                  {members} {members === 1 ? 'member' : 'members'}
                </Chip>
              ) : null}
              {showByChip ? (
                <Chip>
                  {type === 'invite' ? 'Invited by' : 'Shared by'} {by}
                </Chip>
              ) : null}
            </div>
          ) : null}

          {/* Note snippet, framed like a note card */}
          {showSnippetBlock ? (
            <div
              style={{
                display: 'flex',
                padding: '22px 26px',
                borderRadius: '18px',
                border: '1px solid rgba(255,255,255,0.09)',
                background: 'rgba(255,255,255,0.03)',
                fontSize: 24,
                lineHeight: 1.4,
                color: 'rgba(255,255,255,0.75)',
                maxWidth: '900px',
              }}
            >
              {snippet}
            </div>
          ) : null}

          {/* Fallback subtitle when we have no chips / snippet */}
          {!showMemberChip && !showByChip && !showSnippetBlock ? (
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
          ) : null}
        </div>

        {/* Bottom: tid wordmark + url */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                display: 'flex',
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: 'linear-gradient(155deg,#1a2150,#0c1230)',
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
      headers: {
        'cache-control':
          'public, max-age=300, s-maxage=86400, stale-while-revalidate=604800',
      },
    },
  );
}

/** Small pill used for member count / "shared by X" beneath the title. */
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        padding: '8px 16px',
        borderRadius: '9999px',
        border: '1px solid rgba(255,255,255,0.12)',
        background: 'rgba(255,255,255,0.05)',
        fontSize: 22,
        color: 'rgba(255,255,255,0.78)',
        fontWeight: 500,
      }}
    >
      {children}
    </div>
  );
}

/** Build a fallback subtitle from the shape of the metadata we got. */
function buildSubFromParams(
  type: LinkType,
  p: URLSearchParams,
): string | null {
  const by = (p.get('by') || '').trim();
  const members = parseIntSafe(p.get('members'));
  const parts: string[] = [];
  if (members !== null && members > 0) {
    parts.push(`${members} ${members === 1 ? 'member' : 'members'}`);
  }
  if (by) {
    parts.push(`${type === 'invite' ? 'invited by' : 'shared by'} ${by}`);
  }
  return parts.length ? parts.join(' · ') : null;
}

function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trimEnd() + '…';
}

function parseIntSafe(s: string | null): number | null {
  if (!s) return null;
  const n = parseInt(s, 10);
  return Number.isFinite(n) && n >= 0 ? n : null;
}
