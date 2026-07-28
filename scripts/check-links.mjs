import fs from "node:fs";
import path from "node:path";

const DIST = path.resolve("dist");
if (!fs.existsSync(DIST)) {
  console.error("dist/ bulunamadı. Önce Astro build çalıştırılmalıdır.");
  process.exit(1);
}

const htmlFiles = [];
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else if (entry.name.endsWith(".html")) htmlFiles.push(fullPath);
  }
}
walk(DIST);

const errors = [];
const hrefPattern = /\b(?:href|src)="([^"]+)"/g;
for (const htmlFile of htmlFiles) {
  const html = fs.readFileSync(htmlFile, "utf8");
  for (const match of html.matchAll(hrefPattern)) {
    const value = match[1];
    if (!value.startsWith("/") || value.startsWith("//")) continue;
    const pathname = value.split(/[?#]/)[0];
    const candidate = path.join(DIST, pathname.replace(/^[/\\]+/, ""));
    const resolved = path.extname(candidate)
      ? candidate
      : fs.existsSync(candidate)
        ? candidate
        : path.join(candidate, "index.html");
    if (!fs.existsSync(resolved)) {
      errors.push(`${path.relative(DIST, htmlFile)} -> ${value}`);
    }
  }
}

if (errors.length) {
  console.error(
    `Kırık yerel bağlantılar (${errors.length}):\n${errors.map((x) => `- ${x}`).join("\n")}`,
  );
  process.exit(1);
}
console.log(`Yerel bağlantı kontrolü başarılı: ${htmlFiles.length} HTML sayfası.`);
