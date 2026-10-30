"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { HERO } from "@/lib/content";
import Counter from "../ui/Counter";
import { DotGrid, EllipseRing, PlayTriangle } from "../ui/Icons";
import { c } from "./units";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export function ProductsPill({
  label = HERO.pill,
  onClick,
  style,
  className = "",
}: {
  label?: string;
  onClick: () => void;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex shrink-0 items-center border border-white/40 text-white transition-colors duration-500 hover:border-white/80 ${FOCUS} ${className}`}
      style={{ width: c(178), height: c(56), borderRadius: c(999), ...style }}
    >
      <span
        className="absolute grid place-items-center rounded-full bg-white/7 transition-all duration-500 group-hover:bg-sky/40"
        style={{ width: c(40), height: c(40), left: c(7) }}
      >
        <DotGrid className="text-white" style={{ width: c(11), height: c(11) }} />
      </span>
      <span style={{ marginLeft: c(55), fontSize: c(16), lineHeight: 1.4 }}>{label}</span>
    </button>
  );
}

export function PlayButton({
  onClick,
  style,
  label = HERO.play,
}: {
  onClick: () => void;
  style?: CSSProperties;
  label?: string;
}) {
  const reduced = useReducedMotion() ?? false;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`group relative grid shrink-0 place-items-center rounded-full border border-white/20 transition-colors duration-500 hover:border-white/50 ${FOCUS}`}
      style={{ width: c(126), height: c(126), ...style }}
    >
      {!reduced && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full border border-white/25"
          animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <span
        className="grid place-items-center rounded-full bg-white/90 transition-transform duration-500 group-hover:scale-110"
        style={{ width: c(42), height: c(42) }}
      >
        <PlayTriangle
          className="text-ink"
          style={{ width: c(9.4), height: c(8.1), transform: "rotate(90deg)", marginLeft: c(2) }}
        />
      </span>
    </button>
  );
}

export function Ring({ className, style, duration = 26 }: { className?: string; style?: CSSProperties; duration?: number }) {
  const reduced = useReducedMotion() ?? false;
  return (
    <motion.span
      aria-hidden
      className={`block shrink-0 ${className ?? ""}`}
      style={style}
      animate={reduced ? undefined : { rotate: 360 }}
      transition={reduced ? undefined : { duration, repeat: Infinity, ease: "linear" }}
    >
      <EllipseRing className="h-full w-full" />
    </motion.span>
  );
}

type Readout = { label: string; value: number; suffix: string };

export function StatReadout({
  items,
  style,
  className,
  stacked = false,
}: {
  items: Readout[];
  style?: CSSProperties;
  className?: string;
  stacked?: boolean;
}) {
  return (
    <div className={className} style={{ width: stacked ? undefined : c(216), ...style }}>
      {items.map((item, index) => (
        <div
          key={item.label}
          className="flex items-start"
          style={{
            gap: c(9),
            marginLeft: index === 1 && !stacked ? c(60) : undefined,
            marginTop: index === 1 ? c(stacked ? 20 : 82) : undefined,
          }}
        >
          <Ring className="text-sky/80" style={{ width: c(31), height: c(31) }} />
          <div className="flex flex-col" style={{ gap: c(5), fontSize: c(14), lineHeight: 1.4 }}>
            <span className="text-mist">{item.label}</span>
            <Counter value={item.value} suffix={item.suffix} className="text-white" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ScrollCue({ onClick, style }: { onClick: () => void; style?: CSSProperties }) {
  const reduced = useReducedMotion() ?? false;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={HERO.scrollLabel}
      className={`group flex flex-col items-center ${FOCUS}`}
      style={style}
    >
      <span
        className="font-extralight uppercase text-white/90"
        style={{ fontSize: c(12), letterSpacing: c(11), writingMode: "vertical-rl", lineHeight: 1.4 }}
      >
        {HERO.scroll}
      </span>
      <span className="relative w-px overflow-hidden bg-white/25" style={{ height: c(40), marginTop: c(10) }}>
        {!reduced && (
          <motion.span
            className="absolute left-0 top-0 w-px bg-white"
            style={{ height: "40%" }}
            animate={{ y: ["-100%", "250%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </span>
    </button>
  );
}
