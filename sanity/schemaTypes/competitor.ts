import { defineField, defineType } from "sanity";

export default defineType({
  name: "competitor",
  title: "Klinika (palyginimas)",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Klinikos pavadinimas",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "standardImplantDisplay",
      title: "Standartinis implantas (tekstas)",
      description: 'Pvz. „549€", „~600€"',
      type: "string",
    }),
    defineField({
      name: "straumannDisplay",
      title: "Straumann (tekstas)",
      type: "string",
    }),
    defineField({
      name: "allOn4Display",
      title: "All-on-4 (tekstas)",
      type: "string",
    }),
    defineField({
      name: "hasFlapless",
      title: "Implantacija be pjūvio?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "notes",
      title: "Pastabos",
      type: "string",
    }),
    defineField({
      name: "isRecommended",
      title: "Rekomenduojama (highlight)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Eilės nr. lentelėje",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "lastUpdated",
      title: "Kainų data (rodymui)",
      type: "date",
    }),
  ],
  preview: {
    select: { title: "name", recommended: "isRecommended" },
    prepare({ title, recommended }) {
      return {
        title,
        subtitle: recommended ? "Rekomenduojama" : undefined,
      };
    },
  },
});
