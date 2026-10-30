"use client";

import { motion, useReducedMotion, type MotionStyle } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

type Props = {
  lines: string[];
  mode?: "chars" | "lines";
  className?: string;
  style?: MotionStyle;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "div" | "h1" | "h2" | "h3" | "p";
  animateOnMount?: boolean;
};

function Piece({
  children,
  delay,
  reduced,
  block = false,
}: {
  children: ReactNode;
  delay: number;
  reduced: boolean;
  block?: boolean;
}) {
  return (
    <motion.span
      className={`${block ? "block" : "inline-block"} will-change-transform`}
      variants={{
        /* Con movimiento la pieza sube detrás de la máscara; sin él, aparece por opacidad. */
        hidden: { y: reduced ? 0 : "110%", opacity: reduced ? 0 : 1 },
        visible: {
          y: 0,
          opacity: 1,
          transition: { duration: reduced ? 0.001 : 0.8, ease: EASE, delay: reduced ? 0 : delay },
        },
      }}
    >
      {children}
    </motion.span>
  );
}

export default function AnimatedText({
  lines,
  mode = "chars",
  className,
  style,
  lineClassName,
  delay = 0,
  stagger,
  as = "div",
  animateOnMount = true,
}: Props) {
  const reduced = useReducedMotion() ?? false;
  const Tag = motion[as] as typeof motion.div;
  const step = stagger ?? (mode === "chars" ? 0.028 : 0.12);
  const trigger = animateOnMount
    ? { initial: "hidden", animate: "visible" }
    : { initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.4 } };

  /* El contador de letras corre a través de todas las líneas. */
  let own = 0;

  return (
    <Tag
      className={className}
      style={style}
      variants={{ hidden: {}, visible: { transition: { delayChildren: reduced ? 0 : delay } } }}
      {...trigger}
    >
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className={`block overflow-hidden ${lineClassName ?? ""}`}>
          {mode === "lines" ? (
            <Piece block reduced={reduced} delay={delay + lineIndex * step}>
              {line}
            </Piece>
          ) : (
            Array.from(line).map((char, charIndex) => {
              const at = delay + own++ * step;
              return (
                <Piece key={charIndex} reduced={reduced} delay={at}>
                  {char === " " ? " " : char}
                </Piece>
              );
            })
          )}
        </span>
      ))}
    </Tag>
  );
}
