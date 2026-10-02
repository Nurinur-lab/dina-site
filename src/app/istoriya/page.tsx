import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DiagonalStripe } from "@/components/DiagonalStripe";
import { TimelineItem } from "@/components/history/TimelineItem";
import { TrophiesSection } from "@/components/history/TrophiesSection";
import { PageHeader } from "@/components/PageHeader";
import { timeline } from "@/lib/content";

export default function IstoriyaPage() {
  return (
    <main>
      <Breadcrumbs current="История" />
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
