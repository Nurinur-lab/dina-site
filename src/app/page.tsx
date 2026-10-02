import { AlumniSection } from "@/components/home/AlumniSection";
import { FinalSection } from "@/components/home/FinalSection";
import { Hero } from "@/components/home/Hero";
import { HistorySection } from "@/components/home/HistorySection";
import { LegendsSection } from "@/components/home/LegendsSection";
import { PhotoPanelSection } from "@/components/home/PhotoPanelSection";
import { ScaleSection } from "@/components/home/ScaleSection";
import { TodaySection } from "@/components/home/TodaySection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ScaleSection />
      <HistorySection />
      <LegendsSection />
      <TodaySection />
      <AlumniSection />
      <PhotoPanelSection />
      <FinalSection />
    </main>
  );
}
