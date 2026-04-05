import { NextResponse } from "next/server";
import { Resend } from "resend";

type Body = {
  name?: string;
  phone?: string;
  interest?: string;
};

const LEAD_TO = process.env.CONTACT_LEAD_TO ?? "denas@skaitmeninessypsenos.lt";

const interestLabels: Record<string, string> = {
  single: "Vienas implantas",
  multiple: "Keli implantai",
  "all-on-4": "All-on-4",
  unknown: "Nežinau, noriu konsultacijos",
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, phone, interest } = body;
  if (!name?.trim() || !phone?.trim() || !interest?.trim()) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const nameTrim = name.trim();
  const phoneTrim = phone.trim();
  const interestTrim = interest.trim();
  const interestLabel = interestLabels[interestTrim] ?? interestTrim;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY nėra — lead tik į konsolę:", {
      name: nameTrim,
      phone: phoneTrim,
      interest: interestTrim,
      at: new Date().toISOString(),
    });
    return NextResponse.json(
      {
        ok: false,
        error: "El. paštas dar nesukonfigūruotas (trūksta RESEND_API_KEY serveryje).",
      },
      { status: 503 },
    );
  }

  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (!from) {
    console.error("[contact] RESEND_FROM_EMAIL nenustatytas");
    return NextResponse.json(
      {
        ok: false,
        error:
          "Nenustatytas siuntėjo adresas (RESEND_FROM_EMAIL). Pridėkite patvirtintą domeną Resend.",
      },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to: [LEAD_TO],
    replyTo: phoneTrim.includes("@") ? phoneTrim : undefined,
    subject: `implantacijoskaina.lt — nauja užklausa (${interestLabel})`,
    html: `
      <h2>Nauja užklausa iš implantacijoskaina.lt</h2>
      <p><strong>Vardas:</strong> ${escapeHtml(nameTrim)}</p>
      <p><strong>Telefonas:</strong> ${escapeHtml(phoneTrim)}</p>
      <p><strong>Domina:</strong> ${escapeHtml(interestLabel)}</p>
      <p style="color:#666;font-size:12px;margin-top:2rem">${escapeHtml(new Date().toISOString())}</p>
    `,
  });

  if (error) {
    console.error("[contact] Resend:", error);
    return NextResponse.json({ ok: false, error: "Nepavyko išsiųsti el. laiško." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
