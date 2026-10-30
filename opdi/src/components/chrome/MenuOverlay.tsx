"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IMAGES } from "@/lib/assets";
import { BRAND, CONTACT_INFO, MENU_FOOTER, MENU_ITEMS, SOCIAL, UI } from "@/lib/content";
import { useEscape, useFocusTrap, useLockBodyScroll } from "@/lib/hooks";
import { EASE } from "@/lib/motion";
import { ArrowUpRight, Close, OpdiMark } from "../ui/Icons";
import { useChrome } from "./SiteChrome";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

const PREVIEWS: Record<string, string> = {
  home: IMAGES.heroBackdrop,
  method: IMAGES.mossBranch,
  services: IMAGES.mossRock,
  impact: IMAGES.mossRidge,
  journal: IMAGES.mossWave,
  questions: IMAGES.mossDark,
  contact: IMAGES.mossRidge,
};

export default function MenuOverlay() {
  const { menuOpen, closeMenu, openLogin, go } = useChrome();
  const reduced = useReducedMotion() ?? false;
  const [hovered, setHovered] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(menuOpen);
  useEscape(menuOpen, closeMenu);
  useFocusTrap(panelRef, menuOpen);

  useEffect(() => {
    if (!menuOpen) return;
    const frame = requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("a, button")?.focus());
    return () => cancelAnimationFrame(frame);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) setHovered(null);
  }, [menuOpen]);

  const t = (delay: number, duration: number) => ({
    duration: reduced ? 0.001 : duration,
    ease: EASE,
    delay: reduced ? 0 : delay,
  });

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          ref={panelRef}
          id="menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={UI.menuLabel}
          className="fixed inset-0 z-[100] overflow-y-auto bg-ink-deep"
          initial={{ clipPath: reduced ? undefined : "inset(0 0 100% 0)", opacity: 0 }}
          animate={{ clipPath: reduced ? undefined : "inset(0 0 0% 0)", opacity: 1 }}
          exit={{ clipPath: reduced ? undefined : "inset(0 0 100% 0)", opacity: 0 }}
          transition={t(0, 0.7)}
        >
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 lg:block" aria-hidden>
            <AnimatePresence mode="wait">
              {hovered && (
                <motion.img
                  key={hovered}
                  src={PREVIEWS[hovered]}
                  alt=""
                  className="h-full w-full object-cover opacity-25"
                  initial={{ opacity: 0, scale: reduced ? 1 : 1.06 }}
                  animate={{ opacity: 0.25, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={t(0, 0.6)}
                />
              )}
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-ink-deep via-ink-deep/40 to-transparent" />
          </div>

          <div className="relative mx-auto flex min-h-full w-full max-w-[1440px] flex-col px-5 pb-10 sm:px-7">
            <div className="flex h-16 items-center justify-between lg:h-[72px]">
              <a
                href="#home"
                aria-label={BRAND.homeLabel}
                onClick={(event) => {
                  event.preventDefault();
                  go("home");
                }}
                className={`flex items-center gap-3 text-white ${FOCUS}`}
              >
                <OpdiMark className="size-6 text-sky" />
                <span className="font-display text-[15px] tracking-[-0.08em]">{BRAND.name}</span>
              </a>
              <button
                type="button"
                onClick={closeMenu}
                aria-label={UI.closeMenu}
                className={`grid size-11 place-items-center rounded-full border border-white/20 text-white transition-colors duration-300 hover:border-white/60 ${FOCUS}`}
              >
                <Close className="size-5" />
              </button>
            </div>

            <ul className="mt-8 border-t border-white/10 lg:mt-12 lg:max-w-[60%]">
              {MENU_ITEMS.map((item, index) => (
                <li key={item.id} className="overflow-hidden border-b border-white/10">
                  <motion.a
                    href={item.href}
                    onClick={(event) => {
                      event.preventDefault();
                      go(item.id);
                    }}
                    onMouseEnter={() => setHovered(item.id)}
                    onFocus={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(null)}
                    className={`group flex items-baseline gap-5 py-4 text-white/85 transition-colors duration-300 hover:text-white lg:py-6 ${FOCUS}`}
                    initial={{ y: reduced ? 0 : "110%" }}
                    animate={{ y: 0 }}
                    transition={t(0.15 + index * 0.06, 0.75)}
                  >
                    <span className="w-8 shrink-0 text-[11px] font-light tracking-[0.2em] text-mist">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="display-tight text-[clamp(2rem,7vw,4.5rem)]">{item.label}</span>
                    <ArrowUpRight className="ml-auto size-6 shrink-0 translate-y-[-4px] text-sky opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100" />
                  </motion.a>
                </li>
              ))}
            </ul>

            <motion.div
              className="mt-auto grid gap-8 pt-14 text-[14px] text-mist sm:grid-cols-2 lg:grid-cols-4"
              initial={{ opacity: 0, y: reduced ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={t(0.6, 0.7)}
            >
              <div>
                <p className="mb-2 text-[12px] uppercase tracking-[0.2em] text-white/40">{MENU_FOOTER.studioTitle}</p>
                {CONTACT_INFO.studio.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <div>
                <p className="mb-2 text-[12px] uppercase tracking-[0.2em] text-white/40">{MENU_FOOTER.contactTitle}</p>
                <a href={`mailto:${CONTACT_INFO.email}`} className={`block hover:text-white ${FOCUS}`}>
                  {CONTACT_INFO.email}
                </a>
                <a href={`tel:${CONTACT_INFO.phoneHref}`} className={`block hover:text-white ${FOCUS}`}>
                  {CONTACT_INFO.phone}
                </a>
              </div>
              <div>
                <p className="mb-2 text-[12px] uppercase tracking-[0.2em] text-white/40">{MENU_FOOTER.socialTitle}</p>
                {SOCIAL.slice(0, 3).map((name) => (
                  <a key={name} href="#" className={`block hover:text-white ${FOCUS}`}>
                    {name}
                  </a>
                ))}
              </div>
              <div className="flex items-end lg:justify-end">
                <button
                  type="button"
                  onClick={openLogin}
                  className={`rounded-full border border-white/20 px-6 py-3 text-[14px] text-white transition-colors duration-300 hover:border-white/60 ${FOCUS}`}
                >
                  {UI.clientArea}
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
