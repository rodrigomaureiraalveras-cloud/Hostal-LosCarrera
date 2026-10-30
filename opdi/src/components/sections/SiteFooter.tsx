"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { BRAND, FOOTER, MENU_ITEMS, SOCIAL } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { useChrome } from "../chrome/SiteChrome";
import { EMAIL_RE, FOCUS_RING, Spinner, wait } from "../ui/Field";
import { ArrowRight, ArrowUpRight, Check, OpdiMark } from "../ui/Icons";

type Status = "idle" | "sending" | "done";

const COLUMN_TITLE = "text-[12px] uppercase tracking-[0.2em] text-white/40";

export default function SiteFooter() {
  const { go } = useChrome();
  const reduced = useReducedMotion() ?? false;
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError(FOOTER.error);
      return;
    }
    setError("");
    setStatus("sending");
    await wait(800);
    setStatus("done");
  };

  const swap = { duration: reduced ? 0.001 : 0.5, ease: EASE };

  return (
    <footer className="relative border-t border-white/10 bg-panel">
      <div className="mx-auto w-full max-w-[1360px] px-5 py-20 sm:px-7 lg:px-10 lg:py-24">
        <div className="grid gap-10 border-b border-white/10 pb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <h2 className="display-tight text-[clamp(1.9rem,4.4vw,3.2rem)] text-white">
              {FOOTER.newsletterTitle[0]}
              <br />
              {FOOTER.newsletterTitle[1]}
            </h2>
            <p className="mt-5 max-w-[28rem] text-[16px] leading-[1.7] text-mist">{FOOTER.newsletterLine}</p>
          </div>
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait" initial={false}>
              {status === "done" ? (
                <motion.p
                  key="done"
                  initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={swap}
                  className="flex items-center gap-4 rounded-full border border-white/15 bg-white/5 px-6 py-5 text-[15px] text-white"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-ink">
                    <Check className="size-4" />
                  </span>
                  {FOOTER.done(email.trim())}
                </motion.p>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={submit}
                  initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={swap}
                >
                  <div
                    className={`flex items-center gap-3 rounded-full border p-2 pl-6 transition-colors focus-within:border-white/60 ${
                      error ? "border-red-300/60" : "border-white/20"
                    }`}
                  >
                    <label htmlFor="newsletter-email" className="sr-only">
                      {FOOTER.emailLabel}
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder={FOOTER.emailPlaceholder}
                      aria-invalid={Boolean(error)}
                      aria-describedby={error ? "newsletter-email-error" : undefined}
                      className="min-w-0 flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-white/25"
                    />
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className={`group grid h-12 shrink-0 place-items-center rounded-full bg-white px-6 text-[15px] font-medium text-ink disabled:opacity-80 ${FOCUS_RING}`}
                    >
                      <span className="flex items-center gap-2">
                        {status === "sending" && <Spinner />}
                        {status === "sending" ? FOOTER.sending : FOOTER.subscribe}
                        {status !== "sending" && (
                          <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
                        )}
                      </span>
                    </button>
                  </div>
                  {error && (
                    <p id="newsletter-email-error" role="alert" className="mt-3 pl-6 text-[13px] text-red-300">
                      {error}
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 text-white">
              <OpdiMark className="size-7 text-sky" />
              <span className="font-display text-[17px] tracking-[-0.08em]">{BRAND.name}</span>
              <span className="text-[12px] uppercase tracking-[0.2em] text-mist">{BRAND.tagline}</span>
            </div>
            <p className="mt-5 max-w-[22rem] text-[15px] leading-[1.7] text-mist">{FOOTER.about}</p>
          </div>
          <div className="lg:col-span-3">
            <p className={COLUMN_TITLE}>{FOOTER.navTitle}</p>
            <ul className="mt-5 grid gap-2.5 text-[15px] text-mist">
              {MENU_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(event) => {
                      event.preventDefault();
                      go(item.id);
                    }}
                    className={`transition-colors duration-300 hover:text-white ${FOCUS_RING}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <p className={COLUMN_TITLE}>{FOOTER.socialTitle}</p>
            <ul className="mt-5 grid gap-2.5 text-[15px] text-mist">
              {SOCIAL.map((name) => (
                <li key={name}>
                  <a href="#" className={`group inline-flex items-center gap-2 transition-colors duration-300 hover:text-white ${FOCUS_RING}`}>
                    {name}
                    <ArrowUpRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <p className={COLUMN_TITLE}>{FOOTER.studioTitle}</p>
            <address className="mt-5 grid gap-1 text-[15px] not-italic leading-[1.6] text-mist">
              {FOOTER.studio.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-[14px] text-white/35">{FOOTER.rights(new Date().getFullYear())}</p>
          <ul className="flex flex-wrap gap-6 text-[14px] text-mist">
            {FOOTER.legal.map((label) => (
              <li key={label}>
                <a href="#" className={`hover:text-white ${FOCUS_RING}`}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => go("home")}
            className={`group flex items-center gap-3 text-[14px] text-white ${FOCUS_RING}`}
          >
            {FOOTER.backToTop}
            <span className="grid size-9 place-items-center rounded-full border border-white/20">
              <ArrowUpRight className="size-4 -rotate-45 transition-transform duration-500 group-hover:-translate-y-1" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
