import type { ImplantTier, ToothPosition } from "@/lib/calculator/engineTypes";

/** Testo logikos tekstai (įterpiami į buildQuizResult). */
export type QuizEngineCopy = {
  tierByQ4: {
    aesthetics: { tier: ImplantTier; explanation: string };
    function: { tier: ImplantTier; explanation: string };
    longevity: { tier: ImplantTier; explanation: string };
    price: { tier: ImplantTier; explanation: string };
  };
  positionByQ4: {
    aesthetics: ToothPosition;
    function: ToothPosition;
    longevity: ToothPosition;
    price: ToothPosition;
  };
  ageByQ6: {
    y18_35: string;
    y36_55: string;
    y56_70: string;
    y70plus: string;
  };
  priorityLineByQ4: {
    aesthetics: string;
    function: string;
    longevity: string;
    price: string;
  };
  headlines: {
    q1_many_missing: string;
    q1_loose: string;
    q1_one_few_high: string;
    q1_one_few: string;
    score30: string;
    default: string;
  };
  leads: { high: string; mid: string; low: string };
  orientedNote: string;
};

/** Testo rezultato ekrano etiketės. */
export type QuizResultUiCopy = {
  errorMessage: string;
  errorRetry: string;
  allGoodKicker: string;
  allGoodTitle: string;
  allGoodLead: string;
  allGoodHome: string;
  allGoodRetry: string;
  consultKicker: string;
  labelPriority: string;
  labelAge: string;
  labelTier: string;
  flaplessTitle: string;
  flaplessBody: string;
  flaplessLink: string;
  chronicTitle: string;
  chronicBody: string;
  orientedPriceLabel: string;
  ctaConsult: string;
  ctaCalculator: string;
  ctaRetry: string;
};
