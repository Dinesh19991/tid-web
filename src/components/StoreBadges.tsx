function AppleLogo() {
  return (
    <svg viewBox="0 0 384 512" width="22" height="22" fill="#ffffff" aria-hidden>
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function PlayLogo() {
  return (
    <svg viewBox="0 0 256 283" width="20" height="20" aria-hidden>
      <path
        fill="#EA4335"
        d="M119.553 134.916 1.06 259.882a32.14 32.14 0 0 0 47.062 19.37l133.327-76.984z"
      />
      <path
        fill="#FBBC04"
        d="m240.86 114.682-57.526-33.327-64.4 63.945 64.62 64.609 57.196-33.13c19.703-10.768 19.703-39.165.06-49.448z"
      />
      <path
        fill="#4285F4"
        d="M1.06 22.99a31.4 31.4 0 0 0-1.06 8.13v220.63c0 2.794.36 5.5 1.06 8.13l122.598-121.515z"
      />
      <path
        fill="#34A853"
        d="M120.436 141.56 181.334 81.355 48.182 4.135A32.14 32.14 0 0 0 1.06 22.99z"
      />
    </svg>
  );
}

function Badge({
  logo,
  top,
  bottom,
  href,
}: {
  logo: React.ReactNode;
  top: string;
  bottom: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-3 rounded-xl bg-white/10 backdrop-blur-md backdrop-saturate-150 border border-white/25 pl-3.5 pr-5 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_8px_30px_-12px_rgba(0,0,0,0.5)] hover:bg-white/[0.16] hover:border-white/40 transition-colors"
    >
      {logo}
      <span className="flex flex-col text-left leading-none text-white">
        <span className="text-[9.5px] tracking-[0.02em] text-white/75">
          {top}
        </span>
        <span className="text-[15px] font-semibold tracking-tight mt-1">
          {bottom}
        </span>
      </span>
    </a>
  );
}

export default function StoreBadges({ center = false }: { center?: boolean }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-3 ${
        center ? 'justify-center' : ''
      }`}
    >
      <Badge
        href="#"
        logo={<AppleLogo />}
        top="Download on the"
        bottom="App Store"
      />
      <Badge
        href="#"
        logo={<PlayLogo />}
        top="GET IT ON"
        bottom="Google Play"
      />
    </div>
  );
}
