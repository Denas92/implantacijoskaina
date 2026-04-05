import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Atsiliepimas",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Vardas", type: "string" }),
    defineField({ name: "age", title: "Amžius", type: "number" }),
    defineField({ name: "procedure", title: "Procedūra", type: "string" }),
    defineField({
      name: "rating",
      title: "Įvertinimas (1–5)",
      type: "number",
      validation: (r) => r.min(1).max(5),
    }),
    defineField({ name: "text_lt", title: "Tekstas (LT)", type: "text", rows: 5 }),
    defineField({ name: "photo", title: "Nuotrauka", type: "image", options: { hotspot: true } }),
  ],
});
