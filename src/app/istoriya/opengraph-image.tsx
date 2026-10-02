import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "История ИФК «Дина»: девять чемпионств России и три победы в Европе";

export default function Image() {
  return renderOgImage("История", "Девять чемпионств России. Три победы в Европе.");
}
