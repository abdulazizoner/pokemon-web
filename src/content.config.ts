import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const cards = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/cards" }),
  schema: z.object({
    name: z.string().min(2),
    setName: z.string(),
    collectorNumber: z.string(),
    language: z.string(),
    rarity: z.string(),
    finish: z.string(),
    condition: z.enum(["Mint", "Near Mint", "Lightly Played", "Played", "Damaged"]),
    conditionNote: z.string(),
    displayPrice: z.string(),
    availability: z.enum(["available", "reserved", "sold"]),
    frontImage: z.string(),
    backImage: z.string(),
    shopierUrl: z.string().url().refine((url) => new URL(url).hostname.endsWith("shopier.com"), {
      message: "Satış bağlantısı shopier.com alan adında olmalıdır.",
    }),
    featured: z.boolean().default(false),
    sortOrder: z.number().int().default(100),
    addedAt: z.coerce.date(),
  }),
});

export const collections = { cards };
