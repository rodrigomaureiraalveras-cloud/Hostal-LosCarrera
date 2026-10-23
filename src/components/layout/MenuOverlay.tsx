"use client";

import { useState, type PointerEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { CONTACT, NAV } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { useEscape, useFocusTrap, useLockBodyScroll, usePointerFine } from "@/lib/hooks";
import { Logo } from "@/components/ui/Logo";
import { SocialRow } from "@/components/ui/SocialRow";
import { CloseIcon, PhoneIcon } from "@/components/ui/Icons";

type Props = { open: boolean; onClose: () => void };

export function MenuOverlay({ open, onClose }: Props) {
  return <AnimatePresence>{open ? <Panel key="menu" onClose={onClose} /> : null}</AnimatePresence>;
}

function Panel({ onClose }: { onClose: () => void }) {
  const reduce = useReducedMotion() ?? false;
  const fine = usePointerFine();
  const follow = fine && !reduce;
  const panelRef = useFocusTrap<HTMLDivElement>(true);
  useLockBodyScroll(true);
  useEscape(true, onClose);

  const [hovered, setHovered] = useState<string | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 150, damping: 22, mass: 0.5 });

  const onMove = (e: PointerEvent) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  const preview = NAV.links.find((l) => l.id === hovered);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={NAV.dialogLabel}
      className="fixed inset-0 z-[60]"
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-night/95 backdrop-blur-2xl"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { duration: 0.4, ease: EASE } },
          exit: { opacity: 0, transition: { duration: 0.3, ease: EASE } },
        }}
      />

      <motion.div
        ref={panelRef}
        className="relative flex h-full flex-col px-5 pb-8 md:px-10"
        onPointerMove={follow ? onMove : undefined}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: 0.12 } },
          exit: { transition: { staggerChildren: 0 } },
        }}
      >
        <div className="flex h-[72px] items-center justify-between">
          <a href="#home" onClick={onClose}>
            <Logo />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white"
          >
            {NAV.closeLabel}
            <span className="flex size-[38px] items-center justify-center rounded-full border border-white/29">
              <CloseIcon className="size-4" />
            </span>
          </button>
        </div>

        <nav className="menu-row my-auto" aria-label={NAV.dialogLabel}>
          <ul className="flex flex-col gap-2">
            {NAV.links.map((link, i) => (
              <motion.li
                key={link.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.2 : 0.7, ease: EASE } },
                  exit: { opacity: 0, transition: { duration: 0.2 } },
                }}
                className="border-b border-white/12"
              >
                <a
                  href={link.href}
                  onClick={onClose}
                  onPointerEnter={() => setHovered(link.id)}
                  onPointerLeave={() => setHovered(null)}
                  onFocus={() => setHovered(link.id)}
                  onBlur={() => setHovered(null)}
                  className="group flex items-baseline gap-4 py-3 text-white md:gap-8"
                >
                  <span className="text-[12px] font-semibold tracking-[0.18em] text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-headline relative block overflow-hidden text-[min(6.5rem,11cqi)] uppercase leading-[1.05]">
                    <span className="block transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                      {link.label}
                    </span>
                    <span
                      aria-hidden
                      className="absolute inset-0 translate-y-full text-gold transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
                    >
                      {link.label}
                    </span>
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>

        <motion.div
          className="flex flex-col gap-5 border-t border-white/12 pt-6 text-[13px] text-white/70 md:flex-row md:items-center md:justify-between"
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.2 : 0.7, ease: EASE } },
            exit: { opacity: 0, transition: { duration: 0.2 } },
          }}
        >
          <p>{NAV.footnote}</p>
          <div className="flex flex-col gap-2">
            {CONTACT.phones.map((p) => (
              <a key={p.tel} href={p.tel} className="flex w-fit items-center gap-2 text-[17px] font-semibold text-white">
                <PhoneIcon className="size-4 text-gold" />
                {p.display}
              </a>
            ))}
            <a href={`mailto:${NAV.email}`} className="link-underline w-fit text-white">
              {NAV.email}
            </a>
          </div>
          <SocialRow />
        </motion.div>

        {follow ? (
          <motion.div
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-10 -ml-[150px] -mt-[190px] h-[380px] w-[300px] overflow-hidden rounded-[18px]"
            style={{ x: sx, y: sy }}
          >
            <AnimatePresence mode="wait">
              {preview ? (
                <motion.img
                  key={preview.id}
                  src={preview.preview}
                  alt=""
                  className="h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.12 }}
                  animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } }}
                  exit={{ opacity: 0, transition: { duration: 0.25 } }}
                />
              ) : null}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </motion.div>
    </motion.div>
  );
}
