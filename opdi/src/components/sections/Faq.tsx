"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { FAQ, FAQ_COPY } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { Plus } from "../ui/Icons";
import { Eyebrow, Section, SectionTitle } from "../ui/Section";

export default function Faq() {
  const reduced = useReducedMotion() ?? false;
  const [open, setOpen] = useState<number | null>(0);
  const d = { duration: reduced ? 0.001 : 0.4, ease: EASE };

  return (
    <Section id="questions" className="border-t border-white/10">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Eyebrow index="05">{FAQ_COPY.eyebrow}</Eyebrow>
            <SectionTitle lines={FAQ_COPY.title} className="mt-7" />
          </div>
        </div>

        <ul className="border-t border-white/10 lg:col-span-8">
          {FAQ.map((item, index) => {
            const isOpen = open === index;
            return (
              <li key={item.q} className="border-b border-white/10">
                <h3>
                  <button
                    type="button"
                    id={`faq-trigger-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="flex w-full items-center gap-5 py-7 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    <span className="w-6 shrink-0 text-[12px] tracking-[0.2em] text-mist">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[clamp(1.05rem,2vw,1.35rem)] leading-[1.4] text-white">{item.q}</span>
                    <motion.span
                      className="ml-auto grid size-10 shrink-0 place-items-center rounded-full border border-white/20 text-white"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={d}
                    >
                      <Plus className="size-4" />
                    </motion.span>
                  </button>
                </h3>
                <motion.div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                  className="overflow-hidden"
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={d}
                >
                  <p className="max-w-[44rem] pb-8 pl-11 text-[15px] leading-[1.75] text-mist">{item.a}</p>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
