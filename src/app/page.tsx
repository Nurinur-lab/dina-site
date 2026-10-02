import type { Metadata } from "next";
import { AlumniSection } from "@/components/home/AlumniSection";
import { FinalSection } from "@/components/home/FinalSection";
import { Hero } from "@/components/home/Hero";
import { HistorySection } from "@/components/home/HistorySection";
import { LegendsSection } from "@/components/home/LegendsSection";
import { PhotoPanelSection } from "@/components/home/PhotoPanelSection";
import { ScaleSection } from "@/components/home/ScaleSection";
import { TodaySection } from "@/components/home/TodaySection";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "ИФК «Дина» — история футзального клуба-чемпиона из Москвы",
  description:
    "Императорский футбольный клуб «Дина» (Москва): девять чемпионств России, три победы в Турнире европейских чемпионов и Межконтинентальный кубок 1997 года. История, легенды и титулы футзальной «Дины».",
  path: "/",
  absoluteTitle: true,
});

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
