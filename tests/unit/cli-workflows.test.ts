import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { afterEach, describe, expect, it } from "vitest";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const temporaryDirectories: string[] = [];

function createWorkspace() {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "pokemon-web-cli-"));
  temporaryDirectories.push(directory);
  return directory;
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

describe("content workflow commands", () => {
  it("creates a named draft with the documented --slug syntax and refuses overwrite", () => {
    const workspace = createWorkspace();
    const script = path.join(repoRoot, "scripts/card-new.mjs");

    const firstRun = spawnSync(
      process.execPath,
      [script, "--slug", "test-card", "--name", "Test Kart"],
      { cwd: workspace, encoding: "utf8" },
    );
    expect(firstRun.status, firstRun.stderr).toBe(0);

    const contentPath = path.join(workspace, "src/content/cards/test-card.md");
    const sourceReadme = path.join(workspace, "media-source/products/test-card/README.txt");
    expect(fs.readFileSync(contentPath, "utf8")).toContain('name: "Test Kart"');
    expect(fs.readFileSync(contentPath, "utf8")).toContain('availability: "draft"');
    expect(fs.existsSync(sourceReadme)).toBe(true);

    const secondRun = spawnSync(process.execPath, [script, "--slug", "test-card"], {
      cwd: workspace,
      encoding: "utf8",
    });
    expect(secondRun.status).toBe(1);
    expect(secondRun.stderr).toContain("zaten var");
  });

  it("optimizes front, back and numbered detail sources deterministically", async () => {
    const workspace = createWorkspace();
    const sourceDirectory = path.join(workspace, "media-source/products/test-card");
    fs.mkdirSync(sourceDirectory, { recursive: true });
    for (const [fileName, background] of [
      ["front.jpg", "#ff5e39"],
      ["back.png", "#214de8"],
      ["detail-01.webp", "#d9ff43"],
    ] as const) {
      await sharp({
        create: { width: 600, height: 840, channels: 3, background },
      }).toFile(path.join(sourceDirectory, fileName));
    }

    const script = path.join(repoRoot, "scripts/optimize-media.mjs");
    execFileSync(process.execPath, [script, "--slug", "test-card"], {
      cwd: workspace,
      encoding: "utf8",
    });

    const outputDirectory = path.join(workspace, "public/products/test-card");
    for (const fileName of [
      "front.webp",
      "front-480.webp",
      "front-480.avif",
      "back.webp",
      "detail-01.webp",
    ]) {
      expect(fs.existsSync(path.join(outputDirectory, fileName)), fileName).toBe(true);
    }

    expect(() =>
      execFileSync(process.execPath, [script, "--check", "--slug", "test-card"], {
        cwd: workspace,
        encoding: "utf8",
      }),
    ).not.toThrow();
  });

  it("rejects corrupt source images with an actionable failure", () => {
    const workspace = createWorkspace();
    const sourceDirectory = path.join(workspace, "media-source/products/broken-card");
    fs.mkdirSync(sourceDirectory, { recursive: true });
    fs.writeFileSync(path.join(sourceDirectory, "front.jpg"), "not an image");
    fs.writeFileSync(path.join(sourceDirectory, "back.jpg"), "not an image");

    const result = spawnSync(
      process.execPath,
      [path.join(repoRoot, "scripts/optimize-media.mjs"), "--check", "--slug", "broken-card"],
      { cwd: workspace, encoding: "utf8" },
    );
    expect(result.status).not.toBe(0);
    expect(result.stderr).toMatch(/Medya işlemi başarısız: Input file contains unsupported/i);
  });
});
