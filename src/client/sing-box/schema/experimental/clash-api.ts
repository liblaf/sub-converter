import { z } from "zod";

export const EXPERIMENTAL_CLASH_API = z
  .object({
    external_controller: z.string(),
    external_ui: z.string(),
    external_ui_download_url: z.string().url(),
    external_ui_download_detour: z.string(),
  })
  .partial();
