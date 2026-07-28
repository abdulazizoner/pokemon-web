import fs from "node:fs";
import path from "node:path";
import { readProducts } from "./lib/content-validator.mjs";

const slug = process.argv[2];
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error("Kullanım: pnpm card:new kart-slug (yalnız küçük harf, sayı ve tire)");
  process.exit(1);
}

const contentPath = path.resolve("src/content/cards", `${slug}.md`);
const sourceDir = path.resolve("media-source/products", slug);
if (fs.existsSync(contentPath) || fs.existsSync(sourceDir)) {
  console.error(`"${slug}" için içerik veya medya klasörü zaten var.`);
  process.exit(1);
}

const existingNumbers = readProducts()
  .map((product) => Number.parseInt(String(product.data.productId || "").replace("CARD-", ""), 10))
  .filter(Number.isFinite);
const nextId = `CARD-${String(Math.max(0, ...existingNumbers) + 1).padStart(4, "0")}`;
const today = new Date().toISOString().slice(0, 10);

const template = `---
productId: "${nextId}"
slug: "${slug}"
name: "YENİ KART ADI"
setName: "SET ADI"
setCode: ""
collectorNumber: "000/000"
language: "İngilizce"
rarity: "NADİRLİK"
finish: "Normal"
condition: "Near Mint"
conditionNote: "Kartın görünür kondisyonunu ve tüm kusurlarını açıklayın."
description: "Ürünü kısa, açık ve kanıtlanabilir ifadelerle tanımlayın."
displayPrice: ""
availability: "draft"
featured: false
publishedAt: ${today}
sortOrder: 100
frontImage: "/products/${slug}/front.webp"
backImage: "/products/${slug}/back.webp"
detailImages: []
frontAlt: "${slug} kartının ön yüz fotoğrafı"
backAlt: "${slug} kartının arka yüz fotoğrafı"
isPlaceholder: true
---
Taslak ürün notu. Gerçek içerik tamamlanmadan availability değerini değiştirmeyin.
`;

fs.mkdirSync(path.dirname(contentPath), { recursive: true });
fs.mkdirSync(sourceDir, { recursive: true });
fs.writeFileSync(contentPath, template, "utf8");
fs.writeFileSync(
  path.join(sourceDir, "README.txt"),
  "front.jpg ve back.jpg dosyalarını bu klasöre ekleyin. Ardından pnpm media:optimize çalıştırın.\n",
  "utf8",
);
console.log(`Taslak oluşturuldu:\n- ${contentPath}\n- ${sourceDir}`);
