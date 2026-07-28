import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("ana sayfa değer önerisini ve ana gezinmeyi sunar", async ({ page, isMobile }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Koleksiyonunun");
  await expect(page.getByText("Vitrin burada.")).toBeVisible();

  if (isMobile) {
    await page.getByText("Menü", { exact: true }).click();
    await page
      .getByRole("navigation", { name: "Mobil menü" })
      .getByRole("link", { name: "İletişim" })
      .click();
    await expect(page).toHaveURL(/\/iletisim/);
  } else {
    await page
      .getByRole("navigation", { name: "Ana menü" })
      .getByRole("link", { name: "Kartlar" })
      .click();
    await expect(page).toHaveURL(/\/kartlar/);
  }
});

test("katalog arama, tüm filtreler ve birleşik filtreler çalışır", async ({ page }) => {
  await page.goto("/kartlar");
  await expect(page.locator("[data-card]:visible")).toHaveCount(3);

  await page.getByLabel("Arama").fill("gengar");
  await expect(page.locator("[data-card]:visible")).toHaveCount(1);
  await page.getByRole("button", { name: "Temizle" }).click();

  await page.getByLabel("Set").selectOption("Obsidian Flames");
  await page.getByLabel("Kondisyon").selectOption("Near Mint");
  await page.getByLabel("Dil").selectOption("İngilizce");
  await page.getByLabel("Nadirlik").selectOption("Special Illustration Rare");
  await page.getByLabel("Durum").selectOption("coming-soon");
  await expect(page.locator("[data-card]:visible")).toHaveCount(1);
  await expect(page).toHaveURL(/set=Obsidian\+Flames/);
});

test("katalog sıralama, sıfırlama ve boş sonuç durumunu yönetir", async ({ page }) => {
  await page.goto("/kartlar?search=olmayan-kart");
  await expect(page.getByRole("heading", { name: "Filtreleri biraz genişletin." })).toBeVisible();
  await page.getByRole("button", { name: "Filtreleri temizle" }).click();
  await expect(page.locator("[data-card]:visible")).toHaveCount(3);
  await page.getByLabel("Sırala").selectOption("name");
  await expect(page.locator("[data-card]").first()).toContainText("Charizard ex");
});

test("ürün detayı iki yüzü klavyeyle seçebilir ve temsili CTA'yı kapatır", async ({ page }) => {
  await page.goto("/kartlar/charizard-ex");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Charizard ex");
  await page.getByRole("button", { name: "Arka yüz" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "Arka yüz" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.getByText(/satın alma bağlantısı etkin değildir/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Shopier’de satın al/ })).toHaveCount(0);
});

test("satılmış ürün satın alma bağlantısı göstermez", async ({ page }) => {
  await page.goto("/kartlar/gengar");
  await expect(page.getByText("Satıldı", { exact: true })).toBeVisible();
  await expect(page.getByText(/satın alma bağlantısı kapalıdır/i)).toBeVisible();
  await expect(page.locator('a[target="_blank"]')).toHaveCount(0);
});

test("taslak ürün katalogda ve rota çıktısında görünmez", async ({ page }) => {
  await page.goto("/kartlar");
  await expect(page.getByText("Yayımlanmamış Örnek")).toHaveCount(0);
  const response = await page.goto("/kartlar/draft-example");
  expect(response?.status()).toBe(404);
});

test("kart ön-arka etkileşimi ve özel 404 çalışır", async ({ page }) => {
  await page.goto("/kartlar");
  const firstCard = page.locator("[data-card]").first();
  await firstCard.getByRole("button", { name: "Arkayı göster" }).click();
  await expect(firstCard).toHaveClass(/is-flipped/);
  await page.goto("/bulunamayan-sayfa");
  await expect(page.getByRole("heading", { name: "Bu kart destede yok." })).toBeVisible();
});

test("ana sayfa, katalog ve ürün detayı otomatik erişilebilirlik kontrolünü geçer", async ({
  page,
}) => {
  for (const pathname of ["/", "/kartlar", "/kartlar/charizard-ex"]) {
    await page.goto(pathname);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, pathname).toEqual([]);
  }
});
