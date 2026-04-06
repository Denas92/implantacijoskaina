import { defineField, defineType } from "sanity";

const implantPriceFields = [
  { name: "standard", title: "Standartinis" },
  { name: "straumann_sla", title: "Straumann SLA" },
  { name: "straumann_slactive", title: "Straumann SLActive" },
  { name: "straumann_ceramic", title: "Straumann keramika" },
] as const;

const allOnXFields = [
  ["implants_4_standard", "All-on-4 standartiniai"],
  ["implants_6_standard", "All-on-6 standartiniai"],
  ["implants_4_straumann", "All-on-4 Straumann"],
  ["implants_6_straumann", "All-on-6 Straumann"],
  ["surgical_guide_edentulous", "Gidas bedančiam"],
  ["sterile_kit", "Sterilios medžiagos (All-on)"],
  ["temporary_prosthesis_4", "Laikinas protezas (4)"],
  ["temporary_prosthesis_6", "Laikinas protezas (6)"],
  ["final_metal_acrylic_4", "Galutinis metalas+akrilis (4)"],
  ["final_metal_acrylic_6", "Galutinis metalas+akrilis (6)"],
  ["final_titanium_acrylic_4", "Titano+akrilis (4)"],
  ["final_titanium_acrylic_6", "Titano+akrilis (6)"],
  ["final_titanium_zirconia_4", "Titano+cirkonis (4)"],
  ["final_titanium_zirconia_6", "Titano+cirkonis (6)"],
  ["final_titanium_layered_4", "Titano+keramika sluoksniuota (4)"],
  ["final_titanium_layered_6", "Titano+keramika sluoksniuota (6)"],
] as const;

export default defineType({
  name: "calculatorConfig",
  title: "Skaičiuoklės kainos ir tekstai",
  type: "document",
  fields: [
    defineField({
      name: "implantPrices",
      title: "Implantų kainos (€ / vnt.)",
      type: "object",
      fields: implantPriceFields.map(({ name, title }) =>
        defineField({ name, title, type: "number" }),
      ),
    }),
    defineField({
      name: "abutmentPrices",
      title: "Atramos (€)",
      type: "object",
      fields: [
        defineField({ name: "standard", title: "Standartinė", type: "number" }),
        defineField({ name: "straumann", title: "Straumann", type: "number" }),
      ],
    }),
    defineField({
      name: "crownPrices",
      title: "Vainikėliai (€)",
      type: "object",
      fields: [
        defineField({ name: "zirconia_full_contour", title: "Cirkonis pilnas kontūras", type: "number" }),
        defineField({
          name: "zirconia_ceramic_anterior",
          title: "Cirkonio keramika priekis",
          type: "number",
        }),
        defineField({ name: "zirconia_ceramic_single", title: "Cirkonio keramika single", type: "number" }),
        defineField({ name: "metal_ceramic", title: "Metalas-keramika", type: "number" }),
      ],
    }),
    defineField({
      name: "additionalCosts",
      title: "Papildomos eilutės (€)",
      type: "object",
      fields: [
        defineField({ name: "surgical_guide_3d", title: "Chirurginis gidas 3D", type: "number" }),
        defineField({ name: "sterile_kit", title: "Sterilios medžiagos (dalinis)", type: "number" }),
        defineField({ name: "healing_cap", title: "Gijimo dangtelis", type: "number" }),
        defineField({ name: "temporary_crown", title: "Laikinas vainikėlis", type: "number" }),
        defineField({ name: "all_on_consultation", title: "All-on konsultacija / diag.", type: "number" }),
      ],
    }),
    defineField({
      name: "allOnXPrices",
      title: "All-on-X kainos (€)",
      type: "object",
      fields: allOnXFields.map(([name, title]) =>
        defineField({ name, title, type: "number" }),
      ),
    }),
    defineField({
      name: "copy",
      title: "Tekstai skaičiuoklėje (LT)",
      type: "object",
      fields: [
        defineField({ name: "implantLabelStandard", title: "Implanto etiketė: standartinis", type: "string" }),
        defineField({ name: "implantLabelSla", title: "Implanto etiketė: SLA", type: "string" }),
        defineField({ name: "implantLabelSlactive", title: "Implanto etiketė: SLActive", type: "string" }),
        defineField({ name: "abutmentDetailStandard", title: "Atrama: standartinė", type: "string" }),
        defineField({ name: "abutmentDetailStraumann", title: "Atrama: Straumann", type: "string" }),
        defineField({ name: "crownPosteriorLabel", title: "Vainikėlis: šoninis", type: "string" }),
        defineField({ name: "crownAnteriorLabel", title: "Vainikėlis: priekinis", type: "string" }),
        defineField({ name: "crownMixedLabel", title: "Vainikėlis: mišrus", type: "string" }),
        defineField({ name: "lineSurgicalGuide3d", title: "Eilutė: 3D gidas", type: "string" }),
        defineField({ name: "lineSterileKit", title: "Eilutė: sterilios medžiagos", type: "string" }),
        defineField({ name: "lineAbutmentsGeneric", title: "Eilutė: atramos (bendras)", type: "string" }),
        defineField({ name: "partialHeadline", title: "Dalies sąmatos antraštė (be skliaustų)", type: "string" }),
        defineField({ name: "allOnConsultation", title: "All-on: konsultacija", type: "string" }),
        defineField({ name: "allOnSurgicalGuideEdentulous", title: "All-on: gidas bedančiam", type: "string" }),
        defineField({ name: "allOnSterile", title: "All-on: sterilios", type: "string" }),
        defineField({ name: "allOnTemporary", title: "All-on: laikinas protezas", type: "string" }),
        defineField({ name: "allOnFinalPrefix", title: "All-on: galutinio prefiksas", type: "string" }),
        defineField({ name: "allOnBrandStraumann", title: "Žymė: Straumann", type: "string" }),
        defineField({ name: "allOnBrandStandard", title: "Žymė: standartiniai", type: "string" }),
        defineField({
          name: "allOnHeadlineSingle",
          title: "All-on antraštė (1 žand.) — naudokite {n}",
          type: "string",
        }),
        defineField({
          name: "allOnHeadlineDouble",
          title: "All-on antraštė (2 žand.) — naudokite {n}",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "tierCards",
      title: "Implanto tipo kortelės (3 žingsnis)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "tier",
              title: "Tipas",
              type: "string",
              options: {
                list: [
                  { title: "Standartinis", value: "standard" },
                  { title: "Straumann SLA", value: "straumann_sla" },
                  { title: "Straumann SLActive", value: "straumann_slactive" },
                ],
              },
              validation: (r) => r.required(),
            }),
            defineField({ name: "title", title: "Antraštė", type: "string", validation: (r) => r.required() }),
            defineField({ name: "subtitle", title: "Paantraštė", type: "string" }),
            defineField({ name: "recommended", title: "Žyma „Rekomenduojama“", type: "boolean" }),
          ],
          preview: {
            select: { title: "title", tier: "tier" },
            prepare({ title, tier }) {
              return { title: title ?? tier, subtitle: tier };
            },
          },
        },
      ],
    }),
    defineField({
      name: "finalOptionsList",
      title: "All-on galutinio protezo variantai",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "key",
              title: "Raktas",
              type: "string",
              options: {
                list: [
                  { title: "Metalas + akrilis", value: "metal_acrylic" },
                  { title: "Titano + akrilis", value: "titanium_acrylic" },
                  { title: "Titano + cirkonis", value: "titanium_zirconia" },
                  { title: "Titano + keramika sluoksniuota", value: "titanium_layered" },
                ],
              },
              validation: (r) => r.required(),
            }),
            defineField({ name: "title", title: "Pavadinimas", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", title: "Aprašymas", type: "text", rows: 2 }),
          ],
          preview: {
            select: { title: "title", key: "key" },
            prepare({ title, key }) {
              return { title: title ?? key, subtitle: key };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Skaičiuoklės konfigūracija" };
    },
  },
});
