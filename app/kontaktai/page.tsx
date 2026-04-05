import type { Metadata } from "next";
import { ContactForm } from "@/components/ui/ContactForm";
import { getTelDisplay, getTelHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontaktai",
  description:
    "Nemokama konsultacija dėl dantų implantacijos. Telefonas, WhatsApp, adresas Vilniuje.",
};

export default function KontaktaiPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold text-primary-dark">Kontaktai</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Registracija konsultacijai. Čia vėliau įterpsime Google Maps ir tikslų klinikos adresą.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <div className="space-y-6 text-sm">
          <div>
            <p className="font-semibold text-primary-dark">Telefonas</p>
            <a href={getTelHref()} className="mt-1 block font-mono text-lg text-primary hover:underline">
              {getTelDisplay()}
            </a>
          </div>
          <div>
            <p className="font-semibold text-primary-dark">Adresas</p>
            <p className="mt-1 text-muted">Vilnius (tikslus adresas — atnaujinsime)</p>
          </div>
          <div>
            <p className="font-semibold text-primary-dark">Darbo laikas</p>
            <p className="mt-1 text-muted">Pagal klinikos tvarkaraštį</p>
          </div>
        </div>
        <ContactForm />
      </div>

      <div className="mt-16 aspect-video w-full rounded-xl border border-dashed border-border bg-surface-alt" />
    </div>
  );
}
