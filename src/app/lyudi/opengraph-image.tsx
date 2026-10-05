import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

// Нужно явно для `output: "export"` (статическая превью-сборка для GitHub Pages).
export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Легенды ИФК «Дина»: игроки и тренеры золотой эпохи";

export default function Image() {
  return renderOgImage("Люди", "Футболисты и тренеры, создавшие историю «Дины».");
}
