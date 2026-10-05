import type { NextConfig } from "next";

const isPreview = process.env.PREVIEW_STATIC === "1";

const nextConfig: NextConfig = {
  // standalone — для Docker-сборки (раздел 9 CLAUDE.md), export — для статического
  // превью на GitHub Pages (PREVIEW_STATIC=1). Основная (VPS) сборка не меняется.
  // Докерфайл выставляет BUILD_STANDALONE=1; локальный `next start` с ним не работает.
  output: isPreview ? "export" : process.env.BUILD_STANDALONE ? "standalone" : undefined,
  ...(isPreview && {
    basePath: "/dina-site",
    assetPrefix: "/dina-site",
    // next/image в unoptimized-режиме не подставляет basePath в src сам (в отличие от
    // next/link) — компоненты, рисующие картинки из public/ напрямую, берут префикс
    // отсюда через src/lib/base-path.ts.
    env: { NEXT_PUBLIC_BASE_PATH: "/dina-site" },
  }),
  images: {
    formats: ["image/avif", "image/webp"],
    // Next Image Optimization API требует сервер — на статическом хостинге недоступен.
    unoptimized: isPreview,
  },
  ...(isPreview && {
    turbopack: {
      resolveAlias: {
        // Настоящая форма использует Server Action, несовместимый с `output: "export"`.
        // Подменяем на статическую заглушку — см. комментарий в ContactForm.preview.tsx.
        "@/components/klub/ContactForm": "./src/components/klub/ContactForm.preview.tsx",
      },
    },
  }),
  // `next dev` иначе дописывает служебный блок в CLAUDE.md при каждом запуске —
  // этот файл в проекте принадлежит владельцу и не должен автоматически меняться.
  agentRules: false,
};

export default nextConfig;
