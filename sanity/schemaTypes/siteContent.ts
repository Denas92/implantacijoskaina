import { defineField, defineType } from "sanity";
import { siteContentQuizEngineField, siteContentQuizResultUiField } from "./siteContentQuizBlocks";

const linkFields = [
  defineField({ name: "href", title: "Kelias (href)", type: "string", validation: (r) => r.required() }),
  defineField({ name: "label", title: "Tekstas meniu", type: "string", validation: (r) => r.required() }),
];

export default defineType({
  name: "siteContent",
  title: "Svetainės turinys (nav, hero, blokai)",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero (pradžia)",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Viršutinė eilutė", type: "string" }),
        defineField({ name: "title", title: "H1 antraštė", type: "string" }),
        defineField({ name: "lead", title: "Lead tekstas", type: "text", rows: 3 }),
        defineField({ name: "primaryCtaLabel", title: "Mygtukas 1", type: "string" }),
        defineField({ name: "primaryCtaHref", title: "Mygtukas 1 href", type: "string" }),
        defineField({ name: "secondaryCtaLabel", title: "Mygtukas 2", type: "string" }),
        defineField({ name: "secondaryCtaHref", title: "Mygtukas 2 href", type: "string" }),
      ],
    }),
    defineField({
      name: "trustSignals",
      title: "Pasitikėjimo juosta (4 plytelės)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Skaičius / žyma", type: "string" }),
            defineField({ name: "label", title: "Aprašas", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
    }),
    defineField({
      name: "navLinks",
      title: "Pagrindinis meniu",
      type: "array",
      of: [
        {
          type: "object",
          name: "navLink",
          fields: linkFields,
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),
    defineField({
      name: "footerLinks",
      title: "Kojinės nuorodos",
      type: "array",
      of: [
        {
          type: "object",
          name: "footerLink",
          fields: linkFields,
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),
    defineField({
      name: "homepage",
      title: "Pagrindinis puslapis",
      type: "object",
      fields: [
        defineField({ name: "calculatorSectionTitle", title: "Skaičiuoklės antraštė", type: "string" }),
        defineField({ name: "calculatorSectionLead", title: "Skaičiuoklės lead", type: "text", rows: 3 }),
        defineField({ name: "pricingOverviewTitle", title: "Kainų apžvalgos antraštė", type: "string" }),
        defineField({
          name: "pricingOverviewCards",
          title: "Kainų apžvalgos kortelės (3)",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "title", title: "Pavadinimas", type: "string" }),
                defineField({ name: "subtitle", title: "Paantraštė", type: "string" }),
                defineField({ name: "fromPrice", title: "Nuo (tekstas)", type: "string" }),
                defineField({ name: "showBadge", title: "Rodyti „Rekomenduojama“", type: "boolean" }),
                defineField({
                  name: "cardFootnote",
                  title: "Kortelės paaiškinimas",
                  type: "string",
                }),
              ],
              preview: { select: { title: "title", subtitle: "fromPrice" } },
            },
          ],
        }),
        defineField({ name: "pricingCtaLabel", title: "Mygtukas „Skaičiuoti…“", type: "string" }),
        defineField({ name: "consultationTitle", title: "Konsultacijos antraštė", type: "string" }),
        defineField({ name: "consultationLead", title: "Konsultacijos tekstas", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "quizPage",
      title: "Testo puslapis (/testas)",
      type: "object",
      fields: [
        defineField({ name: "title", title: "H1", type: "string" }),
        defineField({ name: "lead", title: "Įžanga", type: "text", rows: 4 }),
      ],
    }),
    defineField({
      name: "whatsappPresetMessage",
      title: "WhatsApp numatytasis tekstas (URL encode automatiškai kode)",
      type: "text",
      rows: 2,
    }),
    siteContentQuizEngineField,
    siteContentQuizResultUiField,
  ],
  preview: {
    prepare() {
      return { title: "Svetainės turinys" };
    },
  },
});
