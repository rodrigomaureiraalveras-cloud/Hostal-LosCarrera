"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { JOURNAL, JOURNAL_COPY } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { ArrowUpRight } from "../ui/Icons";
import Modal from "../ui/Modal";
import { Eyebrow, Section, SectionTitle } from "../ui/Section";

type Note = (typeof JOURNAL)[number];

export default function Journal() {
  const reduced = useReducedMotion() ?? false;
  const [note, setNote] = useState<Note | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <Section id="journal" className="border-t border-white/10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Eyebrow index="04">{JOURNAL_COPY.eyebrow}</Eyebrow>
          <SectionTitle lines={JOURNAL_COPY.title} className="mt-7" />
        </div>
        <p className="max-w-[24rem] text-[16px] leading-[1.7] text-mist">{JOURNAL_COPY.lede}</p>
      </div>

      <ul className="mt-14 grid gap-6 md:grid-cols-3">
        {JOURNAL.map((item, index) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, y: reduced ? 0 : 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduced ? 0.001 : 0.85, ease: EASE, delay: reduced ? 0 : index * 0.1 }}
          >
            <button
              type="button"
              onClick={() => {
                setNote(item);
                setOpen(true);
              }}
              className="group block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <span className="block overflow-hidden rounded-[32px]">
                <img
                  src={item.image}
                  alt=""
                  className="aspect-[5/4] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
              </span>
              <span className="mt-6 flex items-center gap-3 text-[12px] uppercase tracking-[0.2em] text-mist">
                {item.kicker}
                <span className="h-px w-6 bg-white/20" />
                {item.readingTime}
              </span>
              <span className="mt-3 flex items-start justify-between gap-4">
                <span className="font-display text-[clamp(1.2rem,2.2vw,1.6rem)] leading-[1.15] tracking-[-0.09em] text-white">
                  {item.title}
                </span>
                <ArrowUpRight className="mt-1 size-5 shrink-0 text-white/40 transition-all duration-500 group-hover:translate-x-1 group-hover:text-sky" />
              </span>
              <span className="mt-3 block text-[15px] leading-[1.6] text-mist">{item.excerpt}</span>
            </button>
          </motion.li>
        ))}
      </ul>

      <Modal open={open} onClose={() => setOpen(false)} title={note?.title ?? ""} variant="sheet" maxWidth="680px">
        {note && (
          <article>
            <img src={note.image} alt="" className="aspect-[16/9] w-full rounded-[24px] object-cover" />
            <p className="mt-7 text-[13px] uppercase tracking-[0.2em] text-mist">
              {note.kicker} · {note.date} · {note.readingTime}
            </p>
            <h3 className="display-tight mt-3 text-[clamp(1.7rem,4vw,2.4rem)] text-white">{note.title}</h3>
            <p className="mt-4 text-[16px] leading-[1.7] text-white/85">{note.excerpt}</p>
            <p className="mt-4 text-[16px] leading-[1.7] text-mist">{JOURNAL_COPY.closing}</p>
          </article>
        )}
      </Modal>
    </Section>
  );
}
