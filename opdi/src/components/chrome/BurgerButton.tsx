"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { UI } from "@/lib/content";
import { EASE } from "@/lib/motion";

/* `className` decide el posicionamiento (relative por defecto, absolute dentro del artboard).
   Dos reglas centradas que sólo se separan en y: se cruzan limpias a cualquier tamaño. */
export default function BurgerButton({
  open,
  onClick,
  className = "relative",
  style,
}: {
  open: boolean;
  onClick: () => void;
  className?: string;
  style?: CSSProperties;
}) {
  const reduced = useReducedMotion() ?? false;
  const transition = { duration: reduced ? 0.001 : 0.35, ease: EASE };
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls="menu-overlay"
      aria-label={open ? UI.closeMenu : UI.openMenu}
      className={`flex h-[18px] w-[32px] items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${className}`}
      style={style}
    >
      <motion.span
        className="absolute left-0 block h-px w-full bg-white"
        initial={false}
        animate={{ y: open ? 0 : -4, rotate: open ? 45 : 0 }}
        transition={transition}
      />
      <motion.span
        className="absolute left-0 block h-px w-full bg-white"
        initial={false}
        animate={{ y: open ? 0 : 4, rotate: open ? -45 : 0 }}
        transition={transition}
      />
    </button>
  );
}
