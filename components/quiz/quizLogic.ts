import {
  type ImplantTier,
  type ToothPosition,
  calculatePartialEstimate,
  formatMoney,
} from "@/components/calculator/calculatorLogic";

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

function tierFromQ4(q4: QuizQ4): { tier: ImplantTier; explanation: string } {
  switch (q4) {
    case "aesthetics":
      return {
        tier: "straumann_slactive",
        explanation:
          "Jums svarbi estetika — dažnai renkamasi SLActive paviršių ir kokybišką vainikėlio darbą.",
      };
    case "function":
      return {
        tier: "standard",
        explanation:
          "Jums svarbi kramtymo funkcija — patikimas standartinis implantas su geru planavimu dažnai yra optimalus pasirinkimas.",
      };
    case "longevity":
      return {
        tier: "straumann_slactive",
        explanation:
          "Ilgaamžiškumui rekomenduojame premium liniją su plačiai dokumentuota klinikine istorija.",
      };
    case "price":
      return {
        tier: "standard",
        explanation:
          "Jei pirmiausia svarbi kaina, standartiniai implantai suteikia gerą santykį kainos ir kokybės — vis tiek su individualiu planu.",
      };
  }
}

function positionFromQ4(q4: QuizQ4): ToothPosition {
  if (q4 === "aesthetics") return "anterior";
  if (q4 === "function" || q4 === "price") return "posterior";
  return "mixed";
}

const AGE_COPY: Record<QuizQ6, string> = {
  y18_35: "Jūsų amžiuje implantas dažnai yra investicija į dešimtmečius be papildomų kompromisų.",
  y36_55: "Šiame etape implantacija paprastai yra labai tinkamas laikas — kaulas ir bendra sveikata dažnai dar būna palankūs.",
  y56_70: "Amžius pats savaime retai yra kliūtis — svarbesnis individualus sveikatos ir burnos būklės vertinimas.",
  y70plus:
    "Vyresniame amžiuje sprendimas visada individualus: svarbios lėtinės ligos, vaistai ir kaulo būklė — būtina gydytojo konsultacija.",
};

function headlineFromAnswers(a: QuizAnswers, score: number): string {
  if (a.q1 === "many_missing") {
    return "Verta kalbėti apie viso žandikaulio ar didelės dalies dantų atkūrimą";
  }
  if (a.q1 === "loose") {
    return "Dantų judėjimas reikalauja dėmesio — implantas gali būti viena iš priemonių";
  }
  if (a.q1 === "one_few" && score >= 28) {
    return "Tikėtina, kad implantas yra logiškas sprendimas — verta planuoti konsultaciją";
  }
  if (a.q1 === "one_few") {
    return "Vieno ar kelių dantų atkūrimas implantu dažnai būna tinkamas kelias";
  }
  if (score >= 30) {
    return "Jūsų atsakymai rodo, kad verta profesionalios implantologo konsultacijos";
  }
  return "Rekomenduojame individualų vertinimą su gydytoju";
}

function leadFromScore(score: number): string {
  if (score >= 32) {
    return "Trumpas testas negali pakeisti diagnostikos, bet jūsų situacijos požymiai dažnai sutampa su atvejais, kai implantacija būna svarstoma pirmoje eilėje.";
  }
  if (score >= 22) {
    return "Daugelis žmonių su panašiais požymiais renkasi konsultaciją, kad sužinotų visas galimybes — nuo implanto iki alternatyvų.";
  }
  return "Net ir švelnesni simptomai verti aiškaus plano: konsultacijoje galėsite ramiai palyginti variantus.";
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

export function buildQuizResult(answers: QuizAnswers): QuizComputedResult {
  if (answers.q1 === "none") {
    return { variant: "all_good" };
  }

  if (!isQuizComplete(answers)) {
    throw new Error("buildQuizResult: neužbaigti atsakymai");
  }

  const a = answers;
  const score = computeQuizScore(a);
  const { tier, explanation } = tierFromQ4(a.q4);
  const position = positionFromQ4(a.q4);
  const showFlapless = a.q5 === "very_afraid" || a.q5 === "somewhat";
  const showChronicDisclaimer = a.q7 === "chronic";

  const est = calculatePartialEstimate({
    toothCount: 1,
    toothPosition: position,
    implantTier: tier,
    singleJaw: true,
  });

  return {
    variant: "consult",
    score,
    headline: headlineFromAnswers(a, score),
    lead: leadFromScore(score),
    ageInsight: AGE_COPY[a.q6],
    priorityLine:
      a.q4 === "aesthetics"
        ? "Jūsų prioritetas — estetika ir natūrali išvaizda."
        : a.q4 === "function"
          ? "Jūsų prioritetas — saugus kramtymas ir komfortas."
          : a.q4 === "longevity"
            ? "Jūsų prioritetas — ilgaamžiškumas ir patikimumas."
            : "Jūsų prioritetas — protinga kaina be nereikalingų permokų.",
    showFlapless,
    showChronicDisclaimer,
    recommendedTier: tier,
    tierExplanation: explanation,
    orientedTotal: formatMoney(est.total),
    orientedNote:
      "Orientacinė 1 implanto sąmata pagal jūsų nurodytą prioritetą (vienas žandikaulis, be komplikacijų scenarijaus). Tiksli suma po 3D diagnostikos.",
  };
}
