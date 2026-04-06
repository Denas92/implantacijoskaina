"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { QUIZ_STEPS } from "./quizData";
import { getQuizAnalyticsRecommendation, type QuizAnswers } from "./quizLogic";
import { QuizQuestion } from "./QuizQuestion";
import { QuizResult } from "./QuizResult";
import { pushDataLayer } from "@/lib/analytics";
import { useAppContent } from "@/components/providers/AppContentProvider";

export function ImplantQuiz() {
  const pathname = usePathname();
  const { calculatorEngine, siteContent } = useAppContent();
  const [phase, setPhase] = useState<"quiz" | "result">("quiz");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const quizStartedRef = useRef(false);
  const quizCompleteSentRef = useRef(false);

  const currentStep = QUIZ_STEPS[step];
  const selectedForStep = answers[currentStep.id] as string | undefined;

  const progressPct = useMemo(
    () => ((step + 1) / QUIZ_STEPS.length) * 100,
    [step],
  );

  const handleSelect = useCallback(
    (value: string) => {
      if (!quizStartedRef.current) {
        quizStartedRef.current = true;
        pushDataLayer({ event: "quiz_start" });
      }
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
    quizStartedRef.current = false;
    setAnswers({});
    setStep(0);
    setPhase("quiz");
  }, []);

  useEffect(() => {
    if (phase !== "result") {
      quizCompleteSentRef.current = false;
      return;
    }
    if (quizCompleteSentRef.current) return;
    quizCompleteSentRef.current = true;
    pushDataLayer({
      event: "quiz_complete",
      recommendation: getQuizAnalyticsRecommendation(
        answers,
        calculatorEngine,
        siteContent.quizEngine,
      ),
      page: pathname ?? "",
    });
  }, [phase, answers, pathname, calculatorEngine, siteContent.quizEngine]);

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
