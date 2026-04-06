"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CalculatorStep } from "./CalculatorStep";
import { CalculatorResult } from "./CalculatorResult";
import { useAppContent } from "@/components/providers/AppContentProvider";
import { pushDataLayer } from "@/lib/analytics";
import {
  type AllOnXFinalOption,
  type CalculationResult,
  type ImplantTier,
  type ToothPosition,
  calculateAllOnXEstimate,
  calculatePartialEstimate,
} from "./calculatorLogic";

type Phase =
  | "scope"
  | "partial-multi"
  | "partial-position"
  | "partial-tier"
  | "allon-implants"
  | "allon-brand"
  | "allon-final"
  | "result";

function choiceClass(active: boolean) {
  return `w-full rounded-xl border p-4 text-left transition-colors sm:p-5 ${
    active
      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
      : "border-border bg-white hover:border-primary/40"
  }`;
}

export function ImplantCalculator() {
  const { calculatorEngine: engine } = useAppContent();

  const tierCards = useMemo(
    () =>
      engine.tierCards.map((c) => ({
        ...c,
        from: `nuo ${engine.prices.implant[c.id]} € / impl.`,
      })),
    [engine],
  );

  const [stack, setStack] = useState<Phase[]>(["scope"]);
  const phase = stack[stack.length - 1];

  const calcStartedRef = useRef(false);
  const lastCompleteKeyRef = useRef<string | null>(null);

  const [toothCount, setToothCount] = useState(2);
  const [singleJaw, setSingleJaw] = useState(true);
  const [position, setPosition] = useState<ToothPosition>("mixed");
  const [tier, setTier] = useState<ImplantTier>("straumann_slactive");
  const [allonJaws, setAllonJaws] = useState<1 | 2>(1);
  const [allonImplants, setAllonImplants] = useState<4 | 6>(4);
  const [allonStraumann, setAllonStraumann] = useState(false);
  const [allonFinal, setAllonFinal] = useState<AllOnXFinalOption>("titanium_zirconia");

  const push = useCallback((p: Phase) => {
    setStack((s) => [...s, p]);
  }, []);

  const pop = useCallback(() => {
    setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  }, []);

  const startOver = useCallback(() => {
    calcStartedRef.current = false;
    lastCompleteKeyRef.current = null;
    setStack(["scope"]);
    setToothCount(2);
    setSingleJaw(true);
    setPosition("mixed");
    setTier("straumann_slactive");
    setAllonJaws(1);
    setAllonImplants(4);
    setAllonStraumann(false);
    setAllonFinal("titanium_zirconia");
  }, []);

  const markCalculatorStart = useCallback(() => {
    if (calcStartedRef.current) return;
    calcStartedRef.current = true;
    pushDataLayer({ event: "calculator_start" });
  }, []);

  const result: CalculationResult | null = useMemo(() => {
    if (phase !== "result") return null;
    const prev = stack[stack.length - 2];
    if (prev === "partial-tier") {
      return calculatePartialEstimate(
        {
          toothCount,
          toothPosition: position,
          implantTier: tier,
          singleJaw,
        },
        engine,
      );
    }
    if (prev === "allon-final") {
      return calculateAllOnXEstimate(
        {
          jaws: allonJaws,
          implants: allonImplants,
          useStraumann: allonStraumann,
          finalOption: allonFinal,
        },
        engine,
      );
    }
    return null;
  }, [
    phase,
    stack,
    toothCount,
    position,
    tier,
    singleJaw,
    allonJaws,
    allonImplants,
    allonStraumann,
    allonFinal,
    engine,
  ]);

  useEffect(() => {
    if (phase !== "result") {
      lastCompleteKeyRef.current = null;
      return;
    }
    if (!result) return;
    const prev = stack[stack.length - 2];
    let calculator_mode: "partial" | "allon";
    let implant_type: string;
    let tooth_count: number;
    if (prev === "partial-tier") {
      calculator_mode = "partial";
      implant_type = tier;
      tooth_count = toothCount;
    } else if (prev === "allon-final") {
      calculator_mode = "allon";
      implant_type = `all_on_${allonImplants}_${allonStraumann ? "straumann" : "standard"}`;
      tooth_count = allonJaws * allonImplants;
    } else {
      return;
    }
    const key = `${prev}-${result.total}`;
    if (lastCompleteKeyRef.current === key) return;
    lastCompleteKeyRef.current = key;
    pushDataLayer({
      event: "calculator_complete",
      implant_type,
      tooth_count,
      estimated_total: result.total,
      calculator_mode,
    });
  }, [
    phase,
    result,
    stack,
    tier,
    toothCount,
    allonJaws,
    allonImplants,
    allonStraumann,
  ]);

  const backFromResult = useCallback(() => {
    pop();
  }, [pop]);

  if (phase === "result") {
    if (!result) {
      return (
        <div className="rounded-xl border border-border bg-white p-6 text-center shadow-card">
          <p className="text-sm text-muted">Nepavyko apskaičiuoti. Bandykite dar kartą.</p>
          <button
            type="button"
            onClick={startOver}
            className="mt-4 text-sm font-medium text-primary underline"
          >
            Pradėti iš naujo
          </button>
        </div>
      );
    }
    return (
      <CalculatorResult
        result={result}
        onBack={backFromResult}
        onStartOver={startOver}
      />
    );
  }

  if (phase === "scope") {
    return (
      <div className="rounded-xl border border-border bg-white p-6 shadow-card sm:p-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted">Žingsnis 1 / 4</p>
        <h3 className="mt-2 font-heading text-xl font-semibold text-primary-dark sm:text-2xl">
          Kiek dantų trūksta?
        </h3>
        <p className="mt-2 text-sm text-muted">
          Pasirinkite variantą — vėliau galėsite patikslinti konsultacijos metu. Tikslesniam planui
          naudojame 3D diagnostiką.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            className={choiceClass(false)}
            onClick={() => {
              markCalculatorStart();
              setToothCount(1);
              setStack(["scope", "partial-position"]);
            }}
          >
            <span className="font-medium text-primary-dark">1 dantis</span>
            <span className="mt-1 block text-sm text-muted">Vieno implanto sąmata</span>
          </button>
          <button
            type="button"
            className={choiceClass(false)}
            onClick={() => {
              markCalculatorStart();
              setStack(["scope", "partial-multi"]);
            }}
          >
            <span className="font-medium text-primary-dark">2–6 dantys</span>
            <span className="mt-1 block text-sm text-muted">Kelios implantacijos toje pačioje zonoje</span>
          </button>
          <button
            type="button"
            className={choiceClass(false)}
            onClick={() => {
              markCalculatorStart();
              setAllonJaws(1);
              setStack(["scope", "allon-implants"]);
            }}
          >
            <span className="font-medium text-primary-dark">Visi vieno žandikaulio dantys</span>
            <span className="mt-1 block text-sm text-muted">All-on-4 / All-on-6 viename žandikaulyje</span>
          </button>
          <button
            type="button"
            className={choiceClass(false)}
            onClick={() => {
              markCalculatorStart();
              setAllonJaws(2);
              setStack(["scope", "allon-implants"]);
            }}
          >
            <span className="font-medium text-primary-dark">Visi dantys (abu žandikauliai)</span>
            <span className="mt-1 block text-sm text-muted">Dvi pilnos arkos — dviguba sąmata</span>
          </button>
        </div>
      </div>
    );
  }

  if (phase === "partial-multi") {
    return (
      <CalculatorStep step={1} totalSteps={4} title="Keli trūkstami dantys" subtitle="Pasirinkite skaičių (2–6).">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {[2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              type="button"
              className={choiceClass(toothCount === n)}
              onClick={() => setToothCount(n)}
            >
              <span className="font-mono text-lg font-semibold text-primary-dark">{n}</span>
              <span className="mt-1 block text-xs text-muted">dantys</span>
            </button>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => push("partial-position")}
            className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-light"
          >
            Toliau
          </button>
          <button type="button" onClick={pop} className="text-sm font-medium text-muted hover:text-primary">
            ← Atgal
          </button>
        </div>
      </CalculatorStep>
    );
  }

  if (phase === "partial-position") {
    return (
      <CalculatorStep
        step={2}
        totalSteps={4}
        title="Kurioje vietoje?"
        subtitle="Priekiniai dantys dažnai reikalauja estetiškesnio vainikėlio — kaina skiriasi."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {(
            [
              { id: "anterior" as const, t: "Priekiniai", d: "Vestibulinė zona, matoma šypsenoje" },
              { id: "posterior" as const, t: "Šoniniai", d: "Mažiau matoma zona" },
              { id: "mixed" as const, t: "Mišrus", d: "Ir priekis, ir šonis" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={choiceClass(position === opt.id)}
              onClick={() => setPosition(opt.id)}
            >
              <span className="font-medium text-primary-dark">{opt.t}</span>
              <span className="mt-1 block text-sm text-muted">{opt.d}</span>
            </button>
          ))}
        </div>

        <label className="mt-8 flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-surface-alt/50 p-4">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
            checked={!singleJaw}
            onChange={(e) => setSingleJaw(!e.target.checked)}
          />
          <span className="text-sm text-[var(--color-text)]">
            <span className="font-medium text-primary-dark">Skirtingi žandikauliai</span>
            <span className="mt-0.5 block text-muted">
              Jei implantuojama abiejuose žandikauliuose, skaičiuojami du 3D chirurginiai gidai ir sterilios
              medžiagos.
            </span>
          </span>
        </label>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => push("partial-tier")}
            className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-light"
          >
            Toliau
          </button>
          <button type="button" onClick={pop} className="text-sm font-medium text-muted hover:text-primary">
            ← Atgal
          </button>
        </div>
      </CalculatorStep>
    );
  }

  if (phase === "partial-tier") {
    return (
      <CalculatorStep
        step={3}
        totalSteps={4}
        title="Koks implanto tipas?"
        subtitle="Visi variantai — klinikoje naudojami patikrinti gamintojai. SLActive — dažnas pasirinkimas dėl gijimo."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {tierCards.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`relative rounded-xl border p-5 text-left transition-colors ${
                tier === c.id
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "border-border bg-white hover:border-primary/40"
              }`}
              onClick={() => setTier(c.id)}
            >
              {c.recommended ? (
                <span className="absolute right-3 top-3 rounded-full bg-accent-light px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-dark">
                  Rekomenduojama
                </span>
              ) : null}
              <span className="font-heading text-lg font-semibold text-primary-dark">{c.title}</span>
              <span className="mt-1 block text-sm text-muted">{c.subtitle}</span>
              <span className="mt-4 block font-mono text-sm font-semibold text-primary">{c.from}</span>
            </button>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted">
          Standartinis — optimalus santykis kaina / kokybė. Straumann SLA ir SLActive — ilgaamžiškumas ir
          dokumentuota klinikinė istorija.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => push("result")}
            className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-light"
          >
            Skaičiuoti
          </button>
          <button type="button" onClick={pop} className="text-sm font-medium text-muted hover:text-primary">
            ← Atgal
          </button>
        </div>
      </CalculatorStep>
    );
  }

  if (phase === "allon-implants") {
    return (
      <CalculatorStep
        step={1}
        totalSteps={4}
        title="All-on: kiek implantų?"
        subtitle="Įprastai 4 implantai viename žandikaulyje; 6 — papildomas stabilumas."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            className={choiceClass(allonImplants === 4)}
            onClick={() => setAllonImplants(4)}
          >
            <span className="font-heading text-lg font-semibold text-primary-dark">All-on-4</span>
            <span className="mt-1 block text-sm text-muted">4 implantai / žandikaulis</span>
          </button>
          <button
            type="button"
            className={choiceClass(allonImplants === 6)}
            onClick={() => setAllonImplants(6)}
          >
            <span className="font-heading text-lg font-semibold text-primary-dark">All-on-6</span>
            <span className="mt-1 block text-sm text-muted">6 implantai / žandikaulis</span>
          </button>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => push("allon-brand")}
            className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-light"
          >
            Toliau
          </button>
          <button type="button" onClick={pop} className="text-sm font-medium text-muted hover:text-primary">
            ← Atgal
          </button>
        </div>
      </CalculatorStep>
    );
  }

  if (phase === "allon-brand") {
    return (
      <CalculatorStep
        step={2}
        totalSteps={4}
        title="Implantų linija"
        subtitle="Standartiniai rinkiniai arba Straumann implantai All-on atvejui."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            className={choiceClass(!allonStraumann)}
            onClick={() => setAllonStraumann(false)}
          >
            <span className="font-medium text-primary-dark">Standartiniai</span>
            <span className="mt-1 block text-sm text-muted">Nobel / Neodent / Megagen / Osstem rinkinys</span>
          </button>
          <button
            type="button"
            className={choiceClass(allonStraumann)}
            onClick={() => setAllonStraumann(true)}
          >
            <span className="font-medium text-primary-dark">Straumann</span>
            <span className="mt-1 block text-sm text-muted">Premium implantų paketas</span>
          </button>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => push("allon-final")}
            className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-light"
          >
            Toliau
          </button>
          <button type="button" onClick={pop} className="text-sm font-medium text-muted hover:text-primary">
            ← Atgal
          </button>
        </div>
      </CalculatorStep>
    );
  }

  if (phase === "allon-final") {
    return (
      <CalculatorStep
        step={3}
        totalSteps={4}
        title="Galutinis protezas"
        subtitle="Pasirinkite protezavimo variantą — kaina priklauso nuo medžiagų ir darbo sudėtingumo."
      >
        <div className="grid gap-3">
          {(Object.keys(engine.finalOptions) as AllOnXFinalOption[]).map((key) => {
            const m = engine.finalOptions[key];
            return (
              <button
                key={key}
                type="button"
                className={choiceClass(allonFinal === key)}
                onClick={() => setAllonFinal(key)}
              >
                <span className="font-medium text-primary-dark">{m.title}</span>
                <span className="mt-1 block text-sm text-muted">{m.description}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => push("result")}
            className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-light"
          >
            Skaičiuoti sąmatą
          </button>
          <button type="button" onClick={pop} className="text-sm font-medium text-muted hover:text-primary">
            ← Atgal
          </button>
        </div>
      </CalculatorStep>
    );
  }

  return null;
}
