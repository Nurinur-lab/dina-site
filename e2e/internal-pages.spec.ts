import { test, expect } from "@playwright/test";

test("страница истории показывает заголовок, таймлайн и трофеи", async ({ page }) => {
  await page.goto("/istoriya");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("История");
  await expect(page.getByRole("heading", { name: "Династия" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Трофеи" })).toBeVisible();
});

test("страница людей показывает легенд и алюмни", async ({ page }) => {
  await page.goto("/lyudi");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Люди");
  await expect(page.locator("#eremenko")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Из «Дины» — в большую игру" })).toBeVisible();
});

test("переход с карточки легенды на главной ведёт на её якорь в /lyudi", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Константин Ерёменко/ }).click();
  await expect(page).toHaveURL(/\/lyudi#eremenko$/);
});

test("лайтбокс на /foto открывается, листает и закрывается по Esc", async ({ page }, testInfo) => {
  await page.goto("/foto");
  const dialog = page.getByRole("dialog", { name: "Просмотр фотографии" });
  await expect(dialog).toBeHidden();

  await page.getByLabel("Открыть фотографию 1 из 8").click();
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("1 из 8")).toBeVisible();

  if (testInfo.project.name !== "mobile-360") {
    await dialog.getByLabel("Следующая фотография").click();
    await expect(dialog.getByText("2 из 8")).toBeVisible();
  }

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("форма на /klub содержит обязательные поля и ссылку на политику", async ({ page }) => {
  await page.goto("/klub#napisat");
  await expect(page.getByLabel("Имя")).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Сообщение")).toBeVisible();
  await expect(page.getByRole("link", { name: "политикой конфиденциальности" })).toHaveAttribute(
    "href",
    "/politika",
  );
});

test("404 на неизвестном пути с ссылкой на главную", async ({ page }) => {
  const response = await page.goto("/takoy-stranicy-net");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Страница не найдена" })).toBeVisible();
  await page.getByRole("link", { name: "На главную", exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
});
