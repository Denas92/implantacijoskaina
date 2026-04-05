import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-white to-surface-alt">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wider text-primary-light">
            Nepriklausoma kainų informacija
          </p>
          <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight tracking-tight text-primary-dark sm:text-5xl">
            Kiek iš tikrųjų kainuoja dantų implantai?
          </h1>
          <p className="mt-6 text-lg text-muted">
            Apskaičiuokite savo implantacijos kainą per 30 sekundžių. Palyginimas, metodai ir
            nemokama konsultacija.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="#skaiciuokle" variant="primary" className="sm:w-auto">
              Skaičiuoti kainą ↓
            </Button>
            <Button href="#konsultacija" variant="ghost" className="sm:w-auto">
              Nemokama konsultacija
            </Button>
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl"
        aria-hidden
      />
    </section>
  );
}
