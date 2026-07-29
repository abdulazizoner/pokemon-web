import fs from "node:fs";
import path from "node:path";
import { test } from "@playwright/test";

const outputDir = path.resolve("required_fields/web_pages_images");

const pages = [
  { file: "01-ana-sayfa.png", route: "/" },
  { file: "02-tum-kartlar.png", route: "/kartlar" },
  { file: "03-charizard-ex.png", route: "/kartlar/charizard-ex" },
  { file: "04-gengar.png", route: "/kartlar/gengar" },
  { file: "05-pikachu.png", route: "/kartlar/pikachu" },
  { file: "06-hakkimizda.png", route: "/hakkimizda" },
  { file: "07-sikca-sorulan-sorular.png", route: "/sss" },
  { file: "08-iletisim.png", route: "/iletisim" },
  { file: "09-kargo-ve-iade.png", route: "/kargo-ve-iade" },
  { file: "10-404.png", route: "/bulunamayan-sayfa" },
] as const;

fs.mkdirSync(outputDir, { recursive: true });

for (const pageEntry of pages) {
  test(pageEntry.file, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(pageEntry.route, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      await document.fonts.ready;
    });
    await page.screenshot({
      path: path.join(outputDir, pageEntry.file),
      fullPage: true,
      animations: "disabled",
    });
  });
}
