/** All-on-4/6 edukacinio puslapio turinys (Sanity singleton `allOnPage`). */

export type AllOnTimelineStep = { title: string; body: string };

export type AllOnFaqItem = { question: string; answer: string };

export type AllOnPageData = {
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  hero: {
    kicker: string;
    title: string;
    lead: string;
    disclaimer: string;
  };
  whatIs: {
    title: string;
    body: string;
  };
  compare4vs6: {
    title: string;
    intro: string;
    fourTitle: string;
    fourBody: string;
    sixTitle: string;
    sixBody: string;
  };
  journey: {
    title: string;
    steps: AllOnTimelineStep[];
  };
  immediateLoading: {
    title: string;
    labels: {
      terms: string;
      whenOften: string;
      whenNot: string;
      risks: string;
    };
    terms: string;
    whenOften: string;
    whenNot: string;
    risks: string;
  };
  provisionalToFinal: {
    title: string;
    labels: {
      whyTwoSteps: string;
      typicalTimeline: string;
      materialsNote: string;
    };
    whyTwoSteps: string;
    typicalTimeline: string;
    materialsNote: string;
  };
  tiltedImplants: {
    title: string;
    body: string;
  };
  pterygoid: {
    title: string;
    labels: {
      whatIs: string;
      whenConsidered: string;
      whenNot: string;
    };
    whatIs: string;
    whenConsidered: string;
    whenNot: string;
  };
  zygomatic: {
    title: string;
    labels: {
      whatIs: string;
      whenConsidered: string;
      otherApproaches: string;
    };
    whatIs: string;
    whenConsidered: string;
    otherApproaches: string;
  };
  contraindications: {
    title: string;
    body: string;
  };
  /** Antraštė virš šio puslapio DUK sąrašo */
  faqSectionTitle: string;
  faqs: AllOnFaqItem[];
  ctas: {
    sectionTitle: string;
    /** accessibilityLabel for the CTA region */
    sectionAriaLabel: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
    tertiaryLabel: string;
    tertiaryHref: string;
  };
};
