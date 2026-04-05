import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Straumann implantų kainos Lietuvoje 2026 | SLA vs SLActive palyginimas",
  description:
    "Straumann dantų implantai — Šveicarijos kokybė. Palyginimas SLA vs SLActive, kainos nuo 699€. Skaičiuoklė ir eksperto konsultacija.",
};

export default function StraumannPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold text-primary-dark">Straumann implantai</h1>
      <p className="mt-4 text-muted">
        Premium sekcijos, SLA vs SLActive lentelė, sutaupymo kalkuliatorius — ruošiamos pagal specifikaciją.
      </p>
    </div>
  );
}
