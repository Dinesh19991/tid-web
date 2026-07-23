// Vercel Edge Middleware — runs before every matched request.
//
// Purpose: social-media crawlers (Facebook, WhatsApp, Slack, Twitter,
// LinkedIn, iMessage, Discord …) don't execute JavaScript. Our React SPA
// injects OG tags at runtime, so those crawlers see an empty <head> and
// render an ugly generic preview.
//
// This middleware intercepts requests that:
//   1. match a deep-link path (/r/*, /n/*, /t/*, /open, /get)
//   2. come from a known social crawler UA
// and returns a tiny HTML document whose <head> contains the correct
// og:* and twitter:* tags for THAT specific link type.
//
// Real browsers fall through (`next()`) and hit the existing Vite SPA.
//
// See also:
//   - api/og/default.tsx  (renders the OG image the tags point at)
//   - vercel.json          (rewrites /r/*, /n/*, /t/* to /index.html)

import { next } from '@vercel/edge';

export const config = {
  // Only intercept share/link paths. /api/* and everything else pass through.
  matcher: ['/r/:path*', '/n/:path*', '/t/:path*', '/open', '/get'],
};

// Regex kept intentionally broad — better to serve OG tags to something
// that turns out not to be a crawler than to miss a real one.
const CRAWLER_UA =
  /facebookexternalhit|facebot|twitterbot|whatsapp|slackbot|slack-imgproxy|linkedinbot|discordbot|telegrambot|redditbot|skypeuripreview|pinterest|embedly|showyoubot|outbrain|quora link preview|w3c_validator|bingbot|googlebot|applebot|iframely|vkshare|yandexbot|duckduckbot|baiduspider|petalbot|bytespider/i;

export default function middleware(request: Request): Response {
  const ua = request.headers.get('user-agent') || '';

  // Real browsers → let the SPA handle it.
  if (!CRAWLER_UA.test(ua)) return next();

  const url = new URL(request.url);
  const meta = buildMetaFor(url);
  const html = renderShell(url, meta);

  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      // Crawlers cache aggressively already; 5 min at edge is a good balance
      // between "share previews stay fresh" and "we don't re-render every hit".
      'cache-control': 'public, max-age=300, s-maxage=300',
      // Explicitly tell caches this response varies by UA (the same URL
      // returns different HTML for browsers vs crawlers).
      vary: 'user-agent',
    },
  });
}

// ────────────────────────────────────────────────────────────────────────────

type Meta = {
  title: string;
  description: string;
  ogType: 'website' | 'article';
  ogImage: string; // absolute URL
};

function buildMetaFor(url: URL): Meta {
  const { pathname, origin } = url;

  // /r/{roomId}/join → invite
  if (/^\/r\/[^/]+\/join\/?$/.test(pathname)) {
    return {
      title: "You're invited to a room on tid",
      description:
        "You've been invited to join a shared room on tid. Tap to accept and open the app.",
      ogType: 'website',
      ogImage: `${origin}/api/og/default?type=invite`,
    };
  }

  // /r/{roomId}/n/{msgId} or /r/{roomId} → room
  if (pathname.startsWith('/r/')) {
    return {
      title: 'A shared room on tid',
      description:
        'Open this shared room on tid — the AI notebook that thinks with you.',
      ogType: 'website',
      ogImage: `${origin}/api/og/default?type=room`,
    };
  }

  // /n/{noteId} → note
  if (pathname.startsWith('/n/')) {
    return {
      title: 'A shared note on tid',
      description:
        'Open this note on tid — the AI notebook that jots, organizes, and finds every thought for you.',
      ogType: 'article',
      ogImage: `${origin}/api/og/default?type=note`,
    };
  }

  // /t/{templateId} → template
  if (pathname.startsWith('/t/')) {
    return {
      title: 'A shared template on tid',
      description: 'Add this template to your tid notebook.',
      ogType: 'website',
      ogImage: `${origin}/api/og/default?type=template`,
    };
  }

  // /open, /get → generic install / opener page
  return {
    title: 'tid — notes that think with you',
    description:
      'The AI notebook that turns voice, text, and photos into clean, findable notes.',
    ogType: 'website',
    ogImage: `${origin}/api/og/default`,
  };
}

function renderShell(url: URL, meta: Meta): string {
  const canonical = `${url.origin}${url.pathname}${url.search}`;
  const t = escapeHtml(meta.title);
  const d = escapeHtml(meta.description);
  const img = escapeHtml(meta.ogImage);
  const href = escapeHtml(canonical);

  // Deliberately minimal — the goal is a crawler-only response. Real users
  // never see this; they get index.html via the SPA rewrite.
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${t}</title>
<meta name="description" content="${d}" />

<meta property="og:type" content="${meta.ogType}" />
<meta property="og:site_name" content="tid" />
<meta property="og:title" content="${t}" />
<meta property="og:description" content="${d}" />
<meta property="og:url" content="${href}" />
<meta property="og:image" content="${img}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="${t}" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${t}" />
<meta name="twitter:description" content="${d}" />
<meta name="twitter:image" content="${img}" />

<link rel="canonical" href="${href}" />

<!-- Android App Link handoff: browsers that see this page have already
     failed to auto-open the app. Crawlers ignore it; real browsers use
     the SPA path via the vercel.json rewrite. -->
</head>
<body>
<p><a href="${href}">${t}</a></p>
<p>${d}</p>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
