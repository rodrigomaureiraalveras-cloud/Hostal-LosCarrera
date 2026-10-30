"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BRAND, UI } from "@/lib/content";
import { useScrolled } from "@/lib/hooks";
import { EASE } from "@/lib/motion";
import { OpdiMark } from "../ui/Icons";
import BurgerButton from "./BurgerButton";
import NavLinks from "./NavLinks";
import { useChrome } from "./SiteChrome";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

function Wordmark({ gap }: { gap: string }) {
  const { go } = useChrome();
  return (
    <a
      href="#home"
      aria-label={BRAND.homeLabel}
      onClick={(event) => {
        event.preventDefault();
        go("home");
      }}
      className={`flex items-center ${gap} text-white ${FOCUS}`}
    >
      <OpdiMark className="size-6 text-sky" />
      <span className="font-display text-[15px] tracking-[-0.08em]">{BRAND.name}</span>
    </a>
  );
}

export default function StickyBars() {
  const { menuOpen, toggleMenu, openLogin } = useChrome();
  const scrolled = useScrolled(560);
  const reduced = useReducedMotion() ?? false;

  return (
    <>
      {/* Barra de escritorio: aparece cuando el hero (con su propia navegación) ya se fue. */}
      <motion.header
        className="fixed inset-x-0 top-0 z-50 hidden border-b border-white/10 bg-ink/85 backdrop-blur-xl lg:block"
        initial={false}
        animate={{ y: scrolled ? 0 : -120, opacity: scrolled ? 1 : 0 }}
        transition={{ duration: reduced ? 0.001 : 0.5, ease: EASE }}
        style={{ pointerEvents: scrolled ? "auto" : "none" }}
        aria-hidden={!scrolled}
        inert={!scrolled}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-7">
          <Wordmark gap="gap-3" />
          <NavLinks className="flex items-center gap-12 text-[14px] leading-[1.4]" />
          <div className="flex items-center gap-8">
            <button type="button" onClick={openLogin} className={`text-[14px] font-bold text-white ${FOCUS}`}>
              {UI.login}
            </button>
            <BurgerButton open={menuOpen} onClick={toggleMenu} />
          </div>
        </div>
      </motion.header>

      {/* Cabecera móvil: siempre visible, sin animación de entrada. */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/85 backdrop-blur-xl lg:hidden">
        <div className="flex h-16 items-center justify-between px-5 sm:px-7">
          <Wordmark gap="gap-2.5" />
          <div className="flex items-center gap-5">
            <button type="button" onClick={openLogin} className={`text-[14px] font-bold text-white ${FOCUS}`}>
              {UI.login}
            </button>
            <BurgerButton open={menuOpen} onClick={toggleMenu} />
          </div>
        </div>
      </header>
    </>
  );
}
