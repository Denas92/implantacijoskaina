import type { Metadata } from "next";
import { PriceComparisonTable } from "@/components/comparison/PriceComparisonTable";
import { Button } from "@/components/ui/Button";
import { fetchCompetitors } from "@/lib/sanity.fetch";

export const metadata: Metadata = {
  title: "Dantų implantų kainos Vilniuje — klinikų palyginimas 2026",
  description:
    "Palyginkite dantų implantacijos kainas Vilniaus klinikose. Objektyvus palyginimas su kainomis, metodais ir pacientų atsiliepimais.",
};

const CRITERIA = [
  "Ar naudojamas 3D planavimas ir chirurginis gidas — mažesnė rizika ir nuspėjamesnis rezultatas.",
  "Kokios implantų linijos siūlomos ir ar yra oficialūs tiekėjų sertifikatai.",
  "Ar matote visą kainų struktūrą (implantas, atrama, vainikėlis, papildomi etapai).",
  "Patirtis su sudėtingesniais atvejais ir pooperacine priežiūra.",
  "Atsiliepimai ir skaidrumas — be paslėptų „tik konsultacijoje“ sąlygų.",
] as const;

export default async function KainuPalyginimasPage() {
  const { rows, fromSanity } = await fetchCompetitors();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold text-primary-dark sm:text-4xl">
        Implantų kainos Vilniuje: klinikų palyginimas
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Lentelėje — orientacinės kainos ir metodų ypatybės. Tiksli sąmata visada individuali; naudokite mūsų
        skaičiuoklę arba konsultaciją.
      </p>
      {!fromSanity ? (
        <p className="mt-3 max-w-2xl rounded-lg border border-border bg-surface-alt/60 px-3 py-2 text-xs text-muted">
          Rodomi pavyzdiniai duomenys pagal viešai skelbiamą informaciją. Prisijungus Sanity galėsite redaguoti
          eilutes be kodo keitimo.
        </p>
      ) : null}

      <div className="mt-10">
        <PriceComparisonTable
          rows={rows}
          updatedLabel="Kainos orientacinės, gali keistis. Prieš apsisprendimą visada patikrinkite aktualią pasiūlą pasirinktoje klinikoje."
        />
      </div>

      <section className="mt-16 border-t border-border pt-12">
        <h2 className="font-heading text-2xl font-semibold text-primary-dark">
          Ką vertinti renkantis kliniką (ne tik kainą)
        </h2>
        <ul className="mt-6 space-y-3 text-sm text-muted">
          {CRITERIA.map((line) => (
            <li key={line} className="flex gap-3">
              <span className="mt-0.5 font-mono text-primary" aria-hidden>
                ✓
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-12 flex flex-col items-start gap-4 rounded-xl border border-border bg-surface-alt/50 p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          Sužinokite tikslią kainą savo situacijai — nemokama orientacinė konsultacija.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button href="/kontaktai" variant="primary">
            Gauti pasiūlymą
          </Button>
          <Button href="/#skaiciuokle" variant="ghost">
            Skaičiuoklė
          </Button>
        </div>
      </div>
    </div>
  );
}
