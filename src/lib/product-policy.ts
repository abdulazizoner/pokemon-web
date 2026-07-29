export const conditionValues = [
  "Mint",
  "Near Mint",
  "Lightly Played",
  "Played",
  "Damaged",
] as const;

export const availabilityValues = ["available", "sold", "coming-soon", "draft", "hidden"] as const;

export const languageValues = [
  "Türkçe",
  "İngilizce",
  "Japonca",
  "Almanca",
  "Fransızca",
  "Diğer",
] as const;

export const finishValues = ["Normal", "Holo", "Reverse Holo", "Cosmos Holo", "Diğer"] as const;

export type Availability = (typeof availabilityValues)[number];

export const publicAvailability: ReadonlySet<Availability> = new Set([
  "available",
  "sold",
  "coming-soon",
]);

export const approvedShopierHosts = new Set(["shopier.com", "www.shopier.com"]);

export function isPublicProduct(data: { availability: Availability }): boolean {
  return publicAvailability.has(data.availability);
}

export function isApprovedShopierUrl(value?: string): boolean {
  if (!value) return false;
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      approvedShopierHosts.has(url.hostname.toLowerCase()) &&
      !url.username &&
      !url.password &&
      !url.port
    );
  } catch {
    return false;
  }
}

export function canPurchase(data: {
  availability: Availability;
  isPlaceholder: boolean;
  shopierUrl?: string;
}): boolean {
  return (
    data.availability === "available" &&
    !data.isPlaceholder &&
    isApprovedShopierUrl(data.shopierUrl)
  );
}

export const availabilityLabels: Record<Availability, string> = {
  available: "Satışta",
  sold: "Satıldı",
  "coming-soon": "Yakında",
  draft: "Taslak",
  hidden: "Gizli",
};
