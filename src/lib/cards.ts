import { getCollection, type CollectionEntry } from "astro:content";
import type { CardData } from "../content.config";

export type CardEntry = Omit<CollectionEntry<"cards">, "data"> & {
  data: CardData;
};

export async function getCards(): Promise<CardEntry[]> {
  return (await getCollection("cards")) as CardEntry[];
}
