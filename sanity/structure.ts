import type { StructureResolver } from "sanity/structure";

/**
 * Aiški „desk“ struktūra LT — sąrašai tušti, kol nesukuriate įrašų (viršuje „+ Create“).
 * Tai ne klaida: dokumentai gyvena Sanity debesyje, ne repozitorijoje.
 */
export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("implantacijoskaina.lt")
    .items([
      S.listItem()
        .title("Svetainė ir skaičiuoklė")
        .id("grp-site-calc")
        .child(
          S.list()
            .title("Svetainė ir skaičiuoklė")
            .items([
              S.listItem()
                .title("Svetainės turinys (nav, hero…)")
                .child(
                  S.document()
                    .schemaType("siteContent")
                    .documentId("siteContent")
                    .title("Svetainės turinys"),
                ),
              S.listItem()
                .title("Skaičiuoklės kainos ir tekstai")
                .child(
                  S.document()
                    .schemaType("calculatorConfig")
                    .documentId("singleton-calculator-config")
                    .title("Skaičiuoklė"),
                ),
              S.listItem()
                .title("All-on-4 / All-on-6 puslapis")
                .child(
                  S.document()
                    .schemaType("allOnPage")
                    .documentId("allOnPage")
                    .title("All-on edukacija"),
                ),
            ]),
        ),
      S.listItem()
        .title("Kainos ir konkurentų lentelė")
        .id("grp-pricing")
        .child(
          S.list()
            .title("Kainos ir lentelė")
            .items([
              S.listItem()
                .title("Kainų eilutės")
                .child(S.documentTypeList("pricing").title("Kainų eilutės")),
              S.listItem()
                .title("Klinikos (palyginimas)")
                .child(S.documentTypeList("competitor").title("Klinikos")),
            ]),
        ),
      S.listItem()
        .title("DUK ir puslapiai")
        .id("grp-content")
        .child(
          S.list()
            .title("DUK ir puslapiai")
            .items([
              S.listItem()
                .title("DUK")
                .child(S.documentTypeList("faq").title("DUK")),
              S.listItem()
                .title("Laisvi puslapiai")
                .child(S.documentTypeList("page").title("Puslapiai")),
            ]),
        ),
      S.listItem()
        .title("Socialinis įrodymas")
        .id("grp-trust")
        .child(
          S.list()
            .title("Socialinis įrodymas")
            .items([
              S.listItem()
                .title("Atsiliepimai")
                .child(S.documentTypeList("testimonial").title("Atsiliepimai")),
              S.listItem()
                .title("Atvejai")
                .child(S.documentTypeList("caseStudy").title("Atvejai")),
              S.listItem()
                .title("Gydytojai")
                .child(S.documentTypeList("doctor").title("Gydytojai")),
            ]),
        ),
    ]);
