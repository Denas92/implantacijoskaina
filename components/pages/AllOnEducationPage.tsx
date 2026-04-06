import type { ReactNode } from "react";
import type { AllOnPageData } from "@/lib/allOnPage.types";
import { Button } from "@/components/ui/Button";

function BodyText({ text, className = "" }: { text: string; className?: string }) {
  const parts = text.split(/\n\n/).filter(Boolean);
  return (
    <div className={`space-y-4 text-muted leading-relaxed ${className}`}>
      {parts.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24" aria-labelledby={id ? `${id}-h` : undefined}>
      <h2 id={id ? `${id}-h` : undefined} className="font-heading text-xl font-semibold text-primary-dark">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

type Props = {
  data: AllOnPageData;
};

export function AllOnEducationPage({ data }: Props) {
  const d = data;
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <header className="border-b border-border pb-10">
        <p className="text-xs font-medium uppercase tracking-wider text-primary-light">{d.hero.kicker}</p>
        <h1 className="mt-2 font-heading text-3xl font-semibold text-primary-dark sm:text-4xl">
          {d.hero.title}
        </h1>
        <p className="mt-4 text-lg text-muted leading-relaxed">{d.hero.lead}</p>
        <p className="mt-6 rounded-lg border border-border bg-surface-alt/60 p-4 text-sm text-muted leading-relaxed">
          {d.hero.disclaimer}
        </p>
      </header>

      <div className="mt-14 space-y-16">
        <Section id="kas-yra" title={d.whatIs.title}>
          <BodyText text={d.whatIs.body} />
        </Section>

        <Section id="all-on-4-vs-6" title={d.compare4vs6.title}>
          <BodyText text={d.compare4vs6.intro} />
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-white p-5 shadow-card">
              <h3 className="font-heading text-lg font-semibold text-primary-dark">{d.compare4vs6.fourTitle}</h3>
              <BodyText text={d.compare4vs6.fourBody} className="mt-3 text-sm" />
            </div>
            <div className="rounded-xl border border-border bg-white p-5 shadow-card">
              <h3 className="font-heading text-lg font-semibold text-primary-dark">{d.compare4vs6.sixTitle}</h3>
              <BodyText text={d.compare4vs6.sixBody} className="mt-3 text-sm" />
            </div>
          </div>
        </Section>

        <Section id="etapai" title={d.journey.title}>
          <ol className="space-y-8">
            {d.journey.steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-heading text-base font-semibold text-primary-dark">{step.title}</h3>
                  <BodyText text={step.body} className="mt-2 text-sm" />
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="immediate-loading" title={d.immediateLoading.title}>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-light">
            {d.immediateLoading.labels.terms}
          </h3>
          <BodyText text={d.immediateLoading.terms} className="mt-2" />
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-primary-light">
            {d.immediateLoading.labels.whenOften}
          </h3>
          <BodyText text={d.immediateLoading.whenOften} className="mt-2" />
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-primary-light">
            {d.immediateLoading.labels.whenNot}
          </h3>
          <BodyText text={d.immediateLoading.whenNot} className="mt-2" />
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-primary-light">
            {d.immediateLoading.labels.risks}
          </h3>
          <BodyText text={d.immediateLoading.risks} className="mt-2" />
        </Section>

        <Section id="laikinas-nuolatinis" title={d.provisionalToFinal.title}>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-light">
            {d.provisionalToFinal.labels.whyTwoSteps}
          </h3>
          <BodyText text={d.provisionalToFinal.whyTwoSteps} className="mt-2" />
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-primary-light">
            {d.provisionalToFinal.labels.typicalTimeline}
          </h3>
          <BodyText text={d.provisionalToFinal.typicalTimeline} className="mt-2" />
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-primary-light">
            {d.provisionalToFinal.labels.materialsNote}
          </h3>
          <BodyText text={d.provisionalToFinal.materialsNote} className="mt-2" />
        </Section>

        <Section id="pasvirti" title={d.tiltedImplants.title}>
          <BodyText text={d.tiltedImplants.body} />
        </Section>

        <Section id="pterygoid" title={d.pterygoid.title}>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-light">
            {d.pterygoid.labels.whatIs}
          </h3>
          <BodyText text={d.pterygoid.whatIs} className="mt-2" />
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-primary-light">
            {d.pterygoid.labels.whenConsidered}
          </h3>
          <BodyText text={d.pterygoid.whenConsidered} className="mt-2" />
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-primary-light">
            {d.pterygoid.labels.whenNot}
          </h3>
          <BodyText text={d.pterygoid.whenNot} className="mt-2" />
        </Section>

        <Section id="zygominiai" title={d.zygomatic.title}>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-light">
            {d.zygomatic.labels.whatIs}
          </h3>
          <BodyText text={d.zygomatic.whatIs} className="mt-2" />
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-primary-light">
            {d.zygomatic.labels.whenConsidered}
          </h3>
          <BodyText text={d.zygomatic.whenConsidered} className="mt-2" />
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-primary-light">
            {d.zygomatic.labels.otherApproaches}
          </h3>
          <BodyText text={d.zygomatic.otherApproaches} className="mt-2" />
        </Section>

        <Section id="kontraindikacijos" title={d.contraindications.title}>
          <BodyText text={d.contraindications.body} />
        </Section>

        <section className="scroll-mt-24" aria-labelledby="all-on-faq-h">
          <h2 id="all-on-faq-h" className="font-heading text-xl font-semibold text-primary-dark">
            {d.faqSectionTitle}
          </h2>
          <div className="mt-4 divide-y divide-border rounded-xl border border-border bg-white shadow-card">
            {d.faqs.map((faq, i) => (
              <details key={i} className="group px-4 py-1">
                <summary className="cursor-pointer list-none py-4 font-medium text-primary-dark marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-3">
                    <span>{faq.question}</span>
                    <span className="shrink-0 text-primary-light transition group-open:rotate-180">▼</span>
                  </span>
                </summary>
                <div className="border-t border-border/60 pb-4 pt-2 text-sm text-muted leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section
          className="rounded-xl border border-primary/15 bg-primary/5 p-8 text-center"
          aria-label={d.ctas.sectionAriaLabel}
        >
          <p className="text-sm font-medium text-primary-dark">{d.ctas.sectionTitle}</p>
          <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Button href={d.ctas.primaryHref} variant="primary">
              {d.ctas.primaryLabel}
            </Button>
            <Button href={d.ctas.secondaryHref} variant="secondary">
              {d.ctas.secondaryLabel}
            </Button>
            <Button href={d.ctas.tertiaryHref} variant="ghost">
              {d.ctas.tertiaryLabel}
            </Button>
          </div>
        </section>
      </div>
    </article>
  );
}
