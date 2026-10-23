"use client";

import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CONTACT, JOIN, MEDIA } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { SplitText } from "@/components/ui/SplitText";
import { CTA } from "@/components/ui/CTA";
import { CheckIcon, PhoneIcon, WhatsappIcon } from "@/components/ui/Icons";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
type Status = "idle" | "error" | "sending" | "done";

export function Join() {
  const reduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const silhouetteY = useTransform(scrollYProgress, [0, 1], [120, -120]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setStatus("error");
      inputRef.current?.focus();
      return;
    }
    setStatus("sending");
    window.setTimeout(() => setStatus("done"), 700);
  };

  const error = status === "error";

  return (
    <section ref={sectionRef} id="join" className="relative overflow-hidden px-5 py-28 md:px-10 md:py-40">
      <motion.img
        src={MEDIA.logo}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-[8%] top-[8%] hidden h-[84%] w-auto max-w-none object-contain opacity-20 md:block"
        style={reduce ? undefined : { y: silhouetteY }}
      />

      <div className="relative mx-auto max-w-[1280px]">
        <span className="inline-block rounded-full border border-gold/50 bg-gold/10 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
          {JOIN.pill}
        </span>
        <div className="mt-8">
          <SplitText
            text={JOIN.headlines[0]}
            className="font-headline text-[clamp(56px,11vw,168px)] uppercase leading-[0.92] text-white"
          />
          <SplitText
            as="p"
            text={JOIN.headlines[1]}
            className="font-headline text-[clamp(56px,11vw,168px)] uppercase leading-[0.92] text-gold"
          />
        </div>

        <div className="mt-14 max-w-[620px]">
          <AnimatePresence mode="wait" initial={false}>
            {status === "done" ? (
              <motion.div
                key="done"
                role="status"
                className="glass flex items-start gap-4 rounded-[24px] p-6 md:p-8"
                initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold text-night">
                  <CheckIcon className="size-5" />
                </span>
                <p className="text-[16px] leading-[1.55] text-white">{JOIN.done(email.trim())}</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                noValidate
                onSubmit={onSubmit}
                initial={false}
                exit={{ opacity: 0, y: reduce ? 0 : -12, transition: { duration: 0.3, ease: EASE } }}
              >
                <label htmlFor="join-email" className="sr-only">
                  {JOIN.emailLabel}
                </label>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    ref={inputRef}
                    id="join-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setStatus("idle");
                    }}
                    placeholder={JOIN.placeholder}
                    aria-invalid={error}
                    aria-describedby="join-email-error"
                    className={`h-[56px] flex-1 rounded-full border bg-white/10 px-6 text-[16px] text-white placeholder:text-white/45 backdrop-blur-md transition-colors duration-500 focus:outline-none focus-visible:border-gold ${
                      error ? "border-gold" : "border-white/30"
                    }`}
                  />
                  <CTA type="submit" disabled={status === "sending"}>
                    {status === "sending" ? JOIN.sending : JOIN.submit}
                  </CTA>
                </div>
                <p
                  id="join-email-error"
                  role={error ? "alert" : undefined}
                  className={`mt-3 pl-6 text-[14px] text-gold transition-opacity duration-300 ${error ? "opacity-100" : "opacity-0"}`}
                >
                  {JOIN.error}
                </p>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-10 border-t border-white/12 pt-8">
            <p className="text-[15px] text-white/70">{CONTACT.prompt}</p>
            <div className="mt-4 flex flex-col gap-3">
              {CONTACT.phones.map((p) => (
                <div key={p.tel} className="flex flex-wrap items-center gap-3">
                  <a
                    href={p.tel}
                    className="flex items-center gap-3 rounded-full border border-gold/60 px-5 py-3 text-[15px] font-semibold text-white transition-colors duration-500 hover:bg-gold hover:text-night"
                  >
                    <PhoneIcon className="size-4 text-gold" />
                    <span>
                      {CONTACT.callLabel} · {p.display}
                    </span>
                  </a>
                  <a
                    href={p.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${CONTACT.whatsappLabel} ${p.display}`}
                    className="flex items-center gap-3 rounded-full border border-white/25 px-5 py-3 text-[15px] font-semibold text-white transition-colors duration-500 hover:border-gold hover:text-gold"
                  >
                    <WhatsappIcon className="size-4" />
                    {CONTACT.whatsappLabel}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
