import { BACKGROUNDS } from "@/lib/content";
import { sectionsIn } from "@/sections";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main>
        {sectionsIn(undefined).map(({ id, Component }) => (
          <Component key={id} />
        ))}

        {/* Todo lo que viene después del hero comparte un solo fondo. */}
        <div className="relative isolate">
          <SectionBackdrop layers={BACKGROUNDS.body} className="-z-10" />
          {sectionsIn("body").map(({ id, Component }) => (
            <Component key={id} />
          ))}
        </div>
      </main>
    </>
  );
}
