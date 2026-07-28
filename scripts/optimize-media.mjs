import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { ACCEPTED_IMAGE_EXTENSIONS } from "./lib/content-validator.mjs";

const SOURCE_ROOT = path.resolve("media-source/products");
const OUTPUT_ROOT = path.resolve("public/products");
const CHECK_ONLY = process.argv.includes("--check");
const MAX_SOURCE_BYTES = 20 * 1024 * 1024;
const WIDTHS = [480, 800, 1200];

function findRoleFile(directory, role) {
  const matches = fs
    .readdirSync(directory)
    .filter((file) => path.parse(file).name.toLowerCase() === role)
    .filter((file) => ACCEPTED_IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()));
  if (matches.length > 1) throw new Error(`${directory}: "${role}" için birden fazla kaynak var.`);
  return matches[0] ? path.join(directory, matches[0]) : null;
}

async function verifySource(filePath) {
  if (fs.statSync(filePath).size > MAX_SOURCE_BYTES) {
    throw new Error(`${filePath}: kaynak görsel 20 MB sınırını aşıyor.`);
  }
  const metadata = await sharp(filePath, { failOn: "error" }).metadata();
  if (!metadata.width || !metadata.height) throw new Error(`${filePath}: görsel boyutu okunamadı.`);
  return metadata;
}

async function optimize(filePath, outputDir, role) {
  const metadata = await verifySource(filePath);
  fs.mkdirSync(outputDir, { recursive: true });
  let optimizedBytes = 0;
  for (const width of WIDTHS.filter((value) => value <= metadata.width)) {
    const webpPath = path.join(outputDir, `${role}-${width}.webp`);
    const avifPath = path.join(outputDir, `${role}-${width}.avif`);
    if (!CHECK_ONLY) {
      await sharp(filePath)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 84 })
        .toFile(webpPath);
      await sharp(filePath)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .avif({ quality: 55 })
        .toFile(avifPath);
      optimizedBytes += fs.statSync(webpPath).size + fs.statSync(avifPath).size;
    }
  }
  const canonicalPath = path.join(outputDir, `${role}.webp`);
  if (!CHECK_ONLY) {
    await sharp(filePath)
      .rotate()
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 86 })
      .toFile(canonicalPath);
    optimizedBytes += fs.statSync(canonicalPath).size;
  }
  return {
    sourceBytes: fs.statSync(filePath).size,
    optimizedBytes,
    width: metadata.width,
    height: metadata.height,
  };
}

if (!fs.existsSync(SOURCE_ROOT)) {
  console.log("Medya kaynak klasörü henüz boş; gerçek ürün fotoğrafı bekleniyor.");
  process.exit(0);
}

const productDirs = fs
  .readdirSync(SOURCE_ROOT, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.join(SOURCE_ROOT, entry.name));

let processed = 0;
for (const directory of productDirs) {
  const front = findRoleFile(directory, "front");
  const back = findRoleFile(directory, "back");
  if (!front && !back) continue;
  if (!front || !back) throw new Error(`${directory}: front/back çifti eksik.`);
  const outputDir = path.join(OUTPUT_ROOT, path.basename(directory));
  const frontResult = await optimize(front, outputDir, "front");
  const backResult = await optimize(back, outputDir, "back");
  processed += 1;
  console.log(
    `${path.basename(directory)}: ${frontResult.width}×${frontResult.height} ve ${backResult.width}×${backResult.height}; kaynak ${Math.round((frontResult.sourceBytes + backResult.sourceBytes) / 1024)} KB; türev ${Math.round((frontResult.optimizedBytes + backResult.optimizedBytes) / 1024)} KB.`,
  );
}
console.log(
  `${CHECK_ONLY ? "Medya kontrolü" : "Medya optimizasyonu"} tamamlandı: ${processed} ürün.`,
);
