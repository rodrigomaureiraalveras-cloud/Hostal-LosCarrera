import ScrollProgress from "@/components/chrome/ScrollProgress";
import SiteChrome from "@/components/chrome/SiteChrome";
import Hero from "@/components/hero/Hero";
import Contact from "@/components/sections/Contact";
import Faq from "@/components/sections/Faq";
import Impact from "@/components/sections/Impact";
import Journal from "@/components/sections/Journal";
import Philosophy from "@/components/sections/Philosophy";
import Products from "@/components/sections/Products";
import SiteFooter from "@/components/sections/SiteFooter";
import { UI } from "@/lib/content";

export default function Page() {
  return (
    <SiteChrome>
      <ScrollProgress />
      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[200] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-[14px] focus:text-ink"
      >
        {UI.skip}
      </a>
      <main>
        <Hero />
        <Philosophy />
        <Products />
        <Impact />
        <Journal />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </SiteChrome>
  );
}
