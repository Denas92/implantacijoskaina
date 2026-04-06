export const siteName = "implantacijoskaina.lt";

export const navLinks = [
  { href: "/", label: "Kainos" },
  { href: "/be-pjuvio", label: "Be pjūvio" },
  { href: "/straumann", label: "Straumann" },
  { href: "/all-on-4", label: "All-on-4" },
  { href: "/duk", label: "DUK" },
] as const;

export const footerLinks = [
  { href: "/be-pjuvio", label: "Implantacija be pjūvio" },
  { href: "/straumann", label: "Straumann implantai" },
  { href: "/all-on-4", label: "All-on-4" },
  { href: "/kainu-palyginimas", label: "Kainų palyginimas" },
  { href: "/finansavimas", label: "Finansavimas" },
  { href: "/testas", label: "Ar man reikia implanto?" },
  { href: "/duk", label: "DUK" },
  { href: "/kontaktai", label: "Kontaktai" },
] as const;

const DEFAULT_WA_TEXT =
  "Sveiki, domina dantų implantacija. Norėčiau sužinoti kainą.";

/** E.164 be +; pvz. 37060000000. Nustatykite .env.local */
export function getWhatsAppLink(presetMessage?: string | null): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "37000000000";
  const raw = presetMessage?.trim() || DEFAULT_WA_TEXT;
  const text = encodeURIComponent(raw);
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${text}`;
}

export function getTelHref(): string {
  const raw = process.env.NEXT_PUBLIC_CLINIC_PHONE ?? "+37000000000";
  const digits = raw.replace(/\s/g, "");
  return digits.startsWith("+") ? `tel:${digits}` : `tel:+${digits.replace(/^\+?/, "")}`;
}

export function getTelDisplay(): string {
  return process.env.NEXT_PUBLIC_CLINIC_PHONE_DISPLAY ?? "+370 000 00000";
}
