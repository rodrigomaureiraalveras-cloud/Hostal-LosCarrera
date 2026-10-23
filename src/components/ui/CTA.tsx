"use client";

import type { CSSProperties, ReactNode } from "react";
import { Magnetic } from "@/components/ui/Magnetic";
import { ArrowElbowIcon } from "@/components/ui/Icons";

type Variant = "solid" | "ghost" | "dark";

type CTAProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  compact?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  /** Se usa en el hero para escalar el botón con el lienzo (`fontSize: dw(16)`). */
  style?: CSSProperties;
};

/* Todas las medidas van en `em`: el botón entero escala con su `font-size`. */
/* El relleno que sube al pasar el mouse es siempre el opuesto del fondo,
   para que el texto se siga leyendo. */
const SURFACE: Record<Variant, string> = {
  solid: "bg-gold text-night",
  ghost: "hairline bg-transparent text-white hover:text-night",
  dark: "bg-night text-white hover:text-night",
};

const FILL: Record<Variant, string> = {
  solid: "bg-white",
  ghost: "bg-gold",
  dark: "bg-white",
};

export function CTA({
  children,
  href,
  variant = "solid",
  compact = false,
  type = "button",
  disabled,
  onClick,
  className = "",
  style,
}: CTAProps) {
  const ghost = variant === "ghost";
  const classes = `group relative inline-flex items-center gap-[0.75em] overflow-hidden rounded-full font-bold whitespace-nowrap transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:cursor-wait disabled:opacity-70 ${
    compact ? "text-[14px]" : "text-[15px]"
  } ${ghost ? "py-[0.4em] pl-[1.6em] pr-[0.4em]" : compact ? "px-[1.6em] py-[0.85em]" : "px-[1.9em] py-[1.05em]"} ${
    SURFACE[variant]
  } ${className}`;

  const inner = (
    <>
      <span
        aria-hidden
        className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 ${FILL[variant]}`}
      />
      <span className="relative">{children}</span>
      {ghost ? (
        <span className="relative flex size-[2.4em] items-center justify-center rounded-full bg-gold text-night transition-colors duration-500 group-hover:bg-night group-hover:text-gold">
          <ArrowElbowIcon className="size-[1.1em] -rotate-90 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-0" />
        </span>
      ) : null}
    </>
  );

  return (
    <Magnetic className="inline-block" strength={0.18}>
      {href ? (
        <a href={href} className={classes} style={style}>
          {inner}
        </a>
      ) : (
        <button type={type} disabled={disabled} onClick={onClick} className={classes} style={style}>
          {inner}
        </button>
      )}
    </Magnetic>
  );
}
