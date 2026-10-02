// Разовая проверка открытого мобильного меню (не часть обычного прогона).
import { chromium } from "playwright-core";

const baseURL = process.argv[2] ?? "http://127.0.0.1:3101";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 360, height: 800 } });
await page.goto(baseURL + "/");
await page.getByLabel("Открыть меню").click();
await page.waitForTimeout(150);
await page.screenshot({ path: "screenshots/mobile-menu-open-360.png" });
await browser.close();
console.log("сохранено: screenshots/mobile-menu-open-360.png");
