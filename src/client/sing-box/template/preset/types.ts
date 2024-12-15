import { z } from "zod";

export const TEMPLATE_OPTIONS_SCHEMA = z.object({
  port: z.coerce.number().int().positive().max(65535).default(0),
});

export type TemplateOptions = z.infer<typeof TEMPLATE_OPTIONS_SCHEMA>;
