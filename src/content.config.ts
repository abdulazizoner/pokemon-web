import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import {
  availabilityValues,
  conditionValues,
  finishValues,
  isApprovedShopierUrl,
  languageValues,
} from "./lib/product-policy";

const cards = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/cards" }),
  schema: z
    .object({
      productId: z.string().regex(/^CARD-\d{4,}$/),
      slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
      name: z.string().min(2),
      setName: z.string().min(2),
      setCode: z.string().max(16).optional(),
      collectorNumber: z.string().min(1),
      language: z.enum(languageValues),
      rarity: z.string().min(2),
      finish: z.enum(finishValues),
      condition: z.enum(conditionValues),
      conditionNote: z.string().min(12),
      description: z.string().min(20),
      displayPrice: z.string().min(2).optional(),
      availability: z.enum(availabilityValues),
      featured: z.boolean().default(false),
      publishedAt: z.coerce.date(),
      sortOrder: z.number().int().min(0).default(100),
      frontImage: z.string().regex(/^\/[a-zA-Z0-9_./-]+\.(?:jpe?g|png|webp|avif)$/i),
      backImage: z.string().regex(/^\/[a-zA-Z0-9_./-]+\.(?:jpe?g|png|webp|avif)$/i),
      detailImages: z
        .array(
          z.object({
            src: z.string().regex(/^\/[a-zA-Z0-9_./-]+\.(?:jpe?g|png|webp|avif)$/i),
            alt: z.string().min(6),
          }),
        )
        .default([]),
      frontAlt: z.string().min(8),
      backAlt: z.string().min(8),
      shopierUrl: z
        .string()
        .optional()
        .refine((value) => !value || isApprovedShopierUrl(value), {
          message: "Shopier bağlantısı HTTPS kullanmalı ve onaylı Shopier alan adında olmalıdır.",
        }),
      isPlaceholder: z.boolean().default(true),
      seoTitle: z.string().max(65).optional(),
      seoDescription: z.string().max(170).optional(),
    })
    .superRefine((data, ctx) => {
      if (data.availability === "available" && !data.isPlaceholder) {
        if (!data.displayPrice) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["displayPrice"],
            message: "Satıştaki ürünün görüntülenecek fiyatı zorunludur.",
          });
        }
        if (!data.shopierUrl) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["shopierUrl"],
            message: "Satıştaki gerçek ürünün Shopier bağlantısı zorunludur.",
          });
        }
      }
      if (data.isPlaceholder && data.availability === "available") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["availability"],
          message: "Yer tutucu ürün satışta olarak yayımlanamaz.",
        });
      }
    }),
});

export const collections = { cards };
