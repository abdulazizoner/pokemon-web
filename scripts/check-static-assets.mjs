import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const DIST = path.resolve("dist");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const FORBIDDEN_EXTENSIONS = new Set([".map", ".astro", ".ts", ".tsx"]);
const MAX_ASSET_BYTES = 8 * 1024 * 1024;

if (!fs.existsSync(DIST)) {
  console.error("dist/ bulunamadı. Önce production build çalıştırılmalıdır.");
  process.exit(1);
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

const files = walk(DIST);
const errors = [];
let imageCount = 0;
let totalBytes = 0;

for (const filePath of files) {
  const relativePath = path.relative(DIST, filePath);
  const extension = path.extname(filePath).toLowerCase();
  const size = fs.statSync(filePath).size;
  totalBytes += size;

  if (FORBIDDEN_EXTENSIONS.has(extension)) {
    errors.push(`${relativePath}: production çıktısında yasak dosya türü (${extension}).`);
  }
  if (size > MAX_ASSET_BYTES) {
    errors.push(`${relativePath}: ${Math.ceil(size / 1024 / 1024)} MB; 8 MB sınırını aşıyor.`);
  }

  if (IMAGE_EXTENSIONS.has(extension)) {
    imageCount += 1;
    try {
      const metadata = await sharp(filePath, { failOn: "error" }).metadata();
      if (!metadata.width || !metadata.height) {
        errors.push(`${relativePath}: görsel boyutları okunamadı.`);
      }
    } catch (error) {
      errors.push(`${relativePath}: bozuk veya okunamayan görsel (${error.message}).`);
    }
  }
}

if (errors.length) {
  console.error(
    `Statik varlık hataları (${errors.length}):\n${errors.map((x) => `- ${x}`).join("\n")}`,
  );
  process.exit(1);
}

console.log(
  `Statik varlık kontrolü başarılı: ${files.length} dosya, ${imageCount} görsel, ${Math.round(totalBytes / 1024)} KB.`,
);
