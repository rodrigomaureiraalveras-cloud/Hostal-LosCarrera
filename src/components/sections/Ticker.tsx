import { MARQUEE } from "@/lib/content";
import { Marquee } from "@/components/ui/Marquee";

export function Ticker() {
  const reversed = [...MARQUEE.items].reverse();
  return (
    <section aria-label={MARQUEE.items.join(" · ")} className="relative border-y border-white/15 py-6 md:py-8">
      <Marquee
        items={MARQUEE.items}
        separator={MARQUEE.separators[0]}
        duration={38}
        className="font-headline text-[clamp(40px,6.4vw,92px)] uppercase leading-[1.1] text-white"
      />
      <Marquee
        items={reversed}
        separator={MARQUEE.separators[1]}
        duration={52}
        direction="right"
        className="mt-3 text-[13px] font-semibold uppercase tracking-[0.24em] text-gold md:text-[14px]"
      />
    </section>
  );
}
