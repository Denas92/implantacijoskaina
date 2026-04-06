import type { AllOnFaqItem, AllOnPageData, AllOnTimelineStep } from "@/lib/allOnPage.types";
import { DEFAULT_ALL_ON_PAGE } from "@/lib/fallback/allOnPageDefaults";

function trimStr(v: unknown): string | null {
  const t = String(v ?? "").trim();
  return t.length ? t : null;
}

function mergeStr(base: string, patch: unknown): string {
  const t = trimStr(patch);
  return t ?? base;
}

function parseFaqRows(rows: unknown): AllOnFaqItem[] | null {
  if (!Array.isArray(rows) || rows.length === 0) return null;
  const out: AllOnFaqItem[] = [];
  for (const r of rows) {
    if (!r || typeof r !== "object") continue;
    const o = r as Record<string, unknown>;
    const q = trimStr(o.question);
    const a = trimStr(o.answer);
    if (q && a) out.push({ question: q, answer: a });
  }
  return out.length ? out : null;
}

function parseSteps(rows: unknown): AllOnTimelineStep[] | null {
  if (!Array.isArray(rows) || rows.length === 0) return null;
  const out: AllOnTimelineStep[] = [];
  for (const r of rows) {
    if (!r || typeof r !== "object") continue;
    const o = r as Record<string, unknown>;
    const title = trimStr(o.title);
    const body = trimStr(o.body);
    if (title && body) out.push({ title, body });
  }
  return out.length ? out : null;
}

export type SanityAllOnPageDoc = Partial<{
  seo: Partial<AllOnPageData["seo"]>;
  hero: Partial<AllOnPageData["hero"]>;
  whatIs: Partial<AllOnPageData["whatIs"]>;
  compare4vs6: Partial<AllOnPageData["compare4vs6"]>;
  journey: Partial<AllOnPageData["journey"]> & { steps?: unknown };
  immediateLoading: Partial<AllOnPageData["immediateLoading"]>;
  provisionalToFinal: Partial<AllOnPageData["provisionalToFinal"]>;
  tiltedImplants: Partial<AllOnPageData["tiltedImplants"]>;
  pterygoid: Partial<AllOnPageData["pterygoid"]>;
  zygomatic: Partial<AllOnPageData["zygomatic"]>;
  contraindications: Partial<AllOnPageData["contraindications"]>;
  faqSectionTitle?: string;
  faqs: unknown;
  ctas: Partial<AllOnPageData["ctas"]>;
}>;

export function mergeAllOnPage(doc: SanityAllOnPageDoc | null): AllOnPageData {
  const base = structuredClone(DEFAULT_ALL_ON_PAGE);
  if (!doc) return base;

  if (doc.seo) {
    base.seo.title = mergeStr(base.seo.title, doc.seo.title);
    base.seo.description = mergeStr(base.seo.description, doc.seo.description);
    base.seo.ogTitle = mergeStr(base.seo.ogTitle, doc.seo.ogTitle);
    base.seo.ogDescription = mergeStr(base.seo.ogDescription, doc.seo.ogDescription);
  }

  if (doc.hero) {
    base.hero.kicker = mergeStr(base.hero.kicker, doc.hero.kicker);
    base.hero.title = mergeStr(base.hero.title, doc.hero.title);
    base.hero.lead = mergeStr(base.hero.lead, doc.hero.lead);
    base.hero.disclaimer = mergeStr(base.hero.disclaimer, doc.hero.disclaimer);
  }

  if (doc.whatIs) {
    base.whatIs.title = mergeStr(base.whatIs.title, doc.whatIs.title);
    base.whatIs.body = mergeStr(base.whatIs.body, doc.whatIs.body);
  }

  if (doc.compare4vs6) {
    const c = doc.compare4vs6;
    base.compare4vs6.title = mergeStr(base.compare4vs6.title, c.title);
    base.compare4vs6.intro = mergeStr(base.compare4vs6.intro, c.intro);
    base.compare4vs6.fourTitle = mergeStr(base.compare4vs6.fourTitle, c.fourTitle);
    base.compare4vs6.fourBody = mergeStr(base.compare4vs6.fourBody, c.fourBody);
    base.compare4vs6.sixTitle = mergeStr(base.compare4vs6.sixTitle, c.sixTitle);
    base.compare4vs6.sixBody = mergeStr(base.compare4vs6.sixBody, c.sixBody);
  }

  if (doc.journey) {
    base.journey.title = mergeStr(base.journey.title, doc.journey.title);
    const steps = parseSteps(doc.journey.steps);
    if (steps) base.journey.steps = steps;
  }

  if (doc.immediateLoading) {
    const i = doc.immediateLoading;
    base.immediateLoading.title = mergeStr(base.immediateLoading.title, i.title);
    if (i.labels) {
      base.immediateLoading.labels.terms = mergeStr(base.immediateLoading.labels.terms, i.labels.terms);
      base.immediateLoading.labels.whenOften = mergeStr(
        base.immediateLoading.labels.whenOften,
        i.labels.whenOften,
      );
      base.immediateLoading.labels.whenNot = mergeStr(
        base.immediateLoading.labels.whenNot,
        i.labels.whenNot,
      );
      base.immediateLoading.labels.risks = mergeStr(base.immediateLoading.labels.risks, i.labels.risks);
    }
    base.immediateLoading.terms = mergeStr(base.immediateLoading.terms, i.terms);
    base.immediateLoading.whenOften = mergeStr(base.immediateLoading.whenOften, i.whenOften);
    base.immediateLoading.whenNot = mergeStr(base.immediateLoading.whenNot, i.whenNot);
    base.immediateLoading.risks = mergeStr(base.immediateLoading.risks, i.risks);
  }

  if (doc.provisionalToFinal) {
    const p = doc.provisionalToFinal;
    base.provisionalToFinal.title = mergeStr(base.provisionalToFinal.title, p.title);
    if (p.labels) {
      base.provisionalToFinal.labels.whyTwoSteps = mergeStr(
        base.provisionalToFinal.labels.whyTwoSteps,
        p.labels.whyTwoSteps,
      );
      base.provisionalToFinal.labels.typicalTimeline = mergeStr(
        base.provisionalToFinal.labels.typicalTimeline,
        p.labels.typicalTimeline,
      );
      base.provisionalToFinal.labels.materialsNote = mergeStr(
        base.provisionalToFinal.labels.materialsNote,
        p.labels.materialsNote,
      );
    }
    base.provisionalToFinal.whyTwoSteps = mergeStr(base.provisionalToFinal.whyTwoSteps, p.whyTwoSteps);
    base.provisionalToFinal.typicalTimeline = mergeStr(
      base.provisionalToFinal.typicalTimeline,
      p.typicalTimeline,
    );
    base.provisionalToFinal.materialsNote = mergeStr(
      base.provisionalToFinal.materialsNote,
      p.materialsNote,
    );
  }

  if (doc.tiltedImplants) {
    base.tiltedImplants.title = mergeStr(base.tiltedImplants.title, doc.tiltedImplants.title);
    base.tiltedImplants.body = mergeStr(base.tiltedImplants.body, doc.tiltedImplants.body);
  }

  if (doc.pterygoid) {
    const p = doc.pterygoid;
    base.pterygoid.title = mergeStr(base.pterygoid.title, p.title);
    if (p.labels) {
      base.pterygoid.labels.whatIs = mergeStr(base.pterygoid.labels.whatIs, p.labels.whatIs);
      base.pterygoid.labels.whenConsidered = mergeStr(
        base.pterygoid.labels.whenConsidered,
        p.labels.whenConsidered,
      );
      base.pterygoid.labels.whenNot = mergeStr(base.pterygoid.labels.whenNot, p.labels.whenNot);
    }
    base.pterygoid.whatIs = mergeStr(base.pterygoid.whatIs, p.whatIs);
    base.pterygoid.whenConsidered = mergeStr(base.pterygoid.whenConsidered, p.whenConsidered);
    base.pterygoid.whenNot = mergeStr(base.pterygoid.whenNot, p.whenNot);
  }

  if (doc.zygomatic) {
    const z = doc.zygomatic;
    base.zygomatic.title = mergeStr(base.zygomatic.title, z.title);
    if (z.labels) {
      base.zygomatic.labels.whatIs = mergeStr(base.zygomatic.labels.whatIs, z.labels.whatIs);
      base.zygomatic.labels.whenConsidered = mergeStr(
        base.zygomatic.labels.whenConsidered,
        z.labels.whenConsidered,
      );
      base.zygomatic.labels.otherApproaches = mergeStr(
        base.zygomatic.labels.otherApproaches,
        z.labels.otherApproaches,
      );
    }
    base.zygomatic.whatIs = mergeStr(base.zygomatic.whatIs, z.whatIs);
    base.zygomatic.whenConsidered = mergeStr(base.zygomatic.whenConsidered, z.whenConsidered);
    base.zygomatic.otherApproaches = mergeStr(base.zygomatic.otherApproaches, z.otherApproaches);
  }

  if (doc.contraindications) {
    base.contraindications.title = mergeStr(base.contraindications.title, doc.contraindications.title);
    base.contraindications.body = mergeStr(base.contraindications.body, doc.contraindications.body);
  }

  base.faqSectionTitle = mergeStr(base.faqSectionTitle, doc.faqSectionTitle);

  const faqs = parseFaqRows(doc.faqs);
  if (faqs) base.faqs = faqs;

  if (doc.ctas) {
    const c = doc.ctas;
    base.ctas.sectionTitle = mergeStr(base.ctas.sectionTitle, c.sectionTitle);
    base.ctas.sectionAriaLabel = mergeStr(base.ctas.sectionAriaLabel, c.sectionAriaLabel);
    base.ctas.primaryLabel = mergeStr(base.ctas.primaryLabel, c.primaryLabel);
    base.ctas.primaryHref = mergeStr(base.ctas.primaryHref, c.primaryHref);
    base.ctas.secondaryLabel = mergeStr(base.ctas.secondaryLabel, c.secondaryLabel);
    base.ctas.secondaryHref = mergeStr(base.ctas.secondaryHref, c.secondaryHref);
    base.ctas.tertiaryLabel = mergeStr(base.ctas.tertiaryLabel, c.tertiaryLabel);
    base.ctas.tertiaryHref = mergeStr(base.ctas.tertiaryHref, c.tertiaryHref);
  }

  return base;
}
