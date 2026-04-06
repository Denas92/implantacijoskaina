"use client";

import Link from "next/link";
import { TrackedPhoneLink } from "@/components/analytics/TrackedPhoneLink";
import { useAppContent } from "@/components/providers/AppContentProvider";
import { getTelDisplay, getTelHref, siteName } from "@/lib/site";

export function Footer() {
  const { siteContent } = useAppContent();
  const footerLinks = siteContent.footerLinks;

  return (
    <footer className="border-t border-border bg-surface-alt">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-heading text-lg font-semibold text-primary">{siteName}</p>
            <p className="mt-3 max-w-sm text-sm text-muted">
              Edukacinė informacija apie dantų implantacijos kainas Lietuvoje. Tiksli kaina
              nustatoma po gydytojo konsultacijos.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-primary-dark">Puslapiai</p>
            <ul className="mt-3 flex flex-col gap-2">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-primary-dark">Kontaktai</p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-muted">
              <li>
                <TrackedPhoneLink href={getTelHref()} className="hover:text-primary">
                  {getTelDisplay()}
                </TrackedPhoneLink>
              </li>
              <li>Vilnius</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-lg border border-border bg-white/60 p-4">
          <p className="text-xs text-muted">
            Informaciją parengė ir rekomenduoja —{" "}
            <a
              href="https://skaitmeninessypsenos.lt"
              className="font-medium text-primary underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Skaitmeninės Šypsenės
            </a>{" "}
            klinika, Vilnius.
          </p>
        </div>

        <p className="mt-8 text-center text-xs text-muted">
          Kainos orientacinės. © {new Date().getFullYear()} {siteName}
        </p>
      </div>
    </footer>
  );
}
