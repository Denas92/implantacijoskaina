"use client";

import { useAppContent } from "@/components/providers/AppContentProvider";

export function QuizPageIntro() {
  const { siteContent } = useAppContent();
  const q = siteContent.quizPage;

  return (
    <>
      <h1 className="font-heading text-3xl font-semibold text-primary-dark">{q.title}</h1>
      <p className="mt-4 text-muted">{q.lead}</p>
    </>
  );
}
