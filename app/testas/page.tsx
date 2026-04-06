import type { Metadata } from "next";
import { ImplantQuiz } from "@/components/quiz/ImplantQuiz";
import { QuizPageIntro } from "@/components/quiz/QuizPageIntro";

export const metadata: Metadata = {
  title: "Ar man reikia dantų implanto? Nemokamas testas",
  description:
    "Trumpas testas — personalizuota rekomendacija ir orientacinė kaina. Nemokama konsultacija.",
};

export default function TestasPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <QuizPageIntro />
      <div className="mt-10">
        <ImplantQuiz />
      </div>
    </div>
  );
}
