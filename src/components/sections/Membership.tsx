"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PLANS } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal, Rise } from "@/components/ui/Reveal";
import { CTA } from "@/components/ui/CTA";
import { CheckIcon } from "@/components/ui/Icons";

/* El selector mensual/anual solo aparece si algún plan tiene precio. */
const HAS_PRICES = PLANS.items.some((p) => p.monthly !== null || p.yearly !== null);

export function Membership() {
  const reduce = useReducedMotion() ?? false;
  const [yearly, setYearly] = useState(false);

  return (
    <section id="membership" className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <SectionHead kicker={PLANS.kicker} title={PLANS.title} accent={PLANS.accent} lead={PLANS.lead} align="center" />

        {HAS_PRICES ? (
          <div className="mt-10 flex items-center justify-center gap-4 text-[14px] font-semibold">
            <span className={yearly ? "text-white/50" : "text-white"}>{PLANS.billing.monthly}</span>
            <button
              type="button"
              role="switch"
              aria-checked={yearly}
              aria-label={PLANS.billing.yearly}
              onClick={() => setYearly((v) => !v)}
              className="flex h-9 w-[76px] rounded-full border border-white/40 p-1 transition-colors duration-500 hover:border-gold"
            >
              <motion.span
                layout={!reduce}
                transition={{ duration: 0.4, ease: EASE }}
                className={`block size-7 rounded-full bg-gold ${yearly ? "ml-auto" : ""}`}
              />
            </button>
            <span className={yearly ? "text-white" : "text-white/50"}>{PLANS.billing.yearly}</span>
            <span className="rounded-full bg-gold/15 px-3 py-1 text-[12px] text-gold">{PLANS.billing.badge}</span>
          </div>
        ) : null}

        <Reveal className="mt-14 grid gap-6 lg:grid-cols-3" each={0.1}>
          {PLANS.items.map((plan) => {
            const featured = plan.featured;
            const price = yearly ? plan.yearly : plan.monthly;
            return (
              <Rise
                key={plan.name}
                className={`relative flex flex-col rounded-[28px] p-8 md:p-10 ${
                  featured ? "bg-gold text-night" : "glass text-white"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-headline text-[32px] uppercase leading-none">{plan.name}</h3>
                  {featured ? (
                    <span className="rounded-full bg-night px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
                      {PLANS.featuredBadge}
                    </span>
                  ) : null}
                </div>
                <p className={`mt-3 text-[15px] leading-[1.5] ${featured ? "text-night/75" : "text-white/65"}`}>{plan.copy}</p>

                <p className="mt-8 flex items-baseline gap-1 overflow-hidden">
                  <motion.span
                    key={yearly ? "y" : "m"}
                    initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="font-headline text-[clamp(40px,4.4vw,56px)] uppercase leading-none"
                  >
                    {price === null ? PLANS.quote : `${PLANS.currency}${price}`}
                  </motion.span>
                  {price === null ? null : (
                    <span className={`text-[14px] ${featured ? "text-night/60" : "text-white/60"}`}>
                      {yearly ? PLANS.per.yearly : PLANS.per.monthly}
                    </span>
                  )}
                </p>

                <ul className={`mt-8 flex flex-1 flex-col gap-3 border-t pt-8 text-[15px] ${featured ? "border-night/15" : "border-white/15"}`}>
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-3">
                      <span
                        className={`flex size-6 shrink-0 items-center justify-center rounded-full ${
                          featured ? "bg-night text-gold" : "bg-gold/15 text-gold"
                        }`}
                      >
                        <CheckIcon className="size-3.5" />
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <CTA href={PLANS.href} variant={featured ? "dark" : "ghost"} compact>
                    {PLANS.choose(plan.name)}
                  </CTA>
                </div>
              </Rise>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
