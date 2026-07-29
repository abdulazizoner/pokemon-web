import { describe, expect, it } from "vitest";
import { readProducts, validateProducts } from "../../scripts/lib/content-validator.mjs";

describe("content validator", () => {
  it("accepts repository content", () => {
    const result = validateProducts(readProducts());
    expect(result.errors).toEqual([]);
  });

  it("detects duplicate IDs, slugs and Shopier URLs", () => {
    const base = readProducts()[0];
    const productionData = {
      ...base.data,
      availability: "available",
      isPlaceholder: false,
      shopierUrl: "https://www.shopier.com/example-product",
    };
    const result = validateProducts([
      { ...base, fileName: `${productionData.slug}.md`, data: productionData },
      { ...base, fileName: `${productionData.slug}.md`, data: productionData },
    ]);
    expect(result.errors.join("\n")).toMatch(/yinelenen productId/);
    expect(result.errors.join("\n")).toMatch(/yinelenen slug/);
    expect(result.errors.join("\n")).toMatch(/yinelenen Shopier URL/);
  });

  it("rejects a placeholder purchase link", () => {
    const base = readProducts()[0];
    const result = validateProducts([
      {
        ...base,
        data: {
          ...base.data,
          availability: "available",
          isPlaceholder: true,
          shopierUrl: "https://www.shopier.com/example-product",
        },
      },
    ]);
    expect(result.errors.join("\n")).toMatch(/yer tutucu ürün/);
  });

  it("rejects insecure and lookalike Shopier hosts", () => {
    const base = readProducts()[0];
    const result = validateProducts([
      {
        ...base,
        data: {
          ...base.data,
          availability: "available",
          isPlaceholder: false,
          displayPrice: "1.000 TL",
          shopierUrl: "https://www.shopier.com.evil.example/product",
        },
      },
    ]);
    expect(result.errors.join("\n")).toMatch(/onaylı alan adında/);
  });
});
