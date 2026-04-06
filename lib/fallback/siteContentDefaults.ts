import type { SiteContentData } from "@/lib/siteContent.types";
import { DEFAULT_QUIZ_ENGINE_COPY } from "@/lib/fallback/quizEngineDefaults";
import { DEFAULT_QUIZ_RESULT_UI } from "@/lib/fallback/quizResultUiDefaults";
import { footerLinks, navLinks } from "@/lib/site";

function linksFromConst(
  arr: readonly { readonly href: string; readonly label: string }[],
): { href: string; label: string }[] {
  return arr.map((x) => ({ href: x.href, label: x.label }));
}

/** Numatytasis turinys — sutampa su ankstesniais komponentais; Sanity gali perrašyti. */
export const DEFAULT_SITE_CONTENT: SiteContentData = {
  hero: {
    eyebrow: "Nepriklausoma kainų informacija",
    title: "Kiek iš tikrųjų kainuoja dantų implantai?",
    lead: "Apskaičiuokite savo implantacijos kainą per 30 sekundžių. Palyginimas, metodai ir nemokama konsultacija.",
    primaryCtaLabel: "Skaičiuoti kainą ↓",
    primaryCtaHref: "#skaiciuokle",
    secondaryCtaLabel: "Nemokama konsultacija",
    secondaryCtaHref: "#konsultacija",
  },
  trustSignals: [
    { value: "15+", label: "metų patirtis" },
    { value: "3000+", label: "implantacijų" },
    { value: "Straumann®", label: "partneris" },
    { value: "Be pjūvio", label: "metodas" },
  ],
  navLinks: linksFromConst(navLinks),
  footerLinks: linksFromConst(footerLinks),
  homepage: {
    calculatorSectionTitle: "Implanto kainos skaičiuoklė",
    calculatorSectionLead:
      "Atsakykite į kelis klausimus — parodysime orientacinę sąmatą su eilutėmis pagal jūsų brief’ą. Tiksli kaina po gydytojo konsultacijos.",
    pricingOverviewTitle: "Kainų apžvalga",
    pricingOverviewCards: [
      {
        title: "Standartinis implantas",
        subtitle: "Nobel / Neodent / Megagen / Osstem",
        fromPrice: "nuo 549€",
        showBadge: false,
        cardFootnote: "implantas + atrama + vainikėlis — detalės skaičiuoklėje",
      },
      {
        title: "Premium Straumann® SLA",
        subtitle: "Šveicarijos kokybė",
        fromPrice: "nuo 699€",
        showBadge: false,
        cardFootnote: "implantas + atrama + vainikėlis — detalės skaičiuoklėje",
      },
      {
        title: "Premium Straumann® SLActive",
        subtitle: "Rekomenduojama",
        fromPrice: "nuo 799€",
        showBadge: true,
        cardFootnote: "implantas + atrama + vainikėlis — detalės skaičiuoklėje",
      },
    ],
    pricingCtaLabel: "Skaičiuoti tikslią kainą",
    consultationTitle: "Nemokama konsultacija — sužinokite savo kainą",
    consultationLead:
      "Palikite kontaktus — atsakysime per vieną darbo valandą. Galite ir tiesiogiai paskambinti arba parašyti WhatsApp.",
  },
  quizPage: {
    title: "Ar man reikia implanto?",
    lead: "Septyni trumpi klausimai — be diagnozių, tik orientacija, ką verta aptarti su implantologu. Pabaigoje pamatysite apytikslę vieno implanto kainą pagal jūsų prioritetus.",
  },
  quizEngine: structuredClone(DEFAULT_QUIZ_ENGINE_COPY),
  quizResultUi: structuredClone(DEFAULT_QUIZ_RESULT_UI),
  whatsappPresetMessage:
    "Sveiki, domina dantų implantacija. Norėčiau sužinoti kainą.",
};
