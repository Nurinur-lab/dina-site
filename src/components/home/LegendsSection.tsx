import { Button } from "@/components/Button";
import { featuredLegends } from "@/lib/content";
import { LegendCard } from "./LegendCard";

/** Блок 4 — «Легенды». */
export function LegendsSection() {
  return (
    <section aria-labelledby="legends-heading" className="bg-night-2 py-20 md:py-28">
      <div className="container-site flex flex-col gap-10">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <h2 id="legends-heading" className="text-4xl md:text-5xl">
            Легенды
          </h2>
          <Button variant="secondary" href="/lyudi">
            Все легенды
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {featuredLegends.map((legend) => (
            <LegendCard key={legend.id} legend={legend} />
          ))}
        </div>
      </div>
    </section>
  );
}
