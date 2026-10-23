"use client";

import { useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";
import { TESTIMONIALS } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { SectionHead } from "@/components/ui/SectionHead";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/Icons";

export function Community() {
  const reduce = useReducedMotion() ?? false;
  const items = TESTIMONIALS.items;
  const total = items.length;
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const step = (delta: number) => setState(([i]) => [(i + delta + total) % total, delta]);
  const shift = reduce ? 0 : 60;
  const item = items[index];

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    }
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) step(1);
    else if (info.offset.x > 60) step(-1);
  };

  const arrow =
    "flex size-[48px] items-center justify-center rounded-full border border-white/29 text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-gold hover:bg-gold hover:text-night";

  return (
    <section id="community" className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1080px]">
        <SectionHead kicker={TESTIMONIALS.kicker} title={TESTIMONIALS.title} accent={TESTIMONIALS.accent} lead={TESTIMONIALS.lead} />

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label={TESTIMONIALS.regionLabel}
          tabIndex={0}
          onKeyDown={onKey}
          className="mt-14 rounded-[28px] outline-offset-4"
        >
          <div className="glass relative min-h-[340px] overflow-hidden rounded-[28px] p-8 md:min-h-[400px] md:p-14">
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.figure
                key={item.title}
                custom={dir}
                drag={reduce ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={onDragEnd}
                initial={{ opacity: 0, x: dir * shift }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -shift }}
                transition={{ duration: 0.55, ease: EASE }}
                className="grid cursor-grab select-none items-center gap-8 active:cursor-grabbing md:grid-cols-[minmax(0,1fr)_220px] md:gap-12"
              >
                <div>
                  <p className="font-headline text-[14px] tracking-[0.2em] text-gold">
                    {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </p>
                  <blockquote className="font-headline mt-4 text-[clamp(32px,4.6vw,60px)] uppercase leading-[0.98] text-white">
                    {item.title}
                  </blockquote>
                  <figcaption className="mt-6 max-w-[520px] text-[17px] leading-[1.55] text-white/70">{item.body}</figcaption>
                </div>
                <img
                  src={item.image}
                  alt=""
                  draggable={false}
                  className="hidden aspect-[4/5] w-full rounded-[20px] object-cover shadow-[0_0_0_1px_rgba(92,200,240,0.35)] md:block"
                />
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {items.map((t, i) => (
                <button
                  key={t.title}
                  type="button"
                  aria-label={TESTIMONIALS.goTo(i + 1)}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  className={`h-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    i === index ? "w-8 bg-gold" : "w-1.5 bg-white/35 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button type="button" aria-label={TESTIMONIALS.prevLabel} onClick={() => step(-1)} className={arrow}>
                <ArrowLeftIcon className="size-5" />
              </button>
              <button type="button" aria-label={TESTIMONIALS.nextLabel} onClick={() => step(1)} className={arrow}>
                <ArrowRightIcon className="size-5" />
              </button>
            </div>
          </div>

          <p className="sr-only" aria-live="polite">
            {TESTIMONIALS.announce(index + 1, total, item.title)}
          </p>
        </div>
      </div>
    </section>
  );
}
