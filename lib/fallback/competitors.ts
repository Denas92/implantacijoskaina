import type { CompetitorRow } from "../sanity.types";

/** Pagal brief lentelę — atnaujinkite per Sanity CMS */
export const fallbackCompetitors: CompetitorRow[] = [
  {
    _id: "fb-sk",
    name: "Skaitmeninės Šypsenės",
    standardImplantDisplay: "549€",
    straumannDisplay: "nuo 699€",
    allOn4Display: "nuo 2 499€",
    hasFlapless: true,
    notes: "Rekomenduojama",
    isRecommended: true,
    order: 0,
  },
  {
    _id: "fb-rvl",
    name: "RVL klinika",
    standardImplantDisplay: "~600€",
    hasFlapless: false,
    order: 1,
  },
  {
    _id: "fb-videnta",
    name: "Videnta",
    standardImplantDisplay: "~500–700€",
    straumannDisplay: "~800€",
    hasFlapless: false,
    order: 2,
  },
  {
    _id: "fb-papadent",
    name: "PAPADENT",
    standardImplantDisplay: "~550€",
    hasFlapless: false,
    order: 3,
  },
  {
    _id: "fb-eu",
    name: "EU klinika",
    standardImplantDisplay: "~500€",
    allOn4Display: "~3 000€",
    hasFlapless: false,
    order: 4,
  },
  {
    _id: "fb-ort",
    name: "Ortodonta",
    standardImplantDisplay: "~550€",
    hasFlapless: false,
    order: 5,
  },
];
