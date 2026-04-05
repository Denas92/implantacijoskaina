import { defineField, defineType } from "sanity";

export default defineType({
  name: "caseStudy",
  title: "Atvejis (prieš / po)",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Pavadinimas", type: "string" }),
    defineField({ name: "beforeImage", title: "Prieš", type: "image" }),
    defineField({ name: "afterImage", title: "Po", type: "image" }),
    defineField({ name: "procedure", title: "Procedūra", type: "string" }),
    defineField({ name: "implantCount", title: "Implantų sk.", type: "number" }),
    defineField({ name: "implantType", title: "Implanto tipas", type: "string" }),
    defineField({ name: "totalPrice", title: "Bendra kaina (€)", type: "number" }),
    defineField({ name: "duration", title: "Trukmė", type: "string" }),
    defineField({ name: "patientAge", title: "Paciento amžius", type: "number" }),
    defineField({ name: "patientGender", title: "Lytis", type: "string" }),
    defineField({ name: "description_lt", title: "Aprašymas", type: "text" }),
    defineField({ name: "isFlapless", title: "Flapless?", type: "boolean" }),
  ],
});
