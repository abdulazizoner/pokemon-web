import { isApprovedShopierUrl, readProducts } from "./lib/content-validator.mjs";

const NETWORK = process.argv.includes("--network");
const urls = [
  ...new Set(
    readProducts()
      .map((item) => item.data.shopierUrl)
      .filter(Boolean),
  ),
];
const invalid = urls.filter((url) => !isApprovedShopierUrl(url));
if (invalid.length) {
  console.error(`Yapısal olarak geçersiz Shopier bağlantıları:\n${invalid.join("\n")}`);
  process.exit(1);
}
console.log(`Shopier yapısal URL kontrolü başarılı: ${urls.length} bağlantı.`);

if (!NETWORK) {
  console.log("Canlı ağ kontrolü atlandı. İsteğe bağlı kullanım: pnpm shopier:check -- --network");
  process.exit(0);
}

for (const url of urls) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "CardShowcaseLinkCheck/1.0" },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    console.log(`ERİŞİLEBİLİR: ${url}`);
  } catch (error) {
    console.warn(`DOĞRULANAMADI: ${url} (${error.message})`);
  } finally {
    clearTimeout(timer);
  }
}
