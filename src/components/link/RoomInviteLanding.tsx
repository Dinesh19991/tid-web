import LinkLandingShell from './LinkLandingShell';
import { useShareParams } from './useShareParams';

type Props = { roomId: string };

/**
 * Landing page for /r/{roomId}/join?t={token}.
 *
 * Uses ?name=… and ?by=… (if the app included them) to render a real
 * "Alex M invited you to Design Team" invite instead of a generic one.
 * The invite token itself lives in ?t and is forwarded verbatim to the
 * app via the intent URI.
 */
export default function RoomInviteLanding({ roomId }: Props) {
  const params = useShareParams();
  const search = typeof window !== 'undefined' ? window.location.search : '';
  const appPath = `/r/${roomId}/join${search}`;

  const title = params.name ? `Join ${params.name} on tid` : 'Join this room on tid';

  const subtitle = params.by
    ? params.name
      ? `${params.by} invited you to their shared workspace on tid.`
      : `${params.by} invited you to a shared room on tid.`
    : params.name
      ? `You've been invited to join ${params.name} on tid.`
      : "Someone invited you to a shared workspace on tid. Accept the invite in the app to start capturing notes together.";

  return (
    <LinkLandingShell
      eyebrow="You're invited"
      title={title}
      subtitle={subtitle}
      appPath={appPath}
      primaryCta="Accept invite in tid"
    >
      <div className="mx-auto max-w-md rounded-2xl border border-[#5670d8]/25 bg-[#5670d8]/[0.08] p-6">
        <div className="flex items-center gap-3">
          <div
            className="grid place-items-center w-11 h-11 rounded-xl text-white font-semibold text-[15px]"
            style={{
              background: 'linear-gradient(155deg,#1a2150,#0c1230)',
              border: '1px solid rgba(157,184,245,0.3)',
            }}
          >
            {params.name ? initial(params.name) : '✦'}
          </div>
          <div className="text-left flex-1 min-w-0">
            <div className="text-white text-[14px] font-medium truncate">
              {params.name ?? 'Room invite'}
            </div>
            <div className="text-white/60 text-[11.5px] truncate">
              {params.by ? `From ${params.by}` : 'Awaiting sign-in'}
            </div>
          </div>
        </div>
      </div>
    </LinkLandingShell>
  );
}

function initial(s: string): string {
  const c = s.trim()[0];
  return c ? c.toUpperCase() : '✦';
}
