import { test, expect } from "@playwright/test";

/**
 * Лимит отправок — 5 в час с одного IP, и в тестовом окружении (без Nginx,
 * без x-forwarded-for) все проекты Playwright бьют в один и тот же ключ
 * "unknown" на одном и том же сервере. Поэтому тест с валидной отправкой,
 * которая реально расходует лимит, намеренно прогоняется только один раз
 * (на desktop-1280), а не на всех трёх вьюпортах — иначе собственные тесты
 * исчерпали бы лимит друг другу.
 */
const MIN_FILL_WAIT_MS = 3100;

async function fillValidForm(page: import("@playwright/test").Page, suffix: string) {
  await page.getByLabel("Имя").fill(`Тест Плейрайт ${suffix}`);
  await page.getByLabel("Email").fill(`playwright-${suffix}@example.com`);
  await page.getByLabel("Тема").selectOption("Партнёрство");
  await page.getByLabel("Сообщение").fill(`Автотест формы обращения, сценарий ${suffix}.`);
  await page.getByLabel(/Согласен/).check();
}

test("успешная отправка формы показывает подтверждение", async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop-1280",
    "расходует общий лимит отправок — гоняем один раз",
  );

  await page.goto("/klub#napisat");
  await page.waitForTimeout(MIN_FILL_WAIT_MS);
  await fillValidForm(page, "success");
  await page.getByRole("button", { name: "Отправить сообщение" }).click();

  await expect(page.getByRole("status")).toContainText("Сообщение отправлено");
});

test("ошибки валидации показываются у полей, а введённые значения не теряются", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop-1280",
    "расходует общий лимит отправок — гоняем один раз",
  );

  await page.goto("/klub#napisat");
  await page.waitForTimeout(MIN_FILL_WAIT_MS);
  await page.getByLabel("Имя").fill("Невалидный Email");
  await page.getByLabel("Email").fill("не-похоже-на-email");
  await page.getByLabel("Тема").selectOption("СМИ");
  await page.getByLabel("Сообщение").fill("Короткое, но больше 10 символов.");
  await page.getByLabel(/Согласен/).check();
  await page.getByRole("button", { name: "Отправить сообщение" }).click();

  await expect(page.getByText("Введите корректный email")).toBeVisible();
  // Остальные поля должны сохранить введённые значения, а не очиститься.
  await expect(page.getByLabel("Имя")).toHaveValue("Невалидный Email");
  await expect(page.getByLabel("Тема")).toHaveValue("СМИ");
  await expect(page.getByLabel(/Согласен/)).toBeChecked();
});

test("пустая форма показывает ошибки по каждому обязательному полю", async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop-1280",
    "расходует общий лимит отправок — гоняем один раз",
  );

  await page.goto("/klub#napisat");
  await page.waitForTimeout(MIN_FILL_WAIT_MS);
  await page.getByRole("button", { name: "Отправить сообщение" }).click();

  await expect(page.getByText("Введите имя")).toBeVisible();
  await expect(page.getByText("Введите email", { exact: true })).toBeVisible();
  await expect(page.getByText("Выберите тему обращения")).toBeVisible();
  await expect(page.getByText("Нужно согласие на обработку персональных данных")).toBeVisible();
});

test("поле-ловушка тихо отклоняет отправку, не показывая ошибку", async ({ page }) => {
  await page.goto("/klub#napisat");
  await page.waitForTimeout(MIN_FILL_WAIT_MS);
  await fillValidForm(page, "honeypot");
  // Ловушка скрыта от обычного пользователя, но в DOM доступна по id.
  await page.locator("#company").fill("бот");
  await page.getByRole("button", { name: "Отправить сообщение" }).click();

  await expect(page.getByRole("status")).toContainText("Сообщение отправлено");
});

test("слишком быстрая отправка тихо отклоняется антиспам-проверкой по времени", async ({
  page,
}) => {
  await page.goto("/klub#napisat");
  // Намеренно без ожидания минимального времени заполнения.
  await fillValidForm(page, "fast");
  await page.getByRole("button", { name: "Отправить сообщение" }).click();

  await expect(page.getByRole("status")).toContainText("Сообщение отправлено");
});
