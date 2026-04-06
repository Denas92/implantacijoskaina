import {
  type ImplantTier,
  type ToothPosition,
  calculatePartialEstimate,
  formatMoney,
} from "@/components/calculator/calculatorLogic";
import type { CalculatorEngineConfig } from "@/lib/calculator/engineTypes";
import { DEFAULT_CALCULATOR_ENGINE } from "@/lib/fallback/calculatorEngine";
import { DEFAULT_QUIZ_ENGINE_COPY } from "@/lib/fallback/quizEngineDefaults";
import type { QuizEngineCopy } from "@/lib/quiz/quizContentTypes";

export type QuizQ1 = "one_few" | "many_missing" | "loose" | "none";
export type QuizQ2 = "lt_month" | "m1_6" | "gt6m" | "gt_year";
export type QuizQ3 = "denture_bad" | "denture_ok" | "no_denture";
export type QuizQ4 = "aesthetics" | "function" | "longevity" | "price";
export type QuizQ5 = "very_afraid" | "somewhat" | "not_afraid";
export type QuizQ6 = "y18_35" | "y36_55" | "y56_70" | "y70plus";
export type QuizQ7 = "no_chronic" | "chronic";

export type QuizAnswers = {
  q1?: QuizQ1;
  q2?: QuizQ2;
  q3?: QuizQ3;
  q4?: QuizQ4;
  q5?: QuizQ5;
  q6?: QuizQ6;
  q7?: QuizQ7;
};

export type QuizResultAllGood = {
  variant: "all_good";
};

export type QuizResultConsult = {
  variant: "consult";
  score: number;
  headline: string;
  lead: string;
  ageInsight: string;
  priorityLine: string;
  showFlapless: boolean;
  showChronicDisclaimer: boolean;
  recommendedTier: ImplantTier;
  tierExplanation: string;
  orientedTotal: string;
  orientedNote: string;
};

export type QuizComputedResult = QuizResultAllGood | QuizResultConsult;

const Q1_SCORE: Record<Exclude<QuizQ1, "none">, number> = {
  one_few: 10,
  many_missing: 15,
  loose: 8,
};

const Q2_SCORE: Record<QuizQ2, number> = {
  lt_month: 5,
  m1_6: 8,
  gt6m: 10,
  gt_year: 12,
};

const Q3_SCORE: Record<QuizQ3, number> = {
  denture_bad: 10,
  denture_ok: 3,
  no_denture: 0,
};

function headlineFromAnswers(
  a: QuizAnswers,
  score: number,
  headlines: QuizEngineCopy["headlines"],
): string {
  if (a.q1 === "many_missing") return headlines.q1_many_missing;
  if (a.q1 === "loose") return headlines.q1_loose;
  if (a.q1 === "one_few" && score >= 28) return headlines.q1_one_few_high;
  if (a.q1 === "one_few") return headlines.q1_one_few;
  if (score >= 30) return headlines.score30;
  return headlines.default;
}

function leadFromScore(score: number, leads: QuizEngineCopy["leads"]): string {
  if (score >= 32) return leads.high;
  if (score >= 22) return leads.mid;
  return leads.low;
}

export function computeQuizScore(a: QuizAnswers): number {
  let s = 0;
  if (a.q1 && a.q1 !== "none") s += Q1_SCORE[a.q1];
  if (a.q2) s += Q2_SCORE[a.q2];
  if (a.q3) s += Q3_SCORE[a.q3];
  return s;
}

export function isQuizComplete(answers: QuizAnswers): answers is Required<QuizAnswers> {
  if (!answers.q1 || answers.q1 === "none") return false;
  return Boolean(
    answers.q2 && answers.q3 && answers.q4 && answers.q5 && answers.q6 && answers.q7,
  );
}

export function buildQuizResult(
  answers: QuizAnswers,
  calculatorEngine: CalculatorEngineConfig = DEFAULT_CALCULATOR_ENGINE,
  engineCopy: QuizEngineCopy = DEFAULT_QUIZ_ENGINE_COPY,
): QuizComputedResult {
  if (answers.q1 === "none") {
    return { variant: "all_good" };
  }

  if (!isQuizComplete(answers)) {
    throw new Error("buildQuizResult: neužbaigti atsakymai");
  }

  const a = answers;
  const score = computeQuizScore(a);
  const { tier, explanation } = engineCopy.tierByQ4[a.q4];
  const position: ToothPosition = engineCopy.positionByQ4[a.q4];
  const showFlapless = a.q5 === "very_afraid" || a.q5 === "somewhat";
  const showChronicDisclaimer = a.q7 === "chronic";

  const est = calculatePartialEstimate(
    {
      toothCount: 1,
      toothPosition: position,
      implantTier: tier,
      singleJaw: true,
    },
    calculatorEngine,
  );

  return {
    variant: "consult",
    score,
    headline: headlineFromAnswers(a, score, engineCopy.headlines),
    lead: leadFromScore(score, engineCopy.leads),
    ageInsight: engineCopy.ageByQ6[a.q6],
    priorityLine: engineCopy.priorityLineByQ4[a.q4],
    showFlapless,
    showChronicDisclaimer,
    recommendedTier: tier,
    tierExplanation: explanation,
    orientedTotal: formatMoney(est.total),
    orientedNote: engineCopy.orientedNote,
  };
}

/** GTM `quiz_complete.recommendation` (brief pavyzdys: premium_flapless) */
export function getQuizAnalyticsRecommendation(
  answers: QuizAnswers,
  calculatorEngine: CalculatorEngineConfig = DEFAULT_CALCULATOR_ENGINE,
  engineCopy: QuizEngineCopy = DEFAULT_QUIZ_ENGINE_COPY,
): string {
  try {
    const r = buildQuizResult(answers, calculatorEngine, engineCopy);
    if (r.variant === "all_good") return "no_implant_needed";
    const parts: string[] = [r.recommendedTier];
    if (r.showFlapless) parts.push("flapless");
    if (r.showChronicDisclaimer) parts.push("chronic");
    return parts.join("_");
  } catch {
    return "incomplete";
  }
}
