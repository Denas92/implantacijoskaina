"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

type FormValues = {
  name: string;
  phone: string;
  interest: string;
};

const interests = [
  { value: "single", label: "Vienas implantas" },
  { value: "multiple", label: "Keli implantai" },
  { value: "all-on-4", label: "All-on-4" },
  { value: "unknown", label: "Nežinau, noriu konsultacijos" },
] as const;

export function ContactForm({ id }: { id?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { interest: "unknown" },
  });

  async function onSubmit(data: FormValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("ok");
      reset({ name: "", phone: "", interest: "unknown" });
    } catch {
      setStatus("err");
    }
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-lg space-y-4 rounded-xl border border-border bg-white p-6 shadow-card"
    >
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-primary-dark">
          Vardas
        </label>
        <input
          id="contact-name"
          className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none ring-primary/20 focus:ring-2"
          {...register("name", { required: true })}
        />
      </div>
      <div>
        <label htmlFor="contact-phone" className="block text-sm font-medium text-primary-dark">
          Telefonas
        </label>
        <input
          id="contact-phone"
          type="tel"
          className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none ring-primary/20 focus:ring-2"
          {...register("phone", { required: true })}
        />
      </div>
      <div>
        <label htmlFor="contact-interest" className="block text-sm font-medium text-primary-dark">
          Kas jus domina?
        </label>
        <select
          id="contact-interest"
          className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none ring-primary/20 focus:ring-2"
          {...register("interest", { required: true })}
        >
          {interests.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <Button type="submit" variant="primary" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? "Siunčiama…" : "Gauti nemokamą konsultaciją"}
      </Button>
      {status === "ok" ? (
        <p className="text-center text-sm text-primary-light">Ačiū — netrukus susisieksime.</p>
      ) : null}
      {status === "err" ? (
        <p className="text-center text-sm text-[var(--color-error)]">
          Nepavyko išsiųsti. Bandykite dar kartą arba paskambinkite.
        </p>
      ) : null}
      <p className="text-center text-xs text-muted">Atsakysime per 1 darbo valandą</p>
    </form>
  );
}
