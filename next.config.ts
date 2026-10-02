import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // standalone нужен только для Docker-сборки (раздел 9 CLAUDE.md).
  // Докерфайл выставляет BUILD_STANDALONE=1; локальный `next start` с ним не работает.
  output: process.env.BUILD_STANDALONE ? "standalone" : undefined,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // `next dev` иначе дописывает служебный блок в CLAUDE.md при каждом запуске —
  // этот файл в проекте принадлежит владельцу и не должен автоматически меняться.
  agentRules: false,
};

export default nextConfig;
