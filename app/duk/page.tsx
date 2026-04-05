import type { Metadata } from "next";
import { DukFaqSections } from "@/components/sections/DukFaqSections";
import { Button } from "@/components/ui/Button";
import { fetchFaqs } from "@/lib/sanity.fetch";
import { buildFaqPageJsonLd } from "@/lib/seo/faqJsonLd";

export const metadata: Metadata = {
  title: "Dantų implantai — dažniausiai užduodami klausimai 2026",
  description:
    "Atsakymai į klausimus apie kainas, procedūrą, gijimą, rizikas ir priežiūrą.",
};

export default async function DukPage() {
  const { items, fromSanity } = await fetchFaqs();
  const jsonLd = buildFaqPageJsonLd(items);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="font-heading text-3xl font-semibold text-primary-dark">
          Dažniausiai užduodami klausimai
        </h1>
        <p className="mt-4 text-muted">
          Trumpi atsakymai edukaciniais tikslais — galutines rekomendacijas pateikia gydytojas po apžiūros ir
          diagnostikos.
        </p>
        {!fromSanity ? (
          <p className="mt-3 rounded-lg border border-border bg-surface-alt/60 px-3 py-2 text-xs text-muted">
            Rodomas pavyzdinis turinys. Prijunkite Sanity ir užpildykite dokumentus tipo „DUK“, kad valdytumėte
            klausimus čia.
          </p>
        ) : null}
        <div className="mt-10">
          <DukFaqSections items={items} />
        </div>
        <div className="mt-12 rounded-xl border border-border bg-primary/5 p-6 text-center">
          <p className="text-sm font-medium text-primary-dark">Likote neatsakę į savo klausimą?</p>
          <Button href="/kontaktai" variant="primary" className="mt-4">
            Nemokama konsultacija
          </Button>
        </div>
      </div>
    </>
  );
}
