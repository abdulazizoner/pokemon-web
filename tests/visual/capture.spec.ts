import fs from "node:fs";
import path from "node:path";
import { test } from "@playwright/test";

const outputDir = path.resolve("artifacts/visual-qa");
fs.mkdirSync(outputDir, { recursive: true });

const scenarios = [
  { name: "homepage-desktop", path: "/", viewport: { width: 1440, height: 1000 } },
  { name: "homepage-mobile", path: "/", viewport: { width: 390, height: 844 } },
  { name: "catalog-desktop", path: "/kartlar", viewport: { width: 1440, height: 1000 } },
  { name: "catalog-mobile", path: "/kartlar", viewport: { width: 390, height: 844 } },
  {
    name: "product-desktop",
    path: "/kartlar/charizard-ex",
    viewport: { width: 1440, height: 1000 },
  },
  {
    name: "product-mobile",
    path: "/kartlar/charizard-ex",
    viewport: { width: 390, height: 844 },
  },
  {
    name: "empty-filter",
    path: "/kartlar?search=olmayan-kart",
    viewport: { width: 1440, height: 1000 },
  },
  {
    name: "sold-product",
    path: "/kartlar/gengar",
    viewport: { width: 1440, height: 1000 },
  },
];

for (const scenario of scenarios) {
  test(scenario.name, async ({ page }) => {
    await page.setViewportSize(scenario.viewport);
    await page.goto(scenario.path, { waitUntil: "networkidle" });
    await page.screenshot({
      path: path.join(outputDir, `${scenario.name}.png`),
      fullPage: true,
      animations: "disabled",
    });
  });
}
