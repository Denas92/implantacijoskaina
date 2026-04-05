import type { CompetitorRow } from "@/lib/sanity.types";

function cell(v?: string) {
  if (v?.trim()) return v;
  return "—";
}

type Props = {
  rows: CompetitorRow[];
  updatedLabel?: string;
};

export function PriceComparisonTable({ rows, updatedLabel }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-white shadow-card">
      <table className="min-w-[720px] w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-alt/80">
            <th className="px-4 py-3 font-heading font-semibold text-primary-dark">Klinika</th>
            <th className="px-4 py-3 font-medium text-primary-dark">Standart. implantas</th>
            <th className="px-4 py-3 font-medium text-primary-dark">Straumann</th>
            <th className="px-4 py-3 font-medium text-primary-dark">All-on-4</th>
            <th className="px-4 py-3 text-center font-medium text-primary-dark">Be pjūvio?</th>
            <th className="px-4 py-3 font-medium text-primary-dark">Pastabos</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row._id}
              className={`border-b border-border/80 ${
                row.isRecommended ? "bg-primary/5" : "hover:bg-surface-alt/40"
              }`}
            >
              <td className="px-4 py-3">
                <span className="font-medium text-primary-dark">{row.name}</span>
                {row.isRecommended ? (
                  <span className="ml-2 inline-block rounded-full bg-accent-light px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-dark">
                    Rekomenduojama
                  </span>
                ) : null}
              </td>
              <td className="px-4 py-3 font-mono text-[13px]">{cell(row.standardImplantDisplay)}</td>
              <td className="px-4 py-3 font-mono text-[13px]">{cell(row.straumannDisplay)}</td>
              <td className="px-4 py-3 font-mono text-[13px]">{cell(row.allOn4Display)}</td>
              <td className="px-4 py-3 text-center text-lg">{row.hasFlapless ? "✅" : "❌"}</td>
              <td className="px-4 py-3 text-muted">{cell(row.notes)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {updatedLabel ? (
        <p className="border-t border-border px-4 py-3 text-xs text-muted">{updatedLabel}</p>
      ) : null}
    </div>
  );
}
