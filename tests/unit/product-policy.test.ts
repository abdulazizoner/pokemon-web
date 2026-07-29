import { describe, expect, it } from "vitest";
import { canPurchase, isApprovedShopierUrl, isPublicProduct } from "../../src/lib/product-policy";
import { store } from "../../src/config/store";

describe("store and product policy", () => {
  it("keeps placeholder identity centralized", () => {
    expect(store.isPlaceholderBrand).toBe(true);
    expect(store.email).toContain("example.com");
  });

  it("publishes only public availability states", () => {
    expect(isPublicProduct({ availability: "available" })).toBe(true);
    expect(isPublicProduct({ availability: "sold" })).toBe(true);
    expect(isPublicProduct({ availability: "coming-soon" })).toBe(true);
    expect(isPublicProduct({ availability: "draft" })).toBe(false);
    expect(isPublicProduct({ availability: "hidden" })).toBe(false);
  });

  it("accepts only HTTPS Shopier hosts", () => {
    expect(isApprovedShopierUrl("https://www.shopier.com/example")).toBe(true);
    expect(isApprovedShopierUrl("https://shopier.com/example")).toBe(true);
    expect(isApprovedShopierUrl("http://www.shopier.com/example")).toBe(false);
    expect(isApprovedShopierUrl("https://shopier.com.evil.example/example")).toBe(false);
    expect(isApprovedShopierUrl("https://user@www.shopier.com/example")).toBe(false);
    expect(isApprovedShopierUrl("https://www.shopier.com:8443/example")).toBe(false);
  });

  it("never enables purchase for placeholder, sold or invalid products", () => {
    expect(
      canPurchase({
        availability: "available",
        isPlaceholder: false,
        shopierUrl: "https://www.shopier.com/example",
      }),
    ).toBe(true);
    expect(
      canPurchase({
        availability: "available",
        isPlaceholder: true,
        shopierUrl: "https://www.shopier.com/example",
      }),
    ).toBe(false);
    expect(
      canPurchase({
        availability: "sold",
        isPlaceholder: false,
        shopierUrl: "https://www.shopier.com/example",
      }),
    ).toBe(false);
  });
});
