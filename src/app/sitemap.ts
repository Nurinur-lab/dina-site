import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const staticPaths = ["/", "/istoriya", "/lyudi", "/foto", "/klub", "/politika"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return staticPaths.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified,
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority: path === "/" ? 1 : 0.6,
  }));
}
