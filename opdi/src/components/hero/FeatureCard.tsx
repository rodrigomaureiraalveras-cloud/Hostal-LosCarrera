"use client";

import type { CSSProperties } from "react";
import { DotGrid } from "../ui/Icons";
import { c } from "./units";

/* Las dos tarjetas de 296x280 del frame. Son navegación: por eso son botones. */
export default function FeatureCard({
  kicker,
  titleLines,
  image,
  imageAlt,
  layout,
  onClick,
  style,
  className = "",
}: {
  kicker: string;
  titleLines: string[];
  image: string;
  imageAlt: string;
  layout: "bottom" | "top";
  onClick: () => void;
  style?: CSSProperties;
  className?: string;
}) {
  const bottom = layout === "bottom";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative block overflow-hidden bg-paper text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${className}`}
      style={{ width: c(296), height: c(280), borderRadius: c(40), ...style }}
    >
      {bottom ? (
        <img
          src={image}
          alt={imageAlt}
          className="pointer-events-none absolute max-w-none select-none transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
          style={{ width: "236%", left: "-44%", bottom: "-12%", transformOrigin: "50% 100%" }}
        />
      ) : (
        <span
          className="absolute overflow-hidden"
          style={{ width: c(486), height: c(324), left: c(-16), top: c(-13), transform: "rotate(-6.67deg)" }}
        >
          <img
            src={image}
            alt={imageAlt}
            className="h-full w-full max-w-none object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
          />
          {/* El ángulo del degradé es el que hace leer la placa como inclinada. */}
          <span
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(191.23deg, color-mix(in srgb, var(--color-paper) 0%, transparent) 73.43%, var(--color-paper) 88.52%)",
            }}
          />
        </span>
      )}

      <span
        className="absolute flex flex-col text-paper-ink"
        style={
          bottom
            ? { left: c(41), top: c(38), width: c(180) }
            : { left: c(41), bottom: c(26), width: c(180) }
        }
      >
        <span className="font-light" style={{ fontSize: c(16), lineHeight: 1.4, letterSpacing: c(-0.32) }}>
          {kicker}
        </span>
        <span
          className="font-display"
          style={{
            fontSize: c(24),
            letterSpacing: c(-2.4),
            marginTop: c(bottom ? 10 : 8),
            lineHeight: bottom ? 1.04 : 1.35,
          }}
        >
          {titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </span>
      </span>

      <span
        className="absolute grid place-items-center rounded-full bg-white transition-transform duration-500 ease-out group-hover:scale-110"
        style={{ width: c(54), height: c(54), right: c(20), bottom: c(20) }}
      >
        <DotGrid className="text-sky-deep" style={{ width: c(11), height: c(11) }} />
      </span>
    </button>
  );
}
