"use client";

import { motion, useReducedMotion } from "framer-motion";
import { riseIn, stagger } from "@/lib/motion";
import { SplitText } from "@/components/ui/SplitText";

type SectionHeadProps = {
  kicker: string;
  title: string;
  /** Segunda línea del título, en celeste. */
  accent?: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHead({ kicker, title, accent, lead, align = "left", className = "" }: SectionHeadProps) {
  const reduce = useReducedMotion() ?? false;
  const center = align === "center";

  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-[720px] ${className}`}>
      <motion.p
        className={`mb-5 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-gold ${
          center ? "justify-center" : ""
        }`}
        variants={riseIn(reduce, 12)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
      >
        <span aria-hidden className="h-px w-8 bg-gold" />
        {kicker}
      </motion.p>
      <SplitText
        text={title}
        by="letter"
        each={0.024}
        className="font-headline text-[clamp(40px,6.4vw,92px)] uppercase leading-[0.95] tracking-[-0.01em] text-white"
      />
      {accent ? (
        <SplitText
          text={accent}
          by="letter"
          each={0.024}
          as="p"
          className="font-headline text-[clamp(40px,6.4vw,92px)] uppercase leading-[0.95] tracking-[-0.01em] text-gold"
        />
      ) : null}
      {lead ? (
        <motion.p
          className={`mt-6 max-w-[560px] text-[16px] leading-[1.55] text-white/70 md:text-[17px] ${
            center ? "mx-auto" : ""
          }`}
          variants={stagger(reduce)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <motion.span className="block" variants={riseIn(reduce, 16)}>
            {lead}
          </motion.span>
        </motion.p>
      ) : null}
    </div>
  );
}
