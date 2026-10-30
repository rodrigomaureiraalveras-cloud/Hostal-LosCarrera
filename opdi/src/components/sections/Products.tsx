"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { PRODUCT_FAMILIES, PRODUCTS, PRODUCTS_COPY, type Product } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { useChrome } from "../chrome/SiteChrome";
import { ArrowRight, DotGrid } from "../ui/Icons";
import Modal from "../ui/Modal";
import { Eyebrow, Fade, Section, SectionTitle } from "../ui/Section";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

type Family = (typeof PRODUCT_FAMILIES)[number];

function ProductCard({ product, onOpen }: { product: Product; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group relative block h-full w-full overflow-hidden rounded-[40px] bg-paper text-left ${FOCUS}`}
    >
      <span className="relative block aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
      </span>
      <span className="flex items-end justify-between gap-4 p-7">
        <span className="block">
          <span className="block text-[15px] font-light tracking-[-0.02em] text-paper-ink/70">
            {product.family} · {product.price}
          </span>
          <span className="mt-1.5 block font-display text-[clamp(1.25rem,2.2vw,1.6rem)] leading-[1.05] tracking-[-0.1em] text-paper-ink">
            {product.name}
          </span>
          <span className="mt-2 block text-[14px] text-paper-ink/70">{product.tagline}</span>
        </span>
        <span className="grid size-[54px] shrink-0 place-items-center rounded-full bg-white transition-transform duration-500 ease-out group-hover:scale-110">
          <DotGrid className="size-[11px] text-sky-deep" />
        </span>
      </span>
    </button>
  );
}

export default function Products() {
  const { go } = useChrome();
  const reduced = useReducedMotion() ?? false;
  const [family, setFamily] = useState<Family>("Todos");
  const [selected, setSelected] = useState<Product | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const visible = useMemo(
    () => (family === "Todos" ? PRODUCTS : PRODUCTS.filter((item) => item.family === family)),
    [family],
  );

  const open = (product: Product) => {
    setSelected(product);
    setSheetOpen(true);
  };
  const close = () => setSheetOpen(false);

  return (
    <Section id="services" className="border-t border-white/10">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Eyebrow index="02">{PRODUCTS_COPY.eyebrow}</Eyebrow>
          <SectionTitle lines={PRODUCTS_COPY.title} className="mt-7" />
          <p className="mt-6 max-w-[30rem] text-[16px] leading-[1.7] text-mist">{PRODUCTS_COPY.lede}</p>
        </div>

        <LayoutGroup id="product-filter">
          <div
            role="tablist"
            aria-label={PRODUCTS_COPY.tablistLabel}
            className="flex flex-wrap gap-2 self-start rounded-full border border-white/15 p-1.5 lg:self-auto"
          >
            {PRODUCT_FAMILIES.map((name) => {
              const active = name === family;
              return (
                <button
                  key={name}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFamily(name)}
                  className={`relative rounded-full px-5 py-2.5 text-[14px] transition-colors duration-300 ${FOCUS}`}
                >
                  {active && (
                    <motion.span
                      layoutId="product-filter-pill"
                      className="absolute inset-0 rounded-full bg-white"
                      transition={{ duration: reduced ? 0.001 : 0.45, ease: EASE }}
                    />
                  )}
                  <span className={`relative ${active ? "text-ink" : "text-mist hover:text-white"}`}>{name}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      <motion.ul layout className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((product, index) => (
            <motion.li
              key={product.id}
              layout
              initial={{ opacity: 0, y: reduced ? 0 : 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -16 }}
              transition={{ duration: reduced ? 0.001 : 0.6, ease: EASE, delay: reduced ? 0 : index * 0.05 }}
            >
              <ProductCard product={product} onOpen={() => open(product)} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {visible.length === 0 ? (
        <p className="mt-12 text-[14px] text-mist">{PRODUCTS_COPY.empty}</p>
      ) : (
        <Fade className="mt-12 text-[14px] text-mist">
          <p aria-live="polite">{PRODUCTS_COPY.showing(visible.length, PRODUCTS.length)}</p>
        </Fade>
      )}

      <Modal open={sheetOpen} onClose={close} title={selected?.name ?? ""} variant="sheet" maxWidth="720px">
        {selected && (
          <div>
            <img src={selected.image} alt="" className="aspect-[16/9] w-full rounded-[24px] object-cover" />
            <p className="mt-7 text-[13px] uppercase tracking-[0.2em] text-mist">
              {selected.family} · {selected.platform}
            </p>
            <h3 className="display-tight mt-3 text-[clamp(1.8rem,4vw,2.6rem)] text-white">{selected.name}</h3>
            <p className="mt-4 max-w-[36rem] text-[16px] leading-[1.7] text-mist">{selected.description}</p>

            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-4">
              {(
                [
                  [PRODUCTS_COPY.specs.timeline, selected.timeline],
                  [PRODUCTS_COPY.specs.stack, selected.stack],
                  [PRODUCTS_COPY.specs.support, selected.support],
                  [PRODUCTS_COPY.specs.price, selected.price],
                ] as const
              ).map(([term, value]) => (
                <div key={term} className="bg-panel p-4">
                  <dt className="text-[12px] uppercase tracking-[0.18em] text-white/40">{term}</dt>
                  <dd className="mt-1.5 text-[15px] text-white">{value}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-6 flex flex-wrap gap-2">
              {selected.features.map((feature) => (
                <li key={feature} className="rounded-full border border-white/15 px-4 py-2 text-[13px] text-mist">
                  {feature}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => {
                close();
                window.setTimeout(() => go("contact"), 200);
              }}
              className={`group mt-8 inline-flex h-14 items-center gap-4 rounded-full bg-white pl-7 pr-3 text-[15px] font-medium text-ink ${FOCUS}`}
            >
              {PRODUCTS_COPY.cta}
              <span className="grid size-10 place-items-center rounded-full bg-sky text-white">
                <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </button>
          </div>
        )}
      </Modal>
    </Section>
  );
}
