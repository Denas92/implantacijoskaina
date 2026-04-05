import { createClient, type SanityClient } from "@sanity/client";

/** API versija — galite palikti šią arba atnaujinti pagal Sanity dokumentaciją */
const apiVersion = "2024-01-01";

/**
 * Grąžina Sanity klientą arba `null`, jei dar nesate užpildę env (build/deploy nepalūžta).
 * Kai pridėsite užklausas, visada tikrinkite `if (!client)`.
 */
export function getSanityClient(): SanityClient | null {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
  if (!projectId?.trim()) return null;

  return createClient({
    projectId: projectId.trim(),
    dataset,
    apiVersion,
    useCdn: true,
  });
}
