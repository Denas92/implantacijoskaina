import type { ReactNode } from "react";

type Props = {
  step: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function CalculatorStep({ step, totalSteps, title, subtitle, children }: Props) {
  return (
    <div className="rounded-xl border border-border bg-white p-6 shadow-card sm:p-8">
      <p className="text-xs font-medium uppercase tracking-wider text-muted">
        Žingsnis {step} / {totalSteps}
      </p>
      <h3 className="mt-2 font-heading text-xl font-semibold text-primary-dark sm:text-2xl">
        {title}
      </h3>
      {subtitle ? <p className="mt-2 text-sm text-muted">{subtitle}</p> : null}
      <div className="mt-8">{children}</div>
    </div>
  );
}
