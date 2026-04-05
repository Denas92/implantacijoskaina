import { defineField, defineType } from "sanity";

export default defineType({
  name: "doctor",
  title: "Gydytojas",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Vardas", type: "string" }),
    defineField({ name: "title_lt", title: "Pareigos", type: "string" }),
    defineField({ name: "bio_lt", title: "Biografija", type: "text" }),
    defineField({ name: "quote_lt", title: "Citata", type: "text" }),
    defineField({ name: "photo", title: "Nuotrauka", type: "image" }),
    defineField({ name: "experience_years", title: "Patirtis (m.)", type: "number" }),
    defineField({ name: "implant_count", title: "Implantacijų sk.", type: "number" }),
    defineField({
      name: "qualifications",
      title: "Kvalifikacijos",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
