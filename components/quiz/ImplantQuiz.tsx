"use client";

import { useCallback, useMemo, useState } from "react";
import { QUIZ_STEPS } from "./quizData";
import type { QuizAnswers } from "./quizLogic";
import { QuizQuestion } from "./QuizQuestion";
import { QuizResult } from "./QuizResult";

export function ImplantQuiz() {
  const [phase, setPhase] = useState<"quiz" | "result">("quiz");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});

  const currentStep = QUIZ_STEPS[step];
  const selectedForStep = answers[currentStep.id] as string | undefined;

  const progressPct = useMemo(
    () => ((step + 1) / QUIZ_STEPS.length) * 100,
    [step],
  );

  const handleSelect = useCallback(
    (value: string) => {
      setAnswers((prev) => ({ ...prev, [currentStep.id]: value }) as QuizAnswers);

      if (currentStep.id === "q1" && value === "none") {
        setPhase("result");
        return;
      }

      if (step < QUIZ_STEPS.length - 1) {
        setStep((s) => s + 1);
      } else {
        setPhase("result");
      }
    },
    [currentStep.id, step],
  );

  const handleBack = useCallback(() => {
    if (step === 0) return;
    const keysToClear = QUIZ_STEPS.slice(step).map((s) => s.id);
    setAnswers((a) => {
      const n = { ...a };
      keysToClear.forEach((k) => {
        delete n[k];
      });
      return n;
    });
    setStep((s) => s - 1);
  }, [step]);

  const handleRetry = useCallback(() => {
    setAnswers({});
    setStep(0);
    setPhase("quiz");
  }, []);

  if (phase === "result") {
    return <QuizResult answers={answers} onRetry={handleRetry} />;
  }

  return (
    <div className="space-y-4">
      <div className="h-1.5 overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progressPct}%` }}
        />
      </div>
      <QuizQuestion
        step={currentStep}
        stepIndex={step}
        totalSteps={QUIZ_STEPS.length}
        selectedValue={selectedForStep}
        onSelect={handleSelect}
        onBack={handleBack}
        canGoBack={step > 0}
      />
    </div>
  );
}
