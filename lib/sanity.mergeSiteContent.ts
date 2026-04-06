import { DEFAULT_SITE_CONTENT } from "@/lib/fallback/siteContentDefaults";
import type { SiteContentData, SiteLink } from "@/lib/siteContent.types";
import { mergeQuizEngineCopy, mergeQuizResultUi } from "@/lib/quiz/mergeQuizContent";

function normLinks(rows: unknown): SiteLink[] | null {
  if (!Array.isArray(rows) || rows.length === 0) return null;
  const out: SiteLink[] = [];
  for (const r of rows) {
    if (r && typeof r === "object" && "href" in r && "label" in r) {
      const href = String((r as { href: unknown }).href ?? "").trim();
      const label = String((r as { label: unknown }).label ?? "").trim();
      if (href && label) out.push({ href, label });
    }
  }
  return out.length ? out : null;
}

export type SanitySiteContentDoc = {
  hero?: Partial<SiteContentData["hero"]>;
  trustSignals?: { value?: string; label?: string }[];
  navLinks?: { href?: string; label?: string }[];
  footerLinks?: { href?: string; label?: string }[];
  homepage?: Partial<SiteContentData["homepage"]> & {
    pricingOverviewCards?: {
      title?: string;
      subtitle?: string;
      fromPrice?: string;
      showBadge?: boolean;
      cardFootnote?: string;
    }[];
  };
  quizPage?: Partial<SiteContentData["quizPage"]>;
  quizEngine?: unknown;
  quizResultUi?: unknown;
  whatsappPresetMessage?: string;
};

export function mergeSiteContent(doc: SanitySiteContentDoc | null): SiteContentData {
  const base = structuredClone(DEFAULT_SITE_CONTENT);
  if (!doc) return base;

  if (doc.hero) {
    base.hero = { ...base.hero, ...doc.hero };
  }

  const nav = normLinks(doc.navLinks);
  if (nav) base.navLinks = nav;

  const foot = normLinks(doc.footerLinks);
  if (foot) base.footerLinks = foot;

  if (doc.trustSignals?.length) {
    const ts = doc.trustSignals
      .map((x) => ({
        value: String(x.value ?? "").trim(),
        label: String(x.label ?? "").trim(),
      }))
      .filter((x) => x.value && x.label);
    if (ts.length) base.trustSignals = ts;
  }

  if (doc.homepage) {
    const h = doc.homepage;
    if (h.calculatorSectionTitle != null) base.homepage.calculatorSectionTitle = h.calculatorSectionTitle;
    if (h.calculatorSectionLead != null) base.homepage.calculatorSectionLead = h.calculatorSectionLead;
    if (h.pricingOverviewTitle != null) base.homepage.pricingOverviewTitle = h.pricingOverviewTitle;
    if (h.pricingCtaLabel != null) base.homepage.pricingCtaLabel = h.pricingCtaLabel;
    if (h.consultationTitle != null) base.homepage.consultationTitle = h.consultationTitle;
    if (h.consultationLead != null) base.homepage.consultationLead = h.consultationLead;
    if (h.pricingOverviewCards?.length) {
      const cards = h.pricingOverviewCards
        .map((c) => ({
          title: String(c.title ?? "").trim(),
          subtitle: String(c.subtitle ?? "").trim(),
          fromPrice: String(c.fromPrice ?? "").trim(),
          showBadge: c.showBadge === true,
          cardFootnote:
            c.cardFootnote != null
              ? String(c.cardFootnote)
              : "implantas + atrama + vainikėlis — detalės skaičiuoklėje",
        }))
        .filter((c) => c.title);
      if (cards.length) base.homepage.pricingOverviewCards = cards;
    }
  }

  if (doc.quizPage) {
    base.quizPage = { ...base.quizPage, ...doc.quizPage };
  }

  base.quizEngine = mergeQuizEngineCopy(doc.quizEngine);
  base.quizResultUi = mergeQuizResultUi(doc.quizResultUi);

  if (doc.whatsappPresetMessage?.trim()) {
    base.whatsappPresetMessage = doc.whatsappPresetMessage.trim();
  }

  return base;
}
