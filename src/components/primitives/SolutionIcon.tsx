import type { IconKey } from "@/data/types";

// Custom architectural line icons — brass stroke, no fill.
const paths: Record<IconKey, JSX.Element> = {
  fitout: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="0.5" />
      <path d="M3 12h9M12 4v16M12 12l9-6" />
    </>
  ),
  ceiling: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="0.5" />
      <path d="M3 9h18M3 14h18M9 4v16M15 4v16" />
    </>
  ),
  partition: (
    <>
      <path d="M4 4v16M12 4v16M20 4v16" />
      <path d="M4 12h8M12 8h8" />
    </>
  ),
  glass: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="0.5" />
      <path d="M12 4v16M7 8l4 4M15 9l3 3" />
    </>
  ),
  cladding: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="0.5" />
      <path d="M3 9h18M3 14h18M8 4v5M16 9v5M11 14v6" />
    </>
  ),
  washroom: (
    <>
      <path d="M8 3v4M8 7h4a4 4 0 0 1-8 0Z" />
      <path d="M6 11v3a5 5 0 0 0 10 0v-3M18 20H8" />
      <path d="M17 4h3v4" />
    </>
  ),
  bespoke: (
    <>
      <path d="M12 3l2.2 5.6L20 10l-4.5 3.4L17 20l-5-3.4L7 20l1.5-6.6L4 10l5.8-1.4Z" />
    </>
  ),
  trades: (
    <>
      <path d="M14.5 5.5a3.5 3.5 0 0 0-4.9 4.2L4 15.3 6.7 18l5.6-5.6a3.5 3.5 0 0 0 4.2-4.9l-2.4 2.4-1.8-1.8Z" />
      <path d="M15 15l4 4" />
    </>
  ),
};

export function SolutionIcon({ icon, className, size = 40 }: { icon: IconKey; className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.1}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {paths[icon]}
    </svg>
  );
}
