import LinkLandingShell from './LinkLandingShell';
import { useShareParams } from './useShareParams';

type Props = { noteId: string };

/**
 * Landing page for /n/{noteId}.
 *
 * Three states:
 *   1. Private (?private=1) — clean lock state, no snippet
 *   2. Public with metadata (?title=…&snippet=…&by=…) — shows real
 *      title + snippet in the card
 *   3. Public without metadata — generic "shared note" fallback
 *
 * Notes are personal by default; we never render note contents that
 * weren't explicitly encoded into the share URL by the app.
 */
export default function NoteLanding({ noteId }: Props) {
  const params = useShareParams();

  const title = params.isPrivate
    ? 'This note is private'
    : params.name
      ? `Open “${params.name}” in tid`
      : 'Open this note in tid';

  const subtitle = params.isPrivate
    ? "You'll need to be signed in to tid — and to have access — before you can view this note."
    : params.by
      ? `Shared by ${params.by} — open the app to view the full note.`
      : "Notes on tid are private to their owner. Open the app to view this one — you'll be asked to sign in if you aren't already.";

  return (
    <LinkLandingShell
      eyebrow="Shared note"
      title={title}
      subtitle={subtitle}
      appPath={`/n/${noteId}`}
      primaryCta="Open note in tid"
    >
      <div
        className={`mx-auto max-w-md rounded-2xl p-6 ${
          params.isPrivate
            ? 'border border-white/[0.08] bg-white/[0.02]'
            : 'border border-white/[0.08] bg-white/[0.03]'
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className="grid place-items-center w-11 h-11 rounded-xl text-white font-semibold text-[15px] shrink-0"
            style={{
              background: 'linear-gradient(155deg,#1a2150,#0c1230)',
              border: '1px solid rgba(255,255,255,0.14)',
            }}
          >
            {params.isPrivate ? '🔒' : 'n'}
          </div>
          <div className="text-left flex-1 min-w-0">
            <div className="text-white text-[14px] font-medium truncate">
              {params.isPrivate
                ? 'Private note'
                : (params.name ?? 'A shared tid note')}
            </div>
            {params.snippet && !params.isPrivate ? (
              <p className="text-white/60 text-[12.5px] leading-relaxed mt-1.5 line-clamp-2">
                {params.snippet}
              </p>
            ) : (
              <div className="text-white/45 text-[11.5px] font-mono truncate mt-0.5">
                {noteId}
              </div>
            )}
          </div>
        </div>
      </div>
    </LinkLandingShell>
  );
}
