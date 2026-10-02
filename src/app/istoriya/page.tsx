import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DiagonalStripe } from "@/components/DiagonalStripe";
import { TimelineItem } from "@/components/history/TimelineItem";
import { TrophiesSection } from "@/components/history/TrophiesSection";
import { PageHeader } from "@/components/PageHeader";
import { timeline } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "История «Дины»",
  description:
    "От чемпионства СНГ 1992 года до возвращения титула в 2014-м: семь этапов истории ИФК «Дина» — девять чемпионств России, три победы в Турнире европейских чемпионов и Межконтинентальный кубок.",
  path: "/istoriya",
});

export default function IstoriyaPage() {
  return (
    <main>
      <Breadcrumbs current="История" path="/istoriya" />
      <PageHeader title="История" intro={timeline.intro} />
      <DiagonalStripe />

      <div className="container-site divide-line divide-y">
        {timeline.events.map((event, index) => (
          <TimelineItem key={event.id} event={event} index={index} />
        ))}
      </div>

      <TrophiesSection />
    </main>
  );
}
