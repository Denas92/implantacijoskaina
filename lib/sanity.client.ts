import { createClient, type SanityClient } from "@sanity/client";

/** API versija — galite palikti šią arba atnaujinti pagal Sanity dokumentaciją */
const apiVersion = "2024-01-01";

/** Grąžina klientą skaitymui (viešas turinys). ProjectId sutampa su Studio. */
/** Tas pats projectId kaip Studio (`sanity.config.ts`). */
const DEFAULT_PROJECT_ID = "9dzpnf19";

export function getSanityClient(): SanityClient {
  const projectId =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || DEFAULT_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
  });
}
