import { validateProducts } from "./lib/content-validator.mjs";

const result = validateProducts();
for (const warning of result.warnings) console.warn(`UYARI: ${warning}`);
if (result.errors.length) {
  console.error(`\nİçerik doğrulaması başarısız (${result.errors.length} hata):`);
  result.errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(
  `İçerik doğrulaması başarılı: ${result.products.length} ürün, ${result.warnings.length} uyarı.`,
);
