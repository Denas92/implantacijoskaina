import type { CalculatorEngineConfig } from "@/lib/calculator/engineTypes";

/** Numatytoji skaičiuoklė — sutampa su ankstesniu calculatorLogic.ts; Sanity gali dalinai perrašyti. */
export const DEFAULT_CALCULATOR_ENGINE: CalculatorEngineConfig = {
  prices: {
    implant: {
      standard: 549,
      straumann_sla: 699,
      straumann_slactive: 799,
      straumann_ceramic: 1199,
    },
    abutment: { standard: 59, straumann: 109 },
    crown: {
      zirconia_full_contour: 450,
      zirconia_ceramic_anterior: 749,
      zirconia_ceramic_single: 799,
      metal_ceramic: 399,
    },
    additional: {
      surgical_guide_3d: 249,
      sterile_kit: 69,
      healing_cap: 89,
      temporary_crown: 99,
      all_on_consultation: 39,
    },
    allOnX: {
      implants_4_standard: 2499,
      implants_6_standard: 3599,
      implants_4_straumann: 2716,
      implants_6_straumann: 4074,
      surgical_guide_edentulous: 499,
      sterile_kit: 69,
      temporary_prosthesis_4: 1599,
      temporary_prosthesis_6: 1799,
      final_metal_acrylic_4: 2999,
      final_metal_acrylic_6: 3499,
      final_titanium_acrylic_4: 3999,
      final_titanium_acrylic_6: 4499,
      final_titanium_zirconia_4: 5999,
      final_titanium_zirconia_6: 6999,
      final_titanium_layered_4: 6999,
      final_titanium_layered_6: 7999,
    },
  },
  copy: {
    implantLabels: {
      standard: "Standartinis implantas (Nobel / Neodent / Megagen / Osstem)",
      straumann_sla: "Straumann® SLA",
      straumann_slactive: "Straumann® SLActive",
    },
    abutmentDetailStandard: "Standartinė atrama",
    abutmentDetailStraumann: "Straumann atrama",
    crownPosteriorLabel: "Cirkonio vainikėlis (pilnas kontūras)",
    crownAnteriorLabel: "Cirkonio keramika (priekinis)",
    crownMixedLabel: "Cirkonis (mišrus regionas)",
    lineSurgicalGuide3d: "Chirurginis gidas (3D planavimas)",
    lineSterileKit: "Sterilios medžiagos",
    lineAbutmentsGeneric: "Atramos",
    partialHeadline: "Jūsų implantacijos orientacinė sąmata",
    allOnConsultation: "Konsultacija ir diagnostika",
    allOnSurgicalGuideEdentulous: "Chirurginis gidas (bedantiam žandikauliui)",
    allOnSterile: "Sterilios medžiagos",
    allOnTemporary: "Laikinas protezas",
    allOnFinalPrefix: "Galutinis protezas — ",
    allOnBrandStraumann: "Straumann",
    allOnBrandStandard: "standartiniai",
    allOnHeadlineSingle: "All-on-{n} orientacinė sąmata",
    allOnHeadlineDouble: "All-on-{n} orientacinė sąmata (abu žandikauliai)",
  },
  finalOptions: {
    metal_acrylic: {
      title: "Frezuotas metalas + akrilis",
      description: "Įperkamiausias galutinis protezas",
    },
    titanium_acrylic: {
      title: "Titano karkasas + akrilis",
      description: "Stipresnis karkasas",
    },
    titanium_zirconia: {
      title: "Titano + cirkonis (pilnas kontūras)",
      description: "Aukšta estetika",
    },
    titanium_layered: {
      title: "Titano + cirkonio keramika (sluoksniuota)",
      description: "Premium estetika",
    },
  },
  tierCards: [
    {
      id: "standard",
      title: "Standartinis",
      subtitle: "Nobel / Neodent / Megagen / Osstem",
    },
    {
      id: "straumann_sla",
      title: "Straumann® SLA",
      subtitle: "Premium Šveicarijos kokybė",
    },
    {
      id: "straumann_slactive",
      title: "Straumann® SLActive",
      subtitle: "Geriausias gijimas, greičiausias rezultatas",
      recommended: true,
    },
  ],
};
