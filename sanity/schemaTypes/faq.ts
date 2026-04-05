import { defineField, defineType } from "sanity";

export default defineType({
  name: "faq",
  title: "DUK",
  type: "document",
  fields: [
    defineField({
      name: "question_lt",
      title: "Klausimas (LT)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "answer_lt",
      title: "Atsakymas (LT)",
      type: "text",
      rows: 6,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Kategorija",
      type: "string",
      options: {
        list: [
          { title: "Kainos", value: "kainos" },
          { title: "Procedūra", value: "procedura" },
          { title: "Gijimas", value: "gijimas" },
          { title: "Rizikos", value: "rizikos" },
          { title: "Priežiūra", value: "prieziura" },
        ],
        layout: "dropdown",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Eilės nr.",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "question_lt", subtitle: "category" },
  },
  orderings: [
    {
      title: "Eilė",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
