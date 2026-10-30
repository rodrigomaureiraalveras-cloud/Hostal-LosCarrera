import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/* Isotipo de Opdi: dos cintas que se cruzan formando un rombo.
   La segunda va más clara, como el degradé del logo. */
export function OpdiMark(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M13 4.2 5.2 12l4.6 4.6"
        stroke="currentColor"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.7}
      />
      <path
        d="M11 19.8l7.8-7.8-4.6-4.6"
        stroke="currentColor"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const DOTS = [1.37047, 5.50007, 9.62943];

export function DotGrid(props: IconProps) {
  return (
    <svg viewBox="0 0 11 11" fill="currentColor" aria-hidden {...props}>
      {DOTS.map((cy, row) =>
        DOTS.map((cx, col) => {
          const corner = (row === 0 || row === 2) && (col === 0 || col === 2);
          return <circle key={`${row}-${col}`} cx={cx} cy={cy} r={1.37047} opacity={corner ? 0.5 : 1} />;
        }),
      )}
    </svg>
  );
}

export function PlayTriangle(props: IconProps) {
  return (
    <svg viewBox="0 0 8.13854 7.04818" fill="currentColor" aria-hidden {...props}>
      <path d="M4.06927 0L8.13854 7.04818H0L4.06927 0Z" />
    </svg>
  );
}

export function EllipseRing(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" aria-hidden {...props}>
      {Array.from({ length: 12 }, (_, i) => (
        <ellipse
          key={i}
          cx="16"
          cy="16"
          rx="3.72"
          ry="6.91"
          strokeWidth="0.6"
          transform={`rotate(${i * 15} 16 16)`}
          opacity={0.35 + (i % 3) * 0.2}
        />
      ))}
    </svg>
  );
}

function Stroke({ d, strokeWidth = "1.5", ...props }: IconProps & { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d={d} />
    </svg>
  );
}

export const ArrowUpRight = (props: IconProps) => <Stroke d="M7 17L17 7M17 7H8M17 7V16" {...props} />;
export const ArrowRight = (props: IconProps) => <Stroke d="M4 12H20M20 12L14 6M20 12L14 18" {...props} />;
export const Plus = (props: IconProps) => <Stroke d="M12 5V19M5 12H19" {...props} />;
export const Close = (props: IconProps) => <Stroke d="M6 6L18 18M18 6L6 18" {...props} />;
export const Check = (props: IconProps) => <Stroke d="M5 12.5L10 17.5L19 7" strokeWidth="1.6" {...props} />;
