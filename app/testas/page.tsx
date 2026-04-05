import type { Metadata } from "next";
import { ImplantQuiz } from "@/components/quiz/ImplantQuiz";

export const metadata: Metadata = {
  title: "Ar man reikia dantų implanto? Nemokamas testas",
  description:
    "Trumpas testas — personalizuota rekomendacija ir orientacinė kaina. Nemokama konsultacija.",
};

export default function TestasPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold text-primary-dark">
        Ar man reikia implanto?
      </h1>
      <p className="mt-4 text-muted">
        Septyni trumpi klausimai — be diagnozių, tik orientacija, ką verta aptarti su implantologu. Pabaigoje
        pamatysite apytikslę vieno implanto kainą pagal jūsų prioritetus.
      </p>
      <div className="mt-10">
        <ImplantQuiz />
      </div>
    </div>
  );
}
