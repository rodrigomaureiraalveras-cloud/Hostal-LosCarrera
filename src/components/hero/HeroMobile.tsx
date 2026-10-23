"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { BACKGROUNDS, HERO, MEDIA } from "@/lib/content";
import { mw } from "@/lib/frame";
import { EASE, stagger } from "@/lib/motion";
import { useCountUp } from "@/lib/hooks";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { AccessIcon, ArrowElbowIcon, BathIcon, BedIcon, BusIcon, TvIcon, WifiIcon } from "@/components/ui/Icons";
import { PhoneMockup } from "@/components/hero/PhoneMockup";

/* ── Coordenadas del diseño (lienzo de 440 × 956) ── */
const capTop = (y: number, size: number) => mw(y - 0.25 * size);
const FIGMA_BLUR = 0.5;

const TYPE_SIZE = 92;
const CAP = TYPE_SIZE * 0.7;
const LEFT = 20;
const LINE1 = 112;
const LINE2 = LINE1 + CAP + 14;
/* Ancho medido de "H" a este tamaño. */
const GE_W = 48;
/* En celular el anillo no lleva sombra enmascarada: puede tener su propia proporción. */
const RING = { left: LEFT + GE_W + 6, top: LINE1 - 1, w: 317, h: CAP, border: 11, radius: CAP / 2 };
const PHONE = { cx: 220, cy: 606, em: 6.2 };
const CARD_1 = { left: 14, top: 650, w: 158, h: 100 };
const CARD_2 = { left: 268, top: 490, w: 158, h: 100 };
const CHIPS = [WifiIcon, TvIcon, BathIcon, BedIcon, AccessIcon, BusIcon];

/* Celular: sin paralaje de scroll ni de cursor. Solo la entrada. */
export function HeroMobile() {
  const reduce = useReducedMotion() ?? false;
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { once: true, margin: "-10%" });
  const [first, second] = HERO.stats;
  const firstCount = useCountUp(first.value, inView, reduce, 1400);
  const secondCount = useCountUp(second.value, inView, reduce, 1500);
  const [cta] = HERO.buttons;

  const d = (delay: number) => (reduce ? 0 : delay);
  const rise = (delay = 0, y = 22): Variants => ({
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.2 : 0.95, delay: d(delay), ease: EASE } },
  });
  const fade = (duration: number, delay = 0): Variants => ({
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: reduce ? 0.2 : duration, delay: d(delay), ease: EASE } },
  });
  const sharpen = (delay: number): Variants => ({
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 26, filter: `blur(${mw(24 * FIGMA_BLUR)})` },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: reduce ? 0.2 : 1.3, delay: d(delay), ease: EASE } },
  });
  const ringIn: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, scaleX: 0.7 },
    show: { opacity: 1, scaleX: 1, transition: { duration: reduce ? 0.2 : 1.2, delay: d(0.2), ease: EASE } },
  };
  const phoneIn: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 46, scale: 1.04 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: reduce ? 0.2 : 1.4, ease: EASE } },
  };

  const typeText = { fontSize: mw(TYPE_SIZE), lineHeight: 1.2, letterSpacing: mw(-1) } as const;
  const box = (c: typeof CARD_1) => ({
    left: mw(c.left),
    top: mw(c.top),
    width: mw(c.w),
    height: mw(c.h),
    borderRadius: mw(18),
  });
  const number = (y: number) => ({ left: mw(16), top: capTop(y, 36), fontSize: mw(36), lineHeight: 1.2 });
  const label = (y: number) => ({ left: mw(17), top: capTop(y, 12.5), fontSize: mw(12.5), lineHeight: 1.4 });

  return (
    <div className="relative isolate min-h-svh w-full overflow-hidden bg-night md:hidden">
      <SectionBackdrop layers={BACKGROUNDS.heroMobile} className="-z-10" />

      <div className="relative flex min-h-svh items-center">
        <motion.div
          ref={stageRef}
          className="frame frame-mobile relative"
          variants={stagger(reduce, 0.07, 0.15)}
          initial="hidden"
          animate="show"
        >
          {/* Arcos plateados detrás del teléfono */}
          <motion.div aria-hidden className="pointer-events-none absolute inset-0" variants={fade(1.5)}>
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 opacity-20"
              style={{ left: mw(PHONE.cx), top: mw(PHONE.cy), width: mw(560), height: mw(560) }}
            >
              <img src={MEDIA.arcs} alt="" className="block h-full w-full" />
            </div>
          </motion.div>

          {/* Sombra celeste en el suelo */}
          <motion.div aria-hidden className="pointer-events-none absolute inset-0" variants={fade(1.1, 0.5)}>
            <div
              className="absolute -translate-x-1/2 rounded-[50%]"
              style={{
                left: mw(PHONE.cx),
                top: mw(PHONE.cy + 186 + 6),
                width: mw(280),
                height: mw(30),
                background: "radial-gradient(closest-side, rgba(92,200,240,0.35), transparent)",
                filter: `blur(${mw(6)})`,
              }}
            />
          </motion.div>

          {/* Título */}
          <h1 className="sr-only">{HERO.srTitle}</h1>
          <motion.span
            aria-hidden
            className="font-headline absolute whitespace-nowrap uppercase text-white"
            style={{ left: mw(LEFT), top: capTop(LINE1, TYPE_SIZE), ...typeText }}
            variants={sharpen(0)}
          >
            {HERO.brandParts.ge}
          </motion.span>
          <motion.span
            aria-hidden
            className="absolute border-solid border-gold"
            style={{
              left: mw(RING.left),
              top: mw(RING.top),
              width: mw(RING.w),
              height: mw(RING.h),
              borderWidth: mw(RING.border),
              borderRadius: mw(RING.radius),
              transformOrigin: "left center",
            }}
            variants={ringIn}
          />
          <motion.span
            aria-hidden
            className="font-headline absolute whitespace-nowrap uppercase text-gold"
            style={{ left: mw(LEFT), top: capTop(LINE2, TYPE_SIZE), ...typeText }}
            variants={sharpen(0.08)}
          >
            {HERO.brandParts.rig}
          </motion.span>

          {/* Lema */}
          <motion.div
            className="absolute flex items-center font-bold uppercase leading-[1.25] text-white"
            style={{ left: mw(LEFT), top: mw(LINE2 + CAP + 28), gap: mw(14), fontSize: mw(14) }}
            variants={rise(0.15)}
          >
            <p className="whitespace-nowrap">
              {HERO.tagline[0][0]}
              <br />
              <span className="text-gold">{HERO.tagline[0][1]}</span>
            </p>
            <span aria-hidden className="relative flex shrink-0 items-center justify-center" style={{ width: mw(8.231), height: mw(30) }}>
              <span className="block shrink-0 bg-gold" style={{ width: mw(31), height: "1px", transform: "rotate(-73.87deg)" }} />
            </span>
            <p className="whitespace-nowrap">
              {HERO.tagline[1][0]}
              <br />
              <span className="text-gold">{HERO.tagline[1][1]}</span>
            </p>
          </motion.div>

          {/* Párrafo */}
          <motion.p
            className="absolute text-white/75"
            style={{ left: mw(LEFT), top: mw(LINE2 + CAP + 84), width: mw(400), fontSize: mw(14), lineHeight: 1.45 }}
            variants={rise(0.2)}
          >
            {HERO.body}
          </motion.p>

          {/* El teléfono */}
          <motion.div
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: mw(PHONE.cx), top: mw(PHONE.cy), fontSize: mw(PHONE.em) }}
            variants={phoneIn}
          >
            <div className="-rotate-6">
              <PhoneMockup reduce={reduce} />
            </div>
          </motion.div>

          {/* Tarjeta HERO.stats[1] */}
          <motion.div className="glass absolute overflow-hidden" style={box(CARD_2)} variants={rise(0.28, 26)}>
            <div aria-hidden className="absolute flex items-center" style={{ left: mw(16), top: mw(12) }}>
              {CHIPS.map((Icon, i) => (
                <span
                  key={i}
                  className="flex shrink-0 items-center justify-center rounded-full border border-gold/50 bg-night text-gold"
                  style={{ width: mw(20), height: mw(20), marginRight: mw(-3), opacity: 1 - i * 0.14 }}
                >
                  <Icon style={{ width: mw(11), height: mw(11) }} />
                </span>
              ))}
            </div>
            <p className="font-headline absolute whitespace-nowrap text-gold" style={number(44)}>
              {secondCount}
              {second.suffix}
            </p>
            <p className="absolute whitespace-nowrap text-white/65" style={label(82)}>
              {second.label}
            </p>
          </motion.div>

          {/* Tarjeta HERO.stats[0] */}
          <motion.div className="glass absolute" style={box(CARD_1)} variants={rise(0.36, 26)}>
            <p className="font-headline absolute whitespace-nowrap text-gold" style={number(22)}>
              {firstCount}
              {first.suffix}
            </p>
            <p className="absolute whitespace-nowrap text-white/65" style={label(62)}>
              {first.label}
            </p>
            <span
              aria-hidden
              className="absolute flex items-center justify-center rounded-full border-solid border-gold/60 text-gold"
              style={{ right: mw(6), bottom: mw(6), width: mw(26.934), height: mw(26.934), borderWidth: mw(0.709) }}
            >
              <ArrowElbowIcon style={{ width: mw(14.176), height: mw(14.176) }} />
            </span>
          </motion.div>

          {/* Botón principal: ancla simple, no <CTA>/<Magnetic> */}
          <motion.a
            href={cta.href}
            className="group absolute flex -translate-x-1/2 items-center justify-between overflow-hidden bg-gold"
            style={{
              left: "50%",
              top: mw(828),
              width: mw(400),
              borderRadius: "9999px",
              paddingLeft: mw(32),
              paddingRight: mw(16),
              paddingTop: mw(16),
              paddingBottom: mw(16),
            }}
            variants={rise(0.44, 26)}
          >
            <span className="font-bold text-night" style={{ fontSize: mw(22) }}>
              {cta.label}
            </span>
            <span
              aria-hidden
              className="flex shrink-0 items-center justify-center rounded-full bg-night text-gold transition-transform duration-300 group-active:scale-90"
              style={{ width: mw(51.57), height: mw(51.57) }}
            >
              <ArrowElbowIcon style={{ width: mw(27.142), height: mw(27.142) }} />
            </span>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
