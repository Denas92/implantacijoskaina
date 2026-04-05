import { defineCliConfig } from "sanity/cli";

const DEFAULT_PROJECT_ID = "9dzpnf19";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || DEFAULT_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
});
