import {
  allOnPageQuery,
  calculatorConfigQuery,
  competitorsQuery,
  faqsQuery,
  siteContentQuery,
} from "@/lib/sanity.queries";
import { getSanityClient, getSanityClientLive } from "@/lib/sanity.client";
import type { CalculatorEngineConfig } from "@/lib/calculator/engineTypes";
import { DEFAULT_CALCULATOR_ENGINE } from "@/lib/fallback/calculatorEngine";
import type { CompetitorRow, FaqItem } from "@/lib/sanity.types";
import { DEFAULT_SITE_CONTENT } from "@/lib/fallback/siteContentDefaults";
import type { SiteContentData } from "@/lib/siteContent.types";
import { fallbackCompetitors } from "@/lib/fallback/competitors";
import { fallbackFaqs } from "@/lib/fallback/faq";
import { mergeCalculatorEngine, type SanityCalculatorDoc } from "@/lib/sanity.mergeCalculator";
import { mergeAllOnPage, type SanityAllOnPageDoc } from "@/lib/sanity.mergeAllOnPage";
import { mergeSiteContent, type SanitySiteContentDoc } from "@/lib/sanity.mergeSiteContent";
import type { AllOnPageData } from "@/lib/allOnPage.types";
import { DEFAULT_ALL_ON_PAGE } from "@/lib/fallback/allOnPageDefaults";

function sortedCompetitors(rows: CompetitorRow[]) {
  return [...rows].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export async function fetchFaqs(): Promise<{ items: FaqItem[]; fromSanity: boolean }> {
  const client = getSanityClient();
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

export async function fetchSiteContent(): Promise<SiteContentData> {
  const client = getSanityClientLive();
  try {
    const doc = await client.fetch<SanitySiteContentDoc | null>(siteContentQuery);
    return mergeSiteContent(doc);
  } catch {
    return DEFAULT_SITE_CONTENT;
  }
}

export async function fetchCalculatorEngine(): Promise<CalculatorEngineConfig> {
  const client = getSanityClientLive();
  try {
    const doc = await client.fetch<SanityCalculatorDoc | null>(calculatorConfigQuery);
    if (!doc) return DEFAULT_CALCULATOR_ENGINE;
    return mergeCalculatorEngine(doc);
  } catch {
    return DEFAULT_CALCULATOR_ENGINE;
  }
}

export async function fetchAllOnPage(): Promise<AllOnPageData> {
  const client = getSanityClientLive();
  try {
    const doc = await client.fetch<SanityAllOnPageDoc | null>(allOnPageQuery);
    return mergeAllOnPage(doc);
  } catch {
    return DEFAULT_ALL_ON_PAGE;
  }
}
