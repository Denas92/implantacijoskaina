import type { FaqItem } from "@/lib/sanity.types";

const CATEGORY_TITLE: Record<string, string> = {
  kainos: "Kainos",
  procedura: "Procedūra",
  gijimas: "Gijimas",
  rizikos: "Rizikos",
  prieziura: "Priežiūra",
};

function groupByCategory(items: FaqItem[]) {
  const map = new Map<string, FaqItem[]>();
  for (const item of items) {
    const key = item.category || "kita";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(item);
  }
  return map;
}

type Props = {
  items: FaqItem[];
};

export function DukFaqSections({ items }: Props) {
  const grouped = groupByCategory(items);
  const order = ["kainos", "procedura", "gijimas", "rizikos", "prieziura"];
  const extra = Array.from(grouped.keys()).filter((k) => !order.includes(k));
  const keys = [...order.filter((k) => grouped.has(k)), ...extra];

  return (
    <div className="space-y-12">
      {keys.map((cat) => (
        <section key={cat} aria-labelledby={`duk-${cat}`}>
          <h2 id={`duk-${cat}`} className="font-heading text-xl font-semibold text-primary-dark">
            {CATEGORY_TITLE[cat] ?? cat}
          </h2>
          <div className="mt-4 divide-y divide-border rounded-xl border border-border bg-white shadow-card">
            {grouped.get(cat)!.map((faq) => (
              <details key={faq._id} className="group px-4 py-1">
                <summary className="cursor-pointer list-none py-4 font-medium text-primary-dark marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-3">
                    <span>{faq.question_lt}</span>
                    <span className="shrink-0 text-primary-light transition group-open:rotate-180">▼</span>
                  </span>
                </summary>
                <div className="border-t border-border/60 pb-4 pt-2 text-sm text-muted leading-relaxed">
                  {faq.answer_lt}
                </div>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
