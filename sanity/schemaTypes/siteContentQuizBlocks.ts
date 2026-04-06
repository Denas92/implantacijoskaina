import { defineField } from "sanity";

const tierOptions = [
  { title: "Standartinis", value: "standard" },
  { title: "Straumann® SLA", value: "straumann_sla" },
  { title: "Straumann® SLActive", value: "straumann_slactive" },
];

const positionOptions = [
  { title: "Priekiniai dantys", value: "anterior" },
  { title: "Galiniai dantys", value: "posterior" },
  { title: "Mišrus", value: "mixed" },
];

function tierByPriorityRow(title: string, key: string) {
  return defineField({
    name: key,
    title,
    type: "object",
    fields: [
      defineField({
        name: "tier",
        title: "Implantų linija",
        type: "string",
        options: { list: tierOptions },
      }),
      defineField({ name: "explanation", title: "Paaiškinimas", type: "text", rows: 3 }),
    ],
  });
}

function positionRow(title: string, key: string) {
  return defineField({
    name: key,
    title,
    type: "string",
    options: { list: positionOptions },
  });
}

export const siteContentQuizEngineField = defineField({
  name: "quizEngine",
  title: "Testo logika — tekstai (antgaliai, prioritetai, kainos pastaba)",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "tierByQ4",
      title: "Prioritetas (klausimas 4) → linija ir paaiškinimas",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        tierByPriorityRow("Estetika", "aesthetics"),
        tierByPriorityRow("Funkcija", "function"),
        tierByPriorityRow("Ilgaamžiškumas", "longevity"),
        tierByPriorityRow("Kaina", "price"),
      ],
    }),
    defineField({
      name: "positionByQ4",
      title: "Prioritetas → danties pozicija (1 implanto skaičiavimui)",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        positionRow("Estetika", "aesthetics"),
        positionRow("Funkcija", "function"),
        positionRow("Ilgaamžiškumas", "longevity"),
        positionRow("Kaina", "price"),
      ],
    }),
    defineField({
      name: "ageByQ6",
      title: "Amžius (klausimas 6) → tekstas",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "y18_35", title: "18–35", type: "text", rows: 2 }),
        defineField({ name: "y36_55", title: "36–55", type: "text", rows: 2 }),
        defineField({ name: "y56_70", title: "56–70", type: "text", rows: 2 }),
        defineField({ name: "y70plus", title: "70+", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "priorityLineByQ4",
      title: "Prioriteto eilutė rezultate",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "aesthetics", title: "Estetika", type: "text", rows: 2 }),
        defineField({ name: "function", title: "Funkcija", type: "text", rows: 2 }),
        defineField({ name: "longevity", title: "Ilgaamžiškumas", type: "text", rows: 2 }),
        defineField({ name: "price", title: "Kaina", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "headlines",
      title: "Rezultato antraštės (pagal atsakymus / balą)",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "q1_many_missing",
          title: "Q1: daug trūksta",
          type: "string",
        }),
        defineField({ name: "q1_loose", title: "Q1: dantys juda", type: "string" }),
        defineField({
          name: "q1_one_few_high",
          title: "Q1: vienas/kelios + aukštas balas",
          type: "string",
        }),
        defineField({ name: "q1_one_few", title: "Q1: vienas/kelios", type: "string" }),
        defineField({ name: "score30", title: "Balas ≥ 30", type: "string" }),
        defineField({ name: "default", title: "Numatytoji", type: "string" }),
      ],
    }),
    defineField({
      name: "leads",
      title: "Lead tekstas pagal balą (≥32 / ≥22 / kita)",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "high", title: "Aukštas (≥32)", type: "text", rows: 3 }),
        defineField({ name: "mid", title: "Vidutinis (≥22)", type: "text", rows: 3 }),
        defineField({ name: "low", title: "Žemesnis", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "orientedNote",
      title: "Pastaba po orientacine kaina",
      type: "text",
      rows: 3,
    }),
  ],
});

export const siteContentQuizResultUiField = defineField({
  name: "quizResultUi",
  title: "Testo rezultato ekranas — etiketės ir mygtukai",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: "errorMessage", title: "Klaidos žinutė", type: "string" }),
    defineField({ name: "errorRetry", title: "Klaida — bandyti vėl", type: "string" }),
    defineField({ name: "allGoodKicker", title: "„Puiku“ — kicker", type: "string" }),
    defineField({ name: "allGoodTitle", title: "„Puiku“ — antraštė", type: "string" }),
    defineField({ name: "allGoodLead", title: "„Puiku“ — lead", type: "text", rows: 3 }),
    defineField({ name: "allGoodHome", title: "„Puiku“ — mygtukas į pradžią", type: "string" }),
    defineField({ name: "allGoodRetry", title: "„Puiku“ — kartoti testą", type: "string" }),
    defineField({ name: "consultKicker", title: "Konsultacijos variantas — kicker", type: "string" }),
    defineField({ name: "labelPriority", title: "Etiketė: prioritetas", type: "string" }),
    defineField({ name: "labelAge", title: "Etiketė: amžius", type: "string" }),
    defineField({ name: "labelTier", title: "Etiketė: linija", type: "string" }),
    defineField({ name: "flaplessTitle", title: "Flapless blokas — antraštė", type: "string" }),
    defineField({ name: "flaplessBody", title: "Flapless blokas — tekstas", type: "text", rows: 3 }),
    defineField({ name: "flaplessLink", title: "Flapless — nuorodos tekstas", type: "string" }),
    defineField({ name: "chronicTitle", title: "Lėtinės ligos — antraštė", type: "string" }),
    defineField({ name: "chronicBody", title: "Lėtinės ligos — tekstas", type: "text", rows: 3 }),
    defineField({ name: "orientedPriceLabel", title: "Orientacinės kainos etiketė", type: "string" }),
    defineField({ name: "ctaConsult", title: "CTA: konsultacija", type: "string" }),
    defineField({ name: "ctaCalculator", title: "CTA: skaičiuoklė", type: "string" }),
    defineField({ name: "ctaRetry", title: "CTA: kartoti testą", type: "string" }),
  ],
});
