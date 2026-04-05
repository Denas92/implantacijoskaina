export const IMPLANT_PRICES = {
  standard: 549,
  straumann_sla: 699,
  straumann_slactive: 799,
  straumann_ceramic: 1199,
} as const;

export const ABUTMENT_PRICES = {
  standard: 59,
  straumann: 109,
} as const;

export const CROWN_PRICES = {
  zirconia_full_contour: 450,
  zirconia_ceramic_anterior: 749,
  zirconia_ceramic_single: 799,
  metal_ceramic: 399,
} as const;

export const ADDITIONAL_COSTS = {
  surgical_guide_3d: 249,
  sterile_kit: 69,
  healing_cap: 89,
  temporary_crown: 99,
  /** All-on-X etapas pagal brief lentelę */
  all_on_consultation: 39,
} as const;

export const ALL_ON_X = {
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
} as const;

export type ImplantTier = keyof Pick<
  typeof IMPLANT_PRICES,
  "standard" | "straumann_sla" | "straumann_slactive"
>;

export type ToothPosition = "anterior" | "posterior" | "mixed";

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

export type AllOnXFinalOption =
  | "metal_acrylic"
  | "titanium_acrylic"
  | "titanium_zirconia"
  | "titanium_layered";

const IMPLANT_LABELS: Record<ImplantTier, string> = {
  standard: "Standartinis implantas (Nobel / Neodent / Megagen / Osstem)",
  straumann_sla: "Straumann® SLA",
  straumann_slactive: "Straumann® SLActive",
};

function abutmentUnit(tier: ImplantTier): number {
  return tier === "standard" ? ABUTMENT_PRICES.standard : ABUTMENT_PRICES.straumann;
}

function crownForPosition(
  position: ToothPosition,
): { unit: number; label: string } {
  if (position === "posterior") {
    return {
      unit: CROWN_PRICES.zirconia_full_contour,
      label: "Cirkonio vainikėlis (pilnas kontūras)",
    };
  }
  if (position === "anterior") {
    return {
      unit: CROWN_PRICES.zirconia_ceramic_anterior,
      label: "Cirkonio keramika (priekinis)",
    };
  }
  const unit = Math.round(
    (CROWN_PRICES.zirconia_full_contour + CROWN_PRICES.zirconia_ceramic_anterior) / 2,
  );
  return { unit, label: "Cirkonis (mišrus regionas)" };
}

function formatMoney(n: number): string {
  return `${n.toLocaleString("lt-LT")} €`;
}

export function calculatePartialEstimate(params: {
  toothCount: number;
  toothPosition: ToothPosition;
  implantTier: ImplantTier;
  /** Vienas žandikaulis = 1 gidas ir 1 sterilų rinkinys */
  singleJaw: boolean;
}): CalculationResult {
  const { toothCount, toothPosition, implantTier, singleJaw } = params;
  const n = Math.max(1, Math.min(6, Math.floor(toothCount)));
  const implantUnit = IMPLANT_PRICES[implantTier];
  const abutUnit = abutmentUnit(implantTier);
  const crown = crownForPosition(toothPosition);
  const jawMult = singleJaw ? 1 : 2;

  const items: LineItem[] = [];

  items.push({
    id: "implants",
    label: `Implantai (${n}× ${IMPLANT_LABELS[implantTier]})`,
    qty: n,
    unitPrice: implantUnit,
    total: n * implantUnit,
  });

  items.push({
    id: "abutments",
    label: `Atramos (${n}×)`,
    detail: implantTier === "standard" ? "Standartinė atrama" : "Straumann atrama",
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
    label: "Chirurginis gidas (3D planavimas)",
    qty: jawMult,
    unitPrice: ADDITIONAL_COSTS.surgical_guide_3d,
    total: jawMult * ADDITIONAL_COSTS.surgical_guide_3d,
  });

  items.push({
    id: "sterile",
    label: "Sterilios medžiagos",
    qty: jawMult,
    unitPrice: ADDITIONAL_COSTS.sterile_kit,
    total: jawMult * ADDITIONAL_COSTS.sterile_kit,
  });

  const total = items.reduce((s, i) => s + i.total, 0);

  const countLabel = n === 1 ? "1 dantis" : `${n} dantys`;

  return {
    items,
    total,
    headline: `Jūsų implantacijos orientacinė sąmata (${countLabel})`,
  };
}

const FINAL_OPTION_META: Record<
  AllOnXFinalOption,
  { title: string; description: string }
> = {
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
};

function allOnXFinalPriceKey(
  option: AllOnXFinalOption,
  implants: 4 | 6,
): keyof typeof ALL_ON_X {
  const suffix = implants === 4 ? "_4" : "_6";
  const map: Record<AllOnXFinalOption, string> = {
    metal_acrylic: `final_metal_acrylic${suffix}`,
    titanium_acrylic: `final_titanium_acrylic${suffix}`,
    titanium_zirconia: `final_titanium_zirconia${suffix}`,
    titanium_layered: `final_titanium_layered${suffix}`,
  };
  return map[option] as keyof typeof ALL_ON_X;
}

export function calculateAllOnXEstimate(params: {
  jaws: 1 | 2;
  implants: 4 | 6;
  useStraumann: boolean;
  finalOption: AllOnXFinalOption;
}): CalculationResult {
  const { jaws, implants, useStraumann, finalOption } = params;
  const archCount = jaws;

  const implantKey = (() => {
    if (implants === 4) {
      return useStraumann
        ? ("implants_4_straumann" as const)
        : ("implants_4_standard" as const);
    }
    return useStraumann
      ? ("implants_6_straumann" as const)
      : ("implants_6_standard" as const);
  })();

  const tempKey =
    implants === 4
      ? ("temporary_prosthesis_4" as const)
      : ("temporary_prosthesis_6" as const);

  const finalKey = allOnXFinalPriceKey(finalOption, implants);

  const perArch = (label: string, key: keyof typeof ALL_ON_X, id: string): LineItem => {
    const unitPrice = ALL_ON_X[key];
    return {
      id,
      label,
      qty: archCount,
      unitPrice,
      total: unitPrice * archCount,
    };
  };

  const items: LineItem[] = [
    {
      id: "aox-consult",
      label: "Konsultacija ir diagnostika",
      qty: archCount,
      unitPrice: ADDITIONAL_COSTS.all_on_consultation,
      total: ADDITIONAL_COSTS.all_on_consultation * archCount,
    },
    perArch(
      `Implantai (All-on-${implants}, ${useStraumann ? "Straumann" : "standartiniai"})`,
      implantKey,
      "aox-implants",
    ),
    perArch("Chirurginis gidas (bedantiam žandikauliui)", "surgical_guide_edentulous", "aox-guide"),
    perArch("Sterilios medžiagos", "sterile_kit", "aox-sterile"),
    perArch("Laikinas protezas", tempKey, "aox-temp"),
    perArch(
      `Galutinis protezas — ${FINAL_OPTION_META[finalOption].title}`,
      finalKey,
      "aox-final",
    ),
  ];

  const total = items.reduce((s, i) => s + i.total, 0);

  return {
    items,
    total,
    headline: `All-on-${implants} orientacinė sąmata${archCount === 2 ? " (abu žandikauliai)" : ""}`,
  };
}

export { IMPLANT_LABELS, FINAL_OPTION_META, formatMoney };
