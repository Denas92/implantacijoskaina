import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dantų implantai — dažniausiai užduodami klausimai 2026",
  description:
    "Atsakymai į klausimus apie kainas, procedūrą, gijimą, rizikas ir priežiūrą.",
};

export default function DukPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold text-primary-dark">DUK</h1>
      <p className="mt-4 text-muted">
        Accordion su 15–20 klausimų ir FAQPage schema — prijungsime prie Sanity `faq`.
      </p>
    </div>
  );
}
