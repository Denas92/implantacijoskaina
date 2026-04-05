import { faqsQuery, competitorsQuery } from "@/lib/sanity.queries";
import { getSanityClient } from "@/lib/sanity.client";
import type { CompetitorRow, FaqItem } from "@/lib/sanity.types";
import { fallbackCompetitors } from "@/lib/fallback/competitors";
import { fallbackFaqs } from "@/lib/fallback/faq";

function sortedCompetitors(rows: CompetitorRow[]) {
  return [...rows].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export async function fetchFaqs(): Promise<{ items: FaqItem[]; fromSanity: boolean }> {
  const client = getSanityClient();
  if (!client) {
    return { items: fallbackFaqs, fromSanity: false };
  }
  try {
    const rows = await client.fetch<FaqItem[]>(faqsQuery);
    if (!rows?.length) {
      return { items: fallbackFaqs, fromSanity: false };
    }
    return { items: rows, fromSanity: true };
  } catch {
    return { items: fallbackFaqs, fromSanity: false };
  }
}

export async function fetchCompetitors(): Promise<{
  rows: CompetitorRow[];
  fromSanity: boolean;
}> {
  const client = getSanityClient();
  if (!client) {
    return { rows: sortedCompetitors(fallbackCompetitors), fromSanity: false };
  }
  try {
    const rows = await client.fetch<CompetitorRow[]>(competitorsQuery);
    if (!rows?.length) {
      return { rows: sortedCompetitors(fallbackCompetitors), fromSanity: false };
    }
    return { rows: sortedCompetitors(rows), fromSanity: true };
  } catch {
    return { rows: sortedCompetitors(fallbackCompetitors), fromSanity: false };
  }
}
