import { NextResponse } from "next/server";

type Body = {
  name?: string;
  phone?: string;
  interest?: string;
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

  // Jei prijungsite Resend, čia siųskite el. laišką. Kol nėra rakto — vedame į serverio žurnalą.
  console.info("[implantacijoskaina lead]", {
    name: name.trim(),
    phone: phone.trim(),
    interest: interest.trim(),
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
