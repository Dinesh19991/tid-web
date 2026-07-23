import LinkLandingShell from './LinkLandingShell';

type Props = { roomId: string };

/**
 * Landing page for /r/{roomId}.
 *
 * Rendered when a real user (not a social crawler) taps a room share
 * link and lands in a browser instead of the app — either because the
 * app isn't installed, autoVerify hasn't run yet, or they're on desktop.
 *
 * The shell auto-attempts an app launch on Android, so most of the time
 * this page just flashes briefly before the app takes over.
 */
export default function RoomLanding({ roomId }: Props) {
  return (
    <LinkLandingShell
      eyebrow="Shared room"
      title="Open this room in tid"
      subtitle="You're viewing a shared room from tid — the AI notebook. Open it in the app to see the notes, briefs, and everyone in the room."
      appPath={`/r/${roomId}`}
      primaryCta="Open room in tid"
    >
      {/* Placeholder for Phase 3 — will render room name + member avatars
          fetched from a public metadata endpoint. */}
      <div className="mx-auto max-w-md rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
        <div className="flex items-center gap-3">
          <div
            className="grid place-items-center w-11 h-11 rounded-xl text-white font-semibold text-[15px]"
            style={{
              background:
                'linear-gradient(155deg,#1a2150,#0c1230)',
              border: '1px solid rgba(255,255,255,0.14)',
            }}
          >
            r
          </div>
          <div className="text-left flex-1 min-w-0">
            <div className="text-white text-[14px] font-medium truncate">
              A shared tid room
            </div>
            <div className="text-white/45 text-[11.5px] font-mono truncate">
              {roomId}
            </div>
          </div>
        </div>
      </div>
    </LinkLandingShell>
  );
}
