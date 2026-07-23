import LinkLandingShell from './LinkLandingShell';
import { useShareParams } from './useShareParams';

type Props = { roomId: string };

/**
 * Landing page for /r/{roomId}.
 *
 * If the share URL carried metadata (?name=…&members=…&by=…) — as it
 * does when generated from inside the tid_app — we render a real room
 * card with the name, member count, and inviter. Otherwise we fall
 * back to a generic "A shared tid room" card.
 *
 * The auto-Android-launch happens on mount, so most users only see
 * this briefly before the app takes over.
 */
export default function RoomLanding({ roomId }: Props) {
  const params = useShareParams();
  const displayName = params.name ?? 'A shared tid room';

  const memberLabel =
    params.members !== null
      ? `${params.members} ${params.members === 1 ? 'member' : 'members'}`
      : null;

  const subtitle = params.name
    ? [memberLabel, params.by ? `shared by ${params.by}` : null]
        .filter(Boolean)
        .join(' · ') ||
      "Open it in the tid app to see the notes, briefs, and everyone in the room."
    : "You're viewing a shared room from tid — the AI notebook. Open it in the app to see the notes, briefs, and everyone in the room.";

  return (
    <LinkLandingShell
      eyebrow="Shared room"
      title={params.name ? `Open ${params.name} in tid` : 'Open this room in tid'}
      subtitle={subtitle}
      appPath={`/r/${roomId}`}
      primaryCta="Open room in tid"
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
            {initial(displayName)}
          </div>
          <div className="text-left flex-1 min-w-0">
            <div className="text-white text-[14px] font-medium truncate">
              {displayName}
            </div>
            <div className="text-white/45 text-[11.5px] truncate">
              {memberLabel ?? (
                <span className="font-mono">{roomId}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </LinkLandingShell>
  );
}

function initial(s: string): string {
  const c = s.trim()[0];
  return c ? c.toUpperCase() : 'r';
}
