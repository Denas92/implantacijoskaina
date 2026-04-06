"use client";

import { useAppContent } from "@/components/providers/AppContentProvider";

export function TrustSignals() {
  const { siteContent } = useAppContent();
  const items = siteContent.trustSignals;

  return (
    <section className="border-b border-border bg-white py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 sm:grid-cols-4 sm:px-6">
        {items.map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="font-mono text-2xl font-semibold text-primary sm:text-3xl">{value}</p>
            <p className="mt-1 text-sm text-muted">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
