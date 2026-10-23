"use client";

import { FOOTER, FOOTER_LINKS, HERO, NAV } from "@/lib/content";
import { useScrolled } from "@/lib/hooks";
import { Logo } from "@/components/ui/Logo";
import { SocialRow } from "@/components/ui/SocialRow";
import { Reveal, Rise } from "@/components/ui/Reveal";
import { ArrowLeftIcon } from "@/components/ui/Icons";

export function SiteFooter() {
  const showTop = useScrolled(600);

  return (
    <footer className="relative overflow-hidden px-5 pb-10 pt-24 md:px-10 md:pt-32">
      <p
        aria-hidden
        className="font-headline pointer-events-none absolute inset-x-0 bottom-16 select-none whitespace-nowrap text-center text-[min(15vw,15rem)] uppercase leading-none text-white/[0.06]"
      >
        {NAV.wordmark}
      </p>

      <div className="relative mx-auto max-w-[1280px]">
        <Reveal className="grid gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
          <Rise>
            <Logo />
            <p className="mt-6 max-w-[360px] text-[15px] leading-[1.55] text-white/60">{HERO.body}</p>
            <SocialRow className="mt-8" />
          </Rise>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {FOOTER_LINKS.map((col) => (
              <Rise key={col.title}>
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">{col.title}</p>
                <ul className="mt-5 flex flex-col gap-3 text-[15px]">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.href ? (
                        <a href={link.href} className="link-underline text-white/85 hover:text-gold">
                          {link.label}
                        </a>
                      ) : (
                        <span className="text-white/50">{link.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </Rise>
            ))}
          </div>
        </Reveal>

        <div className="mt-40 flex flex-col gap-3 border-t border-white/12 pt-6 text-[12px] text-white/50 md:mt-56 md:flex-row md:justify-between">
          <p>{FOOTER.copyright}</p>
          <p>{FOOTER.credit}</p>
        </div>
      </div>

      <a
        href="#home"
        aria-label={FOOTER.backToTop}
        tabIndex={showTop ? 0 : -1}
        className={`fixed bottom-6 right-6 z-40 flex size-[48px] items-center justify-center rounded-full bg-gold text-night shadow-lg transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowLeftIcon className="size-5 rotate-90" />
      </a>
    </footer>
  );
}
