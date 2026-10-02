import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Легенды ИФК «Дина»: игроки и тренеры золотой эпохи";

export default function Image() {
  return renderOgImage("Люди", "Футболисты и тренеры, создавшие историю «Дины».");
}
