"use client";

import { useRef, type PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { BACKGROUNDS, HERO, MEDIA } from "@/lib/content";
import { PILL_MASK } from "@/lib/assets";
import { dw } from "@/lib/frame";
import { EASE, passthrough, stagger } from "@/lib/motion";
import { usePointerFine } from "@/lib/hooks";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { CTA } from "@/components/ui/CTA";
import { PhoneMockup } from "@/components/hero/PhoneMockup";
import { StatCards } from "@/components/hero/StatCards";

/* ── Coordenadas del diseño (lienzo de 1440 × 810) ──────────────────────
   Son diseño, no contenido: por eso viven acá y no en content.ts. */

/* Figma mide el `top` de un texto desde la altura de mayúscula; la caja de
   línea de CSS no. Sin esta corrección todo el texto del hero queda bajo. */
const capTop = (y: number, size: number) => dw(y - 0.25 * size);
/* El "Layer blur" de Figma es un radio; `blur()` de CSS pide la desviación. */
const FIGMA_BLUR = 0.5;

const TYPE_SIZE = 206;
const TYPE_TRACK = -2;
/* Alto de mayúscula de Anybody angosta: 0,7 del tamaño de letra. */
const CAP = TYPE_SIZE * 0.7;
const LEFT = 92;
const LINE1 = 160;
const LINE2 = LINE1 + CAP + 34;
/* Ancho medido de "H" a este tamaño, y la separación hasta el anillo. */
const GE_W = 104;
const RING_GAP = 10;

/* El teléfono: 29 × 60 em con 1em = 10 px del diseño. */
const PHONE = { cx: 968, cy: 420, em: 10 };

/* El anillo "O" se estira hasta pasar el borde derecho del teléfono, para
   que el teléfono quede ADENTRO de la "O". KY escala el alto (igual al alto
   de mayúscula) y KX el ancho; la máscara de su sombra (548,604 × 115,93)
   se estira con los mismos dos factores, así siguen coincidiendo. */
const RING_LEFT = LEFT + GE_W + RING_GAP;
const RING_RIGHT = 1172;
const KX = (RING_RIGHT - RING_LEFT) / 548.604;
const KY = CAP / 115.93;
const RING = {
  left: RING_LEFT,
  top: LINE1 - 1.87 * KY,
  w: 548.604 * KX,
  h: 115.93 * KY,
  border: 21 * KY,
  radius: 55 * KY,
};

export function HeroDesktop() {
  const reduce = useReducedMotion() ?? false;
  const fine = usePointerFine();
  const pointerOn = fine && !reduce;
  const sectionRef = useRef<HTMLDivElement>(null);

  /* ── Profundidad con el scroll (EFFECT-03) ── */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const haloY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const typeY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const typeFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  /* ── Deriva con el cursor ── */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });
  const phonePX = useTransform(sx, (v) => v * -14);
  const phonePY = useTransform(sy, (v) => v * -8);
  const typePX = useTransform(sx, (v) => v * 9);
  const haloPX = useTransform(sx, (v) => v * 22);

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  /* ── Entradas ── */
  const t = (duration: number, delay = 0) => ({
    duration: reduce ? 0.2 : duration,
    delay: reduce ? 0 : delay,
    ease: EASE,
  });
  const fade = (duration: number, delay = 0): Variants => ({
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: t(duration, delay) },
  });
  const rise = (y: number, duration: number, delay = 0): Variants => ({
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: t(duration, delay) },
  });
  const sharpen = (delay: number): Variants => ({
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 40, filter: `blur(${dw(30 * FIGMA_BLUR)})` },
    show: { opacity: 1, y: 0, filter: `blur(0px)`, transition: t(1.3, delay) },
  });
  const ringIn: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, scaleX: 0.72 },
    show: { opacity: 1, scaleX: 1, transition: t(1.4, 0.2) },
  };
  const phoneIn: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 80, scale: 1.04 },
    show: { opacity: 1, y: 0, scale: 1, transition: t(1.5, 0.1) },
  };

  const typeStyle = reduce ? undefined : { y: typeY, x: typePX, opacity: typeFade };
  const typeText = { fontSize: dw(TYPE_SIZE), lineHeight: 1.2, letterSpacing: dw(TYPE_TRACK) } as const;

  const ringBox = {
    left: dw(RING.left),
    top: dw(RING.top),
    width: dw(RING.w),
    height: dw(RING.h),
    borderWidth: dw(RING.border),
    borderRadius: dw(RING.radius),
    transformOrigin: "left center",
  } as const;

  /* EFFECT-09: dos barras desenfocadas, recortadas al trazo del anillo. */
  const shadowBar = (background: string, offsetX: number, w: number) => ({
    left: dw(RING.left + offsetX * KX),
    top: dw(RING.top - 16.125 * KY),
    width: dw(w * KX),
    height: dw(67 * KY),
    background,
    filter: `blur(calc(${dw(24.5 * KY)} * 0.5))`,
    WebkitMaskImage: `url("${PILL_MASK}")`,
    maskImage: `url("${PILL_MASK}")`,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskSize: `${dw(RING.w)} ${dw(RING.h)}`,
    WebkitMaskSize: `${dw(RING.w)} ${dw(RING.h)}`,
    maskPosition: `${dw(-offsetX * KX)} ${dw(16.125 * KY)}`,
    WebkitMaskPosition: `${dw(-offsetX * KX)} ${dw(16.125 * KY)}`,
  });

  const [solid, ghost] = HERO.buttons;

  return (
    <div
      ref={sectionRef}
      onPointerMove={pointerOn ? onPointerMove : undefined}
      className="relative isolate hidden min-h-svh w-full overflow-hidden bg-night md:block"
    >
      {/* 1 · Fondo: fuera del marco, para que sangre más allá del lienzo. */}
      <SectionBackdrop layers={BACKGROUNDS.hero} className="-z-10" />

      <div className="relative flex min-h-svh items-center">
        <motion.div
          className="frame frame-desktop relative"
          variants={stagger(reduce, 0.075, 0.15)}
          initial="hidden"
          animate="show"
        >
          {/* 2 · Arcos plateados, detrás del teléfono */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            variants={passthrough}
            style={reduce ? undefined : { y: haloY, x: haloPX }}
          >
            <motion.div className="absolute inset-0" variants={fade(1.6)}>
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2 opacity-25"
                style={{ left: dw(PHONE.cx), top: dw(PHONE.cy), width: dw(860), height: dw(860) }}
              >
                <motion.img
                  src={MEDIA.arcs}
                  alt=""
                  className="block h-full w-full"
                  animate={reduce ? undefined : { rotate: 360 }}
                  transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* 3 · Sombra celeste en el suelo, debajo del teléfono */}
          <motion.div aria-hidden className="pointer-events-none absolute inset-0" variants={fade(1.2, 0.5)}>
            <div
              className="absolute -translate-x-1/2 rounded-[50%]"
              style={{
                left: dw(PHONE.cx),
                top: dw(PHONE.cy + 300 + 18),
                width: dw(420),
                height: dw(46),
                background: "radial-gradient(closest-side, rgba(92,200,240,0.35), transparent)",
                filter: `blur(${dw(8)})`,
              }}
            />
          </motion.div>

          {/* 4 · "H" y "STAL" */}
          <motion.div className="pointer-events-none absolute inset-0" variants={passthrough} style={typeStyle}>
            <h1 className="sr-only">{HERO.srTitle}</h1>
            <motion.span
              aria-hidden
              className="font-headline absolute whitespace-nowrap uppercase text-white"
              style={{ left: dw(LEFT), top: capTop(LINE1, TYPE_SIZE), ...typeText }}
              variants={sharpen(0)}
            >
              {HERO.brandParts.ge}
            </motion.span>
            <motion.span
              aria-hidden
              className="font-headline absolute whitespace-nowrap uppercase text-gold"
              style={{ left: dw(LEFT), top: capTop(LINE2, TYPE_SIZE), ...typeText }}
              variants={sharpen(0.12)}
            >
              {HERO.brandParts.rig}
            </motion.span>
          </motion.div>

          {/* 5 · El anillo "O" entero (su trazo de arriba queda DETRÁS del teléfono) */}
          <motion.div aria-hidden className="pointer-events-none absolute inset-0" variants={passthrough} style={typeStyle}>
            <motion.span className="absolute border-solid border-gold" style={ringBox} variants={ringIn} />
            <motion.span className="absolute" style={shadowBar("var(--color-gold-deep)", 182.604, 358)} variants={fade(1.2, 0.6)} />
            <motion.span className="absolute" style={shadowBar("var(--color-bronze)", 227.679, 230.924)} variants={fade(1.2, 0.6)} />
          </motion.div>

          {/* 6 · El teléfono con la app */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            variants={passthrough}
            style={reduce ? undefined : { y: phoneY, x: phonePX }}
          >
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: dw(PHONE.cx), top: dw(PHONE.cy), fontSize: dw(PHONE.em) }}
              variants={phoneIn}
            >
              <motion.div className="-rotate-[7deg]" variants={passthrough} style={reduce ? undefined : { y: phonePY }}>
                <PhoneMockup reduce={reduce} />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* 7 · La mitad de abajo del anillo, DELANTE del teléfono: el anillo lo rodea */}
          <motion.div aria-hidden className="pointer-events-none absolute inset-0" variants={passthrough} style={typeStyle}>
            <motion.span
              className="absolute border-solid border-gold"
              style={{ ...ringBox, clipPath: "inset(52% 0 0 0)" }}
              variants={ringIn}
            />
          </motion.div>

          {/* 8 · Lema */}
          <motion.div
            className="absolute flex items-center"
            style={{ left: dw(LEFT + 6), top: dw(LINE2 + CAP + 52), gap: dw(24), fontSize: dw(22) }}
            variants={rise(20, 0.9)}
          >
            <p className="whitespace-nowrap font-bold uppercase leading-[1.25] text-white">
              {HERO.tagline[0][0]}
              <br />
              <span className="text-gold">{HERO.tagline[0][1]}</span>
            </p>
            <span aria-hidden className="relative flex shrink-0 items-center justify-center" style={{ width: dw(17.901), height: dw(46.822) }}>
              <span className="block shrink-0 bg-gold" style={{ width: dw(50.127), height: "1px", transform: "rotate(-69.08deg)" }} />
            </span>
            <p className="whitespace-nowrap font-bold uppercase leading-[1.25] text-white">
              {HERO.tagline[1][0]}
              <br />
              <span className="text-gold">{HERO.tagline[1][1]}</span>
            </p>
          </motion.div>

          {/* 9 · Párrafo */}
          <motion.p
            className="absolute text-white/75"
            style={{ left: dw(LEFT + 6), top: dw(LINE2 + CAP + 138), width: dw(470), fontSize: dw(16), lineHeight: 1.5 }}
            variants={rise(22, 0.9)}
          >
            {HERO.body}
          </motion.p>

          {/* 10 · Botones */}
          <motion.div
            className="pointer-events-auto absolute flex items-center"
            style={{ left: dw(LEFT + 6), top: dw(LINE2 + CAP + 232), gap: dw(12) }}
            variants={rise(22, 0.9)}
          >
            <CTA href={solid.href} style={{ fontSize: dw(16) }}>
              {solid.label}
            </CTA>
            <CTA href={ghost.href} variant="ghost" style={{ fontSize: dw(16) }}>
              {ghost.label}
            </CTA>
          </motion.div>

          {/* 11 · Chapita y tarjetas de dato */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            variants={passthrough}
            style={reduce ? undefined : { y: cardsY }}
          >
            <StatCards />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
