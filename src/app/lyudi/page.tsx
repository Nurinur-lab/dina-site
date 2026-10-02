import { AlumniSection } from "@/components/home/AlumniSection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LegendDetailCard } from "@/components/people/LegendDetailCard";
import { PageHeader } from "@/components/PageHeader";
import { people } from "@/lib/content";

export default function LyudiPage() {
  return (
    <main>
      <Breadcrumbs current="Люди" />
      <PageHeader
        title="Люди"
        intro="Футболисты, тренеры и президент, с которыми «Дина» выигрывала девять чемпионств России и три турнира европейских чемпионов."
      />

      <section aria-label="Легенды клуба" className="container-site pb-20 md:pb-28">
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 md:gap-x-8 md:gap-y-16">
          {people.legends.map((legend) => (
            <LegendDetailCard key={legend.id} legend={legend} />
          ))}
        </div>
      </section>

      <AlumniSection />
    </main>
  );
}
