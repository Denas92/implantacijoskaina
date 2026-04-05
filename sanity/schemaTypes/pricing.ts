import { defineField, defineType } from "sanity";

export default defineType({
  name: "pricing",
  title: "Kaina (eilutė)",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "Kategorija",
      type: "string",
      options: {
        list: [
          { title: "Implantas", value: "implant" },
          { title: "Vainikėlis", value: "crown" },
          { title: "Atrama", value: "abutment" },
          { title: "All-on-X", value: "allOnX" },
          { title: "Chirurgija", value: "surgery" },
          { title: "Kita", value: "other" },
        ],
      },
    }),
    defineField({ name: "name_lt", title: "Pavadinimas (LT)", type: "string" }),
    defineField({ name: "price", title: "Kaina (€)", type: "number" }),
    defineField({ name: "priceMax", title: "Kaina max (€)", type: "number" }),
    defineField({ name: "brand", title: "Gamintojas", type: "string" }),
    defineField({ name: "isRecommended", title: "Rekomenduojama?", type: "boolean" }),
    defineField({ name: "notes", title: "Pastabos", type: "text" }),
  ],
});
