/**
 * Lighthouse CI — проверяются ключевые страницы на мобильном профиле.
 * Пороги из CLAUDE.md, раздел 10.
 */
module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run build && npm run start -- -p 3200",
      startServerReadyPattern: "Ready in",
      startServerReadyTimeout: 120000,
      url: [
        "http://127.0.0.1:3200/",
        "http://127.0.0.1:3200/istoriya",
        "http://127.0.0.1:3200/lyudi",
      ],
      numberOfRuns: 3,
      // Профиль по умолчанию в Lighthouse CLI уже мобильный (throttling + mobile UA);
      // пресет "mobile" в текущей версии не существует (есть только perf/experimental/desktop).
      // throttlingMethod оставлен по умолчанию ("simulate") — см. PROGRESS.md: на этой
      // песочнице "devtools" (реальный троттлинг) даёт ещё более шумные и заниженные цифры
      // из-за нестабильного общего CPU, а не из-за реальных проблем сайта.
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 1 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: "./.lighthouseci",
    },
  },
};
