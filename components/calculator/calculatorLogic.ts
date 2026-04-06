import { DEFAULT_CALCULATOR_ENGINE } from "@/lib/fallback/calculatorEngine";
import type {
  AllOnXFinalOption,
  AllOnXPriceKey,
  CalculatorEngineConfig,
  ImplantTier,
  ToothPosition,
} from "@/lib/calculator/engineTypes";

export type {
  AllOnXFinalOption,
  CalculatorEngineConfig,
  ImplantTier,
  ToothPosition,
} from "@/lib/calculator/engineTypes";

export type LineItem = {
  id: string;
  label: string;
  detail?: string;
  qty: number;
  unitPrice: number;
  total: number;
};

export type CalculationResult = {
  items: LineItem[];
  total: number;
  headline: string;
};

/** Atgalinis suderinamumas — numatytosios kainos (be Sanity). */
export const IMPLANT_PRICES = DEFAULT_CALCULATOR_ENGINE.prices.implant;

export const FINAL_OPTION_META = DEFAULT_CALCULATOR_ENGINE.finalOptions;

export function formatMoney(n: number): string {
  return `${n.toLocaleString("lt-LT")} €`;
}

function abutmentUnit(tier: ImplantTier, config: CalculatorEngineConfig): number {
  return tier === "standard"
    ? config.prices.abutment.standard
    : config.prices.abutment.straumann;
}

function crownForPosition(
  position: ToothPosition,
  config: CalculatorEngineConfig,
): { unit: number; label: string } {
  const c = config.prices.crown;
  const { copy } = config;
  if (position === "posterior") {
    return { unit: c.zirconia_full_contour, label: copy.crownPosteriorLabel };
  }
  if (position === "anterior") {
    return { unit: c.zirconia_ceramic_anterior, label: copy.crownAnteriorLabel };
  }
  const unit = Math.round((c.zirconia_full_contour + c.zirconia_ceramic_anterior) / 2);
  return { unit, label: copy.crownMixedLabel };
}

export function calculatePartialEstimate(
  params: {
    toothCount: number;
    toothPosition: ToothPosition;
    implantTier: ImplantTier;
    singleJaw: boolean;
  },
  config: CalculatorEngineConfig = DEFAULT_CALCULATOR_ENGINE,
): CalculationResult {
  const { toothCount, toothPosition, implantTier, singleJaw } = params;
  const n = Math.max(1, Math.min(6, Math.floor(toothCount)));
  const implantUnit = config.prices.implant[implantTier];
  const abutUnit = abutmentUnit(implantTier, config);
  const crown = crownForPosition(toothPosition, config);
  const jawMult = singleJaw ? 1 : 2;
  const { copy, prices } = config;

  const items: LineItem[] = [];

  items.push({
    id: "implants",
    label: `Implantai (${n}× ${copy.implantLabels[implantTier]})`,
    qty: n,
    unitPrice: implantUnit,
    total: n * implantUnit,
  });

  items.push({
    id: "abutments",
    label: `${copy.lineAbutmentsGeneric} (${n}×)`,
    detail:
      implantTier === "standard" ? copy.abutmentDetailStandard : copy.abutmentDetailStraumann,
    qty: n,
    unitPrice: abutUnit,
    total: n * abutUnit,
  });

  items.push({
    id: "crowns",
    label: `Vainikėliai (${n}× ${crown.label})`,
    qty: n,
    unitPrice: crown.unit,
    total: n * crown.unit,
  });

  items.push({
    id: "guide",
    label: copy.lineSurgicalGuide3d,
    qty: jawMult,
    unitPrice: prices.additional.surgical_guide_3d,
    total: jawMult * prices.additional.surgical_guide_3d,
  });

  items.push({
    id: "sterile",
    label: copy.lineSterileKit,
    qty: jawMult,
    unitPrice: prices.additional.sterile_kit,
    total: jawMult * prices.additional.sterile_kit,
  });

  const total = items.reduce((s, i) => s + i.total, 0);
  const countLabel = n === 1 ? "1 dantis" : `${n} dantys`;

  return {
    items,
    total,
    headline: `${copy.partialHeadline} (${countLabel})`,
  };
}

function allOnXFinalPriceKey(
  option: AllOnXFinalOption,
  implants: 4 | 6,
): AllOnXPriceKey {
  const suffix = implants === 4 ? "_4" : "_6";
  const map: Record<AllOnXFinalOption, string> = {
    metal_acrylic: `final_metal_acrylic${suffix}`,
    titanium_acrylic: `final_titanium_acrylic${suffix}`,
    titanium_zirconia: `final_titanium_zirconia${suffix}`,
    titanium_layered: `final_titanium_layered${suffix}`,
  };
  return map[option] as AllOnXPriceKey;
}

export function calculateAllOnXEstimate(
  params: {
    jaws: 1 | 2;
    implants: 4 | 6;
    useStraumann: boolean;
    finalOption: AllOnXFinalOption;
  },
  config: CalculatorEngineConfig = DEFAULT_CALCULATOR_ENGINE,
): CalculationResult {
  const { jaws, implants, useStraumann, finalOption } = params;
  const archCount = jaws;
  const { prices, copy, finalOptions } = config;

  const implantKey = (() => {
    if (implants === 4) {
      return useStraumann ? "implants_4_straumann" : "implants_4_standard";
    }
    return useStraumann ? "implants_6_straumann" : "implants_6_standard";
  })() as AllOnXPriceKey;

  const tempKey =
    implants === 4 ? "temporary_prosthesis_4" : "temporary_prosthesis_6";

  const finalKey = allOnXFinalPriceKey(finalOption, implants);

  const perArch = (label: string, key: AllOnXPriceKey, id: string): LineItem => {
    const unitPrice = prices.allOnX[key];
    return {
      id,
      label,
      qty: archCount,
      unitPrice,
      total: unitPrice * archCount,
    };
  };

  const brandLabel = useStraumann ? copy.allOnBrandStraumann : copy.allOnBrandStandard;

  const items: LineItem[] = [
    {
      id: "aox-consult",
      label: copy.allOnConsultation,
      qty: archCount,
      unitPrice: prices.additional.all_on_consultation,
      total: prices.additional.all_on_consultation * archCount,
    },
    perArch(
      `Implantai (All-on-${implants}, ${brandLabel})`,
      implantKey,
      "aox-implants",
    ),
    perArch(copy.allOnSurgicalGuideEdentulous, "surgical_guide_edentulous", "aox-guide"),
    perArch(copy.allOnSterile, "sterile_kit", "aox-sterile"),
    perArch(copy.allOnTemporary, tempKey as AllOnXPriceKey, "aox-temp"),
    perArch(
      `${copy.allOnFinalPrefix}${finalOptions[finalOption].title}`,
      finalKey,
      "aox-final",
    ),
  ];

  const total = items.reduce((s, i) => s + i.total, 0);
  const headline =
    archCount === 2
      ? copy.allOnHeadlineDouble.replace("{n}", String(implants))
      : copy.allOnHeadlineSingle.replace("{n}", String(implants));

  return {
    items,
    total,
    headline,
  };
}
