"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CLASSES, LEVELS } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { SectionHead } from "@/components/ui/SectionHead";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { CTA } from "@/components/ui/CTA";
import { ArrowUpRightIcon } from "@/components/ui/Icons";

type Level = (typeof LEVELS)[number];
type ClassItem = (typeof CLASSES.items)[number];

function ClassCard({ item }: { item: ClassItem }) {
  return (
    <article className="group">
      <MediaFrame
        src={item.image}
        alt={item.title}
        ratio="4 / 5"
        parallax={"parallax" in item ? item.parallax : undefined}
        className="rounded-[22px]"
      >
        <span className="glass absolute left-4 top-4 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
          {item.level}
        </span>
        <span
          aria-hidden
          className="absolute right-4 top-4 flex size-[38px] items-center justify-center rounded-full bg-gold text-night opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:opacity-100"
        >
          <ArrowUpRightIcon className="size-4" />
        </span>
      </MediaFrame>
      <h3 className="font-headline mt-5 text-[26px] uppercase leading-tight text-white">{item.title}</h3>
      <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-gold">{item.tag}</p>
      <p className="mt-3 text-[15px] leading-[1.55] text-white/65">{item.copy}</p>
    </article>
  );
}

export function Classes() {
  const reduce = useReducedMotion() ?? false;
  const [level, setLevel] = useState<Level>(LEVELS[0]);
  const visible = useMemo(
    () => (level === LEVELS[0] ? CLASSES.items : CLASSES.items.filter((c) => c.level === level)),
    [level],
  );

  return (
    <section id="classes" className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead kicker={CLASSES.kicker} title={CLASSES.title} accent={CLASSES.accent} lead={CLASSES.lead} />
          <div role="group" aria-label={CLASSES.filterLabel} className="flex flex-wrap gap-2">
            {LEVELS.map((l) => {
              const on = l === level;
              return (
                <button
                  key={l}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setLevel(l)}
                  className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    on ? "border-gold bg-gold text-night" : "border-white/30 text-white hover:border-gold hover:text-gold"
                  }`}
                >
                  {l}
                </button>
              );
            })}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {CLASSES.announce(visible.length, level)}
        </p>

        <motion.div layout={!reduce} className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((item) => (
              <motion.div
                key={item.title}
                layout={!reduce}
                initial={{ opacity: 0, y: 26, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.98 }}
                transition={{ duration: reduce ? 0.2 : 0.6, ease: EASE }}
              >
                <ClassCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-16 flex justify-center">
          <CTA href={CLASSES.cta.href} variant="ghost">
            {CLASSES.cta.label}
          </CTA>
        </div>
      </div>
    </section>
  );
}
