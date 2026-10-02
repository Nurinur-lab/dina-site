// Разовая проверка горизонтального переполнения на 360px для всех страниц.
import { chromium } from "playwright-core";

const baseURL = process.argv[2] ?? "http://127.0.0.1:3102";
const routes = process.argv.slice(3);

const browser = await chromium.launch();
let anyIssue = false;

for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 360, height: 800 } });
  await page.goto(new URL(route, baseURL).toString(), { waitUntil: "load" });
  await page.waitForTimeout(200);
  const result = await page.evaluate(() => {
    function isClippedByAncestor(el) {
      let node = el.parentElement;
      while (node) {
        const cs = getComputedStyle(node);
        if (cs.overflow === "hidden" || cs.overflowX === "hidden" || cs.overflowX === "clip")
          return true;
        node = node.parentElement;
      }
      return false;
    }
    const offenders = [];
    document.querySelectorAll("*").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.right > 361 && !isClippedByAncestor(el)) {
        offenders.push({
          tag: el.tagName,
          cls: (el.className + "").slice(0, 70),
          right: Math.round(r.right),
          text: el.textContent?.slice(0, 30),
        });
      }
    });
    return { scrollWidth: document.documentElement.scrollWidth, offenders: offenders.slice(0, 10) };
  });
  const status = result.scrollWidth > 361 ? "ПЕРЕПОЛНЕНИЕ" : "ok";
  if (result.scrollWidth > 361) anyIssue = true;
  console.log(`${route}: scrollWidth=${result.scrollWidth} — ${status}`);
  if (result.offenders.length) console.log(JSON.stringify(result.offenders, null, 2));
  await page.close();
}

await browser.close();
process.exit(anyIssue ? 1 : 0);
