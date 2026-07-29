import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("ana sayfa değer önerisini ve ana gezinmeyi sunar", async ({ page, isMobile }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Koleksiyonunun");
  await expect(page.getByText("Vitrin burada.")).toBeVisible();

  if (isMobile) {
    const menu = page.getByText("Menü", { exact: true });
    await menu.click();
    await page.keyboard.press("Escape");
    await expect(page.locator("details.mobile-nav")).not.toHaveAttribute("open", "");
    await expect(menu).toBeFocused();
    await menu.click();
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

test("katalog arama, bağımsız filtreler ve birleşik filtreler çalışır", async ({ page }) => {
  await page.goto("/kartlar");
  await expect(page.locator("[data-card]:visible")).toHaveCount(3);

  await page.getByLabel("Arama").fill("GENGAR");
  await expect(page.locator("[data-card]:visible")).toHaveCount(1);
  await page.getByRole("button", { name: "Temizle" }).click();

  const filterCases = [
    { label: "Set", value: "Obsidian Flames", count: 1 },
    { label: "Kondisyon", value: "Near Mint", count: 2 },
    { label: "Dil", value: "İngilizce", count: 2 },
    { label: "Nadirlik", value: "Art Rare", count: 1 },
    { label: "Durum", value: "sold", count: 1 },
  ];
  for (const filterCase of filterCases) {
    await page.getByLabel(filterCase.label).selectOption(filterCase.value);
    await expect(page.locator("[data-card]:visible")).toHaveCount(filterCase.count);
    await page.getByRole("button", { name: "Temizle" }).click();
  }

  await page.getByLabel("Set").selectOption("Obsidian Flames");
  await page.getByLabel("Kondisyon").selectOption("Near Mint");
  await page.getByLabel("Dil").selectOption("İngilizce");
  await page.getByLabel("Nadirlik").selectOption("Special Illustration Rare");
  await page.getByLabel("Durum").selectOption("coming-soon");
  await expect(page.locator("[data-card]:visible")).toHaveCount(1);
  await expect(page).toHaveURL(/set=Obsidian\+Flames/);
});

test("Türkçe arama ve URL durumu ürün dönüşünde korunur", async ({ page }) => {
  await page.goto("/kartlar?search=PİKACHU&sort=name");
  await expect(page.getByLabel("Arama")).toHaveValue("PİKACHU");
  await expect(page.getByLabel("Sırala")).toHaveValue("name");
  await expect(page.locator("[data-card]:visible")).toHaveCount(1);
  await page
    .locator("[data-card]:visible")
    .getByRole("link", { name: /detayını görüntüle/ })
    .click();
  await expect(page).toHaveURL(/\/kartlar\/pikachu/);
  await page.goBack();
  await expect(page).toHaveURL(/search=P%C4%B0KACHU/);
  await expect(page.getByLabel("Arama")).toHaveValue("PİKACHU");
  await expect(page.locator("[data-card]:visible")).toHaveCount(1);
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
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex,nofollow");
});

test("SSS, reduced-motion ve aktif sayfa göstergesi çalışır", async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/sss");
  if (isMobile) {
    await page.getByText("Menü", { exact: true }).click();
  }
  const navigationName = isMobile ? "Mobil menü" : "Ana menü";
  await expect(
    page.getByRole("navigation", { name: navigationName }).getByRole("link", { name: "SSS" }),
  ).toHaveAttribute("aria-current", "page");
  const question = page.getByText("Satın alma işlemi nerede gerçekleşiyor?");
  await question.click();
  await expect(page.getByText(/Ödeme ve sipariş işlemleri Shopier üzerinde/)).toBeVisible();
  await page.goto("/");
  await expect(page.locator(".ticker div")).toHaveCSS("animation-name", "none");
});

test("JavaScript kapalıyken katalog ve ürün görselleri erişilebilir kalır", async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL: "http://127.0.0.1:4321",
  });
  const page = await context.newPage();
  await page.goto("/kartlar");
  await expect(page.locator("[data-card]")).toHaveCount(3);
  await page.goto("/kartlar/charizard-ex");
  await expect(page.locator(".product-gallery figure")).toHaveCount(2);
  await expect(
    page.getByText("JavaScript kapalıyken iki yüz de yan yana gösterilir."),
  ).toBeVisible();
  await context.close();
});

test("kritik sayfalar 320 px, tablet, geniş ekran ve yakınlaştırma eşdeğerinde taşmaz", async ({
  page,
}) => {
  const scenarios = [
    { path: "/", width: 320, height: 800 },
    { path: "/kartlar", width: 768, height: 1024 },
    { path: "/", width: 1920, height: 1080 },
    { path: "/kartlar/charizard-ex", width: 640, height: 900 },
    { path: "/", width: 844, height: 390 },
  ];
  for (const scenario of scenarios) {
    await page.setViewportSize({ width: scenario.width, height: scenario.height });
    await page.goto(scenario.path);
    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(hasHorizontalOverflow, `${scenario.path} @ ${scenario.width}px`).toBe(false);
  }
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
