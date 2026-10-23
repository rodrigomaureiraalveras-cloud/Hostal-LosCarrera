import { HERO, MEDIA, NAV } from "@/lib/content";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <img src={MEDIA.logomark} alt="" aria-hidden className="block size-10 shrink-0 object-contain" />
      {compact ? null : (
        <span aria-hidden className="font-headline text-[20px] uppercase leading-none tracking-[0.02em] text-white">
          {NAV.wordmark}
        </span>
      )}
      <span className="sr-only">{HERO.brand}</span>
    </span>
  );
}
