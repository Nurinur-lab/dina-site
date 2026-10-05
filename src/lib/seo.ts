import type { Metadata } from "next";

/** CLAUDE.md, раздел 8: без NEXT_PUBLIC_SITE_URL — localhost:3000. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const IS_PREVIEW = process.env.PREVIEW_STATIC === "1";

/**
 * Склеивает путь страницы с SITE_URL. Нарочно не через `new URL(path, SITE_URL)` —
 * если у SITE_URL есть собственный путь (например, превью на GitHub Pages:
 * https://user.github.io/dina-site), `new URL("/", base)` отбрасывает этот путь
 * (ведущий слэш в `path` трактуется как абсолютный путь от корня домена), и
 * canonical/OG-ссылки указывали бы на домен без /dina-site.
 */
export function absoluteUrl(path: string): string {
  const base = SITE_URL.endsWith("/") ? SITE_URL.slice(0, -1) : SITE_URL;
  return `${base}${path}`;
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
    // Превью на GitHub Pages — демо-копия сайта, не должна попадать в поисковую выдачу.
    ...(IS_PREVIEW && { robots: { index: false, follow: false } }),
  };
}
