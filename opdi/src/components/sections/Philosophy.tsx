"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { IMAGES } from "@/lib/assets";
import { PHILOSOPHY, PHILOSOPHY_POINTS } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { useChrome } from "../chrome/SiteChrome";
import AnimatedText from "../ui/AnimatedText";
import { ArrowRight, Plus } from "../ui/Icons";
import Parallax from "../ui/Parallax";
import { Eyebrow, Fade, Section, SectionTitle } from "../ui/Section";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export default function Philosophy() {
  const { go } = useChrome();
  const reduced = useReducedMotion() ?? false;
  const [open, setOpen] = useState(0);
  const d = (duration: number) => ({ duration: reduced ? 0.001 : duration, ease: EASE });

  return (
    <Section id="method" className="border-t border-white/10">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Eyebrow index="01">{PHILOSOPHY.eyebrow}</Eyebrow>
          <SectionTitle lines={PHILOSOPHY.title} className="mt-7" />
          <AnimatedText
            as="p"
            mode="lines"
            animateOnMount={false}
            stagger={0.09}
            lines={PHILOSOPHY.body}
            className="mt-8 max-w-[30rem] text-[16px] leading-[1.7] text-mist"
          />
          <Fade delay={0.2} className="mt-10">
            <button
              type="button"
              onClick={() => go("services")}
              className={`group inline-flex h-14 items-center gap-4 rounded-full border border-white/30 pl-7 pr-3 text-[15px] text-white transition-colors duration-500 hover:border-white/70 ${FOCUS}`}
            >
              {PHILOSOPHY.cta}
              <span className="grid size-10 place-items-center rounded-full bg-white/10">
                <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </button>
          </Fade>
        </div>

        <div className="lg:col-span-7">
          <Parallax distance={46}>
            <div className="relative overflow-hidden rounded-[40px] bg-paper">
              <img src={IMAGES.mossBranch} alt={PHILOSOPHY.imageAlt} className="aspect-[16/10] w-full object-cover" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-6">
                <p className="max-w-[16rem] font-display text-[clamp(1.1rem,2vw,1.6rem)] leading-[1.15] tracking-[-0.09em] text-paper-ink">
                  {PHILOSOPHY.plateLine}
                </p>
                <span className="shrink-0 rounded-full bg-white/85 px-4 py-2 text-[12px] uppercase tracking-[0.18em] text-paper-ink">
                  {PHILOSOPHY.plateChip}
                </span>
              </div>
            </div>
          </Parallax>

          <ul className="mt-12 border-t border-white/10">
            {PHILOSOPHY_POINTS.map((point, index) => {
              const isOpen = open === index;
              return (
                <li key={point.n} className="border-b border-white/10">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    className={`flex w-full items-center gap-5 py-6 text-left ${FOCUS}`}
                  >
                    <span className="w-6 shrink-0 text-[12px] tracking-[0.2em] text-mist">{point.n}</span>
                    <span className="font-display text-[clamp(1.15rem,2.2vw,1.75rem)] tracking-[-0.08em] text-white">
                      {point.title}
                    </span>
                    <motion.span
                      className="ml-auto grid size-9 shrink-0 place-items-center rounded-full border border-white/20 text-white"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={d(0.4)}
                    >
                      <Plus className="size-4" />
                    </motion.span>
                  </button>
                  <motion.div
                    className="overflow-hidden"
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={d(0.5)}
                  >
                    <p className="pb-7 pl-11 pr-10 text-[15px] leading-[1.7] text-mist">{point.body}</p>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
