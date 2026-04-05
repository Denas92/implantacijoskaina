import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";

export default defineConfig({
  name: "default",
  title: "implantacijoskaina.lt",
  projectId: projectId || "missing_sanity_project_id",
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
