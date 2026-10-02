import { test, expect } from "@playwright/test";

test("robots.txt и sitemap.xml отдаются и ссылаются друг на друга", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  const robotsText = await robots.text();
  expect(robotsText).toContain("Sitemap:");
  expect(robotsText).toContain("Disallow: /styleguide");

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  const sitemapText = await sitemap.text();
  expect(sitemapText).toContain("<urlset");
  // NEXT_PUBLIC_SITE_URL не задан при тестовой сборке — используется фолбэк localhost:3000
  // (CLAUDE.md, раздел 8), а не реальный порт тестового сервера.
  for (const path of ["/", "/istoriya", "/lyudi", "/foto", "/klub", "/politika"]) {
    expect(sitemapText).toContain(`<loc>http://localhost:3000${path === "/" ? "/" : path}</loc>`);
  }
});

test("главная отдаёт title, canonical и OG-превью", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Дина/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "http://localhost:3000",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
  await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
});

test("внутренние страницы отдают свой title и хлебные крошки с BreadcrumbList", async ({
  page,
}) => {
  await page.goto("/istoriya");
  await expect(page).toHaveTitle("История «Дины» — Дина");
  await expect(page.getByRole("navigation", { name: "Хлебные крошки" })).toBeVisible();

  const schema = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((nodes) => nodes.map((n) => n.textContent));
  const breadcrumbSchema = schema.find((s) => s?.includes("BreadcrumbList"));
  expect(breadcrumbSchema).toBeTruthy();
  expect(JSON.parse(breadcrumbSchema!).itemListElement).toHaveLength(2);
});

test("на /lyudi есть структурированные данные Person для легенд", async ({ page }) => {
  await page.goto("/lyudi");
  const schema = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((nodes) => nodes.map((n) => n.textContent));
  const personGraph = schema.find((s) => s?.includes('"@graph"'));
  expect(personGraph).toBeTruthy();
  const parsed = JSON.parse(personGraph!);
  expect(parsed["@graph"].length).toBeGreaterThan(0);
  expect(parsed["@graph"][0]).toHaveProperty("name");
});

test("на главной есть структурированные данные SportsOrganization", async ({ page }) => {
  await page.goto("/");
  const schema = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((nodes) => nodes.map((n) => n.textContent));
  const orgSchema = schema.find((s) => s?.includes("SportsOrganization"));
  expect(orgSchema).toBeTruthy();
  const parsed = JSON.parse(orgSchema!);
  expect(parsed.foundingDate).toBe("1991-08-22");
  expect(parsed.sport).toBe("Futsal");
});

test("баннер cookie не показывается, пока NEXT_PUBLIC_YM_ID не задан", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("dialog", { name: "Уведомление об использовании cookie" }),
  ).toHaveCount(0);
});
