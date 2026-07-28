import { expect, test } from "@playwright/test";

test("visitor can browse and open a product", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Koleksiyonunun");
  await page.getByRole("link", { name: "Kartları keşfet" }).click();
  await expect(page).toHaveURL(/\/kartlar/);
  await page.getByRole("link", { name: /Charizard ex/ }).first().click();
  await expect(page.getByRole("link", { name: /Shopier/ })).toBeVisible();
});

test("catalog filters cards", async ({ page }) => {
  await page.goto("/kartlar");
  await page.getByLabel("Arama").fill("gengar");
  await expect(page.locator("[data-card]:visible")).toHaveCount(1);
});
