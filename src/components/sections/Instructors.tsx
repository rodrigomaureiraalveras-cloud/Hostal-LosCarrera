"use client";

import { useState, type PointerEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { INSTRUCTORS } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { usePointerFine } from "@/lib/hooks";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal, Rise } from "@/components/ui/Reveal";
import { PlusIcon } from "@/components/ui/Icons";

export function Instructors() {
  const reduce = useReducedMotion() ?? false;
  const fine = usePointerFine();
  const follow = fine && !reduce;
  const [open, setOpen] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 24, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 160, damping: 24, mass: 0.5 });
  const onMove = (e: PointerEvent) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  /* Refleja la fila bajo el cursor o, si no hay, la que está abierta. */
  const [inside, setInside] = useState(false);
  const index = hovered ?? (inside ? open : null);
  const shown = index !== null ? INSTRUCTORS.people[index] : null;

  return (
    <section id="instructors" className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <SectionHead kicker={INSTRUCTORS.kicker} title={INSTRUCTORS.title} accent={INSTRUCTORS.accent} lead={INSTRUCTORS.lead} />

        <div
          onPointerMove={follow ? onMove : undefined}
          onPointerEnter={() => setInside(true)}
          onPointerLeave={() => {
            setInside(false);
            setHovered(null);
          }}
        >
          <Reveal as="ul" className="mt-14 border-t border-white/15" each={0.06}>
            {INSTRUCTORS.people.map((p, i) => {
              const isOpen = open === i;
              const panelId = `instructor-${i}`;
              return (
                <Rise as="li" key={p.name} className="border-b border-white/15">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    onPointerEnter={() => setHovered(i)}
                    onFocus={() => setHovered(i)}
                    onBlur={() => setHovered(null)}
                    className="group flex w-full items-center gap-4 py-6 text-left md:gap-8 md:py-8"
                  >
                    <span className="w-[5rem] shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
                      {p.badge}
                    </span>
                    <img src={p.image} alt="" className="size-11 shrink-0 rounded-full object-cover md:hidden" />
                    <span className="font-headline min-w-0 flex-1 truncate text-[clamp(26px,4.6vw,64px)] uppercase leading-tight text-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 md:group-hover:translate-x-4">
                      {p.name}
                    </span>
                    <span className="hidden w-[14rem] shrink-0 text-[14px] text-white/60 md:block">{p.role}</span>
                    <span
                      aria-hidden
                      className={`flex size-[38px] shrink-0 items-center justify-center rounded-full border border-white/29 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen ? "rotate-45 border-gold bg-gold text-night" : "text-white"
                      }`}
                    >
                      <PlusIcon className="size-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={panelId}
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0.2 : 0.55, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-8 pb-8 md:pl-[7rem]">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="hidden h-[180px] w-[140px] shrink-0 rounded-[14px] object-cover md:block"
                          />
                          <div className="max-w-[560px]">
                            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-white/50 md:hidden">
                              {p.role}
                            </p>
                            <p className="mt-2 text-[16px] leading-[1.6] text-white/75 md:mt-0">{p.bio}</p>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </Rise>
              );
            })}
          </Reveal>
        </div>
      </div>

      {follow ? (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-40 -ml-[110px] -mt-[140px] h-[280px] w-[220px] overflow-hidden rounded-[16px]"
          style={{ x: sx, y: sy }}
        >
          <AnimatePresence mode="wait">
            {shown ? (
              <motion.img
                key={shown.name}
                src={shown.image}
                alt=""
                className="h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.15, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.45, ease: EASE } }}
                exit={{ opacity: 0, transition: { duration: 0.22 } }}
              />
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </section>
  );
}
