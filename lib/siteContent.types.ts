import type { QuizEngineCopy, QuizResultUiCopy } from "@/lib/quiz/quizContentTypes";

export type SiteLink = { href: string; label: string };

export type SiteContentData = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
  trustSignals: { value: string; label: string }[];
  navLinks: SiteLink[];
  footerLinks: SiteLink[];
  homepage: {
    calculatorSectionTitle: string;
    calculatorSectionLead: string;
    pricingOverviewTitle: string;
    pricingOverviewCards: {
      title: string;
      subtitle: string;
      fromPrice: string;
      showBadge?: boolean;
      cardFootnote?: string;
    }[];
    pricingCtaLabel: string;
    consultationTitle: string;
    consultationLead: string;
  };
  quizPage: {
    title: string;
    lead: string;
  };
  /** Testo rezultato generavimo tekstai (balai ir logika lieka kode). */
  quizEngine: QuizEngineCopy;
  /** Testo rezultato ekrano etiketės ir mygtukai. */
  quizResultUi: QuizResultUiCopy;
  whatsappPresetMessage: string;
};
