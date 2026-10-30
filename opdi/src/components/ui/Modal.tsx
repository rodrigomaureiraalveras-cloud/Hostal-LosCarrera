"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { UI } from "@/lib/content";
import { useEscape, useFocusTrap, useLockBodyScroll } from "@/lib/hooks";
import { EASE } from "@/lib/motion";
import { Close } from "./Icons";

export default function Modal({
  open,
  onClose,
  title,
  children,
  variant = "center",
  maxWidth = "560px",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  variant?: "center" | "sheet";
  maxWidth?: string;
}) {
  const reduced = useReducedMotion() ?? false;
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useLockBodyScroll(open);
  useEscape(open, onClose);

  /* Foco al abrir y devolución del foco al cerrar. */
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const frame = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>("input, textarea, select, button, [href]")?.focus();
    });
    return () => {
      cancelAnimationFrame(frame);
      previous?.focus?.();
    };
  }, [open]);

  useFocusTrap(panelRef, open);

  if (typeof document === "undefined" || !mounted) return null;

  const from =
    variant === "sheet"
      ? { opacity: 0, y: reduced ? 0 : 60 }
      : { opacity: 0, y: reduced ? 0 : 24, scale: reduced ? 1 : 0.97 };
  const to = variant === "sheet" ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, scale: 1 };
  const duration = reduced ? 0.001 : 0.5;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center sm:p-6">
          <motion.button
            type="button"
            aria-label={UI.close}
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.001 : 0.35 }}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="relative z-10 max-h-[92svh] w-full overflow-y-auto rounded-t-[32px] border border-white/10 bg-panel p-7 shadow-2xl sm:rounded-[32px] sm:p-9"
            style={{ maxWidth }}
            initial={from}
            animate={to}
            exit={from}
            transition={{ duration, ease: EASE }}
          >
            {children}
            <button
              type="button"
              onClick={onClose}
              aria-label={UI.close}
              className="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-white/15 bg-panel/80 text-white transition-colors duration-300 hover:border-white/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <Close className="size-4" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
