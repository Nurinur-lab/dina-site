import type { Metadata } from "next";
import { AlumniSection } from "@/components/home/AlumniSection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LegendDetailCard } from "@/components/people/LegendDetailCard";
import { PageHeader } from "@/components/PageHeader";
import { people } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { buildPersonSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Люди «Дины»",
  description:
    "Константин Ерёменко, Александр Верижников, Олег Денисов и другие игроки и тренеры футзальной «Дины» (Москва) — легенды, с которыми клуб выигрывал титулы России и Европы.",
  path: "/lyudi",
});

const legendsSchema = {
  "@context": "https://schema.org",
  "@graph": people.legends.map(buildPersonSchema),
};

export default function LyudiPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legendsSchema) }}
      />
      <Breadcrumbs current="Люди" path="/lyudi" />
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
