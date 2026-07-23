import { useMemo } from 'react';

/**
 * Shape of the metadata the tid_app (or any share flow) can encode into
 * a share URL to give the landing page + OG image real content to
 * render — without any backend round-trip.
 *
 * Example URLs the app should generate:
 *   /r/{id}?name=Design%20Team&members=8&by=Alex%20M
 *   /r/{id}/join?t=<invite>&name=Design%20Team&by=Alex%20M
 *   /n/{id}?title=Launch%20plan&snippet=Ship%20Aug%2014…&by=Alex%20M
 *   /n/{id}?private=1
 */
export type ShareParams = {
  /** Room name / note title / template name — used in the hero copy. */
  name: string | null;
  /** Member count for rooms/invites. */
  members: number | null;
  /** Person's name — inviter for invites, author for shared notes. */
  by: string | null;
  /** Short body preview for notes. */
  snippet: string | null;
  /** When true, note is not publicly viewable — render the lock state. */
  isPrivate: boolean;
};

const EMPTY: ShareParams = {
  name: null,
  members: null,
  by: null,
  snippet: null,
  isPrivate: false,
};

/**
 * Parse the share params from the current URL. Safe on SSR (returns
 * empty). Memoized on `location.search` so React doesn't re-parse on
 * every render.
 */
export function useShareParams(): ShareParams {
  return useMemo(() => {
    if (typeof window === 'undefined') return EMPTY;
    const p = new URLSearchParams(window.location.search);
    return {
      name: nonEmpty(p.get('name')),
      members: parseCount(p.get('members')),
      by: nonEmpty(p.get('by')),
      snippet: nonEmpty(p.get('snippet')),
      isPrivate: p.get('private') === '1',
    };
  }, []);
}

function nonEmpty(s: string | null): string | null {
  if (!s) return null;
  const t = s.trim();
  return t.length > 0 ? t : null;
}

function parseCount(s: string | null): number | null {
  if (!s) return null;
  const n = parseInt(s, 10);
  return Number.isFinite(n) && n >= 0 ? n : null;
}
