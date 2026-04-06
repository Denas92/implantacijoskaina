/** Skaičiuoklės konfigūracija — kainos + LT tekstai (Sanity arba fallback). */

export type ImplantTier = "standard" | "straumann_sla" | "straumann_slactive";

export type ToothPosition = "anterior" | "posterior" | "mixed";

export type AllOnXFinalOption =
  | "metal_acrylic"
  | "titanium_acrylic"
  | "titanium_zirconia"
  | "titanium_layered";

export type AllOnXPriceKey =
  | "implants_4_standard"
  | "implants_6_standard"
  | "implants_4_straumann"
  | "implants_6_straumann"
  | "surgical_guide_edentulous"
  | "sterile_kit"
  | "temporary_prosthesis_4"
  | "temporary_prosthesis_6"
  | "final_metal_acrylic_4"
  | "final_metal_acrylic_6"
  | "final_titanium_acrylic_4"
  | "final_titanium_acrylic_6"
  | "final_titanium_zirconia_4"
  | "final_titanium_zirconia_6"
  | "final_titanium_layered_4"
  | "final_titanium_layered_6";

export type CalculatorEngineConfig = {
  prices: {
    implant: {
      standard: number;
      straumann_sla: number;
      straumann_slactive: number;
      straumann_ceramic: number;
    };
    abutment: { standard: number; straumann: number };
    crown: {
      zirconia_full_contour: number;
      zirconia_ceramic_anterior: number;
      zirconia_ceramic_single: number;
      metal_ceramic: number;
    };
    additional: {
      surgical_guide_3d: number;
      sterile_kit: number;
      healing_cap: number;
      temporary_crown: number;
      all_on_consultation: number;
    };
    allOnX: Record<AllOnXPriceKey, number>;
  };
  copy: {
    implantLabels: Record<ImplantTier, string>;
    abutmentDetailStandard: string;
    abutmentDetailStraumann: string;
    crownPosteriorLabel: string;
    crownAnteriorLabel: string;
    crownMixedLabel: string;
    lineSurgicalGuide3d: string;
    lineSterileKit: string;
    lineAbutmentsGeneric: string;
    partialHeadline: string;
    allOnConsultation: string;
    allOnSurgicalGuideEdentulous: string;
    allOnSterile: string;
    allOnTemporary: string;
    allOnFinalPrefix: string;
    allOnBrandStraumann: string;
    allOnBrandStandard: string;
    allOnHeadlineSingle: string;
    allOnHeadlineDouble: string;
  };
  finalOptions: Record<AllOnXFinalOption, { title: string; description: string }>;
  tierCards: {
    id: ImplantTier;
    title: string;
    subtitle: string;
    recommended?: boolean;
  }[];
};
