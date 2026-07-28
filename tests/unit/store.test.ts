import { describe, expect, it } from "vitest";
import { store } from "../../src/config/store";

describe("store config", () => {
  it("has a usable placeholder identity", () => {
    expect(store.name.length).toBeGreaterThan(2);
    expect(store.description.length).toBeGreaterThan(20);
  });
});
