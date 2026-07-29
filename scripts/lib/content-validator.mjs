import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const CONTENT_DIR = path.resolve("src/content/cards");
export const PUBLIC_DIR = path.resolve("public");
export const ACCEPTED_IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
export const APPROVED_SHOPIER_HOSTS = new Set(["shopier.com", "www.shopier.com"]);
export const AVAILABILITY_VALUES = new Set(["available", "sold", "coming-soon", "draft", "hidden"]);
export const CONDITION_VALUES = new Set([
  "Mint",
  "Near Mint",
  "Lightly Played",
  "Played",
  "Damaged",
]);
export const LANGUAGE_VALUES = new Set([
  "Türkçe",
  "İngilizce",
  "Japonca",
  "Almanca",
  "Fransızca",
  "Diğer",
]);
export const FINISH_VALUES = new Set(["Normal", "Holo", "Reverse Holo", "Cosmos Holo", "Diğer"]);
export const MAX_PUBLIC_IMAGE_BYTES = 8 * 1024 * 1024;

export function listContentFiles() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((name) => name.endsWith(".md"))
    .map((name) => path.join(CONTENT_DIR, name))
    .sort();
}

export function readProducts() {
  return listContentFiles().map((filePath) => {
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = matter(raw);
    return {
      filePath,
      fileName: path.basename(filePath),
      data: parsed.data,
      body: parsed.content.trim(),
    };
  });
}

export function isApprovedShopierUrl(value) {
  if (!value) return false;
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      APPROVED_SHOPIER_HOSTS.has(url.hostname.toLowerCase()) &&
      !url.username &&
      !url.password &&
      !url.port
    );
  } catch {
    return false;
  }
}

function checkText(errors, fileName, data, field, minLength = 1) {
  if (typeof data[field] !== "string" || data[field].trim().length < minLength) {
    errors.push(`${fileName}: "${field}" alanı en az ${minLength} karakter olmalıdır.`);
  }
}

function checkImage(errors, fileName, field, value) {
  if (typeof value !== "string" || !value.startsWith("/")) {
    errors.push(`${fileName}: "${field}" kökten başlayan yerel bir görsel yolu olmalıdır.`);
    return;
  }
  const extension = path.extname(value).toLowerCase();
  if (!ACCEPTED_IMAGE_EXTENSIONS.has(extension)) {
    errors.push(`${fileName}: "${field}" desteklenmeyen görsel uzantısına sahip (${extension}).`);
    return;
  }
  const diskPath = path.resolve(PUBLIC_DIR, value.replace(/^[/\\]+/, ""));
  if (!diskPath.startsWith(`${PUBLIC_DIR}${path.sep}`)) {
    errors.push(`${fileName}: "${field}" public/ klasörü dışına çıkamaz.`);
    return;
  }
  if (!fs.existsSync(diskPath)) {
    errors.push(`${fileName}: "${field}" dosyası bulunamadı: ${value}`);
    return;
  }
  const size = fs.statSync(diskPath).size;
  if (size > MAX_PUBLIC_IMAGE_BYTES) {
    errors.push(`${fileName}: "${field}" ${Math.ceil(size / 1024 / 1024)} MB; üst sınır 8 MB.`);
  }
}

export function validateProducts(products = readProducts()) {
  const errors = [];
  const warnings = [];
  const seenIds = new Map();
  const seenSlugs = new Map();
  const seenUrls = new Map();

  for (const product of products) {
    const { data, fileName } = product;
    checkText(errors, fileName, data, "productId", 8);
    checkText(errors, fileName, data, "slug", 2);
    checkText(errors, fileName, data, "name", 2);
    checkText(errors, fileName, data, "setName", 2);
    checkText(errors, fileName, data, "collectorNumber", 1);
    checkText(errors, fileName, data, "rarity", 2);
    checkText(errors, fileName, data, "conditionNote", 12);
    checkText(errors, fileName, data, "description", 20);
    checkText(errors, fileName, data, "frontAlt", 8);
    checkText(errors, fileName, data, "backAlt", 8);

    if (!/^CARD-\d{4,}$/.test(data.productId || "")) {
      errors.push(`${fileName}: productId "CARD-0001" biçiminde olmalıdır.`);
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug || "")) {
      errors.push(`${fileName}: slug yalnız küçük harf, sayı ve tire kullanmalıdır.`);
    }
    if (fileName !== `${data.slug}.md`) {
      errors.push(`${fileName}: dosya adı slug ile aynı olmalıdır (${data.slug}.md).`);
    }
    if (!AVAILABILITY_VALUES.has(data.availability)) {
      errors.push(`${fileName}: geçersiz availability değeri "${data.availability}".`);
    }
    if (!CONDITION_VALUES.has(data.condition)) {
      errors.push(`${fileName}: geçersiz condition değeri "${data.condition}".`);
    }
    if (!LANGUAGE_VALUES.has(data.language)) {
      errors.push(`${fileName}: geçersiz language değeri "${data.language}".`);
    }
    if (!FINISH_VALUES.has(data.finish)) {
      errors.push(`${fileName}: geçersiz finish değeri "${data.finish}".`);
    }
    if (typeof data.featured !== "boolean") {
      errors.push(`${fileName}: featured true veya false olmalıdır.`);
    }
    if (typeof data.isPlaceholder !== "boolean") {
      errors.push(`${fileName}: isPlaceholder true veya false olmalıdır.`);
    }
    if (
      data.displayPrice !== undefined &&
      (typeof data.displayPrice !== "string" || data.displayPrice.trim().length < 2)
    ) {
      errors.push(`${fileName}: displayPrice boş olmayan okunabilir bir metin olmalıdır.`);
    }
    if (data.seoTitle && (typeof data.seoTitle !== "string" || data.seoTitle.length > 65)) {
      errors.push(`${fileName}: seoTitle en fazla 65 karakter olmalıdır.`);
    }
    if (
      data.seoDescription &&
      (typeof data.seoDescription !== "string" || data.seoDescription.length > 170)
    ) {
      errors.push(`${fileName}: seoDescription en fazla 170 karakter olmalıdır.`);
    }
    if (!data.publishedAt || Number.isNaN(new Date(data.publishedAt).getTime())) {
      errors.push(`${fileName}: publishedAt geçerli bir tarih olmalıdır.`);
    }
    if (!Number.isInteger(data.sortOrder) || data.sortOrder < 0) {
      errors.push(`${fileName}: sortOrder sıfır veya daha büyük bir tam sayı olmalıdır.`);
    }

    checkImage(errors, fileName, "frontImage", data.frontImage);
    checkImage(errors, fileName, "backImage", data.backImage);
    if (!Array.isArray(data.detailImages)) {
      errors.push(`${fileName}: detailImages bir liste olmalıdır.`);
    }
    for (const [index, detail] of (Array.isArray(data.detailImages)
      ? data.detailImages
      : []
    ).entries()) {
      if (!detail || typeof detail.alt !== "string" || detail.alt.trim().length < 6) {
        errors.push(`${fileName}: detailImages[${index}] için açıklayıcı alt metin zorunludur.`);
      }
      checkImage(errors, fileName, `detailImages[${index}].src`, detail?.src);
    }

    if (seenIds.has(data.productId)) {
      errors.push(
        `${fileName}: yinelenen productId "${data.productId}" (${seenIds.get(data.productId)}).`,
      );
    } else {
      seenIds.set(data.productId, fileName);
    }
    if (seenSlugs.has(data.slug)) {
      errors.push(`${fileName}: yinelenen slug "${data.slug}" (${seenSlugs.get(data.slug)}).`);
    } else {
      seenSlugs.set(data.slug, fileName);
    }
    if (data.shopierUrl) {
      if (!isApprovedShopierUrl(data.shopierUrl)) {
        errors.push(`${fileName}: Shopier URL'si HTTPS ve onaylı alan adında olmalıdır.`);
      }
      const canonicalUrl = (() => {
        try {
          return new URL(data.shopierUrl).href;
        } catch {
          return data.shopierUrl;
        }
      })();
      if (seenUrls.has(canonicalUrl)) {
        errors.push(`${fileName}: yinelenen Shopier URL'si (${seenUrls.get(canonicalUrl)}).`);
      } else {
        seenUrls.set(canonicalUrl, fileName);
      }
    }

    if (data.availability === "available" && !data.isPlaceholder) {
      if (!data.displayPrice) {
        errors.push(`${fileName}: satıştaki gerçek ürün için displayPrice zorunludur.`);
      }
      if (!data.shopierUrl) {
        errors.push(`${fileName}: satıştaki gerçek ürün için Shopier URL'si zorunludur.`);
      }
    }
    if (data.isPlaceholder && data.availability === "available") {
      errors.push(`${fileName}: yer tutucu ürün "available" olarak yayımlanamaz.`);
    }
    if (data.isPlaceholder && data.shopierUrl) {
      errors.push(`${fileName}: yer tutucu ürün aktif Shopier URL'si taşıyamaz.`);
    }
    if (["draft", "hidden"].includes(data.availability) && data.featured) {
      warnings.push(
        `${fileName}: taslak/gizli ürün featured olarak işaretlenmiş; vitrinde görünmez.`,
      );
    }
  }

  return { errors, warnings, products };
}
