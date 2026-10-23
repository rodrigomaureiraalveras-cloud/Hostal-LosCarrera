"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { MANIFESTO, MEDIA } from "@/lib/content";
import { useCountUp } from "@/lib/hooks";
import { SectionHead } from "@/components/ui/SectionHead";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal, Rise } from "@/components/ui/Reveal";

/* Tinte celeste de la foto chica. */
const NIGHT_TINT = "linear-gradient(200deg, rgba(92,200,240,0.5), rgba(11,20,32,0.5))";

function Figure({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const count = useCountUp(value, inView, reduce, 1400);
  return (
    <div ref={ref}>
      <p className="font-headline text-[clamp(40px,5vw,64px)] leading-none text-gold">
        {count}
        {suffix}
      </p>
      <p className="mt-3 text-[13px] leading-[1.4] text-white/60">{label}</p>
    </div>
  );
}

export function Manifesto() {
  const reduce = useReducedMotion() ?? false;
  const [main, inset] = MANIFESTO.media;

  return (
    <section id="about" className="relative overflow-x-clip px-5 pb-28 pt-24 md:px-10 md:pb-40 md:pt-32">
      <div className="mx-auto grid max-w-[1280px] gap-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-24">
        <div>
          <SectionHead kicker={MANIFESTO.kicker} title={MANIFESTO.title} accent={MANIFESTO.accent} lead={MANIFESTO.lead} />

          <Reveal as="ol" className="mt-14">
            {MANIFESTO.pillars.map((p) => (
              <Rise
                as="li"
                key={p.number}
                className="group grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 border-t border-white/12 py-6 transition-colors duration-500 last:border-b hover:border-gold/60 md:grid-cols-[4rem_8rem_minmax(0,1fr)]"
              >
                <span className="text-[12px] font-semibold tracking-[0.18em] text-white/45 transition-colors duration-500 group-hover:text-gold">
                  {p.number}
                </span>
                <span className="font-headline text-[24px] uppercase text-white/85 transition-colors duration-500 group-hover:text-white">
                  {p.title}
                </span>
                <span className="col-start-2 mt-2 text-[15px] leading-[1.55] text-white/60 transition-colors duration-500 group-hover:text-white/90 md:col-start-3 md:mt-0">
                  {p.text}
                </span>
              </Rise>
            ))}
          </Reveal>

          <div className="mt-14 grid grid-cols-3 gap-6">
            {MANIFESTO.figures.map((f) => (
              <Figure key={f.label} {...f} />
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] pb-16 lg:pt-10">
          <Parallax distance={40}>
            <MediaFrame src={main.src} alt={main.caption} caption={main.caption} ratio="4 / 5" className="rounded-[24px]" />
          </Parallax>
          <Parallax distance={-70} className="absolute -bottom-12 -left-4 w-[52%]">
            <MediaFrame
              src={inset.src}
              alt={inset.caption}
              caption={inset.caption}
              ratio="1 / 1"
              tint={NIGHT_TINT}
              className="rounded-[20px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]"
            />
          </Parallax>
          <motion.img
            src={MEDIA.arcs}
            alt=""
            aria-hidden
            className="absolute -top-6 right-0 w-[96px] md:-right-10 md:w-[128px]"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </section>
  );
}
