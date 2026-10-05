import { club } from "@/lib/content";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

// Нужно явно для `output: "export"` (статическая превью-сборка для GitHub Pages).
export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${club.displayFullName} — клуб и контакты`;

export default function Image() {
  return renderOgImage("Клуб и контакты", club.displayFullName);
}
