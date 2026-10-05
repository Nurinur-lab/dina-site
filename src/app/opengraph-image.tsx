import { club } from "@/lib/content";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

// Нужно явно для `output: "export"` (статическая превью-сборка для GitHub Pages).
export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${club.shortName} — ${club.tagline}`;

export default function Image() {
  return renderOgImage(club.shortName, club.tagline);
}
