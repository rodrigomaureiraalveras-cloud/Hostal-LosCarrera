"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { HERO, MEDIA } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { BedIcon, CheckIcon, PhoneIcon, PinIcon, SignalIcon, TvIcon, WifiIcon } from "@/components/ui/Icons";

const MENU_ICONS = [BedIcon, TvIcon, PinIcon, PhoneIcon];

/**
 * El teléfono del hero, dibujado con HTML (no es una foto): muestra la
 * pantalla de reservas de la hostal. Todas las medidas van en `em`, así que el
 * tamaño lo decide quien lo usa con `fontSize` (1em = 10 px del diseño).
 * Mide 29 × 60 em. Los textos salen de `HERO.phone` en content.ts.
 */
export function PhoneMockup({ reduce, style }: { reduce: boolean; style?: CSSProperties }) {
  return (
    <div
      aria-hidden
      className="relative h-[60em] w-[29em] rounded-[4.6em] bg-steel p-[0.9em]"
      style={{
        boxShadow:
          "0 4em 9em -2em rgba(0,0,0,0.75), 0 0 0 0.16em rgba(92,200,240,0.55), inset 0 0 0 0.12em rgba(255,255,255,0.12)",
        ...style,
      }}
    >
      <div
        className="relative h-full overflow-hidden rounded-[3.8em] bg-navy"
        style={{ backgroundImage: "linear-gradient(170deg, rgba(255,255,255,0.06), rgba(11,20,32,0.55) 70%)" }}
      >
        <span className="absolute left-1/2 top-[1.3em] h-[1.9em] w-[8.5em] -translate-x-1/2 rounded-full bg-night" />
        <SignalIcon className="absolute right-[2.4em] top-[1.6em] size-[1.5em] text-white/70" />

        <img src={MEDIA.logo} alt="" className="mx-auto mt-[4.4em] block w-[10.5em]" />

        <p className="mx-auto mt-[2.9em] flex w-fit items-center gap-[0.6em] rounded-full border border-white/10 px-[1.1em] py-[0.5em] text-white/70">
          <WifiIcon className="size-[1.3em] text-gold" />
          <span className="text-[1.05em] leading-none">{HERO.phone.status}</span>
        </p>

        <ul className="mt-[1.8em] flex flex-col gap-[1em] px-[1.8em]">
          {HERO.phone.menu.map((label, i) => {
            const Icon = MENU_ICONS[i % MENU_ICONS.length];
            return (
              <li
                key={label}
                className="flex h-[5.2em] items-center gap-[1.2em] rounded-[1.4em] border border-white/10 bg-white/[0.06] px-[1.2em]"
              >
                <span className="flex size-[3em] shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Icon className="size-[1.6em]" />
                </span>
                <span className="text-[1.45em] font-semibold text-white">{label}</span>
              </li>
            );
          })}
        </ul>

        <motion.p
          className="absolute inset-x-[1.8em] bottom-[2.2em] flex items-center gap-[0.9em] rounded-[1.5em] bg-gold px-[1.3em] py-[1.1em] text-night"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: "2em", scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduce ? 0.2 : 0.8, delay: reduce ? 0 : 1.6, ease: EASE }}
        >
          <CheckIcon className="size-[2em] shrink-0" />
          <span className="text-[1.45em] font-bold leading-none">{HERO.phone.toast}</span>
        </motion.p>
      </div>
    </div>
  );
}
