"use client";

import type { QuizStepDef } from "./quizData";

function choiceClass(active: boolean) {
  return `w-full rounded-xl border p-4 text-left transition-colors sm:p-5 ${
    active
      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
      : "border-border bg-white hover:border-primary/40"
  }`;
}

type Props = {
  step: QuizStepDef;
  stepIndex: number;
  totalSteps: number;
  selectedValue?: string;
  onSelect: (value: string) => void;
  onBack?: () => void;
  canGoBack: boolean;
};

export function QuizQuestion({
  step,
  stepIndex,
  totalSteps,
  selectedValue,
  onSelect,
  onBack,
  canGoBack,
}: Props) {
  return (
    <div className="rounded-xl border border-border bg-white p-6 shadow-card sm:p-8">
      <p className="text-xs font-medium uppercase tracking-wider text-muted">
        Klausimas {stepIndex + 1} / {totalSteps}
      </p>
      <h2 className="mt-2 font-heading text-xl font-semibold text-primary-dark sm:text-2xl">
        {step.title}
      </h2>
      {step.subtitle ? <p className="mt-2 text-sm text-muted">{step.subtitle}</p> : null}

      <div className="mt-8 grid gap-3">
        {step.options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={choiceClass(selectedValue === opt.value)}
            onClick={() => onSelect(opt.value)}
          >
            <span className="font-medium text-primary-dark">{opt.label}</span>
            {opt.description ? (
              <span className="mt-1 block text-sm text-muted">{opt.description}</span>
            ) : null}
          </button>
        ))}
      </div>

      {canGoBack && onBack ? (
        <div className="mt-8 border-t border-border pt-6">
          <button
            type="button"
            onClick={onBack}
            className="text-sm font-medium text-muted hover:text-primary"
          >
            ← Atgal
          </button>
        </div>
      ) : null}
    </div>
  );
}
