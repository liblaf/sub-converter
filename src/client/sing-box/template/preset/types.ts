import { z } from "zod";
import type { Config, Outbound } from "../../types";

export const TEMPLATE_OPTIONS_SCHEMA = z.object({
  port: z.coerce.number().int().min(0).max(65535).default(0),
});

export type TemplateOptions = z.infer<typeof TEMPLATE_OPTIONS_SCHEMA>;

export type TemplateFactory = (
  providers: Map<string, Outbound[]>,
  opts: TemplateOptions,
) => Config;
