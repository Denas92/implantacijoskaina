import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All-on-4 kaina Lietuvoje 2026 | Pilno žandikaulio atstatymas",
  description:
    "All-on-4 dantų atstatymas — kainos nuo 2 499€ už implantus. Pilna kainų lentelė su visais protezavimo variantais.",
};

export default function AllOn4Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold text-primary-dark">All-on-4</h1>
      <p className="mt-4 text-muted">
        Pilnas kainų breakdown, proceso timeline ir DUK — sekančio etapo darbas.
      </p>
    </div>
  );
}
