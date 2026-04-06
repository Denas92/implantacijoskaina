"use client";

import Link from "next/link";
import { buildQuizResult } from "./quizLogic";
import type { QuizAnswers } from "./quizLogic";
import { useAppContent } from "@/components/providers/AppContentProvider";
import { Button } from "@/components/ui/Button";

type Props = {
  answers: QuizAnswers;
  onRetry: () => void;
};

export function QuizResult({ answers, onRetry }: Props) {
  const { calculatorEngine, siteContent } = useAppContent();
  const ui = siteContent.quizResultUi;
  let result;
  try {
    result = buildQuizResult(answers, calculatorEngine, siteContent.quizEngine);
  } catch {
    return (
      <div className="rounded-xl border border-border bg-white p-8 text-center shadow-card">
        <p className="text-sm text-muted">{ui.errorMessage}</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 text-sm font-medium text-primary underline"
        >
          {ui.errorRetry}
        </button>
      </div>
    );
  }

  if (result.variant === "all_good") {
    return (
      <div className="rounded-xl border border-border bg-white p-8 shadow-card sm:p-10">
        <p className="text-xs font-medium uppercase tracking-wider text-primary-light">{ui.allGoodKicker}</p>
        <h2 className="mt-3 font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
          {ui.allGoodTitle}
        </h2>
        <p className="mt-4 text-muted">{ui.allGoodLead}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/" variant="primary">
            {ui.allGoodHome}
          </Button>
          <Button type="button" variant="ghost" className="sm:inline-flex" onClick={onRetry}>
            {ui.allGoodRetry}
          </Button>
        </div>
      </div>
    );
  }

  const r = result;

  return (
    <div className="rounded-xl border border-border bg-white p-8 shadow-card sm:p-10">
      <p className="text-xs font-medium uppercase tracking-wider text-muted">{ui.consultKicker}</p>
      <h2 className="mt-3 font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
        {r.headline}
      </h2>
      <p className="mt-4 text-muted">{r.lead}</p>

      <ul className="mt-8 space-y-4 text-sm">
        <li className="rounded-lg bg-surface-alt/80 p-4">
          <span className="font-medium text-primary-dark">{ui.labelPriority}</span>
          <p className="mt-1 text-muted">{r.priorityLine}</p>
        </li>
        <li className="rounded-lg bg-surface-alt/80 p-4">
          <span className="font-medium text-primary-dark">{ui.labelAge}</span>
          <p className="mt-1 text-muted">{r.ageInsight}</p>
        </li>
        <li className="rounded-lg border border-primary/15 bg-primary/5 p-4">
          <span className="font-medium text-primary-dark">{ui.labelTier}</span>
          <p className="mt-1 text-muted">{r.tierExplanation}</p>
        </li>
      </ul>

      {r.showFlapless ? (
        <div className="mt-6 rounded-lg border border-accent/40 bg-accent-light/30 p-4 text-sm text-primary-dark">
          <p className="font-medium">{ui.flaplessTitle}</p>
          <p className="mt-1 text-muted">{ui.flaplessBody}</p>
          <Link
            href="/be-pjuvio"
            className="mt-3 inline-block text-sm font-medium text-primary underline-offset-2 hover:underline"
          >
            {ui.flaplessLink}
          </Link>
        </div>
      ) : null}

      {r.showChronicDisclaimer ? (
        <div className="mt-6 rounded-lg border border-[var(--color-warning)]/50 bg-[var(--color-warning)]/10 p-4 text-sm">
          <p className="font-medium text-primary-dark">{ui.chronicTitle}</p>
          <p className="mt-1 text-muted">{ui.chronicBody}</p>
        </div>
      ) : null}

      <div className="mt-8 border-t border-border pt-8">
        <p className="text-sm font-medium text-primary-dark">{ui.orientedPriceLabel}</p>
        <p className="mt-2 font-mono text-3xl font-bold text-primary">{r.orientedTotal}</p>
        <p className="mt-2 text-xs text-muted">{r.orientedNote}</p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button href="/kontaktai" variant="primary">
          {ui.ctaConsult}
        </Button>
        <Button href="/#skaiciuokle" variant="secondary">
          {ui.ctaCalculator}
        </Button>
        <Button type="button" variant="ghost" onClick={onRetry}>
          {ui.ctaRetry}
        </Button>
      </div>
    </div>
  );
}
