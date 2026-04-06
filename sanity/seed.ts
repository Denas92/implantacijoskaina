/**
 * Užpildo dataset pradiniais dokumentais (tie patys kaip lib/fallback + pavyzdžiai).
 *
 * Rekomenduojama (veikia net jei CLI paskyra nėra „Project member“):
 *   1. sanity.io/manage → API → Tokens → sukurkite token su Editor (rašymas)
 *   2. .env.local: SANITY_API_WRITE_TOKEN=sk...
 *   3. npm run sanity:seed
 *
 * Alternatyva (tik jei esate pakviesti į tą patį projektą kaip sanity.config):
 *   npx sanity login && npm run sanity:seed:login
 *
 * Pakartotinai saugu: createIfNotExists (esami _id neperrašomi).
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@sanity/client";
import { getCliClient } from "sanity/cli";
import { DEFAULT_CALCULATOR_ENGINE } from "../lib/fallback/calculatorEngine";
import { fallbackCompetitors } from "../lib/fallback/competitors";
import { fallbackFaqs } from "../lib/fallback/faq";
import { DEFAULT_ALL_ON_PAGE } from "../lib/fallback/allOnPageDefaults";
import { DEFAULT_SITE_CONTENT } from "../lib/fallback/siteContentDefaults";

const DEFAULT_PROJECT_ID = "9dzpnf19";

/** sanity exec neįkrauna .env.local kaip Next — skaitome patys. */
function loadEnvFiles() {
  const root = process.env.SANITY_BASE_PATH || process.cwd();
  for (const name of [".env.local", ".env"]) {
    const p = join(root, name);
    if (!existsSync(p)) continue;
    const text = readFileSync(p, "utf8");
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq <= 0) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (process.env[key] === undefined) {
        process.env[key] = val;
      }
    }
  }
}

function getSeedClient() {
  loadEnvFiles();
  const writeToken = process.env.SANITY_API_WRITE_TOKEN?.trim();
  const projectId =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || DEFAULT_PROJECT_ID;
  const dataset =
    process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";

  if (writeToken) {
    return createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      token: writeToken,
      useCdn: false,
    });
  }

  return getCliClient({ apiVersion: "2024-01-01" });
}

function singletonDocuments() {
  const e = DEFAULT_CALCULATOR_ENGINE;
  const c = e.copy;
  const calculatorDoc = {
    _id: "singleton-calculator-config",
    _type: "calculatorConfig" as const,
    implantPrices: { ...e.prices.implant },
    abutmentPrices: { ...e.prices.abutment },
    crownPrices: { ...e.prices.crown },
    additionalCosts: { ...e.prices.additional },
    allOnXPrices: { ...e.prices.allOnX },
    copy: {
      implantLabelStandard: c.implantLabels.standard,
      implantLabelSla: c.implantLabels.straumann_sla,
      implantLabelSlactive: c.implantLabels.straumann_slactive,
      abutmentDetailStandard: c.abutmentDetailStandard,
      abutmentDetailStraumann: c.abutmentDetailStraumann,
      crownPosteriorLabel: c.crownPosteriorLabel,
      crownAnteriorLabel: c.crownAnteriorLabel,
      crownMixedLabel: c.crownMixedLabel,
      lineSurgicalGuide3d: c.lineSurgicalGuide3d,
      lineSterileKit: c.lineSterileKit,
      lineAbutmentsGeneric: c.lineAbutmentsGeneric,
      partialHeadline: c.partialHeadline,
      allOnConsultation: c.allOnConsultation,
      allOnSurgicalGuideEdentulous: c.allOnSurgicalGuideEdentulous,
      allOnSterile: c.allOnSterile,
      allOnTemporary: c.allOnTemporary,
      allOnFinalPrefix: c.allOnFinalPrefix,
      allOnBrandStraumann: c.allOnBrandStraumann,
      allOnBrandStandard: c.allOnBrandStandard,
      allOnHeadlineSingle: c.allOnHeadlineSingle,
      allOnHeadlineDouble: c.allOnHeadlineDouble,
    },
    tierCards: e.tierCards.map((card) => ({
      _key: card.id,
      tier: card.id,
      title: card.title,
      subtitle: card.subtitle,
      recommended: card.recommended === true,
    })),
    finalOptionsList: Object.entries(e.finalOptions).map(([key, v]) => ({
      _key: key,
      key,
      title: v.title,
      description: v.description,
    })),
  };

  const s = DEFAULT_SITE_CONTENT;
  const siteDoc = {
    _id: "siteContent",
    _type: "siteContent" as const,
    hero: { ...s.hero },
    trustSignals: s.trustSignals.map((t, i) => ({
      _key: `trust${i}`,
      value: t.value,
      label: t.label,
    })),
    navLinks: s.navLinks.map((l, i) => ({
      _key: `nav${i}`,
      href: l.href,
      label: l.label,
    })),
    footerLinks: s.footerLinks.map((l, i) => ({
      _key: `foot${i}`,
      href: l.href,
      label: l.label,
    })),
    homepage: {
      calculatorSectionTitle: s.homepage.calculatorSectionTitle,
      calculatorSectionLead: s.homepage.calculatorSectionLead,
      pricingOverviewTitle: s.homepage.pricingOverviewTitle,
      pricingOverviewCards: s.homepage.pricingOverviewCards.map((card, i) => ({
        _key: `pcard${i}`,
        title: card.title,
        subtitle: card.subtitle,
        fromPrice: card.fromPrice,
        showBadge: card.showBadge === true,
        cardFootnote: card.cardFootnote,
      })),
      pricingCtaLabel: s.homepage.pricingCtaLabel,
      consultationTitle: s.homepage.consultationTitle,
      consultationLead: s.homepage.consultationLead,
    },
    quizPage: { ...s.quizPage },
    quizEngine: {
      tierByQ4: {
        aesthetics: { ...s.quizEngine.tierByQ4.aesthetics },
        function: { ...s.quizEngine.tierByQ4.function },
        longevity: { ...s.quizEngine.tierByQ4.longevity },
        price: { ...s.quizEngine.tierByQ4.price },
      },
      positionByQ4: { ...s.quizEngine.positionByQ4 },
      ageByQ6: { ...s.quizEngine.ageByQ6 },
      priorityLineByQ4: { ...s.quizEngine.priorityLineByQ4 },
      headlines: { ...s.quizEngine.headlines },
      leads: { ...s.quizEngine.leads },
      orientedNote: s.quizEngine.orientedNote,
    },
    quizResultUi: { ...s.quizResultUi },
    whatsappPresetMessage: s.whatsappPresetMessage,
  };

  const ao = DEFAULT_ALL_ON_PAGE;
  const allOnPageDoc = {
    _id: "allOnPage",
    _type: "allOnPage" as const,
    seo: { ...ao.seo },
    hero: { ...ao.hero },
    whatIs: { ...ao.whatIs },
    compare4vs6: { ...ao.compare4vs6 },
    journey: {
      title: ao.journey.title,
      steps: ao.journey.steps.map((step, i) => ({
        _key: `jstep${i}`,
        title: step.title,
        body: step.body,
      })),
    },
    immediateLoading: { ...ao.immediateLoading },
    provisionalToFinal: { ...ao.provisionalToFinal },
    tiltedImplants: { ...ao.tiltedImplants },
    pterygoid: { ...ao.pterygoid },
    zygomatic: { ...ao.zygomatic },
    contraindications: { ...ao.contraindications },
    faqSectionTitle: ao.faqSectionTitle,
    faqs: ao.faqs.map((f, i) => ({
      _key: `aofaq${i}`,
      question: f.question,
      answer: f.answer,
    })),
    ctas: { ...ao.ctas },
  };

  return [calculatorDoc, siteDoc, allOnPageDoc];
}

function faqDocuments() {
  return fallbackFaqs.map((f) => ({
    _id: f._id,
    _type: "faq" as const,
    question_lt: f.question_lt,
    answer_lt: f.answer_lt,
    category: f.category,
    order: f.order ?? 0,
  }));
}

function competitorDocuments() {
  return fallbackCompetitors.map((c) => ({
    _id: c._id,
    _type: "competitor" as const,
    name: c.name,
    ...(c.standardImplantDisplay != null
      ? { standardImplantDisplay: c.standardImplantDisplay }
      : {}),
    ...(c.straumannDisplay != null ? { straumannDisplay: c.straumannDisplay } : {}),
    ...(c.allOn4Display != null ? { allOn4Display: c.allOn4Display } : {}),
    hasFlapless: c.hasFlapless ?? false,
    ...(c.notes != null ? { notes: c.notes } : {}),
    isRecommended: c.isRecommended ?? false,
    order: c.order ?? 0,
  }));
}

function extraDocuments() {
  const block = (key: string, text: string) => ({
    _key: key,
    _type: "block" as const,
    style: "normal" as const,
    markDefs: [] as const,
    children: [
      {
        _key: `${key}-0`,
        _type: "span" as const,
        text,
        marks: [] as const,
      },
    ],
  });

  return [
    {
      _id: "seed-price-implant-standard",
      _type: "pricing" as const,
      category: "implant",
      name_lt: "Standartinis implantas (orientacija)",
      price: 549,
      brand: "Nobel / Neodent / Megagen / Osstem",
      isRecommended: false,
      notes: "Pavyzdinė eilutė iš seed — redaguokite Studijoje.",
    },
    {
      _id: "seed-price-straumann-slactive",
      _type: "pricing" as const,
      category: "implant",
      name_lt: "Straumann® SLActive",
      price: 799,
      brand: "Straumann",
      isRecommended: true,
      notes: "Rekomenduojama linija — seed pavyzdys.",
    },
    {
      _id: "seed-price-allon4",
      _type: "pricing" as const,
      category: "allOnX",
      name_lt: "All-on-4 (vienas žandikaulis, orientacija)",
      price: 2499,
      isRecommended: false,
      notes: "Seed pavyzdys — tiksliai pagal pacientą po diagnostikos.",
    },
    {
      _id: "seed-page-pavyzdys",
      _type: "page" as const,
      title_lt: "Pavyzdinis puslapis (iš seed)",
      slug: { _type: "slug" as const, current: "pavyzdinis-puslapis" },
      body: [
        block(
          "b1",
          "Šį dokumentą sukūrė npm run sanity:seed. Galite redaguoti turinį arba ištrinti dokumentą.",
        ),
      ],
    },
    {
      _id: "seed-testimonial-1",
      _type: "testimonial" as const,
      name: "Rasa",
      age: 52,
      procedure: "1 implantas",
      rating: 5,
      text_lt:
        "Pavyzdinis atsiliepimas iš seed skripto — pakeiskite tikru paciento tekstu ir nuotrauka Studijoje.",
    },
    {
      _id: "seed-testimonial-2",
      _type: "testimonial" as const,
      name: "Tomas",
      age: 61,
      procedure: "All-on-4",
      rating: 5,
      text_lt: "Antras pavyzdinis atsiliepimas; nuotrauką galite pridėti lauke „Nuotrauka“.",
    },
    {
      _id: "seed-doctor-1",
      _type: "doctor" as const,
      name: "Dr. Pavardė (pavyzdys)",
      title_lt: "Burnos chirurgas, implantologas",
      bio_lt: "Pavyzdinė biografija iš seed — pakeiskite tikra informacija ir nuotrauka.",
      quote_lt: "„3D planavimas ir aiškus kainų paaiškinimas pacientui — standartas.“",
      experience_years: 12,
      implant_count: 800,
      qualifications: ["Implantologija", "3D chirurginis planavimas"],
    },
    {
      _id: "seed-casestudy-1",
      _type: "caseStudy" as const,
      title: "Viso žandikaulio atstatymas (pavyzdys)",
      procedure: "All-on-4",
      implantCount: 4,
      implantType: "Straumann SLActive",
      totalPrice: 12000,
      duration: "1 chirurgijos diena + gijimas",
      patientAge: 58,
      patientGender: "M",
      description_lt:
        "Pavyzdinis atvejis be nuotraukų — įkelkite „Prieš“ / „Po“ images Studijoje.",
      isFlapless: true,
    },
  ];
}

async function main() {
  const client = getSeedClient();
  const docs = [
    ...singletonDocuments(),
    ...faqDocuments(),
    ...competitorDocuments(),
    ...extraDocuments(),
  ];

  for (const doc of docs) {
    // Skirtingi _type — transakcijos grandinė siaurina tipą; API priima bet kurį dokumentą su _id.
    await client.createIfNotExists(
      doc as Parameters<typeof client.createIfNotExists>[0],
    );
  }

  // eslint-disable-next-line no-console
  console.log(
    `Sanity seed: įrašyta / praleista (jau egzistuoja) ${docs.length} dokumentų. Atnaujinkite Studio (localhost:3333).`,
  );
}

main().catch((err: unknown) => {
  const desc =
    err &&
    typeof err === "object" &&
    "details" in err &&
    err.details &&
    typeof err.details === "object" &&
    "description" in err.details
      ? String((err.details as { description?: string }).description)
      : err instanceof Error
        ? err.message
        : String(err);

  const lower = desc.toLowerCase();
  if (lower.includes("project user not found") || lower.includes("unauthorized")) {
    // eslint-disable-next-line no-console
    console.error(`
Sanity seed nepavyko dėl prieigos (401 / project user not found).

Dažniausia priežastis: \`sanity login\` paskyra nėra įtraukta į projektą (pvz. ${DEFAULT_PROJECT_ID}).

Sprendimas 1 — API token (paprasta):
  • https://www.sanity.io/manage → pasirinkite projektą → API → Tokens
  • Sukurkite token su teise „Editor“ (arba „Write“)
  • Į .env.local įrašykite:
      SANITY_API_WRITE_TOKEN=sk…
  • Paleiskite: npm run sanity:seed

Sprendimas 2 — pakviesti save į projektą:
  • tame pačiame manage → Project members → Invite
  • Tada: npx sanity login && npm run sanity:seed:login
`);
  }

  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
