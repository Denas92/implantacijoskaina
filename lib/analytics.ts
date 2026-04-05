/**
 * Google Tag Manager — dataLayer įvykiai (žr. brief „TRACKING IR ANALYTICS“).
 * Jei nėra NEXT_PUBLIC_GTM_ID, push vis tiek saugus (tik naršyklėje).
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function pushDataLayer(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
}

export function getGtmId(): string | undefined {
  return process.env.NEXT_PUBLIC_GTM_ID?.trim() || undefined;
}
