import type {
  AllOnXFinalOption,
  AllOnXPriceKey,
  CalculatorEngineConfig,
  ImplantTier,
} from "@/lib/calculator/engineTypes";
import { DEFAULT_CALCULATOR_ENGINE } from "@/lib/fallback/calculatorEngine";

type NumRecord = Record<string, number | undefined>;

function mergeNumbers<T extends NumRecord>(base: T, patch: Partial<T> | null | undefined): T {
  const out = { ...base };
  if (!patch) return out;
  for (const k of Object.keys(base) as (keyof T)[]) {
    const v = patch[k];
    if (typeof v === "number" && !Number.isNaN(v)) {
      (out as NumRecord)[k as string] = v;
    }
  }
  return out;
}

export type SanityCalculatorDoc = {
  implantPrices?: Partial<CalculatorEngineConfig["prices"]["implant"]>;
  abutmentPrices?: Partial<CalculatorEngineConfig["prices"]["abutment"]>;
  crownPrices?: Partial<CalculatorEngineConfig["prices"]["crown"]>;
  additionalCosts?: Partial<CalculatorEngineConfig["prices"]["additional"]>;
  allOnXPrices?: Partial<Record<AllOnXPriceKey, number>>;
  copy?: {
    implantLabelStandard?: string;
    implantLabelSla?: string;
    implantLabelSlactive?: string;
    abutmentDetailStandard?: string;
    abutmentDetailStraumann?: string;
    crownPosteriorLabel?: string;
    crownAnteriorLabel?: string;
    crownMixedLabel?: string;
    lineSurgicalGuide3d?: string;
    lineSterileKit?: string;
    lineAbutmentsGeneric?: string;
    partialHeadline?: string;
    allOnConsultation?: string;
    allOnSurgicalGuideEdentulous?: string;
    allOnSterile?: string;
    allOnTemporary?: string;
    allOnFinalPrefix?: string;
    allOnBrandStraumann?: string;
    allOnBrandStandard?: string;
    allOnHeadlineSingle?: string;
    allOnHeadlineDouble?: string;
  };
  tierCards?: {
    tier?: string;
    title?: string;
    subtitle?: string;
    recommended?: boolean;
  }[];
  finalOptionsList?: {
    key?: string;
    title?: string;
    description?: string;
  }[];
};

export function mergeCalculatorEngine(doc: SanityCalculatorDoc | null): CalculatorEngineConfig {
  const base = structuredClone(DEFAULT_CALCULATOR_ENGINE);
  if (!doc) return base;

  base.prices.implant = mergeNumbers(base.prices.implant, doc.implantPrices);
  base.prices.abutment = mergeNumbers(base.prices.abutment, doc.abutmentPrices);
  base.prices.crown = mergeNumbers(base.prices.crown, doc.crownPrices);
  base.prices.additional = mergeNumbers(base.prices.additional, doc.additionalCosts);

  if (doc.allOnXPrices) {
    const keys = Object.keys(base.prices.allOnX) as AllOnXPriceKey[];
    for (const k of keys) {
      const v = doc.allOnXPrices[k];
      if (typeof v === "number" && !Number.isNaN(v)) {
        base.prices.allOnX[k] = v;
      }
    }
  }

  const c = doc.copy;
  if (c) {
    if (c.implantLabelStandard) base.copy.implantLabels.standard = c.implantLabelStandard;
    if (c.implantLabelSla) base.copy.implantLabels.straumann_sla = c.implantLabelSla;
    if (c.implantLabelSlactive) base.copy.implantLabels.straumann_slactive = c.implantLabelSlactive;
    if (c.abutmentDetailStandard) base.copy.abutmentDetailStandard = c.abutmentDetailStandard;
    if (c.abutmentDetailStraumann) base.copy.abutmentDetailStraumann = c.abutmentDetailStraumann;
    if (c.crownPosteriorLabel) base.copy.crownPosteriorLabel = c.crownPosteriorLabel;
    if (c.crownAnteriorLabel) base.copy.crownAnteriorLabel = c.crownAnteriorLabel;
    if (c.crownMixedLabel) base.copy.crownMixedLabel = c.crownMixedLabel;
    if (c.lineSurgicalGuide3d) base.copy.lineSurgicalGuide3d = c.lineSurgicalGuide3d;
    if (c.lineSterileKit) base.copy.lineSterileKit = c.lineSterileKit;
    if (c.lineAbutmentsGeneric) base.copy.lineAbutmentsGeneric = c.lineAbutmentsGeneric;
    if (c.partialHeadline) base.copy.partialHeadline = c.partialHeadline;
    if (c.allOnConsultation) base.copy.allOnConsultation = c.allOnConsultation;
    if (c.allOnSurgicalGuideEdentulous)
      base.copy.allOnSurgicalGuideEdentulous = c.allOnSurgicalGuideEdentulous;
    if (c.allOnSterile) base.copy.allOnSterile = c.allOnSterile;
    if (c.allOnTemporary) base.copy.allOnTemporary = c.allOnTemporary;
    if (c.allOnFinalPrefix) base.copy.allOnFinalPrefix = c.allOnFinalPrefix;
    if (c.allOnBrandStraumann) base.copy.allOnBrandStraumann = c.allOnBrandStraumann;
    if (c.allOnBrandStandard) base.copy.allOnBrandStandard = c.allOnBrandStandard;
    if (c.allOnHeadlineSingle) base.copy.allOnHeadlineSingle = c.allOnHeadlineSingle;
    if (c.allOnHeadlineDouble) base.copy.allOnHeadlineDouble = c.allOnHeadlineDouble;
  }

  const validTiers: ImplantTier[] = ["standard", "straumann_sla", "straumann_slactive"];
  if (doc.tierCards?.length) {
    const mapped = doc.tierCards
      .filter((row): row is typeof row & { tier: ImplantTier } =>
        Boolean(row.tier && validTiers.includes(row.tier as ImplantTier)),
      )
      .map((row) => ({
        id: row.tier as ImplantTier,
        title: row.title ?? "",
        subtitle: row.subtitle ?? "",
        recommended: row.recommended === true,
      }))
      .filter((row) => row.title);
    if (mapped.length) base.tierCards = mapped;
  }

  if (doc.finalOptionsList?.length) {
    const opts = { ...base.finalOptions };
    for (const row of doc.finalOptionsList) {
      const key = row.key as AllOnXFinalOption | undefined;
      if (!key || !(key in opts)) continue;
      opts[key] = {
        title: row.title ?? opts[key].title,
        description: row.description ?? opts[key].description,
      };
    }
    base.finalOptions = opts;
  }

  return base;
}
