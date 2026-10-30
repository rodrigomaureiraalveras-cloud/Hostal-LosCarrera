"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BRAND_FILM } from "@/lib/assets";
import { BRAND, FILM, UI } from "@/lib/content";
import { useEscape, useFocusTrap, useLockBodyScroll } from "@/lib/hooks";
import { EASE } from "@/lib/motion";
import { Close } from "../ui/Icons";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

/* El reproductor real del botón de play: el film del estudio, en loop y con controles. */
export default function MediaLightbox({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduced = useReducedMotion() ?? false;
  const [mounted, setMounted] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);
  useLockBodyScroll(open);
  useEscape(open, onClose);
  useFocusTrap(panelRef, open);

  useEffect(() => {
    if (!open) return;
    /* El video se monta junto con el panel: esperamos un cuadro para tener el elemento. */
    const frame = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>("figcaption button")?.focus();
      const video = videoRef.current;
      if (!video) return;
      video.currentTime = 0;
      void video.play().catch(() => undefined);
    });
    return () => {
      cancelAnimationFrame(frame);
      videoRef.current?.pause();
    };
  }, [open]);

  if (!mounted) return null;

  const duration = reduced ? 0.001 : 0.5;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={FILM.dialogLabel}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.001 : 0.35 }}
        >
          <button
            type="button"
            tabIndex={-1}
            aria-label={UI.close}
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-black/85 backdrop-blur-sm"
          />
          <motion.figure
            className="relative z-10 w-full max-w-[1100px]"
            initial={{ opacity: 0, y: reduced ? 0 : 24, scale: reduced ? 1 : 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduced ? 0 : 24, scale: reduced ? 1 : 0.97 }}
            transition={{ duration, ease: EASE }}
          >
            <video
              ref={videoRef}
              src={BRAND_FILM.mp4}
              poster={BRAND_FILM.poster}
              className="aspect-video w-full rounded-[24px] bg-black object-cover"
              controls
              loop
              playsInline
              muted={muted}
              preload="metadata"
            />
            <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-4 text-[14px] text-mist">
              <span>
                <span className="text-white">{BRAND.claim}</span> {FILM.caption}
              </span>
              <span className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMuted((value) => !value)}
                  className={`rounded-full border border-white/20 px-4 py-2 text-white transition-colors duration-300 hover:border-white/60 ${FOCUS}`}
                >
                  {muted ? FILM.unmute : FILM.mute}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={UI.close}
                  className={`grid size-10 place-items-center rounded-full border border-white/20 text-white transition-colors duration-300 hover:border-white/60 ${FOCUS}`}
                >
                  <Close className="size-4" />
                </button>
              </span>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
