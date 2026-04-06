import { defineField, defineType } from "sanity";

const textRow = (rows: number) => ({ rows } as const);

export default defineType({
  name: "allOnPage",
  title: "All-on-4 / All-on-6 edukacinis puslapis",
  type: "document",
  fields: [
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "title", title: "Puslapio title (meta)", type: "string" }),
        defineField({ name: "description", title: "Meta description", type: "text", ...textRow(3) }),
        defineField({ name: "ogTitle", title: "Open Graph title", type: "string" }),
        defineField({ name: "ogDescription", title: "Open Graph description", type: "text", ...textRow(3) }),
      ],
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "kicker", title: "Viršutinė eilutė (kicker)", type: "string" }),
        defineField({ name: "title", title: "H1 antraštė", type: "string" }),
        defineField({ name: "lead", title: "Lead tekstas", type: "text", ...textRow(5) }),
        defineField({
          name: "disclaimer",
          title: "Trumpa atsakomybė (edukacija, ne diagnozė)",
          type: "text",
          ...textRow(3),
        }),
      ],
    }),
    defineField({
      name: "whatIs",
      title: "Kas yra All-on-X",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "title", title: "Antraštė", type: "string" }),
        defineField({ name: "body", title: "Tekstas", type: "text", ...textRow(12) }),
      ],
    }),
    defineField({
      name: "compare4vs6",
      title: "All-on-4 vs All-on-6",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "title", title: "Antraštė", type: "string" }),
        defineField({ name: "intro", title: "Įžanga", type: "text", ...textRow(4) }),
        defineField({ name: "fourTitle", title: "4 implantų stulpelio antraštė", type: "string" }),
        defineField({ name: "fourBody", title: "4 implantų tekstas", type: "text", ...textRow(8) }),
        defineField({ name: "sixTitle", title: "6 implantų stulpelio antraštė", type: "string" }),
        defineField({ name: "sixBody", title: "6 implantų tekstas", type: "text", ...textRow(8) }),
      ],
    }),
    defineField({
      name: "journey",
      title: "Kelionė: nuo konsultacijos iki galutinio protezo",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "title", title: "Antraštė", type: "string" }),
        defineField({
          name: "steps",
          title: "Žingsniai (tvarka)",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "title", title: "Žingsnio pavadinimas", type: "string" }),
                defineField({ name: "body", title: "Aprašymas", type: "text", ...textRow(5) }),
              ],
              preview: { select: { title: "title", subtitle: "body" } },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "immediateLoading",
      title: "Immediate loading / immediate function",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "title", title: "Antraštė", type: "string" }),
        defineField({
          name: "labels",
          title: "Poskyrių antraštės",
          type: "object",
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({ name: "terms", title: "„Terminai“", type: "string" }),
            defineField({ name: "whenOften", title: "„Kam dažniau tinka“", type: "string" }),
            defineField({ name: "whenNot", title: "„Kada neįmanoma / nepatartina“", type: "string" }),
            defineField({ name: "risks", title: "„Rizikos“", type: "string" }),
          ],
        }),
        defineField({ name: "terms", title: "Ką reiškia terminai (LT)", type: "text", ...textRow(6) }),
        defineField({ name: "whenOften", title: "Kam dažniau tinka", type: "text", ...textRow(8) }),
        defineField({ name: "whenNot", title: "Kada gali būti neįmanoma ar nepatartina", type: "text", ...textRow(8) }),
        defineField({ name: "risks", title: "Rizikos ir kompromisai", type: "text", ...textRow(6) }),
      ],
    }),
    defineField({
      name: "provisionalToFinal",
      title: "Nuo laikino iki nuolatinio protezo",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "title", title: "Antraštė", type: "string" }),
        defineField({
          name: "labels",
          title: "Poskyrių antraštės",
          type: "object",
          fields: [
            defineField({ name: "whyTwoSteps", title: "„Kodėl du etapai“", type: "string" }),
            defineField({ name: "typicalTimeline", title: "„Tipinis laikas“", type: "string" }),
            defineField({ name: "materialsNote", title: "„Medžiagos“", type: "string" }),
          ],
        }),
        defineField({ name: "whyTwoSteps", title: "Kodėl du etapai", type: "text", ...textRow(8) }),
        defineField({ name: "typicalTimeline", title: "Tipinis laiko tarpas (orientacija)", type: "text", ...textRow(5) }),
        defineField({ name: "materialsNote", title: "Medžiagos ir galutinio protezo tipai", type: "text", ...textRow(6) }),
      ],
    }),
    defineField({
      name: "tiltedImplants",
      title: "Pasvirti (tilted) implantai",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "title", title: "Antraštė", type: "string" }),
        defineField({ name: "body", title: "Tekstas", type: "text", ...textRow(10) }),
      ],
    }),
    defineField({
      name: "pterygoid",
      title: "Pterygoid implantai",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "title", title: "Antraštė", type: "string" }),
        defineField({
          name: "labels",
          title: "Poskyrių antraštės",
          type: "object",
          fields: [
            defineField({ name: "whatIs", title: "„Kas tai“", type: "string" }),
            defineField({ name: "whenConsidered", title: "„Kada svarstoma“", type: "string" }),
            defineField({ name: "whenNot", title: "„Kada netinka“", type: "string" }),
          ],
        }),
        defineField({ name: "whatIs", title: "Kas tai", type: "text", ...textRow(6) }),
        defineField({ name: "whenConsidered", title: "Kada svarstoma", type: "text", ...textRow(6) }),
        defineField({ name: "whenNot", title: "Kada gali netikti / alternatyvos", type: "text", ...textRow(6) }),
      ],
    }),
    defineField({
      name: "zygomatic",
      title: "Zygominiai ir kiti ilgieji implantai",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "title", title: "Antraštė", type: "string" }),
        defineField({
          name: "labels",
          title: "Poskyrių antraštės",
          type: "object",
          fields: [
            defineField({ name: "whatIs", title: "„Kas yra zygominiai“", type: "string" }),
            defineField({ name: "whenConsidered", title: "„Kada svarstoma“", type: "string" }),
            defineField({ name: "otherApproaches", title: "„Kitos kryptys“", type: "string" }),
          ],
        }),
        defineField({ name: "whatIs", title: "Kas yra zygominiai", type: "text", ...textRow(8) }),
        defineField({ name: "whenConsidered", title: "Kada svarstoma", type: "text", ...textRow(6) }),
        defineField({
          name: "otherApproaches",
          title: "Kitos kryptys / individualūs sprendimai",
          type: "text",
          ...textRow(6),
        }),
      ],
    }),
    defineField({
      name: "contraindications",
      title: "Kontraindikacijos ir alternatyvos",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "title", title: "Antraštė", type: "string" }),
        defineField({ name: "body", title: "Tekstas", type: "text", ...textRow(12) }),
      ],
    }),
    defineField({
      name: "faqSectionTitle",
      title: "DUK bloko antraštė",
      type: "string",
    }),
    defineField({
      name: "faqs",
      title: "DUK (šio puslapio)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "Klausimas", type: "string" }),
            defineField({ name: "answer", title: "Atsakymas", type: "text", ...textRow(8) }),
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        },
      ],
    }),
    defineField({
      name: "ctas",
      title: "Mygtukai (CTA)",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "sectionTitle", title: "Antraštė virš mygtukų", type: "string" }),
        defineField({
          name: "sectionAriaLabel",
          title: "Prieinamumo etiketė (aria-label)",
          type: "string",
          description: "Trumpas aprašas ekrano skaitytuvams, pvz. „Veiksmai“",
        }),
        defineField({ name: "primaryLabel", title: "Pirmas — tekstas", type: "string" }),
        defineField({ name: "primaryHref", title: "Pirmas — nuoroda", type: "string" }),
        defineField({ name: "secondaryLabel", title: "Antras — tekstas", type: "string" }),
        defineField({ name: "secondaryHref", title: "Antras — nuoroda", type: "string" }),
        defineField({ name: "tertiaryLabel", title: "Trečias — tekstas", type: "string" }),
        defineField({ name: "tertiaryHref", title: "Trečias — nuoroda", type: "string" }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "All-on-4 / All-on-6 puslapis" };
    },
  },
});
