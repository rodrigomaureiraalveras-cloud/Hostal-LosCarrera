"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GALLERY } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { useEscape, useFocusTrap, useLockBodyScroll } from "@/lib/hooks";
import { SectionHead } from "@/components/ui/SectionHead";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "@/components/ui/Icons";

const SHAPE = {
  tall: { ratio: "3 / 5", drift: 16 },
  wide: { ratio: "16 / 10", drift: 8 },
  normal: { ratio: "1 / 1", drift: 12 },
} as const;

const pad = (n: number) => String(n).padStart(2, "0");

function Lightbox({ index, onStep, onClose }: { index: number; onStep: (d: number) => void; onClose: () => void }) {
  const reduce = useReducedMotion() ?? false;
  const panelRef = useFocusTrap<HTMLDivElement>(true);
  useLockBodyScroll(true);
  useEscape(true, onClose);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") onStep(-1);
      if (e.key === "ArrowRight") onStep(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onStep]);

  const item = GALLERY.items[index];
  const total = GALLERY.items.length;

  return (
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      className="fixed inset-0 z-[65] flex flex-col bg-night/95 p-4 backdrop-blur-xl md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35, ease: EASE } }}
      exit={{ opacity: 0, transition: { duration: 0.25, ease: EASE } }}
    >
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          aria-label={GALLERY.closeLabel}
          className="flex size-[44px] items-center justify-center rounded-full border border-white/29 text-white transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-night"
        >
          <CloseIcon className="size-5" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center py-4" onClick={onClose}>
        <AnimatePresence mode="wait">
          <motion.img
            key={item.src}
            src={item.src}
            alt={item.caption}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full rounded-[18px] object-contain"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: reduce ? 0.15 : 0.4, ease: EASE }}
          />
        </AnimatePresence>
      </div>

      <div className="mx-auto flex w-full max-w-[1100px] items-center justify-between gap-4 text-white">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em]">{item.caption}</p>
        <div className="flex items-center gap-4">
          <span className="text-[12px] tabular-nums tracking-[0.18em] text-white/60">
            {pad(index + 1)} / {pad(total)}
          </span>
          <button
            type="button"
            onClick={() => onStep(-1)}
            aria-label={GALLERY.prevLabel}
            className="flex size-[44px] items-center justify-center rounded-full border border-white/29 transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-night"
          >
            <ArrowLeftIcon className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => onStep(1)}
            aria-label={GALLERY.nextLabel}
            className="flex size-[44px] items-center justify-center rounded-full border border-white/29 transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-night"
          >
            <ArrowRightIcon className="size-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const total = GALLERY.items.length;

  return (
    <section className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <SectionHead kicker={GALLERY.kicker} title={GALLERY.title} accent={GALLERY.accent} lead={GALLERY.lead} align="center" />

        <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {GALLERY.items.map((item, i) => {
            const shape = SHAPE[item.shape];
            return (
              <button
                key={item.caption}
                type="button"
                onClick={() => setOpen(i)}
                aria-label={item.caption}
                aria-haspopup="dialog"
                className="block w-full break-inside-avoid rounded-[20px] text-left"
              >
                <MediaFrame
                  src={item.src}
                  alt=""
                  ratio={shape.ratio}
                  parallax={"parallax" in item ? item.parallax : shape.drift}
                  caption={item.caption}
                  className="rounded-[20px]"
                />
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {open !== null ? (
          <Lightbox
            key="lightbox"
            index={open}
            onStep={(d) => setOpen((i) => (i === null ? i : (i + d + total) % total))}
            onClose={() => setOpen(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
