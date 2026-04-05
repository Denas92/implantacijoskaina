import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dantų implantų kainos Vilniuje — klinikų palyginimas 2026",
  description:
    "Palyginkite dantų implantacijos kainas Vilniaus klinikose. Objektyvus palyginimas su kainomis, metodais ir pacientų atsiliepimais.",
};

export default function KainuPalyginimasPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold text-primary-dark">
        Klinikų kainų palyginimas
      </h1>
      <p className="mt-4 text-muted">
        Lentelė su duomenimis iš Sanity CMS — prijungsime su schema `competitor`.
      </p>
    </div>
  );
}
