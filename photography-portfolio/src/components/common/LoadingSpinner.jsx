/**
 * An aperture-blade style loading indicator, in keeping with the
 * photographic material of the rest of the site.
 */
export default function LoadingSpinner({ label = 'Loading', size = 40 }) {
  return (
    <div
      role="status"
      aria-label={label}
      className="flex flex-col items-center justify-center gap-3 py-12"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        className="animate-spin text-safelight"
        style={{ animationDuration: '1.4s' }}
      >
        <circle
          cx="20"
          cy="20"
          r="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="26 74"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-mono text-[11px] uppercase tracking-widest2 text-parchment-dim">
        {label}
      </span>
    </div>
  )
}
