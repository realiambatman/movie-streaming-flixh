type Props = { size?: number };

// Mark: a letterboxed frame with a single lamp of light in it.
export function LogoMark({ size = 28 }: Props) {
  return (
    <svg
      className="logo-mark"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="1" y="1" width="30" height="30" rx="3" fill="#000" stroke="currentColor" strokeWidth="1.5" />
      <rect x="1.75" y="1.75" width="28.5" height="6.5" fill="currentColor" opacity="0.22" />
      <rect x="1.75" y="23.75" width="28.5" height="6.5" fill="currentColor" opacity="0.22" />
      <path d="M5 21.5 L20 12.2 L20 19.8 Z" fill="currentColor" opacity="0.45" />
      <circle cx="21.5" cy="16" r="4.5" fill="currentColor" />
    </svg>
  );
}

export default function Logo({ size = 28 }: Props) {
  return (
    <span className="logo">
      <LogoMark size={size} />
      <span className="logo-word">
        FLIX <span className="logo-word-mini">Mini</span>
      </span>
    </span>
  );
}
