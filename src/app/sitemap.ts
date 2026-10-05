import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

// Нужно явно для `output: "export"` (статическая превью-сборка для GitHub Pages) —
// без этого Next не знает, что маршрут можно сгенерировать один раз при сборке.
export const dynamic = "force-static";

const staticPaths = ["/", "/istoriya", "/lyudi", "/foto", "/klub", "/politika"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return staticPaths.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority: path === "/" ? 1 : 0.6,
  }));
}
