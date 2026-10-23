"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { riseIn, stagger } from "@/lib/motion";

/** Contenedor que escalona la entrada de sus `Rise` al entrar en pantalla. */
export function Reveal({
  children,
  className,
  each = 0.08,
  delay = 0.1,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  each?: number;
  delay?: number;
  as?: "div" | "ul" | "ol";
}) {
  const reduce = useReducedMotion() ?? false;
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      className={className}
      variants={stagger(reduce, each, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
    >
      {children}
    </Tag>
  );
}

/** Hijo de `Reveal`: sube y aparece. */
export function Rise({
  children,
  className,
  y = 24,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li" | "p";
}) {
  const reduce = useReducedMotion() ?? false;
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag className={className} variants={riseIn(reduce, y)}>
      {children}
    </Tag>
  );
}
