import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { ACCEPTED_IMAGE_EXTENSIONS } from "./lib/content-validator.mjs";

const SOURCE_ROOT = path.resolve("media-source/products");
const OUTPUT_ROOT = path.resolve("public/products");
const args = process.argv.slice(2);
const CHECK_ONLY = args.includes("--check");
const MAX_SOURCE_BYTES = 12 * 1024 * 1024;
const WIDTHS = [480, 800, 1200];

function getOption(name) {
  const inline = args.find((arg) => arg.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

const targetSlug = getOption("--slug");

function findRoleFile(directory, role) {
  const matches = fs
    .readdirSync(directory)
    .filter((file) => path.parse(file).name.toLowerCase() === role)
    .filter((file) => ACCEPTED_IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()));
  if (matches.length > 1) throw new Error(`${directory}: "${role}" için birden fazla kaynak var.`);
  return matches[0] ? path.join(directory, matches[0]) : null;
}

function findDetailFiles(directory) {
  const details = fs
    .readdirSync(directory)
    .filter((file) => /^detail-\d+$/i.test(path.parse(file).name))
    .filter((file) => ACCEPTED_IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
  const seenRoles = new Set();
  return details.map((file) => {
    const role = path.parse(file).name.toLowerCase();
    if (seenRoles.has(role)) {
      throw new Error(`${directory}: "${role}" için birden fazla kaynak var.`);
    }
    seenRoles.add(role);
    return { role, filePath: path.join(directory, file) };
  });
}

async function verifySource(filePath) {
  if (fs.statSync(filePath).size > MAX_SOURCE_BYTES) {
    throw new Error(`${filePath}: kaynak görsel 12 MB sınırını aşıyor.`);
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

async function main() {
  if (targetSlug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(targetSlug)) {
    throw new Error(`Geçersiz --slug değeri: "${targetSlug}".`);
  }

  if (!fs.existsSync(SOURCE_ROOT)) {
    console.log("Medya kaynak klasörü henüz boş; gerçek ürün fotoğrafı bekleniyor.");
    return;
  }

  let productDirs = fs
    .readdirSync(SOURCE_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(SOURCE_ROOT, entry.name));

  if (targetSlug) {
    productDirs = productDirs.filter((directory) => path.basename(directory) === targetSlug);
    if (productDirs.length === 0) {
      throw new Error(`Medya kaynak klasörü bulunamadı: media-source/products/${targetSlug}`);
    }
  }

  let processed = 0;
  for (const directory of productDirs) {
    const front = findRoleFile(directory, "front");
    const back = findRoleFile(directory, "back");
    const detailFiles = findDetailFiles(directory);
    if (!front && !back && detailFiles.length === 0 && !targetSlug) continue;
    if (!front || !back) throw new Error(`${directory}: front/back çifti eksik.`);
    const outputDir = path.join(OUTPUT_ROOT, path.basename(directory));
    const frontResult = await optimize(front, outputDir, "front");
    const backResult = await optimize(back, outputDir, "back");
    const detailResults = [];
    for (const detail of detailFiles) {
      detailResults.push(await optimize(detail.filePath, outputDir, detail.role));
    }
    processed += 1;
    const sourceBytes =
      frontResult.sourceBytes +
      backResult.sourceBytes +
      detailResults.reduce((total, item) => total + item.sourceBytes, 0);
    const optimizedBytes =
      frontResult.optimizedBytes +
      backResult.optimizedBytes +
      detailResults.reduce((total, item) => total + item.optimizedBytes, 0);
    console.log(
      `${path.basename(directory)}: ön ${frontResult.width}×${frontResult.height}, arka ${backResult.width}×${backResult.height}, ${detailResults.length} detay; kaynak ${Math.round(sourceBytes / 1024)} KB; türev ${Math.round(optimizedBytes / 1024)} KB.`,
    );
  }
  console.log(
    `${CHECK_ONLY ? "Medya kontrolü" : "Medya optimizasyonu"} tamamlandı: ${processed} ürün.`,
  );
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Medya işlemi başarısız: ${message}`);
  process.exitCode = 1;
});
