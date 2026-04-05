/**
 * Čia dėkite GROQ užklausas, kai turėsite Sanity schemas (faq, pricing, …).
 * Pavyzdys:
 * export const faqsQuery = `*[_type == "faq"] | order(order asc) { ... }`;
 */

export const placeholderQuery = `*[_type == "sanity.imageAsset"][0...1]{ _id }`;
