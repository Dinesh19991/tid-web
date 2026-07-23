import LinkLandingShell from './LinkLandingShell';

type Props = { noteId: string };

/**
 * Landing page for /n/{noteId}.
 *
 * Notes are personal by default; only opens successfully in the app if
 * the viewer has read access. The web landing intentionally does NOT
 * render note contents — that lives behind the app's auth layer.
 */
export default function NoteLanding({ noteId }: Props) {
  return (
    <LinkLandingShell
      eyebrow="Shared note"
      title="Open this note in tid"
      subtitle="Notes on tid are private to their owner. Open the app to view this one — you'll be asked to sign in if you aren't already."
      appPath={`/n/${noteId}`}
      primaryCta="Open note in tid"
    >
      <div className="mx-auto max-w-md rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
        <div className="flex items-center gap-3">
          <div
            className="grid place-items-center w-11 h-11 rounded-xl text-white font-semibold text-[15px]"
            style={{
              background: 'linear-gradient(155deg,#1a2150,#0c1230)',
              border: '1px solid rgba(255,255,255,0.14)',
            }}
          >
            n
          </div>
          <div className="text-left flex-1 min-w-0">
            <div className="text-white text-[14px] font-medium">
              A shared tid note
            </div>
            <div className="text-white/45 text-[11.5px] font-mono truncate">
              {noteId}
            </div>
          </div>
        </div>
      </div>
    </LinkLandingShell>
  );
}
