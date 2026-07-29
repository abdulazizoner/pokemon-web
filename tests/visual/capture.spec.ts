import fs from "node:fs";
import path from "node:path";
import { test, type Page } from "@playwright/test";

const outputDir = path.resolve("artifacts/visual-qa");
fs.mkdirSync(outputDir, { recursive: true });

type Scenario = {
  name: string;
  path: string;
  viewport: { width: number; height: number };
  prepare?: (page: Page) => Promise<void>;
};

const scenarios: Scenario[] = [
  { name: "homepage-desktop", path: "/", viewport: { width: 1440, height: 1000 } },
  { name: "homepage-mobile", path: "/", viewport: { width: 390, height: 844 } },
  { name: "homepage-320", path: "/", viewport: { width: 320, height: 800 } },
  { name: "homepage-wide", path: "/", viewport: { width: 1920, height: 1080 } },
  { name: "catalog-desktop", path: "/kartlar", viewport: { width: 1440, height: 1000 } },
  { name: "catalog-mobile", path: "/kartlar", viewport: { width: 390, height: 844 } },
  { name: "catalog-tablet", path: "/kartlar", viewport: { width: 768, height: 1024 } },
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
    name: "mobile-navigation-open",
    path: "/",
    viewport: { width: 390, height: 844 },
    prepare: async (page) => page.getByText("Menü", { exact: true }).click(),
  },
  {
    name: "combined-filter",
    path: "/kartlar",
    viewport: { width: 1440, height: 1000 },
    prepare: async (page) => {
      await page.getByLabel("Set").selectOption("Obsidian Flames");
      await page.getByLabel("Kondisyon").selectOption("Near Mint");
      await page.getByLabel("Dil").selectOption("İngilizce");
    },
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
  {
    name: "not-found",
    path: "/bulunamayan-sayfa",
    viewport: { width: 1440, height: 1000 },
  },
  {
    name: "product-reflow-200",
    path: "/kartlar/charizard-ex",
    // 1280 px masaüstü görünümünün %200 yakınlaştırmadaki 640 CSS-piksel
    // eşdeğeri; medya sorgularının gerçek tarayıcı yakınlaştırması gibi
    // yeniden akmasını doğrular.
    viewport: { width: 640, height: 900 },
  },
];

for (const scenario of scenarios) {
  test(scenario.name, async ({ page }) => {
    await page.setViewportSize(scenario.viewport);
    await page.goto(scenario.path, { waitUntil: "networkidle" });
    await scenario.prepare?.(page);
    await page.screenshot({
      path: path.join(outputDir, `${scenario.name}.png`),
      fullPage: true,
      animations: "disabled",
    });
  });
}
