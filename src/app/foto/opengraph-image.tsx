import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

// Нужно явно для `output: "export"` (статическая превью-сборка для GitHub Pages).
export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "История «Дины» в фотографиях";

export default function Image() {
  return renderOgImage(
    "История в фотографиях",
    "Чемпионства, еврокубки и Межконтинентальный кубок.",
  );
}
