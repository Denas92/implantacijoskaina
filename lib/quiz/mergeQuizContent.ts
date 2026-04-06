import type { ImplantTier, ToothPosition } from "@/lib/calculator/engineTypes";
import { DEFAULT_QUIZ_ENGINE_COPY } from "@/lib/fallback/quizEngineDefaults";
import { DEFAULT_QUIZ_RESULT_UI } from "@/lib/fallback/quizResultUiDefaults";
import type { QuizEngineCopy, QuizResultUiCopy } from "@/lib/quiz/quizContentTypes";

const TIERS: ImplantTier[] = ["standard", "straumann_sla", "straumann_slactive"];
const POSITIONS: ToothPosition[] = ["anterior", "posterior", "mixed"];

function trimStr(v: unknown): string | null {
  const t = String(v ?? "").trim();
  return t.length ? t : null;
}

function isTier(v: string): v is ImplantTier {
  return TIERS.includes(v as ImplantTier);
}

function isPosition(v: string): v is ToothPosition {
  return POSITIONS.includes(v as ToothPosition);
}

/** Sujungia Sanity dalinį objektą su numatytaisiais testo logikos tekstais. */
export function mergeQuizEngineCopy(patch: unknown): QuizEngineCopy {
  const base = structuredClone(DEFAULT_QUIZ_ENGINE_COPY);
  if (!patch || typeof patch !== "object") return base;
  const p = patch as Record<string, unknown>;

  if (p.tierByQ4 && typeof p.tierByQ4 === "object") {
    const t = p.tierByQ4 as Record<string, unknown>;
    for (const key of ["aesthetics", "function", "longevity", "price"] as const) {
      const row = t[key];
      if (row && typeof row === "object") {
        const r = row as Record<string, unknown>;
        const tier = trimStr(r.tier);
        if (tier && isTier(tier)) base.tierByQ4[key].tier = tier;
        const ex = trimStr(r.explanation);
        if (ex) base.tierByQ4[key].explanation = ex;
      }
    }
  }

  if (p.positionByQ4 && typeof p.positionByQ4 === "object") {
    const t = p.positionByQ4 as Record<string, unknown>;
    for (const key of ["aesthetics", "function", "longevity", "price"] as const) {
      const pos = trimStr(t[key]);
      if (pos && isPosition(pos)) base.positionByQ4[key] = pos;
    }
  }

  if (p.ageByQ6 && typeof p.ageByQ6 === "object") {
    const a = p.ageByQ6 as Record<string, unknown>;
    for (const k of ["y18_35", "y36_55", "y56_70", "y70plus"] as const) {
      const s = trimStr(a[k]);
      if (s) base.ageByQ6[k] = s;
    }
  }

  if (p.priorityLineByQ4 && typeof p.priorityLineByQ4 === "object") {
    const pl = p.priorityLineByQ4 as Record<string, unknown>;
    for (const key of ["aesthetics", "function", "longevity", "price"] as const) {
      const s = trimStr(pl[key]);
      if (s) base.priorityLineByQ4[key] = s;
    }
  }

  if (p.headlines && typeof p.headlines === "object") {
    const h = p.headlines as Record<string, unknown>;
    for (const k of [
      "q1_many_missing",
      "q1_loose",
      "q1_one_few_high",
      "q1_one_few",
      "score30",
      "default",
    ] as const) {
      const s = trimStr(h[k]);
      if (s) base.headlines[k] = s;
    }
  }

  if (p.leads && typeof p.leads === "object") {
    const l = p.leads as Record<string, unknown>;
    for (const k of ["high", "mid", "low"] as const) {
      const s = trimStr(l[k]);
      if (s) base.leads[k] = s;
    }
  }

  const onote = trimStr(p.orientedNote);
  if (onote) base.orientedNote = onote;

  return base;
}

/** Sujungia Sanity dalinį objektą su numatytaisiais rezultato ekrano tekstais. */
export function mergeQuizResultUi(patch: unknown): QuizResultUiCopy {
  const base = structuredClone(DEFAULT_QUIZ_RESULT_UI);
  if (!patch || typeof patch !== "object") return base;
  const p = patch as Record<string, unknown>;
  for (const k of Object.keys(base) as (keyof QuizResultUiCopy)[]) {
    const s = trimStr(p[k]);
    if (s) base[k] = s;
  }
  return base;
}
