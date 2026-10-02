// Скриншоты страниц на ширинах 360/768/1280 для самопроверки вёрстки
// (CLAUDE.md, раздел 10). Используется вручную после каждой фазы с вёрсткой.
//
// Пример: node scripts/screenshot.mjs http://127.0.0.1:3101 / /styleguide
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const [baseURL, ...routes] = process.argv.slice(2);

if (!baseURL || routes.length === 0) {
  console.error("Использование: node scripts/screenshot.mjs <baseURL> <путь> [путь...]");
  process.exit(1);
}

const viewports = [
  { label: "360", width: 360, height: 1200 },
  { label: "768", width: 768, height: 1200 },
  { label: "1280", width: 1280, height: 1200 },
];

const outDir = path.resolve(process.cwd(), "screenshots");
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
try {
  for (const route of routes) {
    const slug = route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-");
    for (const vp of viewports) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      // "networkidle" иногда зависает (повторные lazy-подгрузки при скролле fullPage-скриншота) —
      // "load" + короткая пауза надёжнее и для статических страниц этого сайта достаточно.
      await page.goto(new URL(route, baseURL).toString(), { waitUntil: "load" });
      await page.waitForTimeout(400);
      const file = path.join(outDir, `${slug}-${vp.label}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log(`сохранено: ${path.relative(process.cwd(), file)}`);
      await page.close();
    }
  }
} finally {
  await browser.close();
}
