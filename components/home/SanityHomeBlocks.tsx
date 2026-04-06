"use client";

import { ImplantCalculator } from "@/components/calculator/ImplantCalculator";
import { TrackedPhoneLink } from "@/components/analytics/TrackedPhoneLink";
import { useAppContent } from "@/components/providers/AppContentProvider";
import { ContactForm } from "@/components/ui/ContactForm";
import { Button } from "@/components/ui/Button";
import { getTelDisplay, getTelHref } from "@/lib/site";

export function SanityHomeBlocks() {
  const { siteContent: s } = useAppContent();
  const h = s.homepage;

  return (
    <>
      <section
        id="skaiciuokle"
        className="scroll-mt-20 border-b border-border bg-surface py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
            {h.calculatorSectionTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-muted">{h.calculatorSectionLead}</p>
          <div className="mt-10">
            <ImplantCalculator />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
            {h.pricingOverviewTitle}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {h.pricingOverviewCards.map((card) => (
              <article
                key={card.title}
                className="relative rounded-xl border border-border bg-surface p-6 shadow-card"
              >
                {card.showBadge ? (
                  <span className="absolute right-4 top-4 rounded-full bg-accent-light px-2 py-0.5 text-xs font-semibold text-primary-dark">
                    Rekomenduojama
                  </span>
                ) : null}
                <h3 className="font-heading text-lg font-semibold text-primary">{card.title}</h3>
                <p className="mt-1 text-sm text-muted">{card.subtitle}</p>
                <p className="mt-4 font-mono text-xl font-semibold text-primary-dark">{card.fromPrice}</p>
                {card.cardFootnote ? (
                  <p className="mt-2 text-xs text-muted">{card.cardFootnote}</p>
                ) : null}
              </article>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button href="#skaiciuokle" variant="secondary">
              {h.pricingCtaLabel}
            </Button>
          </div>
        </div>
      </section>

      <section
        id="konsultacija"
        className="scroll-mt-20 bg-surface-alt py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
                {h.consultationTitle}
              </h2>
              <p className="mt-4 text-muted">{h.consultationLead}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <TrackedPhoneLink
                  href={getTelHref()}
                  className="font-mono text-lg font-semibold text-primary hover:text-primary-light"
                >
                  {getTelDisplay()}
                </TrackedPhoneLink>
              </div>
            </div>
            <ContactForm formLocation="homepage" />
          </div>
        </div>
      </section>
    </>
  );
}
