"use client";

import type { CalculationResult } from "./calculatorLogic";
import { formatMoney } from "./calculatorLogic";
import { Button } from "@/components/ui/Button";
import { usePathname } from "next/navigation";
import { pushDataLayer } from "@/lib/analytics";

type Props = {
  result: CalculationResult;
  onBack: () => void;
  onStartOver: () => void;
};

export function CalculatorResult({ result, onBack, onStartOver }: Props) {
  const pathname = usePathname();

  return (
    <div className="rounded-xl border border-border bg-white p-6 shadow-card sm:p-8">
      <p className="text-xs font-medium uppercase tracking-wider text-muted">Rezultatas</p>
      <h3 className="mt-2 font-heading text-xl font-semibold text-primary-dark sm:text-2xl">
        {result.headline}
      </h3>

      <div className="mt-8 border-t border-border pt-6">
        <p className="text-sm font-medium text-primary-dark">Jūsų orientacinė sąmata</p>
        <ul className="mt-4 space-y-3">
          {result.items.map((row) => (
            <li key={row.id} className="flex flex-col gap-0.5 border-b border-border/70 pb-3 last:border-0 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <span className="text-sm text-[var(--color-text)]">{row.label}</span>
                {row.detail ? (
                  <span className="mt-0.5 block text-xs text-muted">{row.detail}</span>
                ) : null}
                <span className="mt-1 block font-mono text-xs text-muted">
                  {row.qty} × {formatMoney(row.unitPrice)}
                </span>
              </div>
              <span className="font-mono text-sm font-semibold text-primary-dark sm:text-right">
                {formatMoney(row.total)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-semibold text-primary-dark">Bendra orientacinė kaina</span>
          <span className="font-mono text-2xl font-bold text-primary">{formatMoney(result.total)}</span>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-primary/5 p-4 text-sm text-primary-dark">
        <p className="font-medium">Su implantacija be pjūvio</p>
        <p className="mt-1 text-muted">
          Mažiau skausmo, greitesnis gijimas — tikslias galimybes patvirtins gydytojas konsultacijos metu.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button href="/kontaktai" variant="primary" className="sm:flex-1">
          Gauti tikslią kainą — nemokama konsultacija
        </Button>
        <Button href="#konsultacija" variant="ghost" className="sm:flex-1">
          Užpildyti formą žemiau
        </Button>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          className="text-center text-xs font-medium text-primary underline-offset-2 hover:underline"
          onClick={() => {
            pushDataLayer({
              event: "pdf_download",
              type: "price_estimate",
              page: pathname ?? "",
            });
          }}
        >
          Atsisiųsti sąmatą PDF (netrukus)
        </button>
      </div>

      <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-6">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-medium text-primary underline-offset-2 hover:underline"
        >
          ← Atgal
        </button>
        <button
          type="button"
          onClick={onStartOver}
          className="text-sm text-muted underline-offset-2 hover:text-primary hover:underline"
        >
          Skaičiuoti iš naujo
        </button>
      </div>
    </div>
  );
}
