import { defineField, defineType } from "sanity";

/** Minimalus puslapio dokumentas — vėlesniam turinio valdymui */
export default defineType({
  name: "page",
  title: "Puslapis",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title_lt", maxLength: 96 },
    }),
    defineField({ name: "title_lt", title: "Antraštė", type: "string" }),
    defineField({ name: "body", title: "Turinys", type: "array", of: [{ type: "block" }] }),
  ],
});
