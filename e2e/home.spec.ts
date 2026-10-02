import { test, expect } from "@playwright/test";

test("главная показывает все 8 блоков и досчитанные цифры «Масштаба»", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Дина");

  const scale = page.getByRole("region", { name: "Масштаб клуба" });
  await scale.scrollIntoViewIfNeeded();
  await expect(page.getByText("чемпионств России")).toBeVisible();
  // Цифра должна досчитаться до финального значения из content/trophies.json.
  await expect(scale.getByText("9", { exact: true })).toBeVisible({ timeout: 2000 });

  await expect(page.getByRole("heading", { name: "Легенды" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Пауза — не финал" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Из «Дины» — в большую игру" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "История в 20 фотографиях" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Написать нам" })).toBeVisible();
});
