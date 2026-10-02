import { test, expect } from "@playwright/test";

test("главная страница открывается и показывает название клуба", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
});
