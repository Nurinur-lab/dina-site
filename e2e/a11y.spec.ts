import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

/**
 * axe: 0 нарушений уровня serious/critical на ключевых страницах
 * (CLAUDE.md, раздел 10). Прогоняется один раз на desktop — страница
 * одна и та же вне зависимости от ширины экрана, а axe не учитывает viewport.
 */
const pages = ["/", "/istoriya", "/lyudi", "/foto", "/klub", "/politika"];

for (const path of pages) {
  test(`axe: ${path} — без serious/critical нарушений`, async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name !== "desktop-1280",
      "одна проверка достаточно, viewport не влияет на axe",
    );

    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();

    const seriousOrCritical = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );

    if (seriousOrCritical.length > 0) {
      console.log(JSON.stringify(seriousOrCritical, null, 2));
    }

    expect(seriousOrCritical).toEqual([]);
  });
}
