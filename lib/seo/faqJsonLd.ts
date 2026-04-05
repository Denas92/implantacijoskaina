import type { FaqItem } from "@/lib/sanity.types";

export function buildFaqPageJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question_lt,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer_lt,
      },
    })),
  };
}
