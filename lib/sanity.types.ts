export type FaqItem = {
  _id: string;
  question_lt: string;
  answer_lt: string;
  category: string;
  order?: number;
};

export type CompetitorRow = {
  _id: string;
  name: string;
  standardImplantDisplay?: string;
  straumannDisplay?: string;
  allOn4Display?: string;
  hasFlapless?: boolean;
  notes?: string;
  isRecommended?: boolean;
  lastUpdated?: string;
  order?: number;
};
