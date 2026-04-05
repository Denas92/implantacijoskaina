"use client";

import Link from "next/link";
import { buildQuizResult } from "./quizLogic";
import type { QuizAnswers } from "./quizLogic";
import { Button } from "@/components/ui/Button";

type Props = {
  answers: QuizAnswers;
  onRetry: () => void;
};

export function QuizResult({ answers, onRetry }: Props) {
  let result;
  try {
    result = buildQuizResult(answers);
  } catch {
    return (
      <div className="rounded-xl border border-border bg-white p-8 text-center shadow-card">
        <p className="text-sm text-muted">Įvyko klaida generuojant rezultatą.</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 text-sm font-medium text-primary underline"
        >
          Bandyti iš naujo
        </button>
      </div>
    );
  }

  if (result.variant === "all_good") {
    return (
      <div className="rounded-xl border border-border bg-white p-8 shadow-card sm:p-10">
        <p className="text-xs font-medium uppercase tracking-wider text-primary-light">Rezultatas</p>
        <h2 className="mt-3 font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
          Puiku — implantai jums šiuo metu greičiausiai nereikalingi
        </h2>
        <p className="mt-4 text-muted">
          Jei situacija pasikeistų (trauma, dantis pašalintas ir pan.), visada galite pakartoti testą arba
          užsiregistruoti profilaktinei apžiūrai.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/" variant="primary">
            Grįžti į pradžią
          </Button>
          <Button type="button" variant="ghost" className="sm:inline-flex" onClick={onRetry}>
            Kartoti testą
          </Button>
        </div>
      </div>
    );
  }

  const r = result;

  return (
    <div className="rounded-xl border border-border bg-white p-8 shadow-card sm:p-10">
      <p className="text-xs font-medium uppercase tracking-wider text-muted">Jūsų suvestinė</p>
      <h2 className="mt-3 font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
        {r.headline}
      </h2>
      <p className="mt-4 text-muted">{r.lead}</p>

      <ul className="mt-8 space-y-4 text-sm">
        <li className="rounded-lg bg-surface-alt/80 p-4">
          <span className="font-medium text-primary-dark">Prioritetas</span>
          <p className="mt-1 text-muted">{r.priorityLine}</p>
        </li>
        <li className="rounded-lg bg-surface-alt/80 p-4">
          <span className="font-medium text-primary-dark">Amžiaus kontekstas</span>
          <p className="mt-1 text-muted">{r.ageInsight}</p>
        </li>
        <li className="rounded-lg border border-primary/15 bg-primary/5 p-4">
          <span className="font-medium text-primary-dark">Rekomenduojama implantų linija (orientacija)</span>
          <p className="mt-1 text-muted">{r.tierExplanation}</p>
        </li>
      </ul>

      {r.showFlapless ? (
        <div className="mt-6 rounded-lg border border-accent/40 bg-accent-light/30 p-4 text-sm text-primary-dark">
          <p className="font-medium">Implantacija be pjūvio (flapless)</p>
          <p className="mt-1 text-muted">
            Kadangi chirurgija kelia didesnį nerimą, verta aptarti mažiau invazyvius protokolus — dažnai
            mažiau diskomforto ir greitesnis pasijautimas po procedūros.
          </p>
          <Link
            href="/be-pjuvio"
            className="mt-3 inline-block text-sm font-medium text-primary underline-offset-2 hover:underline"
          >
            Skaityti apie metodą →
          </Link>
        </div>
      ) : null}

      {r.showChronicDisclaimer ? (
        <div className="mt-6 rounded-lg border border-[var(--color-warning)]/50 bg-[var(--color-warning)]/10 p-4 text-sm">
          <p className="font-medium text-primary-dark">Lėtinės ligos</p>
          <p className="mt-1 text-muted">
            Prieš bet kokį chirurginį planą būtina gydytojo konsultacija ir vaistų / ligų įvertinimas.
            Implantacija dažnai įmanoma, bet tik individualiai parinkus protokolą.
          </p>
        </div>
      ) : null}

      <div className="mt-8 border-t border-border pt-8">
        <p className="text-sm font-medium text-primary-dark">Orientacinė 1 implanto kaina</p>
        <p className="mt-2 font-mono text-3xl font-bold text-primary">{r.orientedTotal}</p>
        <p className="mt-2 text-xs text-muted">{r.orientedNote}</p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button href="/kontaktai" variant="primary">
          Gaukite asmeninę konsultaciją
        </Button>
        <Button href="/#skaiciuokle" variant="secondary">
          Pilna skaičiuoklė
        </Button>
        <Button type="button" variant="ghost" onClick={onRetry}>
          Kartoti testą
        </Button>
      </div>
    </div>
  );
}
