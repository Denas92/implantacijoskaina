"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getTelDisplay, getTelHref } from "@/lib/site";

export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/98 px-4 py-3 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] backdrop-blur-sm md:hidden"
        role="region"
        aria-label="Greita konsultacija"
      >
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <Link
            href="/kontaktai"
            className="flex-1 rounded-lg bg-primary py-3 text-center text-sm font-semibold text-white"
          >
            Nemokama konsultacija
          </Link>
          <a
            href={getTelHref()}
            className="rounded-lg border border-border bg-white px-4 py-3 text-sm font-medium text-primary"
          >
            Skambinti
          </a>
        </div>
      </div>

      <div className="pointer-events-none fixed bottom-8 right-6 z-40 hidden md:block">
        <div className="pointer-events-auto flex flex-col items-end gap-2">
          <a
            href={getTelHref()}
            className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-primary shadow-card"
          >
            {getTelDisplay()}
          </a>
          <Link
            href="/kontaktai"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-soft"
          >
            Nemokama konsultacija
          </Link>
        </div>
      </div>
    </>
  );
}
