import type { CSSProperties } from "react";

type MarqueeProps = {
  items: readonly string[];
  separator: string;
  duration?: number;
  direction?: "left" | "right";
  className?: string;
};

/* La lista va duplicada: la animación corre exactamente una copia (-50%),
   así la costura entre las dos no se ve nunca. */
export function Marquee({ items, separator, duration = 40, direction = "left", className = "" }: MarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div
        className="marquee-track"
        data-direction={direction}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            aria-hidden={i >= items.length}
            className="flex shrink-0 items-center"
          >
            <span className="px-[0.6em]">{item}</span>
            <span aria-hidden className="px-[0.6em] opacity-60">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
