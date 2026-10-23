"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CONTACT, NAV } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { useActiveSection, useScrolled } from "@/lib/hooks";
import { Logo } from "@/components/ui/Logo";
import { SocialRow } from "@/components/ui/SocialRow";
import { MenuOverlay } from "@/components/layout/MenuOverlay";
import { PhoneIcon } from "@/components/ui/Icons";

const IDS = NAV.links.map((l) => l.id);

export function SiteHeader() {
  const scrolled = useScrolled(40);
  const active = useActiveSection(IDS);
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled ? "border-white/15 bg-[rgba(11,20,32,0.72)] backdrop-blur-xl" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-10 lg:h-[76px]">
          <a href="#home" className="shrink-0">
            <Logo />
          </a>

          <nav className="hidden lg:block" aria-label={NAV.dialogLabel}>
            <ul className="flex items-center gap-[52px] text-[13px]">
              {NAV.links.map((link) => {
                const current = active === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      aria-current={current ? "page" : undefined}
                      className={`link-underline pb-0.5 transition-opacity duration-300 ${
                        current ? "font-bold text-gold opacity-100" : "text-white opacity-70 hover:opacity-100"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <div className="flex items-center gap-2">
              <PhoneIcon className="size-4 shrink-0 text-gold" />
              <span className="flex flex-col text-[12px] font-semibold leading-tight xl:flex-row xl:gap-3">
                {CONTACT.phones.map((p) => (
                  <a
                    key={p.tel}
                    href={p.tel}
                    aria-label={`${CONTACT.phoneAria}: ${p.display}`}
                    className="whitespace-nowrap text-white transition-colors duration-300 hover:text-gold"
                  >
                    {p.display}
                  </a>
                ))}
              </span>
            </div>
            <SocialRow />
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
            className="group flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white lg:hidden"
          >
            {NAV.menuLabel}
            <span aria-hidden className="flex w-6 flex-col items-end gap-[6px]">
              <span className="block h-px w-full bg-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-1/2" />
              <span className="block h-px w-1/2 bg-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
            </span>
          </button>
        </div>
      </motion.header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
