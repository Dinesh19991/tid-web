import LinkLandingShell from './LinkLandingShell';

type Props = { roomId: string };

/**
 * Landing page for /r/{roomId}/join?t={token}.
 *
 * The invite token is preserved in the URL and passed through to the
 * app via the intent URI. The app's DeepLinkService reads the query
 * string and routes to RoomJoinRequestSheet which calls the invite
 * resolver Cloud Function.
 */
export default function RoomInviteLanding({ roomId }: Props) {
  // Preserve any query params (?t=<token>) when handing off to the app.
  const search = typeof window !== 'undefined' ? window.location.search : '';
  const appPath = `/r/${roomId}/join${search}`;

  return (
    <LinkLandingShell
      eyebrow="You're invited"
      title="Join this room on tid"
      subtitle="Someone invited you to a shared workspace on tid. Accept the invite in the app to start capturing notes together."
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
            ✦
          </div>
          <div className="text-left flex-1 min-w-0">
            <div className="text-white text-[14px] font-medium">
              Room invite
            </div>
            <div className="text-white/50 text-[11.5px] font-mono truncate">
              {roomId}
            </div>
          </div>
        </div>
      </div>
    </LinkLandingShell>
  );
}
