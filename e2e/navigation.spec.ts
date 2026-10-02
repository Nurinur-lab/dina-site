import { test, expect } from "@playwright/test";

test("мобильное меню открывается, показывает ссылки и закрывается", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-360", "актуально только для мобильной раскладки");

  await page.goto("/");
  const dialog = page.getByRole("dialog", { name: "Меню навигации" });
  await expect(dialog).toBeHidden();

  await page.getByLabel("Открыть меню").click();
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("link", { name: "История" })).toBeVisible();

  await page.getByLabel("Закрыть меню").click();
  await expect(dialog).toBeHidden();
});

test("пункты десктопной навигации ведут на нужные страницы", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile-360", "десктопная навигация скрыта на мобильном");

  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Основная навигация" })
    .getByRole("link", { name: "История" })
    .click();
  await expect(page).toHaveURL(/\/istoriya$/);
});
