import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Implantacija be pjūvio — kas tai? | Flapless metodas Lietuvoje",
  description:
    "Implantacija be chirurginio pjūvio — mažiau skausmo, greitesnis gijimas, procedūra per 15 min. Sužinokite kainas ir kaip veikia flapless metodas.",
};

export default function BePjuvioPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold text-primary-dark">
        Implantacija be pjūvio
      </h1>
      <p className="mt-4 text-muted">
        Turinys pagal brief’ą (hero, palyginimas, procesas, DUK, kainos, galerija) — ruošiamas.
      </p>
    </div>
  );
}
