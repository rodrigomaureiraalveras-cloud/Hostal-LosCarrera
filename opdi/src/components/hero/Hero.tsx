"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HERO_MOTION, IMAGES } from "@/lib/assets";
import { BRAND, HERO, READOUTS, UI } from "@/lib/content";
import { EASE } from "@/lib/motion";
import BurgerButton from "../chrome/BurgerButton";
import NavLinks from "../chrome/NavLinks";
import { useChrome } from "../chrome/SiteChrome";
import AnimatedText from "../ui/AnimatedText";
import { OpdiMark } from "../ui/Icons";
import FeatureCard from "./FeatureCard";
import GridLines from "./GridLines";
import { PlayButton, ProductsPill, ScrollCue, StatReadout } from "./HeroParts";
import MediaLightbox from "./MediaLightbox";
import { c } from "./units";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { go, openLogin, menuOpen, toggleMenu } = useChrome();
  const [filmOpen, setFilmOpen] = useState(false);

  /* EFFECT-03: un solo progreso, cinco profundidades. */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const backdropY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const backdropScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const asideY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  /* `undefined` deja la propiedad sin tocar: con movimiento reducido, todo queda donde lo pone el layout. */
  const p = <T,>(value: T) => (reduced ? undefined : value);

  /* EFFECT-02: si el visitante pide menos movimiento, el film no decodifica escondido. */
  useEffect(() => {
    const video = backdropRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      video.removeAttribute("autoplay");
    }
  }, []);

  /* EFFECT-05: cada pieza llega con su propio retraso. */
  const t = (delay: number, duration: number) => ({
    duration: reduced ? 0.001 : duration,
    ease: EASE,
    delay: reduced ? 0 : delay,
  });
  const rise = (y: number) => ({ opacity: 0, y: reduced ? 0 : y });

  const openFilm = () => setFilmOpen(true);

  return (
    <>
      <section
        ref={sectionRef}
        id="home"
        className="grain relative isolate h-svh min-h-[620px] w-full overflow-hidden bg-ink"
      >
        {/* Fondo: el film corre una vez y se queda en su último cuadro. */}
        <motion.div aria-hidden className="absolute inset-0 -z-10" style={{ y: p(backdropY), scale: p(backdropScale) }}>
          <video
            ref={backdropRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            poster={HERO_MOTION.poster}
            className="h-full w-full object-cover motion-reduce:hidden"
          >
            <source src={HERO_MOTION.webm} type="video/webm" />
            <source src={HERO_MOTION.mp4} type="video/mp4" />
          </video>
          <img src={IMAGES.heroStill} alt="" className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:block" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-transparent to-ink/20" />
        </motion.div>

        {/* ── Escritorio: el artboard de 1440x810 en píxeles de diseño ── */}
        <div
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
          style={{ width: c(1440), height: c(810), ["--c" as string]: "var(--u)" }}
        >
          <GridLines />

          {/* Navegación del frame */}
          <motion.div
            className="absolute z-30"
            style={{ left: c(29), top: c(27), width: c(1387), height: c(24) }}
            initial={rise(-16)}
            animate={{ opacity: 1, y: 0 }}
            transition={t(0.1, 0.9)}
          >
            <div className="relative h-full w-full">
              <a
                href="#home"
                aria-label={BRAND.homeLabel}
                onClick={(event) => {
                  event.preventDefault();
                  go("home");
                }}
                className={`absolute left-0 top-0 text-sky transition-opacity duration-300 hover:opacity-70 ${FOCUS}`}
                style={{ width: c(24), height: c(24) }}
              >
                <OpdiMark className="h-full w-full" />
              </a>
              <NavLinks
                className="absolute top-0 flex"
                style={{ left: c(172), gap: c(128) }}
                linkStyle={{ fontSize: c(14), lineHeight: 1.4 }}
              />
              <button
                type="button"
                onClick={openLogin}
                className={`absolute font-bold text-white ${FOCUS}`}
                style={{ right: c(71), top: c(1), fontSize: c(14), lineHeight: 1.4 }}
              >
                {UI.login}
              </button>
              <BurgerButton open={menuOpen} onClick={toggleMenu} className="absolute right-0" style={{ top: c(3) }} />
            </div>
          </motion.div>

          {/* Titular y bajada: AnimatedText sólo propaga variantes, así que puede llevar `y` directo. */}
          <AnimatedText
            as="h1"
            mode="chars"
            delay={0.35}
            lines={HERO.headline}
            className="display-tight absolute text-white"
            style={{
              left: c(18),
              top: c(181),
              width: c(340),
              fontSize: c(52),
              lineHeight: 1.24,
              letterSpacing: c(-6.24),
              y: p(copyY),
            }}
          />
          <AnimatedText
            as="p"
            mode="lines"
            delay={0.75}
            lines={HERO.lede}
            className="absolute font-normal text-mist"
            style={{ left: c(462), top: c(181), width: c(240), fontSize: c(16), lineHeight: 1.4, y: p(copyY) }}
          />

          {/* Cada pieza con parallax: el div exterior lleva el scroll, el interior la entrada. */}
          <motion.div className="absolute" style={{ left: c(462), top: c(306), y: p(copyY) }}>
            <motion.div initial={rise(24)} animate={{ opacity: 1, y: 0 }} transition={t(1.1, 0.9)}>
              <ProductsPill onClick={() => go("services")} />
            </motion.div>
          </motion.div>

          <motion.div className="absolute" style={{ left: c(153), top: c(398), y: p(copyY) }}>
            <motion.div
              initial={{ opacity: 0, scale: reduced ? 1 : 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={t(1.25, 1.0)}
            >
              <PlayButton onClick={openFilm} />
            </motion.div>
          </motion.div>

          <motion.div className="absolute" style={{ left: c(820), top: c(201), y: p(cardsY) }}>
            <motion.div initial={rise(60)} animate={{ opacity: 1, y: 0 }} transition={t(0.55, 1.1)}>
              <FeatureCard
                layout="top"
                kicker={HERO.cards.about.kicker}
                titleLines={HERO.cards.about.titleLines}
                image={IMAGES.mossBranch}
                imageAlt={HERO.cards.about.imageAlt}
                onClick={() => go("method")}
              />
            </motion.div>
          </motion.div>

          <motion.div className="absolute" style={{ left: c(1116), top: c(477), y: p(cardsY) }}>
            <motion.div initial={rise(60)} animate={{ opacity: 1, y: 0 }} transition={t(0.75, 1.1)}>
              <FeatureCard
                layout="bottom"
                kicker={HERO.cards.services.kicker}
                titleLines={HERO.cards.services.titleLines}
                image={IMAGES.mossRock}
                imageAlt={HERO.cards.services.imageAlt}
                onClick={() => go("services")}
              />
            </motion.div>
          </motion.div>

          <motion.div className="absolute" style={{ left: c(1195), top: c(220), y: p(asideY) }}>
            <motion.div
              initial={{ opacity: 0, x: reduced ? 0 : 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={t(1.35, 1.0)}
            >
              <StatReadout items={READOUTS} />
            </motion.div>
          </motion.div>

          <motion.div className="absolute" style={{ left: c(710), top: c(648), opacity: p(cueOpacity) }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={t(1.5, 1.0)}>
              <ScrollCue onClick={() => go("method")} />
            </motion.div>
          </motion.div>
        </div>

        {/* ── Menos de 1024px: la misma información como columna ── */}
        <div className="relative z-10 flex h-full flex-col px-5 pb-8 pt-24 sm:px-7 lg:hidden">
          <GridLines />
          <AnimatedText
            as="h1"
            mode="chars"
            delay={0.25}
            lines={HERO.headline}
            className="display-tight relative text-[clamp(2.4rem,11.5vw,3.9rem)] text-white"
          />
          <AnimatedText
            as="p"
            mode="lines"
            delay={0.6}
            lines={HERO.lede}
            className="relative mt-5 max-w-[20rem] text-[15px] leading-[1.5] text-mist"
          />
          <motion.div
            className="relative mt-7 flex items-center gap-4"
            initial={rise(24)}
            animate={{ opacity: 1, y: 0 }}
            transition={t(0.9, 0.9)}
          >
            <ProductsPill onClick={() => go("services")} />
            <PlayButton onClick={openFilm} style={{ width: 56, height: 56 }} />
          </motion.div>
          <motion.div
            className="relative mt-auto flex items-end justify-between gap-6 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={t(1.1, 1.0)}
          >
            <StatReadout items={READOUTS} stacked />
            <ScrollCue onClick={() => go("method")} />
          </motion.div>
        </div>
      </section>
      <MediaLightbox open={filmOpen} onClose={() => setFilmOpen(false)} />
    </>
  );
}
