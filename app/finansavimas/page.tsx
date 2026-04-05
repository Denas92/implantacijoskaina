import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dantų implantų finansavimas ir mokėjimo išdėstymas 2026",
  description:
    "Finansavimo galimybės, mėnesinės įmokos skaičiuoklė ir informacija apie kompensacijas.",
};

export default function FinansavimasPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold text-primary-dark">Finansavimas</h1>
      <p className="mt-4 text-muted">
        Mėnesinio mokėjimo skaičiuoklė ir klinikos sąlygos — ruošiamos.
      </p>
    </div>
  );
}
