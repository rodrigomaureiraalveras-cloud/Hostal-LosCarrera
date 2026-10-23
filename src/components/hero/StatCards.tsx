"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { HERO, MEDIA } from "@/lib/content";
import { dw } from "@/lib/frame";
import { EASE } from "@/lib/motion";
import { useCountUp } from "@/lib/hooks";
import { AccessIcon, BathIcon, BedIcon, BusIcon, TvIcon, WifiIcon } from "@/components/ui/Icons";

const capTop = (y: number, size: number) => dw(y - 0.25 * size);

/* Coordenadas del diseño (lienzo de 1440 × 810). */
const CARD = { left: 1150, w: 256, h: 118, top1: 466, top2: 600, radius: 20 };
const BADGE = { left: 1236, top: 300, size: 150 };

/* Fichas de íconos de la segunda tarjeta. Varias caen fuera del borde a
   propósito: la tarjeta recorta con `overflow-hidden` y se leen como una
   pila que asoma. No las "acomodes" adentro. */
const CHIPS = [
  { Icon: WifiIcon, x: 196, y: -9 },
  { Icon: TvIcon, x: 231, y: 24 },
  { Icon: BathIcon, x: 186, y: 44 },
  { Icon: BedIcon, x: 224, y: 78 },
  { Icon: AccessIcon, x: 168, y: 90 },
  { Icon: BusIcon, x: 234, y: 113 },
];

const CARD_CLASS =
  "glass group pointer-events-auto absolute overflow-hidden transition-[background-color] duration-500 hover:bg-white/15";

export function StatCards() {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [first, second] = HERO.stats;
  const firstCount = useCountUp(first.value, inView, reduce, 1500);
  const secondCount = useCountUp(second.value, inView, reduce, 1500);

  const enter = (delay: number) => ({
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.97 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: reduce ? 0.2 : 1, delay, ease: EASE },
    },
  });

  const number = (left: number) => ({
    left: dw(left),
    top: capTop(30, 44),
    fontSize: dw(44),
    lineHeight: 1.2,
  });
  const label = (left: number) => ({
    left: dw(left),
    top: capTop(76, 15),
    fontSize: dw(15),
    lineHeight: 1.4,
  });
  const box = (top: number) => ({
    left: dw(CARD.left),
    top: dw(top),
    width: dw(CARD.w),
    height: dw(CARD.h),
    borderRadius: dw(CARD.radius),
  });

  return (
    <div ref={ref} className="absolute inset-0">
      {/* Chapita: la llave de la habitación, meciéndose */}
      <motion.div
        aria-hidden
        className="absolute flex items-center justify-center"
        style={{ left: dw(BADGE.left), top: dw(BADGE.top), width: dw(BADGE.size), height: dw(BADGE.size) }}
        variants={enter(0.3)}
      >
        <motion.img
          src={MEDIA.emblem}
          alt=""
          className="h-full w-auto object-contain"
          style={{ transformOrigin: "35% 35%" }}
          animate={reduce ? { rotate: -4 } : { rotate: [-6, 4, -6] }}
          transition={reduce ? { duration: 0 } : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Tarjeta 1 */}
      <motion.div className={CARD_CLASS} style={box(CARD.top1)} variants={enter(0.15)}>
        <span
          className="absolute flex items-center justify-center rounded-full bg-gold/15"
          style={{ left: dw(18), top: dw(31), width: dw(56), height: dw(56) }}
        >
          <img
            src={MEDIA.arcs}
            alt=""
            aria-hidden
            className="transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45"
            style={{ width: dw(40), height: dw(40) }}
          />
        </span>
        <p className="font-headline absolute whitespace-nowrap text-gold" style={number(90)}>
          {firstCount}
          {first.suffix}
        </p>
        <p className="absolute whitespace-nowrap text-white/65" style={label(92)}>
          {first.label}
        </p>
      </motion.div>

      {/* Tarjeta 2 */}
      <motion.div className={CARD_CLASS} style={box(CARD.top2)} variants={enter(0.25)}>
        {CHIPS.map(({ Icon, x, y }, i) => (
          <span
            key={i}
            aria-hidden
            className="absolute flex items-center justify-center rounded-full border border-gold/50 bg-night/60 text-gold transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            style={{ left: dw(x), top: dw(y), width: dw(30), height: dw(30), transitionDelay: `${i * 22}ms` }}
          >
            <Icon style={{ width: dw(15), height: dw(15) }} />
          </span>
        ))}
        <p className="font-headline absolute whitespace-nowrap text-gold" style={number(20)}>
          {secondCount}
          {second.suffix}
        </p>
        <p className="absolute whitespace-nowrap text-white/65" style={label(22)}>
          {second.label}
        </p>
      </motion.div>
    </div>
  );
}
