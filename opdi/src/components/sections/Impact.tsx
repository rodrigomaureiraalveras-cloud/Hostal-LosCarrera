"use client";

import { motion, useReducedMotion } from "framer-motion";
import { IMAGES } from "@/lib/assets";
import { IMPACT, STATS } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { Ring } from "../hero/HeroParts";
import Counter from "../ui/Counter";
import Parallax from "../ui/Parallax";
import { Eyebrow, Fade, Section, SectionTitle } from "../ui/Section";

export default function Impact() {
  const reduced = useReducedMotion() ?? false;
  return (
    <Section id="impact" className="border-t border-white/10">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow index="03">{IMPACT.eyebrow}</Eyebrow>
          <SectionTitle lines={IMPACT.title} className="mt-7" />
          <p className="mt-6 max-w-[26rem] text-[16px] leading-[1.7] text-mist">{IMPACT.lede}</p>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-[32px] bg-white/10 sm:grid-cols-2 lg:col-span-8">
          {STATS.map((stat, index) => (
            <motion.li
              key={stat.label}
              className="bg-ink p-8 lg:p-10"
              initial={{ opacity: 0, y: reduced ? 0 : 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: reduced ? 0.001 : 0.8, ease: EASE, delay: reduced ? 0 : index * 0.08 }}
            >
              <Ring className="size-9 text-sky/70" duration={30} />
              <Counter
                value={stat.value}
                suffix={stat.suffix}
                className="mt-7 block font-display text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-[-0.1em] text-white"
              />
              <p className="mt-4 text-[15px] text-white">{stat.label}</p>
              <p className="mt-1.5 text-[14px] leading-[1.6] text-mist">{stat.caption}</p>
            </motion.li>
          ))}
        </ul>
      </div>

      <Fade className="mt-16">
        <Parallax distance={40}>
          <div className="relative overflow-hidden rounded-[40px]">
            <img src={IMAGES.mossWave} alt="" className="aspect-[21/9] min-h-[260px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            <p className="absolute bottom-8 left-8 right-8 max-w-[34rem] font-display text-[clamp(1.2rem,2.6vw,2rem)] leading-[1.2] tracking-[-0.09em] text-white">
              {IMPACT.plateLine}
            </p>
          </div>
        </Parallax>
      </Fade>
    </Section>
  );
}
