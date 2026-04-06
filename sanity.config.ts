import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { deskStructure } from "./sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

/** Vienas Sanity projektas visam produktui; galite perrašyti per env (pvz. staging). */
const DEFAULT_PROJECT_ID = "9dzpnf19";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || DEFAULT_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";

export default defineConfig({
  name: "default",
  title: "implantacijoskaina.lt",
  projectId,
  dataset,
  plugins: [structureTool({ structure: deskStructure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
