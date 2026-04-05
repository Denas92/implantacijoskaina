"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks, siteName } from "@/lib/site";
import { Button } from "@/components/ui/Button";

export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="font-heading text-lg font-semibold tracking-tight text-primary sm:text-xl"
          onClick={() => setOpen(false)}
        >
          {siteName}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Pagrindinė navigacija">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-[var(--color-text)] transition-colors hover:text-primary"
            >
              {label}
            </Link>
          ))}
          <Button href="/kontaktai" variant="secondary" className="!py-2 !px-4 text-sm">
            Nemokama konsultacija
          </Button>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Meniu</span>
          <span className="flex flex-col gap-1.5" aria-hidden>
            <span
              className={`block h-0.5 w-5 bg-primary transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span className={`block h-0.5 w-5 bg-primary ${open ? "opacity-0" : ""}`} />
            <span
              className={`block h-0.5 w-5 bg-primary transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-border bg-surface px-4 py-4 md:hidden"
        >
          <nav className="flex flex-col gap-3" aria-label="Mobilus meniu">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="py-2 text-base text-[var(--color-text)]"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Button href="/kontaktai" variant="secondary" className="mt-2 w-full justify-center">
              Nemokama konsultacija
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
