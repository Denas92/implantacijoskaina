export const faqsQuery = `*[_type == "faq"] | order(order asc, _createdAt asc) {
  _id,
  question_lt,
  answer_lt,
  category,
  order
}`;

export const competitorsQuery = `*[_type == "competitor"] | order(order asc, name asc) {
  _id,
  name,
  standardImplantDisplay,
  straumannDisplay,
  allOn4Display,
  hasFlapless,
  notes,
  isRecommended,
  lastUpdated,
  order
}`;
