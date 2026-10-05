import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

// Нужно явно для `output: "export"` (статическая превью-сборка для GitHub Pages).
export const dynamic = "force-static";

const isPreview = process.env.PREVIEW_STATIC === "1";

export default function robots(): MetadataRoute.Robots {
  // Превью на GitHub Pages — демо-копия, не должна индексироваться поисковиками.
  if (isPreview) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/styleguide",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
