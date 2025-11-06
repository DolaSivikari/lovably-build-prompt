import fs from "node:fs/promises";
import path from "node:path";

let chromium;

try {
  ({ chromium } = await import("@playwright/test"));
} catch (error) {
  console.error(
    "@playwright/test is required for the route crawler. Install it before running this script.",
  );
  process.exit(1);
}

const START_URLS = [
  "http://localhost:3000/",
  "http://localhost:3000/sitemap.xml",
];

const visited = new Set();
const out = [];

async function crawlPage(browser, url, depth = 0) {
  if (visited.has(url) || depth > 2) return;
  visited.add(url);
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    const title = await page.title();
    out.push({ url, title });
    const origin = new URL(page.url()).origin;
    const links = await page.$$eval(
      "a[href]",
      (as, allowedOrigin) =>
        as
          .map((a) => a.href)
          .filter((href) => href && href.startsWith(allowedOrigin)),
      origin,
    );
    for (const link of links.slice(0, 200)) {
      await crawlPage(browser, link, depth + 1);
    }
  } catch {
    // ignore navigation errors for robustness
  } finally {
    await page.close();
  }
}

(async () => {
  const browser = await chromium.launch();
  for (const url of START_URLS) {
    await crawlPage(browser, url, 0);
  }
  await browser.close();
  const dir = path.join(".reports");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(
    path.join(dir, "routes.json"),
    JSON.stringify(
      [...out].sort((a, b) => a.url.localeCompare(b.url)),
      null,
      2,
    ),
  );
  console.log("Wrote .reports/routes.json");
})();
