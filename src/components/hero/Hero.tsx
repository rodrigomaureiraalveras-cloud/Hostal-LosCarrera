import { HeroDesktop } from "@/components/hero/HeroDesktop";
import { HeroMobile } from "@/components/hero/HeroMobile";

/* Los dos árboles van SIEMPRE montados y se alternan con CSS (`md:block` /
   `md:hidden`). No es un `matchMedia`: así servidor y cliente pintan lo mismo
   y no hay error de hidratación ni parpadeo del diseño equivocado. */
export function Hero() {
  return (
    <section id="home" className="relative">
      <HeroDesktop />
      <HeroMobile />
    </section>
  );
}
