/**
 * next/link и метаданные Next.js сами подставляют `basePath` из next.config.ts,
 * а вот `src` у `next/image` в режиме `images.unoptimized` (превью на GitHub
 * Pages, см. PREVIEW_STATIC в next.config.ts) — нет. Компоненты, которые рисуют
 * файлы из `public/` напрямую через строковый путь (герб клуба), прогоняют его
 * через эту функцию, чтобы путь был верным и на VPS (без префикса), и в превью.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`;
}
