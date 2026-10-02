import type { Metadata } from "next";

/** CLAUDE.md, раздел 8: без NEXT_PUBLIC_SITE_URL — localhost:3000. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

/**
 * Единая сборка метаданных страницы: title, description, canonical,
 * Open Graph, Twitter card. OG-картинка подхватывается автоматически из
 * соседнего opengraph-image.tsx (конвенция файлов Next.js).
 */
export function buildMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  /** true — не подставлять шаблон "%s — Дина" из layout (для главной страницы). */
  absoluteTitle?: boolean;
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Дина",
      locale: "ru_RU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
